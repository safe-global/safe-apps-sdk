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
}
