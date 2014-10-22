---
layout: post
title: Building a card game (war) with React
image: /public/images/playing_cards.jpg
summary: >
    When I was a little kid one of my favorite card games was War. I didn't realize at the time that it was completely deterministic, but that's beside the point. It was fun! Today I decided to build a version of it in React so I can play in the browser.
---

When I was a little kid I loved to play War (the card game). I didn't realize it then, though I feel like I had an inkling at some point in my pre-teen years, that the game is 100% deterministic -- the winner is decided by the shuffle, not by anything that the players do -- but that didn't matter. It was fun!

As I've been [playing](http://biesnecker.com/2014/10/16/how-likely-is-it-that-my-team-will-win/) with [React.js](http://facebook.github.io/react/), I've been thinking about making board games with it. A board game is essentially a way to manage state information about the game being played, and that is easily modeled with React. Yesterday I stumbled on a post about [someone who modeled a rather complex board game using React](http://jjt.io/2014/07/30/building-a-board-game-with-react-js/), and was inspired to try something of my own. That said, I'm still in the baby steps period of my relationship with frontend development, and wanted to tackle something a little simpler.

As games go, War definitely qualifies as "a little simpler" (if you're unfamiliar with the rules, [go here](http://www.pagat.com/war/war.html)).

This post will walk through the steps I took to build it (indeed, I'm writing this post as I'm building the game), with the final game at the bottom.

### Finding the card images

The first thing that I needed to do was find good, freely usable images for the cards, or else I'd be stuck making (terrible, ugly) card images myself. I was sure that this was something that must exist, and sure enough, [it does](https://code.google.com/p/vectorized-playing-cards/). I'm using the SVG versions directly.

### Representing the deck

War doesn't care about suits, so the only thing that matters about a card is its face value. Of course, to display the card you need to know which suit it is, but the important thing is being able to easily compare two cards' face values. Instead of enumerating all of the cards by hand, I build a `Deck` array when the page is loaded and refer to it from then on.

{% highlight javascript %}
var Suits = ['H', 'D', 'C', 'S'];
var Cards = [];
for (var i = 2; i < 15; i++) {
    for (var j = 0; j < Suits.length; j++) {
        Cards.push(i + '_' + Suits[j]);
    }
}
{% endhighlight %}

Note that I encode the face cards as values 11 through 14, so that I can do straightforward integer comparison.

### Thinking about state

The game begins with the 52-card deck evenly divided and given to each player, and then continues until one player is out of cards. We need to keep track of each player's deck. We also need to show the current cards for each player, and some sort of status so you know what's going on.

For this, I'm going to make four components:

1. `WarGameComponent` that holds all of the state, and acts as the parent for everything else.
2. `PlayerComponent` that is responsible for displaying a player's state -- their current card, number of cards left in their deck, etc.
3. `ButtonComponent` that holds a single button that starts the game and advances its state.
4. `StatusComponent` that is responsible for telling the player what happened in the current round.

### WarGameComponent

All of the state and the vast majority of the logic for the game lives in this component. Everything else is just a rendering of that state. I'm using a simple HTML table to hold the game because I'm not terribly concerned about how it looks. The important thing is the state management.

Because the outcome of the game is deterministic, there's really only three state transitions that matter:

1. Starting the game (and dealing the deck out to the two players)
2. Playing the next card (or several, in the case of a war)
3. Completing the game (when one player runs out of cards)

Because of this, I'm just creating a single event handler that will be called by the button being pressed. It can look at the current state and advance forward one step. I've written two functions -- `startGame` and `stepForward` -- to handle updating the component's state appropriately. Here's the shell of the component:

{% highlight javascript %}
var GameStatus = {
    NOTSTARTED: 0,
    FINISHED: 1,
    INPROGRESS: 2
}

var WarGameComponent = React.createClass({
    startGame: function() {
        // "deal" the cards
    },
    stepForward: function() {
        // step the state forward
    },
    clickHandler: function() {
        // handle events from the button
    },
    getInitialState: function() {
        return ({
            playerADeck: null,
            playerBDeck: null,
            playerACurrentCard: null,
            playerBCurrentCard: null,
            status: GameStatus.NOTSTARTED
        })
    },
    render: function() {
        return (
            <div id='war_game_component'>
                <table>
                <tr>
                    <td width='33%' rowSpan='2'>
                        Player A
                    </td>
                    <td width='34%'>
                        Button
                    </td>
                    <td width='33%' rowSpan='2'>
                        Player B
                    </td>
                </tr>
                <tr>
                    <td>
                        Status
                    </td>
                </tr>
                </table>
            </div>
        );
    }
});
{% endhighlight %}

### Shuffling and dealing the deck

Algorithmically, the only really interesting thing to see is how to shuffle and "deal" the deck. Conceptually, this works the same as it does in real life -- you randomize the order of the deck (shuffle), and then you split it between players. Unlike actually dealing cards, though, you can just partition the shuffled array of cards into two 26-element arrays and assign them to players.

{% highlight javascript %}
startGame: function() {
    // get our own copy of the Cards array
    var cardArray = Cards.slice();

    // shuffle the cards
    var currentIndex = cardArray.length;
    var tempValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = tempValue;
    }

    // give each player half and update the game status
    this.setState({
        playerADeck: cardArray.slice(0, 26),
        playerBDeck: cardArray.slice(26),
        status: GameStatus.INPROGRESS;
    });

}
{% endhighlight %}

The shuffling is accomplished via an implementation of the [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

### PlayerComponent

`PlayerComponent` displays the card last played by the player, as well as the number of cards in that player's deck. The component is totally stateless, and receives props from the `WarGameComponent`. The only logic `PlayerComponent` contains is the mapping from the code used in the `Cards` array to the filename for the card's SVG (I could have renamed the card files to match the code exactly, but I'm lazy).

{% highlight javascript %}
var PlayerComponent = React.createClass({
    cardImagePath: function(key) {
        var svgFilename = 'back.svg'
        if (key) {
            svgFilename = key.replace('_', '') + '.svg'
        }
        return ('/public/images/cards/' + svgFilename);
    },
    render: function() {
        var cardCount = this.props.cardCount;
        var currentCard = this.props.currentCard;
        var count = "";
        if (cardCount) {
            c = cardCount === 1 ? 'card' : 'cards';
            count = <p>{cardCount} {c} remaining</p>;
        }
        return (
            <div>
                <p>
                    <img
                        width='100%'
                        src={this.cardImagePath(currentCard)} />
                </p>
                {count}
            </div>
        )
    }
});
{% endhighlight %}

I'm using `null` to represent the unstarted states, when there aren't any cards in play, so that's handled as a special case.

### ButtonComponent

The `ButtonComponent` is extremely simple. It's simply an HTML button that calls back to `WarGameComponent`'s `clickHandler` function when it is clicked, and has a tiny bit of logic for updating the button text depending on that status of the game.

{% highlight javascript %}
var ButtonComponent = React.createClass({
    render: function() {
        var text_options = [
            'Start Game',
            'Play Again',
            'Next Round'];
        var button_text = text_options[this.props.status];
        return (
            <button onClick={this.props.clickHandler}>
                {button_text}
            </button>
        );
    }
});
{% endhighlight %}

### Core game logic

Now for the meat and potatoes: once the game has started, we need to go through the deck, compare cards, determine winners, etc.

A couple of things can happen each round:

1. If the cards have a different value, then the higher card wins.
2. If the cards have the same value, then it's war.
    1. It's possible that one of the players doesn't have the two cards you need for war, and if that's the case then the other player automatically wins.
    2. Otherwise, a hidden card is added to the pot from both decks, and then the second card is compared.
         1. If they're different, then the higher card wins all the cards in the post.
         2. If they're the same, then repeat war.
3. If at the end of all of this either of the decks is empty, then the other player wins.

{% highlight javascript %}
stepForward: function() {
    // step the state forward
    var spoils = [];

    var aDeck = this.state.playerADeck;
    var bDeck = this.state.playerBDeck;
    var complete = false;
    var nextStatus = GameStatus.INPROGRESS;
    var isWar = false;

    // cycle until there isn't a match
    while (!complete) {
        var aCard = aDeck.shift();
        var bCard = bDeck.shift();
        var winner;
        spoils.push(aCard, bCard);
        var caVal = parseInt(aCard.split('_')[0]);
        var cbVal = parseInt(bCard.split('_')[0]);

        if (caVal === cbVal) {
            isWar = true;
            if (aDeck.length < 2) {
                winner = 'B';
                nextStatus = GameStatus.FINISHED;
                complete = true;
            } else if (bDeck.length < 2) {
                winner = 'A';
                nextStatus = GameStatus.FINISHED;
                complete = true;
            } else {
                // hidden card
                spoils.push(aDeck.shift(), bDeck.shift());
                aCard = aDeck.shift();
                bCard = bDeck.shift();
                spoils.push(aCard, bCard);
                caVal = parseInt(aCard.split('_')[0]);
                cbVal = parseInt(bCard.split('_')[0]);
                if (caVal !== cbVal) {
                    complete = true;
                    if (caVal > cbVal) {
                        winner = 'A';
                        aDeck.push.apply(aDeck, spoils);
                    } else {
                        winner = 'B';
                        bDeck.push.apply(bDeck, spoils);
                    }
                }
            }
        } else {
            complete = true;
            if (caVal > cbVal) {
                winner = 'A';
                aDeck.push.apply(aDeck, spoils);
            } else {
                winner = 'B';
                bDeck.push.apply(bDeck, spoils);
            }
        }

    }
    if (!aDeck.length || !bDeck.length) {
        nextStatus = GameStatus.FINISHED;
    }
    this.setState({
        status: nextStatus,
        currentWinner: winner,
        currentWasWar: isWar,
        currentCardsWon: spoils.length,
        playerACurrentCard: aCard,
        playerBCurrentCard: bCard,
        playerADeck: aDeck,
        playerBDeck: bDeck
    });
}
{% endhighlight %}

### StatusComponent

Now all that's left is to update the game status so that the player knows what happened in the last round. We take all of the state that is created in the last round and builds a string.

{% highlight javascript %}
var StatusComponent = React.createClass({
    render: function() {
        var winner = this.props.currentWinner;
        var status = this.props.status;
        var spoils = this.props.cardsWon;
        var war = this.props.wasWar;
        var text = '';
        if (status === GameStatus.NOTSTARTED || winner === null) {
            text = '';
        } else if (status === GameStatus.FINISHED) {
            text = 'Player ' + winner + ' won the game!';
        } else {
            if (war) {
                text += 'WAR! ';
            }
            text += 'Player ' + winner + ' won ' + spoils + ' cards.';
        }
        console.log(text);
        return (
            <div>{text}</div>
        );
    }
});
{% endhighlight %}

### The final game

{% stylesheet war_card_game %}

<div id="war"></div>

{% javascript war_card_game %}

### Conclusion

That was pretty fun, and it wasn't particularly complex. I don't love the way that I managed state, but it works and it's been a learning experience. All of the code that powers this example can be found in [this gist](https://gist.github.com/biesnecker/0c47af9ec6e57ad90940).
