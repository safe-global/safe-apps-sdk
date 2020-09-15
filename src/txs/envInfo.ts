const envInfo = {
  txServiceUrl: '',
};

export const getTxServiceUrl = (): string => envInfo.txServiceUrl;

export const setTxServiceUrl = (url: string): void => {
  envInfo.txServiceUrl = url;
};
