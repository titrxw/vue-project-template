import Memory from './memory'
export default class Session extends Memory {
  set(key, value, expire = 0) {
    if (!value) {
      return false;
    }
    super.set(key, value)
    key = super.getKey(key)
    if (typeof value == 'object' || typeof value == 'array') {
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(key, value)
    if (expire > 0) {
      this.set(key +'-expire', {
        cur: new Date().valueOf(),
        expire: expire
      })
    }
  }
  get(key, _default) {
    let expire = null
    try{
      expire = JSON.parse(sessionStorage.getItem(super.getKey(key) +'-expire'))
    } catch (e) {
      expire = null
    }
    if (expire) {
      let ctime = new Date().valueOf();
      if (ctime - expire.cur > expire.expire) {
        this.rm(key)
        return _default
      }
    }

    let value = super.get(key)
    if (!value) {
      try {
        value = JSON.parse(sessionStorage.getItem(super.getKey(key)))
      } catch (e) {
        value = _default
      }
      if (!value) {
        data = _default
      }
      super.set(key, value)
    }

    return value
  }
  rm(key) {
    super.rm(key)
    sessionStorage.removeItem(super.getKey(key))
    sessionStorage.removeItem(super.getKey(key) +'-expire')
  }
}
