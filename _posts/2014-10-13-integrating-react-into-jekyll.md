---
layout: post
title: Integrating React.js into Jekyll
summary: >
    Jekyll is a fantastic static website builder, and React is a wonderful Javascript UI framework. Making them work together isn't very hard, but requires a few not terribly documented steps. Hopefully this post will bridge the documentation gap.
image: /public/images/jekyll_hyde.jpg
---

For [my microproject last week](/2014/10/10/mlb-team-colors-in-hexadecimal/) I needed to include React.js into a post, and then use it to render various components on the page. I use [Jekyll](http://jekyllrb.com/), a static website generator, to make this site, so I set out to figure out how to integrate React's JSX transformation process into Jekyll's build process.

I thought it would be easy (and ultimately) it wasn't all that hard, but it wasn't immediately obvious what needed to be done. In the spirit of bridging this documentation gap, here's how I built React into Jekyll.

### Integrate Jekyll and Sprockets

[Sprockets](https://github.com/sstephenson/sprockets) is a fantastic asset pipeline system that takes raw assets and transforms them into production-ready files. This can include minifying Javascript, building Coffeescript files into Javascript, compiling one of those fancy style languages into proper CSS, and all sorts of other tricks. This seemed perfect for the task of [transforming React's JSX syntax](http://facebook.github.io/react/docs/jsx-in-depth.html#the-transform) into real Javascript that the browser can execute.

The easiest way to get Sprockets playing nicely with Jekyll is via the fantastic [jekyll-assets](https://github.com/ixti/jekyll-assets) plugin. Once you've installed that and gotten it running, you're able to take advantage of Sprocket's various nifty features as part of your Jekyll build process in a very seamless way. I honestly don't know why Jekyll doesn't replace its existing asset management code with a Sprockets-based implementation (like [Middleman](http://middlemanapp.com/) does), but that's a discussion for another time.

### Integrate Sprockets and JSX

The next step is getting Sprockets to transform your JSX files into Javascript. It doesn't do this out of the box, but thankfully there's a Sprockets plugin that provides this functionality -- [ReactJSXSprockets](https://github.com/jvatic/react-jsx-sprockets). Once you have that installed, you need to make sure that Jekyll picks it up. What I did was create a file in my Jekyll `_plugins` directory called `ext.rb` and configured it there. Here's what that file looks like:

{% highlight ruby %}
require "jekyll-assets"
require "react-jsx-sprockets"

ReactJSXSprockets.configure do |config|
  config.extensions = %w( jsx )
end
{% endhighlight %}

Sprockets works by looking at the extensions on a filename and applying transformations to a file based on those extensions until it runs out of extensions it knows how to transforms. That means if you want a React project file to end up as `foo.js`, it needs to be named `foo.js.jsx` -- the extra `.jsx` is what tells Sprockets to send it through the JSX transformer. If you want to use a different extension, you can change it in the `ext.rb` config block.

### Bonus: intelligently switch between normal and minified React

Once you've completed the second step above you should be properly building JSX files. However, if you want to actually use those files, you'll need to include React.js in your HTML. In production, you should be using the minified version, but in development the minified version is pretty useless because it strips out all of the error messages. Instead, there's the "normal" development version. Switching between these can be a pain, but you can take advantage of [Liquid template tags](http://liquidmarkup.org/) to include the right one depending on whether you're in serving pages locally during development or building your files in order to send them off to a server somewhere.

I have a `head.html` in my `_includes` folder that breaks all of the stuff that goes inside the HTML `<head>` tag out of the default template. Inside, I have the following block:

{% highlight liquid %}{% raw %}
{% if site.serving %}
    {% javascript vendor/react %}
{% else %}
    {% javascript vendor/react.min %}
{% endif %}
{% endraw %}{% endhighlight %}

Because I only use `jekyll server` while I'm writing locally, I use the existence of the `site.serving` flag to indicate that I'm in development, and include the "normal" version of React.js. Otherwise I include the minified one.

### Conclusion

Because React components are standalone and don't expect very much from their environment, it's a perfect framework for building interactive components that are part of an otherwise normal page. Getting the JSX transformation process built directly into my Jekyll workflow saves a ton of headaches, and makes it a lot more likely that I'll play around with it more in the future. Hopefully this short guide will encourage others to do the same.
