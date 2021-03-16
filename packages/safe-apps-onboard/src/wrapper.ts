import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk'
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider'
import OnboardApi from 'bnc-onboard'
import { Initialization, API, Subscriptions, ConfigOptions, UserState } from 'bnc-onboard/dist/src/interfaces'

export class OnboardWrapper implements API {
  private sdk = new SafeAppsSDK()
  private onboardApi: API
  private subscriptions?: Subscriptions
  private safe: SafeInfo | undefined
  private state: UserState | undefined
  constructor(options: Initialization) {
    this.onboardApi = OnboardApi(options)
    this.subscriptions = options.subscriptions
    this.checkSafeApp().catch(console.log)
  }

  async connectedSafe(timeout?: number): Promise<SafeInfo | undefined> {
    if (!this.safe)
      this.safe = await Promise.race([
        this.sdk.getSafeInfo(),
        new Promise<undefined>((resolve) => setTimeout(resolve, timeout || 100)),
      ])
    return this.safe
  }

  checkSafeApp(): Promise<any> {
    return this.connectedSafe().then((safe: SafeInfo | undefined) => {
      if (!safe) return
      if (!this.state) {
        const provider = new SafeAppProvider(safe, this.sdk)
        this.state = {
          address: safe.safeAddress,
          network: provider.chainId,
          appNetworkId: provider.chainId,
          balance: '0',
          mobileDevice: false,
          wallet: {
            name: 'Gnosis Safe',
            provider,
            type: 'sdk',
          },
        }
      }
      const subscriptions = this.subscriptions
      console.log({ subscriptions })
      if (subscriptions?.wallet) subscriptions?.wallet(this.state.wallet)

      if (subscriptions?.address) subscriptions?.address(safe.safeAddress)

      if (subscriptions?.network) subscriptions?.network(this.state.wallet.provider.chainId)
    })
  }

  reset() {
    this.state = undefined
    if (this.subscriptions?.address) this.subscriptions.address('')
  }

  async walletSelect(autoSelectWallet?: string): Promise<boolean> {
    if ((await this.connectedSafe()) !== undefined) {
      await this.checkSafeApp()
      return true
    }
    return this.onboardApi.walletSelect(autoSelectWallet)
  }

  async walletCheck(): Promise<boolean> {
    if ((await this.connectedSafe()) !== undefined) {
      return true
    }
    return this.onboardApi.walletCheck()
  }

  walletReset() {
    this.reset()
    this.onboardApi.walletReset()
  }

  async accountSelect(): Promise<boolean> {
    if ((await this.connectedSafe()) !== undefined) return false
    return this.onboardApi.accountSelect()
  }

  config(options: ConfigOptions) {
    this.onboardApi.config(options)
  }

  getState(): UserState {
    if (this.state) return this.state
    return this.onboardApi.getState()
  }
}