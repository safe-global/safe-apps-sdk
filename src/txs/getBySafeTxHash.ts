import { getTxServiceUrl } from './envInfo';

const getBySafeTxHash = async (safeTxHash: string): Promise<unknown> => {
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
    const res = await fetch(`${txServiceUrl}/transactions/${safeTxHash}`, options);
    const json = await res.json();

    return json;
  } catch (err) {
    throw err;
  }
};

export { getBySafeTxHash };
