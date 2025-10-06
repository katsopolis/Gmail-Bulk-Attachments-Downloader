import LiveSet from '.';

export default function map<T,U>(liveSet: LiveSet<T>, cb: (value: T) => U): LiveSet<U>;
