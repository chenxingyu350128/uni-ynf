<template>
	<view class="page">
		<text class="subtitle-1 font-weight-bold pa-4">个人信息</text>
    <view class="pa-4">
       <u-field 
         v-model="trueName" 
         label="姓名" 
         placeholder="请填写姓名" 
       />        
       <u-field 
         v-model="address" 
         label="地址" 
         placeholder="请填写地址" 
       />        
       <u-field 
         v-model="height" 
         label="身高" 
         placeholder="请填写身高" 
       />       
       <u-field 
         v-model="weight" 
         label="体重" 
         placeholder="请填写体重" 
       />             
    </view>
		<text class="subtitle-1 font-weight-bold pa-4">医疗信息</text>
    <view class="pa-4">
      <u-cell-group>
        <u-cell-item @click="showBloodList=true" title="血型" :value="blood || bloodTypes[3].label"></u-cell-item>
      </u-cell-group>
      <u-field
        v-model="allergyReaction" 
        label="过敏反应" 
        placeholder="请填写过敏反应" 
        type="textarea"
      /> 
      <u-field
        v-model="medicine" 
        label="药物" 
        placeholder="请填写药物" 
        type="textarea"
      /> 
      <u-field
        v-model="medicineReaction" 
        label="药物注意事项" 
        placeholder="请填药物注意事项" 
        type="textarea"
      /> 
    </view>
    <u-select @confirm="bloodConfirm" :default-value="defaultBlood" :list="bloodTypes" v-model="showBloodList"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        showBloodList: false,
				trueName: '',
				address: '',
				height: '',
				weight: '',
				blood: '',
				allergyReaction: '',
				medicine: '',
				medicineReaction: '',
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
        ]
			};
		},
    computed: {
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      defaultBlood () {
        let result = 0
        this.bloodTypes.forEach((res, i) => {
          if (res.value == this.blood) {
            result = i
          }
        })
        return [result]
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        const params = {
          sessionId: this.sessionId,
          memberId: this.memberId,
        }
        this.$http.get('/mobile/healthy/getMedicalMessage', params)
          .then(res=>{
            if(res.data.success){
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      },
      bloodConfirm (e) {
        console.log(e)
        this.blood = e[0].value
      },
      saveInfo () {
        const data = {
          trueName: this.trueName,
          address: this.address,
          height: this.height,
          weight: this.weight,
          blood: this.blood,
          allergyReaction: this.allergyReaction,
          medicine: this.medicine,
          medicineReaction: this.medicineReaction,
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.post('/mobile/healthy/addMedicalMessage', data)
          .then(res=>{
            if(res.data.success){
              this.$u.toast(res.data.msg)
              uni.navigateBack()
            }
          })
      },
    }
	}
</script>

<style lang="scss" scoped>

</style>
