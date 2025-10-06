interface ErrorLog {
    name: string;
    message: string;
}
export default class ErrorCollector {
    private _name;
    private _runCount;
    private _errorLogs;
    private _hasReported;
    constructor(name: string);
    run<T>(name: string, cb: () => T): T | null;
    report(errorDataCb: () => any): void;
    getErrorLogs(): ReadonlyArray<ErrorLog>;
    runCount(): number;
    errorCount(): number;
}
export {};
//# sourceMappingURL=ErrorCollector.d.ts.map