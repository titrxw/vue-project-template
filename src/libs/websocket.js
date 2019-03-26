export default class MyWebSocket {
    host = null;

    _onError = null;
    _onConnect = null;
    _onClose = null;
    _onMessage = null;
    _handle = null;
    _tryNum = 0;
    _hasTryNum = 0;
    _isHeartBeat = true;
    _heartBeatInterval = 25000;
    _pongHandle = null
    _pingHandle = null;
    _reconnectInterval = 600;


    constructor(tryNum = 3, heartBeat = true) {
        this._tryNum = tryNum
        this._isHeartBeat = heartBeat
    }

    setHeartBeatInterval(interval) {
        this._heartBeatInterval = interval
    }

    setReconnectInterval(interval) {
        this._reconnectInterval = interval
    }

    startHeartbeat() {
        if (!this._isHeartBeat) {
            return false
        }
        this._pingHandle = setInterval(() => {
            this.send('ping')
            this._pongHandle = setTimeout(() => {
                this._handle.close({
                    reason: 'abnormal'
                })
            }, 5000)
        }, this._heartBeatInterval)
    }

    stopHeartbeat() {
        if (!this._isHeartBeat) {
            return false
        }
        clearInterval(this._pingHandle)
        this._pingHandle = null
        this.checkPong()
    }

    checkPong() {
        if (this._pongHandle) {
            clearTimeout(this._pongHandle);
            this._pongHandle = null;
        }
    }

    onConnect(callback) {
        this._onConnect = callback;
    }

    onClose(callback) {
        this._onClose = callback;
    }

    onError(callback) {
        this._onError = callback;
    }

    onMessage(callback) {
        this._onMessage = callback;
    }

    connect(url) {
        if (this._handle) {
            return true;
        }

        this.host = url

        this._handle = new WebSocket(url);
        this._handle.onerror = (event) => {
            this._handle = null
            this._onError && this._onError(event);
        };
        //与WebSocket建立连接
        this._handle.onopen = (event) => {
            this._hasTryNum = 0
            this.startHeartbeat()
            this._onConnect && this._onConnect(event);
        };
        //处理服务器返回的信息
        this._handle.onmessage = (event) => {
            this.checkPong()
            this._onMessage && this._onMessage(event.data);
        };
        this._handle.onclose = (event) => {
            this._handle = null
            this.stopHeartbeat()
            if (event.reason != 'client-close') {
                if (this._tryNum <= 0) {
                    this._onClose && this._onClose(event);
                } else {
                    this.reConnect()
                }
            } else {
                this._hasTryNum = 0
            }
        };
    }

    send(data) {
        if (!this._handle) {
            return false
        }
        if (typeof data == 'object') {
            data = JSON.stringify(data)
        }
        this._handle.send(data)
    }

    close() {
        this._handle.close({
            reason: 'client-close'
        })
    }

    reConnect() {
        let reconTimer = setTimeout(() => {
            if (this._hasTryNum == this._tryNum) {
                this._onClose && this._onClose({
                    reason: 'abnormal'
                });
                return false
            }

            ++this._hasTryNum
            this.connect(this.host)

            clearTimeout(reconTimer)
        }, this._reconnectInterval)
    }
}