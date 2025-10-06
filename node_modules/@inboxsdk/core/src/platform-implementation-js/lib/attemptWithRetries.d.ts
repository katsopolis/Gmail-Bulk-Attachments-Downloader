export default function attemptWithRetries<T>(fn: () => Promise<T>, attemptCount: number, errorsToRetry?: (error: unknown) => boolean): Promise<T>;
//# sourceMappingURL=attemptWithRetries.d.ts.map