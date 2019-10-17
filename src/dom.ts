export interface ElementRect {

  /**
   * Offset X
   */
  x: number,

  /**
   * Offset Y
   */
  y: number,

  /**
   * Element width
   */
  width: number,

  /**
   * Element height
   */
  height: number,
}

/**
 * Return offset and dimension values from html element. Exists only to be mocked
 *
 * @param element Element from which to extract values
 * @return ElementRect
 */
export function getElementRect(element: HTMLElement): ElementRect {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.clientWidth,
    height: element.clientHeight,
  };
}
