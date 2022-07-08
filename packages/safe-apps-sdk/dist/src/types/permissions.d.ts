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
