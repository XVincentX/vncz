---
layout: post
title: Write a plugin for Kong
date: 2017-07-15 20:51:06.000000000 +02:00
---

# Kong overview

Over the last couple of week(end)s I've been playing with [Kong](https://getkong.org) - the open
source API Gateway from the guys of Mashape.

While I didn't have any specific need to employ Kong, I've always heard good things about it
and I wanted to give it a try.

The first impressions were great; in less than 30 minutes I was able to spin up a fully working
instance using [Docker](https://docker.com); testing Kong is one of the scenarios where I think
Docker really shines, basically because it lets you create complicated network topologies in a
declarative way - therefore it is perfect to test, for example, multiple microservices spread on
different networks and so on and so forth.

# Writing a plugin

After using it for a while, I actually found an interesting use case: authentication for internal
resources (such as internal documentation) o
