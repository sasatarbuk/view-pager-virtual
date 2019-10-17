# view-pager-virtual

<a href="https://travis-ci.org/sasatarbuk/view-pager-virtual">
  <img src="https://api.travis-ci.org/sasatarbuk/view-pager-virtual.svg?branch=master"/>
</a>

View pager for React that supports virtualized pages. Renders only visible page and up to two offscreen pages, similar
to Android ViewPager. New pages will not be rendered until the animation is complete, unless swiping is fast.

Uses <a href="https://github.com/react-spring/react-spring">`react-spring`</a> animation framework for good performance.

## Usage

#### Virtualized

Pages are rendered on demand so you need to specify `count` and expose page content through `render` prop. Usage of
`React.PureComponent` or `React.memo` on the page component is recommended because `render` will be called for the same
page multiple times. You also need to specify `width` and `height` in pixels. Auto sizing will be added in a future
release.

```jsx
import React from 'react';
import {ViewPagerVirtual} from 'view-pager-virtual';

const Page = React.memo(({page}) => (<>{page}</>));
const Component = () => (
  <ViewPagerVirtual
    width={400}
    height={400}
    count={20}
    render={page => <Page page={page}/>}
  />
);
``` 

#### Non-virtualized

A non-virtualized version variant of the component is also available. It supports the same API as the former, simply
import `ViewPager`. This is convenient for a smaller number of pages where rendering is not expensive but offscreen
preloading might be beneficial (e.g. images only).
