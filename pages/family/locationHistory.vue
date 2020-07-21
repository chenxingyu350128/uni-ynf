<template>
	<view>
    <view class="pa-4">
      <u-button @click="showDatePicker=true" type="primary">{{monthStr}}</u-button>
      <!-- <u-button @click="getHistoryDetails" type="primary">’test‘</u-button> -->
    </view>
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
    <u-picker 
      @confirm="dataChange" 
      :params="params" 
      :default-time="dateStr + ' 13:00'"
       mode="time" 
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
			};
		},
    computed: {
      dateStr () {
        return this.datePickerValue || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
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
        this.datePickerValue = e.year +'-' + e.month + '-' + e.day
        this.monthPickerValue = e.year +'-' + e.month
        this.init()
      }
    }
	}
</script>

<style lang="scss">

</style>
