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
        <view @click="toModify(item.railId)" class="item u-border-bottom">
          <!-- <image mode="aspectFill" :src="item.images" /> -->
          <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
          <view class="title-wrap">
            <!-- <u-line color="grey" /> -->
            <view  class="d-flex align-center px-4 py-2">
              <view class="d-flex flex-column flex-fill mr-4">
                <text>{{item.name}}</text>
                <text class="mt-2 u-line-1">{{item.address}}</text>
              </view>
              <u-icon color="grey" size="48" name="arrow-right"></u-icon>
            </view>
          </view>
        </view>
      </u-swipe-action>      
    </view>
    <view v-else class="pa-8">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无安全围栏" mode="list"></u-empty>
    </view>
		<view class="posFix b0 full-width">
      <u-button @click="toModify" :custom-style="customStyle" type="primary">添加</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset',
          backgroundColor: '#00aaef'
        },
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ],
				list: []
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
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/user/getRail', data)
          .then(res => {
            if (res.data.success) {
              this.list = res.data.obj
              this.list.forEach(rs => {
                this.$set(rs, 'show', false)
              })
            }
          })
      },

      toModify (railId) {
        uni.navigateTo({
          url: railId ? `./modifyFence?railId=${railId}` : './modifyFence'
        })
      },
      click(i, index) {
        uni.showModal({
          title: '删除安全围栏',
          cancelColor: '#f00',
          content: '是否要删除该安全围栏？',
          success: result => {
            if (result.confirm) {
              const railId = this.list[i].railId
              const data = {
                sessionId: this.sessionId,
                railId
              }
              this.$http.post('/mobile/user/delWatchRail', data)
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
