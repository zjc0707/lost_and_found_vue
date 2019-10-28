<template>
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">个人信息</div>
        <div class="panel-body">
<!--          <div class="row">-->
<!--            <div class="col-md-2 col-sm-3 col-xs-3">账号:</div>-->
<!--            <div class="col-md-10 col-sm-9 col-xs-9">123456</div>-->
<!--          </div>-->
          <div v-for="(item, index) in dataList" :key="index" class="row">
            <hr v-if="item.hr">
            <div v-else>
              <div class="col-md-2 col-sm-3 col-xs-4">{{item.name}}:</div>
              <div class="col-md-10 col-sm-9 col-xs-8">{{(item.value === null || item.value === '') ? '无' : item.value}}</div>
            </div>

          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "peopleCenter",
        activated(){
            this.dataList = [
                {name: '账号', value: this.$store.getters.user.loginName},
                {name: '昵称', value: this.$store.getters.user.userName},
                {name: '注册时间', value: this.COMMON.getDate(this.$store.getters.user.registerTime * 1000)},
                {name: '角色', value: this.$store.getters.roleName === '' ? '普通用户' : this.$store.getters.roleName},
                {hr: true},
                {name: '电话', value: this.$store.getters.user.telephone},
                {name: 'qq', value: this.$store.getters.user.qq},
                {name: '微信', value: this.$store.getters.user.wechat}
            ];
        },
        data(){
            return{
                dataList:[]
            }
        }
    }
</script>

<style scoped>

</style>
