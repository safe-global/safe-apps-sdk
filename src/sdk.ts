import { METHODS } from './communication/methods';
import { Communicator, SafeInfo, EnvInfo } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';

class SafeAppsSDK {
  #communicator: Communicator;
  public readonly eth;
  public readonly txs;

  constructor(whitelistedDomains: RegExp[] = []) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    this.#communicator = new InterfaceCommunicator(whitelistedDomains);
    this.eth = new Eth(this.#communicator);
    this.txs = new TXs(this.#communicator);
    this.bootstrap();
  }

  private async bootstrap(): Promise<void> {
    const { txServiceUrl } = await this.getEnvInfo();

    this.txs.setTxServiceUrl(txServiceUrl);
  }

  private async getEnvInfo(): Promise<EnvInfo> {
    const response = await this.#communicator.send<'getEnvInfo', undefined, EnvInfo>(METHODS.getEnvInfo, undefined);

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }

  async getSafeInfo(): Promise<SafeInfo> {
    const response = await this.#communicator.send<'getSafeInfo', undefined, SafeInfo>(METHODS.getSafeInfo, undefined);

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}

export default SafeAppsSDK;
