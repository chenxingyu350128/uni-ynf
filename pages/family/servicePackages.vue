<template>
	<view class="body-2 grey lighten-3 pb-12">
		<view class="px-4 py-2 grey lighten-3 grey--text subtitle-1">到期时间</view>
    <view class="pl-2 py-2 d-flex align-center white">
<!--        <v-avatar size="80">
        <img
          :src="seriesImg"
          alt=""
        >
      </v-avatar> -->
      <u-avatar :src="seriesImg" size="160"></u-avatar>
      <view class="d-flex flex-column body-2 ml-4">
        <text class="mb-1 nowrap">设备IMEI码: {{ watchImei }}</text>
        <text class="mb-1 nowrap">腕表类型: {{ seriesName }}</text>
        <text class="mb-1 nowrap">电话号码: {{ phone }}</text>
        <text>套餐到期时间: {{ endTime || todayStr }}</text>
      </view>
    </view>
 <!--   <u-card>
    </u-card> -->
<!--    <u-cell-group>
      <u-cell-item title="设备IMEI" :value="imei" :arrow="false"></u-cell-item>
      <u-cell-item title="电话号码" :value="phone" :arrow="false"></u-cell-item>
      <u-cell-item title="套餐到期时间" :value="baseEndTime" :arrow="false"></u-cell-item>
    </u-cell-group> -->
		<view class="px-4 py-2 grey lighten-3 grey--text subtitle-1">服务套餐</view>
    <view 
      v-for="(item,i) in list" 
      :key="i"       
      class="mx-2 rounded-lg white"
      :class="i?'mt-2':''"
    >
      <view class="px-4 py-2">
        <view class="d-flex align-center caption">
<!--          <v-avatar
            size="75"
            tile
          >
            <img :src="item.packagePic">
          </v-avatar> -->
          <u-avatar size="150" :src="item.packagePic"></u-avatar>
          <view class="flex-fill ml-2 d-flex flex-column">
            <text>{{ item.packageName }}</text>
            <text>服务到期时间: {{ item.endTime }}</text>
            <view class="flex-fill d-flex align-end justify-space-between mt-2">
              <text class="text-h6 red--text">
                {{ item.servicePrice | price }}
              </text>
              <u-button @click="btnPay(item)" size="mini" type="primary">立即购买</u-button>
      <!--        <v-btn
                small
                color="primary"
                dark
                depressed
                @click="btnPay(item)"
              >
                立即购买
              </v-btn> -->
            </view>
          </view>
        </view>
        <!-- <u-divider color="grey" class="my-2"></u-divider> -->
        <view class=" u-border-top pt-2 mt-2">
          {{ item.remark }}
        </view>
      </view>      
    </view>
<!--    <u-cell-group>
      <u-cell-item @click="showSelect=true" title="服务时长" :value="serviceDuration" :arrow="false">
        <u-icon slot="right-icon" name="arrow-down-fill"></u-icon>
      </u-cell-item>
      <u-cell-item title="到期时间" :value="newEndTime" :arrow="false"></u-cell-item>
      <u-cell-item title="套餐" value="标准套餐" :arrow="false"></u-cell-item>
      <u-cell-item title="服务费" value="1元/天" :arrow="false"></u-cell-item>
      <u-cell-item title="合计" :value="price" :arrow="false"></u-cell-item>
    </u-cell-group> -->
<!-- 		<view class="px-4 py-2 grey lighten-3 grey--text subtitle-1">功能描述</view>
    <view class="px-4 py-2">
      健康报告、数据监测、健康管理、健康饮食
    </view> -->
    <view class="posFix b0 full-width zIndexHigh">
      <u-button @click="toPackageList" :custom-style="customStyle" type="primary">订单记录</u-button>
    </view>
<!--    <u-select 
      @confirm="selectConfirm" 
      :list="packages" 
      v-model="showSelect"
      :default-value="[index]"
    /> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset',
          background: '#00aaef',
          color: '#fff'
        }, 
        // xxx
        list: [],
        item: null,
        endTime: '',
        watchImei: '',
        seriesName: '',
        seriesImg: '',
        phone: '',
        today: new Date(),
        days: 0,
        payWay: 0,
        showDialog: false,
        showMethods: false,
        // xxx
			}
		},
    computed: {
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      todayStr () {
        return this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      }
    },
    onShow() {
      this.init()
      this.getWatchInfo()
      this.getInfo()
      this.getPackages()
    },
    methods: {
      getPackages () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getWatchPackage', data)
          .then(res => {
            if (res.data.success) {
              this.list = res.data.obj
            }
          })
      },
      toPackageList () {
        uni.navigateTo({
          url:'./SP_orderList'
        })
      },
      btnPay (item) {
        this.item = item
        if (this.endTime && Date.parse(this.endTime) > Date.parse(this.todayStr)) {
          this.showDialog = true
          uni.showModal({
            title: '套餐续费',
            cancelColor: '#f00',
            content: '套餐未到期是否续费？',
            success: result => {
              if (result.confirm) {
                this.$u.toast('请前往颐纳福APP购买')
              }
            } 
          })
          return false
        }
        this.$u.toast('请前往颐纳福APP购买')
      },
      getWatchInfo () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getWatchInformation', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                if (x !== 'watchId') {
                  this[x] = obj[x]
                }
              }
            }
          })
      },  
      getInfo () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getPackageInfo', data)
          .then(res => {
            if (res.data.success) {
              const data = res.data.obj
              this.imei = data.imei
              this.endTime = data.endTime || this.dateFormat
              this.phone = data.phone
            }
          })
      },
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getPackageInfo', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      },
      async createOrder () {
        const current = Date.parse(this.$u.timeFormat(new Date(), 'yyyy-mm-dd'))
        const base = Date.parse(this.baseEndTime)
        // 套餐未到期,提醒
        if (current < base) {
          uni.showModal({
            title: '续费提醒',
            content: '您的套餐还未到期，确认续费吗？',
            cancelColor: '#f00',
            success: result => {
              if (result.confirm) {
                this.realCreateOrder()
              }
            }
          })
          return false
        }
        this.realCreateOrder()
        
      },
      // 接口返回的package参数有问题，提示去app支付
      realCreateOrder () {
        this.$u.toast('套餐购买，请前往颐纳福APP')
      },
      // async realCreateOrder () {
      //   const data = {
      //     sessionId: this.sessionId,
      //     memberId: this.memberId,
      //     goodsNum: this.goodsNum,
      //     payWay: 1
      //   }
      //   const res = await this.$http.post('/mobile/healthy/addPackageOrder', data)
      //   if (res.data.success) {
      //     const obj = res.data.obj
      //     const result = await uni.getProvider({
      //           service: 'payment'
      //         })
      //     if (result[1].errMsg === 'getProvider:ok') {
      //       const provider = result[1].provider[0]
      //       const timeStamp = obj.timestamp
      //       const nonceStr = obj.noncestr
      //       const packages = obj.package
      //       const paySign = obj.sign
      //       uni.requestPayment({
      //         provider,
      //         timeStamp,
      //         nonceStr,
      //         package: packages,
      //         signType: 'MD5',
      //         paySign,
      //         success: function (e) {
      //           console.log(JSON.stringify(e))
      //         },
      //         fail: function (err) {
      //           console.log(JSON.stringify(err))
      //         }
      //       })
      //     }  
      //   }
      // },
      selectConfirm (e) {
        console.log(e)
        this.serviceDuration = e[0].label
        this.goodsNum = e[0].value
      }
    }
	}
</script>

<style lang="scss">

</style>
