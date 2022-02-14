import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import SafeAppsSDK, { Opts, SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';

class SafeAppConnector extends AbstractConnector {
  private readonly sdk: SafeAppsSDK;
  private safe: SafeInfo | undefined;
  private provider: SafeAppProvider | undefined;

  constructor(opts?: Opts) {
    super();
    this.sdk = new SafeAppsSDK(opts);
  }

  async activate(): Promise<ConnectorUpdate> {
    const runningAsSafeApp = await this.isSafeApp();
    if (!runningAsSafeApp) {
      throw new Error('The app is loaded outside safe context');
    }

    return { provider: await this.getProvider(), chainId: await this.getChainId(), account: await this.getAccount() };
  }

  public async getSafeInfo(): Promise<SafeInfo> {
    if (!this.safe) {
      this.safe = await this.sdk.safe.getInfo();
    }
    return this.safe;
  }

  public async getProvider(): Promise<SafeAppProvider> {
    if (!this.provider) {
      const safe = await this.getSafeInfo();
      this.provider = new SafeAppProvider(safe, this.sdk);
    }
    return this.provider;
  }

  public async getChainId(): Promise<number> {
    const provider = await this.getProvider();
    return provider.chainId;
  }

  public async getAccount(): Promise<string> {
    const safe = await this.getSafeInfo();
    return safe.safeAddress;
  }

  public deactivate(): void {
    return;
  }

  public async isSafeApp(): Promise<boolean> {
    // check if we're in an iframe
    if (window?.parent === window) {
      return false;
    }

    const safe = await Promise.race([
      this.getSafeInfo(),
      new Promise<undefined>((resolve) => setTimeout(resolve, 300)),
    ]);

    return !!safe;
  }
}

export { SafeAppConnector };
