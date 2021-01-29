import SockJS from 'sockjs-client';
import { WsError, WsMessage, WsRequest } from "proto-ws-shared-structs";
const callbacks = new Map();
//todo create a timer for cleaning the callbacks (configurable timout - default 30sec)
let index = 0;
const sock = new SockJS('http://localhost:8000/echo');
sock.onopen = function () {
    console.log('open');
};
sock.onmessage = function (event) {
    var _a;
    const wsMessage = event.data;
    const index = wsMessage.getIndex();
    const callback = callbacks.get(index);
    if (callback) {
        if (wsMessage.hasError()) {
            callback(wsMessage.getError(), null);
        }
        if (wsMessage.hasResponse()) {
            callback(null, (_a = wsMessage.getResponse()) === null || _a === void 0 ? void 0 : _a.getPayload());
        }
    }
};
sock.onclose = function () {
    console.log('close');
};
export function serviceInterceptor(serviceName, requestData, callback) {
    index++;
    try {
        const message = new WsMessage();
        message.setService(serviceName);
        message.setIndex(index);
        const request = new WsRequest();
        request.setAccesstoken("todo");
        request.setPayload(requestData);
        message.setRequest(request);
        callbacks.set(index, callback);
        sock.send(message.serializeBinary());
    }
    catch (exception) {
        console.error(exception);
        callbacks.delete(index);
        const error = new WsError();
        error.setMessage(exception.toString());
        callback(error, null);
    }
}
