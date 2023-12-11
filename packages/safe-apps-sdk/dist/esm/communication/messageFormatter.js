import { getSDKVersion } from '../version.js';
import { generateRequestId } from './utils.js';
class MessageFormatter {
}
MessageFormatter.makeRequest = (method, params) => {
    const id = generateRequestId();
    return {
        id,
        method,
        params,
        env: {
            sdkVersion: getSDKVersion(),
        },
    };
};
MessageFormatter.makeResponse = (id, data, version) => ({
    id,
    success: true,
    version,
    data,
});
MessageFormatter.makeErrorResponse = (id, error, version) => ({
    id,
    success: false,
    error,
    version,
});
export { MessageFormatter };
//# sourceMappingURL=messageFormatter.js.map