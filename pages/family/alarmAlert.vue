<template>
  <view>
    <view v-if="list.length">
      <u-swipe-action 
        :show="item.show" 
        :index="index" 
        v-for="(item, index) in list" 
        :key="index" 
        @click="click" 
        @open="open"
        :options="options"
      >
        <view @click="toModify(item)" class="item u-border-bottom">
          <!-- <image mode="aspectFill" :src="item.images" /> -->
          <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
          <view class="d-flex align-center pa-4">
            
            <text class="headline font-weight-bold">{{item.remindTime}}</text>
            <view class="flex-fill ml-4 d-flex flex-column">
              <text>{{item.startTime}} 至 {{item.endTime}}</text>
              <text class="mt-2 u-line-2">{{item.medicineTitle}}</text>
            </view>
            <u-icon size="45" name="arrow-right"></u-icon>
          </view>
        </view>
      </u-swipe-action>
    </view>
    <view v-else class="mt-12">      
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty class="mt-4" text="暂无通讯录" mode="list"></u-empty>
    </view>
    <view class="posFix b0 full-width">
      <u-line color="grey" />
      <view @click="toAdd" class="py-2 d-flex align-center justify-center primary--text">
        <u-icon size="60" name="plus-circle"></u-icon>
        <text class="ml-4">添加提醒</text>
      </view>
    </view> 
  </view>
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
        ]
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
    methods: {
      init () {
        let data ={
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/healthy/getWatchMedicine', data)
          .then(res => {
            if(res.data.success){
              this.list = res.data.obj
            }
          })
      },
      toModify (e) {
        console.log(e)
        uni.navigateTo({
          url: './modifyRemind?item=' + encodeURIComponent(JSON.stringify(e))
        })
      },
      toAdd () {
        uni.navigateTo({
          url: './modifyRemind'
        })
      },
      click(i, index) {
        uni.showModal({
          title: '删除闹钟提醒',
          cancelColor: '#f00',
          content: '是否删除该闹钟提醒？',
          success: result => {
            if (result.confirm) {
              const medicineId = this.list[i].medicineId
              const data = {
                sessionId: this.sessionId,
                medicineId
              }
              this.$http.post('/mobile/healthy/deleteWatchMedicine', data)
                .then(res=>{
                  if(res.data.success){
                    this.init()
                    this.$u.toast(res.data.msg)
                  }
                })   
            }
          }
        })
      },
      open(index) {
      	// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      	// 原本为'false'，再次设置为'false'会无效
        
        this.list.forEach((res, i) => {
          this.$set(res, 'show', i===index)
        })
      }        
    }
	}
</script>

<style lang="scss">

</style>
