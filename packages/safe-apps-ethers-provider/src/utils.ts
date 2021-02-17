import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { TxServiceModel } from '@gnosis.pm/safe-apps-sdk';

export interface EthError extends Error {
  transactionHash?: string;
}

export function getLowerCase(value: string): string {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}

export function convertSafeTxToEthersTx(tx: TxServiceModel): TransactionResponse {
  const ethersTxReceipt: TransactionReceipt = {
    to: tx.to,
    from: tx.safe,
    contractAddress: tx.safe,
    transactionIndex: 0,
    gasUsed: BigNumber.from(0),
    logsBloom: '',
    blockHash: '0x',
    transactionHash: tx.safeTxHash,
    logs: [],
    blockNumber: 0,
    confirmations: 0,
    cumulativeGasUsed: BigNumber.from(0),
    byzantium: false,
  };

  const ethersTx: TransactionResponse = {
    hash: tx.safeTxHash,
    to: tx.to,
    from: tx.safe,
    nonce: tx.nonce as number,
    gasLimit: BigNumber.from(tx.safeTxGas || 0),
    gasPrice: BigNumber.from(tx.gasPrice || 0),
    data: tx.data || '0x',
    value: BigNumber.from(tx.value),
    confirmations: 0,
    chainId: 1,
    wait: async () => ethersTxReceipt,
  };

  return ethersTx;
}

function wait(timeout: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

type PollOptions = {
  timeout?: number;
  floor?: number;
  ceiling?: number;
  interval?: number;
  retryLimit?: number;
};

export async function poll<T>(func: () => Promise<T | undefined>, options?: PollOptions): Promise<T> {
  if (!options) {
    options = {};
  }

  if (options.floor == null) {
    options.floor = 0;
  }
  if (options.ceiling == null) {
    options.ceiling = 10000;
  }
  if (options.interval == null) {
    options.interval = 250;
  }

  let timer: NodeJS.Timer;
  let done = false;

  // Returns true if cancel was successful. Unsuccessful cancel means we're already done.
  const cancel = (): boolean => {
    if (done) {
      return false;
    }
    done = true;
    if (timer) {
      clearTimeout(timer);
    }
    return true;
  };

  if (options.timeout) {
    timer = setTimeout(() => {
      if (cancel()) {
        throw new Error('timeout');
      }
    }, options.timeout);
  }

  const { retryLimit = 10 } = options;

  for (let attempt = 0; attempt < retryLimit; attempt++) {
    try {
      const result = await func();
      if (result !== undefined) {
        if (cancel()) {
          return result;
        }
      }

      throw new Error('poll: got undefined');
    } catch (err) {
      if (attempt > retryLimit) {
        if (cancel()) {
          throw new Error(`poll: failed to obtain the result after ${options.retryLimit} tries`);
        }
      }

      let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
      if (timeout < options.floor) {
        timeout = options.floor;
      }
      if (timeout > options.ceiling) {
        timeout = options.ceiling;
      }

      await wait(timeout);
    }
  }

  // @ts-expect-error it will never reach return statement
  return;
}
