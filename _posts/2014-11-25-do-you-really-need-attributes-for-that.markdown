---
layout: post
title: Do you really need attributes for that?
date: 2014-11-25 20:44:14.000000000 +01:00
---
Attributes provide a powerful method of associating declarative information with C# code, that can be queried using reflection.

Example usage of attributes includes:

+ Associating help documentation with program entities (through a Help attribute).
+ Associating value editors to a specific type in a GUI framework (through a **ValueEditor** attribute).

Based on this claims, do you think you're using attributes in the **right way**?

Let's consider this piece of code:

```csharp
public class SequenceAttribute : Attribute
{
    public SequenceAttribute(string sequenceName)
    {
        SequenceName = sequenceName;
    }
    public SequenceAttribute(string sequenceName, string dateReferencePropertyName)
        : this(sequenceName)
    {
        ReferenceDatePropertyName = dateReferencePropertyName;
    }
}
```

And let's see its usage here:

```csharp
DateTime? referenceDate = String.IsNullOrEmpty(bsAttrib.ReferenceDatePropertyName) ? null :
   (DateTime?)instance.GetType().GetProperty(bsAttrib.ReferenceDatePropertyName).GetValue(instance, null);
```

Do not focus too much on code, but on the _intention_: we're getting back metadata from attributes throught reflection. In particular case, the metadata is telling me what property value should I get and continue my computations.

I consider this kind of code an antipattern: we're defining some kind of **contract** with our classes throught an attribute, while the leading way to define a contract/protocol/rules/_WhatYouWant_ is an **interface**!
Let's refactor this code extracting an interface for that:

```csharp
public interface IEntityWithBusinessSequence
{
    public string ReferenceDate { get; }
    public string Key { get; set; }
}
```

And then, instead of this
```csharp
public class File
{
    [BusinessSequence("FileDate")]
    public int FileCode {get; set;}

    public DateTime FileDate { get; set; }
}


public class File : IEntityWithBusinessSequence
{
    public int FileCode {get; set;}
    public DateTime FileDate { get; set; }


    public string ReferenceDate { get { return FileDate; } }
    public string Key { get { return FileCode; } set { FileCode = value; } }
}
```
This simple example show us how it is possible, in the most part of cases, replace attributes with a **REAL** contract, that is an interface. We infact have

1. Removed attribute usage
2. Removed need of reflection (and I am always happy of this)
3. Introduced compile time check (that will save lifes when you will a day change field names or something related)
4. Introduced the concept of "sequentiable" elements (thorught interface) that may be useful when passing around objects into your application.

This is, of course, just one example that I found during my current job, but there are a lot of other examples that can follow the same reasonment.

### A real example: EntityFramework
Beside the [EntityTypeConfiguration class](http://msdn.microsoft.com/en-us/library/gg696117(v=vs.113).aspx), that is the right way to describe your entity, it offers you the possibility to decorate your class with attributes.

Given that, in my opinion, this is a wrong approach (you're really polluting your DomainModel with Ef specific attributes), it can be mitigated using [MetadataTypeAttribute](http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.metadatatypeattribute(v=vs.110).aspx) that acts as a _proxy_ to read your metadata.
If you really ~~want~~ have to use attributes on EntityFramework, please use them on a proxy class.

Based on these simple examples, please reconsider your attribute usage and start make questions to yourself if:

1. You're not using attributes for metadata purposes.
2. Yous metadata are consumed by your application, and not by your (or external) tools.
