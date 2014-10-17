---
layout: post
title: NLCS Game 5 winning odds by inning
image: /public/images/baseball_life.jpg
summary: >
    Using linescore data, we can predict the odds of each team in a game winning on an innning-by-inning basis. This post looks at Game 5 of the 2014 NLCS between the St. Louis Cardinals and the San Francisco Giants.
date: 2014-10-17 08:00:00
---

As a Cardinals fan, the 2014 NLCS was disappointing, but as a baseball fan -- holy shit, what a series! The Cardinals didn't make it easy for the Giants, and in the end the Giants deserved to hoist the National League pennant.

During the series I built this handy [winning odds calculator](/2014/10/16/how-likely-is-it-that-my-team-will-win/) based on historical linescores and win-loss data. As Game 5 progressed, I referred to it often, and saw the Cardinals' chances of winning climb as high as about 75% and then collapse down to zero on Ishikawa's walk-off homer.

As I'm thinking about visualizations I want to do for next season, I wanted to see what this progression of odds actually looked like. Turns out, it looked like this:

<p id="chart-container" style="width:100%; height:400px;"></p>

{% javascript highcharts-custom %}

<script>
    $(function() {
        $('#chart-container').highcharts({
            title: {
                text: 'Odds of a Giants Win (by half-inning)'
            },
            chart: {
                type: 'line',
            },
            yAxis: {
                ceiling: 100,
                floor: 0,
                min: 0,
                max: 100,
                title: {
                    text: '%',
                }
            },
            xAxis: {
                categories: [
                    'T1', 'B1', 'T2', 'B2', 'T3', 'B3', 'T4', 'B4', 'T5', 'B5',
                    'T6', 'B6', 'T7', 'B7', 'T8', 'B8', 'T9', 'B9'
                ],
            },
            series: [{
                data: [59.05, 53.26, 58, 53.12, 45.68, 65.38, 44.67, 37.02, 42.19, 34.46, 40.6, 30.48, 35.94, 24.66, 29.55, 51.74, 65.29, 100],
                name: 'Giants Win %',
                color: '#F2552C',
                marker: {
                    fillColor: '#000000'
                }
            }]
        });
    });
</script>

The Cardinals peaked with Wainwright's last inning of work in the 7th, at which point they had a 75% chance of sending the series back to St. Louis. As soon as the Giants tied it again in the 8th, though, the odds fell back into Giants favor and never went back the Red Birds' way.

One interesting thing to notice on the chart is the sawtooth pattern in the scoreless fifth through seventh inning. Because the home team gets the last at bat, not scoring in the top of the inning reduces the odds of the away team winning, even though the score differential hasn't changed, because at that point the home team has an extra inning to work.

Another is how strong a home lead is. Looking at the drop in Giants' winning percentage between the end of the 2nd and middle of the 3rd, the Cardinals' run only swung their odds of winning by about eight percentage points, compared to a **20 point** swing when at the end of the 3rd the Giants were back up by one.
