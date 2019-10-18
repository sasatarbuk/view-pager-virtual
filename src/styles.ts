import {getPageTranslation} from './functions';
import {SpringValues} from './types';

/**
 * Create viewport (drag area) style
 *
 * @param width Viewport width
 * @param height Viewport height
 */
export const getViewportStyle = (width: number, height: number) => ({
  width: `${width}px`,
  height: `${height}px`,
});

/**
 * Create style for the container that holds rendered pages
 *
 * @param animation Spring animated values
 */
export const getPagesStyle = (animation: SpringValues) => ({
  transform: animation.x.interpolate((x: number) => `translateX(${x}px)`),
});

/**
 * Create style for the individual page
 *
 * @param width Page width
 * @param height Page height
 * @param page Page index
 */
export const getPageStyle = (width: number, height: number, page: number) => ({
  width: `${width}px`,
  height: `${height}px`,
  left: `${-getPageTranslation(page, width)}px`,
});
