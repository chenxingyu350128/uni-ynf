<template>
  <view class="battery">
    <view
      class="fill-height"
      :style="{'width': battery+'%'}"
      :class="battery<=20?'red':'white'"
    />
    <view class="extra" />
  </view>
</template>

<script>
	export default {
    name: 'Battery',
    props:{
      battery:{
        type: Number,
        default: 55
      }
    }
	}
</script>

<style lang="scss" scoped>
.battery{
  position: relative;
  width: 40rpx;
  height: 17rpx;
  border-radius: 4rpx;
  border: 1px solid #fff;
  padding: 1px;
  margin: 10rpx 0;
  .extra{
    width: 6rpx;
    height: 10rpx;
    background: #fff;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%,-50%)
  }
  .fill-height{
    height: 100%;
  }
}
</style>
