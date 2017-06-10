---
layout: posts
title: Blog
---

{% for post in site.posts %}
  <article>
    <h1><a href="{{ site.url }}{{ post.url }}" rel="bookmark" title="{{ post.title }}">{{ post.title }}</a></h1>
    <p>{{ post.content | strip_html | truncate: 300 }}</p>
  </article>
{% endfor %}
