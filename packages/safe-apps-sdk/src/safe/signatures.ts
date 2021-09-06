import { ethers } from 'ethers';
import { BytesLike } from '../types';

const MAGIC_VALUE = '0x1626ba7e';
const MAGIC_VALUE_BYTES = '0x20c13b0b';

const EIP_1271_INTERFACE = new ethers.utils.Interface([
  'function isValidSignature(bytes32 _dataHash, bytes calldata _signature) external view',
]);
const EIP_1271_BYTES_INTERFACE = new ethers.utils.Interface([
  'function isValidSignature(bytes calldata _data, bytes calldata _signature) public view',
]);

const calculateMessageHash = (message: BytesLike): string => {
  if (typeof message === 'string') {
    message = ethers.utils.toUtf8Bytes(message);
  }

  return ethers.utils.keccak256(message);
};

export { EIP_1271_INTERFACE, EIP_1271_BYTES_INTERFACE, MAGIC_VALUE, MAGIC_VALUE_BYTES, calculateMessageHash };
