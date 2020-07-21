<template>
	<view>
		<view class="d-flex flex-wrap py-4">
      <view 
        v-for="(item, i) in list" 
        :key="i"
        class="col-3 pa-2 border-box d-flex flex-column align-center justify-center"
        @click="addFeedback(i)"
      >
        <view class="circleBox teal white--text d-flex">
          <u-icon class="ma-auto" size="65" :name="item.icon" customPrefix="mdi"></u-icon>
        </view>
        <text class="mt-2">{{item.name}}</text>
      </view>
    </view>
    <view class="posFix b0 full-width">
      <u-button @click="toMyFeedback" :custom-style="btnStyle" type="primary">我的反馈</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        btnStyle: {
          'border-radius': 'unset!important',
          background: '#00aaef'
        },
        list: [
          {
            name: 'APP应用',
            icon: 'phone'
          },
          {
            name: '腕表',
            icon: 'watch-nice'
          },
          {
            name: '耗电',
            icon: 'energy-full'
          },
          {
            name: '腕表外表',
            icon: 'apple-watch'
          },
          {
            name: '其他',
            icon: 'experiment'
          },
        ]
			};
		},
    methods: {
      toMyFeedback () {
        uni.navigateTo({
          url: './myFeedback'
        })
      },
      addFeedback (i) {
        uni.navigateTo({
          url: './addFeedback?type=' + i
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.circleBox{
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
}
</style>
