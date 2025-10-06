import EventEmitter from '../../lib/safe-event-emitter';
import type { MinRouteViewDriver } from '../../driver-interfaces/route-view-driver';
/**
 * {@link RouteView}s represent pages within Gmail that a user can navigate to. RouteViews can be "custom", those that the application developer registers, or they can be "builtin" which are those that the email client natively supports like "Sent", "Drafts", or "Inbox"

 * This class mostly just gives you metadata about the route, most of the functionality to modify the route are defined in subclasses like ListRouteView and CustomRouteView, which you get by handling those types specifically in the Router.
 */
declare class RouteView extends EventEmitter {
    #private;
    destroyed: boolean;
    constructor(routeViewDriver: MinRouteViewDriver);
    /**
     * @returns a string of the ID of the RouteView. This is the same routeID that you give Router.goto() or Router.createLink(). This will be a value from NativeRouteIDs.
     */
    getRouteID(): string;
    getRouteType(): string;
    getParams(): Record<string, string>;
}
export default RouteView;
//# sourceMappingURL=route-view.d.ts.map