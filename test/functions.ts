import {
  clampPageTranslation,
  getPageTranslation,
  getRenderedPages,
  getTargetPage,
  isInsideViewport, isSettled,
} from '../src/functions';

test('isInsideViewport', () => {
  expect(isInsideViewport({x: 50, y: 50, width: 100, height: 100}, [90, 90])).toBeTruthy();
  expect(isInsideViewport({x: 50, y: 50, width: 100, height: 100}, [40, 40])).toBeFalsy();
});

test('getPageTranslation', () => {
  expect(getPageTranslation(2, 100)).toBe(-200);
});

test('clampPageTranslation', () => {
  expect(clampPageTranslation(-201, 100, 3)).toBe(-200);
  expect(clampPageTranslation(-50, 100, 3)).toBe(-50);
  expect(clampPageTranslation(1, 100, 3)).toBe(0);
});

test('getTargetPage', () => {
  expect(getTargetPage(-250, 100, 5, -1)).toBe(3);
  expect(getTargetPage(-250, 100, 5, 1)).toBe(2);
  expect(getTargetPage(-600, 100, 5, 1)).toBe(5);
});

test('getRenderedPages', () => {
  expect(getRenderedPages(0, 5)).toStrictEqual([0, 1]);
  expect(getRenderedPages(2, 5)).toStrictEqual([1, 2, 3]);
  expect(getRenderedPages(4, 5)).toStrictEqual([3, 4]);
});

test('isSettled', () => {
  expect(isSettled(-100.5, -100)).toBeTruthy();
  expect(isSettled(-101.1, -100)).toBeFalsy();
});
