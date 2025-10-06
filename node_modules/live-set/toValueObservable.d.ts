import LiveSet from '.';
import * as Observable from 'zen-observable';

export type ValueWithRemoval<T> = {
  value: T;
  removal: Promise<void>;
};

export default function toValueObservable<T>(liveSet: LiveSet<T>): Observable<ValueWithRemoval<T>>;
