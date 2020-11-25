const generateRequestId = (): string => {
  if (typeof window !== 'undefined') {
    return window?.performance.now().toString(36);
  }

  return new Date().getTime().toString(36);
};

export { generateRequestId };
