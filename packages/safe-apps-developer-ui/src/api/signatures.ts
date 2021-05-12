import { EMPTY_DATA } from 'src/utils/strings';

const getPreValidatedSignature = (from: string, startStr: string = EMPTY_DATA): string => {
  return `${startStr}000000000000000000000000${from.replace(
    EMPTY_DATA,
    '',
  )}000000000000000000000000000000000000000000000000000000000000000001`;
};

export { getPreValidatedSignature };
