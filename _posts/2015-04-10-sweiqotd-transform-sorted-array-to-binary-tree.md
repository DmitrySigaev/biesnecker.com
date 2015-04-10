---
layout: post
title: "SWEIQotD: Transform a sorted array into a binary search tree"
image: /public/images/sweiqotd-002.jpg
summary: Write a function that takes a sorted array and returns a binary search tree of minimal height.
category: sweiqotd
---

<em>[Software Engineering Interview Question of the Day](/sweiqotd/) is an ongoing (semi-) daily series in which I explore the answer to a question that is like the questions one is asked in a software engineering interview. This is mostly for my own benefit, but may benefit you, as well, so I decided to share.</em>

## Question

Write a function that takes a sorted array and returns a binary search tree of minimal height.

## Approach

A binary search tree is a binary tree in which all of the nodes to the left of a given node are smaller than the value of the node, and all of the nodes to the right are larger. Since you're given a sorted list to begin with, you can sort of pick it up in the middle like a (recursive) wet noodle and turn it into a tree.

First, you need to define what a node looks like. 

{% highlight python %}
class Node(object): 
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

{% endhighlight %}

Now we need to write a function that takes the array and turns it into a binary search tree. This is clearly a problem that recursion can solve, as each step in the process is a copy of the previous operation on a smaller set of data.

{% highlight python %}
def make_subtree(nums):
    if not nums:
        return None
    mid = (len(nums) - 1) // 2
    node = Node(nums[mid])
    node.left = make_subtree(nums[:mid])
    node.right = make_subtree(nums[mid+1:])
    return node
{% endhighlight %}

Here we take advantage of Python's fantastic slicing functionality to split the array at each step into two halves -- one smaller than the midpoint and one larger than the midpoint. If the passed list is empty, then `None` is returned, signifying an empty link.

The time complexity of this approach is O(_log n_), because the length of the list of numbers that you're dealing with halves at each step. If you're finding yourself confused by time and space complexity, I found [this](http://stackoverflow.com/a/2307314/337184) to be a very helpful take on the subject. 

## Takeaways

Keeping track of where you are in a list of values that you're manipulating can be hard. If you can use recursion and higher-level functions (slicing lists instead of passing around indexes) if can be much easier to deal with -- not only do you only have to consider a small part of the problem at each step, you also don't have to worry quite so much about messing up index comparisons and stopping at the wrong point.
