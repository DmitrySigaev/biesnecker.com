---
layout: post
title: Building a reading time widget with React and jQuery
image: /public/images/reading.jpg
summary: >
    Medium's reading time widget is a great additiont to the site, and I wanted my own, so I built it with React.js and jQuery.
---

Like most folks, I read a lot of content on [Medium](http://medium.com/), and one of my favorite features is the tiny "X min" indicator they have on all of their posts. It's nice to know if I'll be able to read something right now, or if I should save it for later because I don't really have 15 minutes to read something at the moment. It's the sort of thing that everyone should have, I think, and so I decided to make my own for this blog.

Now that I have [React integrated into my Jekyll build process](/2014/10/13/integrating-react-into-jekyll/), React was the natural choice for building the widget. I used [jQuery](http://jquery.com/) to grab the text out of the DOM when the pages loads. The result can be seen on all of the posts on this site, just below the title.

### Building the ReadingTimeWidget

#### Getting started

React components need, at a minimum, a `render` function that will return what should be rendered inside the element upon which the component is mounted. Creating that is the first thing we need to do.

{% highlight javascript %}
var ReadingTimeWidget = React.createClass({
    render: function() {
        return (
            <span id='reading_time' />
        );
    }
});
{% endhighlight %}

#### Setting up the initial state

Figuring out where your state should live and how it should be initialized is one of the challenges of building a React component. In this example, though, the situation is pretty simple: either we know how long the content will take to read, or we don't -- the length of the text won't change once the page is rendered (though if it did it wouldn't be that hard to update this to take those changes into account). That's all we need to save. We'll use `null` to indicate that we don't know how long the content will take to read yet, and update the `render` function to show a message indicating that the reading time hasn't been calculated yet.

{% highlight javascript %}
var ReadingTimeWidget = React.createClass({
    getInitialState: function() {
        return ({
            secondsRequired: null,
        });
    },
    render: function() {
        var message = '';
        if (this.state.secondsRequired !== null) {
            message = 'TODO';
        } else {
            message = 'Calculating reading time...';
        }
        return (
            <span id='reading_time'>{message}</span>
        );
    }
});
{% endhighlight %}

#### Mounting the component

Mounting the component on the DOM is just a single function call. We need to make sure that the DOM element containing the text we're counting has already been rendered, though, so I'm using jQuery's `$(document).ready()` function to delay execution until the document completely finishes loading. Two other DOM element references are needed as well -- the DOM element upon which the component will be mounted, and the DOM element that contains the text to be counted. I'm using jQuery to grab both of those.

{% highlight javascript %}
$(document).ready(function() {
    var mountPoint = $('#reading_time_mount');
    if (mountPoint) {
        var contentDiv = $('#main_content');

        React.renderComponent(
            <ReadingTimeWidget contentDiv={contentDiv} wpm={200} />,
            mountPoint.get(0));
    }
});
{% endhighlight %}

I have the conditional because, on this site, I load this for every page, but not every page has the `#reading_time_mount` div, so I only want to try to mount it if that div exists.

#### Counting the words

The final step is to actually count the words in the content element, and update the state to reflect that. Since the content isn't going to change out from under us, we can put this calculation in the component's `componentWillMount` function. The function looks like this:

{% highlight javascript %}
function() {
    var cdiv = this.props.contentDiv;
    var wpm = 250;
    if (typeof this.props.wpm !== 'undefined') {
        wpm = this.props.wpm;
    }
    var text = cdiv.text()
                   .replace(/\s+/g, ' ')
                   .split(' ')
                   .filter(function(e) {
                       return (e.length > 1);
                   });
    var seconds = Math.round(text.length / wpm * 60);
    this.setState({ secondsRequired: seconds });
}
{% endhighlight %}

The default words per minute is 250, but you can set that when mounting the component by passing it an integer in the `wpm` property (I have it set at 200 for this site). To calculate the number of words, I first replace all whitespace (including linebreaks) with a single space, and then split the string into an array based on those spaces. Finally, I filter out any single-character word -- this includes a lot of random punctuation that ends up in the word list. Finally I calculate the number of seconds required to read the words (seconds instead of minutes because of a legacy design decision -- it should probably just calcuate the number of minutes directly), and update the component's state.

#### Completing the render function

Updating the state will cause the `render` function to be called again, so we should fill that out.

{% highlight javascript %}
render: function() {
    var message = '';
    if (this.state.secondsRequired !== null) {
        var seconds = this.state.secondsRequired;
        var minutes = Math.round(seconds / 60);
        message = minutes + ' minute read';
    } else {
        message = 'Calculating reading time...';
    }
    return (
        <span id='reading_time'>{message}</span>
    );
}
{% endhighlight %}

And that's it! Pretty simple, no?

### Conclusion

React makes building standalone components really simple. When the data you care about is already in the DOM, it makes a ton of sense to offload the computation and rendering to the client, rather than worrying about doing everything before sending data down the wire.

The code that this page uses is [available here](https://gist.github.com/biesnecker/b22da45a56dd55c5c0ab).
