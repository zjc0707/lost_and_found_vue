<template>
  <div class="">
    <div v-if="data === null || data.records === undefined">
      <div class="panel panel-default">
        <p>这里没有数据</p>
      </div>
    </div>
    <div v-else>
      <!--      内容-->
      <div class="panel panel-default lg">
        <table class="table">
          <caption>列表</caption>
          <thead>
          <tr>
            <th class="col-sm-8">标题</th>
            <th>发布人</th>
            <th>发布时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in data.records" :key="index">
            <td>
              <span v-if="item.top" class="top">[置顶]</span>
              <span class="state">[{{stateToString(item.state)}}]</span>
              {{item.title}}
            </td>
            <td>
              <span v-if="item.role !== null" class="manage-name"><strong> {{item.userName}}</strong></span>
              <span v-else > {{item.userName}}</span>
            </td>
            <td>{{COMMON.getDate(item.deployTime * 1000)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="panel panel-default sm">
        <table class="table">
          <tbody>
          <tr v-for="(item, index) in data.records" :key="index">
            <td>
              <div class="title">
                <span v-if="item.top" class="top">[置顶]</span>
                <span class="state">[{{stateToString(item.state)}}]</span>
                {{item.title}}
              </div>
              <div class="time">
                <span class="glyphicon glyphicon-time"></span>
                {{COMMON.getDate(item.deployTime * 1000)}}
              </div>
              <div class="author">
                <span class="glyphicon glyphicon-user"></span>
                <span v-if="item.role !== null" class="manage-name"> {{item.userName}}</span>
                <span v-else > {{item.userName}}</span>
              </div>
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
        name: "removeMessage",
        components:{myNavpager},
        activated(){
            this.freshData(1);
        },
        data(){
            return{
                data:{},
            }
        },
        methods:{
            freshData: function(pageIndex) {
                this.api.message.getPageRemove(pageIndex, 10).then(rs=>{
                    console.log(rs);
                    this.data = rs.data;
                    window.scrollTo(0,0);
                }).catch(err => {
                    alert("加载失败");
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
            stateToString: function (state) {
                switch (state) {
                    case this.constant.message.state.CHECK_FAILURE: return '未通过';
                    case this.constant.message.state.CHECK: return '待审核';
                    case this.constant.message.state.NORMAL: return '待处理';
                    case this.constant.message.state.OVER: return '已解决';
                }
            }
        }
    }
</script>

<style scoped>
  .state{
    color: brown;
  }
  @media (min-width: 767px) {
    .title{
      width: 50%;
    }
  }
</style>
