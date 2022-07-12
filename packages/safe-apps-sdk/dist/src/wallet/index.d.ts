import { Methods } from '../communication/methods';
import { Communicator } from '../types';
import { PermissionRequest, Permission } from '../types/permissions';
declare class Wallet {
    private readonly communicator;
    constructor(communicator: Communicator);
    getPermissions(): Promise<Permission[]>;
    requestPermissions(permissions: PermissionRequest[]): Promise<Permission[]>;
    hasPermission(current: Permission[], required: Methods[]): boolean;
    isPermissionRequestValid(permissions: PermissionRequest[]): boolean;
}
export { Wallet };
