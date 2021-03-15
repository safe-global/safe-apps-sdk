import GnosisSafeSol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafe.json';
import ProxyFactorySol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafeProxyFactory.json';
import FallbackHandlerSol from '@gnosis.pm/safe-contracts/build/contracts/FallbackManager.json';
import { JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ContractFactory } from 'ethers';

// const getProxyFactorySol = () => {};

const deployMasterCopy = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(GnosisSafeSol.abi, GnosisSafeSol.bytecode, signer);
  const masterCopy = await factory.deploy();

  return masterCopy;
};

const deployProxyFactory = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(ProxyFactorySol.abi, ProxyFactorySol.bytecode, signer);
  const proxyFactory = await factory.deploy();

  return proxyFactory;
};

const deployFallbackHandler = async (signer: JsonRpcSigner): Promise<Contract> => {
  const factory = new ContractFactory(FallbackHandlerSol.abi, FallbackHandlerSol.bytecode, signer);
  const fallbackHandler = await factory.deploy();

  return fallbackHandler;
};

export { deployProxyFactory, deployFallbackHandler, deployMasterCopy };
