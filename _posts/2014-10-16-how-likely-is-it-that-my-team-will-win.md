---
layout: post
title: How likely is it that my team will win?
image: /public/images/chris_carpenter.jpg
summary: >
    Everyone has been there. They're watching a game, and they're thinking "man, there's no way we'll ever pull this one out." But really, what are the odds that your team is going to win or lose? I've crunched data from every Major League Baseball game since 1960 to answer just that question.
---
{% stylesheet winning_percentage %}

<p id="winning_percentage_component"></p>

{% javascript winning_percentage %}

<hr />

### How do I use this?

Just enter the home and away scores and the <em>last <strong>completed</strong> half inning</em>. If the game you're watching is in the middle of an inning, enter that inning to see what the odds of winning are if the score stays the same at the end of that half inning.

### Where does this data come from?

The information used here was obtained free of charge from and is copyrighted by Retrosheet. Interested parties may contact Retrosheet at [www.retrosheet.org](http://www.retrosheet.org).

### How do this work?

First, I processed the linescores for all Major League Baseball games since 1960, getting the winning and losing team for each game. I then went through the linescore half-inning by half-inning, calculating the score differential at the end of each half-inning, and connecting that back to the final result of the game. That means that, according the processing I did, a 4-3 game at the end of the 4th is the same as a 8-7 game at the end of the 4th -- not entirely true, most likely, but a decent approximation.

I've also capped the score differential at 10 -- anything above that is lumped into the same bucket. This reduces accuracy slightly when the score differential is huge (a 20-1 lead is more secure than an 11-1 lead, after all), but only slightly and only in rather uncommon cases, and it allows for more situations to have data (because the number of games with greater than 10 run score differentials is rather small, so lumping them all together makes it more likely to have found one).

### Future improvements

There are a ton of variables that could be considered. The ballpark seems to be the most important -- one run leads going into the bottom of the 9th are probably safer in pitcher-friendly parks. There's also plenty of Sabermetrics focused around the odds of winning from any situation. But for a simple approximation, this does a pretty good job.

The code that I used to process the Retrosheet data is available in [this gist](https://gist.github.com/biesnecker/68b9d9d87068e11ce24f).
