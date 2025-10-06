import LiveSet from '.';

export default function mapWithRemoval<T,U>(input: LiveSet<T>, cb: (value: T, removal: Promise<void>) => U): LiveSet<U>;
