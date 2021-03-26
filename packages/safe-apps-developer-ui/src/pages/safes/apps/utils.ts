const isAppManifestValid = (appInfo: Record<string, string>): boolean =>
  // `appInfo` exists and `name` exists
  !!appInfo?.name &&
  // if `name` exists is not 'unknown'
  appInfo.name !== 'unknown' &&
  // `description` exists
  !!appInfo.description &&
  // no `error` (or `error` undefined)
  !appInfo.error;

export { isAppManifestValid };
