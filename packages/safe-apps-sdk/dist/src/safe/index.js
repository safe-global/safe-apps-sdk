"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Safe = void 0;
const ethers_1 = require("ethers");
const signatures_1 = require("./signatures");
const methods_1 = require("../communication/methods");
const constants_1 = require("../eth/constants");
class Safe {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getInfo() {
        const response = await this.communicator.send(methods_1.Methods.getSafeInfo, undefined);
        return response.data;
    }
    // There is a possibility that this method will change because we may add pagination to the endpoint
    async experimental_getBalances({ currency = 'usd' } = {}) {
        const response = await this.communicator.send(methods_1.Methods.getSafeBalances, {
            currency,
        });
        return response.data;
    }
    calculateMessageHash(message) {
        if (typeof message === 'string') {
            message = ethers_1.ethers.utils.toUtf8Bytes(message);
        }
        return ethers_1.ethers.utils.keccak256(message);
    }
    async check1271Signature(messageHash, signature = '0x') {
        const safeInfo = await this.getInfo();
        const encodedIsValidSignatureCall = signatures_1.EIP_1271_INTERFACE.encodeFunctionData('isValidSignature', [
            messageHash,
            signature,
        ]);
        const payload = {
            call: constants_1.RPC_CALLS.eth_call,
            params: [
                {
                    to: safeInfo.safeAddress,
                    data: encodedIsValidSignatureCall,
                },
                'latest',
            ],
        };
        try {
            const response = await this.communicator.send(methods_1.Methods.rpcCall, payload);
            return response.data.slice(0, 10).toLowerCase() === signatures_1.MAGIC_VALUE;
        }
        catch (err) {
            return false;
        }
    }
    async check1271SignatureBytes(messageHash, signature = '0x') {
        const safeInfo = await this.getInfo();
        const encodedIsValidSignatureCall = signatures_1.EIP_1271_BYTES_INTERFACE.encodeFunctionData('isValidSignature', [
            messageHash,
            signature,
        ]);
        const payload = {
            call: constants_1.RPC_CALLS.eth_call,
            params: [
                {
                    to: safeInfo.safeAddress,
                    data: encodedIsValidSignatureCall,
                },
                'latest',
            ],
        };
        try {
            const response = await this.communicator.send(methods_1.Methods.rpcCall, payload);
            return response.data.slice(0, 10).toLowerCase() === signatures_1.MAGIC_VALUE_BYTES;
        }
        catch (err) {
            return false;
        }
    }
    async isMessageSigned(message, signature = '0x') {
        const checks = [this.check1271Signature, this.check1271SignatureBytes];
        let msgBytes = Buffer.from([]);
        // Set msgBytes as Buffer type
        if (Buffer.isBuffer(message)) {
            msgBytes = message;
        }
        else if (typeof message === 'string') {
            if (ethers_1.ethers.utils.isHexString(message)) {
                msgBytes = Buffer.from(message.substring(2), 'hex');
            }
            else {
                msgBytes = Buffer.from(message);
            }
        }
        msgBytes = ethers_1.ethers.utils.arrayify(msgBytes);
        for (const check of checks) {
            const isValid = await check(msgBytes, signature);
            if (isValid) {
                return true;
            }
        }
        return false;
    }
}
exports.Safe = Safe;
//# sourceMappingURL=index.js.map