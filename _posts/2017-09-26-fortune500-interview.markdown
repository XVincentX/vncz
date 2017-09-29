---
layout: post
title: An interview with a Fortune 500 Company
date: 2017-09-26 13:30:06.000000000 +02:00
---

This is a story about an interview that I had with a
[Fortune 500 Tech Company](http://fortune.com/fortune500/list/filtered?sector=Technology&statename=California)
some time ago.

## Background

Back in the days I came across a **Twitter** profile of an employee claiming they were looking for a frontend developer.

I usually do not apply for big companies, for a number of reasons. They usually do not respond to your application and
frankly it's hard to be noted when they have that **many** applications, and my CV does not look that appealing anyway.

If we sum up this with the fact that some of these are using **Taleo** (oh boy...), my default action is to run away.

However, if you see an employee, a **developer**, publicly shouting they're hiring for their team, things are different.

1. It usually means **they're looking for people, for real**. I've seen a lot of times companies putting dozens of job
offers even though they're not hiring. It's a marketing strategy tipically used to scary the competition showing
you're growing that fast you need a lot of people - but at the end of the day, it's not true. On the opposite, you might
be on the way of closing the company (I've been there).

2. It's very likely you're going to speak and chat directly with the **target team** - therefore you know in advance if
you like the people, the position, what they've been working on lately and - more importantly - you skip the hiring call
where these folks sell things about the company you're not really interested at that stage.

## Phone interview

I decided to apply. I thought it was worth to give it a shot and if they refuse me, we'd be friends anyway.

I contacted the folk privately and I was surprised in a positive way: the response was almost immediate, congratulating
with me for my profile and they were inviting me to send all my details via email so they could evaluate me
properly.

I was happy - that fast response was validating the point #1 I mentioned in the paragraph above.

The things from there went very quickly: I had a phone call with an HR person and successively I spoke directly
with the engineering manager of the team that was hiring (validating the point #2). Both of them went very smoothly
and, given the great followups I received, the idea of joining in such company was kind of shaping in my mind.

## Code challenge

Next step was the **code challenge** - whose solution has been put [here](https://codepen.io/XVincentX/details/QMjWNe/)

I took some time and solved the whole thing - then I submitted the
[solution](https://codepen.io/XVincentX/details/QMjWNe/) and then I wrote a follow up email to the guys
so I could explain how I decided to approach the challenge.

> Good morning everybody,

> yesterday I’ve completed the frontend task assigned to me; I hope I tamed it in a way you’ll like it.

> I’d just like to share with you couple of notes I took during its resolution.

> Clearly I focused on solving the bug first. My initial implementation (that’s not the final one I submitted) was
tracking the number of disks on the screen with an internal counter. The increment was (and it’s still) happening when
the element has just been appended to the DOM. On the other hand, the decrement was happening by tracking the progress
variable in the update function. Once the value of progress was >=1 , it means the element isn’t visible anymore and I
can safely decrement the value.

> Then, I moved to the optimisation part.

> Important foreword: the provided implementation didn’t look that clunky and sloppy (100-150 disks on screen).
Not sure if it’s because I’m on high end computer - I think we're missing a bit of context here (what's the desidered
performance? Where's this thing supposed to be placed?); anyway I realised that there were some things not performed in an
optimal way. In particular:

> 1. The disks, once landed beyond the screen, were simply “abandoned” there. I considered this as a leak
(as the reference is basically lost) and might blown the DOM if I would continuously click on the Go button.
Therefore, I’ve decided to remove it once the animation was completed.

> 2. The animation was basically handmade using setTimeout. That’s a bad way to do that, for two reasons: setTimeout is
deferring your function execution of at least the provided parameter, but it does not give any guarantee on the real
execution time (callback queue might be busy in that moment); so if you’re aiming to have a stable FPS using that
technique…good luck with that. Instead, I decided to use WebAnimations because these are scheduled by the Browser
(that’s way smarter than us usually and focuses to deliver the best user experience).
Also, moving the things from imperative way (using Javascript) to a declarative way (using CSS) should simplify the testing
(you can see my notes about that looking at question n.2 of the challenge).

> Note: I assumed that the animation duration is fixed, and not controlled by any javascript code around.
Therefore it was safe to move it as CSS. If it’s not the case (the animation duration is controlled by the user for
some reason), we can still control it from javascript using the new [WebAnimations API](1) or eventually managing some
styles at runtime (I’d go with StyledComponents for that, but your mileage may vary).

> Second thing, I changed the fade in effect to use another animation instead of relying on jQuery for that; successively
I modified the way the disks are moved on the screen animating the transform property rather than the left one.
The reason is simple: opacity and transform are likely to be offloaded by the browser to the GPU.
The other properties, as far as I know, are still handled by the CPU.

> You can find my considerations about testing in the HackerRank test.

> If I would have more time, I’d probably modify the code to try to cache and reuse the DOM elements,
instead of creating and removing them every time we click on the Go button.

> Then I would probably try to reorganise the code a bit (it’s a bit spaghetti, but I guess it’s on purpose to confuse
the candidates); probably using React to write the view and manipulate the DOM so I can extrapolate the real logic in a
simple function that’s way easier to test.

> Thanks a lot for your time in reading this, and have a good day!


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API

Anyway, couple of days later I had some spare time and I decided to keep working on the task and implement the
DOM optimisation I was thinking about - so I wrote a second email.


> Hello again - One last thing and then I’ll shut up, I promise.

> I wanted to implement the DOM nodes reutilisation caching.
You can find its code here:

> https://codepen.io/XVincentX/details/QMjWNe/

> So now the elements aren’t removed anymore when the animation is over, but eventually
they will be “reutilised” when another disk is required. If there are not enough “stale” disks
to satisfy the required number, new elements will be animated on the fly (and then kept as a pool).

> Have a great weekend,

I was sure I made it.

## The followup

After a couple of weeks I received an email announcing **they didn't want** to move further with me.

I rechecked the things multiple times, I even asked some friends to have a look into the solution to see if I made
any stupid mistakes - but nobody pointed out something really **valuable**. I was confused.

Therefore I replied and I asked for a feedback. If I had been missing something so basic - I wanted to know.

Here's the answer I got (I hope the guy will apologise me for quoting, but for correctness of the information, I must
write the entire thing)


> The general feedback was that you had showed some positive signs in the coding question and good write up as well,
however the exercise just missed the bar for this particular role in [team_name], and one example was the use of CSS
animations to solve the problem, which is not ideal as it invalidates a lot of the performance-tuning the team expect.

> [team_name] has a very large legacy codebase and felt that your approach wouldn't suit what they are looking for right
now, but definitely wanted to keep in touch about other roles in the future if you would like.


I was shocked - at that point, I really wanted to know what was wrong here, and I replied one more time.


> Hello [human_name],
thank you very much for the answer.

> That’s kind of weird - I made multiple performances considerations in my write up I sent you
where I motivated my choice of using CSS animations. There were precise reasons why I decided to not use
requestAnimationFrame, for example.

> One last thing - would it be possible to get in touch with the team that evaluated that?
I’d be really willing to know what would have been a better solution, it would be a great learning experience.

> Thanks a lot,


Unfortunately, I didn't get any reply and they vanished.

## So what?

Fundamentally I was surprised at first, and disappointed later. Surprised, because I **genuinely** thought the point of the
interview was to make sure I had an idea of what I was doing in terms of solving a bug and as well as reason about
using the right API for the job; disappointed because I hoped to have a detailed **feedback** to improve.

Instead I got silence.

I've been thinking about this for a while, and I wasn't able to find any reasonable explanation around that.
If you get a blank screen with a problem to solve that is completely isolated without any context around where this
solution is going to be placed it's hard to reason about a legacy codebases.

In my email, I also pointed out that there were not enough informations to make a complete analysis.

> Important foreword: the provided implementation didn’t look that clunky and sloppy (100-150 disks on screen).
Not sure if it’s because I’m on high end computer - I think we're missing a bit of context here (what's the desidered
performance? Where's this thing supposed to be placed?);

### And now?

I'm firmly convinced we can do better than that. Providing more context, setting the right expectations are key parts
of a interview process in order to verify some particular skills. I hope that [the_company] will take this as a genuine
feedback and eventually adjust the process.

I still love you anyway.
