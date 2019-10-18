# view-pager-virtual

<a href="https://travis-ci.org/sasatarbuk/view-pager-virtual">
  <img src="https://api.travis-ci.org/sasatarbuk/view-pager-virtual.svg?branch=master"/>
</a>

View pager for React that supports virtualized pages. Renders only visible page and up to two offscreen pages, similar
to Android ViewPager. New pages will not be rendered until the animation is complete, unless swiping is fast.

Uses <a href="https://github.com/react-spring/react-spring">`react-spring`</a> animation framework for good performance.

## Usage

#### Virtualized

Pages are rendered on demand so you need to specify `count` and expose page content through `render` prop. You also need to specify `width` and `height` in pixels. Auto sizing will be added in a future
release.

```jsx
import React, {Fragment} from 'react';
import {ViewPagerVirtual} from 'view-pager-virtual';

const Component = () => (
  <ViewPagerVirtual
    width={400}
    height={400}
    count={1000}
    render={page => <Fragment>{page}</Fragment>}
  />
);
```

#### Non-virtualized

A non-virtualized version variant of the component is also available. It supports the same API as the former, simply
import `ViewPager`. This is convenient for a smaller number of pages where rendering is not expensive but offscreen
preloading might be beneficial (e.g. images only).

#### Styling

To avoid issues, node returned by `render` is not treated as the page element itself but page content. The actual page
element is a `div` that can be styled through the `view-pager-window-page` class. It is also possible to inject style
properties into the page element with render prop `style`.

```css
/* style.css */
.view-pager-window-page {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Monospace, sans-serif;
  color: #fff;
}
```

```jsx
import React, {Fragment} from 'react';
import {ViewPagerVirtual} from 'view-pager-virtual';
import './style.css';

const colors = ['#845EC2','#D65DB1','#FF6F91','#FF9671','#FFC75F','#F9F871'];
const Component = () => (
  <ViewPagerVirtual
    width={400}
    height={400}
    count={1000}
    render={page => <Fragment>{page}</Fragment>}
    style={page => ({backgroundColor: colors[page % colors.length]})}
  />
);
```
