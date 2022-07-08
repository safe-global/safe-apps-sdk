"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const methods_1 = require("../communication/methods");
class Wallet {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getPermissions() {
        const response = await this.communicator.send(methods_1.Methods.wallet_getPermissions, undefined);
        return response.data;
    }
    async requestPermissions(permissions) {
        const response = await this.communicator.send(methods_1.Methods.wallet_requestPermissions, permissions);
        return response.data;
    }
    findPermission(permissions, permission) {
        return permissions.find((p) => p.parentCapability === permission);
    }
    async hasPermission(permission) {
        const permissions = await this.getPermissions();
        return !!this.findPermission(permissions, permission);
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=index.js.map