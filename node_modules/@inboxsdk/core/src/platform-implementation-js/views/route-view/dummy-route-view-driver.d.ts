import * as Kefir from 'kefir';
import type { MinRouteViewDriver } from '../../driver-interfaces/route-view-driver';
declare class DummyRouteViewDriver implements MinRouteViewDriver {
    #private;
    getRouteType(): string;
    getRouteID(): string;
    getParams(): {};
    getEventStream(): import("kefir-bus").Bus<Record<string, any>, unknown>;
    getStopper(): Kefir.Observable<any, unknown>;
    destroy(): void;
}
export default DummyRouteViewDriver;
//# sourceMappingURL=dummy-route-view-driver.d.ts.map