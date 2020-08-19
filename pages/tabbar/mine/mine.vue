<template>
	<view>
    <view class="white--text cardBox posRela"> 
      <!-- <u-image class="posRela" width="750" height="400" style="z-index: -1;" src="@/static/img/mineBG.png" mode=""></u-image> -->
      <view class="full-width pa-4 white--text posAbs">
<!--        <view @click.stop="toMsgCenter" class="text-right posRela">
          <u-icon name="email" size="48" customPrefix="mdi"></u-icon>
          <u-badge offset="10, 10" v-if="msgCount" :count="msgCount" type="error"></u-badge>
        </view> -->
        <view
          class="full-width border-box d-flex align-center my-4 px-6"
          @click="toUserInfo"
        >
          <u-image :src="avatar" shape="circle" height="120" width="120"></u-image>

          <view
            style="z-index: 10"
            class="ml-4 d-inline-flex flex-column align-center"
          >
            <text class="subtitle-1 mb-1">{{ realName||'用户' }}</text>
          </view>
          <view class="flex-fill text-right">
            <u-icon size="48" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view>
      <u-cell-group>
        <u-cell-item @click="cellClick(0)" :arrow="true" title="我的钱包">
          <u-icon class="mr-2" slot="icon" color="#26c6da" size="48" name="wallet-outline" customPrefix="mdi"></u-icon>
        </u-cell-item>
        <u-cell-item @click="cellClick(1)" :arrow="true" title="联系客服" >
          <u-icon class="mr-2" slot="icon" color="#ff4081" size="48" name="server-fill"></u-icon>
        </u-cell-item>
        <u-cell-item @click="cellClick(2)" :arrow="true" title="使用帮助" >
          <u-icon class="mr-2" slot="icon" color="#fddf5c" size="48" name="question-circle"></u-icon>
        </u-cell-item>
        <u-cell-item @click="cellClick(3)" :arrow="true" title="意见反馈" >
          <u-icon class="mr-2" slot="icon" color="#1a237e" size="48" name="chat"></u-icon>
        </u-cell-item>
        <u-cell-item @click="cellClick(4)" :arrow="true" title="关于我们" >
          <u-icon class="mr-2" slot="icon" color="#1ac6ae" size="48" name="experiment" customPrefix="mdi"></u-icon>
        </u-cell-item>
      </u-cell-group>
    </view>
    <u-popup
      v-model="showServiceLine"
      mode="center"
    >
      <view class="pa-4 d-flex flex-column justify-center">
        
        <view class="pa-2 body-1">
          电话：&emsp;&emsp; <text class="primary--text" @click="callService">0591-88033037</text>
        </view>
        <view class="pa-2 body-1">
          服务时间： 09：00 - 18：00
        </view>
      </view>
    </u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgCount: 0,
        showServiceLine: false
			}
		},
    computed: {
      avatar () {
        return this.$store.state.app.image
      },
      realName () {
        return this.$store.state.app.realName
      },
      userId () {
        return this.$store.state.app.userId
      }
    },
    onShow() {
      if (!this.userId) {
        uni.navigateTo({
          url: '../../public/firstCome/firstCome'
        })
      }
    },
		methods: {
			toUserInfo () {
        uni.navigateTo({
          url: '../../family/InformationDetails?isUser=1'
        })
      },
      callService () {
        uni.makePhoneCall({
          phoneNumber: '059188033037'
        })
      },
      toMsgCenter () {
        console.log('???')
      },
      cellClick (e) {
        if (e === 1) {
          this.showServiceLine = true
          return false
        }
        
        const urls = [
          '../../mine/myWallet',
          '',
          '../../mine/usageAssistant',
          '../../mine/feedback',
          '../../mine/aboutUs',
        ]
        uni.navigateTo({
          url: urls[e]
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
.cardBox{
  position: relative;
  height: 160px;
  background: url(../../../static/img/mineBG.jpg);
  background-size: 100% 100%;
}
</style>
