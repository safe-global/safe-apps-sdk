import { SDKMessageToPayload, SDKMessageIds, SentSDKMessage, RequestId } from '../types';

const sendMessageToInterface = <T extends SDKMessageIds>(
  messageId: T,
  data: SDKMessageToPayload[T],
  requestId?: RequestId,
): SentSDKMessage<T> => {
  if (!requestId) {
    if (typeof window !== 'undefined') {
      requestId = Math.trunc(window?.performance.now());
    } else {
      requestId = Math.trunc(Date.now());
    }
  }
  const message = {
    messageId,
    requestId,
    data,
  };

  if (typeof window !== 'undefined') {
    window.parent.postMessage(message, '*');
  }

  return message;
};

export { sendMessageToInterface };
export * from './messageIds';
