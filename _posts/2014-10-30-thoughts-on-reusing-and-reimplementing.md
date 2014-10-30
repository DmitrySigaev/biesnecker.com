---
layout: post
title: Thoughts on reusing and reimplementing
image: /public/images/rebuilding.jpg
summary: >
    Alternate title: how I spent the better part of a week with Gulp.js, before abandoning it and writing something that better fit my needs, in a few words.
---

This is a common experience that I suspect most of you have had:

1. Start a project with an end goal in mind, and a rough idea of what the intermediate steps will look like.
2. Find an off-the-shelf technology to acheive some of these intermediate steps, and try to make it work.
3. Realize that the technology you've found doesn't *really* do what you want it to do, or at very least it doesn't do it in a particularly obvious or elegant way, and that shoehorning your use case into it is going to be more effort than it's worth.
4. Look at the technologies on top of which the technology you've found is built, and try to use those directly to accomplish your goals.
5. GOTO 3 UNTIL `$goal_complete`.

This has basically been my week.

### Don't reinvent the wheel

The above is good advice -- the wheel is a perfectly good round implement that should fit your needs if you need something round and rollable to slap onto the bottom of the new-fangled transportation conveyance you're building. But it's not a very good metaphor when you're talking about something as complex as even relatively trivial software projects. The odds that you "just need a wheel" are pretty small -- at very least you need a wheel machined to exacting standards that is built for the exact conditions that you're expecting to face. There's no equivalent of a Costco tire center for software, a place where you can go and feel reasonably certain of you ability to find something that suits your needs. It might happen, especially if you're trying to solve an already solved problem, but it's unlikely.

There's an extremely good chance, however, that you'll find a wheel that *looks* like it will work perfectly, and it's not until you've invested the effort to try it out that you realize it just isn't going to work and you need to get a new wheel (hopefully you discover this *before* you're going 75mph down the highway).

### Gulp.js and me

So, I'm building a [statically-generated](https://www.staticgen.com/) [isomorphic](http://isomorphic.net/) [web application](/2014/10/24/mnemoji/). I have needs. Most of those needs fall under the "things a build tool should be able to do" umbrella. [Gulp.js](http://gulpjs.com/) is a great build tool. So I started off with that.

I got [Browserify](http://browserify.org/) building my Javascript and [LESS](http://lesscss.org/) compiling my CSS. I built a relatively straightforward processing plugin to turn data (in the form of YAML documents) into HTML and JSON. To make development easier I wanted everything to be built whenever a file was changed, so I turned to [gulp-watch](https://github.com/floatdrop/gulp-watch). But an error in any part of the build process (mostly, in my case, forgotten semicolons in the CSS) caused Gulp to hang (even with [plumber](http://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/), it seemed), so I had to restart it constantly, which defeats the purpose of having it auto-reload in the first place. As my app became more complex, Browserify builds started taking forever, so I turned to [Watchify](https://github.com/substack/watchify), but it implements its own file system watching that doesn't play very nicely with gulp-watch. Then I realized that for at least part of the application I needed to know about all of the content in order to pass certain information to each individual piece of content before rendering.

And so on. And so forth.

### Building my own wheel

I didn't want to give up on Gulp, because it's well-designed and does so much of what I want to do so well. But in the end I've had to, instead backing up a bit and building a custom solution out of [gaze](https://github.com/shama/gaze) and a few other libraries. I'll get there. I didn't want to reinvent the wheel, and I haven't. It just so happens that I have pretty specific wheel-like needs that aren't quite met by any of the wheels I've found. I'd like to be proven wrong.

But for now, I'm building my own wheel.
