import Utils from '../../utils/storageMw.js'

const member = {
  state: {
    memberIndex: Utils.getLocal('m-memberIndex')||0,
    memberList: Utils.getLocal('m-memberList') || [],
    dietRecTime: Utils.getLocal('m-dietRecTime'),
    rate: Utils.getLocal('m-rate') || [],
    batNum: Utils.getLocal('m-batNum') || 0,
    genderChangable: Utils.getLocal('m-genderChangable'),
    //来自接口的属性
    address: Utils.getLocal('m-address'),
    birthday: Utils.getLocal('m-birthday'),
    blood: Utils.getLocal('m-blood'),
    cityCode: Utils.getLocal('m-cityCode'),
    countyCode: Utils.getLocal('m-countyCode'),
    domicile: Utils.getLocal('m-domicile'),
    education: Utils.getLocal('m-education'),
    height: Utils.getLocal('m-height'),
    householdRegister: Utils.getLocal('m-householdRegister'),
    identity: Utils.getLocal('m-identity'),
    image: Utils.getLocal('m-image'),
    isLead: Utils.getLocal('m-isLead'),
    marriage: Utils.getLocal('m-marriage'),
    memberId: Utils.getLocal('m-memberId'),
    memberNum: Utils.getLocal('m-memberNum'),
    nation: Utils.getLocal('m-nation'),
    occupation: Utils.getLocal('m-occupation'),
    phone: Utils.getLocal('m-phone'),
    provinceCode: Utils.getLocal('m-provinceCode'),
    realName: Utils.getLocal('m-realName'),
    rela: Utils.getLocal('m-rela'),
    sex: Utils.getLocal('m-sex'),
    trueName: Utils.getLocal('m-trueName'),
    watchId: Utils.getLocal('m-watchId'),
    watchPhone: Utils.getLocal('m-watchPhone'),
    weight: Utils.getLocal('m-weight'),
    adviceGet: Utils.getLocal('m-adviceGet'),
    //饮食记录
    
  },
  mutations: {
    SET_SINGLE_MEMBER_STATE: (state, status) => {
      let beArray = [
        'memberList',
        'rate'
      ]
      let x = status[0]
      let y = status[1]
      state[x] = y
      if (beArray.includes(x)) {
        Utils.setLocal('m-' + x, y)

      }else{

        Utils.setLocal('m-' + x, y)
      }
    },
    CLEAR_SINGLE_MEMBER_STATE: (state, name) => {
      state[name] = null
      Utils.setLocal('m-' + name, '')
    },
    CLEAR_ALL_MEMBER_STATE: (state) => {
      let beArray = [
        'memberList',
        'rate'
      ]
      let defaultZero = [
        'memberIndex',
        'batNum'
      ]

      for (let x in state) {
        localStorage.clear()

        if (beArray.includes(x)) {
          state[x] = []
        }
        else if (defaultZero.includes(x)) {
          state[x] = 0
        }else {
          state[x] = null
        }
      }
    },
    SET_EACH_MEMBER_STATE: (state, status) => {
      let beArray = [
        'memberList',
        'rate'
      ]
      for (let x in status) {
        state[x] = status[x]

        if (beArray.includes(x)) {
          Utils.setLocal('m-' + x, status[x])

        } else {

          Utils.setLocal('m-' + x, status[x])
        }
      }
    }
  }
}

export default member