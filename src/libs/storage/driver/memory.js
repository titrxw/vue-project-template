export default class Memery {
  static data = {}
  static set (key, value) {
    this.data[key] = value
  }
  static get (key) {
    return this.data[key]
  }
  static delete(key) {
    delete this.data[key]
  }
}