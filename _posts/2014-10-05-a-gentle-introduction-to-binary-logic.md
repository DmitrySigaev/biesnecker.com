---
layout: post
title: Boolean logic for programmers
image: /public/images/george_boole.jpg
---

One of my (many) weaknesses as a programmer has long been a soft understanding of binary math. I've always known the basics, but I've never gotten my hands dirty enough to really feel comfortable with it. A few months ago I resolved to change that, and a few weeks ago I actually began changing it. I'm still not a pro, but I feel like I understand it a lot better than I did.

### Boolean logic is step one

Boolean logic is a good starting point because *True* and *False* maps nicely to binary's 1 and 0. Pretty much all binary math is accomplished via simple Boolean logic operations, so having a good grip on these basic operations is important. In this post, I'll cover AND, OR, XOR, and NOT.

Below I'm going to use [truth tables](http://en.wikipedia.org/wiki/Truth_table) to show how each operator works, because I found them super useful in understanding what was going on, especially

#### Conjuction (AND)

Pretty simple for anyone who has ever written code (or, like, spoken a human language). AND is True if both *P* and *Q* are True, otherwise it's False. The **&and;** symbol is used for this in math, while some variation of **&amp;** or **and** is used in most programming languages.

<table>
    <thead>
        <tr>
            <th>P</th><th>Q</th><th>P &and; Q</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>T</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>T</td><td>F</td><td>F</td>
        </tr>
        <tr>
            <td>F</td><td>T</td><td>F</td>
        </tr>
        <tr>
            <td>F</td><td>F</td><td>F</td>
        </tr>
    </tbody>
</table>

#### Disjunction (OR)

OR is like AND's slightly cooler and more permissive little brother. While AND requires both *P* and *Q* to be True in order to be True, OR is cool with returning True if either of them are True, and is only False if both *P* and *Q* are False. The **&or;** symbol is normally used in math, while some variatin of **|** or **or** is used in most programming languages.

<table>
    <thead>
        <tr>
            <th>P</th><th>Q</th><th>P &or; Q</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>T</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>T</td><td>F</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>F</td><td>F</td>
        </tr>
    </tbody>
</table>

#### Exclusive Disjunction (XOR)

Continuing with the family member theme, XOR is OR's slightly less cool cousin, who wants to be cool like OR but just can't let some things go. You can think of XOR as "one or the other, but not both" &mdash; while OR returns True if both operands are True, XOR does not. XOR only returns True if the operators are different, otherwise it returns False. Math uses the cool **&oplus;** symbol to represent XOR, but not all programming languages have an XOR operator. Some use the **^** (not to be confused with the AND mathematical symbol above) for bitwise XOR, and generally something like `P != Q` will work with Boolean values.

 <table>
    <thead>
        <tr>
            <th>P</th><th>Q</th><th>P &oplus; Q</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>T</td><td>T</td><td>F</td>
        </tr>
        <tr>
            <td>T</td><td>F</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>F</td><td>F</td>
        </tr>
    </tbody>
</table>

#### Negation (NOT)

Finally, NOT is basically my two-year old, who has known the word "NO" for a year but still won't say "YES" without prompting. The NOT operator takes a single operand and returns its opposite. True becomes False, False becomes True, etc. Math uses the **&not;** symbol for this, and most programming languages use **!** or **not** (or the **&tilde;** for bitwise operations).

 <table>
    <thead>
        <tr>
            <th>P</th><th>&not; P</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>T</td><td>F</td>
        </tr>
        <tr>
            <td>F</td><td>T</td>
        </tr>
    </tbody>
</table>

Hopefully all of that makes sense, because we're going to use it in the next section.

### Bitwise operations are step two

We're getting closer to doing math in binary. Actually, we're basically there, and could be there even without the above logical operators and these bitwise logical operations, but honestly I don't think that's the right path to take, because understanding how to do binary math by hand is of limited utility. Understanding how a computer does it is of slightly (but probably only very slightly) more utility, and to understand that you need to understand how logic circuits operate on binary values.

With that out of the way, let's talk about doing bitwise operations on numbers. All of my examples are going to be in Python, because I like to write Python, but you can follow along in whatever language you prefer.

Remember that a computer stores everything in binary. Thus a number is just a string of 1s and 0s, and since those 1s and 0s map to *True* and *False* so nicely, you can use Boolean logic to manipulate those 1s and 0s. The only difference between what we just talked about with logical operators and bitwise operations on a computer is that when *P* and *Q* are two numbers the operation is applied to each bit of both numbers in turn, from the least significant bit to the most significant bit.

Starting with the simplest example, let's throw 1 and 0 at these bitwise operators and see what happens (we're going to skip NOT for now because it gets into how signed numbers are represented in binary, and I'm not going to go into that in this post).

{% highlight python %}
p = 1
q = 0

# AND
p & q
#=> 0

# OR
p | q
#=> 1

# XOR
p ^ q
#=> 1
{% endhighlight %}

Pretty much exactly what you would expect from the truth tables above. That's because the numbers zero and one are encoded as 1 and 0 in binary, and so going bit-by-bit from least to most significant for those two numbers only takes a single step.

But what about all the other numbers. Well, let's take a simple example: 10 and 11. Both of these numbers are conveniently four bits long (you can use the `bin` function in Python to print an integer's binary representation)

{% highlight python %}
p = 10  # 1010
q = 11  # 1011

# AND
p & q
#=> 10  # 1010

# OR
p | q
#=> 11  # 1011

# XOR
p ^ q
#=> 1  # 0001
{% endhighlight %}

These results may not seem intuitive at first, but they make sense when you look more deeply. AND will return 1 if both *P* and *Q* are 1, right? Looking at 1010 and 1011 from right to left (least to most significant), the four operations are:

1. `0 & 1`, which equals 0.
2. `1 & 1`, which equals 1.
3. `0 & 0`, which equals 0.
4. `1 & 1`, which equals 1.

The reason that `10 & 11` is equal to 10 is because the two numbers differ by only a single bit (the least significant bit), and when different values are ANDed together they always result in 0.

The XOR result is a little bit interesting. Just a couple of minutes ago I said that 1 is represented in binary as 1, but just like you can write the number 42 as 000000042 if you really want to, you can write the binary number 1 as 0001 and it won't make any difference. Because XOR only returns 1 if the two operands differ, and 10 and 11 only differ on that last bit, you're left with only that last bit. The extra zeros are just to pad it out so that it looks the same as the rest.

This is, incidentally, how bitwise operations are handled when one number is longer than the other &mdash; you just tack zeros onto the left of the shorter number until the binary representations are the same length, and the proceed as usual. For example:

{% highlight python %}
p = 78  # 1001110
q = 5   # 101

# AND
p & q
#=> 4  # 100

#   1001110
# & 0000101
#   =======
#   0000100
{% endhighlight %}

Pretty straightforward, no?

### Bit manipulation is a totally optional step

You now know enough to do some interesting things with binary numbers. You *definitely* don't need these to do binary math, but they might come in handy elsewhere (software developer interviews come to mind).

#### Bit shifting

Each bit in a binary number represents a power of two, just like each digit in an everyday base-10 number represents a power of ten. Every kid learns in school that when you multiply a number by 10 you don't have to do any real math, you just have to add a zero to the end of the original number, right? Well, bit shifting is the same, except that in the base-2 world you multiply a number by two in order to add a zero to it. Division works the same way (with the remainder dropped if the number is odd). Most programming languages use **&lt;&lt;** to represent a left shift (which multiples) and **&gt;&gt;** for a right shift (which divides). Some examples:

{% highlight python %}
1 << 1
#=> 2

10 << 2
#=> 40

500 >> 1
#=> 250

33 >> 2
#=> 8

6 >> 5
#=> 0
{% endhighlight %}

The last two are, I believe, a little bit interesting.

33 (100001) is an odd number. When it is shifted to the right, the rightmost (least significant) bit is discarded. This results not in 16.5, which dividing 33 by 2 in base-10 would, but rather 16 (10000). The second right shift just drops another zero off the right, and results in 8 (1000), which is as expected.

The first time that 6 (110) is shifted to the right, it loses its rightmost 0 and becomes 3 (011). The second time, it loses its rightmost 1 and becomes 1 (1). The third time, that last 1 shifted off to the right and nothing's left. Except, well, something is left &mdash; an infinitely long string of zeros. No matter how many times you shift them to the right, you'll always get zero.

#### Checking a bit

What if you want to know if a particular bit on a number is set? You need an operation that will always return True if that bit is set, and always return False if it's not. Sounds like a job for AND, doesn't it? First let's see how to check the status of the least significant bit:

{% highlight python %}
p = 37  # 100101
p & 1
#=> 1

q = 24  # 11000
q & 1
#=> 0
{% endhighlight %}

By now it should be obvious what's going on. But what if you want to check the status of a bit other than the least significant bit? Well, you need to AND your number with a number that has the bit you care about set, and no others. How might one get that 1 all the from the least significant bit to the bit one cares about? Bit shifting!

If you shift 1 to the left, you're essentially pushing that 1 to the left and shoving a 0 behind it into the least significant spot. If you care about the fifth bit (remember that bits are zero-indexed), then shift 1 over five times, like this:

{% highlight python %}
p = 378  # 101111010
q = 32   # 000100000
#=> 32
{% endhighlight %}

There's only two possible results from this operation. Either you'll get 0 (because the one bit you cared about was 0, and then the 0s in the number you used to check with will ensure that all of the others are), or you'll get the number you used to check with (in this case, 32). If you really need either a 1 or a 0 as the result, just shift what you get back to the right the same number of times that you shifted the number your checked with to the left.

#### Setting a bit

Next, what if you want to set a particular bit. You need an operation that will always leave the bit you care about as 1, and not affect any of the other bits. OR fills this role nicely, again using a number that has the bit you care about set to 1 and the rest set to zero. If it's not clear why this works, take another look at OR's truth table.

<table>
    <thead>
        <tr>
            <th>P</th><th>Q</th><th>P &or; Q</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>T</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>T</td><td>F</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>F</td><td>F</td>
        </tr>
    </tbody>
</table>

If the value of the bit you care about is 1, it doesn't matter what the original value was, the result will always be 1. If the rest of the bits on the number you're using are all 0, then they'll return whatever is set in the original number, without messing with any of them.

Now for some examples:

{% highlight python %}
p = 597  # 1001010101
q = 2    # 0000000010
p | q
#=> 599  # 1001010111

p = 88  # 1011000
q = 8   # 0001000
p | q
#=> 88  # 1011000
{% endhighlight %}

Notice in the second example nothing changed, because the third bit was already set, and none of the other bits were messed with.

#### Flipping a bit

Finally, having checked and set a particular bit, it's time to flip a bit's value from 1 or 0, or 0 to 1, again without affecting any other bits. It's probably obvious that this is doable using an XOR operator, which returns 1 if the two bits are different but 0 if they're the same (regardless of whether the original bit was 1 or 0). Let's look:

{% highlight python %}
p = 52  # 110100
q = 8   # 001000
p ^ q
#=> 60  # 111100

p = 241  # 11110001
q = 16   # 00010000
p ^ q
#=> 225  # 11100001
{% endhighlight %}

### Conclusion

Basic Boolean logic and bitwise operations really aren't that hard. Binary can be a little intimidating at first, but again, not that hard, especially once you've spent some time with it and get a feel for how numbers look as they increment. I wouldn't abandon my base-10 for base-2 just yet, but gaining a comfortable familiarity with the language your computer actually speaks isn't a bad thing.

Next time, I'll talk about actual binary math.
