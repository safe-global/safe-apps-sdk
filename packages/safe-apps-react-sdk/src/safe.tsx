import initSdk, { SdkInstance, Transaction as SDKTransaction, SafeInfo, TxConfirmationEvent, TxRejectionEvent, RequestId, TxServiceModel } from '@gnosis.pm/safe-apps-sdk'
import { v4 as uuidv4 } from 'uuid'; 

export type Transaction = SDKTransaction
export type SafeTransaction = TxServiceModel

export interface IgnorablePromise<T> extends Promise<T> {
    ignore: () => void;
}

export interface Safe {
    readonly info: SafeInfo
    activate(onSafeInfo: (info: SafeInfo) => void): void
    deactivate(): void
    sendTransactions(txs: Transaction[]): IgnorablePromise<string>
    loadSafeTransaction(safeTxHash: string): Promise<SafeTransaction>
    isConnected(): boolean
}

interface Callback {
    confirm: (safeTxHash: string) => void
    reject: (error?: any) => void
}

const rejectCallbackWithReason = (callbacks: Map<RequestId, Callback>, requestId: RequestId, reason: string) => {
    const callback = callbacks.get(requestId)
    if (callback) {
        callbacks.delete(requestId)
        callback.reject(new Error(reason))
    }
}

class State implements Safe {
    _info: SafeInfo | undefined
    sdk: SdkInstance
    callbacks = new Map<RequestId, Callback>()
    get info(): SafeInfo {
        const info = this._info
        if (info === undefined) throw Error("Not connected to a Safe")
        return info
    }

    constructor() {
        this.sdk = initSdk([/.*localhost.*/])
    }

    activate(
        onUpdate: (update: any) => void
    ) {
        const onSafeInfo = (info: SafeInfo) => {
            this._info = info
            console.debug({info})
            onUpdate({})
        }
        const onTransactionConfirmation = (confirmation: TxConfirmationEvent) => {
            console.debug({confirmation})
            const callback = this.callbacks.get(confirmation.requestId)
            if (callback) {
                this.callbacks.delete(confirmation.requestId)
                callback.confirm(confirmation.safeTxHash)
            }
        }
        const onTransactionRejection = (rejection: TxRejectionEvent) => {
            console.debug({rejection})
            rejectCallbackWithReason(this.callbacks, rejection.requestId, "User rejected transaction")
        }
        this.sdk.addListeners({ onSafeInfo, onTransactionConfirmation, onTransactionRejection })
    }

    deactivate() {
        this.sdk.removeListeners()
    }

    sendTransactions(txs: Transaction[]): IgnorablePromise<string> {
        const requestId = uuidv4()
        const ignore = () => {
            this.callbacks.delete(requestId)
        }
        const promise = new Promise<string>((confirm, reject) => {
            this.callbacks.set(requestId, { confirm, reject })
            this.sdk.sendTransactions(txs, requestId)
        })
        const ignorablePromise = Object.assign(promise, { ignore });
        return ignorablePromise;
    }

    loadSafeTransaction(safeTxHash: string): Promise<SafeTransaction> {
        return this.sdk.txs.getBySafeTxHash(safeTxHash)
    }

    isConnected(): boolean {
        return this._info !== undefined
    }
}

const connectSafe = (): Safe => {
    return new State()
}

export default connectSafe