---
layout: post
title: Exploring pitches using the kinematic equations
image: /public/images/pitchfx_kinematic.jpg
summary: >
    PITCHf/x data collected on every pitch thrown in Major League Baseball games is a boon to interested in exploring the game numerically. The data is produced in such a way that it is ideal for analysis via the kinematic equations, so that is what I'm going to do.
mathjax: true
date: 2020-01-01
---

Since 2007, the [PITCHf/x](http://en.wikipedia.org/wiki/PITCHf/x) system has recorded information about every pitch thrown in a Major League Baseball game, and Major League Baseball Advanced Media makes this data freely available for non-commercial use. This means that you and I, sitting in our underwear, can use it to understand the physics underlying the 60.5-foot trip that each baseball makes from the picher's mound to the back of home plate.

It's an amazing time to be alive.

### The PITCHf/x data

PITCHf/x uses [a nine-parameter model](http://baseball.physics.illinois.edu/PitchFX_9P_Model-4.pdf) to turn pixel-level data returned by cameras mounted around the field into a constant-acceleration model used to plot the ball's trajectory. The parameters are a three-dimensional coordinate indicating a release point, and the seperated X, Y, and Z vectors for the ball's initial velocity and the acceleration acting upon the ball. With these values we can do all of the math we need to do using the kinmatic equations.

### The kinematic equations

[The kinemetic equations](http://www.physicsclassroom.com/class/1DKin/Lesson-6/Kinematic-Equations) are equations that can be used to calculate various quantities describing a moving object under constant acceleration (but only under constant acceleration -- if the acceleration is changing over time then you can't use them).

We're going to use three equations to talk about pitches. The first is calculating the velocity of the ball crossing the plate given the velocity of its release.

<p>$$v_f^2 = v_i^2 + 2ad$$</p>

The second is calculating the position of the ball at any given point in time (modified slightly from the base formula because we have a specific starting point (the pitch's release point)).

<p>$$d_t = d_i + v_it * \frac{1}{2}at^2$$</p>

With that equation, we can plot the trajectory of the ball.

### A note on axes

The definition of the X, Y, and Z axes used by the PITCHf/x data makes the most sense if looked at from the catcher's perspective. The origin of X is in the middle of the plate, and is negative to the left (so a right-handed pitcher's release point is negative). The origin of Y is the back of home plate, and is positive moving toward the pitcher (so at release a pitch has a significant negative Y velocity, as it is moving quickly toward Y=0). Finally, the origin of the Z axis is the ground, so pitches all have a negative Z axis acceleration thanks to gravity.


