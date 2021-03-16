import SafeAppsSDK, { SafeInfo } from "@gnosis.pm/safe-apps-sdk";
import { SafeAppProvider } from "@gnosis.pm/safe-apps-provider";
import Web3Modal, { ICoreOptions } from 'web3modal';

export class SafeAppWeb3Modal extends Web3Modal {

    private sdk: SafeAppsSDK
    private cachedSafeInfo: SafeInfo | undefined
    private provider: SafeAppProvider | undefined

    constructor(options?: Partial<ICoreOptions>, sdk?: SafeAppsSDK) {
        super(options)
        this.sdk = sdk || new SafeAppsSDK()
        this.safeInfo()
    }

    public async safeInfo(): Promise<SafeInfo | undefined> {
        if (!this.cachedSafeInfo)
            try {
                this.cachedSafeInfo = await Promise.race([
                    this.sdk.getSafeInfo(),
                    new Promise<undefined>((_, reject) => setTimeout(() => reject(), 100))
                ])
            } catch (e) {
                this.cachedSafeInfo = undefined
            }
        return this.cachedSafeInfo
    }

    async getOrCreateProvider(): Promise<SafeAppProvider> {
        if (!this.provider) {
            const safe = await this.safeInfo()
            if (!safe) throw Error("Could not load Safe information")
            this.provider = new SafeAppProvider(safe, this.sdk)
        }
        return this.provider
    }

    public requestProvider = async (): Promise<any> => {
        if (await this.safeInfo()) {
            return this.getOrCreateProvider()
        }
        return this.connect()
    }

    public async canAutoConnect(): Promise<boolean> {
        return await this.safeInfo() !== undefined || !!this.cachedProvider
    }
}