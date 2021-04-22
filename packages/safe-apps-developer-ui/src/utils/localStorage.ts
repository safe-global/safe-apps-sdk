const getFromLocalStorage = <T = unknown>(key: string): T | null => {
  const item = window.localStorage.getItem(key);

  if (item != null) {
    return JSON.parse(item);
  }

  return null;
};

const saveToStorage = (key: string, value: unknown): void => window.localStorage.setItem(key, JSON.stringify(value));

export { getFromLocalStorage, saveToStorage };
