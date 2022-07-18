"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = void 0;
const permissions_1 = require("./types/permissions");
const wallet_1 = require("./wallet");
const hasPermission = (required, permissions) => {
    console.log('hasPermission', required, permissions);
    return permissions.some((permission) => permission.parentCapability === required);
};
const requirePermission = () => (_, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function () {
        // @ts-expect-error accessing private property from decorator. 'this' context is the class instance
        const wallet = new wallet_1.Wallet(this.communicator);
        let currentPermissions = await wallet.getPermissions();
        if (!hasPermission(propertyKey, currentPermissions)) {
            currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
        }
        if (!hasPermission(propertyKey, currentPermissions)) {
            throw new permissions_1.PermissionsError('Permissions rejected', permissions_1.PERMISSIONS_REQUEST_REJECTED);
        }
        return originalMethod.apply(this);
    };
    return descriptor;
};
exports.requirePermission = requirePermission;
//# sourceMappingURL=permissionUtils.js.map