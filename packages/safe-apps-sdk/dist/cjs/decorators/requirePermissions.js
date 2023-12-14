"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../wallet/index.js");
const permissions_js_1 = require("../types/permissions.js");
const hasPermission = (required, permissions) => permissions.some((permission) => permission.parentCapability === required);
const requirePermission = () => (_, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function () {
        // @ts-expect-error accessing private property from decorator. 'this' context is the class instance
        const wallet = new index_js_1.Wallet(this.communicator);
        let currentPermissions = await wallet.getPermissions();
        if (!hasPermission(propertyKey, currentPermissions)) {
            currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
        }
        if (!hasPermission(propertyKey, currentPermissions)) {
            throw new permissions_js_1.PermissionsError('Permissions rejected', permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
        }
        return originalMethod.apply(this);
    };
    return descriptor;
};
exports.default = requirePermission;
//# sourceMappingURL=requirePermissions.js.map