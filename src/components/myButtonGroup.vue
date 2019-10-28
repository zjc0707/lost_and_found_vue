<template>
  <div>
    <div class="form-group">
      <div :class="inputClassOffset">
        <a @click="clickFunction" class="btn btn-primary btn-block">{{text}}</a>
      </div>
    </div>
    <div v-if="isSolt" class="form-group">
      <div :class="inputClassOffset">
        <slot></slot>
      </div>
    </div>
    <div v-if="!noback" class="form-group">
      <div :class="inputClassOffset">
        <a class="btn btn-default btn-block" @click="back">返回</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myButtonGroup",
        props:{
          text:String,
          submit:Function,
          noback:Boolean,
          isSolt:Boolean,
        },
        created(){
            // console.log("noback:" + this.noback);
        },
        data(){
            return{
                inputClassOffset:"col-sm-offset-2 col-sm-8"
            }
        },
        methods:{
            back: function () {
                this.$router.go(-1);
            },
            clickFunction(){
                this.submit();
            }
        }
    }
</script>

<style scoped>

</style>
