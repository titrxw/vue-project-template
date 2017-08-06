class Api {
  _apis = {}
  registerApi (name, func) {
    this._apis[name] = func
  }
  chooseImage () {
    return function (obj, callback) {
      if (obj.wx === null) {
        callback(null)
      }
      obj.wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          callback(res)
        }
      })
    }
  }
  getLoaction () {
    return function (obj, callback) {
      if (obj.wx === null) {
        callback(null)
      }
      obj.wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          callback(res)
        }
      })
    }
  }
  chooseWXPay () {
    return function (obj, callback) {
      if (obj.wx !== null && obj.args !== null) {
        obj.wx.chooseWXPay({
          timestamp: obj['args']['timestamp'],
          nonceStr: obj['args']['nonceStr'],
          package: obj['args']['package'],
          signType: obj['args']['signType'],
          paySign: obj['args']['paySign'],
          success: function (res) {
            callback(res)
          }
        })
      } else {
        callback(null)
      }
    }
  }
}
let api = new Api()
api.registerApi('chooseImage', api.chooseImage())
api.registerApi('getLoaction', api.getLoaction())
api.registerApi('chooseWXPay', api.chooseWXPay())
export default api._apis
