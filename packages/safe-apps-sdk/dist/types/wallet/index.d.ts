import { Communicator } from '../types/index.js';
import { PermissionRequest, Permission } from '../types/permissions.js';
declare class Wallet {
    private readonly communicator;
    constructor(communicator: Communicator);
    getPermissions(): Promise<Permission[]>;
    requestPermissions(permissions: PermissionRequest[]): Promise<Permission[]>;
    isPermissionRequestValid(permissions: PermissionRequest[]): boolean;
}
export { Wallet };
//# sourceMappingURL=index.d.ts.map