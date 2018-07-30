/**
 * 推荐使用store.js
 */

import Session from './driver/session'
import Local from './driver/local'
import Memory from './driver/memory'
class Storage {
  static default
  static session
  static local
  static prefx = ''

  constructor(prefx = '') {
    this.prefx = prefx
  }

  get session () {
    if (Storage.session) {
      return Storage.session
    }
    Storage.session = new Session(this.prefx)
    return Storage.session
  }

  get local () {
    if (Storage.local) {
      return Storage.local
    }
    Storage.local = new Local(this.prefx)
    return Storage.local
  }

  get default () {
    if (Storage.default) {
      return Storage.default
    }
    Storage.default = new Memory(this.prefx)
    return Storage.default
  }

  set (key, value) {
    this.default.set(key, value)
  }
  get (key) {
    return this.default.get(key)
  }
  delete(key) {
    this.default.delete(key)
  }
}

export default new Storage('c')