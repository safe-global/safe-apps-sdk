import { RPC_CALLS } from '../eth/constants.js';
import { Methods } from '../communication/methods.js';
const inputFormatters = {
    defaultBlockParam: (arg = 'latest') => arg,
    returnFullTxObjectParam: (arg = false) => arg,
    blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg,
};
class Eth {
    constructor(communicator) {
        this.communicator = communicator;
        this.call = this.buildRequest({
            call: RPC_CALLS.eth_call,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getBalance = this.buildRequest({
            call: RPC_CALLS.eth_getBalance,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getCode = this.buildRequest({
            call: RPC_CALLS.eth_getCode,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getStorageAt = this.buildRequest({
            call: RPC_CALLS.eth_getStorageAt,
            formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam],
        });
        this.getPastLogs = this.buildRequest({
            call: RPC_CALLS.eth_getLogs,
        });
        this.getBlockByHash = this.buildRequest({
            call: RPC_CALLS.eth_getBlockByHash,
            formatters: [null, inputFormatters.returnFullTxObjectParam],
        });
        this.getBlockByNumber = this.buildRequest({
            call: RPC_CALLS.eth_getBlockByNumber,
            formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam],
        });
        this.getTransactionByHash = this.buildRequest({
            call: RPC_CALLS.eth_getTransactionByHash,
        });
        this.getTransactionReceipt = this.buildRequest({
            call: RPC_CALLS.eth_getTransactionReceipt,
        });
        this.getTransactionCount = this.buildRequest({
            call: RPC_CALLS.eth_getTransactionCount,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getGasPrice = this.buildRequest({
            call: RPC_CALLS.eth_gasPrice,
        });
        this.getEstimateGas = (transaction) => this.buildRequest({
            call: RPC_CALLS.eth_estimateGas,
        })([transaction]);
        this.setSafeSettings = this.buildRequest({
            call: RPC_CALLS.safe_setSettings,
        });
    }
    buildRequest(args) {
        const { call, formatters } = args;
        return async (params) => {
            if (formatters && Array.isArray(params)) {
                formatters.forEach((formatter, i) => {
                    if (formatter) {
                        params[i] = formatter(params[i]);
                    }
                });
            }
            const payload = {
                call,
                params: params || [],
            };
            const response = await this.communicator.send(Methods.rpcCall, payload);
            return response.data;
        };
    }
}
export { Eth };
//# sourceMappingURL=index.js.map