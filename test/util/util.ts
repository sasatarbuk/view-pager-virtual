import {FullGestureState, Coordinates, Vector2, UseGestureEvent} from 'react-use-gesture/dist/types';

export function gesture(values: object): FullGestureState<Coordinates> {
  return {
    hovering: false,
    scrolling: false,
    wheeling: false,
    dragging: false,
    moving: false,
    pinching: false,
    touches: 0,
    down: false,
    buttons: 1,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    ctrlKey: false,
    xy: [0, 0],
    velocity: 0,
    vxvy: [0, 0],
    distance: 0,
    values: [0, 0],
    delta: [0, 0],
    movement: [0, 0],
    offset: [0, 0],
    initial: [0, 0],
    previous: [0, 0],
    direction: [0, 0],
    first: false,
    last: false,
    active: false,
    canceled: false,
    ...values,
  };
}

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(() => resolve(), ms))
}
