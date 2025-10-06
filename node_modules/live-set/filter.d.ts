import LiveSet from '.';

declare function filter<T>(liveSet: LiveSet<T>, cb: typeof Boolean): LiveSet<NonNullable<T>>;
declare function filter<T>(liveSet: LiveSet<T>, cb: (value: T) => any): LiveSet<T>;

export default filter;
