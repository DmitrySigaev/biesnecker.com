---
layout: post
title: Calculating the square root of a number
image: /public/images/square_root.jpg
summary: >
    Devising a method for calculating the square root of a number is a common technical interview question. Thankfully there's a very easy to understand (and write on a whiteboard) way to do this, and you should learn it and keep it in your back pocket just in case.
---

A common question on technical interviews is "provide a method to calculate the square root of a number." This is very much an interview question -- in the real world you should almost certainly use the square root function in whatever math package your language's standard library comes with -- but it's common enough (and simple enough) that you should probably know how to do it off the top of your head, just in case.

### Heron's method

Heron's method is attributed to [Hero of Alexandria](http://en.wikipedia.org/wiki/Hero_of_Alexandria), though it was probably known by Babylonian mathematicians before that. The algorithm starts with a bad estimate of the square root (in this case, dividing the number by 3, though there are better ways to make this initial estimate, as described below), and iterates until the difference between successive guesses is smaller than the desired precision.

{% highlight python %}
def heron_sqrt(n, precision=0.000000000001):
    if n == 0:
        return 0
    guess = n / 3.0
    while True:
        lastguess = guess
        guess = (guess + (n / guess)) / 2.0
        if abs(lastguess - guess) <= precision:
            break
    return guess
{% endhighlight %}

The idea behind this is that if you have an incorrect estimation that overshoots the true value and another one that undershoots the true value, then the average of those two will be a better approximation. Repeating this will get you closer and closer to the true value.

The math is probably straightforward enough to eyeball, but in case it's not, let's look at the iterations for `heron_sqrt(36)`:

- Guess: 12.0
- Last Guess: 12.0 Guess: 7.5
- Last Guess: 7.5 Guess: 6.15
- Last Guess: 6.15 Guess: 6.00182926829
- Last Guess: 6.00182926829 Guess: 6.00000027877
- Last Guess: 6.00000027877 Guess: 6.0
- Last Guess: 6.0 Guess: 6.0

Here the first guess is 12, which is greater than the true value. That is, the square of the guess will be a number larger than the actual number. So a reasonable second guess would be the result of the number divided by the first guess -- it will definitely be too low, but then the average of these two numbers should be closer to the true value. This continues until two successive guesses are close enough together that we're satisfied with the result.

### Conclusion

There are many other ways to calculate the square root of a number, but Heron's method is very straightforward and easy to remember, and produces good results. It is very unlikely that you'll ever have to use this algorithm in anger, but if you happen to be in an interview and are asked how to do it, you'll be ready.
