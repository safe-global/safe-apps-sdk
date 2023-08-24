export const PERMISSIONS_REQUEST_REJECTED = 4001;
export class PermissionsError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code;
        this.data = data;
        // Should adjust prototype manually because how TS handles the type extension compilation
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, PermissionsError.prototype);
    }
}
//# sourceMappingURL=permissions.js.map