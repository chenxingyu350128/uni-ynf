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
          }              ,
          offset: {
             type: [Number, String]
          }         
      }
    }
</script>

<style scoped lang="scss">
@for $i from 1 through 12 {
  .col-#{$i} {
    width: 100% / 12 * $i; 
  }
  .offset-#{$i} {
    margin-left: 100% / 12 * $i; 
  }
}     
</style>