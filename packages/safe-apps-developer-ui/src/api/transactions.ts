import { ZERO_ADDRESS } from 'src/utils/strings';
import { SignedProposedTx } from './../types/transaction';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { ethers } from 'ethers';
import { getSafeContract, getMultiSendContract } from 'src/api/safeContracts';
import { ProposedTx, CreateTransactionArgs } from 'src/types/transaction';
import { getPreValidatedSignature } from './signatures';
import { getSafeNonce } from './safe';

const CALL = 0;
const DELEGATE_CALL = 1;

const executeTransaction = async (
  signer: ethers.providers.JsonRpcSigner,
  safeAddress: string,
  { baseGas, data, gasPrice, gasToken, operation, refundReceiver, safeTxGas, to, valueInWei, sigs }: SignedProposedTx,
): Promise<ethers.ContractTransaction> => {
  const safeInstance = getSafeContract(safeAddress, signer);
  const execution = await safeInstance.execTransaction(
    to,
    valueInWei,
    data,
    operation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    sigs,
  );

  return execution;
};

const getTransactionHash = async (
  signer: ethers.providers.JsonRpcSigner,
  safeAddress: string,
  {
    baseGas,
    data,
    gasPrice,
    gasToken,
    nonce,
    operation,
    refundReceiver,
    safeTxGas,
    to,
    valueInWei,
  }: ProposedTx & { nonce: ethers.BigNumberish },
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

const createTransaction = async (
  signer: ethers.providers.JsonRpcSigner,
  safeAddress: string,
  sender: string,
  {
    baseGas = 0,
    data,
    gasPrice = 0,
    gasToken = ZERO_ADDRESS,
    operation = CALL,
    refundReceiver = ZERO_ADDRESS,
    safeTxGas = 0,
    to,
    valueInWei,
  }: CreateTransactionArgs,
): Promise<{ safeTxHash: string; tx: ethers.ContractTransaction }> => {
  const senderSignature = getPreValidatedSignature(sender);
  const safeNonce = await getSafeNonce(signer, safeAddress);

  const tx = {
    baseGas,
    data,
    gasPrice,
    gasToken,
    operation,
    refundReceiver,
    safeTxGas,
    nonce: safeNonce,
    to,
    valueInWei,
    sigs: senderSignature,
  };

  const safeTxHash = await getTransactionHash(signer, safeAddress, tx);
  const executedTx = await executeTransaction(signer, safeAddress, tx);

  return { safeTxHash, tx: executedTx };
};

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

export { CALL, DELEGATE_CALL, encodeMultiSendCall, getTransactionHash, createTransaction };
