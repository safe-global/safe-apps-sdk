"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = void 0;
const permissions_1 = require("./types/permissions");
const wallet_1 = require("./wallet");
const comparePermissions = (required, current) => {
    return !!current.find((p) => p.parentCapability === required);
};
function requirePermission() {
    return function (_, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            // @ts-expect-error this is bound to PropertyDescriptor instead Safe instance
            const wallet = new wallet_1.Wallet(this.communicator);
            console.log('1.Wallet instance:', wallet);
            // @ts-expect-error error
            console.log('2.Communicator instance:', this.communicator);
            let currentPermissions = await wallet.getPermissions();
            if (!comparePermissions(propertyKey, currentPermissions)) {
                currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
            }
            if (!comparePermissions(propertyKey, currentPermissions)) {
                throw new permissions_1.PermissionsError('Permissions rejected', permissions_1.PERMISSIONS_REQUEST_REJECTED);
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.requirePermission = requirePermission;
//# sourceMappingURL=permissionUtils.js.map