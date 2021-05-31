import { Communicator } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';
import { Safe } from './safe';

export type Opts = {
  whitelistedDomains?: RegExp[];
  debug?: boolean;
};

class SafeAppsSDK {
  private readonly communicator: Communicator;
  public readonly eth;
  public readonly txs;
  public readonly safe;

  constructor(opts: Opts = {}) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    const { whitelistedDomains = null, debug = false } = opts;

    this.communicator = new InterfaceCommunicator(whitelistedDomains, debug);
    this.eth = new Eth(this.communicator);
    this.txs = new TXs(this.communicator);
    this.safe = new Safe(this.communicator);
  }
}

export default SafeAppsSDK;
