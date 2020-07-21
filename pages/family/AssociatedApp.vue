<template>
	<view v-if="list.length">
    <view v-for="(item,index) in list" :key="index">
      <view class="d-flex subtitle-2 align-center pa-4">
        <u-image :src="item.image" width="100" height="100"></u-image>
        <!-- <img :src="item.image||defaultAvatar" alt=""> -->
        <view class="flex-fill d-flex flex-column ml-4">
          <text>{{ item.relaName||"未填写" }}({{ item.rela || '未知' }})</text>
          <text class="mt-2">{{ item.domicile }}</text>
        </view>
        <text>{{ item.userType?"VIP会员":"普通会员" }}</text>
      </view>
      <u-line color="grey" />
    </view>
	</view>
  <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
  <u-empty v-else text="暂无关联" mode="list"></u-empty>
</template>

<script>
	export default {
		data() {
			return {
				list: []
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
      const data = {
        memberId: this.memberId,
        sessionId: this.sessionId
      }
      this.$http.get('/mobile/user/userAppList', data)
        .then(res => {
          if(res.data.success){
            this.list = res.data.obj
          }
        })
    }
	}
</script>

<style lang="scss">

</style>
