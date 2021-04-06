import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';

class SafeAppConnector extends AbstractConnector {
  private readonly sdk = new SafeAppsSDK();
  private safe: SafeInfo | undefined;
  private provider: SafeAppProvider | undefined;

  async activate(): Promise<ConnectorUpdate> {
    if (!this.isSafeApp()) {
      throw new Error('The app is loaded outside safe context');
    }

    return { provider: await this.getProvider(), chainId: await this.getChainId(), account: await this.getAccount() };
  }

  public async getSafeInfo(): Promise<SafeInfo> {
    if (!this.safe) {
      this.safe = await this.sdk.getSafeInfo();
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
    const safe = await Promise.race([
      this.getSafeInfo(),
      new Promise<undefined>((resolve) => setTimeout(resolve, 300)),
    ]);

    return !!safe;
  }
}

export { SafeAppConnector };
