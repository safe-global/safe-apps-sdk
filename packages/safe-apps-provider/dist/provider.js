"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAppProvider = void 0;
const events_1 = require("events");
const utils_1 = require("./utils");
// The API is based on Ethereum JavaScript API Provider Standard. Link: https://eips.ethereum.org/EIPS/eip-1193
class SafeAppProvider {
    constructor(safe, sdk) {
        this.submittedTxs = new Map();
        this.events = new events_1.EventEmitter();
        this.safe = safe;
        this.sdk = sdk;
    }
    async connect() {
        this.events.emit('connect', { chainId: this.chainId });
        return;
    }
    async disconnect() {
        return;
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    get chainId() {
        return this.safe.chainId;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async request(request) {
        const { method, params = [] } = request;
        switch (method) {
            case 'eth_accounts':
                return [this.safe.safeAddress];
            case 'net_version':
            case 'eth_chainId':
                return `0x${this.chainId.toString(16)}`;
            case 'eth_sendTransaction':
                const tx = Object.assign({ value: '0', data: '0x' }, params[0]);
                const resp = await this.sdk.txs.send({
                    txs: [tx],
                });
                // Store fake transaction
                this.submittedTxs.set(resp.safeTxHash, {
                    from: this.safe.safeAddress,
                    hash: resp.safeTxHash,
                    gas: 0,
                    gasPrice: '0x00',
                    nonce: 0,
                    input: tx.data,
                    value: tx.value,
                    to: tx.to,
                    blockHash: null,
                    blockNumber: null,
                    transactionIndex: null,
                });
                return resp.safeTxHash;
            case 'eth_blockNumber':
                const block = await this.sdk.eth.getBlockByNumber(['latest']);
                return block.number;
            case 'eth_getBalance':
                return this.sdk.eth.getBalance([utils_1.getLowerCase(params[0]), params[1]]);
            case 'eth_getCode':
                return this.sdk.eth.getCode([utils_1.getLowerCase(params[0]), params[1]]);
            case 'eth_getStorageAt':
                return this.sdk.eth.getStorageAt([utils_1.getLowerCase(params[0]), params[1], params[2]]);
            case 'eth_getBlockByNumber':
                return this.sdk.eth.getBlockByNumber([params[0], params[1]]);
            case 'eth_getBlockByHash':
                return this.sdk.eth.getBlockByHash([params[0], params[1]]);
            case 'eth_getTransactionByHash':
                let txHash = params[0];
                try {
                    const resp = await this.sdk.txs.getBySafeTxHash(txHash);
                    txHash = resp.txHash || txHash;
                }
                catch (e) { }
                // Use fake transaction if we don't have a real tx hash
                if (this.submittedTxs.has(txHash)) {
                    return this.submittedTxs.get(txHash);
                }
                return this.sdk.eth.getTransactionByHash([txHash]).then((tx) => {
                    // We set the tx hash to the one requested, as some provider assert this
                    if (tx) {
                        tx.hash = params[0];
                    }
                    return tx;
                });
            case 'eth_getTransactionReceipt': {
                let txHash = params[0];
                try {
                    const resp = await this.sdk.txs.getBySafeTxHash(txHash);
                    txHash = resp.txHash || txHash;
                }
                catch (e) { }
                return this.sdk.eth.getTransactionReceipt([txHash]).then((tx) => {
                    // We set the tx hash to the one requested, as some provider assert this
                    if (tx) {
                        tx.transactionHash = params[0];
                    }
                    return tx;
                });
            }
            case 'eth_estimateGas': {
                return 0;
            }
            case 'eth_call': {
                return this.sdk.eth.call([params[0], params[1]]);
            }
            case 'eth_getLogs':
                return this.sdk.eth.getPastLogs([params[0]]);
            default:
                throw Error(`"${request.method}" not implemented`);
        }
    }
    // this method is needed for ethers v4
    // https://github.com/ethers-io/ethers.js/blob/427e16826eb15d52d25c4f01027f8db22b74b76c/src.ts/providers/web3-provider.ts#L41-L55
    send(request, callback) {
        if (!request)
            callback('Undefined request');
        this.request(request)
            .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
            .catch((error) => callback(error, null));
    }
}
exports.SafeAppProvider = SafeAppProvider;
//# sourceMappingURL=provider.js.map