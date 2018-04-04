import ajax from './axios'
ajax.defaults.baseURL = 'http://host.api.com'

// 微信认证获取跳转地址接口
const wechatAuthUrl = 'common/getWechatAuthUrl'

// 用户基本信息
const registerUrl = 'common/bind'
const loginUrl = 'common/login'
const personAuthUrl = 'member/personAuth'
const sendMsgUrl = 'common/sendMsg'
const personAuthDetailUrl = 'member/personAuthDetail'
const feedBackUrl = 'member/feedBack'
const unBindUrl = 'member/unbound'
const checkIsAuthUrl = 'member/getApproveStatus'
const userInfoUrl = 'member/userInfo'
const settingUrl = 'system/setting'

// 业主
const entrustContractListUrl = 'entrust/entrustContractList'
const entrustContractDetailUrl = 'entrust/entrustContractDetail'
const entrustContractDutyUrl = 'entrust/entrustContractDuty'
const entrustIntentionSaveUrl = 'Entrust/entrustIntentionSave'

//租客
const getTenantContractManagerUrl = 'tenant/getContractManager';
const tenantContractListUrl = 'tenant/tenantContractList'
const billListUrl = 'tenant/billList'
const billDetailUrl = 'tenant/billDetail'
const splitBillUrl = 'tenant/splitBill'
const getStaffInfoUrl = 'tenant/getStaffInfo'
const tenantBillFriendPayUrl = 'tenant/tenantBillFriendPay'
const beforeFriendPayUrl = 'common/beforeFriendPay'
const tenantBillPayUrl = 'tenant/tenantBillPay'
const friendPayUrl = 'common/friendPay'


//委托意向
const entrustIntentionListUrl = 'Entrust/entrustIntentionList';
const entrustIntentionDetailUrl = 'Entrust/entrustIntentionDetail';

// face++识别接口
const faceAuthCardUrl = 'https://api-cn.faceplusplus.com/cardpp/v1/ocridcard'

// 房源
const houseListUrl = 'house/houseList'
const houseDetailUrl = 'house/houseDetail'
const houseBaseInfoUrl = 'house/houseInfo'

// 约看
const bespeakListUrl = 'housesee/houseSeeList'
const addBespeakUrl = 'housesee/houseSeeAdd'
const calcelBespeakUrl = 'housesee/houseSeeCancel'
const deleteBespeakUrl = 'housesee/houseSeeDelete'

// 求租
const addSocilitUrl = 'housesee/houseSolicit'


// 专题
const specialListUrl = 'content/contentList'
const specialDetailUrl = 'content/contentDetail'

// 承租
const tenantContractDetailUrl = 'tenant/tenantContractDetail'

// 门锁
const getLocksUrl = 'member/getLockInfo'
const changeLockPasswordUrl = 'member/changeLockPassword'
const getDynamicPwdUrl = 'member/getDynamicPassword'
const openLockUrl = 'member/openLock'
const getTemporaryPasswordUrl = 'member/getTemporaryPassword'
const changeLockStatusUrl = 'member/changeLockStatus'
const clearAllPasswordUrl = 'member/clearAllPassword'
const getOpenRecordUrl = 'member/getOpenRecord'

// 签约
const getSigningInfoUrl = 'house/getSigningInfo'

export default {
  // 微信认证获取跳转路径接口
  wechatAuth (params) {
    return ajax.post(wechatAuthUrl, params)
  },
  sendMsg (params) {
    return ajax.post(sendMsgUrl, params)
  },
  register (params) {
    return ajax.post(registerUrl, {form: params})
  },
  login () {
    return ajax.post(loginUrl, {
      openid: sessionStorage.getItem('openId')
    })
  },
  upload (params) {
    return ajax.post(uploadUrl, params)
  },
  personAuth (params) {
    return ajax.post(personAuthUrl, {form: params})
  },
  personAuthDetail () {
    return ajax.post(personAuthDetailUrl)
  },
  feedBack (params) {
    return ajax.post(feedBackUrl, {form: params})
  },
  unBind () {
    return ajax.post(unBindUrl)
  },
  checkIsAuth () {
    return ajax.post(checkIsAuthUrl)
  },
  userInfo () {
    return ajax.post(userInfoUrl)
  },
  
  //业主
  entrustContractList (params) {
    return ajax.post(entrustContractListUrl, params)
  },
  entrustContractDetail (params) {
    return ajax.post(entrustContractDetailUrl, params)
  },
  entrustContractDuty (params) {
    return ajax.post(entrustContractDutyUrl, params)
  },
  
  
  //租客let 
  getTenantContractManager (params) {
    return ajax.post(getTenantContractManagerUrl, params);
  },
  tenantContractList (params) {
    return ajax.post(tenantContractListUrl, {form: params})
  },
  billList (params) {
    return ajax.post(billListUrl, {form: params})
  },
  billDetail (params) {
    return ajax.post(billDetailUrl, params)
  },
  splitBill (params) {
    return ajax.post(splitBillUrl, {form: params})
  },
  entrustIntentionSave (params) {
    return ajax.post(entrustIntentionSaveUrl, {form: params})
  },
  getStaffInfo () {
    return ajax.post(getStaffInfoUrl)
  },
  tenantBillFriendPay (params) {
    return ajax.post(tenantBillFriendPayUrl, params)
  },
  beforeFriendPay (params) {
    return ajax.post(beforeFriendPayUrl, params)
  },
  tenantBillPay (params) {
    return ajax.post(tenantBillPayUrl, params)
  },
  friendPay (params) {
    return ajax.post(friendPayUrl, params)
  },
  setting (params) {
    return ajax.post(settingUrl, params)
  },
  
  //委托意向
  entrustIntentionDetail (params) {
    return ajax.post(entrustIntentionDetailUrl, params)
  },
  entrustIntentionList (params) {
    return ajax.post(entrustIntentionListUrl, params)
  },
  faceAuthCard (params) {
    return ajax.post(faceAuthCardUrl, params)
  },

  // 房源
  houseList (params) {
    return ajax.post(houseListUrl, params)
  },
  houseDetail (params) {
    return ajax.post(houseDetailUrl, params)
  },
  houseBaseInfo (params) {
    return ajax.post(houseBaseInfoUrl, params)
  },

  //约看
  bespeakList (params) {
    return ajax.post(bespeakListUrl, {form: params})
  },
  addBespeak (params) {
    return ajax.post(addBespeakUrl, {form: params})
  },
  calcelBespeak (params) {
    return ajax.post(calcelBespeakUrl, params)
  },
  deleteBespeak (params) {
    return ajax.post(deleteBespeakUrl, params)
  },

  // 求租
  addSocilit (params) {
    return ajax.post(addSocilitUrl, {form: params})
  },
  
  // 专题
  specialList () {
    return ajax.post(specialListUrl)
  },
  specialDetail (params) {
    return ajax.post(specialDetailUrl, params)
  },

  // 承租
  tenantContractDetail (params) {
    return ajax.post(tenantContractDetailUrl, params)
  },

  // 门锁
  getLocks () {
    return ajax.post(getLocksUrl)
  },
  changeLockPassword (params) {
    return ajax.post(changeLockPasswordUrl, {form: params})
  },
  getDynamicPwd (params) {
    return ajax.post(getDynamicPwdUrl, {form: params})
  },
  openLock (params) {
    return ajax.post(openLockUrl, params)
  },
  getTemporaryPassword (params) {
    return ajax.post(getTemporaryPasswordUrl, params)
  },
  changeLockStatus (params) {
    return ajax.post(changeLockStatusUrl, {form: params})
  },
  clearAllPassword (params) {
    return ajax.post(clearAllPasswordUrl, params)
  },
  getOpenRecord (params) {
    return ajax.post(getOpenRecordUrl, params)
  },

  // 签约信息
  getSigningInfo (params) {
    return ajax.post(getSigningInfoUrl, params)
  }
}
