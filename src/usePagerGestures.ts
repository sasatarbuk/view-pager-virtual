import {MutableRefObject, useRef} from 'react';
import {getElementRect} from './dom';
import {clampPageTranslation, getPageTranslation, isInsideViewport} from './functions';
import {Spring} from './types';

/**
 * Custom hook for functionality shared by all pager implementations
 *
 * @param viewportRef Ref to outermost element that receives the gestures
 * @param targetPage Page to translate to
 * @param width Pager width
 * @param count Page count
 * @param spring Animation state and updater
 * @see ViewPagerVirtual
 * @see ViewPager
 */
const usePagerGestures = (
  viewportRef: MutableRefObject<HTMLDivElement>,
  targetPage: number,
  width: number,
  count: number,
  spring: Spring,
) => {

  /**
   * Animation state and updater
   */
  const [animation, setAnimation] = spring;

  /**
   * Previous x movement ref
   */
  const initXRef = useRef(0);

  /**
   * Execute when drag gesture is started and remember previous X movement
   */
  function onDragStart() {
    initXRef.current = animation.x.getValue();
  }

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
      setAnimation({x: clampPageTranslation(x, width, count)});
    } else {
      cancel && cancel();
    }
  }

  // Animation is set from here because width can change the animated value
  setAnimation({x: getPageTranslation(targetPage, width)});

  return {onDragStart, onDrag};
};

export default usePagerGestures;
