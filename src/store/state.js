const state = {
  netStatus: '',
  msg: '',
  userType: sessionStorage.getItem('userType') || 1,
  openId: sessionStorage.getItem('openId') || '',
  state: '',
  // 第一次进行认证操作
  firstUserAuth: true,
  userAuthStatus: 1,
  userInfo: {}
}

export default state
