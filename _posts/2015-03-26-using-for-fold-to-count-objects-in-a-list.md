---
layout: post
title: Using for/fold to count objects in a list
image: /public/images/for_fold.jpg
summary: >
  Folds are useful for translating a sequence of values into a single value. In this example, we'll turn a list of items into a hash map that contains how many times each item appears in the list.
---

Fold (or `reduce` in many languages) is a useful way to turn a sequence of values into a single value. Racket has traditional `foldl` and `foldr` functions available, but it also has an extremely useful `for`-based iteration form that can be used as an alternative, and which also provides some really nice additional functionality.

## Counting objects in a list

When writing Python, I frequently use the `Counter` class to quickly get frequency counts from lists of objects. Implementing a similar thing as a function in Racket is simple, and that's what we'll do here, transforming a list of objects (in the example, strings) into a hash map where the objects are keys and the values are the number of times that the key appeared in the original list.

The code is extremely straightforward:

{% highlight racket %}
(for/fold
  ([acc (make-immutable-hash)])
  ([word words])
  (if
    (hash-has-key? acc word)
    (hash-set acc word (add1 (hash-ref acc word)))
    (hash-set acc word 1)))
{% endhighlight %}

1. Creates an `immutable-hash` as an accumulator value.
2. Binds `word` to the current value of the `words` list.
3. Checks to see if `word` is already a key in `acc`, and if so increments the value (count) for that key by one, and if not inserts the key with an initial value of one.

That's it. In my mind, it's clearer than a fold, and the syntax is very clean.

## Multiple accumulators

The biggest advantage I see to using `for/fold` over traditional `fold` functions is that you can easily accumulate multiple values from the calculations on one or more lists. For instance:

{% highlight racket %}
(for/fold
  ([s 0] [p 1])
  ([n '(1 2 3 4)] [m '(5 6 7 8)])
  (values
    (+ s n m)
    (* p n m)))
{% endhighlight %}

Here there are two accumulators, `s` and `p`, and two lists of numbers, `m` and `n`. At each step a value is taken from both `m` and `n` and then calculations are performed with them and the current value of `s` and `n`, respectively. The result is the sum of all of the numbers and the product of all of the numbers, in one tight block of code. This is obviously a trivial example, but shows how easy it is to build up potentially complex transformations from one set of data to another.
