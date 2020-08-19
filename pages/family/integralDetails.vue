<template>
  <view class="white full-height posRela">
    <view v-if="detailsList.length">
      <view v-for="(item, i) in detailsList" :key="i">
        <view class="pa-2 grey lighten-3 grey--text">{{item.createTime}}</view>
        <view v-for="(itm, idx) in item.list" :key="idx" class="white px-4 py-2 d-flex align-center justify-space-between">
          <text>{{itm.reminder}}</text>
          <text class="green--text text--accent-2">+{{itm.memIntegral}}</text>
        </view>
      </view>
      <u-loadmore :status="loadMoreStatus"/>
    </view>
    <view v-else class="pa-8">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无明细" mode="list"></u-empty>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				detailsList: [],
				page: 1,
				rows: 10,
				allLoaded: false,
				loadMoreStatus: 'loadmore', 
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      }
    },
    onShow() {
      this.getList()
    },
    onReachBottom() {
      if (!this.allLoaded) {
        this.loadMoreStatus = 'loading'
        this.page++
        this.getList('Yo')
      }
    },
    methods: {
      getList (e) {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          rows: this.rows,
          page: this.page
        }
        this.$http.get('/mobile/activity/findIntegralList', data)
          .then(res => {
            if (res.data.success) {
              const pager = res.data.pager
              const rows = res.data.rows
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.detailsList = e ? this.detailsList.concat(rows) : rows
            }
          })
      },      
    }
	}
</script>

<style lang="scss" scoped>
.IndexHigh{
  z-index: 666;
}
</style>
