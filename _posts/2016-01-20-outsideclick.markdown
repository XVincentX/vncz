---
layout: post
title: Solving the outside click problem
date: 2016-01-20 20:51:06.000000000 +02:00
---

Today I would like to talk (and, hopefully, help you to solve) one of the problem that every frontend developer will (perhaps) deal with: **closing on outside click**

Let's say you have a drop down menu which will show its internal items when you click on it, and it has to be opened until an outside click has been detected. For a sample of this, check out [https://www.apiary.io](https://www.apiary.io) application header:

![applicationHeader](/images/applicationHeaderApiary.webp)

As you can see from the gif, the dropdown menu stays in opened position until the users clicks on something else outside from the dropdown. How do we reach this result?

There are basically two ways to make this happen: the *easy* way and the *good* way. I'll show you both.

## Easy way
The easy way consists, basically, to attach a global event handler to the document object, and check everytime if the click has been done on the target element. If not, we can close the dropdown. This approach is used by a lot of libraries such as [react-onclickoutside](https://github.com/Pomax/react-onclickoutside).

Basically the code would be something like

```javascript
class Component extends React.Component {
  componentDidMount: function () {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount: function () {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  handleClick: function (e) {
    e.preventPropagation();
  }

  handleBodyClick: function () {
    // do something
  }
}
```

This code is a bit react based but it does not make any difference, the concept itself should be clear.

Then, in our `handleBodyClick` function, we would have to check if the clicked element isn't our dropdown and, in that case, close it.


I see some pitfalls here:

1. Global event handlers. As you start placing more and more components behaving in this way, you will have a lot of handler called per each single click on the page.

2. The need to stop event propagation on "self clicks".

## Good way

Another interesting way that we could use is called the **invisible overlay**.
When clicking on the dropdown, once opened, we display an invisible overlay which will cover all the screen. When any point of that overlay is clicked, it means we're not on the dropdown level and we can safely close it.

I uploaded an [example on codepen](http://codepen.io/XVincentX/pen/Rrjrqj/). Let's see the main points together.

```html
<div class="dropdown">
  <div class="overlay"></div>
  <div>
      <ul>
        <li>
          <a href="#">Api List</a>
          <ul>
            <li><a href="#">Stripe</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">BeStunning</a></li>
          </ul>
        </li>
      </ul>
  </div>
</div>
```

Each dropdown has an internal overlay empty element which will be used to cover all our screen

```css
.apiList .overlay {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
```

Nothing really fancy is happening here, it's just a giant-all-screen rectangle which, using the local stacking context, is placed under the dropdown itself. In this way, dropdown clicks will be forwarded to dropdown, everything else to the overlay, which will close the dropdown itself.

Notice that, given the local stacking context, the overlay will be under everything else, meaning that clicks on other things won't make the dropdown it self close (which is the desidered behaviour.)
