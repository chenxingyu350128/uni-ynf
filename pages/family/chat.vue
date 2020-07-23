<template>
	<view>
		<view
		  v-for="(item, index) in list" 
		  :key="index" 
      class="caption"
		>
		  <view @click="toDetail(item)" class="item u-border-bottom">
		    <!-- <image mode="aspectFill" :src="item.images" /> -->
		    <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
		    <view class="d-flex align-center pa-4">
		      
		      <!-- <text class="headline font-weight-bold">{{item.remindTime}}</text> -->
          <u-image width="96" height="96" shape="circle" :src="item.image"></u-image>
		      <view class="flex-fill mx-4 d-flex flex-column ">
		        <text>{{item.realName}}</text>
		        <view class="mt-2 d-flex justify-space-between grey--text">
              <text>语音聊天</text>
              <text>{{item.lastchatTime}}</text>
            </view>
		      </view>
		      <u-icon size="45" name="arrow-right"></u-icon>
		    </view>
		  </view>
		</view>
    <u-loadmore :status="loadMoreStatus"/>
    
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
			}
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onReachBottom() {
      if (!this.allLoaded) {
        console.log('allLoaded值为：'+this.allLoaded)
        this.loadMoreStatus = 'loading'
        this.page++
        this.init('Yo')
      } else {
        return false
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init (e) {
        const data = {
          sessionId: this.sessionId,
          page: this.page,
          rows: this.rows
        }
        this.$http.get('/mobile/user/getMemberBindedList', data)
          .then(res => {
            if (res.data.success) {
              const rows = res.data.obj
              const pager = res.data.pager
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.list = e ? this.list.concat(rows) : rows
            }
          })
      },
      toDetail (item) {
        const {memberId, realName, messagesType} = item
        uni.navigateTo({
          url: `./chatDetails?memberId=${memberId}&realName=${realName}&type=${messagesType}`
        })
      },
    }
	}
</script>

<style lang="scss">

</style>
