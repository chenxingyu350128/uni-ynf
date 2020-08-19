<template>
	<view class="posRela page">
    <view class="d-inline-flex posFix r0 circleLeft zIndexHigh">
      <u-button 
        v-if="!showPopup"
        shape="circle" 
        :custom-style="customStyle" 
        type="primary"
        @click="addToMeal"
      >
        添加饮食
      </u-button>
    </view>
    <image :src="pic" class="mainImage" mode="scaleToFill"></image>
    <view class="my-4 pl-4 border-box">
      <view class="font-weight-bold title">
        {{ name }}
      </view>
      <view class="d-flex align-center subtitle-2 mb-4 posRela">
        <u-tag :show="nutritive" :text="nutritive" type="warning" mode="dark" shape="square"></u-tag>
        <!-- <u-tag class="posAbs r0 largeSize" @click="addToMeal" text="加入饮食" type="primary" mode="dark" shape="circleLeft"></u-tag> -->
        <!-- <u-button type="primary">sss</u-button> -->
      </view>
    </view>
    <view
      v-if="rawMaterial"
      class="my-4 px-2"
    >
      <view class="py-2 subtitle-1 font-weight-bold">
        主料
      </view>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <view
        style="color: #c93"
        class="py-2 subtitle-2"
        v-html="rawMaterial"
      />
    </view>
    <view
      v-if="introduce"
      class="my-4 px-2"
    >
      <view class="py-2 subtitle-1 font-weight-bold">
        辅料
      </view>
      <view
        style="color: #c93"
        class="py-2 subtitle-2"
        v-html="introduce"
      />
    </view>
    <view
      v-if="detailed"
      class="my-4 px-2"
    >
      <view class="py-2 subtitle-1 font-weight-bold">
        步骤
      </view>
      <view
        style="color: #c93"
        class="py-2 subtitle-2"
        v-html="detailed"
      />
    </view>
    <view class="my-4">
      <view class="py-2 px-2 subtitle-1 font-weight-bold d-flex justify-space-between">
        <text>营养素</text>
        <text>含量(每100克)</text>
      </view>
      <!-- <v-viewider color="grey" /> -->
      <u-line color="grey" />
      <view class="py-2 px-2 pr-4 subtitle-2 d-flex justify-space-between">
        <text>热量（大卡）</text>
        <text>{{ heatQuantity }}</text>
      </view>
      <u-line color="grey" />
      <view
        v-for="(item, i) in nutrients"
        :key="i"
      >
        <view class="py-2 px-2 pr-4 subtitle-2 d-flex justify-space-between">
          <text>{{ item.name + '(' + item.mete + ')' }}</text>
          <text>{{ item.amount }}</text>
        </view>
      <u-line color="grey" />
      </view>
    </view>    
    <u-popup v-model="showPopup" mode="bottom">
      
      <view class="white">
        <view
          class="pa-0 ma-0 py-2 subtitle-2 d-flex"
        >
          <view
            class="col-3 d-flex justify-center align-center"
            @click="showPopup=false"
          >
            取消
          </view>
          <view
            class="col-6 subtitle-1 d-flex justify-center align-center"
          >
            添加今日饮食
          </view>
          <view
            class="d-flex col-3 justify-center align-center"
            style="color: #00aaef"
            @click="addCertain"
          >
            确认
          </view>
        </view>
        <u-line color="grey" />
        <view class="px-4 py-2 d-flex align-center">
          <u-avatar :src="pic" size="70"></u-avatar>
          <view class="d-flex flex-column ml-4">
            <text class="subtitle-2">{{ name }}</text>
            <text class="caption text-lowercase">{{ heatQuantity }}千卡/100{{ foodUnit }}</text>
          </view>
        </view>	
        <u-line color="grey" />
        <view
          class="pa-2 ma-0 py-2 subtitle-2 d-flex"
        >
          <view
            class="col-4 d-flex align-end"
            style="color: #00aaef"
          >
            估算数量
          </view>
          <view
            style="color: #00aaef"
            class="col-8 text-right"
          >
            {{ Math.round(heatQuantity/100*foodNum) }}千卡/{{ foodNum }}{{ foodUnit }}
          </view>
        </view>				
        <view
          class="pa-0 ma-0 py-2 subtitle-2 d-flex align-center"
        >
          <view
            class="col-3 text-center"
          >
            <view 
              class="d-inline-flex"
              @touchmove="touchMove"
              @touchstart="minusStart"
              @touchend="minusEnd"
            >
              <u-icon 
                color="#00aaef" 
                size="60" 
                name="minus-circle"
              />
            </view>
          </view>
          <view
            class="col-6 title font-weight-bold text-center"
          >
            {{ foodNum }}
            <text class="caption ml-2">{{ foodUnit }}</text>
          </view>
          <view
            class="col-3 text-center"
          >
            <view 
              class="d-inline-flex"
              @touchmove="touchMove"
              @touchstart="addStart"
              @touchend="addEnd"
            >
              <u-icon 
                color="#00aaef" 
                size="60" 
                name="plus-circle"
              />
            </view>            
          </view>
        </view>
      </view>
    </u-popup>
	  <u-action-sheet @click="typeConfirm" :list="typeList" v-model="showTypeSelect"></u-action-sheet>  
	</view>
</template>

<script>
  const metes = [
    '克',
    '毫克',
    '微克'
  ]
	export default {
		data() {
			return {
        customStyle: {
          'border-top-right-radius': '0!important',
          'border-bottom-right-radius': '0!important'
        },
        typeList: [
          { text: '早餐', color: '#00aaef'},
          { text: '早点', color: '#00aaef'},
          { text: '午餐', color: '#00aaef'},
          { text: '下午茶', color: '#00aaef'},
          { text: '晚餐', color: '#00aaef'},
          { text: '宵夜', color: '#00aaef'}
        ],
        nutrients: [
          {
            name: '碳水化合物',
            mete: metes[0],
            dataName: 'carbohydrate',
            amount: '—'
          },
          {
            name: '蛋白质',
            mete: metes[0],
            dataName: 'protein',
            amount: '—'
          },
          {
            name: '脂肪',
            mete: metes[0],
            dataName: 'fat',
            amount: '—'
          },
          {
            name: '膳食纤维',
            mete: '',
            dataName: 'dietaryFiber',
            amount: '—'
          },
          {
            name: '钠',
            mete: metes[1],
            dataName: 'sodium',
            amount: '—'
          },
          {
            name: '钾',
            mete: metes[1],
            dataName: 'potassium',
            amount: '—'
          },
          {
            name: '镁',
            mete: metes[1],
            dataName: 'magnesium',
            amount: '—'
          },
          {
            name: '硒',
            mete: metes[2],
            dataName: 'selenium',
            amount: '—'
          },
          {
            name: '铁',
            mete: metes[1],
            dataName: 'iron',
            amount: '—'
          },
          {
            name: '胡萝卜素',
            mete: metes[2],
            dataName: 'carotene',
            amount: '—'
          },
          {
            name: '锰',
            mete: metes[1],
            dataName: 'manganese',
            amount: '—'
          },
          {
            name: '核黄素',
            mete: metes[1],
            dataName: 'riboflavin',
            amount: '—'
          },
          {
            name: '胆固醇',
            mete: metes[1],
            dataName: 'cholesterol',
            amount: '—'
          },
          {
            name: '钙',
            mete: metes[1],
            dataName: 'calcium',
            amount: '—'
          },
          {
            name: '烟酸',
            mete: metes[1],
            dataName: 'niacin',
            amount: '—'
          },
          {
            name: '锌',
            mete: metes[1],
            dataName: 'zinc',
            amount: '—'
          },
          {
            name: '铜',
            mete: metes[1],
            dataName: 'copper',
            amount: '—'
          },
          {
            name: '硫酸铵',
            mete: metes[1],
            dataName: 'thiamine',
            amount: '—'
          },
          {
            name: '维生素A',
            mete: metes[2],
            dataName: 'vitaminA',
            amount: '—'
          },
          {
            name: '维生素B',
            mete: metes[1],
            dataName: 'vitaminB',
            amount: '—'
          },
          {
            name: '维生素C',
            mete: metes[1],
            dataName: 'vitaminC',
            amount: '—'
          },
          {
            name: '维生素D',
            mete: metes[1],
            dataName: 'vitaminD',
            amount: '—'
          },
          {
            name: '维生素E',
            mete: metes[1],
            dataName: 'vitaminE',
            amount: '—'
          },
         
        ],
				caipId: '',
				biteId: '',
				foodNum: 100,
				foodUnit: '',
				biteTime: '',
				foodType: 0,
        fromRecommend: '',
        // 详情
        pic: '',
        name: '',
        nutritive: '', // 营养标签
        heatQuantity: 0,
        rawMaterial: '',//主料
        introduce: '',//辅料
        detailed: '',//步骤
        showPopup: false,
        showTypeSelect: false,
        // 增减按钮
        startTime1: '',
        startTime2: '',
        endTime1: '',
        endTime2: '',
        minusInterval: null,
        addInterval: null
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      if (e) {
        console.log(e)
        for (const x in e) {
          this[x] = e[x]
        }
        this.foodType = parseInt(this.foodType)
      }
    },
    onShow() {
      this.init()
      if (this.foodType) {
        this.showPopup = true
      }
    },
    methods: {
      init () {
        const data = {
          caipId: this.caipId,
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/bite/getCaipDetails', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
                this.nutrients.forEach(rs=>{
                  if(rs.dataName === x && obj[x]){
                    this.$set(rs, 'amount', parseInt(obj[x]).toFixed(2))
                  }
                })
              }
            }
          })
      },
      addToMeal () {
        if (this.foodType) {
          this.showPopup = true
        } else {
          this.showTypeSelect = true
        }
      },
			minusStart(e){
				console.log(e)
				this.endTime1 = ''
				this.startTime1 = e.timeStamp
				clearInterval(this.minusInterval)
				this.minusInterval = null//重置定时器
				// e.preventDefault()
				setTimeout(()=>{
					console.log(this.startTime1)
					if(this.endTime1){
						clearInterval(this.minusInterval)
						console.log('short')
						console.log(this.foodNum)
						if(this.foodNum>1){
							console.log('fit')
							this.foodNum--
						}                    
					}else{
						clearInterval(this.minusInterval)
						this.minusInterval = setInterval(()=>{
							if(this.foodNum>1){
								console.log('fit')
								this.foodNum--
							}                        
						},50)
					}
				},300)
			},
			addStart(e){
				console.log(e)
				this.endTime2 = ''
				this.startTime2 = e.timeStamp
				clearInterval(this.addInterval)
				this.addInterval = null//重置定时器
				// e.preventDefault()
				setTimeout(()=>{
					if(this.endTime2){
						clearInterval(this.addInterval)
						console.log('short')
						console.log(this.foodNum)
						if(this.foodNum<999){
							console.log('fit')
							this.foodNum++
						}                    
					}else{
						clearInterval(this.addInterval)
						this.addInterval = setInterval(()=>{
							if(this.foodNum<999){
								console.log('fit')
								this.foodNum++
							}                        
						},50)
					}
				},300)
			},
			minusEnd(e){
        console.log('minusEnd')
				clearInterval(this.minusInterval)
				this.endTime1 = e.timeStamp
			},
			addEnd(e){
        console.log('addEnd')
				clearInterval(this.addInterval)
				this.endTime2 = e.timeStamp
			},
			touchMove(e){
        console.log('moved')
				clearInterval(this.minusInterval)
				clearInterval(this.addInterval)				
			},
      addCertain () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          biteTime: this.biteTime,
          foodType: this.foodType,
          foodName: this.name,
          foodImg: this.pic,
          foodNum: this.foodNum,
          foodUnit: this.foodUnit,
          caipId: this.caipId,
          heatQuantity: Math.round(this.heatQuantity/100*this.foodNum) 
        }
        if (this.biteId) {
          data.biteId = this.biteId
        }
        const url = this.biteId ? '/mobile/bite/updateNewBite' : '/mobile/bite/addNewBite'
        this.$http.post(url, data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              setTimeout(() => {                
                uni.navigateBack({
                  // 有biteId来自饮食计划 无biteId来自饮食索引或饮食推荐
                  delta: this.fromRecommend ? 1 : this.biteId ? 1 : 2
                })
              }, 500)
            }
          })
      },
      typeConfirm (e) {
        this.foodType = e + 1
        this.showPopup = true
      }
    }
	}
</script>

<style lang="scss" scoped>
  .page{
    height: 100vh;
  }
.mainImage{
  width: 750rpx;
  height: 400rpx;
}
.largeSize{
  transform: scale(2);
}
.circleLeft{
  top: 25vh;
}
.zIndexHigh{
  z-index: 9999;
}
</style>
