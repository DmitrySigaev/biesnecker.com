---
layout: post
title: 3 ridiculous Javascript n00b gotchas
image: /public/images/javascript_n00b_gotcha.jpg
summary: >
    As a Javascript n00b, these are three things that keep biting me in the ass. I'm hoping by writing this I'll embed best practices a little bit deeper into my brain.
---

I'm a Javascript n00b, and I've been spending [a decent amount of time with it](http://biesnecker.com/2014/10/20/why-im-betting-on-javascript/) lately. As such, I've had plenty of chances to be caught by its many gotchas, and these are the three upon which I've stubbed my toes the most frequently.

### The equality operator

Programming n00bs often forget that `=` is assignment and `==` checks for equality, but Javascript adds an extra layer of confusion to this, because `==` coerces types before doing an equality check. That results in things like this:

{% highlight javascript %}
var a = 1;
var b = "1";

a == b;  // true
{% endhighlight %}

While I'm sure there are cases where this is desired behavior, I can't think of any off the top of my head. Thankfully Javascript also has a type-aware equality operator, `===`, that will return expected results (if you remember to use it!):

{% highlight javascript %}
var a = 1;
var b = "1";

a === b;  // false
{% endhighlight %}

I've found that despite *knowing* that I should use `===`, I have almost two decades of muscle memory telling me to type two equals signs rather than three to fight against. I've made this mistake several times, and given Javascript's dynamic typing it can be very difficult to debug.

### Everything is a float

Javascript only has one numeric type, `Number`, and it's a 64-bit [IEEE floating point](http://en.wikipedia.org/wiki/IEEE_floating_point) value. Beside regular floating point weirdness like rounding errors:

{% highlight javascript %}
var a = 0.1;
var b = 0.2;

a + b === 0.3; // false, #smh
{% endhighlight %}

There are also some interesting issues resulting from having [signed zeros](http://en.wikipedia.org/wiki/Signed_zero). Check this out:

{% highlight javascript %}

var a = 0 * 1;
var b = 0 * -1;

1/a === 1/b; // false, wtf?
{% endhighlight %}

At first this just doesn't make any sense. Both `a` and `b` are zero, and dividing by zero in Javascript results in a value of `Infinity` rather than (more sensibly, I think) throwing an error, so why doesn't `1/a` equal `1/b`? Because `a` and `b` do indeed both equal zero, but `a` sequals *positive* zero, and `b` equals *negative* zero. This means that `1/a` is *positive* infinity while `1/b` is *negative* infinity. Fun, isn't it?

### No block scope

This actually isn't that bad because I spent the better part of a year immersed in Python, which also lacks block-level scope, but I've still been bitten a few times by the way that scope is handled in anonymous function callbacks within a function.

Javascript has function scope, which means any variable declared within a function is visible throughout that function. A lot of other languages, including those that Javascript syntactically resembles, has block scope, so that things like loops and if-then-else statements create their own private scope. There are probably plenty of good reasons for not having block scope, but I find the smaller scope to be a lot easier to reason about.

This means, for instance, that the counter variable you declare in a `for` loop is available outside of the loop:

{% highlight javascript %}
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i); // 10
{% endhighlight %}

It also makes it pretty easy to accidentally clobber values that are in a containing block. This is the mistake I frequently make (the trivial example below makes it obvious, but it's not always this obvious):

{% highlight javascript %}
var a = 2;
var b = 4;
if (a < b) {
    var a = 0;
    console.log(a); // 0
}
console.log(a) // 0, not 2
{% endhighlight %}

Finally, since all variables are attached to a function scope, the Javascript interpreter will move all `var` statements to the top of that scope during execution (I'm not really sure why? Maybe because it's more efficient to allocate them all at once?), which results in funny bugs like this:

{% highlight javascript %}
var a = 2;
(function() {
    console.log(a); // undefined, not 2
    var a;
})();
{% endhighlight %}

It would seem like the value of `a` should be available to the `console.log` function, but because the interpreter moves the redefinition of `a` up to the top of that anonymous function, `var a` is actually executed *before* `console.log(a)`, and is thus undefined at the time that it is printed.

### Conclusion

Javascript is a wonderful, widely used language with a lot of very strange "features" waiting to bite you in the ass if you're not careful. This is not even close to a complete list of Javascript gotchas, but they are the mistakes I've caught myself making more frequently in the last few weeks.
