import React from 'react';
import {cleanup, render} from '@testing-library/react';
import PageMemo from '../src/PageMemo';

describe('PageMemo', () => {

  const mock = jest.fn();
  const Component = () => {
    mock();
    return <></>;
  };

  afterEach(() => cleanup);

  it('renders once per page', () => {

    const rendered = render(
      <PageMemo page={0}>
        <Component/>
      </PageMemo>
    );

    rendered.rerender(
      <PageMemo page={0}>
        <Component/>
      </PageMemo>
    );

    expect(mock).toBeCalledTimes(1);

  });
});
