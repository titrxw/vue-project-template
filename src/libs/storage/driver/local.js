export default class Local {
  set(key, value, expire = 0) {
    if (!value) {
      return false;
    }
    if (typeof value == "object" || typeof value == "array") {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
    if (expire > 0) {
      this.set(key + '-expire', new Date().valueOf() + expire)
    }
  }
  get(key, _default) {
    let expire = localStorage.getItem(key + '-expire')
    if (expire) {
      let ctime = new Date().valueOf();
      if (ctime > expire) {
        this.rm(key)
        return _default
      }
    }

    let value = null
    let tmp = localStorage.getItem(key)
    try {
      value = JSON.parse(tmp)
    } catch (e) {
      value = tmp
    }
    if (!value) {
      value = _default
    }

    return value
  }
  rm(key) {
    localStorage.removeItem(key)
    localStorage.removeItem(key + '-expire')
  }
  clear() {
    localStorage.clear()
  }
}
