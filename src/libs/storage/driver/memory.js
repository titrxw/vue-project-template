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
    this.data[this.getKey(key)] = value
  }
  get(key) {
    return this.data[this.getKey(key)]
  }
  delete(key) {
    delete this.data[this.getKey(key)]
  }
}
