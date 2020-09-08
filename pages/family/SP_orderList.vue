<template>
	<view>
    <view 
      v-for="(item, i) in list"
      :key="i"
    >
      <view class="body-2 grey lighten-2 pa-2 d-flex justify-space-between">
        <text>{{ item.orderNum }}</text>
        <text :class="item.dealStatus%2===0?'red--text':'green--text'">{{ item.dealStatus | dealStatus }}</text>
      </view>
      <view class="pa-2">
        <view class="d-flex pb-2">
<!--          <v-avatar
            tile
            size="85"
          >
            <img
              :src="item.packagePic"
            >
          </v-avatar> -->
          <u-avatar size="190" :src="item.packagePic" mode="square"></u-avatar>
          <view class="ml-2 flex-fill d-flex flex-column">
            <text>{{ item.packageName }}</text>
            <text>{{ item.remark }}</text>
            <view class="flex-fill d-flex align-end justify-end red--text title">
              {{ item.servicePrice | price }}
            </view>
          </view>
        </view>
        <!-- <v-viewider /> -->
        <view class="my-2 body-2">
          <view class="d-flex justify-space-between">
            <text>下单时间：</text>
            <text>{{ item.createTime }}</text>
          </view>
          <view
            v-if="item.payTime"
            class="d-flex justify-space-between mt-1"
          >
            <text>支付时间</text>
            <text>{{ item.payTime }}</text>
          </view>
          <view class="d-flex justify-space-between mt-1">
            <text>服务到期时间</text>
            <text>{{ item.endTime }}</text>
          </view>
        </view>
      </view>
    </view>
    <u-loadmore :status="loadMoreStatus"/>
    <u-empty v-if="!list.length" text="暂无关联" mode="list"></u-empty>
    
	</view>
</template>

<script>
	export default {
    filters: {
      dealStatus (e) {
        const arr = ['未付款', '交易成功', '交易失败', '免费赠送']
        return arr[e]
      }
    },
		data() {
			return {
        list: [],
        allLoaded: false,
        page: 1,
        rows: 10,
			};
		},
    computed: {
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
    methods: {
      init (e) {
        const params = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          page: this.page,
          rows: this.rows,
          loadMoreStatus: 'loadmore'
          
        }
        this.$http.get('/mobile/healthy/getPackageOrderList', params)
          .then(res => {
            if (res.data.success) {
              const pager = res.data.pager
              const rows = res.data.rows
              if (!pager.totalPages) {
                this.allLoaded = true
              } else {
                this.allLoaded =  pager.currentPage === pager.totalPages
              }   
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.list = e ? this.list.concat(rows) : rows
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
