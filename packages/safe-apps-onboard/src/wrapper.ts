import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import OnboardApi from 'bnc-onboard';
import { Initialization, API, Subscriptions, ConfigOptions, UserState } from 'bnc-onboard/dist/src/interfaces';

export class OnboardWrapper implements API {
  private sdk = new SafeAppsSDK();
  private triedToConnect = false;
  private onboardApi: API;
  private subscriptions?: Subscriptions;
  private safe: SafeInfo | undefined;
  private state: UserState | undefined;

  constructor(options: Initialization) {
    this.onboardApi = OnboardApi(options);
    this.subscriptions = options.subscriptions;
  }

  private async connectToSafe(timeout = 200): Promise<SafeInfo | undefined> {
    if (!this.safe && !this.triedToConnect) {
      this.safe = await Promise.race([
        this.sdk.getSafeInfo(),
        new Promise<undefined>((resolve) => setTimeout(resolve, timeout)),
      ]);
      this.triedToConnect = true;
    }

    return this.safe;
  }

  async isSafeApp(): Promise<boolean> {
    const safe = await this.connectToSafe();

    return !!safe;
  }

  setOnboardState(safe: SafeInfo): void {
    if (!this.state) {
      const provider = new SafeAppProvider(safe, this.sdk);
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
      };
    }

    const subscriptions = this.subscriptions;
    if (subscriptions?.wallet) subscriptions.wallet(this.state.wallet);
    if (subscriptions?.address) subscriptions.address(safe.safeAddress);
    if (subscriptions?.network) subscriptions.network(this.state.wallet.provider.chainId);
  }

  reset(): void {
    this.state = undefined;
    if (this.subscriptions?.address) this.subscriptions.address('');
  }

  async walletSelect(autoSelectWallet?: string): Promise<boolean> {
    const safe = await this.connectToSafe();
    if (safe) {
      await this.setOnboardState(safe);
      return true;
    }

    return this.onboardApi.walletSelect(autoSelectWallet);
  }

  async walletCheck(): Promise<boolean> {
    const runningAsSafeApp = await this.isSafeApp();
    if (runningAsSafeApp) {
      return true;
    }

    return this.onboardApi.walletCheck();
  }

  walletReset(): void {
    this.reset();
    this.onboardApi.walletReset();
  }

  async accountSelect(): Promise<boolean> {
    const runningAsSafeApp = await this.isSafeApp();
    if (runningAsSafeApp) {
      return false;
    }

    return this.onboardApi.accountSelect();
  }

  config(options: ConfigOptions): void {
    this.onboardApi.config(options);
  }

  getState(): UserState {
    if (this.state) {
      return this.state;
    }

    return this.onboardApi.getState();
  }
}
