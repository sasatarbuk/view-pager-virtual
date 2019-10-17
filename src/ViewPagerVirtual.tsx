import React, {useRef, useState} from 'react';
import {useSpring} from 'react-spring';
import {getPageTranslation, getRenderedPages, getTargetPage, isSettled} from './functions';
import ViewPager from './ViewPager';
import BaseProps from './BaseProps';
import AnimatedProps from './AnimatedProps';
import './ViewPagerVirtual.css';

/**
 * View pager for React that supports virtualized pages similar to Android's ViewPager. Renders only visible page and
 * two extra at a time for good performance. Uses react-spring for animations
 *
 * @param props Props
 */
const ViewPagerVirtual: React.FC<BaseProps> = ({width, height, count, render}) => {

  /**
   * Animation state and updater
   */
  const [spring, setSpring] = useSpring(() => ({x: 0, onFrame}));

  /**
   * The difference between center and target page is that center is the one that dictates which pages are rendered
   * while target is there to start the settle period after which center receives the value of target
   */
  const [page, setPage] = useState({center: 0, target: 0});

  /**
   * Page state/updater reference for access in handler methods
   */
  const pageRef = useRef(page);

  /**
   * Settle X value reference for access in handler methods. If null, target page is considered idle. Otherwise, value
   * is the final x translation for the target page
   */
  const settleXRef = useRef<number | null>(null);

  //  Update instance variables on each state render
  pageRef.current = page;
  settleXRef.current = getPageTranslation(page.target, width);

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
      const target = getTargetPage(spring.x.getValue(), width, count, directionX);
      const center = page.target === page.center ? page.center : target;
      return {center, target};
    });
  }

  return (
    <ViewPager
      width={width}
      height={height}
      count={count}
      render={render}
      targetPage={page.target}
      renderedPages={getRenderedPages(page.center, width)}
      springState={[spring, setSpring]}
      onDragEnd={onDragEnd}
    />
  );
};

export default ViewPagerVirtual;
