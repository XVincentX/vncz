---
layout: post
title: Angular-Formly Siren Actions
date: 2015-08-23 20:51:06.000000000 +02:00
---

A great thing about working on a pet project is that you can get rid of your daily routine and move to your favourite frameworks, tools and interests.

During my work on [pollsApiClient](https://github.com/XVincentX/pollsApiClient), I decided to go using [angular-formly](http://docs.angular-formly.com/) as I described on my previous post (check it if you want further details).

While using it, I found lack for a native support for **Siren Actions**, and I filed an [issue](https://github.com/formly-js/angular-formly/issues/338) for that thing; the problem was, by the way, out of scope and it was not going to be fixed.

By the way, I decided to contribute back to the project and make an automatic transformer for _angular-formly_.
After some consultations with the manteiner, I am quite happy to announce [angular-formly-siren-action](https://github.com/formly-js/angular-formly-siren-action)

To be honest, it is nothing really great. The current source code is a simple map function using lodash:


```javascript
import _ from 'lodash'

export default function mapSirenToFormly(fields) {
  return _(this.action.fields).map(field => {
    return {
      type: this.action.name + '.' + field.type,
      key: field.name,
      defaultValue: field.value,
      templateOptions: {
        label: field.title || field.name
      }
    }
  }).value()
}
```

Still, it is great to contribute back to some project, even if in just a small way.
