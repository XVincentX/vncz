---
layout: post
title: Creating a own password hiding
date: 2015-11-10 20:51:06.000000000 +02:00
---

Last week, while I was surfing the web, I find out [Readme.io](http://readme.io) has a very interesting effect. If you go to their [login page](https://dash.readme.io/login) and place your mouse on the password field, the owl will hide its eyes, since it does not want to see your password.

I found the thing very funny (and genial, to be honest). The most interesting this is that replicating the effect is not so hard as it may look like at the beginning...so

# Let's create our own owl!

## Html

First of all, let's place some HTML that we will style.

{% highlight html %}
<div class="owl">
  <div class="hand"></div>
  <div class="hand hand-r"></div>
  <div class="arms">
    <div class="arm"></div>
    <div class="arm arm-r"></div>
  </div>
</div>
{% endhighlight %}

The structure is quite simple: inside the own div we have placed 2 hands and two arms. 

{% highlight css %}
.owl
  width 211px
  height 108px
  background-image url('https://dash.readme.io/img/owl-login.png')
  position relative
{% endhighlight %}

The `owl` class is really simple: setting the background image, dimensions and `position:relative`. We need to explicity se this because we will use the `absolute` positioning inside.

Now, let's style the hands:

{% highlight css %}
.hand
    width 34px
    height 34px
    border-radius 40px
    background-color #472d20
    transform scaleY(0.6)
    position absolute
    left 14px
    bottom -8px
    transition 0.3s ease-out

    &.hand-r
        left 170px

{% endhighlight %}

Nothing of really serious is happening here: dimensions are set and thanks to `position:absolute`, we can set `top/left` properties (and override them for the right hand). The `border-radius` and `scaleY` properties allow us to create an ellipse and place it where we need.

So far, the result should be something like this:

![owl](/images/owl1.png)

## Result

The final result can be seen here:

<p data-height="268" data-theme-id="0" data-slug-hash="avRqep" data-default-tab="result" data-user="XVincentX" class='codepen'>See the Pen <a href='http://codepen.io/XVincentX/pen/avRqep/'>Owl replica from readme.io</a> by Vincenzo Chianese (<a href='http://codepen.io/XVincentX'>@XVincentX</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>