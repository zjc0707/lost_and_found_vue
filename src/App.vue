<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
      <!--        <router-view></router-view>-->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-if="showPop" class="pop"></div>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return{
            showPop:false,
        }
    },
    methods:{
        changePop:function (isShow) {
            this.showPop = isShow;
        }
    },
    computed:{
        pop(){
            return this.$store.getters.showPop;
        }
    },
    watch:{
        pop(val){
            // console.log(val);
            this.showPop = val;
        }
    }
}
</script>

<style>
  @import "assets/css/baseCss.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 0;
  }
  body{
    margin: 0;
  }
  h1{
    font-size: 30px;
  }
  .pop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 9999;
  }
</style>
