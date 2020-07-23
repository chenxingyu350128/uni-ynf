<template>
	<view>
    <view 
      v-for="(item,index) in list" 
      :key="index"
      class="pa-2 d-flex align-center border-box u-border-bottom u-line-1"
    >
      <u-icon :color="item.type===5?'#ff7450':'#ffc107'" size="80" :name="item.type===5?'alarm-warning':'alert-outline'" customPrefix="mdi"></u-icon>
      <view class="d-flex flex-column body-2 ml-2 contentWidth">
        <view class="d-flex">
          <text>{{item.name}}</text>
          <text class="ml-2">{{item.title}}</text> 
        </view>
        <text class="caption grey--text mt-2">{{item.time}}</text>
      </view>
      <view @click="toDetails(item)" style="width: 5em;" class="grey--text">查看详情</view>
    </view>
		<u-loadmore :status="loadMoreStatus"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				rows: 20,
				allLoaded: false,
				list: [],
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
      const enterAlarmDetails = this.$store.state.app.enterAlarmDetails
      if (enterAlarmDetails) {
        this.$store.commit('SET_SINGLE_ITEM', ['enterAlarmDetails', false])
      } else {   
        
        this.init()
      }
      
    },
    onReachBottom() {
      if (!this.allLoaded) {
        this.loadMoreStatus = 'loading'
        this.page++
        this.init('Yo')
      }
    },
    methods: {
      toDetails (e) {
        console.log(e)
        const type = e.type 
        const alarId = e.alarId
        const memberId = e.member_id
        uni.navigateTo({
          url: `./alarmDetails?type=${type}&alarmId=${alarId}&memberId=${memberId}`
        })
      },
      init (e) {
        let data ={
          memberId: this.memberId,
          sessionId: this.sessionId,
          page: this.page,
          rows: this.rows
        }  
        this.$http.get('/mobile/healthy/findAllAlertList', data)
          .then(res=>{
            if(res.data.success){
              const pager = res.data.pager
              const rows = res.data.rows
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
.contentWidth{
  width: calc(100% - 5em)!important;
}
</style>
