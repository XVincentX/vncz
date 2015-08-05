---
layout: post
title: Hypermedia client - details
date: 2015-08-05 20:51:06.000000000 +02:00
---
This is a serie about developing a simple Hypermedia Client in AngularJS.

1. [Hypermedia introduction](/hypermedia-client-in-angularjs/)
2. [Hypermedia formats](/hypermedia-client-in-angularjs-hypermedia-types/)
3. [Hypermedia client](/hypermedia-client-build-details/)
4. [Considerations](/hypermedia-client-considerations/)
5. [Hypermedia does not replace your semantic model](/hypermedia-does-not-replace-your-semantic-model/)

In this post I am going to review fundamental parts of angular js client. You may be not interested at all if you dislike [Angular](http://angularjs.org), or if you just like to read theory and not see the practise (as 90% of Hypermedia speakers, see [this guy](http://kinlane.com/) or [this other one](http://amundsen.com/blog/), for example.).

So, first things first. Why do not embrace [Angular 2](http://angular.io)?
To be honest, I've been tempted until the last moment to use the new framework, but after couple of hours I decided to revert back to Angular 1 for the following reason.

1. When the [project started](https://github.com/XVincentX/pollsApiClient/commit/562c107780874b96b7a27b6262dad70d8ec515ff) (26/02/2015), Angular was not even in alpha state, not present on Npm.

2. Even if not it is present on npm, it still has not got a `main` entry into `package.json` file, that makes everything a bit more difficult

3. [jspm](jspm.io) lacks support, actually, to transpile everything that is not es6 (but .ts native support is coming). If I've to use angular2, I want to use Typescript.

4. Using angular2 would mean starting literally from 0, while with angular 1.x you have got an huge library of resources, directives, reads and so on.

5. While I totally disagree with this very common sentence "Angular 2 is a completely new framework", I still belive that the transition to that framework would not be totally painless. The aim of the project was to evaluate the difficutiles about writing an hypermedia client, not evaluating the framework itself. For this reason, I thought that starting with something I was comfortable with would be a more fair point.


So, Angular 1, no more doubts about that.

## Package manager

The first one was, of course, [Bower](http://bower.io). There is a very huge debate about "Where should I publish my browser package?" Bower? Npm? Download the file as a GitHub release? And after? Browserify? Webpack?

Several months ago I was having a look at [Aurelia](http://aurelia.io) framework, and I literally falled in love for [jspm](http://jspm.io). Basically it is a module-loader + package manager + build tool + transpiler (ES7 as well using [babel](http://babel.io))for modern web applications. It supports plugins (to load something more than just javascript files), github, npm, bower or what you want as source for packages. Furthermore, it leverages SystemJS as module loader.

Minuses? From my point of view, just a big one: since Aurelia is their "bigger customer", they cannot move forward until that framework is ready. This could be quite annoying, expecially when [important bugs](https://github.com/jspm/jspm-cli/issues/675) are discovered.

As second niptick, there are not so many plugins as [Webpack](http://webpack.github.io/), but it is something that I am quite confident it will definitely improve (given that SystemJS should became the new standard, I guess).

## The Hypermedia Client

Writing a client from scratch was out of question. I don't think I have got the capabilities to make a decent one (at least, not yet). Given that, I had to find one that could be suitable for me.

This was not an easy choice. The first thing that you would probably do is to search something like _Hypermedia client angularjs_ on Google, and that is what basically I did. There are several good clients such as [Hyperagent](https://weluse.github.io/hyperagent/) or [Angular-hateoas](https://github.com/jmarquis/angular-hateoas), but the one that caught my attention was [angular-hy-res](https://github.com/petejohanson/).

To be honest, I do not remember how I found that, but I am sure what made me choose it.

1. It is just a thin layer on top of [hy-res](https://github.com/petejohanson/hy-res) library, written and mantained by the same author.
2. Support for multiple mediatype formats (CJ, Siren and HAL, actually). Thanks to the plugin structure, add new adapters should be really really easy.
3. Awesome person behind it. Albeit the library was not complete, I filed several [issues and pull requestes](https://github.com/petejohanson/angular-hy-res/issues?utf8=%E2%9C%93&q=author%3AXVincentX) that were handled, honestly, in a very professional manner and at speed of light.

## Generating the forms
One of the most interesting parts of Siren is the **action** concept, that basically is the _fill the form_ part of browser counterpart.
So, we do have an array of siren fields in a action context, how can we render them?

Of course, we can hardcode them by hand, but after a while I found a very interesting project that was aiming to solve this problem: [angular-formly](http://angular-formly.com/#/). With few [lines of code](https://github.com/XVincentX/pollsApiClient/blob/master/app/formlyTemplates/templateInstall.js) I was able to create custom templates based on Siren field `name`.

After that, given that Siren actions are kind of standard, I've started a collaboration with the team to create a [siren adapter](https://github.com/formly-js/angular-formly-siren-action) for angular-formly. I really hope to start to contribute as soon as possible.

### Want to know more?
Feel free to file an issue or write me an email! I'd be happy to give you further details!

### What's left?

There is still a lot of [work](https://github.com/XVincentX/pollsApiClient/issues/39), but the client definitely works!

Last sweet thing.
During the time, I've been tracking on a personal [Trello](http://trello.com) card all the issues I found, and if they were resolved. Are you curious about that? Here is the list!

## Issues

1. [pollsApi](https://github.com/apiaryio/polls-api/pull/6) does not support CORS headers
2. [angular-hy-res](https://github.com/petejohanson/angular-hy-res/issues/4) does not support header parameters
3. [jspm bower endpoint](https://github.com/2fd/jspm-bower-endpoint/issues/23) cannot update a library.
4. [angular-hy-res](https://github.com/petejohanson/angular-hy-res/issues/5) forgets about the given host when issuing following requests
5. [angular-hy-res](https://github.com/petejohanson/angular-hy-res/issues/6) does not support Siren actions
6. [restangular](https://github.com/mgonto/restangular/issues/1065) requires lodash as a global object
7. [pollsApi](https://github.com/apiaryio/polls-api/issues/15) does not paginate the returned data. 
8. [multiple entries into bower file endpoint](https://github.com/2fd/jspm-bower-endpoint/issues/24)
9. [multiple entries for jspm cli bower file](https://github.com/jspm/jspm-cli/issues/752)
10. [ombnibar override](https://github.com/jspm/registry/pull/388) in jspm
11. [angular-hy-res](https://github.com/petejohanson/angular-hy-res/issues/11) cannot give me list of actions in Siren
12. [ng-promise-status](https://github.com/BarakChamo/ng-promise-status/issues/3) cannot be installed as a npm module
13. [pollsApi](https://github.com/apiaryio/polls-api/issues/19) does not fill siren fields appropriately.
14. [Siren form type](https://github.com/apiaryio/polls-api/issues/20) is not filled
15. [jspm-cli](https://github.com/jspm/jspm-cli/issues/845) omits the polyfill for Internet Explorer
16. [hy res promises](https://github.com/petejohanson/angular-hy-res/issues/13) are not rejected when an error happens

## Nice to have

1. [Http batching support for polls api](https://github.com/apiaryio/polls-api/issues/9)
2. [Reset Polls api contents periodically](https://github.com/apiaryio/polls-api/issues/10)
3. [angular-hy-res module name from Batarang](https://github.com/petejohanson/angular-hy-res/issues/7)
4. [angular-hy-res](https://github.com/petejohanson/angular-hy-res/issues/8) should provide an unwrap method
5. [angular-hy-res](https://github.com/petejohanson/angular-hy-res/issues/9) on Npm registry
6. [svg progress bar linear](https://github.com/crisbeto/angular-svg-round-progressbar/issues/20). Won't be implemented, found another one.
7. [omibar](https://github.com/isteven/angular-omni-bar/issues/3) as npm package
8. [Siren action support for angular-formly](https://github.com/formly-js/angular-formly/issues/338)
9. [pollsApi](https://github.com/apiaryio/polls-api/issues/23) order polls by publish date 
10. jspm does not support other than simply css loader
11. [ngPromiseStatus places a completely wrong condition](https://github.com/BarakChamo/ng-promise-status/issues/4)
12. [pollsApi](https://github.com/apiaryio/polls-api/issues/27) is missing **First** link in pagination
13. [pollsApi](https://github.com/apiaryio/polls-api/issues/28) is missing template URLs for the pages
14. [angular hy res](https://github.com/petejohanson/angular-hy-res/issues/14) does not work in strictly DI

Yeah, programming is easy, they said.