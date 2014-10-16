---
layout: post
title: Getting started with the Parse JS SDK
image: /public/images/parse.jpg
summary: >
    Parse makes creating a backend for your app really easy, and has a pretty generous free tier. I'm planning to use it to back a couple of projects in the near future, which means I should learn how it works. The goal of this post is to walk through getting Facebook login working with Parse.
parse: true
parse_app_id: wIVv26OIlQEhhiBTqnAhrshR3rFtfpKV89RKfsDN
parse_js_key: qkHB9u6SABrCV9akWjmztsWRi0IFgXzYBoKi4utW
---

Parse is a "Platform-as-a-Service" provider that allows developers to focus on their application's front end without worrying so much about how data is stored and manipulated on the back end. They offer a robust Javascript SDK that should, in theory at least, make creating Javascript-based web applications pretty simple. They also offer a free tier of service that is more than enough for experimentation, making it an economical choice as well.

<em>Full disclosure: I work for Facebook, which owns Parse.</em>

The first step to creating an application on Parse is creating users who can then create, edit, and delete application data. I don't have any interest in managing user credentials myself, so I'm going to jump straight to user signup / signin via Facebook login.

### Make the Parse SDK and Facebook SDK play nicely

As you might expect from a service owned by Facebook, the Parse SDK plays nicely with the Facebook SDK. Once you sign up for Parse and create an application, and create a Facebook application, you'll need to add some Javascript to your page to initialize both of the SDKs. Detailed instructions can be found [here](https://parse.com/docs/js_guide#fbusers-setup), and the code that's running on this page looks like this:

{% highlight javascript %}
Parse.initialize(
    'wIVv26OIlQEhhiBTqnAhrshR3rFtfpKV89RKfsDN',
    'qkHB9u6SABrCV9akWjmztsWRi0IFgXzYBoKi4utW');
window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
      appId      : '737512829662824',
      xfbml      : true,
      cookie     : true,
      version    : 'v2.1'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
{% endhighlight %}

If you copy this code directly, please make sure to change the Parse API and Javascript keys, as well as the Facebook app ID, or else nothing will work.

Amazingly enough, that's all you have to do to get Parse and Facebook to talk to one another. All that's left to do is actually do the logging in, and for that we'll build a couple of React components to manage state.

### Build a login widget

There are really only two states to worry about in this example application: either the user is logged in or not. To manage this, I'm going to build three components: a parent component to manage the logged in state, a button that will toggle between "Log In" and "Log Out" depending on that state, and finally a message box to give the user some feedback about what's going on.

Rather than dump all of the code into this post, I've put it all in [this gist](https://gist.github.com/biesnecker/b50c5b49fc0b0bb54d6d). It doesn't really do anything accept validate the user, but you can see that the user object has been created in the Parse backend, and when you reload the page you're still logged in.

### Behold, the final widget

<div id="fb_login_example_mount"></div>

{% javascript parse_fb_login_example %}

### Conclusion

The initial steps in integrating Parse and Facebook into a React app are pretty straightforward. I haven't done anything more complex than this yet, so I don't know what pitfalls are out there, but I'm excited to start trying some things out. Look out for some projects coming down the pipe.
