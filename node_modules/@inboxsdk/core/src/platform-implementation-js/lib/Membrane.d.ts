interface SomeClass {
    new (...args: any[]): any;
}
export type MapperFn<T> = (t: T) => object;
export type Mapper<T extends SomeClass> = [T, MapperFn<InstanceType<T>>];
export default class Membrane {
    private _mappers;
    private _map;
    constructor(mappers: Array<Mapper<any>>);
    get(wet: any): any;
}
export {};
//# sourceMappingURL=Membrane.d.ts.map