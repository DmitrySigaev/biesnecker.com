---
layout: post
title: Swapping variables with XOR
image: /public/images/xor.jpg
---

I remember a long, long time ago a funny bit of bitwise magic that swapped the values of two integers in place without creating a third (probably in C, or some other language that doesn't support multiple assignment). It looks a little like this:

{% highlight c %}
// traditional method
int a = 5, b = 10, t = 0;
t = a;
a = b;
b = t;

// XOR method
a = a ^ b;
b = a ^ b;
a = a ^ b;
{% endhighlight %}

This, rightly I'd argue, seemed like total black magic to me at the time. While increasing my knowledge of [this sort of thing](/2014/10/05/a-gentle-introduction-to-binary-logic/), however, I decided to revisit it and figure out what's going on. This is what I figured out.

### XOR is basically a diff function

The realization that unlocked this black magic was this: XORing two binary numbers creates a [diff](http://en.wikipedia.org/wiki/Diff_utility) that tells you which bits need to change in order to get from one number to another. Remember XOR's truth table:

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

If two bits are the same (either both 1s or both 0s) then they don't need to change, and result in a 0. If two bits are the different, however, they result in a 1, marking that bit as needing to change. Let's look at the first step of the 5/10 swap I used as an example above (again, using Python, and padding the binary representation of 5 to make the two strings of equal length, because it's easier to see that way):

{% highlight python %}
a = 5   # 0101
b = 10  # 1010
a ^ b
#=> 15  # 1111
{% endhighlight %}

To go from 5 to 10 (or 10 to 5) you need to change all four bits. That's what the result -- 0x1111 -- tells you. With that realization in place, it becomes pretty obvious what the XOR trick does. The last (potentially not obvious?) thing to understand is that XOR is commutative -- that is, A &oplus; B &hArr; B &oplus; A. This means that the diff to get from A to B is the same as the diff to get from B to A.

Here's the sequence, annotated:

{% highlight python %}
a = 5
b = 10
a = a ^ b  # a is now the diff between 5 and 10
b = b ^ a  # b applies that diff, and is now 5
a = a ^ b  # apply the diff to b, returning 10
{% endhighlight %}

Pretty neat.

### Try this at home (but not in production)

As cool as this is, I wouldn't actually use it in production. It's not obvious, and in Python at least it's no faster than the (proper, understandable) use of multiple assignment:

{% highlight python %}
def multi():
    a = 5
    b = 10
    a, b = b, a

def xor_switch():
    a = 5
    b = 10
    a = a ^ b
    b = a ^ b
    a = a ^ b

%timeit multi()
#=> 10000000 loops, best of 3: 161 ns per loop

%timeit xor_switch()
#=> 1000000 loops, best of 3: 239 ns per loop
{% endhighlight %}

But it's interesting to highlight how XOR works, and another weapon in your arsenal.
