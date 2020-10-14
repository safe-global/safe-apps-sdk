import initSdk from 'src/index';
import { SDK_MESSAGES } from 'src/communication/messageIds';

describe('Safe Apps SDK Read RPC Requests', () => {
  const sdkInstance = initSdk([/http:\/\/localhost:3000/]);

  describe('call', () => {
    it('Should send a valid message to the interface', () => {
      const requestId = '1000';
    });
  });

  describe('getBalance', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getCode', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getPastLogs', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getBlockByHash', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getBlockByNumber', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getStorageAt', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getTransactionByHash', () => {
    it('Should send a valid message to the interface', () => {});
  });

  describe('getTransactionReceipt', () => {
    it('Should send a valid message to the interface', () => {});
  });
});
