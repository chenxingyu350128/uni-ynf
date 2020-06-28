import Utils from '../../utils/storageMw.js'
const state = {
  image: Utils.getLocal('image') || '',
  realName: Utils.getLocal('realName') || '',
  token: Utils.getLocal('token') || '',
  userId: Utils.getLocal('userId') || 0,
  userName: Utils.getLocal('userName') || '',
  userType: Utils.getLocal('userType') || 0,
  tabbarIndex: Utils.getLocal('tabbarIndex') || 0,
  origin: Utils.getLocal('origin'),
  env: Utils.getLocal('env'),
  loading: !!Utils.getLocal('loading'),
  // 搜索
  searchList: Utils.getLocal('searchList') || [],
  current_key: Utils.getLocal('current_key') || '',
  // 订单确认数据
  orderConfirmData: Utils.getLocal('orderConfirmData'),
  cartIdsInOrder: Utils.getLocal('cartIdsInOrder'),
  newAddressData: Utils.getLocal('newAddressData'),
  cartGoods: Utils.getLocal('cartGoods') || [],
  addressList: Utils.getLocal('addressList') || [],
  couponList: Utils.getLocal('couponList') || [],
  addressBackFlag: Utils.getLocal('addressBackFlag'),
  newAddress: Utils.getLocal('newAddress'),
  newCoupon: Utils.getLocal('newCoupon'),
  orderToPay: Utils.getLocal('orderToPay') // addOrderSubmit创建订单需要的data
}

const mutations = {
  SET_LOADING: (state, res) => { // state不可或缺，不因没用到就省去
    Utils.setLocal('loading', res)
    state.loading = res
  },
  SET_ORIGIN: (state, res) => {
    Utils.setLocal('origin', res)
    state.origin = res
  },
  NEW_BUILD_ADDRESS: (state, res) => {
    Utils.setLocal('newAddressData', res)
    state.newAddressData = res
  },
  SELECT_ADDRESS_FOR_ORDER: (state, res) => {
    Utils.setLocal('newAddress', res)
    state.newAddress = res
  },
  SELECT_COUPON_FOR_ORDER: (state, res) => {
    Utils.setLocal('newCoupon', res)
    state.newCoupon = res
  },
  SET_ENV: (state, res) => {
    Utils.setLocal('env', res)
    state.env = res
  },
  BOTTOM_NAV_INDEX: (state, res) => {
    Utils.setLocal('tabbarIndex', res)
    state.tabbarIndex = res
  },
  XHR_401: (state) => {
    const arr = [
      'image',
      'realName',
      'token',
      'userId',
      'userName',
      'userType'
    ]
    arr.forEach(res => {
      Utils.clearLocal(state, res)
      state[res] = null
    })
  },
  SET_EACH_USER_INFO: (state, res) => {
    for (const x in res) {
      Utils.setLocal(x, res[x])
      state[x] = res[x]
    }
    // state.loading = res
  },
  ADD_SEARCH: (state, res) => {
    console.log(state, res)
    if (state.searchList.indexOf(state, res) !== -1) {
      return
    }
    const searchList = state.searchList
    searchList.unshift(res)
    Utils.setLocal('searchList', searchList)
    // console.log('res:', res)
    state.searchList = searchList
  },
  CLEAR_SEARCH: () => {
    Utils.setLocal('searchList', [])
    state.searchList = []
  },
  SET_CURRENT_SEARCH: (state, res) => {
    Utils.setLocal('current_key', res)
    state.current_key = res
  },
  SET_ORDER_CONFIRM_DATA: (state, res) => {
    Utils.setLocal('orderConfirmData', res)
    state.orderConfirmData = res
  },
  SET_CARTIDS_IN_ORDER: (state, res) => {
    Utils.setLocal('cartIdsInOrder', res)
    state.cartIdsInOrder = res
  },
  ORDER_TO_PAY: (state, res) => {
    Utils.setLocal('orderToPay', res)
    state.orderToPay = res
  },
  SET_ADDRESS_LIST: (state, res) => {
    Utils.setLocal('addressList', res)
    state.addressList = res
  },
  SET_COUPON_LIST: (state, res) => {
    Utils.setLocal('couponList', res)
    state.couponList = res
  },
  ADDRESS_BACK_FLAG: (state, res) => {
    Utils.setLocal('addressBackFlag', res)
    state.addressBackFlag = res
  },
  CART_GOODS: (state, res) => {
    Utils.setLocal('cartGoods', res)
    state.cartGoods = res
  }

}

export default {
  state,
  mutations
}