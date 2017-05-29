---
layout: post
title: Hypermedia client in AngularJS - Introduction
date: 2015-05-30 19:59:13.000000000 +02:00
---
This is a serie about developing a simple Hypermedia Client in AngularJS.

1. [Hypermedia introduction](/hypermedia-client-in-angularjs/)
2. [Hypermedia formats](/hypermedia-client-in-angularjs-hypermedia-types/)
3. [Hypermedia client](/hypermedia-client-build-details/)
4. [Considerations](/hypermedia-client-considerations/)
5. [Hypermedia does not replace your semantic model](/hypermedia-does-not-replace-your-semantic-model/)

If you are in web/mobile development you have certainly heard about Hypermedia APIs and HATEOAS acronym. Those two words/concepts, even thought are quite **old** (the first blog posts started to come out during 2012), are actually riding high on twitter, blogs, stackoverflow questions and so on.

If you're new in the hypermedia environment, I definitely suggest to watch this [amazing video](https://www.youtube.com/watch?v=vp-Na5wKlig) by Glenn Block.

If you never cared about your API design, then you should watch this [presentation](https://www.youtube.com/watch?v=sdlQvTWVQ_M) from Honza Javorek as well.

If you already know everything, you may just directly to the [next post](/hypermedia-client-in-angularjs-hypermedia-types/).

Given that, let's have a look to hypermedia API from my ignorant point of view.

#### TL;DR. What is an Hypermedia API?

Fundamentally, people do two things on the internet:

1. Click links
2. Fill out forms

Hypermedia API's are systems which want a consuming API (the programmed client) to do that as well.

Hypermedia API's accomplish this by responding to requests with both the requested data **AND** other resources available or actions to take.

This means, basically, that a typical API response will be something like this

```json
{
  "entities": [
    {
      "class": [ "items", "collection" ],
      "rel": [ "http://x.io/rels/order-items" ],
      "href": "http://api.x.io/orders/42/items"
    },
    {
      "class": [ "info", "customer" ],
      "rel": [ "http://x.io/rels/customer" ],
      "properties": {
        "customerId": "pj123",
        "name": "Peter Joseph"
      },
      "links": [
        { "rel": [ "self" ], "href": "http://api.x.io/customers/pj123" }
      ]
    }
  ],
  "actions": [
    {
      "name": "add-item",
      "title": "Add Item",
      "method": "POST",
      "href": "http://api.x.io/orders/42/items",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        { "name": "orderNumber", "type": "hidden", "value": "42" },
        { "name": "productCode", "type": "text" },
        { "name": "quantity", "type": "number" }
      ]
    }
  ],
  "links": [
    { "rel": [ "self" ], "href": "http://api.x.io/orders/42" },
    { "rel": [ "previous" ], "href": "http://api.x.io/orders/41" },
    { "rel": [ "next" ], "href": "http://api.x.io/orders/43" }
  ]
}
```

Our response has got different **links**, that are pointing us somewhere. What does that link do is defined into the *rel* section.

```json
{
  "links": [
    { "rel": [ "self" ], "href": "http://api.x.io/orders/42" },
    { "rel": [ "previous" ], "href": "http://api.x.io/orders/41" },
    { "rel": [ "next" ], "href": "http://api.x.io/orders/43" }
  ]
}
```

This stuff, for example, let us navigate throught the orders.

There is something more than just *links*. We have got some **actions**, that look like something with which I could build an html form, and **entities**, which is my data from the server (and that probably I want to display on my application).

What are advantages of having this kind of data representation?

1. Once I make the first request to the server, I can definitely forgot about urls in my applications. Everything is embedded and self discoverable

2. I can model my client to be ready to answer to API evolution. For example, adding or removing a new field in the action will easily be reproduced into the client. In the worst case, the client can ignore new parameters, but it won't break.

3. Changing URLS is an operation that does not break the client. Furthermore, I can easily add new links, relations that the client can either use or ignore.

4. A system like this can be used as an authorization system. You can simply not output links and actions that current user cannot see/fill/navigate.

#### Why do I need all this stuff?

As a first use case, imagine a mobile client, where usually the validation time is up to 5-7 working days: it can evolve and respond to API changes without being redeloyed (and neither recompiled, to be precise).

Imagine also a web application developed from a third-party company: an hypermedia client can evolve and modify itself without requiring their intervention and withouh even let them know you're changing your API.


> This is just amazing. My next API will be hypermedia driven.

Everybody when reading the first time about hypermedia APIs.

Hold your horses. Is it free of charge? Absolutely not. There is a very strong dispute if it is worth or not to write an Hypermedia API (because basically writing hypermedia clients is not easy at all), but I will not share links or considerations (yet), because we're going to build a client on our own, and hopefully make sense of the disavantages during the "journey"

But this will be started in the next blog post.
