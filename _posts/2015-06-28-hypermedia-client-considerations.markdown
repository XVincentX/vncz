---
layout: post
title: Hypermedia client in AngularJS - Final considerations
date: 2015-06-28 20:51:06.000000000 +02:00
---
This is a serie about developing a simple Hypermedia Client in AngularJS.

1. [Hypermedia introduction](/hypermedia-client-in-angularjs/)
2. [Hypermedia formats](/hypermedia-client-in-angularjs-hypermedia-types/)
3. [Hypermedia client](/hypermedia-client-build-details/)
4. [Considerations](/hypermedia-client-considerations/)
5. [Hypermedia does not replace your semantic model](/hypermedia-does-not-replace-your-semantic-model/)

So, we have finally finished our Hypermedia client. But now? What have we learned?

1. How much sense does it make to you to write hypermedia clients when you look at it in retrospective?
2. How many benefits it brings to you as frontend dev and how much hassle? Is it worth?
3. Did the idea blow you away or did you just said to yourself: well, so much buzz and so small difference?

hy-res is the only decent library I was able to find. When I first approached that library, it was missing some scenarios, but the author is very keen and always ready to discuss and implement the missing things. I am very happy that now that library is even more complete thanks to my issues

Yes, the client can adapt when actions are missing, but also when actions are added (buttons and forms are displayed based on the server response). To be precise, this feature was not available in HyRes initially, and was added after a my precise request. Given that, of course I am afraid that probably the design won’t be consistent when adding new features to the API, therefore a new deploy will be anyway required, but this is not a problem that Hypermedia aims to resolve. If I got it, it solves the implementation details changes, not the semantic ones.

**Was it difficult learn about hypermedia?**

Less than I expected. It was quite easy. There is a great introduction video by Glenn Block that really anyone should have a look at. After that, I had a clear idea of what hypermedia apis are. The interesting thing is that I realised that, imho, if one of the REST concepts is “anticipating the change”, then everyone claiming to provide “REST APIs” (included github, stripe, Facebook) are doing REST in the wrong way.

**Was it difficult to get comprehensible info?**

Hmm it depends. For sure I had no one to whom ask for (and I did not want, to be honest). What was really difficult was to find a decent working implementation to get inspired (except for the usual hello worlds that are quite useless sometimes). I have a really long list of issues opened on various github repositories (26, if I am not mistaking). It really looked like I was touching the edge of the knowledges, sometimes.
Perhaps I am just unlucky: everything I touched, it did not work -> open a new issue. But this is the good of making playgrounds. I helped to improve 5-6 open source projects with my issues.

Furthermore, sometimes I had the feeling that reading hypermedia articles reminds me my philosophy lessons: everything is great, everything should work in that way, everything will auto evolve and everything will auto do something. Yeah, sure. But in practise, it is not in this way.

What I want to say is that most of articles about hypermedia are just praises about how hypermedia is cool and fine, but few of them anaylzed the bad things in detail. This makes me think that most of them just tried to code a simple hello world application (or, maybe, neither that one). That is unprofessional and perhaps and completely uninformative. But it may just be a my wrong impression united with my lack of proper research.

**Was it difficult to write the client?**

Damn, yes. And I realised that, even if I tried to decouple it at maximum, leaking of informations on the client will happen anyway. Adding a new entity on the server will, at 90%, require a new deploy on the client as well (Even if your client will not break, I am afraid you will have anyway to create a new html template to display a new entity, unless you will be fine with default forms).The clients can’t be completely agnostic of what we’re doing on the server. A general-purpose client for a standard hypermedia format will look generic and boring. We’re not trying to build a generic client, we’re building one for a specific purpose. 

Furthermore, actual hypermedia formats are quite far from being complete. The only one that are near to something usable is Siren, because it has got the concept of action (that was quite mandatory for my case). But for example, it is lacking some important parameters that would definitely enhance the user experience. When an information is missing from the hypermedia message, a leak in the client (means, hardcoding the thing) will happen. (On the other side, I have also to note that pollsApi provides a very basic Siren implementation, narrowed to our demo, I suppose)

Siren, for example, does not have the validation concept for the actions. That means, manual validation on the client (to be maintained and eventually redeployed if the entity will change its validity criteria). Or, submit the entity on the server and evaluating the error.

To wrap up, it was a great learning experience, but I cannot see a very good reason to switch to hypermedia formats, now and today, especially if I am my own API consumer. It may have sense for third party services. For sure, clients won’t break, but they won’t get the new stuff until someone will place hands on them (and redeploy all the things).