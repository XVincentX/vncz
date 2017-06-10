---
layout: post
title: Making of SimInfo
date: 2014-09-02 23:17:53.000000000 +02:00
---
[SimInfo](http://www.windowsphone.com/it-it/store/app/siminfo/c0caf670-5488-4aef-9010-f8427de82b37) was a free Windows Phone 8  application that will manage for you all necessary data about your credit on a tiles with auto update feature that will notify you when you're going under the numbers you will set.

In this post I want to share you considerations, code snippets and issues during its building. Keep in mind that this application was:

* First Windows Phone application
* First Xaml experience

## Why
The application was born as a sign of objection against [Wind](http://www.wind.it) operator that, at November 2013, had got no Windows Phone 8 application. Since I was a bit tired to check up the site every time, I deciced to try out the SDK and see if I could improve my situation.

## First steps
When project started, I had got no ambition/presumption. So I just set up a minimalistic UI and a simple [HttpClient](https://www.nuget.org/packages/Microsoft.Net.Http/) querying for the data directly from website, parsing the returned html page (with login simulated).

## Beta problems
The very early beta version of application had got this things to keep in mind

* All was done on the phone. Html page login, Html page download, parsing, data retrieving and tile rendering.
* The same job above was performed by a [Background agent](http://msdn.microsoft.com/en-us/library/windows/apps/hh202942(v=vs.105).aspx) too.

During the beta a lot of users started to signal errors regarding timeouts. Every time that a data update was requested, 2 html pages were downloaded, parsed. Furthermore, with parsed data, a Xaml view had to be rendered (two times, one per tile resolution) and then saved on disk. Everytime I had got an account with more than a single number, background agent timeout was unevitable.

Scratching data from html pages directly from the phone was not a great idea. For this reason I started thinking move to a server side processing.

Few days later, I discovered a JSON endpoint to get the same data. I was so giving up with Server Side processing. However the endpoint was under https but with a self signed certificate, and Windows Phone 8 does not allow you to make request to https invalid endpoints. The server side was unevitable.

## Moving to server side
Since the application was going to be free, free had to be the hosting too :)
After a first (and disastrous) start with [somee](https://somee.com/FreeAspNetHosting.aspx), I landend on [AppHarbor](http://www.appharbor.com).
AppHarbor is just amazing: Git repository as application storage, integrated build and test execution environment, very nice dashboard, a lot of free addons, and a free ssl endpoint too. Just what I was looking for.

The code on server side is relatively simple. It is just one WebApi2 controller with a single main action: GetData
```csharp
public async Task<IHttpActionResult> GetData([FromBody]Q_X d1, [FromUri]Q_X d2)
  {

  }
```
The presence of same parameters, one **FromBody** and one **FromUri** is due to compatibility. First client versions used to send data over queryString, the subsequent ones in body. So the two arguments are merged to get a real data.

```csharp
	Q_X data = d1 ?? d2;
```

The controller is very very simple. It saves some data into a SqlDatabase and calls a method from an injected (inferred from query string) interface:

```csharp
public interface ICreditInfoRetr : ICloneable
{
    Task<CreditInfo> Get(string username, string type, Guid dev_id);
    string Type { get; }
}
```

Since the querystring is a runtime parameter and I hate to expose my container into actions, I used a [delegate factory](https://github.com/autofac/Autofac/wiki/Delegate-Factories) to construct object implementation.

Initially I had got a single implementation, today I can praise to support

* Wind
* Vodafone
* Tim
* H3G
* Noverca
* CoopVoce

and new ones are added when a comprensible pool of users start to ask about it.

## Stats

The interesting thing is that, to serve 108k daily requests, the CPU is always averaged in 0.10-0.19. I've never seen CPU load beyond 0.25
This really good ratio is due to Async Controller nature. 90% of time is just waiting data from carrier server. Only a small amount of time is spent for manipulation. This assumption, united with **async/await** pattern, makes me serve a lot of request with a minimal CPU load.

Beyond this load (due to background agent periodic downloads) there is another group of users that are server using push notification. These are hosted on Windows Azure and gets triggered every 10 minutes. Pushnotifications are, of course, sent only if a variation in credit data is detected.
Everyday 2000 push notifications (tiles and toast ones) are sent.


## Regrets and lessons learned
A lot of thing to be proud of, but a lot of things of shame.
At first, I really underestimated the project. Since all was born as a playground and no public application was planned, the client side code is a bit tricky.

* No MVVM framework. Today every my WP application starts installing [Caliburn](http://caliburnmicro.com)
* No MVVM pattern at all. View and ViewModels are supercoupled, **Dispatcher.BeginInvoke** is everywhere in the code and there is no **ICommand**. All is driver by old events.
* Poor error management. All the unexpected error will end up with a simple messagebox and your application will be closed. Luckly the application is now tested and stable so these kind of errors are end. But in the early days was a complete pain to locate error and degrade gracefully. I had a lot of 1 star comments for this mistake.
* [Megamethod](https://vncz.azurewebsites.net/megamethods/) for **ICreditInfoRetr** interface
* Poor project naming. The application was initially developed for Wind operator. So I called initially **WindInfo**. Very very bad idea. When it was growing and expandend to multiple operators, it was very annoying to see _Wind_Something namespace everywhere. Just don't. For each project, use a [Codename](http://www.codenamegenerator.com/) and avoid this shame.
![](/content/images/2014/Sep/Capture-3.PNG)

However, I am now developing a new Windows Phone 8.1 application (that is going to be open sourced once finished). I will try to apply all lessons learned with this fantastic experience.
