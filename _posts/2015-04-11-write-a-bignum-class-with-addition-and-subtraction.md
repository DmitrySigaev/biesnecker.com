---
layout: post
title: "SWEIQotD: Write a bignum class with addition and subtraction operations"
image: /public/images/sweiqotd-003.jpg
summary: Even though Python (and many other languages) have built-in bignum support, writing one can be an interesting exercise.
category: sweiqotd
---

<em>[Software Engineering Interview Question of the Day](/sweiqotd/) is an ongoing (semi-) daily series in which I explore the answer to a question that is like the questions one is asked in a software engineering interview. This is mostly for my own benefit, but may benefit you, as well, so I decided to share.</em>

## Question

Write a `Bignum` class to store large (unsigned) integers. Implement addition and subtraction operations.

## Approach

The first and most obvious (to me, at least) approach is to store the number as a list of digits, and operate on those digits by iterating through that list. One potentially less intuitive thing that I'm going to do is store the digits backwards, so that the least significant digit comes first in the list. This is because operations occur from the least to the most significant digits, and appending to the end of a list is O(_1_) while inserting into the middle of a list is O(_n_). I could have used a [deque](https://docs.python.org/2/library/collections.html#collections.deque) to make both operations efficient, but I didn't bother because this works well.

### Bignum class

{% highlight python %}
class Bignum(object):
    
    @classmethod
    def from_num_array(cls, nums):
        n = cls('0')
        n.nums = nums
        return n

    def __init__(self, numstring):
        self.nums = [int(c) for c in numstring[::-1]]

    def __str__(self):
        return "".join(str(n) for n in self.nums)[::-1]
{% endhighlight %}

I defined two helpful but not strictly necessary functions. `from_num_array` just makes it easier to create a `Bignum` if I already have an array of digits in the right order, to be used below in the addition and subtractin functions. The magic function `__str__` defines how the class should be rendered as a string, which aids in debugging.

### Addition

Addition is pretty straightforward. The only thing that we need to be concerned with at all is managing the carry value, and making sure that we loop over the lists properly, as the list of digits for one `Bignum` could be shorter than the other.

{% highlight python %}
from itertools import zip_longest

def bn_add(a, b):
    result = []
    carry = 0
    for p in zip_longest(a.nums, b.nums, fillvalue=0):
        s = p[0] + p[1] + carry
        if s > 9:
            s -= 10
            carry = 1
        else:
            carry = 0
        result.append(s)
    if carry:
        result.append(1)
    return Bignum.from_num_array(result)
{% endhighlight %}

Here I used the `zip_longest` function from `itertools` to remove any worry of one list being longer than the other. While I wouldn't recommend trying to use non-standard library modules during an interview (unless it's specifically for Python, and they want you to prove your knowledge of numpy or whatever), you should know the standard library backwards and forwards. Functions like `zip_longest` make your life so much easier, and in this case remove an easy source of error (iterating improperly over the lists).

### Subtraction

Subtraction is pretty similar to addition, with the carry representing a "borrowed" value. In this question we're only concerned with unsigned numbers, so you don't have to compute negative results, but you should probably raise an exception if your result will be negative. 

{% highlight python %}
from itertools import zip_longest

def bn_subtract(a, b):
    result = []
    carry = 0
    for p in zip_longest(a.nums, b.nums, fillvalue=0):
        s = p[0] - p[1] - carry
        if s < 0:
            s += 10
            carry = 1
        else:
            carry = 0
        result.append(s)
    if carry:
        raise ValueError('a must be > than b')
    # Clean up leading zeros
    while result[-1] == 0:
        if len(result) == 1:
            break
        result.pop()
    return Bignum.from_num_array(result)
{% endhighlight %}

## Takeaways

Knowing the standard library and its utilities can save you a lot of trouble during an interview. There's nothing about `zip_longest` that can't be accomplished with loops and indexes, but those are sources of error, and yet another thing to think about while under pressure. Let the standard library work for you and remove that stress while you focus on the core problem.
