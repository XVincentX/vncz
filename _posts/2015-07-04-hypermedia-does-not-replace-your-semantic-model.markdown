---
layout: post
title: Hypermedia does not replace your semantic model
date: 2015-07-04 20:51:06.000000000 +02:00
---
This is a serie about developing a simple Hypermedia Client in AngularJS.

1. [Hypermedia introduction](/hypermedia-client-in-angularjs/)
2. [Hypermedia formats](/hypermedia-client-in-angularjs-hypermedia-types/)
3. [Hypermedia client](/hypermedia-client-build-details/)
4. [Considerations](/hypermedia-client-considerations/)
5. [Hypermedia does not replace your semantic model](/hypermedia-does-not-replace-your-semantic-model/)

Last week I've been speaking at [mDevCamp](http://mdevcamp.cz) conference in Prague about _Building Resilient API clients_.
Of course, it is not possible to dig enough into Hypermedia in just 25 minutes. Thous, I explicitly declared that the intent of the presentation was more about raise awareness than trying pretend to be a precise explanation. You can have a look to the [video](http://slideslive.com/38894088/building-resilient-api-client) and to the if interested. I really apologize for
the hair style and my general appareance, but it was Saturday and had got a crazy Friday (as usual).

<script type="text/javascript" src="//slideslive.com/embed_presentation.js"></script>

<script type="text/javascript" id="sle81767">
  slidesLive = createSlidesLiveBox();
  slidesLive.bgColor="transparent";
  slidesLive.embedPresentation(38894088);
</script>


By the way, after that, a small discussion group formed, and I got a very interesting question:

> Suppose that our client, in order to create a new poll, needs a new value that is not user provided; for examplee, the current DeviceID. How do we handle that on our client?

That was a very interesting question and, in my opinion, it definitely shows an probable limit Hypermedia.

### How do we handle a new value requirement?
Well, it depends. Some formats, such as **HAL**, simply have not got the concept of **ACTION**; that means, we cannot move through the transitions at all. So, the problem does not exist (to be precise, it is not solvable): redeploy the client is the only viable choice.

Things start to be a bit more interesting when dealing with **Siren**, where we may have some flexibility on that.

It is easy to understand that, if the value is not user provided, new client code is needed, and a redeploy is, again, mandatory.

What kind of lesson can we learn from this simple example?

#### Hypermedia API are ready to embrace implementation details change, not new semantic logics.

Let's now move forward and because limitations comes also when talking about implementation details changes.
In order to show this thing, I'll take an example directly from [pollsApiClient](http://pollsapiclient.herokuapp.com)

As you can see, our [reference implementation](https://github.com/apiaryio/polls-api/blob/e2fd31720150c3fdff71295b9aaea5f48f0ee3ba/polls/resource.py#L137) is returning us pagination informations, such as **First**, **Previous**, **Next** and **Last** page.

In order to write the most generic client possible, we may try to arrange the button bar on bottom with this code

```html
<a  class="btn"
    href
    ng-repeat="link in ctrl.polls.links track by link.rel[0]"
    ng-click="ctrl.followLink(link)">\{\{::link.rel[0]\}\}</a>
```

Simple, easy. Thous, the result will be something like this:

Too simple, perhaps. Let's try to personalize the buttons with some fancy css:

```stylus
.pollsList a:last-of-type:after
{
    content: '  \00bb'
}

.pollsList a:first-of-type:before
{
    content: '\00ab  '
}
```

This simple css snippet will add a **<<** on the first button, and a **>>** to the last one. The plan is quite simple: First and Last button should have got an arrow after their name.

Running again the application, the button bar looks definitely better. But let's try to see how it reacts to server changes. Let's say we just have two polls, so no **Next**,**Prev**, and **Last** button. Just **First**.

![First](/images/First.webp)

As you can see, we're having a visual inconsistency. That button is the first and the last one in the same time, so both the styles are applied, and it does not work as we want.

We can find a lot of troubles like that. For example, it would be enough to change the server implementation to return the buttons in a different order to break the client.

We definitely need a more robust approach to handle this thing, and the only way is to apply some kind of styles only when some particular actions are avaiable; this means, in term of code:

```html
<a  ng-class="[btn, {first: link.name === 'first', last: link.name ==='last'}]"
    href
    ng-repeat="link in ctrl.polls.links track by link.rel[0]"
    ng-click="ctrl.followLink(link)">\{\{::link.rel[0]\}\}</a>
```

And, of course, our css must be modified to have new ´first ´ and ´last´ classes, to handle those exceptions.

Another way to handle it, is to avoit the `ng-repeat` directive and output the buttons by yourself directly.

```html
<a class = "btn first" ng-show="ctrl.hasLink('first')"
    href
    ng-click="ctrl.followLink('first')"> << First </a>
```

...and so on for next, last, prev

No matter how you want to handle the case, but special code will be needed anyway. And this is just a simple css thing. During development you will for sure encounter more particular cases, that have to be handled with special code. Weird thing, you may think; what is the purpose of hypermedia if I still have to hard code the stuff into my code?

The answer is easy: ultimately, clients can’t be completely agnostic of what we’re doing on the server. A general-purpose client for a standard hypermedia format will look generic and boring (it would be an [API explorer](https://github.com/wurlinc/siren-browser)). We’re not trying to build a generic client, we’re building one for a specific purpose.
