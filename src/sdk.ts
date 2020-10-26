class SDK {
  config = {
    allowedOrigins: [
      /https:\/\/.*(gnosis-safe\.io|gnosisdev.com)/, // Safe Multisig
      /https?:\/\/localhost:\d+/, // Safe Multisig desktop app
    ],
  };

  constructor(safeAppUrlsRegExp: RegExp[] = []) {
    this.config.allowedOrigins.push(...safeAppUrlsRegExp);

    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }
  }
}

/**
 * Sets Safe-app url that will render the third-party app.
 * @param parentUrl
 */
function initSdk(safeAppUrlsRegExp: RegExp[] = []): SdkInstance {
  config.safeAppUrlsRegExp = [
    /https:\/\/.*(gnosis-safe\.io|gnosisdev.com)/, // Safe Multisig
    /https?:\/\/localhost:\d+/, // Safe Multisig desktop app.
    ...safeAppUrlsRegExp,
  ];
  sendInitializationMessage();

  if (typeof window === 'undefined') {
    throw new Error('Error initializing the sdk: window is undefined');
  }

  return {
    addListeners,
    removeListeners,
    sendTransactions,
    sendTransactionsWithParams,
    txs: txsMethods,
    eth: ethMethods,
  };
}

export default SDK;
