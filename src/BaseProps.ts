import React from 'react';

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
}

export default BaseProps;
