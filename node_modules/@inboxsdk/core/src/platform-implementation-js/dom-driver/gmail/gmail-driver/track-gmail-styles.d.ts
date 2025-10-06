/**
 * @returns true if Gmail is in dark theme mode, false if not, or null if it can't be determined
 */
export declare function checkForDarkThemeSafe(): Promise<boolean | null>;
export declare const stylesStream: import("kefir-bus").Bus<{
    type: 'theme';
    isDarkMode: {
        frame: boolean;
        body: boolean;
    };
}, unknown>;
export default function trackGmailStyles(): Promise<void>;
//# sourceMappingURL=track-gmail-styles.d.ts.map