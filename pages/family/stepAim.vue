
<template>
	<view class="page posRela">
		<image class="BG" src="./static/img/stepAim.jpg"></image>
    <view class="posAbs full-size fill-height">
      <view class="pa-4 text-center">
        请设定运动目标
      </view>
      <view class="pa-4 text-center caption">
        根据世界卫生组织的建议，你每天需要进行中等强度的运动40分钟，相当于快走8000步
      </view>
      <picker-view 
        v-if="showPicker" 
        indicator-class="primary--text" 
        :value="defaultValue" 
        class="fill-height" 
        :indicator-style="columnStyle"
        @change="pickerChange"
      >
        <picker-view-column  class="fill-height">
          <view 
          v-for="(item, i) in list" 
          :key="i"
          class="d-flex align-center justify-center"
          :class="item.value===aim?'font-weight-bold primary--text display-1':''"
          >
            {{item.label}}
          </view>
        </picker-view-column>
      </picker-view>
      <view class="posFix b0 full-width pa-4">
        <u-button @click="setAim" type="primary">设置</u-button>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        columnStyle: {
          height: '50px',
          color: '#00aaef',
          'text-align': 'center'
        },
				showPicker: false,
        aim: 5000
			};
		},
    computed: {
      list () {
        let arr = []
        for(let i=1;i<51;i++){
          arr.push({
            value: i * 1000,
            label: i+','+'000'
          })
          // arr.push(i*1000)
        }
        return arr
      },
      defaultValue () {
        let result = 4
        this.list.forEach((res, i) => {
          if (res.value == this.aim) {
            result = i
          }
        })
        return [result]
      },
      sessionId(){
        return this.$store.state.app.sessionId
      },
      memberId(){
        return this.$store.state.member.memberId
      },
    },
    onLoad(e) {
      console.log(e)
      if (e.aim) {
        this.aim = Number(e.aim)
      }
    },
    onShow() {
      setTimeout(() => {
        this.showPicker = true
      }, 300)
    },
    methods: {
      pickerChange (e) {
        console.log(e)
        const index = e.detail.value[0]
        this.aim = this.list[index].value
      },
      setAim () {
        let data ={
          memberId: this.memberId,
          sessionId: this.sessionId,
          goalNum: this.aim || 5000
  
        }
        this.$http.post('mobile/healthy/setGoalStep', data)
        .then(res=>{
          if(res.data.success){
            this.$u.toast('设置成功！')
            setTimeout(() => {
              uni.navigateBack()
            }, 500)
          }
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
  .page{
    height: 100vh;
  }
.BG{
  width: 750rpx;
  height: 100vh;
}
 picker-view {
        width: 100%;
        height: 600rpx;
        margin-top:20rpx;
    }
    .item {
        line-height: 100rpx;
        text-align: center;
    }
</style>
