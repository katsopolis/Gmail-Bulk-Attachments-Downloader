/// <reference types="node" />
import EventEmitter from 'events';
export default class SafeEventEmitter extends EventEmitter {
    emit(_event: string, ..._args: Array<any>): boolean;
}
//# sourceMappingURL=safe-event-emitter.d.ts.map