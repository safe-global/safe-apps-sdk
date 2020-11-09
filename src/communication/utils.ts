const generateRequestId = (): string => {
  if (typeof window !== 'undefined') {
    return window?.performance.now().toString(36);
  }

  return new Date().getTime().toString(36);
};

const DEFAULT_ALLOWED_ORIGINS = [
  /https:\/\/.*(gnosis-safe\.io|gnosisdev.com)/, // Safe Multisig
  /https?:\/\/localhost:\d+/, // Safe Multisig desktop app.
];

export { generateRequestId, DEFAULT_ALLOWED_ORIGINS };
