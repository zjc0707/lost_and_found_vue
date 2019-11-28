<template>
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">修改密码</div>
        <div class="panel-body">
          <div class="container">
            <form class="form-horizontal">
              <myAlert ref="myAlert"></myAlert>
              <myInput v-for="(item, index) in inputList" :key="index"
                       :id="item.id" :labelText="item.labelText" :inputType="item.inputType" :placeholder="item.placeholder" v-model.trim="$data[item.value]"></myInput>
              <myButtonGroup text="提交" :submit="submit"  :noback="true"></myButtonGroup>

            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import myInput from '../../components/myInput'
    import myButtonGroup from '../../components/myButtonGroup'
    import myAlert from '../../components/myAlert'
    export default {
        name: "editPassword",
        components:{myInput, myButtonGroup, myAlert},
        activated(){
            this.clear();
        },
        data(){
            return{
                oldPassword:'',
                newPassword:'',
                repeatPassword:'',
                inputList:[
                    this.inputData('oldPassword','旧密码','password','请输入旧密码','oldPassword'),
                    this.inputData('newPassword','新密码','password','请输入新密码(长度:'+this.constant.user.password.toString()+')','newPassword'),
                    this.inputData('repeatPassword','确认密码','password','请重复输入新密码', 'repeatPassword'),
                ]
            }
        },
        methods:{
            inputData: function(id, labelText, inputType, placeholder, value){
                return {id:id, labelText:labelText, inputType:inputType, placeholder:placeholder, value:value};
            },
            clear: function(){
                this.oldPassword = '';
                this.newPassword = '';
                this.repeatPassword = '';
                this.$refs.myAlert.closeAlert();
            },
            submit: function(){
                if(this.oldPassword === '' || this.newPassword === '' || this.repeatPassword === ''){
                    this.$refs.myAlert.openAlert('输入不得为空');
                    return;
                }
                if(!this.constant.user.password.isRight(this.newPassword)){
                    this.$refs.myAlert.openAlert('不符合密码要求(长度:'+this.constant.user.password.toString()+')');
                    return;
                }
                if(this.newPassword === this.oldPassword){
                    this.$refs.myAlert.openAlert('新旧密码相同');
                    return;
                }
                if(this.newPassword !== this.repeatPassword){
                    this.$refs.myAlert.openAlert('两次密码不一致');
                    return;
                }
                this.api.user.editPassword({
                    id: this.$store.getters.user.id,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }).then(rs => {
                    if(rs.code === 2103){
                        this.$refs.myAlert.openAlert('密码错误');
                    }else{
                        alert("修改成功,请重新登录");
                        this.$store.commit('clear');
                        this.$router.replace("/login");
                    }
                    this.clear();
                }).catch(err => {
                    this.clear();
                    // this.$refs.myAlert.openAlert(err.toString());
                    this.COMMON.logError(err);
                })

            }
        }
    }
</script>

<style scoped>
  @media (min-width: 768px) {
    .container{
      width: 100%;
    }
  }
  @media (min-width: 1170px) {
    .container{
      width: 70%;
    }
  }
</style>
