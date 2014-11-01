---
layout: post
title: Designing for maximum incompetence
image: /public/images/three_stooges.jpg
summary: >
    As a periodically incompetent person myself, one of the tenets of my design philosophy (in many areas, though especially software) is to design for maximum incompetence -- never ever assume that the person using what you've built will be anywhere near competent, and make sure that your product will work just fine regardless.
medium_id: 69a4eae489aa
---

[Educating your users](http://www.smashingmagazine.com/2008/01/16/evolve-your-user-interface-to-educate-your-users/) is an important design concept, but as someone who writes a lot of code for himself, I believe that the single most important thing that you can do is to design for maximum incompetence. By assuming that the users of your systems are incompetent (even though they most likely aren't) you're forced to think of sane defaults and behaviors that work correctly without hand-holding. This results in more robust applications that are less likely to need constant attention in order to continue running. This thought was inspired by a very interesting article about the [difference between North American and Japanese zoning laws](http://urbankchoze.blogspot.com/2014/04/japanese-zoning.html):

> [T]his type of zoning reduces the need of competence from urban planners to have a decent city. In North American cities, if the planning department doesn't plan for enough multifamily or single-family zones, you can create big problems. There may be shortages of either multifamily or single-family zones, pushing prices up for that kind of housing. In practice, it's most often rental units that get the shaft, resulting in sky-high rents as there is a rental unit crisis. In Japan, since they don't differentiate between the two, people build what they actually need rather than what is commanded from above. And if there is not enough multifamily housing or that land is running out, pushing prices up, buying rundown houses and replacing them with multifamily housing is a sound business plan.

I'm sure there are plenty of extremely competent urban planners in Japan that could produce solid zoning plans that promote growth and harmony, but the system doesn't rely on their existence. It is designed specifically so that local optimums can be found by the people actually living in the area, while the nature of Japanese zoning laws as national rather than controlled by the local municipality ensures that some minimum standards are enforced.

This is exactly what you should be aiming for from a software application. Allow configurability but provide sane defaults. Allow users to assume that what worked last time will work again this time if at all possible. Provide solid fallback behavior when the network is unavailable. Fail early with verbose messages about what went wrong rather than trying to do something sketchy and providing the user with unexpected behavior.

You know more about how your application works than anyone else will ever know. Make use of that knowledge and make life easier for the rest of us.
