import { Methods, RestrictedMethods } from '../communication/methods.js';
import { PermissionsError, PERMISSIONS_REQUEST_REJECTED } from '../types/permissions.js';
class Wallet {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getPermissions() {
        const response = await this.communicator.send(Methods.wallet_getPermissions, undefined);
        return response.data;
    }
    async requestPermissions(permissions) {
        if (!this.isPermissionRequestValid(permissions)) {
            throw new PermissionsError('Permissions request is invalid', PERMISSIONS_REQUEST_REJECTED);
        }
        try {
            const response = await this.communicator.send(Methods.wallet_requestPermissions, permissions);
            return response.data;
        }
        catch {
            throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
        }
    }
    isPermissionRequestValid(permissions) {
        return permissions.every((pr) => {
            if (typeof pr === 'object') {
                return Object.keys(pr).every((method) => {
                    if (Object.values(RestrictedMethods).includes(method)) {
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
//# sourceMappingURL=index.js.map