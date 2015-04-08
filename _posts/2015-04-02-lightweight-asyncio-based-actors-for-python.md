---
layout: post
title: Lightweight asyncio-based actors for Python
image: /public/images/carol_cleveland.jpg
summary: >
  I was looking for an actor model implementation based on Python 3.4's asyncio. I didn't find one, so I built one.
---

Update (4/7): 欢迎来自于[蠎周刊](http://weekly.pychina.org/issue/issue-160.html)的朋友！

The [actor model](http://en.wikipedia.org/wiki/Actor_model) is a conceptually simple way of managing concurrency, in which each object stands alone, passing only messages between one another. For a recent project I was looking for an actor implementation based on Python's new asyncio library, and couldn't find one, so I made one myself.

Introducing [cleveland](https://github.com/biesnecker/cleveland), named in honor of [Carol Cleveland](http://en.wikipedia.org/wiki/Carol_Cleveland) (pictured above), the only major female cast member of _Monty Python's Flying Circus_.

### tl;dr

Lightweight, extensible actors based on Python 3.4's `asyncio` library. [Get it from Github](https://github.com/biesnecker/cleveland), or just `pip install cleveland`.

### Getting started

An actor can define one or more tasks that it runs constantly until shutdown. `BaseActor` provides the machinery for registering these tasks but doesn't provide any actual tasks of its own, so we'll start off with `ListeningActor`, which implements a message inbox and can both send and receive messages from other actors (`BaseActor` can send, as we'll see below, but can't receive). Below is a trivial example in which an instance of `BaseActor` sends a message to a `PrintActor` (which we subclass from `ListeningActor`) ten times, and then both of the actors shut down.

{% highlight python %}
from cleveland.actor import BaseActor, ListeningActor
from cleveland.message import Message
import asyncio

class StringMessage(Message): pass

class PrintActor(ListeningActor):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.register_message_handler(
            StringMessage,
            self._string_message_handler
        )


    @asyncio.coroutine
    def _string_message_handler(self, message):
        print(message.payload)


@asyncio.coroutine
def say_hello():
    a = BaseActor()
    b = PrintActor()
    a.start()
    b.start()
    for _ in range(10):
        message = StringMessage('Hello world!')
        yield from asyncio.sleep(0.25)
        yield from a.tell(b, message)
    yield from a.stop()
    yield from b.stop()

asyncio.get_event_loop().run_until_complete(say_hello())
{% endhighlight %}

You should see "Hello world!" printed ten times on the console, and then a clean and graceful exit. Not much, but it highlights some of the machinery that these actors provide.

### Tasks

Everything an actor should do during its life is defined by tasks. Tasks are registered during the actor's initialization, and then run constantly in a loop until shutting down. As mentioned before, `BaseActor` provides the `register_task_handler` method to add new tasks, but doesn't register any itself. Instead, we'll look at how `ListeningActor` implements the task to listen for incoming messages.

{% highlight python %}
class ListeningActor(BaseActor):

    def __init__(self, **kwargs):
        # ...
        self.register_task_handler(
            '__message_loop',
            self._process_inbox,
            self._shutdown_message_loop
        )
{% endhighlight %}

The first argument is the name of the task, which should be unique within the actor. The second is the function that will be called by the actor's task loop, and it must be an `asyncio.coroutine` (because it will be `yield from`ed). The third argument is the function (also an `asyncio.coroutine`) that will be called when the actor is shut down. This third point is a bit complex, and worth spending some time on.

### Shutting down gracefully

One of the challenges of asynchronous systems is that you never really know when anything is going to happen, so it's hard to know when something is done. Even the definition of "done" is application specific -- is it when there are no more messages to be processed, or when a certain amount of time has elapsed, or something else entirely? Shutdown functions provide a way to define custom shutdown behavior for a task, the results of which are automatically picked up by the underlying shutdown code so that an actor can't shutdown without first cleanly shutting down all of its tasks.

Here's how `_shutdown_message_loop` is defined:

{% highlight python %}
@asyncio.coroutine
def _shutdown_message_loop(self):
    yield from self._receive(StopMessage())
    return True
{% endhighlight %}

In this case, all it does is insert a "poison pill" into the actor's inbox, and then returns. This is because the messaging processing task blocks waiting for the next message to arrive, and will never return in the case that the shutdown occurs after the last message arrives. The return value is then stored in a future that was created when the task was started, and can be referenced by other shutdown functions (more on that in a later post).

### Messages

Most of the work that your actors will do are the result of an incoming message. Every message an actor receives need to be handled by a message handler.

Messages are differentiated by class -- you need to subclass `Message` for each distinct message type you will handle. You register these handlers in the actor's `__init__()` function.

This is the registration for the "poison pill" `StopMessage` mentioned earlier.

{% highlight python %}
self.register_message_handler(StopMessage, self._stop_message_handler)
{% endhighlight %}

The first argument is the class of the message for which the handler is responsible. The handler itself should be an `asyncio.coroutine`, and take the message as an argument. You can do anything you want as the result of a message, though you should make sure that it doesn't block.

### More to come

I purposely made these actors lightweight and bare -- this is meant to be a simple infrastructure for more complex patterns, rather than an out-of-the-box solution to all of your concurrent processing needs. I'm looking forward to building more powerful things on top of `cleveland` in the near future.
