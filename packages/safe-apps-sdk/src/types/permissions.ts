export type Permission = {
  parentCapability: string;
  invoker: string;
  date?: number;
  // Part of the EIP-2255 spec. Added for future use.
  // Useful for representing specific restrictions applied to the permitted method
  // Will require a concrete implementation when used
  // See: https://eips.ethereum.org/EIPS/eip-2255
  PermissionCaveats?: PermissionCaveat[];
};

export type PermissionRequest = {
  [method: string]: {
    PermissionCaveats?: PermissionCaveat[];
  };
};

export type PermissionCaveat = {
  type: string;
  value?: any;
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
