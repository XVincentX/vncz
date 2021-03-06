---
layout: post
title: Write a plugin for Kong
date: 2017-07-14 13:30:06.000000000 +02:00
---

## Kong overview

Over the last couple of week(end)s I've been playing with [Kong](https://getkong.org) - the open
source API Gateway from the guys of [Mashape](https://mashape.com).

While I didn't have any specific need to employ Kong, I've always heard good things about it
and I wanted to give it a try.

The first impressions were great; in less than 30 minutes I was able to spin up a **fully working
instance** using [Docker](https://docker.com); moreover, testing Kong is one of the scenarios where
I think Docker **really shines**, because it lets you create **complicated network topologies in a
declarative way**. It is perfect to test, for instance, multiple microservices spread on different
networks and so on and so forth.

## The problem

After using it for a while, I actually found an interesting use case: **authentication for internal
resources**.

Suppose, in your organisation, you've got some internal resource such as internal documentation,
internal websites or facilities hosted somewhere in your infrastructure, which should be accessed
only by your **employees**.

There are multiple ways to do that, such as **Basic Authentication** with a username/password, or share
a password across the whole company (although _it's not a great security practise_), or use some sort
of **SSO** system (it's probably the best choice but it might be an overkill for small companies)

A good tradeoff among the various solutions is to rely on your email address: as long you've got an address
belonging to `@yourOrganisation.com`, you're allowed to access our internal resource. In this way,
if you remove that email address (because your employee is leaving, or an external contractor just
finished its job, therefore he should leave the company), he won't have access to that anymore.
Simple as that, no need to memorize yet another password, no need to remember to remove another
username/password combination from your systems once your guy is gone.

Clearly, this wasn't my idea: Apiary rolled out it's [own solution](https://github.com/apiaryio/protected-s3)
where I also contributed back in the time. It has been working very well for us, but there are some important
assumptions here:

1. Your email provider must be **Google** (in particular, you should have an Apps for Work subscription)
2. Your secure content is stored on **Amazon S3**

While changing the strategy is really easy with **PassportJS**, I figured out after a while that the
hosted domain check is a [Google specific parameter](https://github.com/jaredhanson/passport-google-oauth2/blob/b94efe85b368f0d52940949eaf304cae15ed4647/lib/strategy.js#L159).

This means that OAuth2 does not offer any way to check for domain membership out of the box: if I would
change my OAuth provider (such as **Outlook**, **Yandex** or whatever's fancy nowadays), then any issued
token by the email provider would make me access the resources even though I'm not under my organisation domain.

## Writing a custom plugin

I've been looking for a way to get rid of both Google as OAuth provider as well as S3 as the only
hosting mechanism, and this is where Kong comes into the game.

Kong offers an OAuth2 plugin out of the box, but it's doing way more than we need: it's implementing
the server side part as well, while we just need a trusted token provided from a thirthy party service.

Fortunately I've been able to find another [plugin](https://github.com/mogui/kong-external-oauth) that's
doing most of what I need, but it's lacking the hosted domain feature. As we said earlier, it's a
Google specific parameter and it's not part of the OAuth specification, therefore
I've decided to fork it and add the missing part of the code.

Kong plugins are written in **Lua**; I've never wrote any line of code with that language but it
was super easy to make it work.

I'm not going to go into plugins details since there are [way better articles](http://streamdata.io/blog/developing-an-helloworld-kong-plugin/) than I could ever write, so I'll
simply highlight what I've done here:

### Step 1: add plugins parameters

Each Kong plugin has a `schema.lua` file that's describing the plugins parameter that you can configure
it during it's instanciation.

```lua
{
    --...other plugin fields
    hosted_domain = {type = "string", default = ""},
    email_key = {type = "string", default = ""}
}
```

In my case, beyond the usual plugins parameters (such as **authorize** endpoint, **token** endpoint and **userinfo**
endpoint), I'm requiring the **hosted domain** (basically what comes after `@` that the plugin shuold
check for) as well as the key in the user info object has got the **email address**. This is good to
accommodate different userinfo payloads (sometimes the `id` is your email address, sometimes is not.).
In my case, **Yandex**, is storing the email address in a field called `default_email`

### Step 2: Check for domain validity

Given we have the data, it's just matter to check the domain once we got the informations back from the
userinfo endpoing:

```lua
if conf.hosted_domain ~= "" and conf.email_key ~= "" then
  if not pl_stringx.endswith(json[conf.email_key], conf.hosted_domain) then
    ngx.status = 401
    ngx.say("Hosted domain is not matching")
    ngx.exit(ngx.HTTP_OK)
    return
  end
end

```

### Step 3: Validate the email, for real

The code shown in the step above isn't a real email check; it's just making sure that the string
found in the `email_key` ends with the specified `hosted_domain`. A good improvement here would
then be to use a validation library to check, first, that the email is a real email; then parse
the address, extrapolate the domain and then check it's equality with the provided string.

However, as long we trust our provider, it's probably a check that we can skip.

### Next steps: S3 plugin

Over the next weeks, I plan to write a simple S3 plugin, so that we can completely replace our
initial home made solution.
