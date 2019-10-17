import React, {CSSProperties, useRef, useState} from 'react';
import {animated, AnimatedValue, ForwardedProps, SetUpdateFn, useSpring} from 'react-spring';
import {useGesture} from 'react-use-gesture';
import {clampPageTranslation, getPageTranslation, getTargetPage, isInsideViewport} from './functions';
import {getPagesStyle, getPageStyle, getViewportStyle} from './styles';
import BaseProps from './BaseProps';
import {Coordinates, Handler} from 'react-use-gesture/dist/types';
import AnimatedProps from './AnimatedProps';
import './ViewPagerVirtual.css';
import {getElementRect} from './dom';

/**
 * From react-spring/web.d.ts
 */
type OverwriteKeys<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
};

/**
 * Own props
 */
interface Props extends BaseProps {

  /**
   * Target page to translate to after render. If omitted, internally tracked target page will be translated to
   */
  targetPage?: number;

  /**
   * Indexes of the pages to render. If omitted, all pages are rendered
   */
  renderedPages?: number[];

  /**
   * Spring animation state/updater to replace default
   */
  springState?: [
    AnimatedValue<ForwardedProps<OverwriteKeys<AnimatedProps, CSSProperties>>>,
    SetUpdateFn<OverwriteKeys<AnimatedProps, CSSProperties>>
  ];

  /**
   * Handler function to run when dragging is ended to replace default
   */
  onDragEnd?: Handler<Coordinates> & ((event: React.DragEvent<Element>) => void);
}

/**
 * View pager for React. Renders all pages by default or specific ones. For virtualized variant see ViewPagerVirtual
 *
 * @see ViewPagerVirtual
 * @param props Props
 */
const ViewPager: React.FC<Props> = (
  {width, height, count, render, targetPage, renderedPages, springState, onDragEnd}
) => {

  /**
   * Animation state and updater
   */
  const [spring, setSpring] = springState || useSpring(() => ({x: 0}));

  /**
   * Target page state and updater. Wrapped because we want to update state on each setPage call
   */
  const [page, setPage] = useState({target: 0});

  /**
   * Outermost element ref. Initialize to fresh div to avoid passing in null
   */
  const viewportRef = useRef<HTMLDivElement>(document.createElement('div'));

  /**
   * Previous x movement ref
   */
  const initXRef = useRef(0);

  // Animation is triggered from here because width can change the animated value as well as a call from onDragEnd
  setSpring({x: getPageTranslation(targetPage || page.target, width)});

  /**
   * Execute on each movement and translate pages, making sure that dragging is performed inside the viewport and that
   * the viewport doesn't show any empty space
   *
   * @param movementX Movement in pixels since dragging started
   * @param xy Pointer position in the form of array - [x,y]
   * @param cancel Function to cancel event
   */
  function onDrag({movement: [movementX], xy, cancel}: any) {
    if (isInsideViewport(getElementRect(viewportRef.current), xy)) {
      const x = initXRef.current + movementX;
      setSpring({x: clampPageTranslation(x, width, count)});
    } else {
      cancel && cancel();
    }
  }

  /**
   * Execute when drag gesture is started and remember previous X movement
   */
  function onDragStart() {
    initXRef.current = spring.x.getValue();
  }

  /**
   * Execute when drag gesture is ended, detect target page and update state
   *
   * @param directionX Direction along the x axis that the drag event end on
   */
  function onDragEndDefault({direction: [directionX]}: any) {
    setPage({target: getTargetPage(spring.x.getValue(), width, count, directionX)});
  }

  const pages = renderedPages || Array(count).fill(0).map((value, index) => index);
  const gestures = useGesture({
    onDrag,
    onDragStart,
    onDragEnd: onDragEnd || onDragEndDefault,
  });

  return (
    <div
      className={'view-pager-window-viewport'}
      style={getViewportStyle(width, height)}
      ref={viewportRef}
      {...gestures()}>

      <animated.div
        className={'view-pager-window-pages'}
        style={getPagesStyle(spring)}>

        {pages.map((page) => (
          <div
            className={'view-pager-window-page'}
            style={getPageStyle(width, height, page)}
            key={page}>
            {render(page)}
          </div>
        ))}

      </animated.div>
    </div>
  );
};

export default ViewPager;
