"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsError = exports.PERMISSIONS_REQUEST_REJECTED = void 0;
exports.PERMISSIONS_REQUEST_REJECTED = 4001;
class PermissionsError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code;
        this.data = data;
        Object.setPrototypeOf(this, PermissionsError.prototype);
    }
    isPermissionsRequestRejected() {
        return this.code === exports.PERMISSIONS_REQUEST_REJECTED;
    }
}
exports.PermissionsError = PermissionsError;
//# sourceMappingURL=permissions.js.map