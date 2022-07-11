export interface Permission {
    parentCapability: string;
    invoker: string;
    date?: number;
    PermissionCaveats?: PermissionCaveat[];
}
export interface PermissionRequest {
    [methodName: string]: {
        PermissionCaveats?: PermissionCaveat[];
    };
}
export interface PermissionCaveat {
    type: string;
    value?: any;
    name?: string;
}
export declare const PERMISSIONS_REQUEST_REJECTED = 4001;
export declare class PermissionsError extends Error {
    code: number;
    data?: unknown;
    constructor(message: string, code: number, data?: unknown);
    isPermissionsRequestRejected(): boolean;
}
