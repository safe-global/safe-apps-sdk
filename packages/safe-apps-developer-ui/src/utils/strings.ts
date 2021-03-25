const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const EMPTY_DATA = '0x';

const upperFirst = (value: string): string => value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);

const capitalize = (value: string, prefix?: string): string => {
  if (!value) {
    return '';
  }

  if (typeof value === 'boolean') {
    return prefix || '';
  }

  if (typeof value === 'number') {
    return prefix ? `${prefix}${value}` : value;
  }

  if (typeof value !== 'string') {
    return '';
  }

  const capitalized = upperFirst(value);

  return prefix ? `${prefix}${capitalized}` : capitalized;
};

const textShortener = (text: string, charsStart: number, charsEnd: number, separator = '...'): string => {
  const amountOfCharsToKeep = charsEnd + charsStart;

  if (amountOfCharsToKeep >= text.length || !amountOfCharsToKeep) {
    // no need to shorten
    return text;
  }

  const r = new RegExp(`^(.{${charsStart}}).+(.{${charsEnd}})$`);
  const matchResult = r.exec(text);

  if (!matchResult) {
    // if for any reason the exec returns null, the text remains untouched
    return text;
  }

  const [, textStart, textEnd] = matchResult;

  return `${textStart}${separator}${textEnd}`;
};

const isValidURL = (url: string, allowedProtocols = ['https:', 'http:']): boolean => {
  try {
    const urlInfo = new URL(url);
    return allowedProtocols.includes(urlInfo.protocol);
  } catch (error) {
    return false;
  }
};

export { ZERO_ADDRESS, upperFirst, capitalize, textShortener, EMPTY_DATA, isValidURL };
