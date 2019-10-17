import {X_DIFF_SETTLE_THRESHOLD} from './constants';
import {ElementRect} from './dom';

/**
 * Check whether pointer position is within draggable area
 *
 * @param x Viewport offset x
 * @param y Viewport offset y
 * @param width Viewport width
 * @param height Viewport height
 * @param pointerX Pointer x position
 * @param pointerY Pointer y position
 * @return true if pointer is inside viewport, false otherwise
 */
export function isInsideViewport({x, y, width, height}: ElementRect, [pointerX, pointerY]: [number, number]) {
  return (x <= pointerX && pointerX < x + width) && (y <= pointerY && pointerY < y + height);
}

/**
 * Return x translation value of the dragged element for the given page
 *
 * @param page Index of the page to translate
 * @param width Page width
 */
export function getPageTranslation(page: number, width: number) {
  return -page * width;
}

/**
 * Clamp x translation value
 *
 * @param x Translation value to clamp
 * @param width Page width
 * @param count Page count
 */
export function clampPageTranslation(x: number, width: number, count: number) {
  const min = getPageTranslation(count - 1, width);
  const max = 0;
  if (x < min) {
    return min;
  } else if (x > max) {
    return max;
  } else {
    return x;
  }
}

/**
 * Return new active page after drag event has finished
 *
 * @param x Final x translation value
 * @param width Page width
 * @param count Page count
 * @param direction Drag direction (-1 left, 1 right)
 */
export function getTargetPage(x: number, width: number, count: number, direction: number) {
  let position = Math.floor((Math.abs(x) / width)) + (direction < 0 ? 1 : 0);
  return position >= count ? position - 1 : position;
}

/**
 * Return page indexes that are to be rendered so that the visible one is present and also extra one on each side
 *
 * @param page Current page
 * @param count Pager count
 * @return Page indexes to be rendered
 */
export const getRenderedPages = (page: number, count: number) => {
  const pages = [page];
  if (page + 1 < count) pages.push(page + 1);
  if (page - 1 >= 0) pages.unshift(page - 1);
  return pages;
};

/**
 * Check if animated and final translation are close enough for the page to be considered settled
 *
 * @param x Animated translation value
 * @param settleX Final translation value
 */
export const isSettled = (x: number, settleX: number) => {
  return Math.abs(x - settleX) < X_DIFF_SETTLE_THRESHOLD;
};
