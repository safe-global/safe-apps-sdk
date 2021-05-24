import { METHODS } from './communication';
import { Communicator, SafeInfo } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';

export type Opts = {
  whitelistedDomains?: RegExp[];
  debug?: boolean;
};

class SafeAppsSDK {
  private readonly communicator: Communicator;
  public readonly eth;
  public readonly txs;

  constructor(opts: Opts = {}) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    const { whitelistedDomains = null, debug = false } = opts;

    this.communicator = new InterfaceCommunicator(whitelistedDomains, debug);
    this.eth = new Eth(this.communicator);
    this.txs = new TXs(this.communicator);
  }

  async getSafeInfo(): Promise<SafeInfo> {
    const response = await this.communicator.send<'getSafeInfo', undefined, SafeInfo>(METHODS.getSafeInfo, undefined);

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}

export default SafeAppsSDK;
