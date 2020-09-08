<template>
	<view>
    <view class="px-4 py-2 posSticky t0 white zIndexHigh u-border-bottom">
      <u-search 
      @search="searchFood" 
      @custom="searchFood"
      @clear="keyword=''"
      placeholder="请输入食物名称" 
      v-model="keyword" />
      <view v-if="searchHistory.length">
        <view class="my-2">搜索历史:</view>
        <view class="d-flex primary--text flex-wrap">
          <text class="pa-2" @click="search(x.foodName)" v-for="(x, i) in searchHistory" :key="i">
            {{x.foodName}}
          </text>
        </view>
      </view>
    </view>
    <view v-if="list.length">
      <view
        v-for="(item, i) in list"
        :key="i"
      >
        <view
          class="px-4 py-2 d-flex justify-space-between align-center"
          @click="toDetail(item)"
        >
          <u-avatar :src="item.foodImg" size="70"></u-avatar>
          <view class="d-flex flex-column ml-4">
            <text class="subtitle-2">{{ item.foodName }}</text>
            <text class="caption text-lowercase">{{ item.heatQuantity }}千卡/100{{ item.foodUnit }}</text>
          </view>
          <view class="flex-fill"></view>
          <view @click.stop="addBite(item)" class="d-inline-flex text-right">
            <u-icon  size="60" color="#ec9b33" name="plus-circle-fill"></u-icon>
          </view>
        </view>
        <u-line color="grey" />
      </view>      
      <u-loadmore :status="loadMoreStatus"/>
    </view>
    <view v-else>
      <view class="pa-2 body-2 d-flex justify-space-between">
        <text>系统推荐饮食：</text>
        <text
          class="primary--text"
          @click="toCustomPage"
        >自定义菜品</text>
      </view>
      <view v-if="systemRec.length">
        
        <view
          v-for="(item, i) in systemRec"
          :key="i"
        >
          <view
            class="px-4 py-2 d-flex justify-space-between align-center"
            @click="toDetail(item)"
          >
<!--            <v-avatar
              size="35"
            >
              <img :src="item.foodImg">
            </v-avatar> -->
            <u-avatar size="70" :src="item.foodImg"></u-avatar>
            <view class="d-flex flex-column ml-4">
              <text class="subtitle-2">{{ item.foodName }}</text>
              <!-- {{ item.foodUnit }} -->
              <text class="caption text-lowercase">{{ item.heatQuantity }}千卡/100g</text>
            </view>
            <view class="flex-fill"></view>
            <view @click.stop="addBite(item)">
              <!-- <v-spacer /> -->
              <u-icon  size="65" color="#ec9b33" name="plus-circle"></u-icon>
  <!--            <v-icon
                large
                color="#ec9b33"
                @click.stop="addBite(item)"
              >
                mdi-plus-circle
              </v-icon> -->
            </view>
          </view>
          <!-- <v-divider color="grey" />				 -->
        </view>
      </view>
      <u-loadmore :status="c_loadMoreStatus"/>
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <!-- <u-empty text="暂无结果" mode="car"></u-empty> -->
    </view>
    <u-popup v-model="showPopup" mode="bottom">
      
      <view class="white">
        <view
          class="pa-0 ma-0 py-2 subtitle-2 d-flex"
        >
          <view
            class="col-3 d-flex justify-center align-center"
            @click="showPopup=false"
          >
            取消
          </view>
          <view
            class="col-6 subtitle-1 d-flex justify-center align-center"
          >
            添加今日饮食
          </view>
          <view
            class="d-flex col-3 justify-center align-center"
            style="color: #EC9B33"
            @click="addCertain"
          >
            确认
          </view>
        </view>
        <u-line color="grey" />
        <view class="px-4 py-2 d-flex align-center">
          <u-avatar :src="foodImg" size="70"></u-avatar>
          <view class="d-flex flex-column ml-4">
            <text class="subtitle-2">{{ foodName }}</text>
            <text class="caption text-lowercase">{{ heatQuantity }}千卡/100{{ foodUnit||'g' }}</text>
          </view>
        </view>	
        <u-line color="grey" />
        <view
          class="pa-2 ma-0 py-2 subtitle-2 d-flex"
        >
          <view
            class="col-4 d-flex align-end"
            style="color: #EC9B33"
          >
            估算数量
          </view>
          <view
            style="color: #EC9B33"
            class="col-8 text-right"
          >
            {{ Math.round(heatQuantity/100*foodNum) }}千卡/{{ foodNum }}{{ foodUnit }}
          </view>
        </view>				
        <view
          class="pa-0 ma-0 py-2 subtitle-2 d-flex align-center"
        >
          <view
            class="col-3 text-center"
          >
            <view 
              class="d-inline-flex"
              @touchmove="touchMove"
              @touchstart="minusStart"
              @touchend="minusEnd"
            >
              <u-icon 
                color="#ec9b33" 
                size="60" 
                name="minus-circle"
              />
            </view>
          </view>
          <view
            class="col-6 title font-weight-bold text-center"
          >
            {{ foodNum }}
            <text class="caption ml-2">{{ theFoodUnit }}</text>
          </view>
          <view
            class="col-3 text-center"
          >
            <view 
              class="d-inline-flex"
              @touchmove="touchMove"
              @touchstart="addStart"
              @touchend="addEnd"
            >
              <u-icon 
                color="#ec9b33" 
                size="60" 
                name="plus-circle"
              />
            </view>            
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
        searchHistory: [],
        systemRec: [],
        keyword: '',
        rows: 20,
        page: 1,
        r_page: 1,
        allLoaded: false,
        r_allLoaded: false,
        list: [],
        loadMoreStatus: 'loadmore',
        r_loadMoreStatus: 'loadmore',
        showPopup: false,
        // 选中的菜品
        caipId: '',
        foodImg: '',
        foodName: '',
        foodUnit: '',
        foodNum: 100,
        heatQuantity: 0,
        // 增减按钮
        startTime1: '',
        startTime2: '',
        endTime1: '',
        endTime2: '',
        minusInterval: null,
        addInterval: null
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      },
      memberId(){
        return this.$store.state.member.memberId
      }
    },
    onLoad(e) {
      if (e) {
        this.type = e.type
        this.date = e.date
      }
    },
    onShow() {
      this.getHistory()
      this.getRecommend()
    },
    onHide() {
      clearInterval(this.minusInterval)
      clearInterval(this.addInterval)
    },
    onUnload() {
      clearInterval(this.minusInterval)
      clearInterval(this.addInterval)
    },
    onReachBottom() {
      if (this.list.length) {
        if (!this.allLoaded) {
          this.loadMoreStatus = 'loading'
          this.page++
          this.searchFood('@cxx@')
        } 
      }
      if (this.systemRec.length) {
        if (!this.c_allLoaded) {
          this.r_loadMoreStatus = 'loading'
          this.r_page++
          this.getRecommend('yo')
        } 
      }
    },
    methods: {
      getHistory () {
        const data = {
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/bite/getFoodHistory', data)
          .then(res => {
            if (res.data.success) {
              this.searchHistory = res.data.obj
            }
          })
      },
      getRecommend(e){
        const params = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          foodType: this.type,
          page: this.r_page,
          rows: this.rows
        }
        this.$http.get('/mobile/bite/getRecommendBite', params)
          .then(res => {
            if (res.data.success) {
              const rows = res.data.rows
              const pager = res.data.pager
              if (!pager.totalPages) {
                this.r_allLoaded = true
              } else {
                this.r_allLoaded =  pager.currentPage === pager.totalPages
              }		
              this.r_loadMoreStatus = this.r_allLoaded?'nomore':'loading'
              this.systemRec = e?this.systemRec.concat(rows):rows
            }
          })
      },
      toCustomPage () {
        uni.navigateTo({
          url: './customFoodPage'
        })
        // $router.push('./customDiet')
      },
      search (e) {
        this.keyword = e
        this.page = 1
        this.searchFood()
      },
      searchFood (name) {
        console.log(name)
        if (name !== '@cxx@') { //由搜索来的
          this.page = 1
        }
        const data = {
          name: this.keyword,
          sessionId: this.sessionId,
          page: this.page,
          rows: this.rows
        }
        this.$http.get('/mobile/bite/getFoodName', data)
          .then(res => {
            if (res.data.success) {
              const rows = res.data.rows
              rows.forEach(r => {
								// const per1g = Math.round(res.heatQuantity/100)
								// this.$set(r,'per',per1g)
								if ([3, 6, 7].includes(r.foodUnitType)) {
									this.$set(r,'foodUnit','ml')
								} else {
									this.$set(r,'foodUnit','g')
								}                
              })
              const pager = res.data.pager
              if (!pager.totalPages) {
                this.allLoaded = true
              } else {
                this.allLoaded =  pager.currentPage === pager.totalPages
              }              
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'  
              this.list = name === '@cxx@' ? this.list.concat(rows) : rows
              let valid = true 
              this.searchHistory.forEach(rs => {
                if (rs.foodName === this.keyword) {
                  valid = false
                }
              })
              // 仅第一页加载 且 不与历史重复时
              if (this.page === 1 && valid) {
                this.addHistory()
              }
            }
          })
      },
      addHistory () {
        const data = {
          name: this.keyword,
          sessionId: this.sessionId
        }
        this.$http.post('/mobile/bite/addFoodHistory', data)
          .then(res => {
            if (res.data.success) {
              this.getHistory()
            }
          })
      },
      toDetail (e) {
        const caipId = e.caipId
        const foodNum = e.foodNum
        const foodUnit = e.foodUnit||'g'
        const biteTime = this.date
        const foodType = this.type
        const custom = e.customType
        uni.navigateTo({
          url: custom?
          `./customFoodPage?caipId=${caipId}&foodType=${foodType}`
          :
          `./foodDetails?caipId=${caipId}&foodUnit=${foodUnit}&biteTime=${biteTime}&foodType=${foodType}`
        })
      },
      addBite (e) {
        console.log(e)
        for (const x in e) {
          this[x] = e[x]
        }
        this.showPopup = true
      },
			minusStart(e){
				console.log(e)
				this.endTime1 = ''
				this.startTime1 = e.timeStamp
				clearInterval(this.minusInterval)
				this.minusInterval = null//重置定时器
				// e.preventDefault()
				setTimeout(()=>{
					console.log(this.startTime1)
					if(this.endTime1){
						clearInterval(this.minusInterval)
						console.log('short')
						console.log(this.foodNum)
						if(this.foodNum>1){
							console.log('fit')
							this.foodNum--
						}                    
					}else{
						clearInterval(this.minusInterval)
						this.minusInterval = setInterval(()=>{
							if(this.foodNum>1){
								console.log('fit')
								this.foodNum--
							}                        
						},50)
					}
				},300)
			},
			addStart(e){
				console.log(e)
				this.endTime2 = ''
				this.startTime2 = e.timeStamp
				clearInterval(this.addInterval)
				this.addInterval = null//重置定时器
				// e.preventDefault()
				setTimeout(()=>{
					if(this.endTime2){
						clearInterval(this.addInterval)
						console.log('short')
						console.log(this.foodNum)
						if(this.foodNum<999){
							console.log('fit')
							this.foodNum++
						}                    
					}else{
						clearInterval(this.addInterval)
						this.addInterval = setInterval(()=>{
							if(this.foodNum<999){
								console.log('fit')
								this.foodNum++
							}                        
						},50)
					}
				},300)
			},
			minusEnd(e){
        console.log('minusEnd')
				clearInterval(this.minusInterval)
				this.endTime1 = e.timeStamp
			},
			addEnd(e){
        console.log('addEnd')
				clearInterval(this.addInterval)
				this.endTime2 = e.timeStamp
			},
			touchMove(e){
        console.log('moved')
				clearInterval(this.minusInterval)
				clearInterval(this.addInterval)				
			},
      addCertain () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          biteTime: this.date,
          foodType: this.type,
          foodName: this.foodName,
          foodImg: this.foodImg,
          foodNum: this.foodNum,
          foodUnit: this.foodUnit,
          caipId: this.caipId,
          heatQuantity: this.heatQuantity
        }
        this.$http.post('/mobile/bite/addNewBite', data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              setTimeout(()=>{
                uni.navigateBack()
              }, 500)
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
