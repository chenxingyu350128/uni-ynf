<!-- 行组件 -->
<template>
    <view class="row" :style="{'justify-content': justify, 'align-items': align }">
      <slot></slot>
    </view>
</template>

<script>
  export default {
    name: 'Row',
    props: {           
      justify:{
        type:String,
        default: 'flex-start'
      },
      align: {
        type: String,
        default: 'center'
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
</style>
