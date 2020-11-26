"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRequestId = void 0;
const generateRequestId = () => {
    if (typeof window !== 'undefined') {
        return window === null || window === void 0 ? void 0 : window.performance.now().toString(36);
    }
    return new Date().getTime().toString(36);
};
exports.generateRequestId = generateRequestId;
//# sourceMappingURL=utils.js.map