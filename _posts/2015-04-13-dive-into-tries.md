---
layout: post
title: "A&DS: Diving into tries"
image: /public/images/algods-001.jpg
summary: Tries are one of my favorite data structures, and it feels like I constantly run into problems that they can help solve.
category: algods
---

<em>[Algorithms &amp; Data Structures](/algods/) is an ongoing series in which I explore interesting data structures and algorithms, because they're fun.</em>

Most of us have interacted with tries (which I pronounce "try" but some which people pronounce "tree," which strikes me as incredibly confusing) in the form of typeaheads, where you type the beginning of something and it offers you a selection of possible values that start with what you typed. Tries, also known as prefix trees, are an easy way to encode values that share a common prefix, and easily query which values share a given prefix. They're also just simple trees, which makes them easy to understand.

## Thinking about tries

Imagine you have an array of ASCII strings. It's a large array. Millions of items. And you want to find all of the strings that start with the letters 'foo.' No problem, just loop through them and print the words that match.

{% highlight python %}
for word in words:
    if word.startswith('foo'):
        print(word)
{% endhighlight %}

Simple, straightforward, and painfully slow. On a modern computer, with a million strings, it probably doesn't take very long, but still -- what if you need to search for a couple of hundred such prefixes. Maybe a couple thousand prefixes. Maybe there are a billion strings. That O(_n_) time complexity starts to look sub-optimal pretty quickly.

A trie can do much better. Search is also done in linear time, but it's linear to the length of the _key_, not the length of the array to be searched. So the time complexity of searching a thousand strings for examples that start with 'foo' and searching a billion strings for the same prefix are roughly the same (though creating the trie for a billion items is going to take quite a bit longer than creating the trie for a thousand items, so you want to make sure you're in a place where you can build the trie once and search it many many times). 

<img src="/public/images/trie_example.svg" width="50%" style="float:right; padding-left:20px; padding-bottom:2px" />On the right is a trie storing the strings _foo_, _foobar_, and _foobaz_. It's pretty easy to see how this works from the example. 

### Inserting a new string into a trie

1. Set the current node as the root node.
2. Set the current character as the first character of the string.
3. Does one of the current node's children encode the current character? 
    1. If yes, then set the current node to that child, and set the current character to be the next character in the string.
    2. If no, then add a child to encode the current character, set the current node to that newly created node, and the current character to be the next character in the string.
4. Go back to Step 3 until you're out of characters in the string.

Pretty simple and straightforward. In this example we store a stop value (maybe a `None`) as a child to indicate that the string is complete, but in real life you might store values as children that are associated with the string.

### Searching for a string in a trie

Searching for a string in a trie is basically the same as inserting one, except that instead of adding a new node when you encounter a character that isn't encoded, you return a `False` value indicating that the string isn't found. If you get to the end of the string and there's not an indicator that this complete string exists (a `None` as a child, in this example), then return `False`. Otherwise, return `True`. This is simple enough that I'm not going to delve too much into it here, but there is code further down.

### Finding all strings that begin with a given prefix

This is where tries shine. Given a prefix, it's simple to find all encoded values that begin with that prefix. Since all complete strings end with a leaf node, what you want to do is as quickly and easily as possible get to the leaves of all subtrees rooted at the end of the given prefix. This is a perfect place to use a [depth-first search](/sweiqotd/2015/04/12/describe-the-most-common-ways-to-traverse-a-tree/) (though since your goal is to visit every leaf, a breadth-first search would work just as well -- if your goal was to find the first value in the subtree that fit some criteria, you'd opt for depth-first search without question so that you could quickly short-circuit the search once a matching value was found). Then return a list of all strings found.

## Onto the code!

After all of the above narrative, I think the code will be pretty straightforward.

### TrieNode class

Nothing particularly interesting aobut the `TrieNode` class. Note that I'm using a dictionary to hold the children, so that I can easily reference them by their value, rather than having to iterate through a list of children to see if a particular value was already a child of the current node. This will save a lot of time and effort down the road.

{% highlight python %}
class TrieNode(object):
    def __init__(self, value):
        self.value = value
        self.children = {}
{% endhighlight %}

### Trie class

I decided to create a `Trie` class to hold the tree's root, and to give a convenient spot to attach functions that manipulate the trie. Right now, we'll just define the `__init__` function, which simply creates a dummy root node for the rest of the trie to build from.

{% highlight python %}
class Trie(object):
    def __init__(self):
        self.root = TrieNode(None)
{% endhighlight %}

### Adding a string

Adding a new string to the trie is simple. Loop through the characters one by one and try to use existing nodes, but when a node doesn't exist for the path you're taking create a new node and keep going. Note that at the end a `None` key is inserted to indicate that it's the end of the word. That way you can tell if 'foobar' has been entered but 'foo' is not -- even though there are the nodes [f]-[o]-[o], there won't be a `None` value to indicate that a string actually ended there. Note also that this is an instance function of the `Trie` class (as are the other functions below), but the rest of the function's definition has been elided.

{% highlight python %}
class Trie(object):
    # [...]
    def add_string(self, s):
        current = self.root
        for c in s:
            if c in current.children:
                current = current.children[c]
            else:
                new_node = TrieNode(c)
                current.children[c] = new_node
                current = new_node
        if None not in current.children:
            current.children[None] = None
{% endhighlight %}

### Testing membership

How do you know if a particular string has been encoded in the trie? You should be able to follow the same route that the creation function above did, but instead of creating a new node when you discover that one doesn't exist, you can just return false, because if the string you're looking for was in the trie you'd never be missing a node. 

{% highlight python %}
class Trie(object):
    # [...] 
    def contains(self, s):
        current = self.root
        for c in s:
            if c in current.children:
                current = current.children[c]
            else:
                return False
        return None in current.children
{% endhighlight %}

Clearly some code could be shared between these two functions (and, really, the one below as well), because so many operations on a trie involve navigating through the trie based on a given string, and then doing something when you either can or can't find a path.

### Searching for strings contains a prefix

This our trie's real meat and potatoes functionality (and, not unsurprisingly, the most complex. It starts off the same as `contains`, trying to find a route that encodes the given prefix, but instead of stopping there it then uses that node as the root of a depth-first search through the remaining nodes. Two things of note:

1. Because each node only contains a single letter of the string that created it, there's no way for it to know what the substring encoded by the nodes before it was. Because of that, when you process each node you also need to provide the substring seen so far. This is done by pushing a tuple containing the next node to process and the substring that preceded that node into the deque.
2. Remember that strings are terminated by a `None` key. Thus the special handling for the `None` case -- it's what indicates that this particular branch of the search is complete and the substring that has been found thus far is actually the entire string.

{% highlight python %}    
class Trie(object):
    # [...]
    def starts_with(self, prefix):
        current = self.root
        for c in prefix:
            if c in current.children:
                current = current.children[c]
            else:
                return []
        results = []
        nodes = deque([(current, prefix)])
        while nodes:
            node, prefix = nodes.pop()
            for key, child in node.children.items():
                if key is None:
                    results.append(prefix)
                else:
                    nodes.append((child, prefix + key))
        return results
{% endhighlight %}

## Takeaways

Tries are awesome. Though like most tutorials I just used strings for this example, tries are useful any time a series of values needs to be used to look up some other value. Another place you could use them, for instance, is tracking users going through a particular set of screens -- encoded as a trie, it's trivial to see the various paths taken by users once they hit a particular screen.

The downside of a trie is, of course, size. Compared to a single character, a `TrieNode` is pretty hefty. While the relative size increase goes down as more data is encoded (because, especially if you're encoding strings of real words, patterns repeat quite heavily). There are options for dealing with this that make tries more efficient (at the cost of simplicity), but those are topics for another day.
