---
layout: post
title: Creating a FlipSwitch in Css
date: 2015-09-29 20:51:06.000000000 +02:00
---

As frontend developer, I usually write a lot of stuff that runs in the browser. Anyway, most of the time, I write back-frontend code. It means that usually I do not fight with implementing UI components from *scratch*, and my CSS skills are usually limited to small modification.

Not so long ago, I was working to a sort of _UI Kit_ for [Apiary](https://apiary.io), and I struggled for a while to implement a simple *FlipSwitch*.

To clarify, this is a FlipSwitch.

<p data-height="268" data-theme-id="0" data-slug-hash="AxFbl" data-default-tab="result" data-user="goiblas" class='codepen'>See the Pen <a href='https://codepen.io/goiblas/pen/AxFbl/'> Simple flip switch css:checked</a> by goiblas (<a href='https://codepen.io/goiblas'>@goiblas</a>) on <a href='https://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Pretty simple, right? I am quite sure that every designer/css ninja will find code this a newbie task, but it may give some problems to backend developers and so on.

Given that...

## Let's make a FlipSwitch in CSS3 from scratch!

### Skeleton

We will make one slightly different than the one proposed, but the general concepts should be almost the same.

If we think well, a *FlipSwitch* is no more than a well-styled checkbox, so it is going to be our starting point.

```html
<input type="checkbox"/>
```

That will render something like this:

<input type="checkbox"/>

Ok, now let's make the things nicer. At first we will need some additional HTML code. At first we will wrap the checkbox itself into a div and add some stuff that we will use later.

```html
<div class="switch">
    <input type="checkbox" class="switch-checkbox" id="switch"/>
    <label class="switch-label" for="switch">
        <span class="switch-inner"></span>
        <span class="switch-switch"></span>
    </label>
</div>
```

So, given that we're going to replace the checkbox with our implementation, the first thing is to hide the current one, so:

```stylus
.switch
    .switch-checkbox
        display none
```

Now, let's give to the switch some basic styles to understand what is going on.

```stylus
.switch
  display inline-block
  background-color #49B7FF
  width 70px
  height 34px
  
  .switch-checkbox
    display none
```

That should give us something like this.

FUCKING IMAGE

**Q:** Why `inline-block` instead of `inline`?

**A:** Basically `inline` tells to the selected element: _Hey please, do not lay on all the current line, but use just the necessary space._. It turns out that, when the current element hasn't any visible content (that's our case, since we hid the original checkbox), it won't show, even if we specify _width_ and _height_ properties. On the other side, `inline-block` says: _Hey please, do not lay on all the current line, but use just the necessary space (inline). But inside this element, behave as a block, so get all the space, regardless of content presence._

Now let's go further and let's style the `switch-switch` element, that is going to be our clickable button.

```stylus
.switch-switch
  display block
  background #FFFFFF
  width 28px
  height 28px
  border 1px solid #FFFFFF
  border-radius 40px
```

This will make our switch to appear with a circle, that is going to be the part in movement for our component.

### The hard part
Now the hard part comes. Our aim is now to move the circle on left and right based on checkbox state, and the best way is to act directly using `right` or `left` properties, that work only when the position is `fixed` or `absolute`, Usually, using the `position: absolute` is a bad practice but, given that we are in an isolated container with fixed width and height, we can safely rely that our element will always stay in a well defined container (if the container is decorated with `position: relative`) without damaging the rest of the page. Given that, let's switch to an absolute position method, specifying the top and left properties:

```stylus
.switch
  position relative
  display inline-block
  background-color #49B7FF
  width 70px
  height 34px

.switch-switch
  display block
  position absolute
  background #FFFFFF
  top 3px
  left 4px
  width 28px
  height 28px
  border 1px solid #FFFFFF
  border-radius 40px
```

And then we will have the element fixed on the left.

Now, we want to move the circle when we change the checkbox. At first, thanks to the `for` attribute on top of the `switch-label` element, every click on that element will move the checkbox state from selected to unselected, and viceversa.

Given that, we want to move the circle about a certain number of pixels, and we can do that using the `left` property. In order to do that, we're going to use a bit odd css selector:

```stylus
.switch-checkbox:checked 
  &+ .switch-label 
     .switch-switch
        left 38px
```

That, literally, means: Hey, take the `switch-switch` element contained into a `switch-label` element, which must be next to a checked `switch-checkbox` and move the `left` property in accord.

So, we now have got a moving button and it is setting the checked value in the right way.

### Even more hard part

Ok, now let's go into the hardest part.

```stylus
.switch-inner
  display block
  width 200%
  margin-left -100%

.switch-inner:before,
.switch-inner:after
  float left
  width 50%
  line-height 34px
  color white
  box-sizing border-box

.switch-inner:before
  content "On"
  padding-left 10px
  background-color #49B7FF
  color #FFFFFF

.switch-inner:after
  content "Off"
  padding-right 10px
  background-color #8A97B1
  color #FFFFFF
  text-align right

.switch-checkbox
    &:checked
      &+ .switch-label 
         .switch-switch
            left inherit
            right 4px 
            
      &+ .switch-label
         .switch-inner
            margin-left 0        

```

Ok, at the first lines, we're telling that `swith-inner` element will have the double of parent's width (and so it will overflow). Given that, we're equally distributing the width between the `before` and `after` part, and then we set up two different background colors. This will basically give us the two background colors that will slide between right and left, depending on the state. We're then setting the content to 'On' and 'Off'.

Futhermore, as you can see, we're using the `margin-left` as moving property.

Next step: let's hide the overflowing part in order to display one part per time.

```stylus
.switch-label
  display block
  overflow hidden
  cursor pointer
```

### Closing the loop
The switch is now done, but it's ugly. Let's add some fanciness to the thing.
At first, let's add some animation for the properties we're moving when clicking the checkbox: `margin` and `left`.

```stylus
.switch-inner
  transition margin 0.2s ease-in 0s

.switch-switch
  transition all 0.2s ease-in 0s
```

### Using styl variables
You will surely notice that, if we change the `width` of our flipswitch, the toy brokes. For example, the inner circle will stay in a totally wrong place. This is because we decided to use absolute positioning withing the switch. A partial solution to this is to use stylus variables. It turns out that if we don't hard code some width

```stylus
$switchWidth = 100px
$circleWidth = 28px
```

And replace the `right` expression in the checked state with something like
```stylus
.switch-switch
  right $switchWidth - $circleWidth - 4px
```

The switch will behave correctly for each `width`

*News:*

People from [Webucator](https://www.webucator.com/webdesign/css.cfm) found my blog post and they thought it was be a good idea to create a video from that. So, they made it, and I published it. You might be interested to their courses!

<iframe id="ytplayer" type="text/html" width="640" height="390"
  src="https://www.youtube.com/embed/AKK3wulnpNo"
  frameborder="0"/>
