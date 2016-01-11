# react-rwd

Small library for Responsive Web Design using React.

### Why make another RWD library?

RWD today is almost exclusively made using
[css media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). This approach implies that
the content on the page does not change, only the UI does.
But in reality, there are a lot of cases where this is not true. Some popular examples:

* Video background on desktop pages, no videos on moxbile
* Specialized menus for mobile
* Apps with tailored features for mobile

etc.

You could do all of this using media queries and setting
``display: none`` on elements that you want to hide, but
the obvious disadvantage is that the whole HTML needs to
be loaded into the DOM.

You could also have a mixed solution: using CSS for RWD UI
and using JS to add elements at certain breakpoints, but
you would need to synchronize the breakpoints between CSS
and JS. With ``react-rwd`` you can set your breakpoints
as variables *once*, and use them everywhere in your app.

``react-rwd`` allows for setting breakpoints not only
relative to window size, but also the parent element size (check usage for more info).

### Usage

The simplest example would be

```javascript
import React, { Component } from 'react';

import { RWD } from 'react-rwd';


export default class App extends Component {
  render() {
    return (
      <div>
        <RWD window>
          <div rwd={ { max: 600 } }>small</div>
          <div rwd={ { max: 1024 } }>tablet</div>
          <div rwd={ { max: 1280 } }>small desktop</div>
          <div>Defalt</div>
        </RWD>
      </div>
    );
  }
}
```

Usage is simple: you use the ``RWD`` component to state that only one of the children components will be rendered.
Notice the ``window`` prop - it states that we will measure
against the window size, not parent element size, which is
the default.
But which component will be rendered? In ``react-rwd`` the order of elements is important - the first one that matches the constraints
will be used and the other will be ignored. So in the
example above, the default will be only displayed if none
of the constrained components will match (so only if the window width is higher than 1280px).

Another, more complicated example:

```javascript
import React, { Component } from 'react';

import { RWD } from 'react-rwd';


export default class App extends Component {
  render() {
    return (
      <div style={ { width: '50%' } }>
        <RWD>
          <div rwd={ function(dim) { return dim.h < 300; } }>
            Not high enough!
          </div>
          <div rwd={ { min: 320, max: 600 } }>small</div>
          <div rwd={ { max: 1024 } }>tablet</div>
          <div rwd={ { max: 1280 } }>small desktop</div>
          <div>Defalt</div>
        </RWD>
      </div>
    );
  }
}
```

Here we see, that the ``rwd`` prop can be an object
or a function. In this example everytime when the parent
component height is less than 300px (notice that there is
no ``window`` prop on the ``RWD`` component this time)
the "Not high enough!" component will render. The style
of the parent ``div`` is deliberately set as 50% to
see when executed, that we are matching against the parent
component width and height and not the window size.
One more note: the rwd function obviously does not have to
depend on size - every function that returns ``true`` or ``false``, so it would be completely legal to have something like this:

```javascript
...
<div rwd={ isIE9 }>Sorry, old browsers do not pass!</div>
...
```

if we would have an isIE9() function that detects if
the browser we are using is IE9. You can use any component,
not only divs for rwd cases, so what if one of your
own components has already an rwd prop, and you want to
use it anyways? You can use a special ``Case`` component,
which only does one thing - renders its children.

```javascript
import { RWD, Case } from 'react-rwd';

...
<RWD>
  <Msg rwd={ isIE9 }>Sorry, old browsers do not pass!</Msg>
  <Case rwd={ { max: 800 } }>
    <MyAwesomeComponentThatAlreadyUsesRWDProp rwd="..." />
  </Case>
  <div>Default</div>
</RWD>
...
```

### Thanks

Repo initiated from https://github.com/krasimir/webpack-library-starter


### License

MIT
