<template>
  <div class="px-8 retrieve-cpnt white lighten-4">
    <uni-header
      text="忘记密码"
      @doSomething="back"
    />
    <!-- <div class="text-center subtitle-1 py-2">请输入手机号</div> -->
    <v-text-field
      v-model="tel"
      outlined
      color="blue"
      class="mb-4"
      type="number"
      prepend-inner-icon="mdi-cellphone-android"
      placeholder="请输入手机号码"
    />
    <v-text-field
      v-model="vCode"
      outlined
      color="blue"
      class="mb-4"
      type="number"
      prepend-inner-icon="mdi-shield-check"
      placeholder="请输入验证码"
    >
      <template v-slot:append>
        <v-btn
          v-show="seconds"
          small
          dark
          color="blue accent-2"
        >
          {{ seconds }}s
        </v-btn>
        <v-btn
          v-show="!seconds"
          class="caption"
          small
          dark
          outlined
          color="blue accent-2"
          @click="getCode"
        >
          获取验证码
        </v-btn>
      </template>
    </v-text-field>
    <v-text-field
      v-model="password"
      outlined
      color="blue"
      class="mb-4"
      type="password"
      placeholder="请输入新密码"
    />
    <v-text-field
      v-model="confirmPwd"
      outlined
      color="blue"
      class="mb-4"
      type="password"
      placeholder="确认密码"
    />
    <v-btn
      large
      block
      color="blue"
      dark
      @click="commit"
    >
      确定
    </v-btn>
  </div>
</template>

<script>
    // import iHeader from '../public/header'
    export default {
        name: 'retrieve',
        // components: {
        //     iHeader
        // },
        data: ()=>({
            tel: '',
            seconds: 0,
            vCode: '',
            timer: '',
            password: '',
            confirmPwd: '',
        }),
        beforeDestroy(){
            clearInterval(this.timer)
        },
        methods: {
            back(){
                this.$emit('hide')
            },
			      checkPhone(e){
    	        if(!(/^1[3456789]\d{9}$/.test(e))){ 
    	            return true; 
    	        }   
            },  
            checkpwd(e){
              
  	          if(!(/^(\w){6,20}$/.test(e))){ 
    	            return true; 
    	        }               
            },          
            getCode(){
              if(this.checkPhone(this.tel)){
                this.$toast.warning('请输入正确的手机号')
                return
              }
              this.$http.get('/mobile/user/sendMsg',{params:{userNo: this.tel}}).then(res=>{
                  if(res.data.success){
                    this.$toast.success('验证码已发送')
                      // this.showNext = true
                      this.seconds = 60
                      //倒计时开始
                      this.timer = setInterval(()=>{
                          this.seconds --
                          if(this.seconds === 0){
                              clearInterval(this.timer)
                          }
                      },1000)                        
                  }
              })
            },
            commit(){
              let canIuse = true
              const verify = [
                {
                  status: !this.tel,
                  remind: '请先输入手机号！'
                },
                {
                  status: this.checkPhone(this.tel),
                  remind: '手机号格式有误，请重新输入'
                },
                {
                  status: !this.vCode,
                  remind: '请输入验证码！'
                },
                {
                  status: !this.password,
                  remind: '请输入新密码！'
                },
                {
                  status: !this.confirmPwd,
                  remind: '请确认密码！'
                },
                {
                  status: this.confirmPwd!==this.password,
                  remind: '两次密码不一致，密码确认失败'
                },
                {
                  status: this.checkpwd(this.password),
                  remind: '密码只能输入6-20个字母、数字、下划线'
                },
              ]
              verify.some(res=>{
                  if(res.status){
                      this.$toast.warning(res.remind)
                      canIuse = false
                      return true
                  }
              })
              if(!canIuse){
                return
              }
              const data = {
                userName: this.tel,
                passWord: this.password,
                yzcode: this.vCode
              }
              this.$http.post('/mobile/user/resetUserPwd',data)
              .then(res=>{
                if(res.data.success){
                  this.$toast.success('密码重置成功,请重新登录')
                  this.$emit('reLogin')
                }
              })
            }
        }
    }
</script>

<style lang="scss">
    .retrieve-cpnt{
        padding-top: 65px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
        .v-input__slot{

            .v-input__prepend-inner{
                align-self: center;
                margin-top: 0;
            }
        }
    }
</style>