import React, {useRef, useState} from 'react';
import {useSpring} from 'react-spring';
import {getPageTranslation, getRenderedPages, getTargetPage, isSettled} from './functions';
import BaseProps from './BaseProps';
import AnimatedProps from './AnimatedProps';
import usePagerGestures from './usePagerGestures';
import {useGesture} from 'react-use-gesture';
import ViewPagerTemplate from './ViewPagerTemplate';

/**
 * View pager for React that supports virtualized pages similar to Android's ViewPager. Renders only visible page and
 * two extra at a time for good performance. Uses react-spring for animations
 *
 * @param props Props
 */
const ViewPagerVirtual: React.FC<BaseProps> = ({width, height, count, render}) => {

  /**
   * Ref to outermost element that receives the gestures. Initialize to fresh div to avoid passing in null
   */
  const viewportRef = useRef<HTMLDivElement>(document.createElement('div'));

  /**
   * The difference between center and target page is that center is the one that dictates which pages are rendered
   * while target is there to start the settle period after which center receives the value of target
   */
  const [page, setPage] = useState({center: 0, target: 0});

  /**
   * Animation state and updater
   */
  const [animation, setAnimation] = useSpring(() => ({x: 0, onFrame}));

  /**
   * Page state reference for access in handler methods
   */
  const pageRef = useRef(page);

  /**
   * Settle X value reference for access in handler methods. If null, target page is considered idle. Otherwise, value
   * is the final x translation for the target page
   */
  const settleXRef = useRef<number | null>(null);

  /**
   * Execute on each animation frame and check if settling page has moved close enough to it's intended position so that
   * center page value can be updated
   *
   * @param x Animated x translation value
   */
  function onFrame({x}: AnimatedProps) {
    if (pageRef.current.target !== pageRef.current.center
      && settleXRef.current !== null && isSettled(x, settleXRef.current)
    ) {
      setPage(({target}) => ({center: target, target}));
      settleXRef.current = null;
    }
  }

  /**
   * Execute when drag gesture is ended, detect target page and update state. Also advance center page if necessary -
   * if target page and center page differ before target page is updated, this means that the user switched to another
   * page before the previous one was settled. In that case, rendering needs to happen asap, hence target and center
   * receive the same value
   *
   * @param directionX Direction along the x axis that the drag event end on
   */
  function onDragEnd({direction: [directionX]}: any) {
    setPage(page => {
      const target = getTargetPage(animation.x.getValue(), width, count, directionX);
      const center = page.target === page.center ? page.center : target;
      return {center, target};
    });
  }

  //  Update instance variables on each render
  pageRef.current = page;
  settleXRef.current = getPageTranslation(page.target, width);

  const {onDragStart, onDrag} = usePagerGestures(viewportRef, page.target, width, count, [animation, setAnimation]);
  const gestures = useGesture({onDragStart, onDrag, onDragEnd});
  const pages = getRenderedPages(page.center, width);

  return (
    <ViewPagerTemplate
      width={width}
      height={height}
      count={count}
      render={render}
      viewportRef={viewportRef}
      animation={animation}
      gestures={gestures}
      pages={pages}
    />
  );
};

export default ViewPagerVirtual;
