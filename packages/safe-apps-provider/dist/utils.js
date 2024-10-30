"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToHex = exports.getLowerCase = void 0;
function getLowerCase(value) {
    if (value) {
        return value.toLowerCase();
    }
    return value;
}
exports.getLowerCase = getLowerCase;
function numberToHex(value) {
    return `0x${value.toString(16)}`;
}
exports.numberToHex = numberToHex;
//# sourceMappingURL=utils.js.map