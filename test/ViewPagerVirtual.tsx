import React from 'react';
import {act, cleanup, render, RenderResult} from '@testing-library/react';
import {GestureHandlers} from 'react-use-gesture/dist/types';
import ViewPagerVirtual from '../src/ViewPagerVirtual';
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
      <ViewPagerVirtual
        width={400}
        height={400}
        count={5}
        render={page => <>{`Page ${page}`}</>}
      />
    );
    pages = (rendered.container.firstElementChild as HTMLElement).firstElementChild as HTMLElement;
  });

  afterEach(cleanup);

  it('renders select pages', () => {
    expect(rendered.queryAllByText('Page', {exact: false})).toHaveLength(2);
  });

  it('renders next page when dragged left', async () => {
    handlers.onDragStart(gesture({}));
    handlers.onDrag(gesture({movement: [-200, 0], xy: [100, 200]}));
    act(() => handlers.onDragEnd(gesture({direction: [-1, 0]})));
    await act(() => sleep(1500));
    expect(rendered.queryAllByText('Page', {exact: false})).toHaveLength(3);
  });

  it('renders next page eagerly when fast dragging', async () => {
    for (const i of [0,0]) {
      handlers.onDragStart(gesture({}));
      handlers.onDrag(gesture({movement: [-200, 0], xy: [100, 200]}));
      await sleep(500);
      act(() => handlers.onDragEnd(gesture({direction: [-1, 0]})));
      await sleep(500);
    }
    expect(rendered.queryAllByText('Page 3')).toHaveLength(1);
  });

});
