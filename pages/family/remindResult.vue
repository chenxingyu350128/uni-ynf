<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#fff" back-icon-name="arrow-left" title="监测结果" :background="background"></u-navbar>
		<view v-if="list.length" class="pa-4">
      <view v-for="(item, i) in list" :key="i">
        <view class="pa-2 d-flex align-center">
          <u-icon size="40" color="#00c853" name="bell"></u-icon>
          <text class="green--text text--accent-4">{{item.title}}</text>
        </view>
        <view class="pa-4">{{item.content}}</view>
      </view>
    </view>
    <view v-else class="pa-8">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无结果" mode="data"></u-empty>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBG: '',
        type: '',
        list: []
			};
		},
    onLoad(e) {
      if (e) {
        this.navBG = e.navBG
        this.type = parseInt(e.type)
      }
    },
    onShow() {
      this.init()
    },
    computed: {
      memberId(){
        return this.$store.state.member.memberId
      },
      sessionId(){
        return this.$store.state.app.sessionId
      },
      background () {
        return {
          backgroundColor: this.navBG
        }
      }
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
        }
        const urls = [
          '/mobile/healthy/getHeartRate',
          '/mobile/healthy/getBlutdruck',
          '/mobile/healthy/getBloodSugar'
        ]
        this.$http.post(urls[this.type], data)
          .then(res => {
            if (res.data.success) {
              this.list = res.data.obj
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
