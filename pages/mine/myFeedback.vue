<template>
	<view>
    <view v-if="list.length">
      
      <u-swipe-action
      :show="item.show" 
       v-for="(item, index) in list" 
      :index="index" 
       :key="index" 
       @click="click" 
       @open="open"
       :options="options"
      >
        <u-line color="grey" />
        <view
          class="d-flex align-center justify-space-between pa-4"
          @click="itemClick(item.feedbackId)"
        >
          <view class="d-flex flex-column">
            <text class="u-line-1">{{ item.feedbackContent }}</text>
            <text class="mt-3" :class="stateClasses[item.state]">{{ item.status }}</text>
          </view>
          <text class="d-flex align-center">
            {{ item.createTime }} 
          </text>
          <u-icon name="arrow-right" size="45"></u-icon> 
        </view>
      </u-swipe-action>
      <u-loadmore :status="loadMoreStatus"/>
    </view>
    <view v-else class="pa-6">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无反馈" mode="list"></u-empty>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ],
				list: [],
        stateClasses: ['primary--text', 'warning--text', 'success--text', 'error--text'],
        page: 1,
        rows: 10,
        allLoaded: false,
        loadMoreStatus: 'loadmore'
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onShow() {
      this.init()
    },
    onReachBottom() {
      if (!this.allLoaded) {
        this.loadMoreStatus = 'loading'
        this.page++
        this.init('Yo')
      }
    },
    methods: {
      init (e) {
        const params = {
          sessionId: this.sessionId,
          page: this.page,
          rows: this.rows
        }
        this.$http.get('/mobile/personal/findFeedbackList', params)
          .then(res => {
              const rows = res.data.rows
              const stateArr = ['待处理','处理中','待评价','已评价'] 
              rows.forEach(re => {
                this.$set(re, 'status', stateArr[re.state])
                this.$set(re, 'show', false)
              })
              const pager = res.data.pager
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              this.list = e ? this.list.concat(rows) : rows            
          })
      },
      itemClick (e) {
        uni.navigateTo({
          url: './feedbackDetails?id=' + e
        })
      },
      click(i) {
        uni.showModal({
          title: '删除反馈',
          cancelColor: '#f00',
          content: '是否删除该反馈？',
          success: result => {
            if (result.confirm) {
              const feedbackId = this.list[i].feedbackId
              const data = {
                sessionId: this.sessionId,
                feedbackId
              }              
              this.$http.post('/mobile/personal/delFeedback', data)
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
