<template>
  <div class="">
    <!--      导航栏-->
    <div class="panel panel-default">
      <div class="panel-body">
        <span class="tip"><strong>分类：</strong></span>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-default active" @click="getPageByState(constant.message.state.CHECK)">
            <input type="radio" name="options" autocomplete="off"> 审核中
          </label>
          <label class="btn btn-default" @click="getPageByState(constant.message.state.CHECK_FAILURE)">
            <input type="radio" name="options" autocomplete="off"> 审核失败
          </label>
          <label class="btn btn-default" @click="getPageByState(constant.message.state.NORMAL)">
            <input type="radio" name="options" autocomplete="off"> 待处理
          </label>
          <label class="btn btn-default" @click="getPageByState(constant.message.state.OVER)">
            <input type="radio" name="options" autocomplete="off"> 已解决
          </label>
        </div>
        <router-link to="/deploy" class="btn btn-info btn-deploy-right">发布</router-link>
        <router-link to="/deploy" class="btn btn-info btn-block btn-deploy-block">发布</router-link>
      </div>
    </div>

    <div v-if="data === null || data.records === undefined">
      <div class="panel panel-default">
        <p>这里没有数据</p>
      </div>
    </div>

    <div v-else>
      <!--      内容-->
      <div class="panel panel-default">
        <table class="table">
          <caption>列表</caption>
          <thead>
          <tr>
            <th>标题</th>
            <th>发布时间</th>
            <th v-if="(state === constant.message.state.NORMAL)">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in data.records" :key="index"
              @click="detail(item.id)">
            <td class="title">
              <span v-if="item.top" class="top">[置顶]</span>
              <span v-if="item.top" class="glyphicon glyphicon-arrow-up"></span>
              {{COMMON.messageTitleResize(item.title)}}
            </td>
            <td>{{COMMON.getDate(item.deployTime * 1000)}}</td>
            <td v-if="(state === constant.message.state.NORMAL)">
              <button class="btn btn-success btn-xs" @click.stop="overMyMessage(item.id)">解决</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--      分页-->
      <myNavpager :data="data" :getPage="getPage"></myNavpager>

    </div>
  </div>
</template>

<script>
    import myNavpager from '../../components/myNavpager'
    export default {
        name: "myDeploy",
        components:{myNavpager},
        activated(){
            this.freshData(1);
        },
        data(){
            return{
                data:{},
                state: this.constant.message.state.CHECK,
            }
        },
        methods:{
            freshData: function(pageIndex) {
                this.api.message.getPageMy(this.state, pageIndex, 10).then(rs=>{
                    // console.log(rs);
                    this.data = rs.data;
                }).catch(err => {
                    // alert("加载失败");
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
            getPageByState: function(state){
                if(state === this.state){
                    return;
                }

                this.state = state;
                this.data = {};
                this.getPage(1);
            },
            detail:function (id) {
                this.$router.push({path: '/detail', query:{ id: id}});
            },
            overMyMessage: function(messageId) {
                this.api.user.overMyMessage({
                    userId: this.$store.getters.user.id,
                    messageId: messageId
                }).then(() => {
                    // alert("操作成功");
                    this.freshData(1);
                }).catch(err => {
                    this.COMMON.logError(err);
                })
            }
        }
    }
</script>

<style scoped>
  tbody tr:hover{
    cursor: pointer;
    background-color: #eeeeee;
  }
  .table>thead>tr>th,.table>tbody>tr>td{
    padding-left: 15px;
    padding-right: 15px;
  }
  td>a{
    color: black;
  }
  caption{
    padding-bottom: 0;
  }
  .tip{
    display: none;
  }
  .top{
    color: red;
    display: none;
  }
  .glyphicon{
    color: red;
  }
  .btn-deploy-block{
    margin-top: 2%;
    display: block;
  }
  .btn-deploy-right{
    float: right;
    display: none;
  }
  .panel-body{
    width: 100%;
    text-align: center;
  }
  @media (min-width: 400px) {
    .btn-deploy-block{
      display: none;
    }
    .btn-deploy-right{
      display: block;
    }
    .panel-body{
      text-align: unset;
    }
  }
  @media (min-width: 767px) {
    .tip{
      display: inline-block;
    }
    .title{
      width: 60%;
    }
    .top{
      display: inline-block;
    }
    .glyphicon{
      display: none;
    }
  }
  @media (min-width: 1170px) {

  }
</style>
