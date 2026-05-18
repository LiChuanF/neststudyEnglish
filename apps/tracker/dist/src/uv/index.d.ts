import { TrackerConfig } from '@en/common/tracker';
export declare const getBrowserInfo: () => {
    browser: string | undefined;
    os: string | undefined;
    device: "console" | "desktop" | "embedded" | "mobile" | "smarttv" | "tablet" | "wearable" | "xr";
};
export declare const getFingerprint: (config: TrackerConfig) => Promise<any>;
//# sourceMappingURL=index.d.ts.map