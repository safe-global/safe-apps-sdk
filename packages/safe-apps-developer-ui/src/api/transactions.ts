import { getSafeContract, getMultiSendContract } from 'src/api/safeContracts';
import MultiSendSol from '@gnosis.pm/safe-contracts/build/contracts/MultiSend.json';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { ethers } from 'ethers';

const CALL = 0;
const DELEGATE_CALL = 1;

export const getTransactionHash = async (
  signer: ethers.providers.JsonRpcSigner,
  { baseGas, data, gasPrice, gasToken, nonce, operation, refundReceiver, safeTxGas, sender, to, valueInWei },
): Promise<string> => {
  const safeInstance = getSafeContract(safeAddress, signer);

  const txHash = await safeInstance.getTransactionHash(
    to,
    valueInWei,
    data,
    operation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    nonce,
  );

  return txHash;
};

const approveTransaction = (signer: ethers.providers.JsonRpcSigner) => {};

const encodeMultiSendCall = (
  signer: ethers.providers.JsonRpcSigner,
  multiSendAddress: string,
  txs: Transaction[],
): string => {
  const multiSend = getMultiSendContract(multiSendAddress, signer);

  const joinedTxs = txs
    .map((tx) => {
      const data = ethers.utils.arrayify(tx.data);
      const encoded = ethers.utils.solidityPack(
        ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
        [0, tx.to, tx.value, data.length, data],
      );
      return encoded.slice(2);
    })
    .join('');

  const encodedMultiSendCallData = multiSend.interface.encodeFunctionData('multiSend', [`0x${joinedTxs}`]);

  return encodedMultiSendCallData;
};

export { CALL, DELEGATE_CALL, encodeMultiSendCall };
