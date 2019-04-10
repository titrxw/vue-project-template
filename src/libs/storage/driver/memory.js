export default class Memery {
  data = {}
  prefx = ''
  constructor(prefx = '') {
    this.data = {}
    this.prefx = prefx
  }
  getKey (key) {
    return this.prefx + key
  }
  set(key, value) {
    if (!value) {
      return false;
    }
    this.data[this.getKey(key)] = value
  }
  get(key) {
    return this.data[this.getKey(key)]
  }
  rm(key) {
    delete this.data[this.getKey(key)]
  }
  clear () {
    this.data = {}
  }
}
