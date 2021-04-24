const isAppManifestValid = (appInfo: Record<string, string>): boolean =>
  // `appInfo` exists and `name` exists
  !!appInfo?.name &&
  // if `name` exists is not 'unknown'
  appInfo.name !== 'unknown' &&
  // `description` exists
  !!appInfo.description;

enum AppState {
  notAsked = 'notAsked',
  loading = 'loading',
  invalidUrl = 'invalidUrl',
  invalidManifest = 'invalidManifest',
  loaded = 'loaded',
  failed = 'failed',
}

export { isAppManifestValid, AppState };
