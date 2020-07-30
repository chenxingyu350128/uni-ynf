<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
    <view class="d-inline-flex posFix setPos zIndexHigh elevation-11">
      <u-icon 
        color="#00aaef" 
        name="setting-fill" 
        size="45"
        class="ma-auto"
        @click="openSetting"
      >
      </u-icon>
    </view>
    <view class="my-2 py-2 mx-0 px-6 white d-flex align-center">
      <u-image shape="circle" width="108rpx" height="108rpx" :src="image"></u-image>
      <view class="d-flex flex-column subtitle-2 ml-4">
        <text>{{ realName }}</text>
        <text class="caption mt-3">{{ top }}</text>
      </view>
      <view class="flex-fill text-right headline">
        {{ step||'0' }}
      </view>
      <!-- <u-icon name="launch" size="50" customPrefix="mdi"></u-icon> -->
    </view>
    <view v-if="rankList.length">
      <view
        v-for="(item,i) in rankList"
        :key="i"
      >
        <view
          class="py-2 white mx-0 px-4 d-flex align-center"
        >
          <text class="subtitle-1 mr-4 font-weight-bold">{{ i+1 }}</text>
          <u-image shape="circle" width="100rpx" height="100rpx" :src="item.image" mode=""></u-image>
          <view class="d-flex flex-column subtitle-2 ml-4">
            <text>{{ item.real_name }}</text>
          </view>
          <view class="flex-fill red--text title text-right headline">
            {{ item.step }}
          </view>
        </view>
        <u-line color="grey" />
      </view>      
      <u-loadmore :status="loadMoreStatus"/>
    </view>
    <view v-else>
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无排行" mode="data"></u-empty>
    </view>
    <u-popup v-model="showPopup" mode="right" length="60%">
      <view class="pa-4">设置查询条件</view>
      <u-cell-group>
        <u-cell-item @click="showChoices=true" title="区域" :value="areaName||'请选择'"></u-cell-item>
        <u-cell-item @click="showAgeRange=true;showChoices=false" title="年龄" :value="ageRange"></u-cell-item>
      </u-cell-group>
      <view v-if="showChoices" class="posFix pa-6 b0 full-width d-flex flex-column">
        <view             
          v-for="(item, i) in regionArr" 
          :key="i" 
          class="pb-2"
         >
          <button 
            class="mt-2 white--text"
            :class="item.areaId===areaId?'primary':'grey'"
            @click="actionClick(i)"
          >
            {{item.areaName}}
          </button>
        </view>
      </view>
<!--      <view v-else class="posFix pa-6 b0 full-width d-flex justify-space-around">
        <u-button @click="showPopup=false" plain size="mini" type="error">取消</u-button>
        <u-button @click="afterMarch" plain size="mini" type="primary">设置</u-button>
      </view> -->
      <!-- <u-action-sheet @click="actionClick" :list="actionList" v-model="showChoices"></u-action-sheet> -->
      <u-select 
        mode="mutil-column" 
        :list="multiColumn" 
        v-model="showAgeRange"
        :default-value="defaultSelect"
        @confirm="ageRangeConfirm"
      />

    </u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        showPopup: false,
        showChoices: false,
        showAgeRange: false,
        current: 0,
				list: [
          { name: '日' },
          { name: '周' },
          { name: '月' }
        ],
        rankList: [],
        regionArr: [],
        areaName: '',
        areaId: '',
        areaType: '',
        date: '',
        startAge: 15,
        endAge: 65,
        page: 1,
        rows: 10,
        allLoaded: false,
        loadMoreStatus: 'loadmore',
        realName: '',
        top: '',
        step: '',
        image: ''
			};
		},
    computed: {
      location () {
        return this.$store.state.member.domicile
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      actionSheet () {
        const result = []
        this.regionArr.forEach(res => {
          result.push({
            text: res.areaName
          })
        })
        return result
      },
      defaultSelect () {
        const index0 = this.startAge || 15
        const index1 = this.endAge || 65
        return [index0, index1]
      },
      ageRange () {
        const x = this.defaultSelect
        return x.length ? `${this.ageColumn[x[0]].label}-${this.ageColumn[x[1]].label}` : '请选择'
      },
      ageColumn () {
        let arr = []
        for (let i = 0; i < 124; i++) {
          arr.push({
            value: i,
            label: i + '岁'
          })
        }
        return arr
      },
      multiColumn () {
        return [this.ageColumn, this.ageColumn]
      }
    },
    onLoad(e) {
      if (e.date) {
        this.date = e.date
      }
    },
    onShow() {
      if (!this.location) {
        uni.showModal({
          title: '提示',
          content: '未设置所在地，无法获取排行榜，是否前往设置？',
          success: res => {
            if (res.confirm) {
              uni.navigateTo({
                url: './InformationDetails'
              })
            } else {
              return false
            }
          }
        })
      } else {
        this.beforeInit()
      }
    },
    onReachBottom() {
      if (!this.allLoaded) {
        this.loadMoreStatus = 'loading'
        this.page++
        this.init('Yo')
      }
    },
    methods: {
      beforeInit () {
        this.addAreaCode()
      },
      init (e) {
        let data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          timeType: this.current + 1, 
          areaId: this.areaId, 
          areaType: this.areaType,
          date: this.date,
          startAge: this.startAge,
          endAge: this.endAge,
          page: this.page,
          rows: this.rows
        }  
        console.log(data)
        this.$http.post('/mobile/healthy/getStepsTop', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              this.realName = obj.user.realName
              this.top = obj.user.top
              this.step = obj.user.step
              this.image = obj.user.image
              const rows = obj.user.stepsTop
              const pager = obj.pages
              
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.rankList = e ? this.rankList.concat(rows) : rows
            }
          })
      },
      ageRangeConfirm (e) {
        console.log(e)
        if (e[0].value>e[1].value) {
          this.$u.toast('最大年龄不得小于最小年龄')
          return false
        }
        this.startAge = e[0].value
        this.endAge = e[1].value
        this.showPopup = false
        this.page = 1
        this.init()
      },
      // afterMarch () {
      //   this.showPopup = false
      //   this.page = 1
      //   this.init()
      // },
      addAreaCode () {
        let data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          area: this.location
        }
        this.$http.post('/mobile/healthy/addAreaCode', data)
          .then(res=>{            
            console.log(res.data.obj)
            if(res.data.success){
              const obj = res.data.obj
              this.regionArr = obj
              this.areaId = obj[2].areaId
              this.areaName = obj[2].areaName
              this.areaType = 3
              this.page = 1
              this.init()
            }
          })
          
      },
      change(index) {
        this.current = index;
        this.page = 1
        this.init()
      },
      openSetting () {
        if (!this.location) {
          uni.showModal({
            title: '提示',
            content: '未设置所在地，无法获取排行榜，是否前往设置？',
            success: res => {
              if (res.confirm) {
                uni.navigateTo({
                  url: './InformationDetails'
                })
              } else {
                return false
              }
            }
          })          
        } else {
          this.showPopup = true
        }
      },
      actionClick (e) {
        this.showChoices = false
        this.areaId = this.regionArr[e].areaId
        this.areaType = this.regionArr[e].areaType
        this.areaName = this.regionArr[e].areaName
        this.showPopup = false
        this.page = 1
        this.init()
      }
    }
	}
</script>

<style lang="scss" scoped>
.setPos{
  right: 20rpx;
  top: 20vh;
  height: 60rpx;
  width: 60rpx;
  border-radius: 50%;
}
</style>

