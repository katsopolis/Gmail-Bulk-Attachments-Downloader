export type URLObject = {
    name: string;
    params: string[];
    query: string | null | undefined;
    hash: string;
};
export default function getURLObject(url: string): URLObject;
//# sourceMappingURL=get-url-object.d.ts.map