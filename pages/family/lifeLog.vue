<template>
	<view class="page">
    <view class="d-flex justify-center pa-4">
      <u-button 
        @click="showCalendar=true"
        size="medium"
        shape="circle"
        type="primary" 
        plain
       >
        {{dateStr}}
        <u-icon class="ml-2" :name="showCalendar?'arrow-up-fill':'arrow-down-fill'"></u-icon>
      </u-button>
    </view>
    <view v-if="list.length" class="px-6">
      <u-swipe-action
        :show="item.show" 
        :index="index" 
        v-for="(item, index) in list" 
        :key="index" 
        @click="click" 
        @open="open"
        :options="options"
      >
        <view class="item u-border-bottom">
          <!-- <image mode="aspectFill" :src="item.images" /> -->
          <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
          <view  class="title-wrap py-4 d-flex align-center justify-space-between">
            <view>
              <view>{{item.lifeName}}</view>
              <view class="mt-2" :style="{color: item.color}">{{item.lifeDefree}}</view>
            </view>
            <u-icon color="grey" @click="toggleSelect(index)"  size="45" :name="item.showSelect?'arrow-up':'arrow-down'"></u-icon>
          </view>
          <view v-if="item.showSelect">
            <view 
              class="u-border-top px-4 py-2 grey--text hoverClass"
              v-for="(x, y) in selectItems[item.type]"
              @click="updateLog(x, y, item)"
              :key="y"
            >
              {{x}}
            </view>
          </view>
        </view>
      </u-swipe-action>
    </view>
    <view v-else class="pa-8">
      <!-- car   购物车为空 page   页面不存在 search   没有搜索结果 address   没有收货地址 wifi   没有WiFi order   订单为空 coupon   没有优惠券 favor   无收藏 permission   无权限 history   无历史记录 news   无新闻列表 message   消息列表为空 list   列表为空(通用) data   数据为空(默认，通用) -->
      <u-empty text="暂无记录" mode="list"></u-empty>
    </view>
		<u-calendar 
      v-model="showCalendar" 
      mode='date' 
      :closeable="false"
      @change="dateChange"
    >
      <view slot="tooltip"></view>
    </u-calendar>
    <view v-if="addBtnValid" class="posFix b0 full-width">
      <u-button @click="toAdd" :custom-style="customStyle" type="primary">添加</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset!important'
        },
				showCalendar: false,
        pickerDate: '',
        existedTypeName: [],
        list: [],
        typeNames: [
          {name: '正餐食量'},
          {name: '蔬菜'},
          {name: '脂肪'},
          {name: '盐'},
          {name: '抽烟'},
          {name: '喝酒'},
          {name: '运动'}
        ],
        selectItems: [
          ['7分饱','8-9分饱','饥饿或暴饮暴食'],
          ['红黄蓝白黑都有', '2-4钟颜色食物', '没有颜色搭配'],
          ['少吃肥肉和猪油', '吃了一些肥肉和猪油', '吃大量肥肉和猪油'],
          ['摄入量<6g', '摄入量6g ~ 10g', '摄入量10g以上'],
          ['没有抽烟','抽烟或被动抽烟'],
          ['没有喝酒', '喝了啤酒、红酒或白酒'],
          ['饭后1~2小时运动30分钟以上', '运动不定时，且少于30分钟', '没有运动']
        ],
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ]
			};
		},
    computed: {
      dateStr () {
        return this.pickerDate || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      addBtnValid () {
        return this.list.length<7 && this.dateStr === this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      }
    },
    onShow() {
      this.getLifeLog()
    },
    methods: {
      toAdd () {
        uni.navigateTo({
          url: './addLifeLog?typeExisted=' + encodeURIComponent(JSON.stringify(this.existedTypeName))
        })
      },
      updateLog (lifeDefree, lifeType, item) {
        console.log(item)
        const {logId, lifeName} = item
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          lifeType: lifeType + 1,
          lifeDefree,
          lifeName,
          logId
        }
        this.$http.post('/mobile/healthy/updateLifeLog', data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              this.getLifeLog()
            }
          })
      },
      getLifeLog () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          time: this.dateStr
        }
        this.$http.get('/mobile/healthy/findLifeLog', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              this.existedTypeName = []
              this.list = obj
              if (obj.length) {
                obj.forEach(r => {
                  const colors = ['green', 'orange', 'red']
                  this.$set(r,'color', colors[r.lifeType-1])
                  this.$set(r, 'show', false)
                  this.$set(r, 'showSelect', false)
                  const lifeName = r.lifeName
                  if (!this.existedTypeName.includes(lifeName)) {
                    this.existedTypeName.push(lifeName)
                  }
                  this.typeNames.forEach((t, i) => {
                    
                    if (r.lifeName === t.name) {
                      this.$set(r,'type', i)
                    }
                  })
                })
              }
            }
          })
      },
      dateChange (e) {
        console.log(e)
        this.pickerDate = e.result
        this.getLifeLog()
      },
      toggleSelect (e) {
        this.list.forEach((res, i) => {
          this.$set(res, 'showSelect', i===e?!res.showSelect:false)
        })
      },
      click(i, index) {
        uni.showModal({
          title: '删除生活日志',
          cancelColor: '#f00',
          content: '是否要删除该生活日志？',
          success: result => {
            if (result.confirm) {
              const logId = this.list[i].logId
              const data = {
                sessionId: this.sessionId,
                memberId: this.memberId,
                logId
              }
              this.$http.post('/mobile/healthy/delLifeLog', data)
                .then(res=>{
                  if(res.data.success){
                    this.getLifeLog()
                    this.$u.toast(res.data.msg)
                  }
                })   
            }
          } 
        })
      },
      open(index) {
      	// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      	// 原本为'false'，再次设置为'false'会无效
        
        this.list.forEach((res, i) => {
          this.$set(res, 'show', i===index)
          this.$set(res, 'showSelect', false)
        })
      } 
    }
	}
</script>

<style lang="scss" scoped>
.page{
  padding-bottom: 80rpx;
}

</style>
