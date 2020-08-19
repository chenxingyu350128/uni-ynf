<template>
	<view class="page">
    <!-- 输入型 -->
    <u-field 
      v-if="showField"
      v-model="value" 
      :label="label" 
      :placeholder="'请输入'+label" 
      :focus="true"
    /> 
    <!-- picker-->
    <view v-if="showPicker" class="pa-4">
      <view v-if="key==='birthday'">
        <u-picker :end-year="yearNow" @confirm="dateChange" :default-time="value + ' 13:09'" mode="time" v-model="showDate"/>
        <view class="text-center mb-2">出生日期</view>
        <u-button @click="showDate=true" type="primary">{{value}}</u-button>
      </view>
      <view v-if="key==='householdRegister' || key==='domicile'">
        <u-picker @confirm="regionChange" :default-region="value.split('-')" mode="region" v-model="showDate"/>
        <view class="text-center mb-2">{{key==='householdRegister'?'户籍地':'所在地'}}</view>
        <u-button @click="showDate=true" type="primary">{{value}}</u-button>
      </view>
    </view>
    <!-- 选择-->
    <view v-if="showSelect">
      <view v-if="key==='sex'">
        <u-select @confirm="genderConfirm" :default-value="defaultGender" :list="genders" v-model="isShow"/>
      </view>
      <view v-if="key==='blood'">
        <u-select @confirm="bloodConfirm" :default-value="defaultBlood" :list="bloodTypes" v-model="isShow"/>
      </view>
      <view v-if="key==='rela'">
        <u-select @confirm="relaConfirm" :default-value="defaultRela" :list="relatives" v-model="isShow"/>
      </view>
      <view v-if="key==='occupation'">
        <u-select @confirm="occuConfirm" :default-value="defaultCareer" :list="careers" v-model="isShow"/>
      </view>
    </view>
    <!-- <u-calendar @change="dateChange" v-model="showDate" mode='date'></u-calendar> -->
    <view class="full-width posFix b0">
      <u-button @click="updateInfo" :custom-style="customStyle" :hair-line="false" class="b-radius0" type="primary">保存</u-button>
    </view> 
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
        isShow: true,
        isUser: false,
        showDate: false,
				key: '',
        value: '',
        label: '',
        changeGender: false,
        gender: '',
        genders: [
          {
            value: '1',
            label: '男'
          },
          {
            value: '2',
            label: '女'
          }
        ],
        bloodTypes: [
          {
            value: 'A型',
            label: 'A型'
          },
          {
            value: 'B型',
            label: 'B型'
          },
          {
            value: 'AB型',
            label: 'AB型'
          },
          {
            value: 'O型',
            label: 'O型'
          },
          {
            value: '其他',
            label: '其他'
          }
        ],
        careers: [
          {
            value: '计算机/互联网/通信',
            label: '计算机/互联网/通信'
          },
          {
            value: '计算机/互联网/通信',
            label: '计算机/互联网/通信'
          },
          {
            value: '生产/工艺/制造',
            label: '生产/工艺/制造'
          },
          {
            value: '医疗/护理/制药',
            label: '医疗/护理/制药'
          },
          {
            value: '金融/银行/投资/保险',
            label: '金融/银行/投资/保险'
          },
          {
            value: '商业/服务业/个体经营',
            label: '商业/服务业/个体经营'
          },
          {
            value: '文化/广告/传媒',
            label: '文化/广告/传媒'
          },
          {
            value: '娱乐/艺术/表演',
            label: '娱乐/艺术/表演'
          },
          {
            value: '律师/法务',
            label: '律师/法务'
          },
          {
            value: '教育/培训',
            label: '教育/培训'
          },
          {
            value: '公务员/行政/事业单位',
            label: '公务员/行政/事业单位'
          },
          {
            value: '学生',
            label: '学生'
          },
          {
            value: '其他',
            label: '其他'
          }
        ],
        relatives: [
          {
            value: '父亲',
            label: '父亲',
            extra: 1
          },
          {
            value: '母亲',
            label: '母亲',
            extra: 2
          },
          {
            value: '丈夫',
            label: '丈夫',
            extra: 1
          },
          {
            value: '妻子',
            label: '妻子',
            extra: 2
          },
          {
            value: '爷爷',
            label: '爷爷',
            extra: 1
          },
          {
            value: '奶奶',
            label: '奶奶',
            extra: 2
          },
          {
            value: '外公',
            label: '外公',
            extra: 1
          },
          {
            value: '外婆',
            label: '外婆',
            extra: 2
          },
          {
            value: '儿子',
            label: '儿子',
            extra: 1
          },
          {
            value: '女儿',
            label: '女儿',
            extra: 2
          },
          {
            value: '亲戚',
            label: '亲戚',
            extra: 0
          },
          {
            value: '朋友',
            label: '朋友',
            extra: 0
          },
          {
            value: '其他',
            label: '其他',
            extra: 0
          },
          {
            value: '本人',
            label: '本人',
            extra: 0
          }
        ]
			};
		},
    computed: {
      yearNow () {
        return Number(this.$u.timeFormat(new Date(), 'yyyy'))
      },
      defaultGender () {
        let result = 0
        this.genders.forEach((res, i) => {
          if (res.value == this.value) {
            result = i
          }
        })
        return [result]
      },
      defaultBlood () {
        let result = 0
        this.bloodTypes.forEach((res, i) => {
          if (res.value == this.value) {
            result = i
          }
        })
        return [result]
      },
      defaultRela () {
        let result = 0
        this.relatives.forEach((res, i) => {
          if (res.value == this.value) {
            result = i
          }
        })
        return [result]
      },
      defaultCareer () {
        let result = 0
        this.careers.forEach((res, i) => {
          if (res.value == this.value) {
            result = i
          }
        })
        return [result]
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      showField () {
        const arr = ['realName', 'trueName', 'identity', 'address', 'height', 'weight', 'phone', 'mail']
        return arr.includes(this.key)
      },
      showSelect () {
        const arr = ['sex', 'blood', 'occupation', 'rela']
        return arr.includes(this.key)
      },
      showPicker () {
        const arr = ['birthday', 'householdRegister', 'domicile']
        return arr.includes(this.key)
      }
      
    },
    onLoad(e) {
      console.log(e)
      this.key = e.key
      this.value = e.value
      this.label = e.label
      this.isUser = Boolean(parseInt(e.isUser))
    },
    methods: {
      updateInfo () {
        if (!this.value) {
          this.$u.toast('数据不能为空，请输入')
          return false
        }
        const data = {
          sessionId: this.sessionId,
          [this.key]: this.value
        }
        if (!this.isUser) {
          console.log('vvv')
          data.memberId = this.memberId
        }
        
        if (this.changeGender) { // 修改关系时的性别更换
          data.sex = this.gender
        }
        const url = this.isUser ? '/mobile/user/editUser' : '/mobile/user/updateMember'
        
        this.$http.post(url, data)
          .then(res => {
            if (res.data.success) {
              this.isUser ? uni.$emit('getUser') : uni.$emit('getMember')
              this.$u.toast(res.data.msg)
              uni.navigateBack()
            }
          })
      },
      genderConfirm (e) {
        console.log(e)
        this.value = e[0].value
        this.updateInfo()
      },
      bloodConfirm (e) {
        console.log(e)
        this.value = e[0].value
        this.updateInfo()
      },
      occuConfirm (e) {
        console.log(e)
        this.value = e[0].value
        this.updateInfo()
      },
      relaConfirm (e) {
        console.log(e)
        this.value = e[0].value
        if (e[0].extra) { // 表示性别不可更改
          this.changeGender = true
          this.gender = e[0].extra
        }
        this.updateInfo()
      },
      dateChange (e) {
        console.log(e)
        this.value = e.year + '-' + e.month + '-' + e.day
      },
      regionChange (e) {
        console.log(e)
        this.value = e.province.label + '-' + e.city.label + '-' + e.area.label
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
}
</style>
