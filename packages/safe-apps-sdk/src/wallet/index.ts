import { Methods } from '../communication/methods';
import { Communicator } from '../types';
import { PermissionRequest, Permission } from '../types/permissions';

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
    const response = await this.communicator.send<Methods.wallet_requestPermissions, PermissionRequest[], Permission[]>(
      Methods.wallet_requestPermissions,
      permissions,
    );

    return response.data;
  }

  findPermission(permissions: Permission[], permission: string): Permission | undefined {
    return permissions.find((p) => p.parentCapability === permission);
  }

  async hasPermission(permission: string): Promise<boolean> {
    const permissions = await this.getPermissions();

    return !!this.findPermission(permissions, permission);
  }
}

export { Wallet };
