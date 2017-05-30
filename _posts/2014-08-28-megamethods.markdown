---
layout: post
title: Do not use mega methods.
date: 2014-08-28 23:03:13.000000000 +02:00
---
I have always (and you should too) hated the **megamethods**.

A megamethod (name is my invention) is the typical _antipattern_ where you have got an interface and a single method to implement, in which you should write everything.

Sad to say, _Microsoft_ is giving us just an [example](http://referencesource.microsoft.com/#System.Web/xsp/system/Web/IHttpHandler.cs) of this kind of interface.

```csharp
public interface IHttpHandler
{
    void ProcessRequest(HttpContext context);
    bool IsReusable { get; }
}
```

As you can see, apart of *IsReusable* member, all the Http handler logic should be placed into a single method using a Context, that contains all the necessary informations to complete the current Request sent to the server.

However, I do not blame Microsoft for this solution here. Handling an Http request can be complex and, since there are no **established** patterns to fulfill a Request (you may want, for example, to check some headers, of fill the cache with some data inside and so on), they were forced to give you _everything_ (HttpContext) and DO everything inside a single method.

There are a lot of other context where the laziness of programmers may led to write this kind of interface.
This kind of approach, in my opinion, will only cause pain for the implementers and ends up always with a single giant method with 2k lines of codes that are completely unmantainable.

To end up, if you have got an interface with a single method, it is very likely that you're making a MegaMethod and you should really revisit it.
