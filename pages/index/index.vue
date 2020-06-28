<template>
	<view>
    <!-- 蓝色块 -->
    <view class="primary white--text">
      <uni-row align="justify-space-between">
        <uni-col cols="3" class="text-center">
          <view class="d-flex align-center justify-center">
            <text>福州</text>
            <text class="mdi mdi-chevron-down ml-1"></text>
          </view>
        </uni-col>
        <uni-col cols="6" class="d-flex justify-center align-center text-center">
          <text v-if="eazyMode" class="title font-weight-bold">颐纳福</text>
          <view v-else class="d-flex justify-center">
            <view  class="circle-white d-flex align-center justify-center">
              <text class="mdi mdi-plus grey--text"></text>
            </view>
          </view>
        </uni-col>
        <uni-col cols="3" class="text-right ">
          <text class="mdi mdi-email mr-2"></text>
          <uni-icons color="teal" type="mdi-chevron-right"></uni-icons>
        </uni-col>
      </uni-row>
      6666
    </view>
		
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			eazyMode: false
		}
	},
  onLoad() {
    this.getIndex()
  },
  methods: {
    getIndex () {
      this.$http.get('/mobile/index/getIndex')
    }
  }
}
</script>

<style lang="scss" scoped>
  .topSpace{
    height: var(--status-bar-height);
  }
  .circle-white{
    height: 150rpx;
    width: 150rpx;
    background-color: #fff;
    border-radius: 50%;
  }
</style>
