/**
 * Pass a name and you'll get a unique identifier associated with that name.
 * The returned identifier will only contain alphabetic characters.
 *
 * @deprecated a holdover from the old idMap runtime implementation. Use `idMap` instead unless you specifically need the same classname as old versions of the InboxSDK used.
 */
export declare function legacyIdMap(name: string): string;
export default function idMap(id: string): string;
//# sourceMappingURL=idMap.d.ts.map