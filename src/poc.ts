import {load, Message, Method, Root, rpc, RPCImplCallback} from "protobufjs";

import * as jspb from "google-protobuf";

import {WsError, WsEvent, WsMessage, WsRequest, WsResponse} from "proto-ws-shared-structs";


load("./proto/User.proto", function(err, root) {
    if (err) throw err;

    if (!root) throw new DOMException("")

    // example code
    const GetUserRequest = root.lookupType("io.github.proto.ws.example.GetUserRequest");


    const UserService = root.lookupService("io.github.proto.ws.example.UserService");

    UserService.define()

    const initializedService = UserService?.create(serviceInterceptor, false, false);



    initializedService?.rpcCall()

});

//socket connection class
class ServiceRouter {

    private static _instance: ServiceRouter;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    registerEventListener(serviceName: String, service: IWsService) {
        //TODO
    }

    send(msg: jspb.Message, serviceName: String, methodName: String, callback: (response: jspb.Message, error: WsError) => void): WsRequest {
        return new WsRequest();
    }
}

//We will need to do code generator for controller like this
class ExampleService implements IWsService
{
    public static readonly serviceName = "example";

    public eventCallback?: (event: WsEvent) => void

    constructor(eventCallback?: (event: WsEvent) => void) {
        ServiceRouter.Instance.registerEventListener(this.serviceName, this);
    }

    onEvent(event: WsEvent): void {
        if(this.eventCallback) this.eventCallback(event);
    }

    getUser(request: GetUserRequest, callback: (response: GetUserResponse, error: WsError) => void): WsRequest { return ServiceRouter.Instance.send(request, serviceName, "getUser", callback); }
}

interface IWsService
{
    onEvent: (event: WsEvent) => void;
}