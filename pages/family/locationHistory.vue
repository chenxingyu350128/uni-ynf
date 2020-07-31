<template>
	<view>
    <view class="pa-4">
      <u-button @click="showDatePicker=true" type="primary">{{monthStr}}</u-button>
      <!-- <u-button @click="getHistoryDetails" type="primary">’test‘</u-button> -->
    </view>
    <view v-if="list.length">
      
      <view v-for="(item,index) in list" :key="index">
        <view
          class="d-flex flex-wrap align-center px-2 py-4 subtitle-1 grey--text"
          @click="getHistoryDetails(item.day)"
        >
          <text>{{ item.date }}</text>
          <text class="flex-fill ml-4">{{ item.count }}条</text>
          <u-icon name="arrow-right" size="40"></u-icon>
        </view>
        <u-line color="grey" />
      </view>
    </view>
    <view v-else class="pa-8">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无历史记录" mode="list"></u-empty>
    </view>
    <u-picker 
      @confirm="dataChange" 
      :params="params" 
      :default-time="dateStr + ' 13:00'"
       mode="time" 
       :end-year="yearNow"
       v-model="showDatePicker"
     />
	</view>
</template>

<script>
	export default {
		data() {
			return {
        showDatePicker: false,
        params: {
          year: true,
          month: true,
          day: false,
          hour: false,
          minute: false,
          second: false,
        },
				datePickerValue: '',
				monthPickerValue: '',
        list: [] 
			};
		},
    computed: {
      dateStr () {
        return this.datePickerValue || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      yearNow () {
        return Number(this.$u.timeFormat(new Date(), 'yyyy'))
      },
      monthStr () {
        return this.monthPickerValue || this.$u.timeFormat(new Date(), 'yyyy-mm')
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          month: this.monthStr
        }
        this.$http.get('/mobile/user/getLocusCount', data)
          .then(res=>{
            if(res.data.success){
              this.list = res.data.obj
            }
          })
      },
      getHistoryDetails (e) {
        uni.navigateTo({
          url: './locationHistoryMap?day=' + e
        })
      },
      dataChange (e) {
        console.log(e)
        this.datePickerValue = e.year +'-' + e.month + '-01'
        this.monthPickerValue = e.year +'-' + e.month
        this.init()
      }
    }
	}
</script>

<style lang="scss">

</style>
