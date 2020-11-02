const generateRequestId = (): number => {
  if (typeof window !== 'undefined') {
    return Math.trunc(window?.performance.now());
  }

  return Math.trunc(Date.now());
};

export { generateRequestId };
