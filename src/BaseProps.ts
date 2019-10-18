import React, {CSSProperties} from 'react';

interface BaseProps {

  /**
   * Pager width
   */
  width: number;

  /**
   * Pager height
   */
  height: number;

  /**
   * Page count
   */
  count: number;

  /**
   * Function to render page
   *
   * @param page Index of the page to render
   */
  render: (page: number) => React.ReactNode;

  /**
   * Function to return style to inject into page element
   *
   * @param page Index of the page to inject style into
   */
  style?: (page: number) => CSSProperties;
}

export default BaseProps;
