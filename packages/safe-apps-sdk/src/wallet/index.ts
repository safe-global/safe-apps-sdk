import { Methods } from '../communication/methods';
import { Communicator } from '../types';
import { PermissionRequest, Permission, PermissionsError, PERMISSIONS_REQUEST_REJECTED } from '../types/permissions';

const RESTRICTED_METHODS = ['getAddressBook'];

class Wallet {
  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
  }

  async getPermissions(): Promise<Permission[]> {
    const response = await this.communicator.send<Methods.wallet_getPermissions, undefined, Permission[]>(
      Methods.wallet_getPermissions,
      undefined,
    );

    return response.data;
  }

  async requestPermissions(permissions: PermissionRequest[]): Promise<Permission[]> {
    if (!this.isPermissionRequestValid(permissions)) {
      throw new PermissionsError('Permissions request is invalid', PERMISSIONS_REQUEST_REJECTED);
    }

    try {
      const response = await this.communicator.send<
        Methods.wallet_requestPermissions,
        PermissionRequest[],
        Permission[]
      >(Methods.wallet_requestPermissions, permissions);

      return response.data;
    } catch {
      throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
    }
  }

  findPermission(permissions: Permission[], permission: string): Permission | undefined {
    return permissions.find((p) => p.parentCapability === permission);
  }

  async hasPermission(permission: string): Promise<boolean> {
    const permissions = await this.getPermissions();

    return !!this.findPermission(permissions, permission);
  }

  isPermissionRequestValid(permissions: PermissionRequest[]): boolean {
    return permissions.every((pr: PermissionRequest) => {
      if (typeof pr === 'object') {
        return Object.keys(pr).every((method: string) => {
          if (RESTRICTED_METHODS.includes(method)) {
            return true;
          }

          return false;
        });
      }

      return false;
    });
  }
}

export { Wallet };
