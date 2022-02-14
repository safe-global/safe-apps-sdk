import { Communicator } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';
import { Safe } from './safe';

export type Opts = {
  allowedDomains?: RegExp[];
  debug?: boolean;
};

class SafeAppsSDK {
  private readonly communicator: Communicator;
  public readonly eth: Eth;
  public readonly txs: TXs;
  public readonly safe: Safe;

  constructor(opts: Opts = {}) {
    const { allowedDomains = null, debug = false } = opts;

    this.communicator = new InterfaceCommunicator(allowedDomains, debug);
    this.eth = new Eth(this.communicator);
    this.txs = new TXs(this.communicator);
    this.safe = new Safe(this.communicator);
  }
}

export default SafeAppsSDK;
