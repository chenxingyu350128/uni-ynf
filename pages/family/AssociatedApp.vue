<template>
	<view v-if="list.length">
<!--    <view v-for="(item,index) in list" :key="index">
      <view class="d-flex subtitle-2 align-center pa-4">
        <u-image :src="item.image" width="100" height="100"></u-image>
        <view class="flex-fill d-flex flex-column ml-4">
          <text>{{ item.relaName||"未填写" }}({{ item.rela || '未知' }})</text>
          <text class="mt-2">{{ item.domicile }}</text>
        </view>
        <text>{{ item.userType?"VIP会员":"普通会员" }}</text>
      </view>
      <u-line color="grey" />
    </view> -->
    <u-swipe-action
    :show="item.show" 
     v-for="(item, index) in list" 
    :index="index" 
     :key="index" 
     @click="click" 
     @open="open"
     :options="options"
    >
      <view class="d-flex subtitle-2 align-center pa-4">
        <u-image :src="item.image" width="100" height="100"></u-image>
        <!-- <img :src="item.image||defaultAvatar" alt=""> -->
        <view class="flex-fill d-flex flex-column ml-4">
          <text>{{ item.relaName||"未填写" }}({{ item.rela || '未知' }})</text>
          <text class="mt-2">{{ item.domicile }}</text>
        </view>
        <text>{{ item.userType?"VIP会员":"普通会员" }}</text>
      </view>
    </u-swipe-action>
	</view>
  <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
  <u-empty v-else text="暂无关联" mode="list"></u-empty>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ],
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      },        
      userId(){
        return this.$store.state.app.userId
      },      
      memberId(){
        return this.$store.state.member.memberId
      }            
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/user/userAppList', data)
          .then(res => {
            if(res.data.success){
              this.list = res.data.obj
              this.list.forEach(res => {
                this.$set(res, 'show', false)
              })
            }
          })
      },
      click(i, index) {
        console.log(i, index)
        const userId = this.list[i].userId
        if (this.userId === userId) {
          this.$u.toast('无法删除本人')
          this.list[i].show = false
          return false
        }
        uni.showModal({
          title: '删除成员',
          cancelColor: '#f00',
          content: '是否删除该成员？',
          success: result => {
            this.list[i].show = false
            if (result.confirm) {
              const data = {
                userId,
                memberId: this.memberId,
                sessionId: this.sessionId
              }
              this.$http.post('/mobile/user/delMember', data)
              .then(res => {
                if (res.data.success) {
                  this.$u.toast(res.data.msg)
                  uni.$emit('getMemberList')
                  this.$nextTick(() => {
                    this.init()
                  })
                }
              })
            }
          } 
        })
      },
      open(index) {
      	// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      	// 原本为'false'，再次设置为'false'会无效
        console.log(index)
        
        this.list.forEach((res, i) => {
          this.$set(res, 'show', i===index)
        })
      } 
    }
	}
</script>

<style lang="scss">

</style>
