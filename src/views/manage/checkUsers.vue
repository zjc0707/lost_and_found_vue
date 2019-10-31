<template>
  <div class="">
    <!--      导航栏-->
    <div class="panel panel-default">
      <div class="panel-body">
        <span class="tip"><strong>分类：</strong></span>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-default active" @click="getPageByRoleId(constant.user.role.normal)">
            <input type="radio" name="options" autocomplete="off"> 普通用户
          </label>
          <label class="btn btn-default" @click="getPageByRoleId(constant.user.role.manage)">
            <input type="radio" name="options" autocomplete="off"> 管理员
          </label>
        </div>
      </div>
    </div>

    <div v-if="data != null">
      <!--      内容-->
      <div class="panel panel-default">
        <table class="table">
          <caption>列表</caption>
          <thead>
          <tr>
            <th>账号</th>
            <th>昵称</th>
            <th>注册时间</th>
            <th class="others">qq</th>
            <th class="others">微信</th>
            <th class="others">电话</th>
            <th v-if="permission.user.editRole()">管理</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in data.records" :key="index">
            <td>{{item.loginName}}</td>
            <td>{{item.userName}}</td>
            <td>{{COMMON.getDate(item.registerTime * 1000)}}</td>
            <td class="others">{{item.qq}}</td>
            <td class="others">{{item.wechat}}</td>
            <td class="others">{{item.telephone}}</td>
            <td v-if="permission.user.editRole()">
              <button v-if="roleId === constant.user.role.normal" class="btn btn-success btn-xs"
                      @click.stop="editRole(item.id, constant.user.role.manage)">升职</button>
              <button v-if="roleId === constant.user.role.manage" class="btn btn-danger btn-xs"
                      @click.stop="editRole(item.id, constant.user.role.normal)">撤职</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--      分页-->
      <myNavpager :data="data" :getPage="getPage"></myNavpager>

    </div>

    <div v-else>
      <div class="panel panel-default">
        <p>这里没有数据</p>
      </div>
    </div>
  </div>
</template>

<script>
    import myNavpager from '../../components/myNavpager'
    export default {
        name: "checkUsers",
        components:{myNavpager},
        activated(){
            this.freshData(1);
        },
        data(){
            return{
                data:{},
                roleId: this.constant.user.role.normal,
            }
        },
        methods:{
            freshData: function(pageIndex) {
                this.api.user.getPage(this.roleId, pageIndex, 10).then(rs=>{
                    this.data = rs.data;
                    window.scrollTo(0,0);
                }).catch(err => {
                    this.COMMON.logError(err);
                })
            },
            getPage: function (pageIndex) {
                if(pageIndex < 1){
                    return;
                }
                if(this.data.current){
                    if(this.data.current === pageIndex){
                        return;
                    }
                }
                if(this.data.pages){
                    if(pageIndex > this.data.pages){
                        return;
                    }
                }
                this.freshData(pageIndex);
            },
            getPageByRoleId: function(roleId){
                if(roleId === this.roleId){
                    return;
                }
                this.roleId = roleId;
                this.data = {};
                this.getPage(1);
            },
            editRole: function(userId, roleId) {
                this.api.user.editRole(userId, roleId).then(() => {
                    this.freshData(this.data.current);
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
        }
    }
</script>

<style scoped>
  .others{
    display: none;
  }
  @media (min-width: 400px){

  }
  @media (min-width: 767px) {

  }
  @media (min-width: 1170px) {
    .others{
      display: table-cell;
    }
  }
</style>
