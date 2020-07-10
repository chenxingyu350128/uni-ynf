import Utils from '../../utils/storageMw.js'
const state = {
  isLoading: Utils.getLocal('isLoading'),
  // 获取用户信息
  userInfo: Utils.getLocal('userInfo'),
  locationPoint: Utils.getLocal('locationPoint'),
  encryptedData: Utils.getLocal('encryptedData'),
  iv: Utils.getLocal('iv'),
  // 成员相关
  // watchId:  Utils.getLocal('watchId'),
  // memberId:  Utils.getLocal('memberId'),
  memberList: Utils.getLocal('memberList'),
  houseId:  Utils.getLocal('houseId'),
  houseList: Utils.getLocal('houseList'),
  battery: Utils.getLocal('battery'),
  
  // 城市(索引)数据
  locationCity: Utils.getLocal('locationCity'),
  areaId: Utils.getLocal('areaId'),
  cityId: Utils.getLocal('cityId'),
  indexList: Utils.getLocal('indexList'),
  indexItem: Utils.getLocal('indexItem'),
  cityHistory: Utils.getLocal('cityHistory') || [],
  
  // 登录信息
  sessionId: Utils.getLocal('sessionId'),
  userId: Utils.getLocal('userId'),
  token: Utils.getLocal('token'),
  userName: Utils.getLocal('userName'),
  image: Utils.getLocal('image'),
  realName: Utils.getLocal('realName'),
  openId: Utils.getLocal('openId'),
  vxName: Utils.getLocal('vxName'),
  wechatType: Utils.getLocal('wechatType'),
  
}

const mutations = {
  SET_SINGLE_ITEM: (state, res) => {
    const [key, value] = res
    state[key] = value
    Utils.setLocal(key, value)
  },
  CLEAR_LOCAL: () => {
    Utils.clearLocal()
  },
  SET_CITY_HISTORY: (state, res) => {
    console.log(res)
    let cityHistory = state.cityHistory
    if (!cityHistory.length) {
      state.cityHistory = [res]
      Utils.setLocal('cityHistory', [res])
    } else {
      let valid = true
      cityHistory.some(rs => {
        if (rs.areaName === res.areaName) {
          valid = false
          return true
        }
      })
      if (valid) {
        cityHistory.unshift(res)
        console.log(cityHistory)
        if (cityHistory.length > 8) {
          cityHistory.pop()
        }
        console.log(cityHistory)
        Utils.setLocal('cityHistory', cityHistory)        
      }
    }
  },
  SET_EACH_ITEM: (state, res) => {
    for (const x in res) {
      state[x] = res[x]
      Utils.setLocal(x, res[x])
    }
  }
}

export default {
  state,
  mutations
}