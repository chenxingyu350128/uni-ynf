<template>
	<view class="page">
		<view class="caption px-4 py-2">
      腕表在开机情况下按住5秒，会向你设置的紧急联系人电话
      呼叫并会附带当前位置的求助位置
      <text @click="toEmergencyInfo" class="primary--text">完善个人紧急信息</text>
    </view>
    <view class="mt-4 px-4 py-2">
      紧急联系人(最多5个)
    </view>
    <!-- <u-line color="grey" /> -->
    <view class="pa-4">
      
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
    
    <view class="posFix b0 full-width">
      <u-line color="grey" />
      <view @click="addContact" class="py-2 d-flex align-center justify-center primary--text">
        <u-icon size="60" name="plus-circle"></u-icon>
        <text class="ml-4">添加紧急联系人</text>
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
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      },
    },
    onShow() {
      this.getContacts()
    },
    onBackPress (e) {
      console.log(e)
    },
    methods: {
      getContacts () {
        const params = {
          sessionId: this.sessionId,
          memberId: this.memberId,
        }
        this.$http.get('/mobile/user/contactsList', params)
        .then(res=>{
          if(res.data.success){
            this.contacts = res.data.obj
            this.contacts.forEach(res => {
              this.$set(res, 'show', false)
            })
          }
        })
      },
      toEmergencyInfo () {
        uni.navigateTo({
          url: './EmergencyInfo?emergency=1' // 无参数为正常联系人
        })
      },
      toModify (e) {
        console.log(e)
        uni.navigateTo({
          url: './modifyContact?emergency=1&item=' + encodeURIComponent(JSON.stringify(e))
        })
      },
      addContact () {
        if (this.contacts.length === 5) {
          this.$u.toast('最多只能有5个紧急联系人')
          return false
        }
        uni.navigateTo({
          url: './modifyContact?emergency=1'
        })
      },
      click(i, index) {
        uni.showModal({
          title: '删除紧急联系人',
          cancelColor: '#f00',
          content: '是否要删除该紧急联系人？',
          success: result => {
            if (result.confirm) {
              const contactId = this.contacts[i].contactsId
              const data = {
                sessionId: this.sessionId,
                contactId
              }
              this.$http.post('/mobile/user/delContacts', data)
                .then(res=>{
                  if(res.data.success){
                    this.getContacts()
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
