---
layout: post
title: Projects fail slowly, and then all at once
image: /public/images/failure_slow_and_fast.jpg
summary: >
    Nobody starts a project expecting it to fail, and that's a problem. Most projects are going to fail, and not recognizing that at the outset causes people to continue investing in lost causes for far too long. Understanding the way that failing projects fail is an important step in avoiding this costly mistake.
medium_id: 11897f722042
---

First, an assertion: most projects that are sufficiently ambitious will fail. If they don't, your definition of 'ambitious' is probably not strong enough. This is true despite your best efforts, because you're doing things that haven't been done before, that you're not even sure are possible, let alone doable with the people and technologies to which you have access.

We talk a lot about failing fast, but most of the time that's just hype -- nobody starts something thinking that it's going to fail. And it's this lack of rigor that causes so many to continue to invest in a failed project for far longer than is rational. You have to define, up front, not just what success will look like (scope), but also what failure will look like (exit conditions), and you should be as vigilant for failure rationalization as you are about scope creep.

### What does failure look like?

How do you define the failure conditions for a project? Resource constraints are generally the best approach:

1. We will spend *X* hours of developer time on this feature.
2. We will spend *X* dollars on customer acquisition after launch.

You can express these in terms of deadlines, too, as hours are generally convertible into dollars. "This project will be complete by January 1, 2015, or it will be abandoned."

However you define failure conditions, the important thing is that you stick to them.

### Failure rationalization

We have all been there. A deadline is looming and your team is only half done with the work they set out to do. "But we've already gotten so far," you say, "it would be a waste to throw it all away."

Sounds nice, doesn't it?

The official term for this delusion is the [sunk cost fallacy](http://en.wikipedia.org/wiki/Sunk_costs#Loss_aversion_and_the_sunk_cost_fallacy) -- the idea that a cost that has already been incurred will be a waste if something isn't done. As it relates to project management, the real problem with this mindset is that if you've hit one of your failure conditions there's a very good chance that your project won't ever be successful. If that's the case not only will your already invested resources be "wasted," but so will all resources that you invest in the future.

Don't throw good money after bad.

### Dealing with failure

Hitting a failure condition doesn't mean that you should immediately `rm -rf projects/foo` and walk away. There are several things that you can (and should) do when your project ends in failure:

1. Write a solid post-mortem that explores the reasons for the project's failure, so that you can learn from your mistakes and get better at what you do. This is critical -- no failed project is a waste if you learn something that allows you to be more successful in the future.
2. Harvest components that can be reused. There's a good chance that you'll attempt something similar again in the future, especially if you think that you've understood the reasons for this project's failure, and so you should take the time needed to extract reusable components from the project's codebase to use again next time.
3. Consider launching what you have completed. This isn't always applicable, but sometimes a partially realized set of features is enough to release to users and to get feedback on.

### Why do projects fail slowly and then all at once?

I say this because without properly realized failure conditions, failed projects tend to linger on, consuming resources but not improving their chances of ever launching, for a long time, until it's finally apparent by some other high level metric (generally cash) that the project is a total failure and the plug is pulled. At big companies, this can result in the dissolution of the project team. At a startup, the result may well be the dissolution of the company itself.

### Conclusion

Nobody wants to think about failure, just like nobody wants to think about death. And yet, we buy life insurance, but we seldom do proper planning for project failure. By spending the time upfront to determine what failure looks like for your specific project, you can avoid falling into the sunk cost fallacy and costing you and your team far more than any failure should.
