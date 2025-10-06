import RouteView from './route-view';
import type { RouteViewDriver } from '../../driver-interfaces/route-view-driver';
declare class CustomRouteView extends RouteView {
    constructor(routeViewDriver: RouteViewDriver);
    setFullWidth(fullWidth: boolean): void;
    getElement(): HTMLElement;
}
export default CustomRouteView;
//# sourceMappingURL=custom-route-view.d.ts.map