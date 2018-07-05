import Memory from './memory'
export default class Local extends Memory{
  set(key, value) {
    super.set(key, value)
    if (typeof value == 'object' || typeof value == 'array') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(super.getKey(key), value)
  }
  get(key) {
    let value = super.get(key)
    if (!(value != null && value != undefined && value != '')) {
      value = localStorage.getItem(super.getKey(key))
      try {
        value = JSON.parse(value)
      } catch (e) {
        value = value
      }
      super.set(key, value)
    }

    return value
  }
  delete(key) {
    super.delete(key)
    localStorage.removeItem(super.getKey(key))
  }
}