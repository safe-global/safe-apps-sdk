"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsChangeMethods = exports.TransferMethods = exports.Operation = void 0;
const methods_1 = require("./communication/methods");
// copy-pasting all the types below from safe-react makes me think we might want to export them to a package
var Operation;
(function (Operation) {
    Operation[Operation["CALL"] = 0] = "CALL";
    Operation[Operation["DELEGATE_CALL"] = 1] = "DELEGATE_CALL";
    Operation[Operation["CREATE"] = 2] = "CREATE";
})(Operation = exports.Operation || (exports.Operation = {}));
// types comes from: https://github.com/gnosis/safe-client-gateway/blob/752e76b6d1d475791dbd7917b174bb41d2d9d8be/src/utils.rs
var TransferMethods;
(function (TransferMethods) {
    TransferMethods["TRANSFER"] = "transfer";
    TransferMethods["TRANSFER_FROM"] = "transferFrom";
    TransferMethods["SAFE_TRANSFER_FROM"] = "safeTransferFrom";
})(TransferMethods = exports.TransferMethods || (exports.TransferMethods = {}));
var SettingsChangeMethods;
(function (SettingsChangeMethods) {
    SettingsChangeMethods["SETUP"] = "setup";
    SettingsChangeMethods["SET_FALLBACK_HANDLER"] = "setFallbackHandler";
    SettingsChangeMethods["ADD_OWNER_WITH_THRESHOLD"] = "addOwnerWithThreshold";
    SettingsChangeMethods["REMOVE_OWNER"] = "removeOwner";
    SettingsChangeMethods["REMOVE_OWNER_WITH_THRESHOLD"] = "removeOwnerWithThreshold";
    SettingsChangeMethods["SWAP_OWNER"] = "swapOwner";
    SettingsChangeMethods["CHANGE_THRESHOLD"] = "changeThreshold";
    SettingsChangeMethods["CHANGE_MASTER_COPY"] = "changeMasterCopy";
    SettingsChangeMethods["ENABLE_MODULE"] = "enableModule";
    SettingsChangeMethods["DISABLE_MODULE"] = "disableModule";
    SettingsChangeMethods["EXEC_TRANSACTION_FROM_MODULE"] = "execTransactionFromModule";
    SettingsChangeMethods["APPROVE_HASH"] = "approveHash";
    SettingsChangeMethods["EXEC_TRANSACTION"] = "execTransaction";
})(SettingsChangeMethods = exports.SettingsChangeMethods || (exports.SettingsChangeMethods = {}));
//# sourceMappingURL=types.js.map