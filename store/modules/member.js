import Utils from '../../utils/storageMw.js'

const member = {
  state: {
    memberId: Utils.getLocal('memberId'),
    image: Utils.getLocal('memberAvatar'),
    memberNum: Utils.getLocal('memberNum'),
    watchId: Utils.getLocal('watchId'),
    watchPhone: Utils.getLocal('watchPhone'),
    isLead: Utils.getLocal('isLead'),
    realName: Utils.getLocal('realName'),
    rela: Utils.getLocal('rela'),
    address: Utils.getLocal('address'),
    birthday: Utils.getLocal('birthday'),
    domicile: Utils.getLocal('domicile'), // 户籍地？
    height: Utils.getLocal('height'),
    weight: Utils.getLocal('weight')
  },
  mutations: {
    SET_MEMBER_ITEM: (state, res) => {
      const [key, value] = res
      state[key] = value
      Utils.setLocal(key, value)
    },
    SET_EACH_MEMBER_ITEM: (state, res) => {
      for (const x in res) {
        state[x] = res[x]
        if (x === 'image') {          
          Utils.setLocal('memberAvatar', res[x])
        } else {
          Utils.setLocal(x, res[x])
        }
      }
    }
  }
}

export default member