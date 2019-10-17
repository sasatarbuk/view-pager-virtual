import React from 'react';
import {act, cleanup, render, RenderResult} from '@testing-library/react';
import {GestureHandlers} from 'react-use-gesture/dist/types';
import ViewPager from '../src/ViewPager';
import {gesture, sleep} from './util/util';

let handlers: GestureHandlers;

jest.mock('react-use-gesture', () => ({
  useGesture: (gestureHandlers: GestureHandlers) => {
    handlers = gestureHandlers;
    return () => {};
  },
}));

jest.mock('../src/dom', () => ({
  getElementRect: () => ({x: 0, y: 0, width: 400, height: 400}),
}));

describe('ViewPager', () => {
  let rendered: RenderResult;
  let pages: HTMLElement;

  beforeEach(() => {
    rendered = render(
      <ViewPager
        width={400}
        height={400}
        count={5}
        render={page => <>{`Page ${page}`}</>}
      />
    );
    pages = rendered.getByTestId('view-pager-window-pages');
  });

  afterEach(cleanup);

  it('renders all pages', () => {
    expect(rendered.queryAllByText('Page', {exact: false})).toHaveLength(5);
  });

  it('switches to next page when dragged left', async () => {
    handlers.onDragStart(gesture({}));
    handlers.onDrag(gesture({movement: [-50, 0], xy: [150, 200]}));
    act(() => handlers.onDragEnd(gesture({direction: [-1, 0]})));
    await sleep(1500);
    expect(pages.style.transform).toBe('translateX(-400px)');
  });

  it('switches back to same page when dragged left then right', async () => {
    handlers.onDragStart(gesture({}));
    handlers.onDrag(gesture({movement: [-50, 0], xy: [150, 200]}));
    handlers.onDrag(gesture({movement: [20, 0], xy: [170, 200]}));
    act(() => handlers.onDragEnd(gesture({direction: [1, 0]})));
    await sleep(1500);
    expect(pages.style.transform).toBe('translateX(0px)');
  });

  it('cancels event when dragged outside viewport', async () => {
    const cancel = () => act(() => handlers.onDragEnd(gesture({direction: [-1, 0]})));
    handlers.onDragStart(gesture({}));
    handlers.onDrag(gesture({movement: [-100, 0], xy: [100, 200]}));
    handlers.onDrag(gesture({movement: [-101, 0], xy: [-1, 200], cancel}));
    await sleep(1500);
    expect(pages.style.transform).toBe('translateX(-400px)');
  });

});
