<template>
	<view class="posRela page" :class="caipId?'':'pb-10'">
    <view class="d-inline-flex posFix r0 circleLeft zIndexHigh">
      <u-button 
        v-if="caipId"
        shape="circle" 
        :custom-style="customStyle" 
        type="primary"
        @click="addToMeal"
      >
        添加饮食
      </u-button>
    </view>
    <image v-if="foodImg" @click="uploadImage" :src="foodImg" class="mainImage" mode="scaleToFill"></image>
    <view v-else @click="uploadImage" class="d-flex halfvw align-center justify-center grey lighten-3">
      <u-icon size="45" color="grey" name="plus"></u-icon>
      <text class="grey--text body-1 ml-4">上传菜品封面图</text>
    </view>
    <u-field 
      v-model="name" 
      :disabled="!!caipId"
      placeholder="写下你的菜名" 
    />  
    <view class="px-4 py-2 my-2 text--secondary">主料</view>
    <u-field 
      v-model="rawMaterial" 
      :disabled="!!caipId"
      placeholder="请输入主料" 
      type="textarea" 
    />     
    <view class="px-4 py-2 my-2 text--secondary">辅料</view>
    <u-field 
      v-model="introduce" 
      :disabled="!!caipId"
      placeholder="请输入辅料" 
      type="textarea" 
    />   
    <view
      class="d-flex align-center px-4 d-flex customDiv"
    >
      <u-cell-group class="full-width">
        <u-cell-item       
        title="工艺" 
        :value="craft||'请选择'"
        @click="cellClick(0)"
        arrow-direction="down"
        />
        <u-cell-item       
        title="味道" 
        :value="flavour||'请选择'"
        @click="cellClick(1)"
        arrow-direction="down"
        />
        <u-cell-item       
        title="时间" 
        :value="duration||'请选择'"
        @click="cellClick(2)"
        arrow-direction="down"
        />
        <u-cell-item       
        title="热量" 
        :value="calories||'请选择'"
        @click="cellClick(3)"
        arrow-direction="down"
        />
      </u-cell-group>
    </view>              
    <u-select    
      :safe-area-inset-bottom="true"
      v-model="showPicker0" 
      :list="valueArr[0]"
      @confirm="selectConfirm0"
      @cancle="showPicker0=false"
    />
    <u-select          
      v-model="showPicker0" 
      :list="valueArr[0]"
      @confirm="selectConfirm0"
      @cancle="showPicker0=false"
    />
    <u-select   
       :safe-area-inset-bottom="true"
      v-model="showPicker1" 
      :list="valueArr[1]"
      @confirm="selectConfirm1"
      @cancle="showPicker1=false"
    />
    <u-select    
      :safe-area-inset-bottom="true"
      v-model="showPicker2" 
      :list="valueArr[2]"
      @confirm="selectConfirm2"
      @cancle="showPicker2=false"
    />
    <u-select   
       :safe-area-inset-bottom="true"
      v-model="showPicker3" 
      :list="valueArr[3]"
      @confirm="selectConfirm3"
      @cancle="showPicker3=false"
    />
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
          <u-avatar :src="foodImg" size="70"></u-avatar>
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
    <view v-if="!caipId" class="posFix b0 full-width zIndexHigh">
      <u-button @click="submit" :custom-style="custom_Style" type="primary">保存</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        custom_Style: {
          'border-radius': 'unset',
          background: '#00aaef',
          color: '#fff'
        },         
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
        valueArr: [
          [
            {
              value:'炸',
              label:'炸',
            },
            {
              value:'烧',
              label:'烧',
            },
            {
              value:'拌',
              label:'拌',
            },
            {
              value:'煮',
              label:'煮',
            },
            {
              value:'焖',
              label:'焖',
            },
            {
              value:'炖',
              label:'炖',
            },
            {
              value:'烤',
              label:'烤',
            },
            {
              value:'卤',
              label:'卤',
            },
            {
              value:'腌',
              label:'腌',
            },
            {
              value:'煲',
              label:'煲',
            },
            {
              value:'蒸',
              label:'蒸',
            },
            {
              value:'炒',
              label:'炒',
            },
            {
              value:'煎',
              label:'煎',
            },
            {
              value:'烙',
              label:'烙',
            },
            {
              value:'涮',
              label:'涮',
            },
            {
              value:'炝',
              label:'炝',
            },
            {
              value:'烩',
              label:'烩',
            },
            {
              value:'熏',
              label:'熏',
            },
            {
              value:'煨',
              label:'煨',
            },
            {
              value:'酱',
              label:'酱',
            },
            {
              value:'泡',
              label:'泡',
            },
            {
              value:'溜',
              label:'溜',
            },
            {
              value:'爆',
              label:'爆',
            },
            {
              value:'腊',
              label:'腊',
            },
            {
              value:'刺身',
              label:'刺身',
            },
            {
              value:'干煸',
              label:'干煸',
            },
            {
              value:'干锅',
              label:'干锅',
            },
            {
              value:'微波',
              label:'微波',
            },
            {
              value:'拔丝',
              label:'拔丝',
            },
            {
              value:'砂锅',
              label:'砂锅',
            },
            {
              value:'烘焙',
              label:'烘焙',
            }
          ],
          [
            {
              value: '甜味',
              label: '甜味',
            },
            {
              value: '酸味',
              label: '酸味',            
            },
            {
              value: '果味',
              label: '果味',            
            },
            {
              value: '怪味',
              label: '怪味',            
            },
            {
              value: '原味',
              label: '原味',            
            },
            {
              value: '孜然味',
              label: '孜然味',            
            },
            {
              value: '鱼香味',
              label: '鱼香味',            
            },
            {
              value: '香辣味',
              label: '香辣味',            
            },
            {
              value: '香草味',
              label: '香草味',            
            },
            {
              value: '咸鲜味',
              label: '咸鲜味',            
            },
            {
              value: '五香味',
              label: '五香味',            
            },
            {
              value: '糖醋味',
              label: '糖醋味',            
            },
            {
              value: '蒜香味',
              label: '蒜香味',            
            },
            {
              value: '酸甜味',
              label: '酸甜味',            
            },
            {
              value: '酸辣味',
              label: '酸辣味',            
            },
            {
              value: '茄汁味',
              label: '茄汁味',            
            },
            {
              value: '奶香味',
              label: '奶香味',            
            },
            {
              value: '麻辣味',
              label: '麻辣味',            
            },
            {
              value: '麻酱味',
              label: '麻酱味',            
            },
            {
              value: '苦香味',
              label: '苦香味',            
            },
            {
              value: '咖喱味',
              label: '咖喱味',            
            },
            {
              value: '芥末味',
              label: '芥末味',            
            },
            {
              value: '椒麻味',
              label: '椒麻味',            
            },
            {
              value: '酱香味',
              label: '酱香味',            
            },
            {
              value: '姜汁味',
              label: '姜汁味',            
            },
            {
              value: '家常味',
              label: '家常味',            
            },
            {
              value: '糊辣味',
              label: '糊辣味',            
            },
            {
              value: '红油味',
              label: '红油味',            
            },
            {
              value: '黑椒味',
              label: '黑椒味',            
            },
            {
              value: '豆瓣味',
              label: '豆瓣味',            
            },
            {
              value: '葱香味',
              label: '葱香味',            
            },
            {
              value: '清淡味',
              label: '清淡味',            
            },
            {
              value: '芝士味',
              label: '芝士味',            
            },
            {
              value: '抹茶味',
              label: '抹茶味',            
            },
            {
              value: '烧烤味',
              label: '烧烤味',
            },
          ],
          [
            {
              value: 1,
              label: '10分钟左右',
            },
            {
              value: 2,
              label: '10~30分钟',
            },
            {
              value: 3,
              label: '30~60分钟',
            },
            {
              value: 4,
              label: '1小时以上',
            },
          ],
          [
            {
              value: 200,
              label: '高热量',
            },
            {
              value: 110,
              label: '中等热量',
            },
            {
              value: 70,
              label: '低热量',
            },            
          ],
        ],
        items: [
          {name:'工艺', value: 'craft'},
          {name:'味道', value: 'flavour'},
          {name:'时间', value: 'duration'},
          {name:'热量', value: 'calories'},
        ],
        caipId: '',
				biteId: '',
				foodNum: 100,
				foodUnitType: '',
				biteTime: '',
				foodType: 0,
        fromRecommend: '',
        // 自定义菜品详情
        foodImg: '',
        calories: '',
        duration: '',
        cookingTime: '',
        craft: '',
        flavour: '',
        foodImg: '',
        heatQuantity: 0,
        introduce: '',
        name: '',
        rawMaterial: '',
        showPopup: false,
        showTypeSelect: false,
        // 增减按钮
        startTime1: '',
        startTime2: '',
        endTime1: '',
        endTime2: '',
        minusInterval: null,
        addInterval: null,
        // pickers
        showPicker0: false,
        showPicker1: false,
        showPicker2: false,
        showPicker3: false,
        defaultIndex0: [0],
        defaultIndex1: [0],
        defaultIndex2: [0],
        defaultIndex3: [0],
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      selectArr() {
        return [
          this.craft,
          this.flavour,
          this.duration,
          this.calories
        ]
      },
      foodUnit () {
        if (this.foodUnitType == 3 || this.foodUnitType == 6 || this.foodUnitType == 7) {
          return 'ml'
        }
        return 'g'
      },
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
      if (this.caipId) {
        this.init()
      }
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
        this.$http.get('/mobile/bite/getCustomFood', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
              this.valueArr.forEach((r, i)=>{
                const str = ['craft', 'flavour', 'cookingTime', 'heatQuantity']
                r.some(rs => {
                  if (rs.value===this[str[i]]) {
                    this[str[i]] = rs.value
                    if (str[i]==='cookingTime') {
                      this.duration = rs.label
                    }
                    if (str[i]==='heatQuantity') {
                      this.calories = rs.label
                    }
                  }
                })
              })
            }
          })
      },
      cellClick (i) {
        if (this.caipId) {
          return false
        }
        this['showPicker'+i] = true
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
      selectConfirm0 (e) {
        console.log(e)
        console.log('000')
        this.$u.toast('000')
        console.log(this.$data)
        this.craft = e[0].value
      },
      selectConfirm1 (e) {
        console.log(e)
        console.log('111')
        this.$u.toast('111')
        console.log(this.$data)
        this.flavour = e[0].value
        
      },
      selectConfirm2 (e) {
        console.log(e)
        console.log('22')
        this.$u.toast('222')
        console.log(this.$data)
        this.cookingTime = e[0].value
        this.duration = e[0].label
        
      },
      selectConfirm3 (e) {
        console.log(e)
        console.log('333')
        this.$u.toast('333')
        console.log(this.$data)
        this.heatQuantity = e[0].value
        this.calories = e[0].label
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
          foodImg: this.foodImg,
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
      uploadImage () {
        const that = this
        uni.chooseImage({
          count: 1,
          success: e => {
            console.log(e)
            if (e.errMsg === 'chooseImage:ok') {
              const img = e.tempFiles[0].path
              uni.uploadFile({
                // url: 'http://192.168.1.101:8090/yinaf/mobile/file/fileUpload',
                url: 'https://www.yinaf.net/mobile/file/fileUpload',
                filePath: img,
                fileType: 'image',
                name: 'file',
                success: res => {
                  console.log(res)
                  const data = JSON.parse(res.data)
                  if (data.success) {
                    that.foodImg = data.obj.url
                  }
                }
              })
              // const size = e.tempFiles[0].size // 用于图片大小限制
            }
          }
        })        
      },
      typeConfirm (e) {
        this.foodType = e + 1
        this.showPopup = true
      },
      submit () {
        let selectListVerify = true
        this.selectArr.some(res => {
          if (!res) {
            selectListVerify = false
            return true
          }
        })
        const verify = [
          {
            status: !this.foodImg,
            toast: '请选择菜品封面图'
          },
          {
            status: !this.name,
            toast: '请输入菜名'
          },
          {
            status: !selectListVerify,
            toast: '请完整填写的工艺、味道、用时、热量'
          }
        ]
        let valid = true
        verify.some(res => {
          if (res.status) {
            valid = false
            this.$u.toast(res.toast)
            return true
          }
        })
        if (valid) { // 表单验证通过
          const [craft, flavour, duration, calories] = this.selectArr
          const timeArr = ['', '10分钟左右', '10~30分钟', '30~60分钟', '1小时以上']
          const cookingTime = timeArr.indexOf(duration)
          const caloriesArr = [
            {
              desc: '低热量',
              calories: 70
            },
            {
              desc: '中等热量',
              calories: 110
            },
            {
              desc: '高热量',
              calories: 200
            }
          ]
          let heatQuantity = 0
          caloriesArr.some(res=>{
            if (res.desc === calories) {
              heatQuantity = res.calories
              return true
            }
          })
          const data = {
            craft, 
            flavour,
            heatQuantity,
            cookingTime,
            sessionId: this.sessionId,
            memberId: this.memberId,
            name: this.name,
            rawMaterial: this.rawMaterial,
            introduce: this.introduce,
          }
          if (this.foodImg) {
            data.foodImg = this.foodImg
          }
          // console.warn(a,b,c,d)
          console.warn(data)
          this.$http.post('/mobile/bite/addCustomFood', data)
            .then(res => {
              if (res.data.success) {
                this.$u.toast('添加成功')
                setTimeout(()=>{
                  uni.navigateBack()
                },500)
              }
            })
        }        
      },
    }
	}
</script>

<style lang="scss" scoped>
  .page{
    min-height: 100vh;
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
.halfvw{
  height: 50vw;
}
</style>
