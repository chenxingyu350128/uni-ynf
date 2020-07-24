<template>
    <view class="page">
      <!-- v-if="rec.length" -->
			
      <view class="posRela hasBG">
        <!-- <img :src="topBG"> -->

<!--        <view class="posAbs full-size pb-6">
          <image
            src="./static/img/recDietBg.jpg" 
            class="full-width full-height"
           />
        </view> -->
        <view>
          <view class="border-box d-flex align-center px-4 py-2">
            <u-avatar :src="avatar" size="large" mode="circle"></u-avatar>
            <view class="d-flex flex-column align-center ml-4">
              <text class="font-weight-bold primary--text title">{{ weight }}</text>
              <text class="caption">体重(kg)</text>
            </view>
            <view class="d-flex flex-column align-center ml-4">
              <text class="font-weight-bold primary--text title">{{ bodyStatus }}</text>
              <text class="caption">身体状态</text>
            </view>
            <view class="d-flex flex-column align-center ml-4">
              <text class="font-weight-bold primary--text title">{{ activityIntensity }}</text>
              <text class="caption">活动强度</text>
            </view>
          </view>
          <view
            class="py-4 px-6 mx-2 white elevation-8 zIndexHigh"
          >
            <view class="d-flex justify-space-between caption">
              <text>推荐每日摄入营养成分及热量</text>
              <text class="coffee--text text-accent-4">总热量: {{ memberQuantity }}千卡</text>
            </view>
            <view class="d-flex justify-space-around caption pt-2">
              <view class="d-flex flex-column align-center caption">
                <u-circle-progress active-color="#c30" :percent="pPercent">
                  <view class="title">
                    {{ pPercent }}
                  </view>
                </u-circle-progress>
                <text class="mt-4">蛋白质</text>
                <text>{{ protein }}克={{ protein*4 }}千卡</text>
              </view>
              <view class="d-flex flex-column align-center caption">
                <u-circle-progress active-color="#09c" :percent="fPercent">
                   <view class="title">
                     {{fPercent}}
                   </view>
                </u-circle-progress>
                <text class="mt-4">脂肪</text>
                <text>{{ fat }}克={{ fat*9 }}千卡</text>
              </view>
              <view class="d-flex flex-column align-center caption">
                <u-circle-progress active-color="#c90" :percent="80">
                   <view class="title">
                     {{cPercent}}
                   </view>
                </u-circle-progress>
                <text class="mt-4">碳水化合物</text>
                <text>{{ carbohydrate }}克={{ carbohydrate*4 }}千卡</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="white px-2 mt-4">
        <view v-if="rec.length" class="py-2">
          <text class="title font-weight-bold">一日三餐</text>
          <text class="caption ml-2">根据分析为您推荐健康膳食指南</text>
        </view>
        <view
          v-for="(meal,i) in rec"
          :key="i"
        >
          <view class="d-flex py-2 align-center justify-space-between u-border-bottom">
            <view class="d-flex align-center">
              <u-icon color="#ffb300" name="room-service-outline" size="45" customPrefix="mdi"></u-icon>
              <text class="subtitle-2 font-weight-bold">{{ meal.foodType|mealName }}</text>
            </view>
            <text class="subtitle-2 coffee--text">热量： {{ meal.heatQuantity }}千卡</text>
          </view>
          <view
            class="white outlinedCard"
          >
            <view
              v-for="(food,index) in meal.bite"
              :key="index"
            >
              <view
                class="d-flex align-center px-3 py-2 u-border-bottom"
                @click="toDetail(food, meal.foodType)"
              >
                <u-avatar :src="food.foodImg" size="90" mode="circle"></u-avatar>
                <text class="subtitle-2 ml-4">{{ food.foodName }}</text>
                <text class="flex-fill text-right grey--text caption">{{ food.nutritive }}</text>
              </view>
              <!-- <u-line color="grey" /> -->
            </view>
           <view v-if="meal.tips" class="caption pa-2">
              <rich-text :nodes="meal.tips"></rich-text>
            </view>
          </view>
        </view>
      </view>
    </view>

</template>

<script>
	export default {
		data() {
			return {
				healthy: 2,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        memberQuantity: 0,
        rec: [
          {
              "bite": [
                  {
                      "foodImg": "",
                      "biteId": 7,
                      "foodNum": 15,
                      "foodUnit": "g",
                      "foodName": "鸡蛋"
                  },
                  {
                      "foodImg": "",
                      "biteId": 8,
                      "foodNum": 20,
                      "foodUnit": "ml",
                      "foodName": "牛奶"
                  }
              ],
              "foodType": 1
          },
          {
              "bite": [
                  {
                      "foodImg": "",
                      "biteId": 9,
                      "foodNum": 30,
                      "foodUnit": "g",
                      "foodName": "鸡蛋"
                  },
                  {
                      "foodImg": "",
                      "biteId": 10,
                      "foodNum": 40,
                      "foodUnit": "ml",
                      "foodName": "牛奶"
                  }
              ],
              "foodType": 3
          },
          {
              "bite": [
                  {
                      "foodImg": "",
                      "biteId": 11,
                      "foodNum": 20,
                      "foodUnit": "g",
                      "foodName": "鸡"
                  },
                  {
                      "foodImg": "",
                      "biteId": 12,
                      "foodNum": 30,
                      "foodUnit": "ml",
                      "foodName": "牛奶"
                  }
              ],
              "foodType": 5
          }
        ]
			};
		},
    filters: {
      mealName (e) {
        const arr = ['早餐', '早点', '午餐', '下午茶', '晚餐', '宵夜']
        return arr[e]
      }
    },
    computed: {
      avatar () {
        return this.$store.state.member.image
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      height () {
        return this.$store.state.member.height
      },
      weight () {
        return this.$store.state.member.weight
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      allQuality(){
        return this.protein + this.fat + this.carbohydrate
      },	
      pPercent(){
        if(!this.allQuality){
          return
        }
        return Number(this.protein/this.allQuality*100).toFixed(1)
      },
      fPercent(){
        if(!this.allQuality){
          return
        }
        return Number(this.fat/this.allQuality*100).toFixed(1)
      },
      cPercent(){
        if(!this.allQuality){
          return
        }
        return Number(this.carbohydrate/this.allQuality*100).toFixed(1)
      }, 
      bodyStatus(){
        const arr = ['偏廋', '正常', '过重', '肥胖']
        return arr[this.healthy - 1]
      },
      activityIntensity(){
        const arr = ['低度', '适中', '中度偏上', '重度']
        return arr[this.healthy - 1]        
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        this.getMeals()
        this.getHealthy()
        this.getQuantity()
      },
      getMeals () {
        const params = {
					sessionId: this.sessionId,
					memberId: this.memberId
				}
				this.$http.get('/mobile/bite/getMeals', params)
          .then(res=>{
            if(res.data.success){
              this.rec = res.data.obj
            }
          })        
      },
      toDetail (food, foodType) {
        console.log(food)
        const {caipId, biteId, foodNum, foodUnit} = food
        const biteTime = this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
        uni.navigateTo({
          url: `./foodDetails?caipId=${caipId}&foodNum=${foodNum}&foodUnit=${foodUnit}&biteTime=${biteTime}&foodType=${foodType}&fromRecommend=true`
        })
      },
      getHealthy () {
        const params = {
            sessionId: this.sessionId,
            height: this.height,
            weight: this.weight
        }
        this.$http.get('/mobile/bite/getHealthy', params)
          .then(res=>{
              if(res.data.success){
                  this.healthy = res.data.obj.healthy
              }
          })
      },
      getQuantity () {
        const params = {
          memberId: this.memberId,
          sessionId: this.sessionId,
        }                
        this.$http.get('/mobile/bite/getQuantity', params)
        .then(res=>{
            if(res.data.success){
                this.protein = res.data.obj.protein
                this.fat = res.data.obj.fat
                this.carbohydrate = res.data.obj.carbohydrate
                this.memberQuantity = res.data.obj.memberQuantity
            }
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  background: #f2f2f2;
}
/deep/.u-circle-progress{
  background: transparent!important;
}
.hasBG{
  background-image: url(static/img/recDietBg.jpg);
  background-size: 100% 80%;
  background-repeat: no-repeat;
}
.full-height{
  height: 100%;
}
.lowZIndex{
  z-index: -1;
}
.zIndexHigh{
  z-index: 999;
}
</style>
