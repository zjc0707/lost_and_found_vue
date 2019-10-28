<template>
  <div class="">
    <!--      导航栏-->
    <div class="panel panel-default">
      <div class="panel-body">
        <span class="tip"><strong>分类：</strong></span>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-default active" @click="getPageByState(constant.message.state.CHECK)">
            <input type="radio" name="options" autocomplete="off"> 待审核
          </label>
          <label class="btn btn-default" @click="getPageByState(constant.message.state.CHECK_FAILURE)">
            <input type="radio" name="options" autocomplete="off"> 未通过
          </label>
          <label class="btn btn-default" @click="getPageByState(constant.message.state.NORMAL)">
            <input type="radio" name="options" autocomplete="off"> 待处理
          </label>
          <label class="btn btn-default" @click="getPageByState(constant.message.state.OVER)">
            <input type="radio" name="options" autocomplete="off"> 已解决
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
            <th>标题</th>
            <th class="deployer">发布人</th>
            <th>发布时间</th>
            <th>管理</th>
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
            <td class="deployer"><span> {{item.userName}}</span></td>
            <td>{{COMMON.getDate(item.deployTime * 1000)}}</td>
            <td>
              <button v-if="state === constant.message.state.CHECK || state === constant.message.state.CHECK_FAILURE"
                      class="btn btn-success btn-xs"
                      @click.stop="updateState(item.id, constant.message.state.NORMAL)">通过</button>
              <button v-if="state === constant.message.state.CHECK" class="btn btn-danger btn-xs btn-del"
                      @click.stop="updateState(item.id, constant.message.state.CHECK_FAILURE)">拒绝</button>
              <button v-if="permission.message.updateState() && (state === constant.message.state.NORMAL)" class="btn btn-success btn-xs" @click.stop="updateState(item.id, constant.message.state.OVER)">解决</button>
              <button v-if="permission.message.updateState() && (state === constant.message.state.OVER)" class="btn btn-success btn-xs" @click.stop="updateState(item.id, constant.message.state.NORMAL)">未解决</button>
              <button v-if="permission.message.remove()" class="btn btn-danger btn-xs btn-del" @click.stop="removeById(item.id)">删除</button>
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
        name: "checkMessage",
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
                this.api.message.getPageCheck(this.state, pageIndex, 10).then(rs=>{
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
                // console.log("id:"+id);
                this.$router.push({path: '/detail', query:{ id: id}});
            },
            updateState: function(id, state) {
                this.api.message.updateState(id, state).then(() => {
                    this.freshData(1);
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
            removeById: function (id) {
                this.api.message.removeById(id).then(() => {
                    this.freshData(1);
                }).catch(err => {
                    this.COMMON.logError(err);
                });
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
  .btn-del{
    display: none;
  }
  .deployer{
    display: none;
  }
  @media (min-width: 400px){
    .tip{
      display: inline-block;
    }
  }
  @media (min-width: 767px) {
    .title{
      width: 50%;
    }
    .top{
      display: inline-block;
    }
    .glyphicon{
      display: none;
    }
    .btn-del{
      display: inline-block;
    }

  }
  @media (min-width: 1170px) {
    .deployer{
      display: table-cell;
    }
  }
</style>
