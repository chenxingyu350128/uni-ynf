<!-- 行组件 -->
<template>
    <view class="row" :style="'justify-content:'+align ">
      <view v-if="offset!=0" :class="'row-'+offset"></view>
      <slot></slot>
    </view>
</template>

<script>
  export default {
    name: 'Row',
    props: {           
      align:{
        type:String,
        default: 'flex-start',                
      },
     offset: {
       type: [Number, String],
       default:0
     }
    },        
    mounted() {            
    }
  }
</script>

<style scoped lang="scss">
	view {
		box-sizing: border-box;
	}
  .row {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  @for $i from 1 through 100 {
    .row-#{$i} { width: $i/100*750rpx; }
  }
</style>
