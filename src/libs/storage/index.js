import Session from './driver/session'
import Local from './driver/local'
import Memory from './driver/memory'
export default class Storage {
  static session = Session
  static local = Local
  static default = Memory

  static set (key, value) {
    this.default.set(key, value)
  }
  static get (key) {
    return this.default.get(key)
  }
  static delete(key) {
    this.default.delete(key)
  }
}
