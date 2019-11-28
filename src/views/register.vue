<template>
  <div class="container">
    <form class="form-horizontal">
      <myAlert ref="myAlert"></myAlert>
      <div class="form-group" style="text-align: center">
        <h1>注册</h1>
      </div>
      <myInput v-for="(item, index) in inputList" :key="index"
               :id="item.id" :labelText="item.labelText" :inputType="item.inputType" :placeholder="item.placeholder" :onlyNumber = "item.onlyNumber" v-model.trim="$data[item.value]"></myInput>
      <myCaptcha ref="myCaptcha"></myCaptcha>
      <myButtonGroup text="注册" :submit="submit"></myButtonGroup>
    </form>
  </div>
</template>

<script>
    import myInput from '../components/myInput'
    import myButtonGroup from '../components/myButtonGroup'
    import myAlert from '../components/myAlert'
    import myCaptcha from '../components/myCaptcha'
    export default {
        name: "register",
        components:{myInput, myButtonGroup, myAlert, myCaptcha},
        data(){
            return{
                loginName:"",
                userName:"",
                password:"",
                repeatPassword:"",
                qq:"",
                wechat:"",
                telephone:"",
                captchaCode:"",
                inputList:[
                    this.inputData('loginName','账号','text','请输入账号(长度:'+this.constant.user.loginName.toString()+',仅数字)','loginName',true),
                    this.inputData('userName','昵称','text','请输入昵称(长度:'+this.constant.user.userName.toString()+',中文长度为2)','userName'),
                    this.inputData('password','密码','password','请输入密码(长度:'+this.constant.user.password.toString()+')','password'),
                    this.inputData('repeatPassword','','password','请重复输入密码','repeatPassword'),
                    this.inputData('telephone','电话','text','选填(11位)，至少一项','telephone', true),
                    this.inputData('qq','qq','text','选填，至少一项','qq', true),
                    this.inputData('wechat','微信','text','选填，至少一项','wechat'),
                    this.inputData('captchaCode','验证码','text','大小写均可','captchaCode'),
                ],
            }
        },
        methods:{
            inputData: function(id, labelText, inputType, placeholder, value, onlyNumber){
                return {id:id, labelText:labelText, inputType:inputType, placeholder:placeholder, value:value, onlyNumber: onlyNumber};
            },
            submit: function () {
                if(this.loginName==="" || this.password==="" || this.captchaCode==="" || this.userName===""){
                    this.$refs.myAlert.openAlert("输入不得为空");
                    return;
                }
                //账号信息约束
                if(!this.constant.user.loginName.isRight(this.loginName)){
                    this.$refs.myAlert.openAlert('不符合账号要求(长度:'+this.constant.user.loginName.toString()+')');
                    return;
                }
                if(!this.constant.user.userName.isRight(this.userName)){
                    this.$refs.myAlert.openAlert('不符合昵称要求(长度:'+this.constant.user.userName.toString()+')');
                    return;
                }
                if(!this.constant.user.password.isRight(this.password)){
                    this.$refs.myAlert.openAlert('不符合密码要求(长度:'+this.constant.user.password.toString()+')');
                    return;
                }
                if(this.password !== this.repeatPassword){
                    this.$refs.myAlert.openAlert("两次密码输入不一致");
                    return;
                }
                if(this.qq === "" && this.wechat === "" && this.telephone === ""){
                    this.$refs.myAlert.openAlert("至少填写一项联系信息");
                    return;
                }
                if(this.telephone !== '' && !this.constant.user.telephone.isRight(this.telephone)){
                    this.$refs.myAlert.openAlert("正常电话长度为11");
                    return;
                }
                this.api.user.register({
                    loginName: this.loginName,
                    userName: this.userName,
                    loginPassword: this.password,
                    qq: this.qq,
                    wechat: this.wechat,
                    telephone: this.telephone,
                    captchaCode: this.captchaCode,
                    timeStamp: Date.now()
                }).then((rs)=>{
                    if(rs.code === 5000){
                        alert("注册成功, 返回主页");
                        this.$store.commit('setUserLogin', rs.data);
                        this.$router.replace("/");
                        return;
                    }
                    this.$refs.myAlert.openAlert(rs.msg);
                    this.$refs.myCaptcha.getCaptcha();
                }).catch((rs)=>{
                    console.log(rs);
                    this.$refs.myAlert.openAlert('请求异常');
                    this.$refs.myCaptcha.getCaptcha();
                });
            }
        }
    }
</script>

<style scoped>
  .container {
    /*width: 400px;*/
    margin-top: 1%;
  }
  @media (min-width: 768px) {
    .container{
      width: 60%;
    }
  }
  @media (min-width: 1170px) {
    .container{
      width: 35%;
    }
  }
</style>
