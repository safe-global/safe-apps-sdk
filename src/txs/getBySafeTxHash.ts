import { getTxServiceUrl } from './envInfo';

const getBySafeTxHash = async (safeTxHash: string): Promise<void> => {
  const txServiceUrl = getTxServiceUrl();

  if (!txServiceUrl) {
    throw new Error("ENV information hasn't been synced yet or there was an error during the process");
  }

  const controller = new AbortController();
  const options = {
    method: 'GET',
    signal: controller.signal,
  };
  setTimeout(() => controller.abort(), 10000);

  try {
    await fetch(`${txServiceUrl}/transactions/${safeTxHash}`, options);
  } catch (err) {
    console.error('getBySafeTxHash: Timeout of 10s exceeded');
  }
};

export { getBySafeTxHash };
