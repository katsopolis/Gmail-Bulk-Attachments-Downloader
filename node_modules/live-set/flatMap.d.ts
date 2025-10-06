import LiveSet from '.';

export default function flatMap<T,U>(liveSet: LiveSet<T>, cb: (value: T) => LiveSet<U>): LiveSet<U>;
