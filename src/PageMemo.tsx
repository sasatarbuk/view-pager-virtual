import React from 'react';

interface Props {

  /**
   * Page to render
   */
  page: number;

  /**
   * Page content
   */
  children: React.ReactNode;
}

/**
 * Memoized page component - renders page content only when page prop changes
 *
 * @param props Props
 * @constructor
 */
export default React.memo(({children}) => (<>{children}</>), (prevProps: Props, nextProps: Props) => {
  return prevProps.page === nextProps.page;
});
