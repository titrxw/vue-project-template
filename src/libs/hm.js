var triggers = [];


let hm = {
  getElementByXpath(path) {
    let xresult = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
    let xnodes = [];
    let xres;
    while (xres = xresult.iterateNext()) {
      xnodes.push(xres);
    }
    
    return xnodes
  },
  getEnv() {
    return {
      w: window.screen.width,
      h: window.screen.height,
      pd: window.screen.pixelDepth,
      cd: window.screen.colorDepth,
      v: window.navigator.appVersion,
      l: window.navigator.language,
      t: document.title,
      dm: document.domain,
      ln: encodeURIComponent(document.URL),
      r: document.referrer,
      c: document.cookie
    }
  },
  report (data) {
    let url = 'https://test/hm?';
    for (let key in data) {
      url += key + '=' + data[key] + '&'
    }
    
    new Image().src = url;  
  },
  trigger(e = null) {
    let info = this.getEnv()
    info['type'] = e
    this.report(info)
  },
  flag (e) {
    if (typeof e == 'array') {
      e.forEach(element => {
        if (triggers.indexOf(element.hm) < 0) {
          let target = this.getElementByXpath(element.xpath)
          if (target) {
            target.forEach(etarget => {
              etarget.setAttribute('data-hm', element.hm)
            })
            triggers.push(element.hm)
          }
        }
      });
    } else {
      if (triggers.indexOf(e.hm) < 0) {
        let target = this.getElementByXpath(e.xpath)
        if (target) {
          target.forEach(etarget => {
            etarget.setAttribute('data-hm', e.hm)
          })
          triggers.push(e.hm)
        }
      }
    }
  }
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.hm) {
    if (triggers.indexOf(e.target.dataset.hm) >= 0) {
      hm.trigger(e.target.dataset.hm)
    }
  }
});

window.onload = (e) => {
  hm.trigger('load')
}
window.onunload = (e) => {
  hm.trigger('unload')
}


export default hm