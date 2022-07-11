"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const methods_1 = require("../communication/methods");
const permissions_1 = require("../types/permissions");
const RESTRICTED_METHODS = ['getAddressBook'];
class Wallet {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getPermissions() {
        const response = await this.communicator.send(methods_1.Methods.wallet_getPermissions, undefined);
        return response.data;
    }
    async requestPermissions(permissions) {
        if (!this.isPermissionRequestValid(permissions)) {
            throw new permissions_1.PermissionsError('Permissions request is invalid', permissions_1.PERMISSIONS_REQUEST_REJECTED);
        }
        try {
            const response = await this.communicator.send(methods_1.Methods.wallet_requestPermissions, permissions);
            return response.data;
        }
        catch (_a) {
            throw new permissions_1.PermissionsError('Permissions rejected', permissions_1.PERMISSIONS_REQUEST_REJECTED);
        }
    }
    findPermission(permissions, permission) {
        return permissions.find((p) => p.parentCapability === permission);
    }
    async hasPermission(permission) {
        const permissions = await this.getPermissions();
        return !!this.findPermission(permissions, permission);
    }
    isPermissionRequestValid(permissions) {
        return permissions.every((pr) => {
            if (typeof pr === 'object') {
                return Object.keys(pr).every((method) => {
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
exports.Wallet = Wallet;
//# sourceMappingURL=index.js.map