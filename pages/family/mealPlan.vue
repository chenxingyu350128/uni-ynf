<template>
	<view>
    <view
      class="white--text cardBox posRela"
    >	
      <!-- <img :src="topBG"> -->
      <image class="heightSet" src="./static/img/addDietBG.jpg" mode="widthFix"></image>
      <view class="posAbs full-size">
        <view class="text-center subtitle-2 py-2">
          {{ date }}日饮食计划
        </view>
        <view class="d-flex flex-nowrap justify-space-between align-center mt-2">
          <view class="col-6 d-flex flex-column align-center justify-center">
            <text class="subtitle-2">已摄入(千卡)</text>
            <text class="subtitle-1 font-weight-bold">{{ already }}</text>
          </view>
          <u-line class="flexUnset" length="100rpx" direction="col" color="#fff" />
          
          <view class="col-6 d-flex flex-column align-center justify-center">
            <text class="subtitle-2">建议摄入(千卡)</text>
            <text class="subtitle-1 font-weight-bold">{{ advice }}</text>
          </view>
        </view>
      </view>
    </view>
    <view
      v-for="(item,i) in typesArr"
      :key="i"
    >
      <view class="d-flex justify-space-between align-center px-4 py-2">
        <view>
          <text class="subtitle-1 font-weight-bold">{{ item }}</text>
        </view>
        <u-button @click="toFoodIndex(i)" shape="circle" size="medium" type="warning">添加</u-button>
      </view>
      <u-line color="grey" />
      <view>
         <u-swipe-action 
         :show="item.show" 
          v-for="(itm,index) in items[i]"
          :key="index"
          @click="click" 
          @open="open"
          :options="options"
         >
          <view class="item u-border-bottom">
            
          </view>
         </u-swipe-action>
        <view
          v-for="(itm,index) in items[i]"
          :key="index"
          @click="toDetail(itm, i)"
        >
          <view class="d-flex align-center px-4 py-2">
            <u-avatar :src="itm.foodImg" mode="circle"></u-avatar>
            <view class="d-flex flex-column ml-4">
              <text>{{ itm.foodName }}</text>
              <text class="overline text-lowercase">{{ itm.heatQuantity }}千卡/{{ itm.foodNum }}{{ itm.foodUnit||'g' }}</text>
            </view>
            <view class="flex-fill"></view>
            <view @click.stop="deleteIt(itm.biteId)" class="d-inline-flex">
              <u-icon  color="#ec9b33" size="45" name="trash"></u-icon>
            </view>
          </view>
          <u-line color="grey" />
        </view>
      </view>
    </view>    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '',
        advice: 0,
        already: 0,
        typesArr: ['早餐','早点','午餐','下午茶','晚餐','宵夜'],
        items: [
          [],
          [],
          [],
          [],
          [],
          []
        ],
			}
		},
    computed: {
			ids(){				
				let arr = []
				this.items.forEach(res=>{
					arr.push(res.biteId)
				})
				return arr.reduce((x,y)=>{
					return x+','+y
				})
			},
			sessionId(){
				return this.$store.state.app.sessionId
			},		
			memberId(){
				return this.$store.state.member.memberId
			}      
    },
    onLoad(e) {
      if (e.date) {
        this.date = e.date
        this.advice = e.advice
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        this.getEnergy()
        this.getBite()
      },
      toFoodIndex (i) {
        uni.navigateTo({
          url: `./foodIndex?type=${i+1}&date=${this.date}`
        })
      },
      getEnergy(){
				const params = {
					memberId: this.memberId,
					sessionId: this.sessionId,
					time: this.date
				}
				this.$http.get('/mobile/bite/getEnergy', params)
				.then(res=>{
					if(res.data.success){
            const obj = res.data.obj
              this.already = obj.heatQuantity||0
					}
				})
			},			
			getBite(){
				const params = {
					sessionId: this.sessionId,
					memberId: this.memberId,
					biteTime: this.date
				}
				this.$http.get('/mobile/bite/getBite', params)
				.then(res=>{
					if (res.data.success){
						this.result = res.data.obj
						this.items = [
							[],
							[],
							[],
							[],
							[],
							[]
						]
						this.result.forEach(res => {
              let arr = res.bite
              arr.forEach(r => {
                this.$set(r, 'show', false)
              })
							switch (res.foodType) {
								case 1:
									this.$set(this.items, 0, res.bite)
									break;
								case 2:
									this.$set(this.items, 1, res.bite)
									break;
								case 3:
									this.$set(this.items, 2, res.bite)
									break;
								case 4:
									this.$set(this.items, 3, res.bite)
									break;
								case 5:
									this.$set(this.items, 4, res.bite)
									break;
								case 6:
									this.$set(this.items, 5, res.bite)
									break;
							}
						})
					}
				})
			},
      toDetail(e, i){
        const caipId = e.caipId
        const biteId = e.biteId
        const foodNum = e.foodNum
        const foodUnit = e.foodUnit
        const biteTime = this.date
        const foodType = i + 1
        const customType = e.customType
        uni.navigateTo({
          url: customType?
          `./customFoodPage?caipId=${caipId}&biteId=${biteId}&foodNum=${foodNum}&foodUnit=${foodUnit}&biteTime=${biteTime}&foodType=${foodType}`
          :
          `./foodDetails?caipId=${caipId}&biteId=${biteId}&foodNum=${foodNum}&foodUnit=${foodUnit}&biteTime=${biteTime}&foodType=${foodType}`
        })
        // this.showFoodDetail = true
      },
      deleteIt (biteId) {
        uni.showModal({
          title: '删除饮食记录',
          cancelColor: '#f00',
          content: '是否删除这一条饮食记录？',
          success: result => {
            if (result.confirm) {
              const data = {
                sessionId: this.sessionId,
                memberId: this.memberId,
                biteId
              }
              this.$http.post('/mobile/bite/delBite', data)
              .then(res=>{
                if(res.data.success){
                  this.$u.toast(res.data.msg)
                  this.getBite()
                  this.getEnergy()
                }
              })
            }
          }
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
// .cardBox{
//   max-height: 240rpx;
// }
.heightSet{
  height: 240rpx!important;
  width: 750rpx;
}
/deep/.flexUnset{
  flex: unset!important;
}
</style>
