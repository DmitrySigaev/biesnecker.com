---
layout: post
title: "SWEIQotD: Describe the most common ways to traverse a tree"
image: /public/images/sweiqotd-004.jpg
summary: Having to traverse a tree is a super-common operation, and you need to know all of the common ways to do that.
category: sweiqotd
---

<em>[Software Engineering Interview Question of the Day](/sweiqotd/) is an ongoing (semi-) daily series in which I explore the answer to a question that is like the questions one is asked in a software engineering interview. This is mostly for my own benefit, but may benefit you, as well, so I decided to share.</em>

## Question

Describe the most common ways to traverse a tree.

## Approach

There are a lot of different ways that you could traverse a tree, but there are two major variants: depth-first and breadth-first. Additionally, depth-first can be done in three common ways: pre-order, post-order, and in-order. 

They are all quite similar. We'll look at them individually.

### Building a tree

First, a simple class definition for nodes. For this I'm creating binary trees, but the concept is exactly the same regardless of how many children a node can have. I'll actually just borrow the solution from [a previous installment](/sweiqotd/2015/04/10/sweiqotd-transform-sorted-array-to-binary-tree/) of SWEIQotD for this, as it does exactly what we want it to do. 

{% highlight python %}
class Node(object): 
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
{% endhighlight %}

Unlike the original problem from which this code came I don't care if the trees created a binary search trees, so I'll just pass it an array of integers and let it build the tree so that I can traverse it later.

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

### Breadth-first traversal

Breadth-first is also called level-order traversal, because starting at the root you visit every node on a level before visiting any of the nodes on the next level. It's also a good way to start talking about tree traversal, because all of the methods are similar and breadth-first is the simplest to explain.

{% highlight python %}
from collections import deque

def breadth_first_traversal(tree):
    q = deque()
    q.append(tree)
    for node in q:
        print(node.value)
        if node.left:
            q.append(node.left)
        if node.right:
            q.append(node.right)
{% endhighlight %}

That's it! It's really simple. The key is that I'm using a queue (implemented using Python's `deque`) where the children of visited nodes are retrieved in a FIFO manner. That means that children from one level's nodes will all be visited prior to the childrens' children. 

### Depth-first traversal

It's not hard to imagine that the opposite of breadth-first search would be defined as using the opposite of a queue for holding the next values to be visited. What's the opposite of a FIFO queue? Perhaps a LIFO stack? While it is definitely possible to use a stack object and depth-first process a tree iteratively, it's easier to use the system's function call stack as your stack and use recursion.

Depth-first traversal is further split into three common subtypes: pre-order, in-order, and post-order traversal. They are exactly the same except for when a node is operated upon (in my examples, printed). The orders of operations are:

* Pre-order
    * Visit Node
    * Traverse Left
    * Traverse Right
* In-order
    * Traverse Left
    * Visit Node
    * Traverse Right
* Post-order
    * Traverse Left
    * Traverse Right
    * Visit Node

#### Pre-order

{% highlight python %}
def depth_first_preorder(node):
    if not node:
        return
    print(node.value)
    depth_first_preorder(node.left)
    depth_first_preorder(node.right)
{% endhighlight %}

#### In-order

{% highlight python %}
def depth_first_inorder(node):
    if not node:
        return
    depth_first_inorder(node.left)
    print(node.value)
    depth_first_inorder(node.right)
{% endhighlight %}

#### Post-order

{% highlight python %}
def depth_first_postorder(node):
    if not node:
        return
    depth_first_postorder(node.left)
    depth_first_postorder(none.right)
    print(node.value)
{% endhighlight %}

## Takeaways

The difference between a breadth-first traversal and a depth-first traversal is that data structure that the next nodes to be visited are stored in -- a stack (LIFO) for depth-first and a queue (FIFO) for breadth-first.

You should be able to do these in your sleep. So many other questions assume that you can handle tree traversals that you can't let this trip you up.
