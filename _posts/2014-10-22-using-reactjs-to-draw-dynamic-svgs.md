---
layout: post
title: Using React.js to draw dynamic SVGs
image: /public/images/lake_reflection.jpg
summary: >
    One of the cool things about Scalable Vector Graphics is that they're just XML, which means they can be written with any tool that supports XML generation. Since React.js is a framework that takes state and emits XML (normally HTML, but it doesn't have to be), you can use it to create dynamic SVG images.
---

Scalable Vector Graphics (SVG) are a great way to include vector graphics on a web page. They're lightweight, XML-based, and supported by pretty much [all modern browsers](http://caniuse.com/#feat=svg). Because they're XML-based, they consist of nothing but markup, and can (in theory, at least) be created by anything that can generate valid XML markup. This includes my favorite Javascript user interface library, [React.js](https://facebook.github.io/react/).

This post started off as an exploration of ways to build some fancy graphics to illustrate the discussion of various algorithms, but I thought it was useful enough to be broken out into a standalone tutorial. If you find it useful, please [let me know](mailto:jbiesnecker@gmail.com) (if you don't find it useful, you can let me know that as well!).

### Getting started

SVGs live inside `svg` tags, so the first step is to create a simple component that creates an `svg` tag and renders its children inside it.

{% highlight javascript %}
var SVGComponent = React.createClass({
    render: function() {
        return <svg {...this.props}>{this.props.children}</svg>;
    }
});

React.render(
    <SVGComponent height="50" width="50" />,
    document.getElementById('svg_mount_example')
);
{% endhighlight %}

I've mounted a 50x50 SVG below.

<p id="svg_mount_example"></p>

Of course, it's blank, so it's not very exciting yet, but if you inspect it you'll clearly see that it's there.

### Basic shapes

#### Rectangles

{% highlight javascript %}
var Rectangle = React.createClass({
    render: function() {
        return <rect {...this.props}>{this.props.children}</rect>;
    }
});

React.render(
    <SVGComponent height="100" width="100">
        <Rectangle height="50" width="50" x="25" y="25" />
    </SVGComponent>,
    document.getElementById('svg_rectangle')
);
{% endhighlight %}

<p id="svg_rectangle"></p>

#### Circles

{% highlight javascript %}
var Circle = React.createClass({
    render: function() {
        return <circle {...this.props}>{this.props.children}</circle>;
    }
});

React.render(
    <SVGComponent height="100" width="100">
        <Circle cx="50" cy="50" r="25" />
    </SVGComponent>,
    document.getElementById('svg_circle')
);
{% endhighlight %}

<p id="svg_circle"></p>

#### Ellipses

{% highlight javascript %}
var Ellipse = React.createClass({
    render: function() {
        return <ellipse {...this.props}>{this.props.children}</ellipse>;
    }
});

React.render(
    <SVGComponent height="100" width="100">
        <Ellipse cx="50" cy="50" rx="25" ry="15" />
    </SVGComponent>,
    document.getElementById('svg_ellipse')
);
{% endhighlight %}

<p id="svg_ellipse"></p>

### Colors

Colors are passed as parameters to the components, much like HTML in the pre-CSS days. You can use any of the color formats available in CSS2, and SVG also supports [a superset of CSS's named colors](http://www.w3.org/TR/SVG/types.html#ColorKeywords).

The two most useful SVG color parameters are:

- `fill`: the interior color of the shape
- `stroke`: the color of the line forming the outside of the shape

Below is an example of these color properties, specified in several different ways.

{% highlight javascript %}
React.render(
    <SVGComponent height="100" width="230">
        <Circle
            cx="50" cy="50" r="25"
            fill="mediumorchid" />
        <Circle
            cx="125" cy="50" r="25"
            fill="#ff0099" />
        <Circle
            cx="200" cy="50" r="25"
            fill="none"
            stroke="crimson" />
    </SVGComponent>,
    document.getElementById('svg_colors')
);
{% endhighlight %}

<p id="svg_colors"></p>

SVG supports a [huge number](http://www.w3.org/TR/SVG/painting.html) of color and drawing properties, and understanding how they work and how they interact with each other is the key to unlocking advanced drawing capabilities.

### Lines

#### Straight lines

{% highlight javascript %}
var Line = React.createClass({
    render: function() {
        return <line {...this.props}>{this.props.children}</line>;
    }
});

React.render(
    <SVGComponent height="100" width="100">
        <Line x1="25" y1="25" x2="75" y2="75"
            strokeWidth="5"
            stroke="orange" />
    </SVGComponent>,
    document.getElementById('svg_straight_line')
);
{% endhighlight %}

<p id="svg_straight_line"></p>

#### Polylines

{% highlight javascript %}
var Polyline = React.createClass({
    render: function() {
        return <polyline {...this.props}>{this.props.children}</polyline>;
    }
});

React.render(
    <SVGComponent height="100" width="100">
        <Polyline
            points="25,25 25,75 50,75 50,50 75,25"
            strokeWidth="5"
            stroke="orange"
            fill="none" />
    </SVGComponent>,
    document.getElementById('svg_polyline')
);
{% endhighlight %}

<p id="svg_polyline"></p>

### Dynamic SVG Widget

Up to now, everything that I've built has been nothing more than a wrapper around an existing SVG element. This is all well and good, but that's not the reason you would build SVG images like this. The reason is that you want to build something interactive, and use React to model the interactive elements' state in a rational way.

Something like this:

<p id="dynamic_svg"></p>

### Conclusion

This has, clearly, just barely scratched the surface of what you can do with React and SVGs. My hope is that now that you've scratched that surface, though, you'll dig deeper and create useful abstractions that allow you to create really complex dynamic images in an easy to reason about way.

As always, the code for this post is available as [a gist](https://gist.github.com/biesnecker/42a5fb1b54b67c6356ed).

{% javascript dynamic_svg %}
