<template>
  <div class="form-group">
    <div :class="inputClassOffset">
      <img :src="captchaUrl" @click="getCaptcha" alt="captcha">
      <br>
      <span>（点击图片刷新）</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myCaptcha",
        created(){
            this.getCaptcha();
        },
        data(){
            return{
                inputClassOffset:"col-sm-offset-2 col-sm-8",
                captchaUrl:"",
            }
        },
        methods:{
            getCaptcha: function() {
                let num=Math.ceil(Math.random()*10);
                this.captchaUrl = this.COMMON.url("/register/captcha?" + num);
            }
        }
    }
</script>

<style scoped>

</style>
