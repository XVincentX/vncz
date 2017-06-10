---
layout: post
title: Http PATCH done right
date: 2015-02-14 23:07:39.000000000 +01:00
---
Couple of days ago we were reviewing a Pull Request for an **API** draft specification, and my collegue's eyes falled on a **PATCH** verb, and he commented on that

> By RFC PATCH has to be used with mime type which exactly specifies how to deal with the payload (how to apply the patch), which  application/json  is not.
For such reason, you either have to use PUT (replacing with complete representation), or you go for some format, which exactly describes the patch algorithm

It was a real interesting point and it was worth to have a further research on that.
After few minutes of googling I ended up to [JsonPatch](http://jsonpatch.com/), ([IEFT link](http://tools.ietf.org/html/rfc6902)) that looks like it accomplish to all required needs.

Basically, a JSON Patch is a format for describing changes to a JSON document. It can be used to avoid sending a whole document when only a part has changed.

The Json patch documents are valid json documents itselfs, and provides basic operations such as add, remove, update, test, copy.

I will not go throught that since the describing documents is very clear.

The interesting thing is that they have got a [.NET library](https://github.com/myquay/JsonPatch) as well that can really easily be plugged into WebApi pipeline. Let's quickly see how.

Add the mediatype formatter into your WebApi configuration:

```csharp
public static void ConfigureApis(HttpConfiguration config)
{
  config.Formatters.Add(new JsonPatchFormatter());
}
```

Declare your Api method claiming you're going to receive a **JsonPatchDocument** class instance
```csharp
public void Patch(Guid id, JsonPatchDocument<SomeDto> patchData)
{
    var objectToUpdate = repository.GetById(id);
    patchData.ApplyUpdatesTo(objectToUpdate);
    repository.Save(objectToUpdate);
}
```

Update your data, and you're done.
Thanks to WebApi modularity, this repetitive code can be easily moved one level up (a DelegatingHandler, for example), thus receiving directly modified objects (or throwing an exception if their validator is failing).
