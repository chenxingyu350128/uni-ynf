<template>
	<view>
    <view v-if="list.length">
      <view @click="toReportDetails(item.drId)" v-for="(item, i) in list" :key="i">
        <view class="d-flex align-center px-4 py-2">
          <u-icon color="#49998d" size="40" class="mr-2" name="order" customPrefix="mdi"></u-icon>
          <text>{{item.time}}</text>
        </view>
        <view class="d-flex align-center px-4 py-2">
          <text>报告单号：</text>
          <text>{{item.reportNo}}</text>
        </view>
      </view>
      <u-loadmore :status="loadMoreStatus"/>
    </view>
		<view v-else class="pa-8">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无报告" mode="list"></u-empty>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
      memberId(){
        return this.$store.state.member.memberId
      }     
    },
    onShow() {
      this.init()
    },
    onReachBottom() {
      if (!this.allLoaded) {
        this.loadMoreStatus = 'loading'
        this.page++
        this.init('Yo')
      }
    },
    methods: {
      init (e) {
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          rows: this.rows,
          page: this.page
        }
        this.$http.get('/mobile/device/findDeviceReportList', data)
          .then(res => {
            if (res.data.success) {
              const pager = res.data.pager
              const rows = res.data.rows
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.list = e ? this.list.concat(rows) : rows              
            }
          })
      },
      toReportDetails (id) {
        uni.navigateTo({
          url: './medicalReportDetails?id=' + id
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
