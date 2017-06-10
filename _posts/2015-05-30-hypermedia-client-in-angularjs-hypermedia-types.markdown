---
layout: post
title: Hypermedia client in AngularJS - hypermedia types
date: 2015-05-30 20:51:06.000000000 +02:00
---
This is a serie about developing a simple Hypermedia Client in AngularJS.

1. [Hypermedia introduction](/hypermedia-client-in-angularjs/)
2. [Hypermedia formats](/hypermedia-client-in-angularjs-hypermedia-types/)
3. [Hypermedia client](/hypermedia-client-build-details/)
4. [Considerations](/hypermedia-client-considerations/)
5. [Hypermedia does not replace your semantic model](/hypermedia-does-not-replace-your-semantic-model/)

As said in the previous post, hypermedia does not come into your applications for free.

Apart from technical issues, that we will try to describe in the next post, the first problem is the representation of the new data.

We are now aware that, in order to support "hypermedia scenarios", we have to add some metadata to the returned payloads.

Of course, each one could try to create its own proprietary format: for example, I could create a new _metadata_ field, and fill that with a _link_ object.

```json
{
    "metadata":
    {
        "link":
        {
            "rel": "self",
            "href": "/products/10"
        }
    },
    "data":
    {
        "id": 10,
        "description": "Toothpaste"
    }
}
```

But on the otherside, another company may think that maybe we could have a _links_ array, and not in a container object (metadata).

In other words, the possibilites are almost infinite. In that case, standardization is required to develop a coehernt set of middleware that can facilitate our work.

Hypermedia is actually one of the fields where the research is definitely active. New formats are developer on daily basis, blog posts with new ideas are written every day. For this reason, this post could be easily outdated even while I am writing that.

By the way there are actually 4 main hypermedia formats:

1. [HAL](http://stateless.co/hal_specification.html)
2. [HALE](https://github.com/mdsol/hale)
3. [CJ](http://amundsen.com/media-types/collection/)
4. [Siren](https://github.com/kevinswiber/siren)

I will not go one by one (the documentation is definitely well written). What I just want to point out is that:

1. **HAL** and **CJ** support the concept of links (clicking the links) but not of an **action** (that means, fill a form).
2. **HALE** is an extension to **HAL** that adds actions support to it.
3. **Siren** is the "most complete" hypermedia format in terms of offered features.

Even if I do appreciate the **HALE** format, it is restricted, in my opinion, as a research format; nobody is actually taking care of it and there is no active tools development.

Siren is, on the contrary, much more followed and we can find a comprensive set of tools. That one is going to be our hypermedia format for our client.

