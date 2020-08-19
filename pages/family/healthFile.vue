<template>
	<view>
    <view class="v-top pa-4 d-flex flex-column justify-end align-center">

      <image class="logoImg ma-auto" src="@/static/img/logo.png" mode="aspectFit"></image>
      
      <view class="mb-2 mt-4 d-flex align-center justify-center">

        <u-divider 
          color="#333" 
          half-width="200" 
          border-color="#6d6d6d"
        >
          颐纳福健康资料库
        </u-divider>
      </view>
      <text class="caption grey--text">快速查询健康资料</text>
    </view>
    <view
      class="border-box grey lighten-3 ma-4  grey--text elevation-4"
      @click="toHealthReport"
    >
      <view class="pa-4 d-flex align-center">
        <view class="avatarShell d-flex align-center justify-center teal lighten-4">
          <u-icon color="#fff" size="50" name="clover" customPrefix="mdi"></u-icon>
        </view>
        
        <text class="subtitle-1 ml-4">健康报告</text>
        <text class="flex-fill text-right">
          <u-icon name="arrow-right"></u-icon>
        </text>
      </view>
    </view>
    <view
      class="border-box grey lighten-3 ma-4 grey--text elevation-4"
      @click="toMedicalReport"
    >
      <view class="pa-4 d-flex align-center">
        <view class="avatarShell d-flex align-center justify-center cyan lighten-4">
          <u-icon color="#fff" size="50" name="clipboard-pulse-outline" customPrefix="mdi"></u-icon>
          
        </view>
        <text class="subtitle-1 ml-4">体检报告</text>
        <text class="flex-fill text-right">
          <u-icon name="arrow-right"></u-icon>
        </text>
      </view>
    </view>    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    methods: {
      toHealthReport () {
        uni.navigateTo({
          url: './healthReport'
        })
      },
      toMedicalReport () {
        uni.navigateTo({
          url: './medicalReport'
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.logoImg{
  width: 170rpx;
  height: 112rpx;
}
.avatarShell{
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
}
</style>
