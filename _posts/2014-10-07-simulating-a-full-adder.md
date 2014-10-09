---
layout: post
title: Simulating a full adder in code
image: /public/images/full_adder.jpg
summary: >
    Though of no real practical purpose, simulating a full adder circuit in code gives you insight into what's happening in your CPU's ALU (arithmetic logic unit) and increases your understanding of binary math, so you should totally try it out.
---

In the [Hacker News comments](https://news.ycombinator.com/item?id=8417045) on my [last post](biesnecker.com/2014/10/06/swapping-variables-with-xor/), *[Matumio](https://news.ycombinator.com/user?id=Matumio)* mentioned that XOR can be thought of as binary addition that discards the remainder. This is indeed true! Discarding the remainder, though, is problematic if you're actually trying to add two binary numbers together. The solution is a [full adder](http://en.wikipedia.org/wiki/Adder_(electronics)) that accepts three bits of input -- the two operands and a carry bit -- and produces two bits of output -- the sum and the carry.

The diagram above shows the schematic for a full adder. It consists of two XOR gates, two AND gates, and an OR gate. You'll never need to actually write a function to simulate such a circuit in real life (in all likelihood, but hey, stranger things have happened), but by doing so I think (hope!) that the process that binary addition (and, later, multiplication) uses will become more clear.

### The adder truth table

As I've said before, I think truth tables are a great way to grok what's going on in a logic circuit. Here is the truth table for a full adder:

<table>
    <thead>
        <tr>
            <th colspan="3">Inputs</th>
            <th colspan="2">Outputs</th>
        </tr>
        <tr>
            <th>A</th>
            <th>B</th>
            <th>C<sub>IN</sub></th>
            <th>S</th>
            <th>C<sub>OUT</sub></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
        </tr>
        <tr>
            <td>1</td><td>0</td><td>0</td><td>1</td><td>0</td>
        </tr>
        <tr>
            <td>0</td><td>1</td><td>0</td><td>1</td><td>0</td>
        </tr>
        <tr>
            <td>1</td><td>1</td><td>0</td><td>0</td><td>1</td>
        </tr>
        <tr>
            <td>0</td><td>0</td><td>1</td><td>1</td><td>0</td>
        </tr>
        <tr>
            <td>1</td><td>0</td><td>1</td><td>0</td><td>1</td>
        </tr>
        <tr>
            <td>0</td><td>1</td><td>1</td><td>0</td><td>1</td>
        </tr>
        <tr>
            <td>1</td><td>1</td><td>1</td><td>1</td><td>1</td>
        </tr>
</table>

The important thing to remember is that binary is base-2, so 1 + 1 = 10 -- a sum of 0 and a carry of 1. There are three ways to get 1 + 1 -- either both of the operands are 1 and the carry input is 0, one of the operands is 1 and the carry input is 1, or both of the operands is 1 and the carry is 1 (which will result in both a sum of 1 and a carry of 1).

### Adder function

The `adder` function is pretty easy to implement (and could be done with less intermediate assignment, but it's clearer what's going on this way):

{% highlight python %}
def adder(a, b, c_in):
    xor_1 = a ^ b
    xor_2  = xor_1 ^ c_in
    and_1 = xor_1 & c_in
    and_2 = a & b
    or_1 = and_1 | and_2
    return (xor_2, or_1)
{% endhighlight %}

Here I'm explicitly creating a variable to hold the output of each gate to make it clearer, and returning a tuple with the two outputs. It should be pretty easy to trace the wiring between the gates and understand how the code works.

### Actually adding two numbers

OK, now let's actually add two numbers together using this thing. What we're going to be implementing is basically a [ripple carry adder](http://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder), in which the C<sub>OUT</sub> of one adder is wired into the C<sub>IN</sub> of the next, until finally the chain of adders is complete. In the answer, the most significant bit will be the C<sub>OUT</sub> of the last adder. Of course, since we're not actually working with silicon and solder, we can chain as many adders together as we want using a single loop.

{% highlight python %}
def ripple_carry_adder(a, b):
    result = 0
    place = 0
    carry = 0
    while (a > 0) or (b > 0):
        s, carry = adder(a & 1, b & 1, carry)
        result |= (s << place)
        place += 1
        a >>= 1
        b >>= 1
    result |= (carry << place)
    return result
{% endhighlight %}

If you're spotty on bitwise operations like shifts, bit checking, and bit setting, check out a [previous post I did on the topic](http://localhost:4000/2014/10/05/a-gentle-introduction-to-binary-logic/). If you're comfortable with those, then this function should be easy to understand, but I'll walk through it anyway.

First, it sets up some variables to hold the final result, the place in the binary string (starting from the rightmost / least significant bit) we're on, and the carry value (which needs to be maintained between iterations of the loop). Then, in the body of the loop:

1. Use the least significant bit of `a` and `b` (using an AND to check whether that bit is set or not) and the current carry value to provide input to the adder function, and getting back the value for the current place and the new carry value.
2. Write `s` to the result in the right place by shifting the result enough places to the left for the value and the current bit to line up, and then using an OR to set it.
3. Increment the place so that we'll look at the next place value on the next iteration of the loop.
4. Right shift both `a` and `b` in order to drop the least significant bit.
5. Repeat the loop so long at least one of the operands is not zero.

Finally once the loop terminates, we need to deal with the final carry value. This is done in the same was as writing the `s` value inside the loop. Once all of this is done, `result` holds the sum of the `a` and `b`.

### Conclusion

As I promised two posts ago, we're now adding things together in binary, using the same sort of circuit that your computer's arithmetic logic unit uses (though it is likely implemented differently). It's not practical in a "oh this will solve a serious technical problem my project is encountering," but it's useful (for me at least!) to understand what's going on underneath the covers.
