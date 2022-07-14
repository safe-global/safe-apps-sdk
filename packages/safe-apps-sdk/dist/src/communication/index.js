"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageFormatter_1 = require("./messageFormatter");
const wallet_1 = require("../wallet");
const permissions_1 = require("../types/permissions");
class PostMessageCommunicator {
    constructor(allowedOrigins = null, debugMode = false) {
        this.allowedOrigins = null;
        this.callbacks = new Map();
        this.debugMode = false;
        this.isServer = typeof window === 'undefined';
        this.isValidMessage = ({ origin, data, source }) => {
            const emptyOrMalformed = !data;
            const sentFromParentEl = !this.isServer && source === window.parent;
            const majorVersionNumber = typeof data.version !== 'undefined' && parseInt(data.version.split('.')[0]);
            const allowedSDKVersion = majorVersionNumber >= 1;
            let validOrigin = true;
            if (Array.isArray(this.allowedOrigins)) {
                validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== undefined;
            }
            return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
        };
        this.logIncomingMessage = (msg) => {
            console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
        };
        this.onParentMessage = (msg) => {
            if (this.isValidMessage(msg)) {
                this.debugMode && this.logIncomingMessage(msg);
                this.handleIncomingMessage(msg.data);
            }
        };
        this.handleIncomingMessage = (payload) => {
            const { id } = payload;
            const cb = this.callbacks.get(id);
            if (cb) {
                cb(payload);
                this.callbacks.delete(id);
            }
        };
        this.send = async (method, params, requiredPermissions) => {
            const request = messageFormatter_1.MessageFormatter.makeRequest(method, params);
            if (Array.isArray(requiredPermissions)) {
                const hasPermissions = await this.checkPermissions(requiredPermissions);
                if (!hasPermissions) {
                    throw new permissions_1.PermissionsError('Permissions rejected', permissions_1.PERMISSIONS_REQUEST_REJECTED);
                }
            }
            if (this.isServer) {
                throw new Error("Window doesn't exist");
            }
            window.parent.postMessage(request, '*');
            return new Promise((resolve, reject) => {
                this.callbacks.set(request.id, (response) => {
                    if (!response.success) {
                        reject(new Error(response.error));
                        return;
                    }
                    resolve(response);
                });
            });
        };
        this.allowedOrigins = allowedOrigins;
        this.debugMode = debugMode;
        this.wallet = new wallet_1.Wallet(this);
        if (!this.isServer) {
            window.addEventListener('message', this.onParentMessage);
        }
    }
    comparePermissions(current, required) {
        return required.every((method) => {
            return !!current.find((p) => p.parentCapability === method);
        });
    }
    async checkPermissions(requiredPermissions) {
        let currentPermissions = await this.wallet.getPermissions();
        if (!this.comparePermissions(currentPermissions, requiredPermissions)) {
            currentPermissions = await this.wallet.requestPermissions(requiredPermissions.map((p) => ({ [p]: {} })));
        }
        return this.comparePermissions(currentPermissions, requiredPermissions);
    }
}
exports.default = PostMessageCommunicator;
__exportStar(require("./methods"), exports);
//# sourceMappingURL=index.js.map