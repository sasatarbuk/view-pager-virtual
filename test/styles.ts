import {getPagesStyle, getPageStyle, getViewportStyle} from '../src/styles';

test('getViewportStyle', () => {
  const actual = getViewportStyle(400, 400);
  const expected = {width: '400px', height: '400px'};
  expect(actual).toStrictEqual(expected);
});

test('getPagesStyle', () => {
  const spring = {x: {interpolate: (fn: (x: number) => any) => (fn(50))}};
  const actual = getPagesStyle(spring);
  const expected = {transform: 'translateX(50px)'};
  expect(actual).toStrictEqual(expected);
});

test('getPageStyle', () => {
  const actual = getPageStyle(400, 400, 3);
  const expected = {width: '400px', height: '400px', left: '1200px'};
  expect(actual).toStrictEqual(expected);
});
