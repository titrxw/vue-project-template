import Memory from './memory'
export default class Session extends Memory {
  set(key, value, expire = 0) {
    if (!value) {
      return false;
    }
    super.set(key, value)
    if (typeof value == 'object' || typeof value == 'array') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(super.getKey(key), value)
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
      expire = JSON.parse(localStorage.getItem(super.getKey(key +'-expire')))
    } catch (e) {
      expire = null
    }
    if (expire) {
      let ctime = new Date().valueOf();
      if (ctime - expire.cur > expire.expire) {
        this.rm(key)
        return _default
      } else {
        this.set(key +'-expire', {
          cur: new Date().valueOf(),
          expire: expire.expire
        })
      }
    }

    let value = super.get(key)
    if (!value) {
      let tmp = localStorage.getItem(super.getKey(key))
      try {
        value = JSON.parse(tmp)
      } catch (e) {
        value = tmp
      }
      if (!value) {
        value = _default
      }
      super.set(key, value)
    }

    return value
  }
  rm(key) {
    super.rm(key)
    localStorage.removeItem(super.getKey(key))
    localStorage.removeItem(super.getKey(key +'-expire'))
  }
  clear () {
    super.clear()
    localStorage.clear()
  }
}
