---
layout: post
title: "SWEIQotD: Are two strings anagrams?"
image: /public/images/sweiqotd-001.jpg
summary: Write a function that decides if two strings are anagrams.
category: sweiqotd
---

<em>[Software Engineering Interview Question of the Day](/sweiqotd/) is an ongoing (semi-) daily series in which I explore the answer to a question that is like the questions one is asked in a software engineering interview. This is mostly for my own benefit, but may benefit you, as well, so I decided to share.</em>

## Question

Write a function to decide if two strings are anagrams.

## Approaches

Sometimes I think that string questions are too easy in modern, dynamic languages like Python, but they're still asked. The key, then, is to make sure that your answer is as performant as possible.

### Approach #1

A string is an anagram of another string if it contains exactly the same characters as another string, in the same of a different order. Since the comparison of the two strings doesn't depend on the order in which the characters appear, you could sort them -- sorted anagrams will be identical to one another.

{% highlight python %}
def anagrams(s1, s2):
    return sorted(s1) == sorted(s2)
{% endhighlight %}

Sorting, though, has a time complexity of O(_n log n_). You can do better than that.

### Approach #2

The real question here is 'how can you determine if count of unique characters, and the frequency of occurence of those characters, is the same between two strings?' Well, you can always just count them, right?

{% highlight python %}
from collections import Counter

def anagrams(s1, s2):
    c1 = Counter(s1)
    c2 = Counter(s2)
    for k, v in c1.items():
        if c2[k] != v:
            return False
    return True
{% endhighlight %}

Python's `Counter` class is incredibly useful! The time complexity of this is now O(_n_). In the real world, you could build a couple of early escape hatches in -- check for string equality up front, and that they're the same length -- but I don't think that's necessary here.

At first, the space complexity of this approach seems worse than the first. It's not, though. First off, Python's `sorted` makes a copy of what it's sorting, so Approach #1's space complexity is O(_n_) (and a good reminder to understand what different standard library functions are doing internally), but even if you used an in-place sort both of these approaches have O(_1_) space complexity. Why?

Because the set of possible characters is limited, and isn't related to the length of the string. If both strings are ASCII, then the maximum number of keys in the counters is 256. If it's unicode the max is quite a bit larger, but it's still bound and doesn't vary in proportion to the length of the string. 
