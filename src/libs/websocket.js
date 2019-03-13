class MyWebSocket {
    _onError = null;
    _onConnect = null;
    _onClose = null;
    _onMessage = {};
    _handle = null;

    setOnConnect(callback) {
        this._onConnect = callback;
    }
    setOnError(callback) {
        this._onError = callback;
    }
    setOnClose(callback) {
        this._onClose = callback;
    }
    setOnMessage(callback, index = 1) {
        this._onMessage[index] = callback;
    }

    connect(host) {
        if (this._handle) {
            return true;
        }

        this._handle = new WebSocket(host);
        this._handle.onerror = (event) => {
            this._handle = null
            this._onError && this._onError(event);
        };
        //与WebSocket建立连接
        this._handle.onopen = (event) => {
            this._onConnect && this._onConnect(event);
        };
        //处理服务器返回的信息
        this._handle.onmessage = (event) => {
            let callback = Object.values(this._onMessage)
            callback.reduce(function(data, curCallback) {
                return curCallback(data)
            }, event.data)
        };
        this._handle.onclose = (event) => {
            this._handle = null
            this._onClose && this._onClose(event);
        };
    }
    send(data) {
        if (typeof data == 'object') {
            data = JSON.stringify(data)
        }
        this._handle.send(data)
    }
    close() {
        this._handle.close()
    }
}