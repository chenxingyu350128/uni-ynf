<template>
	<view class="page">
    <view v-if="step > 0" class="d-flex flex-column align-center pt-2 pb-4">
      <text class="primary--text title font-weight-bold">{{title[step]}}</text>
      <text class="caption grey--text pt-2">请输入准确的个人信息，以便精确的计算健康情况</text>
    </view>
    
    <!-- 关系 -->
    <view v-if="step===0" class="d-flex flex-wrap border-box">
      <view 
        v-for="(item, index) in relatives" 
        :key="index"
        class="col-4 pa-2 border-box d-flex justify-center"
      >
        <u-button @click="changeRelaIndex(index, item.gender)" :plain="index!==relaIndex" size="medium" type="primary">{{item.rela}}</u-button>
      </view>
    </view>
    <!-- 性别 -->
    <view 
      v-if="step===1"
      class="d-flex flex-column align-center"
    >
      <view @click="setGender(1)" class="d-flex flex-column align-center">
        <image class="genderImage" shape="circle" src="./static/img/maleAvatar.png"></image>
        <u-icon class="mt-4" size="60" :color="gender===1?'#00aaef':'#ccc'" name="checkmark-circle"></u-icon>
      </view>
      <view @click="setGender(2)" class="d-flex flex-column align-center mt-4">
        <image class="genderImage" shape="circle" src="./static/img/femaleAvatar.png"></image>
        <u-icon class="mt-4" size="60" :color="gender===2?'#00aaef':'#ccc'" name="checkmark-circle"></u-icon>
      </view>
    </view>
    <!-- 出生年月 -->
    <view 
      v-if="step===2"
      class="d-flex px-2"
    >
      <u-button class="flex-fill" @click="showDatePicker=true" type="primary">{{birthday}}</u-button>
    </view>
    <!-- 身高 -->
    <view 
      v-if="step===3"
    >
      <view class="d-flex align-end justify-center">        
        <image :src="gender===2?'./static/img/female.png':'./static/img/male.png'" mode="heightFix"></image>
        <image src="./static/img/rule.png" mode="heightFix"></image>
        <text class="primary--text">{{ minHeight + sliderHeight }}cm</text>
      </view>
      <view class="px-4 mt-12">
        <u-slider 
          v-model="sliderHeight" 
        >
        </u-slider>
      </view>
    </view>
    <!-- 体重 -->
    <view 
      v-if="step===4"
    >
      <view class="d-flex align-end justify-center pl5em">        
        <image :src="gender===2?'./static/img/femaleWith.png':'./static/img/maleWith.png'" mode="heightFix"></image>
        <!-- <image src="./static/img/rule.png" mode="heightFix"></image> -->
        <text style="width: 5em" class="primary--text">{{ minWeight + sliderWeight }}kg</text>
      </view>
      <view class="px-4 mt-12">
        <u-slider 
          v-model="sliderWeight" 
        >
        </u-slider>
      </view>
    </view>
    <!-- 下方按钮 -->
		<view class="posFix b0 full-width d-flex">
      <u-button v-if="step > 0" class="flex-fill" :hair-line="false" :custom-style="customStyle" @click="step--" plain type="primary">上一步</u-button>
      <u-button v-if="step < 4" class="flex-fill" :hair-line="false" :custom-style="customStyle" @click="step++" type="primary">下一步</u-button>
      <u-button v-if="step === 4" @click="addMember" class="flex-fill" :hair-line="false" :custom-style="customStyle" type="primary">完成</u-button>
    </view>
    <u-picker 
    v-model="showDatePicker"
    mode="time" 
    :default-time="birthday+ ' 12:00'"
    :end-year="yearNow" 
    @confirm="dateChange"
    />
    <!-- <u-calendar @change="dateChange" v-model="showDatePicker" mode='date'></u-calendar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset!important',
          'border': 'none!important'
        },
        title: [
          '',
          '成员性别',
          '出生年月',
          '成员身高',
          '成员体重'
        ],
        relaIndex: 0,
        gender: 1,
        today: new Date(),
        pickerDay: '',
				step: 0,
        minHeight: 120,
        minWeight: 40,
        sliderHeight: 45,
        sliderWeight: 15,
        weight: 55,
        relatives: [
          {
            rela: '父亲',
            gender: 1
          },
          {
            rela: '母亲',
            gender: 2
          },
          {
            rela: '丈夫',
            gender: 1
          },
          {
            rela: '妻子',
            gender: 2
          },
          {
            rela: '爷爷',
            gender: 1
          },
          {
            rela: '奶奶',
            gender: 2
          },
          {
            rela: '外公',
            gender: 1
          },
          {
            rela: '外婆',
            gender: 2
          },
          {
            rela: '儿子',
            gender: 1
          },
          {
            rela: '女儿',
            gender: 2
          },
          {
            rela: '亲戚',
            gender: 0
          },
          {
            rela: '朋友',
            gender: 0
          },
          {
            rela: '其他',
            gender: 0
          },
          {
            rela: '本人',
            gender: 0
          }
        ],
        showDatePicker: false
			
      };
		},
    computed: {
      birthday () {
        return this.pickerDay || this.$u.timeFormat(this.today, 'yyyy-mm-dd')
      },
      yearNow () {
        return Number(this.$u.timeFormat(new Date(), 'yyyy'))
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    methods: {
      changeRelaIndex (index, gender) {
        this.relaIndex=index
        if (gender) this.gender = gender
      },
      setGender (e) {
        let valid = true
        const rela = this.relatives[this.relaIndex].rela
        this.relatives.some(res => {
          if (rela === res.rela) {
            if (res.gender) {
              this.$u.toast('该关系成员性别不可更改')
              valid = false
              return true
            }
          }
        }) 
        if (valid) {
          this.gender = e
        }
      },
      dateChange (e) {
        console.log(e)
        this.pickerDay = `${e.year}-${e.month}-${e.day}`
      },
      addMember () {
        const data = {
          sex: this.gender,
          birthday: this.birthday,
          rela: this.relatives[this.relaIndex].rela,
          height: this.minHeight + this.sliderHeight,
          weight: this.minWeight + this.sliderWeight,
          sessionId: this.sessionId
        }
        this.$http.post('/mobile/user/addMember', data)
          .then(res => {
            if (res.data.success) {
              uni.$emit('getMemberList')
              this.$u.toast(res.data.msg)
              uni.navigateBack()
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
}
.genderImage{
  width: 225rpx;
  height: 225rpx;
}
.pl5em{
  padding-left: 5em;
}
</style>
