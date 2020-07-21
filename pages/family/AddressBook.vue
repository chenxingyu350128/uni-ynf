<template>
	<view>
    <view v-if="contacts.length" class="pa-4">
      <u-swipe-action 
        :show="item.show" 
        :index="index" 
        v-for="(item, index) in contacts" 
        :key="index" 
        @click="click" 
        @open="open"
        :options="options"
      >
        <view @click="toModify(item)" class="item u-border-bottom">
          <!-- <image mode="aspectFill" :src="item.images" /> -->
          <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
          <view class="title-wrap py-4">
            <!-- <u-line color="grey" /> -->
            <view  class="d-flex align-center">
              <text>{{item.trueName}}</text>
              <text class="ml-4">{{item.rela}}</text>
              <text class="flex-fill text-right mx-4">{{item.phone}}</text>
              <u-icon size="48" name="arrow-right"></u-icon>
            </view>
            <text class="title u-line-2">{{ item.title }}</text>
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
      <view @click="addContact" class="py-2 d-flex align-center justify-center primary--text">
        <u-icon size="60" name="plus-circle"></u-icon>
        <text class="ml-4">添加联系人</text>
      </view>
    </view>    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contacts: [],
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
        return Number(this.$store.state.member.memberId)
      },       
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        let params = {
          sessionId: this.sessionId,
          memberId: this.memberId,
        }
        // let url = this.title=='通讯录'?'/mobile/user/booksList':'/mobile/user/contactsList'
        let url = '/mobile/user/booksList'
        this.$http.get(url, params)
          .then(res=>{
            if(res.data.success){
              this.contacts = res.data.obj
              this.contacts.forEach(res => {
                this.$set(res, 'show', false)
              })
            }
          })
      },
      toModify (e) {
        console.log(e)
        uni.navigateTo({
          url: './modifyContact?item=' + encodeURIComponent(JSON.stringify(e))
        })
      },
      addContact () {
        uni.navigateTo({
          url: './modifyContact'
        })
      },
      click(i, index) {
        uni.showModal({
          title: '删除联系人',
          cancelColor: '#f00',
          content: '是否要删除该联系人？',
          success: result => {
            if (result.confirm) {
              const bookId = this.contacts[i].bookId
              const data = {
                sessionId: this.sessionId,
                bookId
              }
              this.$http.post('/mobile/user/delBooks', data)
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
        
        this.contacts.forEach((res, i) => {
          this.$set(res, 'show', i===index)
        })
      }       
    }
	}
</script>

<style lang="scss">

</style>
