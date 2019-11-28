<template>
  <div>
    <keep-alive>
      <myHeader></myHeader>
    </keep-alive>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

  </div>
</template>

<script>
  import myHeader from "../components/myHeader"
  export default {
    name: '',
    data () {
      return {

      }
    },
    components:{myHeader},
  }
</script>

<style>
  .content{
    margin-top: 60px;
  }
</style>
