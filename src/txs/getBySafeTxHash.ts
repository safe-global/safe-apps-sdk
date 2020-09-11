const getBySafeTxHash = async (safeAddress: string, safeTxHash: string): Promise<void> => {
  console.log(safeAddress, safeTxHash);
  const controller = new AbortController();
  const options = {
    method: 'POST',
    signal: controller.signal,
    body: JSON.stringify({
      firstName: 'David',
      lastName: 'Pollock',
    }),
  };
  setTimeout(() => controller.abort(), 4000);

  try {
    await fetch('/login', options);
  } catch (err) {
    console.error('timeout exceeded');
  }
};

export { getBySafeTxHash };
