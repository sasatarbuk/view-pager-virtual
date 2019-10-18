import {AnimatedValue, ForwardedProps, SetUpdateFn} from 'react-spring';
import AnimatedProps from './AnimatedProps';
import {CSSProperties} from 'react';

type OverwriteKeys<A, B> = {[K in keyof A]: K extends keyof B ? B[K] : A[K]};
export type SpringValues = AnimatedValue<ForwardedProps<OverwriteKeys<AnimatedProps, CSSProperties>>>;
export type SpringUpdater = SetUpdateFn<OverwriteKeys<AnimatedProps, CSSProperties>>;
export type Spring = [SpringValues, SpringUpdater];
