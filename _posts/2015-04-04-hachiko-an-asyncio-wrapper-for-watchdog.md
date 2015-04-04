---
layout: post
title: "Hachiko: an asyncio wrapper for Watchdog"
image: /public/images/hachiko.jpg
summary: >
  Cross-platform filesystem event detection is a difficult, but solved, problem. When I needed a solution for Python I quickly found Watchdog, but out of the box it doesn't work with asyncio. Hachiko is a lightweight wrapper around Watchdog that makes it and asyncio play nicely together.
---

Detecting a responding to filesystem events is a difficult, but (more or less) solved, problem, and I have no interest in resolving it myself. As I'm building my current project, though, I found that there wasn't a good asyncio-compatible solution available. The standard seemed to be [Watchdog](https://github.com/gorakhargosh/watchdog), but out of the box it doesn't work with asyncio because it calls its handler functions on a seperate thread, which asyncio strictly forbids (and indeed throws exceptions in your face when you try to make it happen).

Thankfully Watchdog accepts an event handler object as an argument, so you can write you own to define custom behavior. To that end, I wrote [hachiko](https://github.com/biesnecker/hachiko), a simple wrapper around Watchdog that forces event handler function calls back onto the thread on which asyncio is running via `call_soon_threadsafe`. The handler functions themselves are coroutines, so you can use `yield from` inside them to plug into the rest of your asyncio-based application.

### Example usage

I wrote a wrapper class called `AIOWatchdog` to simplify using Watchdog in an asyncio-environment, but you don't have to use it -- you can simply give an instance of a subclass of `AIOEventHandler` to a Watchdog `Observer` object and use it directly. In this examples, though, I use `AIOWatchdog`.

{% highlight python %}
import asyncio
import threading
from hachiko.hachiko import AIOWatchdog

# Watches the filesystem for events for 20 seconds.
@asyncio.coroutine
def watch_fs():
    watch = AIOWatchdog('/path/to/your/files')
    watch.start()
    for _ in range(20):
        yield from asyncio.sleep(1)
    watch.stop()

asyncio.get_event_loop().run_until_complete(watch_fs())
{% endhighlight %}

There's not much more to it. [Check out the code](https://github.com/biesnecker/hachiko/blob/master/hachiko/hachiko.py), subclass `AIOEventHandler` to do interesting things with the filesystem events you care about (see [Watchdog's documentation](https://pythonhosted.org/watchdog/api.html) for what the events are, etc.).

To get started with it, either check out the source from Github, or `pip install hachiko`. Enjoy!