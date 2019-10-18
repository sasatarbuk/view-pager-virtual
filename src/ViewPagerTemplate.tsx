import React, {MutableRefObject} from 'react';
import {getPagesStyle, getPageStyle, getViewportStyle} from './styles';
import {animated} from 'react-spring';
import {SpringValues} from './types';
import BaseProps from './BaseProps';
import './ViewPagerVirtual.css';
import PageMemo from './PageMemo';

interface Props extends BaseProps {

  /**
   * Ref to outermost element that receives the gestures
   */
  viewportRef: MutableRefObject<HTMLElement>;

  /**
   * Animated values
   */
  animation: SpringValues,

  /**
   * useGestures function to bind events
   */
  gestures: () => any,

  /**
   * Pages to render
   */
  pages: number[],
}

/**
 * View shared by all pager implementations - for internal purposes
 *
 * @param props Props
 * @see ViewPagerVirtual
 * @see ViewPager
 */
const ViewPagerTemplate: React.FC<Props> = ({width, height, render, viewportRef, gestures, animation, pages}) => (
  <div
    className={'view-pager-window-viewport'}
    style={getViewportStyle(width, height)}
    ref={viewportRef}
    {...gestures()}>

    <animated.div
      className={'view-pager-window-pages'}
      style={getPagesStyle(animation)}>

      {pages.map((page) => (
        <div
          className={'view-pager-window-page'}
          style={getPageStyle(width, height, page)}
          key={page}>

          <PageMemo page={page}>
            {render(page)}
          </PageMemo>

        </div>
      ))}

    </animated.div>
  </div>
);

/**
 * Memoized view shared by all pager implementations - for internal purposes
 *
 * @param props Props
 * @see ViewPagerVirtual
 * @see ViewPager
 */
export default React.memo(ViewPagerTemplate, (prevProps, nextProps) => {
  return prevProps.width === nextProps.width
    && prevProps.height === nextProps.height
    && JSON.stringify(prevProps.pages) === JSON.stringify(nextProps.pages);
});
