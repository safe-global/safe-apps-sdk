"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = void 0;
const permissions_1 = require("./types/permissions");
const wallet_1 = require("./wallet");
const comparePermissions = (current, required) => {
    console.log('3.comparePermissions:', current, required);
    return required.every((method) => {
        return !!current.find((p) => p.parentCapability === method);
    });
};
function requirePermission() {
    return function (_, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            // @ts-expect-error this is not recognized as the correct context
            const wallet = new wallet_1.Wallet(this.communicator);
            console.log('1.Wallet instance:', wallet);
            // @ts-expect-error method is private but we are testing it
            console.log('2.Communicator instance:', this.communicator);
            let currentPermissions = await wallet.getPermissions();
            if (!comparePermissions(currentPermissions, [propertyKey])) {
                currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
            }
            if (!comparePermissions(currentPermissions, [propertyKey])) {
                throw new permissions_1.PermissionsError('Permissions rejected', permissions_1.PERMISSIONS_REQUEST_REJECTED);
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.requirePermission = requirePermission;
//# sourceMappingURL=permissionUtils.js.map