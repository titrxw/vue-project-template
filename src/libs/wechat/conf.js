import store from '../../store/store'
export default {
  conf () {
    return {
      debug: true,
      appId: store.getters['appId'],
      timestamp: store.getters['timestamp'],
      nonceStr: store.getters['nonceStr'],
      signature: store.getters['signature'],
      jsApiList: [
        'checkJsApi',
        'chooseImage',
        'getLocation',
        'chooseWXPay'
        // 'onMenuShareTimeline',
        // 'onMenuShareAppMessage',
        // 'onMenuShareQQ',
        // 'onMenuShareWeibo',
        // 'hideMenuItems',
        // 'showMenuItems',
        // 'hideAllNonBaseMenuItem',
        // 'showAllNonBaseMenuItem',
        // 'translateVoice',
        // 'startRecord',
        // 'stopRecord',
        // 'onRecordEnd',
        // 'playVoice',
        // 'pauseVoice',
        // 'stopVoice',
        // 'uploadVoice',
        // 'downloadVoice',
        // 'chooseImage',
        // 'previewImage',
        // 'uploadImage',
        // 'downloadImage',
        // 'getNetworkType',
        // 'openLocation',
        // 'getLocation',
        // 'hideOptionMenu',
        // 'showOptionMenu',
        // 'closeWindow',
        // 'scanQRCode',
        // 'chooseWXPay',
        // 'openProductSpecificView',
        // 'addCard',
        // 'chooseCard',
        // 'openCard'
      ]
    }
  },
  oauthConfOfUserInfo () {
    return {
      redirectUrl: '',
      scope: 'snsapi_userinfo'
    }
  },
  oauthConfOfBase () {
    return {
      redirectUrl: '',
      scope: 'snsapi_base'
    }
  }
}
