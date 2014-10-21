/** @jsx React.DOM */

var GameStatus = {
    NOTSTARTED: 0,
    FINISHED: 1,
    INPROGRESS: 2
}

var Suits = ['H', 'D', 'C', 'S'];
var Cards = [];
for (var i = 2; i < 15; i++) {
    for (var j = 0; j < Suits.length; j++) {
        Cards.push(i + '_' + Suits[j]);
    }
}

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
        return (
            <div>{text}</div>
        );
    }
});

var ButtonComponent = React.createClass({
    render: function() {
        var text_options = ['Start Game', 'Play Again', 'Next Round'];
        var button_text = text_options[this.props.status];
        return (
            <button onClick={this.props.clickHandler}>{button_text}</button>
        );
    }
});

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
                    <img width='100%' src={this.cardImagePath(currentCard)} />
                </p>
                {count}
            </div>
        )
    }
});

var WarGameComponent = React.createClass({
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
            status: GameStatus.INPROGRESS,
            currentWinner: null,
            currentWasWar: null,
            currentCardsWon: null
        });

    },
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
                // WAR!
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
    },
    clickHandler: function() {
        switch(this.state.status) {
            case GameStatus.NOTSTARTED:
                this.startGame();
                break;
            case GameStatus.INPROGRESS:
                this.stepForward();
                break;
            case GameStatus.FINISHED:
                this.startGame();
        }
    },
    getInitialState: function() {
        return ({
            playerADeck: null,
            playerBDeck: null,
            playerACurrentCard: null,
            playerBCurrentCard: null,
            status: GameStatus.NOTSTARTED,
            currentWinner: null,
            currentWasWar: null,
            currentCardsWon: null
        })
    },
    render: function() {
        return (
            <div id='war_game_component'>
                <table>
                <tr>
                    <td width='33%' rowSpan='2' className='center-align'>
                        <PlayerComponent
                            cardCount={this.state.playerADeck ? this.state.playerADeck.length : null }
                            currentCard={this.state.playerACurrentCard}
                        />
                    </td>
                    <td width='34%' height='50%' className='center-align'>
                        <ButtonComponent
                            clickHandler={this.clickHandler}
                            status={this.state.status}
                        />
                    </td>
                    <td width='33%' rowSpan='2' className='center-align' >
                        <PlayerComponent
                            cardCount={this.state.playerBDeck ? this.state.playerBDeck.length : null }
                            currentCard={this.state.playerBCurrentCard}
                        />
                    </td>
                </tr>
                <tr>
                    <td className='center-align'>
                        <StatusComponent
                            currentWinner={this.state.currentWinner}
                            wasWar={this.state.currentWasWar}
                            cardsWon={this.state.currentCardsWon}
                            status={this.state.status}
                        />
                    </td>
                </tr>
                </table>
            </div>
        );
    }
});

React.renderComponent(
    <WarGameComponent />,
    document.getElementById('war')
);
