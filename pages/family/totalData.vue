<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#fff" back-icon-name="arrow-left" :title="`全部数据(${list.length})`" :background="background"></u-navbar>
		<view v-if="type===2 || type===3" class="d-flex ma-2">
      <view class="mx-auto d-inline-flex">
        <view @click="tabChange(0)" class="px-4 py-2" :style="{ color: tab===0?'#fff':tabBG, background: tab===0?tabBG:'#fff', border: `1px solid ${tabBG}` }">全部数据</view>
        <view @click="tabChange(1)" class="px-4 py-2" :style="{ color: tab===1?'#fff':tabBG, background: tab===1?tabBG:'#fff', border: `1px solid ${tabBG}` }">异常数据</view>
      </view>
    </view>
    <view v-if="type===1" class="posSticky d-flex white--text" :style="{background: tabBG}">
      <view class="col-4 text-center px-4 py-2" v-for="(title, i) in dataName" :key="i">
        {{title}}
      </view>
    </view>
    <view>
      <!-- 睡眠 -->
      <view v-if="type===1">
        <view 
        v-for="(x, idx) in list" 
        :key="idx" 
        class="d-flex" 
        :class="idx%2 === 0?'white':'grey'"
        >
          <!-- {{JSON.stringify(item)}} -->
          <view class="col-4 text-center px-4 py-2">{{x.time}}</view>
          <view class="col-4 text-center px-4 py-2">{{x.heartDuration}}</view>
          <view class="col-4 text-center px-4 py-2">{{x.quietDuration}}</view>
        </view>
      </view>
      <view v-else>
        <view v-for="(item,index) in list" :key="index">
          <view class="d-flex posSticky top53 white--text" :style="{background: tabBG}">
            <view 
            :class="type===3?'col-4':'col-6'"
            class="text-center px-4 py-2"
            >
              {{item.date}}
            </view>
            <view 
              class="text-center px-4 py-2" 
              v-for="(title, i) in dataName" 
              :class="type===3?'col-4':'col-6'"
              :key="i"
            >
              {{title}}
            </view>
          </view>
          <view 
            v-for="(itm, idx) in item.obj" 
            :key="idx" 
            :class="idx%2 === 0?'white':'grey lighten-2'"
            class="d-flex"
          >
            <view :class="type===3?'col-4':'col-6'" class="text-center px-4 py-2">{{itm.time.split(' ')[1]}}</view>
            <view :class="type===3?'col-4':'col-6'" class="text-center px-4 py-2">{{itm[dataProps[0]]}}</view>
            <view v-if="type===3" class="text-center px-4 py-2 col-4">{{itm[dataProps[1]]}}</view>
          </view>
        </view>
      </view>
    </view>
    <u-loadmore :status="loadMoreStatus"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
        tabBG: '',
        tab: 0,
        page: 1,
        rows: 20,
        list: [],
        allLoaded: false,
        loadMoreStatus: 'loadmore'
			};
		},
    computed: {
      background () {
        return {
          backgroundColor: this.tabBG
        }
      },
      dataName () {
        const names = [
          ['步数'],
          ['时间', '深度睡眠', '浅度睡眠'],
          ['心率（bpm）'],
          ['舒张压','收缩压' ],
          ['血糖（mmol/L）']
        ]
        return names[this.type]
      },
      dataProps () {
        const theKeys = [
          ['step'],
          ['时间', '深度睡眠', '浅度睡眠'],
          ['bpm'],
          ['dbp', 'sbp'],
          ['gi']
        ]
        return theKeys[this.type]
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      }      
    },
    onLoad(e) {
      this.type = parseInt(e.type)
      this.tabBG = e.tabBG
    },
    onShow() {
      this.init()
    },
    onReachBottom() {
      if (!this.allLoaded) {
        console.log('allLoaded值为：'+this.allLoaded)
        this.loadMoreStatus = 'loading'
        this.page++
        this.init('Yo')
      } else {
        return false
      }
    },
    methods: {
      tabChange (e) {
        if (e === this.tab) {
          return false
        }
        this.tab = e
        this.page = 1
        this.init()
      },
      init (e) {
        console.log(e)
        const urls = [
          ['/mobile/healthy/findStepList'],
          ['/mobile/healthy/findSleepList'],
          ['/mobile/healthy/findHeartRateList', '/mobile/healthy/findAlertHeartRateList'],
          ['/mobile/healthy/findBloodPressureList', '/mobile/healthy/findAlertBloodPreList'],
          ['/mobile/healthy/findBloodSugarList']
        ] 
        const params = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          page: this.page,
          rows: this.rows          
        }
        this.$http.get(urls[this.type][this.tab], params)
          .then(res => {
            if (res.data.success) {
              const rows = res.data.rows
              const pager = res.data.pager
              this.allLoaded = pager.currentPage === pager.totalPages
              this.loadMoreStatus = this.allLoaded?'nomore':'loading'
              if (this.type !== 1) {
                if (!e) {
                  this.list = rows
                } else {
                  let firstR = rows[0]
                  let lastR = this.list[this.list.length-1]
                  if(firstR.date==lastR.date){
                    let newLast = lastR.obj.concat(firstR.obj)
                    this.$set(lastR,'obj',newLast)
                    rows.shift()
                  }
                  console.log(rows)
                  this.list = this.list.concat(rows)
                }
              } else {
                this.list = e ? this.list.concat(rows) : rows
              }
              
            }
          })
      }
    }
	}
</script>

<style lang="scss">
.posSticky{
  top: calc(44px + var(--status-bar-height));
}
</style>
