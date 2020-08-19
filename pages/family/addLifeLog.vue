<template>
	<view>
		<view class="d-flex flex-wrap pa-4">
      <u-button class="ma-2" @click="addType(item, i)" v-for="(item, i) in typesValid" :key="i" type="primary" size="mini">{{item.name}}</u-button>
    </view>
    <view v-if="addArray.length">
      <view v-for="(item, i) in addArray" :key="i">
        <u-cell-group>
          <u-cell-item  
          :title="item.lifeName" 
          :value="item.lifeDefree"
          :arrow="false"
          >
            <u-icon @click="deleteAddArray(i)" class="mr-2" slot="icon" size="50" color="#00aaef" name="close-circle"></u-icon>
            <u-icon @click="showSelect(i)"  class="ml-2" slot="right-icon" size="40" color="grey" :name="item.show?'arrow-up':'arrow-down'"></u-icon>
          </u-cell-item>
        </u-cell-group>
        <view v-if="item.show">
          <view v-for="(itm, index) in typesValid[item.type].items" :key="index">
            <view class="px-6 py-2 u-border-bottom" @click="selectDegree(i, index, itm)">{{itm}}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="addArray.length" class="posFix b0 full-width">
      <u-button @click="commit" :custom-style="customStyle" type="primary">保存</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset'
        },
				typeNames: [
				  '正餐食量',
				  '蔬菜',
				  '脂肪',
				  '盐',
				  '抽烟',
				  '喝酒',
				  '运动'
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
        existed: [],
        addArray: []
			};
		},
    computed: {
      typesValid () {
        let result = []
        let index = 0
        this.typeNames.forEach((res, i) => {
          if (!this.existed.includes(res)) {
            result.push({
              name: res,
              type: index++,
              items: this.selectItems[i]
            }) 
          }
        })
        return result
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      this.existed = JSON.parse(decodeURIComponent(e.typeExisted))
      // console.log(x)
    },
    methods: {
      selectDegree (i, index, item) {
        console.log(i, index, item)
        this.addArray[i].show = false
        this.addArray[i].lifeDefree = item
        this.addArray[i].lifeType = index + 1
      },
      commit () {
        this.addArray.forEach(res => {
          const {lifeDefree, lifeName, lifeType} = res
          const data = {
            lifeDefree,
            lifeName,
            lifeType,
            sessionId: this.sessionId,
            memberId: this.memberId
          }
          this.$http.post('/mobile/healthy/addLifeLog', data)
            .then(rs => {
              if (rs.data.success) {
                this.$u.toast(rs.data.msg)
              }
            })
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      },
      deleteAddArray (i) {
        this.addArray.splice(i)
      },
      addType (item, i) {
        console.log(item, i)
        let invalid = false
        this.addArray.some(res => {
          if (res.lifeName === item.name) {
            invalid = true
            return true
          }
        })
        if (!invalid) {
          this.addArray.push({
            lifeName: item.name,
            lifeDefree: item.items[0],
            lifeType: 1,
            type: i,
            show: false
            
          })
        }
      },
      showSelect (e) {
        console.log(e)
        this.addArray.forEach((res, i) => {
          this.$set(res, 'show', i === e?!res.show:false)
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
