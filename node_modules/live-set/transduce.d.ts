import LiveSet from '.';
import {Transducer} from 'transducers.js';

export default function transduce<T,U>(liveSet: LiveSet<T>, transducer: Transducer<T,U>): LiveSet<U>;
