"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const methods_js_1 = require("../communication/methods.js");
const permissions_js_1 = require("../types/permissions.js");
class Wallet {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getPermissions() {
        const response = await this.communicator.send(methods_js_1.Methods.wallet_getPermissions, undefined);
        return response.data;
    }
    async requestPermissions(permissions) {
        if (!this.isPermissionRequestValid(permissions)) {
            throw new permissions_js_1.PermissionsError('Permissions request is invalid', permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
        }
        try {
            const response = await this.communicator.send(methods_js_1.Methods.wallet_requestPermissions, permissions);
            return response.data;
        }
        catch {
            throw new permissions_js_1.PermissionsError('Permissions rejected', permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
        }
    }
    isPermissionRequestValid(permissions) {
        return permissions.every((pr) => {
            if (typeof pr === 'object') {
                return Object.keys(pr).every((method) => {
                    if (Object.values(methods_js_1.RestrictedMethods).includes(method)) {
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