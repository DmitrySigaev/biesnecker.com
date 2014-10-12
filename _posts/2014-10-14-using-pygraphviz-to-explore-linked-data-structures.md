---
layout: post
title: Using pygraphviz to explore linked data structures
image: /public/images/exploring_graphs.jpg
summary: >
    One of the more mundane challenges to overcome when exploring algorithms on linked data structures is coming up with test data upon which to test your implementations. I've done this enough that I wanted to create a set of generalized classes this easier.
---

When learning about linked data structures and the algorithms that operate on them, one of the more mundane challenges you face is coming up with test data upon which to operate, and verifying that your code is operating correctly. I've written adhoc classes to do this more times than I'd like to count, and I've finally decided to sit down and make something that I can reuse whenever I need to.

The idea is to make generating and visualizing appropriate test data easy, so that you can focus on what you're actually trying to learn.

All of this code can be found in [this Gist](), and is released [into the public domain](http://creativecommons.org/publicdomain/zero/1.0/). It is built on top of [pygraphviz](http://pygraphviz.github.io/), an open-source wrapper around the [graphviz](http://www.graphviz.org/) library. Do good things with it.

### Nodes

### Graphs

