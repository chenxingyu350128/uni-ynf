<template>
	<view>
    <view
      v-for="(item,i) in list"
      :key="i"
    >
      <view class="px-4 py-2">
        {{ item.year }}年
      </view>
      <view
        v-for="(itm,idx) in item.month" 
        :key="idx" 
        class="px-4 py-2 d-flex align-center" 
        @click="toDetail(item.year, itm)"
      >
        <u-icon color="#81c784" name="order" size="65"></u-icon>
        <text class="flex-fill">{{ itm }}月份 健康报告</text>
        <u-icon color="grey" name="arrow-right"></u-icon>
      </view>
    </view>
    <view
      v-if="!list.length"
      class="pa-4 text--secondary text-center"
    >
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无报告" mode="list"></u-empty>
    </view>    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
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
      this.init()
    },
    methods: {
      init () {
        const params = {
          memberId: this.memberId,
          sessionId: this.sessionId,
        }
        this.$http.get('/mobile/healthy/getHealthRecordByMonth', params)
          .then(res=>{
            if(res.data.success){
              this.list = res.data.obj
            }
          })
      },
      toDetail (y, m) {
        console.log(y, m)
        const monthStr = y + '-' + (m < 10 ? '0' + m : m)
        uni.navigateTo({
          url: './healthReportDetails?month=' + monthStr
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
