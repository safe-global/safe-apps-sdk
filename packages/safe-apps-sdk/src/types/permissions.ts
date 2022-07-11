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

export const PERMISSIONS_REQUEST_REJECTED = 4001;

export class PermissionsError extends Error {
  public code: number;
  public data?: unknown;

  constructor(message: string, code: number, data?: unknown) {
    super(message);

    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, PermissionsError.prototype);
  }

  isPermissionsRequestRejected() {
    return this.code === PERMISSIONS_REQUEST_REJECTED;
  }
}
