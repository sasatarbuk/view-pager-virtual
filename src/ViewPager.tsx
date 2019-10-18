import React, {useRef, useState} from 'react';
import {useSpring} from 'react-spring';
import usePagerGestures from './usePagerGestures';
import BaseProps from './BaseProps';
import {getTargetPage} from './functions';
import {useGesture} from 'react-use-gesture';
import ViewPagerTemplate from './ViewPagerTemplate';

/**
 * View pager for React. Renders all pages by default. For virtualized variant see ViewPagerVirtual
 *
 * @see ViewPagerVirtual
 * @param props Props
 */
const ViewPager: React.FC<BaseProps> = ({width, height, count, render, style}) => {

  /**
   * Ref to outermost element that receives the gestures. Initialize to fresh div to avoid passing in null
   */
  const viewportRef = useRef<HTMLDivElement>(document.createElement('div'));

  /**
   * Currently selected page. Wrap in object because we want to rerender on each update
   */
  const [page, setPage] = useState({target: 0});

  /**
   * Animation state and updater
   */
  const [animation, setAnimation] = useSpring(() => ({x: 0}));

  /**
   * Execute when drag gesture is ended, detect target page and update state
   *
   * @param directionX Direction along the x axis that the drag event ended on
   */
  function onDragEnd({direction: [directionX]}: any) {
    setPage({target: getTargetPage(animation.x.getValue(), width, count, directionX)});
  }

  const {onDragStart, onDrag} = usePagerGestures(viewportRef, page.target, width, count, [animation, setAnimation]);
  const gestures = useGesture({onDragStart, onDrag, onDragEnd});
  const pages = Array(count).fill(0).map((value, index) => index);

  return (
    <ViewPagerTemplate
      width={width}
      height={height}
      count={count}
      render={render}
      style={style}
      viewportRef={viewportRef}
      animation={animation}
      gestures={gestures}
      pages={pages}
    />
  );
};

export default ViewPager;
