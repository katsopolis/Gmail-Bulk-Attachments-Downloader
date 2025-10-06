export declare class WaitForError extends Error {
    name: string;
    constructor();
}
/**
 * @param condition a function that returns the value to wait for, or falsey if it's not ready yet
 * @throws {WaitForError} if the condition is not met within the timeout
 */
export default function waitFor<T>(condition: () => T | null | undefined, timeout?: number, steptime?: number): Promise<NonNullable<T>>;
//# sourceMappingURL=wait-for.d.ts.map