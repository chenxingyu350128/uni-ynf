<!-- 列组件 -->
<template>		
  <view :class="'col-'+cols">		
    <slot></slot>
  </view>	
</template>

<script>    
    export default {
        name: 'Col',
        props: {
            cols: {
                type: [Number, String]
            }         
        },
        data() {               
            return {              
            }
        }
    }
</script>

<style scoped lang="scss">
@for $i from 1 through 12 {
  .col-#{$i} {
    width: $i * 750rpx / 12; 
   }
}     
</style>