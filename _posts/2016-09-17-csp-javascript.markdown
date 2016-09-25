---
layout: post
title: Communicating Sequential Processes serie
date: 2016-09-17 20:51:06.000000000 +02:00
---

This is a small serie about using CSP concepts in Javascript

1. [CSP introduction](/csp-javascript/)
2. [CSP and async.js](/csp-async/)

During the last couple of months I've been working a lot with the concept of CSP,
which stands for Communicating Sequential Processes.

It's a a mechanism to coordinate concurrency in your software, and it's an idea that
proved to be winning, useful and scalable in multiple occasion. Just to make you an
example, in GoLang and Clojure it's **the way** to handle concurrency in your programs.

Given that, people started to implement the same thing in javascript and, thanks in
particular to generators and `yield` keyword, it turned out to be possible and decent.

I was kind of curious about this mechanism and in particular I wanted to find out why
the people were so excited about it. Therefore, I started to play with the concepts,
reading articles, looking at video and testing the current libraries.

It turned out to be a really interesting experience. While the original plan was
to have a quick look into it as well writing some basic examples in javascript it turned out to be much more complicated, starting in how the *async flow* in javascript really works as well checking out all the ways to coordinate the concurrency in javascript (starting from callbacks to `async await` keywords we might have in the near future) - taking notes on the pain points and then move on.

After digging into it for a while, I finally made my way into the CSP and started to see the good things
as well the caveats.

Therefore, once I wrapped it up all the ideas, I've been invited to present the results at FullStackFest 2016 in Barcelona.

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/r7yWWxdP_nc"
  frameborder="0"
  allowfullscreen>
</iframe>


Unfortunately 30 minutes were not enough to convince the people that CSP are great.
So - I'll try to write up what I missed there in a series of blog posts.

Stay tuned - it's going to be fun and interesting.
