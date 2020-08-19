<template>
	<view>
		<view class="pa-4 posRela mb-4">
      <view class="d-inline-flex posFix r0 t30">
        <u-button 
          shape="circle"
          :custom-style="customStyle" 
          type="primary" 
          size="mini" 
          @click="integralNumDetails"
        >
          积分明细
        </u-button>
      </view>
      <view class="d-flex align-center justify-center">
        <u-icon color="grey" size="45" name="arrow-left"></u-icon>
        <u-avatar class="mx-6" size="117" :src="avatar"></u-avatar>
        <u-icon color="grey" size="45" name="arrow-right"></u-icon>
      </view>
      <view class="text-center">我的积分：<text class="red--text">{{integralNum}}</text></view>
    </view>
    <u-tabs active-color="#e94646" :list="tabList" :is-scroll="false" :current="current" @change="change"></u-tabs>
    <view v-if="current===0">
      <view class="white px-6 red--text text--darken-1 py-3 subtitle-2">
        新手任务
      </view>
      <u-line color="grey" />
      <view
        v-for="(item,i) in list0"
        :key="i"
      >
        <view class="white px-6 py-2 caption d-flex align-center">
          <view class="flex-fill ml-3 d-flex flex-column">
            <text>{{ item.taskName }}</text>
            <text class="mt-1">{{ item.taskExplain }}</text>
          </view>
          <u-button :type="item.taskState?'info':'error'" size="mini">{{item.taskState?'已完成':'未完成'}}</u-button>
        </view>
        <u-line color="grey" />
      </view>
      <view class="white px-6 mt-3 red--text text--darken-1 py-3 subtitle-2">
        日常任务
      </view>
      <u-line color="grey" />
      <view
        v-for="(item,i) in list1"
        :key="i"
      >
        <view class="white px-6 py-2 caption d-flex align-center">
          <view class="flex-fill ml-3 d-flex flex-column">
            <text>{{ item.taskName }}</text>
            <text class="mt-1">{{ item.taskExplain }}</text>
          </view>
          <u-button :type="item.taskState?'info':'error'" size="mini">{{item.taskState?'已完成':'未完成'}}</u-button>
        </view>
        <u-line color="grey" />
      </view>     
    </view>
    <view v-else>
        <view
          v-for="(item,i) in usages"
          :key="i"
        >
          <view class="white px-6 py-2 caption d-flex align-center">
            <view class="flex-fill ml-3 d-flex flex-column">
              <text>{{ item.name }}</text>
              <text class="mt-1">{{ item.desc }}</text>
            </view>
          </view>
          <u-line color="grey" />
        </view>      
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-top-right-radius': '0!important',
          'border-bottom-right-radius': '0!important',
          background: '#bee147'
        },
        tabList: [
          { name: '积分任务' },
          { name: '积分使用' }
        ],
        current: 0,
        showDetails: false,
				integralNum: 0,
        taskList: [],
        list0: [],
        list1: [],
        usages: [
          {
            name: '商城产品消费折扣',
            desc: '1积分=0.01元',
          },
          {
            name: '购买服务餐折扣',
            desc: '1积分=0.01元',
          },
          {
            name: '报名活动',
            desc: '1积分=0.01元',
          }
        ]
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      avatar () {
        return this.$store.state.member.image
      },
      realName () {
        return this.$store.state.member.realName
      },
      
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function () {}
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/activity/getIntegralTack', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
              this.list0 = this.taskList.filter(res => !res.taskCategory)
              this.list1 = this.taskList.filter(res => res.taskCategory)
            }
          })
      },
      integralNumDetails () {
        uni.navigateTo({
          url: './integralDetails'
        })
      },
      change (e) {
        this.current = e
      }
    }
	}
</script>

<style lang="scss" scoped>
  .t30{
    top: 30px;
  }
  .full-height{
    height: 100%;
  }
  .IndexHigh{
    z-index: 99999!important;
  }
</style>
