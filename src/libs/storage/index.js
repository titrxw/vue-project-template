import Session from './driver/session'
import Local from './driver/local'
import Memory from './driver/memory'
export default class Storage {
  static session = Session
  static local = Local

  static set (key, value) {
    Memory.set(key, value)
  }
  static get (key) {
    return Memory.get(key)
  }
  static delete(key) {
    Memory.delete(key)
  }
}