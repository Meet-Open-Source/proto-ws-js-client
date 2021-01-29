import SockJS from "sockjs-client";

export class Ws {
    private socket: WebSocket;
    private reconnectInterval: NodeJS.Timeout;

    constructor() {
        this.connect();
    }

    connect = () => {
        this.socket = new SockJS('http://localhost:9999/test');
        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
    }

    onOpen = () => {
        clearInterval(this.reconnectInterval);
        console.log("log: open");
    }

    onClose = () => {
        console.log("log: close");
        this.reconnect();
    }

    onMessage = () => {
        console.log("log: message");
    }

    reconnect = () => {
        if (this.reconnectInterval) {
            return;
        }
        this.reconnectInterval = setInterval(this.connect, 1000);
    }

    send = (data: any) => {
        console.log("log: data", data);
    }
}
