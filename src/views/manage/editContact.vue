<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">修改联系方式</div>
      <div class="panel-body">
        <div class="container">
          <form class="form-horizontal">
            <myAlert ref="myAlert"></myAlert>
            <myInput v-for="(item, index) in inputList" :key="index"
                     :id="item.id" :labelText="item.labelText" :inputType="item.inputType"
                     :onlyNumber="item.onlyNumber" :placeholder="item.placeholder" v-model.trim="$data[item.value]"></myInput>
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
        name: "editContact",
        components:{myInput, myButtonGroup, myAlert},
        activated(){
            this.userName = this.getString(this.$store.getters.user.userName);
            this.telephone = this.getString(this.$store.getters.user.telephone);
            this.qq = this.getString(this.$store.getters.user.qq);
            this.wechat = this.getString(this.$store.getters.user.wechat);
        },
        data(){
            return{
                userName: this.getString(this.$store.getters.user.userName),
                telephone: this.getString(this.$store.getters.user.telephone),
                qq:this.getString(this.$store.getters.user.qq),
                wechat:this.getString(this.$store.getters.user.wechat),
                inputList:[
                    this.inputData('userName','昵称','text','请输入昵称(长度:'+this.constant.user.userName.toString()+')','userName'),
                    this.inputData('telephone','电话','text','请输入电话','telephone', true),
                    this.inputData('qq','qq','text','请输入qq','qq', true),
                    this.inputData('wechat','微信','text','请输入微信','wechat'),
                ]
            }
        },
        methods:{
            inputData: function(id, labelText, inputType, placeholder, value, onlyNumber){
                return {id:id, labelText:labelText, inputType:inputType, placeholder:placeholder, value:value, onlyNumber: onlyNumber};
            },
            clear: function(){
                this.telephone = '';
                this.qq = '';
                this.wechat = '';
                this.$refs.myAlert.closeAlert();
            },
            submit: function () {
                if(this.userName === ""){
                    this.$refs.myAlert.openAlert("昵称不得为空");
                    return;
                }
                if(!this.constant.user.userName.isRight(this.userName)){
                    this.$refs.myAlert.openAlert('不符合昵称要求(长度:'+this.constant.user.userName.toString()+')');
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
                let isUserNameEdit = this.$store.getters.user.userName !== this.userName;
                let isTelephoneEdit = this.$store.getters.user.telephone !== this.telephone;
                let isQqEdit = this.$store.getters.user.qq !== this.qq;
                let isWechatEdit = this.$store.getters.user.wechat !== this.wechat;
                if(!isTelephoneEdit && !isQqEdit && !isWechatEdit && !isUserNameEdit){
                    this.$refs.myAlert.openAlert("没有改变内容");
                    return;
                }
                this.api.user.editContact({
                    id: this.$store.getters.user.id,
                    userName: isUserNameEdit ? this.userName : null,
                    telephone: isTelephoneEdit ? this.telephone : null,
                    qq: isQqEdit ? this.qq : null,
                    wechat: isWechatEdit ? this.wechat : null,
                }).then(() => {
                    alert("修改成功");
                    if(isUserNameEdit){
                        this.$store.getters.user.userName = this.userName;
                    }
                    if(isTelephoneEdit){
                        this.$store.getters.user.telephone = this.telephone;
                    }
                    if(isQqEdit){
                        this.$store.getters.user.qq = this.qq;
                    }
                    if(isWechatEdit){
                        this.$store.getters.user.wechat = this.wechat;
                    }
                    this.$store.commit('updateUser');
                    // this.clear();
                }).catch(err => {
                    // this.clear();
                    this.$refs.myAlert.openAlert(err.toString());
                })
            },
            getString: function(s){
                return s===null ? '' : s;
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
