import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import Web3Modal, { ICoreOptions } from 'web3modal';

export class SafeAppWeb3Modal extends Web3Modal {
  private sdk: SafeAppsSDK;
  private safe?: SafeInfo;
  private provider?: SafeAppProvider;
  private triedToConnect = false;

  constructor(options?: Partial<ICoreOptions>, sdk?: SafeAppsSDK) {
    super(options);
    this.sdk = sdk || new SafeAppsSDK();
  }

  private async getConnectedSafe(): Promise<SafeInfo | undefined> {
    if (!this.safe && !this.triedToConnect) {
      this.safe = await Promise.race([
        this.sdk.safe.getInfo(),
        new Promise<undefined>((resolve) => setTimeout(resolve, 200)),
      ]);
      this.triedToConnect = true;
    }

    return this.safe;
  }

  async getProvider(): Promise<SafeAppProvider> {
    if (!this.provider) {
      const safe = await this.getConnectedSafe();
      if (!safe) throw Error('Could not load Safe information');
      this.provider = new SafeAppProvider(safe, this.sdk);
    }
    return this.provider;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public requestProvider = async (): Promise<any> => {
    if (await this.isSafeApp()) {
      return this.getProvider();
    }
    return this.connect();
  };

  public async isSafeApp(): Promise<boolean> {
    // check if we're in an iframe
    if (window?.parent === window) {
      return false;
    }

    const safe = await this.getConnectedSafe();

    return !!safe;
  }
}
