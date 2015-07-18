---
layout: post
title: Hypermedia does not replace your semantic model
date: 2015-07-04 20:51:06.000000000 +02:00
---
This is a serie about developing a simple Hypermedia Client in AngularJS.

1. [Hypermedia introduction](/hypermedia-client-in-angularjs/)
2. [Hypermedia formats](/hypermedia-client-in-angularjs-hypermedia-types/)
3. [Hypermedia client]() -> Coming soon!
4. [Considerations](/hypermedia-client-considerations/)
5. [Hypermedia does not replace your semantic model](/hypermedia-does-not-replace-your-semantic-model/)

Last week I've been speaking at [mDevCamp](http://mdevcamp.cz) conference in Prague about _Building Resilient API clients_.
Of course, it is not possible to dig enough into Hypermedia in just 25 minutes. Thous, I explicitly declared that the intent of the presentation was more about raise awareness than trying pretend to be a precise explanation. You can have a look to the [video](http://slideslive.com/38894088/building-resilient-api-client) and to the if interested. I really apologize for the hair style and my general appareance, but it was saturday and had got a crazy Friday (as usual).

By the way, after that, a small discussion group formed, and I got a very interesting question:

> Suppose that our client, in order to create a new poll, needs a new value that is not user provided; for examplee, the current DeviceID. How do we handle that on our client?

That was a very interesting question and, in my opinion, it definitely shows an probable limit Hypermedia.

### How do we handle a new value requirement?
Well, it depends. Some formats, such as **HAL**, simply have not got the concept of **ACTION**; that means, we cannot move 	through the transactions at all. So, the problem does not exist: redeploy the client.

Things start to be a bit more interesting when dealing with **Siren**, where we may have some flexibility on that.