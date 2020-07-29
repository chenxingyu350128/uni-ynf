<template>
	<view>
<!--    <u-navbar back-icon-color="#fff" back-icon-name="arrow-left" :background="background">
      <u-search placeholder="日照香炉生紫烟" v-model="keyword" :action-text="emptyText" />
    </u-navbar> -->
    <view class="py-2 px-6 font-weight-bold">
      定位/推荐
    </view>
    <view class="d-flex px-6 py-2 align-center flex-wrap">
      <u-button @click="btnClick(item)" :custom-style="customStyle" class="recommend posRela mb-2" size="mini" v-for="(item, i) in recommendCity" :key="i" type="primary">
        {{item.areaName}}
        <u-icon 
          v-if="locationCity === item.areaName"
          name="location" 
          size="30" 
          class="posAbs tag"
          customPrefix="mdi"
        >
         </u-icon>
      </u-button>
    </view>
    <view v-if="cityHistory.length" class="py-2 px-6 font-weight-bold">
      历史
    </view>
    <view v-if="cityHistory.length" class="d-flex px-6 py-2 align-center flex-wrap">
      <u-button @click="btnClick(item)" :custom-style="customStyle" class="recommend mb-2" size="mini" v-for="(item, i) in cityHistory" :key="i" type="primary">
        {{item.areaName}}
        <u-icon 
          v-if="locationCity === item.areaName" 
          name="location" 
          size="30" 
          class="posAbs tag"
          customPrefix="mdi"
        >
        </u-icon>
      </u-button>
    </view>
		<u-index-list @select="aelectBar" :offset-top="0" :scroll-top="scrollTop">
      <view v-for="(item, index) in indexList"  :key="index">
          <u-index-anchor @select="aelectBar" :use-slot="true">
            <text class="anchor-text">{{item}}</text>
          </u-index-anchor>
          <view @click="btnClick(itm)" v-for="(itm, i) in indexItems[index]" :key="i" class="px-6 py-4">
            {{itm.areaName}}
          </view>
      </view>
		</u-index-list>
	</view>
</template>

<script>
	export default {
    name: 'CityPicker',
		data() {
			return {
        background: {
          backgroundColor: '#00aaef'
        },
        customStyle: {
          padding: "0 16px"
        },
				scrollTop: 0,
        recommendCity: [],
        city: '',
        keyword: '',
        emptyText: '',
        indexList: [],
        indexItems: [],
			};
		},
    onLoad() {
      this.getCityList()
    },
    computed: {
      locationPoint () {
        return this.$store.state.app.locationPoint
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      locationCity () {
        return this.$store.state.app.locationCity
      },
      cityHistory () {
        return this.$store.state.app.cityHistory
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop
    },
    methods: {
      aelectBar (e) {
        console.log(e)
      },
      btnClick (item) {
        console.log(item)
        this.$store.commit('SET_SINGLE_ITEM', ['locationCity', item.areaName])
        this.$store.commit('SET_SINGLE_ITEM', ['areaId', item.areaId])        
        this.$store.commit('SET_SINGLE_ITEM', ['cityId', item.cityId]) 
        this.$store.commit('SET_CITY_HISTORY', item)
        uni.switchTab({
          url: '../../tabbar/index/index'
        })
      },
      getCityList () {
        console.log(this.point)
        const { latitude, longitude } = this.locationPoint
        const params = {
          sessionId: this.sessionId,
          lat: latitude,
          log: longitude
        }
        this.$http.get('/mobile/index/getMiniCitys', params)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              this.recommendCity = obj.recommendCity
              this.city = obj.city
              delete obj.city
              delete obj.recommendCity
              console.log(obj)
              const keys = Object.keys(obj)
              const values = Object.values(obj)
              console.log(values)
              
              // 获取城市索引列表需要的数据
   
              for(let i=0; i<keys.length; i++){
                  this.indexList.push(keys[i])
       
                  this.indexItems.push(
                    values[i]
                  )
              }
            }
          })
          
      }
    }
	}
</script>

<style lang="scss">
.recommend{
  margin-right: 8px;
}
.tag{
  right: 0;
  top: -4px;
}
</style>
