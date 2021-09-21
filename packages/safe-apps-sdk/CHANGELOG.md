# @gnosis.pm/safe-apps-sdk

## 4.3.0

### Minor Changes

- 035159a: Add txs.signMessage method that triggers a call to SignMessageLib

### Patch Changes

- 5286af8: fix missing context on signature checks
- 8777635: Don't accept bytes for signing, use hashMessage from ethers (eip-191)

## 4.3.0-next.2

### Patch Changes

- 8777635: Don't accept bytes for signing, use hashMessage from ethers (eip-191)

## 4.3.0-next.1

### Patch Changes

- 5286af8: fix missing context on signature checks

## 4.3.0-next.0

### Minor Changes

- 035159a: Add txs.signMessage method that triggers a call to SignMessageLib

## 4.2.0

### Minor Changes

- 4108134: Add owners and threshold to SafeInfo type"

## 4.1.0

### Minor Changes

- 9f91d38: Add getTransactionCount eth rpc method
- f9d1a18: Support eth_gasPrice rpc method

## 4.1.0-next.1

### Minor Changes

- f9d1a18: Support eth_gasPrice rpc method

## 4.1.0-next.0

### Minor Changes

- 9f91d38: Add getTransactionCount eth rpc method
