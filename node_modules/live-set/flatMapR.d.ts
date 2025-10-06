import LiveSet from '.';

export default function flatMapR<T,U>(liveSet: LiveSet<T>, cb: (value: T) => LiveSet<U>): LiveSet<U>;
