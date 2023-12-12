export type Permission = {
    parentCapability: string;
    invoker: string;
    date?: number;
    caveats?: PermissionCaveat[];
};
export type PermissionRequest = {
    [method: string]: Record<string, unknown>;
};
export type PermissionCaveat = {
    type: string;
    value?: unknown;
    name?: string;
};
export declare const PERMISSIONS_REQUEST_REJECTED = 4001;
export declare class PermissionsError extends Error {
    code: number;
    data?: unknown;
    constructor(message: string, code: number, data?: unknown);
}
//# sourceMappingURL=permissions.d.ts.map