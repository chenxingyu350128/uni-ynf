const member = {
  state: {
    memberIndex: localStorage.getItem('m-memberIndex')||0,
    memberList: JSON.parse(localStorage.getItem('m-memberList')) || [],
    dietRecTime: localStorage.getItem('m-dietRecTime'),
    rate: localStorage.getItem('m-rate')?JSON.parse(localStorage.getItem('m-rate')) : [],
    batNum: localStorage.getItem('m-batNum')||0,
    genderChangable: localStorage.getItem('m-genderChangable'),
    //来自接口的属性
    address: localStorage.getItem('m-address'),
    birthday: localStorage.getItem('m-birthday'),
    blood: localStorage.getItem('m-blood'),
    cityCode: localStorage.getItem('m-cityCode'),
    countyCode: localStorage.getItem('m-countyCode'),
    domicile: localStorage.getItem('m-domicile'),
    education: localStorage.getItem('m-education'),
    height: localStorage.getItem('m-height'),
    householdRegister: localStorage.getItem('m-householdRegister'),
    identity: localStorage.getItem('m-identity'),
    image: localStorage.getItem('m-image'),
    isLead: localStorage.getItem('m-isLead'),
    marriage: localStorage.getItem('m-marriage'),
    memberId: localStorage.getItem('m-memberId'),
    memberNum: localStorage.getItem('m-memberNum'),
    nation: localStorage.getItem('m-nation'),
    occupation: localStorage.getItem('m-occupation'),
    phone: localStorage.getItem('m-phone'),
    provinceCode: localStorage.getItem('m-provinceCode'),
    realName: localStorage.getItem('m-realName'),
    rela: localStorage.getItem('m-rela'),
    sex: localStorage.getItem('m-sex'),
    trueName: localStorage.getItem('m-trueName'),
    watchId: localStorage.getItem('m-watchId'),
    watchPhone: localStorage.getItem('m-watchPhone'),
    weight: localStorage.getItem('m-weight'),
    adviceGet: localStorage.getItem('m-adviceGet'),
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
        localStorage.setItem('m-' + x, JSON.stringify(y))

      }else{

        localStorage.setItem('m-' + x, y)
      }
    },
    CLEAR_SINGLE_MEMBER_STATE: (state, name) => {
      state[name] = null
      localStorage.setItem('m-' + name, '')
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
          localStorage.setItem('m-' + x, JSON.stringify(status[x]))

        } else {

          localStorage.setItem('m-' + x, status[x])
        }
      }
    }
  }
}

export default member
//this.$store.commit('SET_SINGLE_STATE',['',])
// address: ""
// birthday: "1986-02-02"
// blood: "A型"
// cityCode: 0
// countyCode: 0
// domicile: "浙江省-杭州市-西湖区"
// education: ""
// height: "177.00"
// householdRegister: ""
// identity: ""
// image: "http://yinafimg.oss-cn-hangzhou.aliyuncs.com/user/201911/2816/1911281629025826.jpg"
// isLead: 0
// marriage: ""
// memberId: 55
// memberNum: "1804299155"
// nation: "侗族"
// occupation: ""
// phone: "18695789388"
// provinceCode: 0
// realName: "测试111"
// rela: "奶奶"
// sex: 2
// trueName: "烈日下"
// watchId: 0
// watchPhone: ""
// weight: "50.00"