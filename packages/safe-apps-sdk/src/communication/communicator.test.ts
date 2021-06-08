import { SDKMessageEvent } from './../types/messaging';
import { Methods } from './methods';
import PostMessageCommunicator from './';
import { MessageFormatter } from './messageFormatter';

describe('PostMessageCommunicator', () => {
  // /* eslint-disable-next-line */
  // let spy: jest.SpyInstance<void, [message: any, targetOrigin: string, transfer?: Transferable[] | undefined]>;

  // beforeEach(() => {
  //   spy = jest.spyOn(window.parent, 'postMessage');
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  test('Throws in case of an error response', async () => {
    const messageHandler = (event: SDKMessageEvent) => {
      const requestId = event.data.id;
      const response = MessageFormatter.makeErrorResponse(requestId, 'Problem processing the request', '1.0.0');

      window.parent.postMessage(response, '*');
    };
    window.parent.addEventListener('message', messageHandler);

    const communicator = new PostMessageCommunicator();
    // const message = communicator.send(Methods.getSafeInfo, undefined);

    await expect(communicator.send(Methods.getSafeInfo, undefined)).rejects.toThrow('Problem processing request');
    window.removeEventListener('message', messageHandler);
    // expect(spy).toHaveBeenCalledWith(expect.objectContaining({ method: Methods.getSafeInfo, params: undefined }), '*');
  });
});
