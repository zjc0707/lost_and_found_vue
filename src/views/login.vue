<template>
  <div class="container">
    <form class="form-horizontal">
      <myAlert ref="myAlert"></myAlert>
      <div class="form-group" style="text-align: center">
        <h1>登录</h1>
      </div>
      <myInput v-for="(item, index) in inputList" :key="index"
               :id="item.id" :labelText="item.labelText" :inputType="item.inputType" :placeholder="item.placeholder" :onlyNumber="item.onlyNumber" v-model.trim="$data[item.value]"></myInput>
      <myCaptcha></myCaptcha>
      <myButtonGroup text="登录" :submit="login" :isSolt="true">
        <router-link to="/register" class="btn btn-default btn-block">去注册</router-link>
      </myButtonGroup>
    </form>
  </div>
</template>

<script>
    import myInput from '../components/myInput'
    import myButtonGroup from '../components/myButtonGroup'
    import myAlert from '../components/myAlert'
    import myCaptcha from '../components/myCaptcha'
    export default {
        name: "login",
        components:{myInput, myButtonGroup, myAlert, myCaptcha},
        data(){
            return{
                loginName:"",
                password:"",
                captchaCode:"",
                captchaUrl:"",
                inputList:[
                    this.inputData('loginName','账号','text','请输入账号','loginName',true),
                    this.inputData('password','密码','password','请输入密码','password'),
                    this.inputData('captchaCode','验证码','text','大小写均可','captchaCode'),
                ],
            }
        },
        methods:{
            inputData: function(id, labelText, inputType, placeholder, value, onlyNumber){
                return {id:id, labelText:labelText, inputType:inputType, placeholder:placeholder, value:value, onlyNumber: onlyNumber};
            },
            login: function () {
                if(this.loginName==="" || this.password==="" || this.captchaCode===""){
                    this.$refs.myAlert.openAlert("输入不得为空");
                    return;
                }
                this.api.user.login({
                    loginName: this.loginName,
                    loginPassword: this.password,
                    captchaCode: this.captchaCode,
                    timeStamp: Date.now()
                }).then((rs)=>{
                    if(rs.code === 2000){
                        // alert("登录成功");
                        this.$store.commit('setUserLogin', rs.data);
                        if(this.$route.query.redirect){
                            this.$router.replace(this.$route.query.redirect.toString());
                            return;
                        }
                        this.$router.replace("/");
                        return;
                    }
                    this.$refs.myAlert.openAlert('(' + rs.code + ')' + rs.msg);
                }).catch((rs)=>{
                    this.$refs.myAlert.openAlert(rs.toString());
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
