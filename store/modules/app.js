const app = {
  state: {
    requestLoading: false,
	tabbarIndex: 0,
    // memberId: localStorage.getItem('memberId'),
    // memberAvatar: localStorage.getItem('memberAvatar'),
    // memberRealName: localStorage.getItem('memberRealName'),
    // memberIndex: localStorage.getItem('memberIndex'),
    // memberList: localStorage.getItem('memberList')||[],
    sessionId: localStorage.getItem('sessionId'),
    token: localStorage.getItem('token'),
    guideOver: localStorage.getItem('guideOver'),
    currentColor: localStorage.getItem('currentColor')||"#00aaef",
    positionCity: localStorage.getItem('positionCity')||"正在定位",
    cityHistory: JSON.parse(localStorage.getItem('cityHistory'))||[],
    houseId: localStorage.getItem('houseId'),
    houseIndex: localStorage.getItem('houseIndex'),
    houseAddress: localStorage.getItem('houseAddress'),
    navbar: localStorage.getItem('navbar'),
    dataType: localStorage.getItem('dataType'),
    authType: localStorage.getItem('authType'),
    noticeList: JSON.parse(localStorage.getItem('noticeList'))||[],
    headLines: JSON.parse(localStorage.getItem('headLines'))||[],
    propertyHL: JSON.parse(localStorage.getItem('propertyHL'))||[],
    houseList: JSON.parse(localStorage.getItem('houseList'))||[],
    bannerList: localStorage.getItem('bannerList')?JSON.parse(localStorage.getItem('bannerList')):[],
    appList: JSON.parse(localStorage.getItem('appList'))||[],
    expBanners: localStorage.getItem('expBanners')?JSON.parse(localStorage.getItem('expBanners')):[],
    rankAgeStart: localStorage.getItem('rankAgeStart')||0,
    rankAgeEnd: localStorage.getItem('rankAgeEnd')||99,
    dietRecTime: localStorage.getItem('dietRecTime'),
    // isLead: localStorage.getItem('isLead'),
    // batNum: localStorage.getItem('batNum'),
    // rate: localStorage.getItem('rate')||[],
    // userId: localStorage.getItem('userId'),
    // userName: localStorage.getItem('userName'),
    // realName: localStorage.getItem('realName'),
    // genderChangable: localStorage.getItem('genderChangable'),
    // image: localStorage.getItem('image'),
    // wechatType: localStorage.getItem('wechatType'),
    // watchId: localStorage.getItem('watchId'),
    // watchPhone: localStorage.getItem('watchPhone'),
    birthday: localStorage.getItem('birthday'),
    blood: localStorage.getItem('blood'),
    createTime: localStorage.getItem('createTime'),
    dataFlag: localStorage.getItem('dataFlag'),
    domicile: localStorage.getItem('domicile'),
    householdRegister: localStorage.getItem('householdRegister'),
    image: localStorage.getItem('image'),
    invitationId: localStorage.getItem('invitationId'),
    mail: localStorage.getItem('mail'),
    occupation: localStorage.getItem('occupation'),
    openid: localStorage.getItem('openid'),
    passWord: localStorage.getItem('passWord'),
    phone: localStorage.getItem('phone'),
    realName: localStorage.getItem('realName'),
    sex: localStorage.getItem('sex'),
    updateTime: localStorage.getItem('updateTime'),
    userId: localStorage.getItem('userId'),
    userName: localStorage.getItem('userName'),
    userState: localStorage.getItem('userState'),
    userType: localStorage.getItem('userType'),
    wechatType: localStorage.getItem('wechatType'),

    // birthday: "1988-09-06"
    // blood: "AB型"
    // createTime: "2018-04-29 11:13:05"
    // dataFlag: 1
    // domicile: "福建省-福州市-仓山区"
    // householdRegister: ""
    // image: "http://yinafimg.oss-cn-hangzhou.aliyuncs.com/user/201910/2411/1910241149257139.jpg"
    // invitationId: 0
    // mail: ""
    // occupation: "律师/法务"
    // openid: ""
    // passWord: ""
    // phone: ""
    // realName: "cxx"
    // sex: 1
    // updateTime: "2019-12-11 16:35:06"
    // userId: 1455
    // userName: "15080090142"
    // userState: 1
    // userType: 0
    // wechatType: 1
  },
  mutations: {
    SET_LOADING: (state, status) => {
      state.requestLoading = !!status
    },
    SET_SINGLE_STATE: (state, status) => {
      let x = status[0]
      let y = status[1]
      let beArray = [
        // 'memberList',
        'cityHistory',
        'noticeList',
        'houseList',
        'bannerList',
        'appList',
        'headLines',
        'propertyHL',
        'expBanners'
      ]
      state[x] = y
      if (beArray.includes(x)) {
        localStorage.setItem(x, JSON.stringify(y))
      }else{
        localStorage.setItem(x,y)
      }
    },
    CLEAR_SINGLE_STATE: (state, name) => {
      let beArray = [
        // 'memberList',
        'cityHistory',
        'noticeList',
        'houseList',
        'bannerList',
        'headLines',
        'propertyHL',
        'appList',
        'expBanners'
      ]
      let defaultZero = [
        'rankAgeStart',
        'houseIndex'
      ]      
      if (beArray.includes(name)) {
        state[name] = []
      }
      else if (defaultZero.includes(name)) {
        state[name] = 0
      }
      else if (name == 'positionCity') {
        state[name] = '正在定位'
      }
      else if (name == 'currentColor') {
        state[name] = '#00aaef'
      }
      else if (name == 'rankAgeEnd') {
        state[name] = 99
      } else {
        state[name] = ''
      }
      localStorage.setItem(name,'')
    },
    CLEAR_STATE: (state) => {
      let beArray = [
        // 'memberList',
        'cityHistory',
        'noticeList',
        'houseList',
        'bannerList',
        'appList',
        'headLines',
        'propertyHL',
        'expBanners'        
      ]
      let defaultZero = [
        'rankAgeStart',
        'houseIndex'
      ]

      for(let x in state){
        localStorage.clear()

        if (beArray.includes(x)){
          state[x] = []
        }
        else if (defaultZero.includes(x)){
          state[x] = 0
        }
        else if (x =='positionCity'){
          state[x] = '正在定位'
        }
        else if (x =='currentColor'){
          state[x] = '#00aaef'
        }
        else if (x =='rankAgeEnd'){
          state[x] = 99
        }else{
          state[x] = ''
        }
      }
      state.guideOver = true
      localStorage.setItem('guideOver', true)
    },
    SET_EACH_STATE: (state,status) => {
      let beArray = [
        // 'memberList',
        'cityHistory',
        'noticeList',
        'houseList',
        'bannerList',
        'propertyHL',
        'headLines',
        'appList',
        'expBanners'
      ]
      for (let x in status) {
        state[x] = status[x]
        if (beArray.includes(x)) {
          localStorage.setItem(x, JSON.stringify(state[x]))
        } else {
          localStorage.setItem(x, state[x])
        }
        // localStorage.setItem(x, state[x])
        // if(status[x]){

        // }
      }
    }
  },
  actions: {
    SetLoading({ commit }, status) {
      commit('SET_LOADING', status)
    },
    setSingleState({ commit }, status){
      commit('SET_SINGLE_STATE', status)
    },
    setEachState({ commit }, status){
      commit('SET_EACH_STATE', status)
    },
  }
}

export default app
//this.$store.commit('SET_SINGLE_STATE',['',])