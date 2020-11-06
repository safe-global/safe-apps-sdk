const generateRequestId = (): number => {
  if (typeof window !== 'undefined') {
    return Math.trunc(window?.performance.now());
  }

  return Math.trunc(Date.now());
};

const DEFAULT_ALLOWED_ORIGINS = [
  /https:\/\/.*(gnosis-safe\.io|gnosisdev.com)/, // Safe Multisig
  /https?:\/\/localhost:\d+/, // Safe Multisig desktop app.
];

export { generateRequestId, DEFAULT_ALLOWED_ORIGINS };
