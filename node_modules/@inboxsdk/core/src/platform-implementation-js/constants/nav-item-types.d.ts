/**
 * The different nav item types that exist
 */
declare const navItemTypes: Readonly<{
    /**
     * standard nav item for navigating
     */
    readonly NAVIGATION: "NAVIGATION";
    /**
     * nav item that looks like a link
     */
    readonly LINK: "LINK";
    /**
     * nav item for logical grouping. In Gmailv2, the entire nav item can be clicked to expand/collapse its children
     * and it ignores all NavItemDescriptor options other than `name` and `subtitle`.
     * Behaves identically to NAVIGATION when in Gmailv1.
     */
    readonly GROUPER: "GROUPER";
    /** Old alias for LINK */
    readonly MANAGE: "MANAGE";
    readonly SECTION: "SECTION";
}>;
export default navItemTypes;
//# sourceMappingURL=nav-item-types.d.ts.map