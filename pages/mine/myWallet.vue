<template>
	<view>
    <view class="posRela">
      <image class="full-width" src="./static/img/walletBG.jpg"></image>
      <view class="posAbs full-size pa-4 d-flex flex-column align-center">
        <view class="my-4 white--text text-center font-weight-bold title">
          账户余额（元）
        </view>
        <view class="display-1 font-weight-bold white--text text-center">
          {{ totalAmount }}
        </view>
        <view class="pa-4 full-width posAbs b0">
          <u-button @click="toTakeCash" shape="circle" type="primary">申请提现</u-button>
        </view>
      </view>
    </view>  
    <view>
      <view class="full-width py-4 text-center posSticky white zIndexHigh">
        <text class="grey--text font-weight-bold">余额明细</text>
      </view>
      <u-line color="grey" />
      <view v-if="list.length">
        <view
          v-for="(item, i) in list"
          :key="i"
          class="px-4"
        >
          <view class="d-flex py-2 justify-space-between align-center">
            <view class="full-width d-flex flex-column">
              <text class="font-weight-bold">{{ item.stateName }}</text>
              <text class="grey--text caption">{{ item.time }}</text>
            </view>
            <text class="nowrap">{{ item.state === 4 ? '+' : '-' }} {{ item.amount }}</text>
          </view>
          <u-line color="grey" />
        </view>
      </view>
      <view v-else class="pa-6">
        <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
        <u-empty text="暂无明细" mode="list"></u-empty>
      </view>
    </view>     
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: 0,
				totalAmount: 0,
        list: [],
        page: 1,
        rows: 10,
        allLoaded: false,
        loadMoreStatus: 'loadmore'
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      },
      userId(){
        return this.$store.state.app.userId
      }   
    },
    onShow() {
      this.getInit()
      this.getDetails()
    },
    onReachBottom() {
      if (!this.allLoaded) {
        this.loadMoreStatus = 'loading'
        this.page++
        this.getDetails('Yo')
      }
    },
    methods: {
      getInit () {
        const data = {
          sessionId: this.sessionId,
          userId: this.userId
        }
        this.$http.get('/mobile/activity/getBalance', data)
          .then(res => {
            if (res.data.success) {
              this.amount = res.data.obj.amount
              this.totalAmount = Number(res.data.obj.totalAmount).toFixed(2)
            }
          })
      },
      toTakeCash () {
        uni.showModal({
          title: '提现，请使用APP'
        })
        // uni.navigateTo({
        //   url: './cashTake?money=' + this.totalAmount
        // })
      },
      getDetails (e) {
        const params = {
          sessionId: this.sessionId,
          userId: this.userId,
          currentPage: this.page,
          pageSize: this.rows
        }
        this.$http.get('/mobile/activity/getAwardDetail', params)
          .then(res => {
            if (res.data.success) {
              const rows = res.data.rows
              const stateArr = ['提现失败','提现成功','审核失败','审核中','收益'] 
              rows.forEach(re => {
                this.$set(re, 'stateName', stateArr[re.state])
                this.$set(re, 'amount', Number(re.amount).toFixed(2))
              })
              const pager = res.data.pager
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.list = e ? this.list.concat(rows) : rows
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>

</style>
