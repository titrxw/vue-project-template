class MyWebSocket {
  _onError = null;
  _onConnect = null;
  _onMessage = null;
  _handle = null;

  setOnConnect(callback) {
    this._onConnect = callback;
  }
  setOnError(callback) {
    this._onError = callback;
  }
  setOnMessage(callback) {
    this._onMessage = callback;
  }

  connect(host) {
    if (this._handle) {
      return true;
    }
    let that = this
    this.handle = new WebSocket(host);
    this.handle.onerror = function (event) {
      that._onError && that._onError(event);
    };
    //与WebSocket建立连接
    this.handle.onopen = function (event) {
      that._onConnect && that._onConnect(event);
    };
    //处理服务器返回的信息
    this.handle.onmessage = function (event) {
      that._onMessage && that._onMessage(event);
    };
  }
  send(data) {
    if (typeof data == 'object') {
      data = JSON.stringify(data)
    }
    this.handle.send(data)
  }
}

export default {
  install: function (Vue) {
    Vue.prototype.$websocket = new MyWebSocket()
  }
}
