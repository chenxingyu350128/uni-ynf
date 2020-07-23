<template>
	<view class="page">
    <view class="posRela border-box">
      <!-- <img :src="topBG"> -->
      <image class="full-width topBG" src="./static/img/mealRecordBG.jpg" mode="widthFix"></image>
      <view class="posAbs full-size">
        <view class="px-4 py-2 d-flex justify-center">
          <u-button size="medium" @click="showDatePicker=true" shape="circle" plain type="primary">
            {{dateStr}}
            <u-icon class="ml-2" :name="showDatePicker?'arrow-up':'arrow-down'"></u-icon>
          </u-button>
        </view>
        <view class="d-flex justify-space-around align-center py-6">
          <view class="d-flex flex-column align-center">
            <text class="caption">已摄能量</text>
            <text class="subtitle-1 font-weight-bold">{{ alreadyGet }}</text>
          </view>
          <u-circle-progress class="transparent" active-color="#cca416" :percent="score">
            <view class="d-flex flex-column black--text align-center">
              <view class="caption">
                营养评测
              </view>
              <view>
                <text class="subtitle-1 font-weight-bold">{{ score }}</text>	
                分
              </view>
            </view>
          </u-circle-progress>
          <view class="d-flex flex-column align-center">
            <text class="caption">建议能量</text>
            <text class="subtitle-1 font-weight-bold">{{ adviceGet }}</text>
          </view>
        </view>
      </view>
    </view>  
    <view
      flat
      class="mx-2 pa-4 white"
    >
      <view class="subtitle-1 font-weight-bold">
        今日美食
      </view>
      <view
        class="d-flex justify-space-between align-center" 
        @click="toMealPlan"
      >
        <view class="d-flex flex-column subtitle-2 flex-fill mr-4">
          <text class="mb-2">已摄入：{{ alreadyGet }}千卡/{{ adviceGet }}千卡</text>
          <u-line-progress height="20" active-color="#db9249" :percent="score" />
        </view>
        <u-icon  color="#ffb300" size="90" customPrefix="mdi" name="hamburge"></u-icon>
      </view>
      <view class="subtitle-1 font-weight-bold mt-6">
        今日饮水
      </view>
      <view
        class="d-flex justify-space-between align-center"
        @click="showWater=true"
      >
        <view class="d-flex flex-column subtitle-2 flex-fill mr-4">
          <text class="mb-2">已摄入：{{ 247*cups }}毫升/{{ adviceDrink }}毫升</text>
          <u-line-progress height="20" active-color="#4dd0e1" :percent="12.5*cups" />
        </view>
        <u-icon color="#4dd0e1" size="90" customPrefix="mdi" name="cup-water"></u-icon>
      </view>
    </view>
    <u-picker class="datePicker" @confirm="dataChange" :default-time="dateStr + ' 13:00'" mode="time" v-model="showDatePicker"/>
    <u-popup mode="bottom" v-model="showWater">
      
      <view class="pa-0">
        <view class="white d-flex flex-wrap align-center">
          <view
            class="col-3 text-center subtitle-2 text--secondary"
            @click="showWater=false"
          >
            返回
          </view>
          <view
            class="col-6 text-center subtitle-1 text--primary"
          >
            今日饮水
          </view>
          <view
            class="col-12 text-center subtitle-2 cyan--text text--lighten-2"
          >
            （每日饮水量1976ml）
          </view>
        </view>
        <view class="d-flex flex-wrap">
          <view
            v-for="(item, n) in numArr"
            :key="n"
            class="col-3"
          >
            <view
              class="white b-radius0 pa-2 d-flex flex-column align-center"
            >
              <u-icon v-if="n<cups" size="90" color="#4dd0e1" customPrefix="mdi" name="cup-water"></u-icon>
              <u-icon 
              v-else 
              size="90" 
              color="#b2ebf2" 
              customPrefix="mdi" 
              name="cup-water"
              @click="addWater(n+1)"
              />
              <text class="text--secondary subtitle-2">247ml</text>
            </view>
          </view>
        </view>			
      </view>
    
    </u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        numArr: [1, 2, 3, 4, 5, 6, 7, 8],
				showDatePicker: false,
        showWater: false,
        datePickerValue: '',
        alreadyGet: 0,
        adviceDrink: 1976,
        adviceGet: 0,
        cups: 0,
        
			};
		},
    computed: {
      memberId(){
        return this.$store.state.member.memberId
      },
      sessionId(){
        return this.$store.state.app.sessionId
      },
      dateStr () {
        return this.datePickerValue || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      score(){
        if(!this.adviceGet || !this.alreadyGet){
          return 0
        }
        return Math.round(this.alreadyGet/this.adviceGet) 
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        this.getQuality()
        this.getEnergy()
        this.getWater()
      },
      toMealPlan () {
        uni.navigateTo({
          url: `./mealPlan?date=${this.dateStr}&advice=${this.adviceGet}`
        })
      },
      dataChange (e) {
        console.log(e)
        this.datePickerValue = e.year +'-' + e.month + '-' + e.day
        this.init()
      },
			getWater(){
				const params = {
					memberId: this.memberId,
					sessionId: this.sessionId,
					time: this.dateStr
				}
				this.$http.get('/mobile/bite/getWater', params)
          .then(res=>{
            if(res.data.success){
              const obj = res.data.obj
                
              if (obj && obj.water) {
                this.cups = obj.water
              }
            }
          })
			},
			addWater(waterNum){
        console.log(waterNum)
				if(waterNum < this.cups){
					return false
				}

				const data = {
					waterNum: waterNum - this.cups,
					memberId: this.memberId,
					sessionId: this.sessionId,
					waterTime: this.dateStr
				}
        
				this.$http.post('/mobile/bite/addWater', data)
				.then(res=>{
					if(res.data.success){
						this.showWater = false
						this.$u.toast(res.data.msg)
						this.getWater()
					}
				})
			},
			getEnergy(){
				const params = {
					memberId: this.memberId,
					sessionId: this.sessionId,
					time: this.dateStr
				}
				this.$http.get('/mobile/bite/getEnergy', params)
          .then(res=>{
            if(res.data.success){
              this.alreadyGet = res.data.obj.heatQuantity
            }
          })
			},			
      getQuality(){
				const params = {
					memberId: this.memberId,
					sessionId: this.sessionId,
				}
        this.$http.get('/mobile/bite/getQuantity', params)
          .then(res=>{
              if(res.data.success){
                this.adviceGet = res.data.obj.memberQuantity
              }
          })
      }      
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  background: #faf6f5;
}
.topBG{
  height: 400rpx!important;
}
/deep/.u-circle-progress{
  background: transparent!important;
}
</style>
