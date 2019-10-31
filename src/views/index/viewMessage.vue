<template>
    <div class="container">
<!--      导航栏-->
      <div class="panel panel-default">
        <div class="panel-body">
          <span><strong>分类：</strong></span>
          <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-default active" @click="getPageByState(constant.message.state.NORMAL)">
              <input type="radio" name="options" autocomplete="off"> 待处理
            </label>
            <label class="btn btn-default" @click="getPageByState(constant.message.state.OVER)">
              <input type="radio" name="options" autocomplete="off"> 已解决
            </label>
          </div>
          <router-link to="/deploy" class="btn btn-info" style="float: right">发布</router-link>
        </div>
      </div>

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
                <th class="col-sm-6">标题</th>
                <th>发布人</th>
                <th>发布时间</th>
                <th class="manage" v-if="isShowManage">管理</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data.records" :key="index"
                  @click="detail(item.id)">
                <td>
                  <span v-if="item.top" class="top">[置顶]</span> {{COMMON.messageTitleResize(item.title)}}
                </td>
                <td>
                  <span v-if="item.role !== null" class="manage-name"><strong> {{item.userName}}</strong></span>
                  <span v-else > {{item.userName}}</span>
                </td>
                <td>{{COMMON.getDate(item.deployTime * 1000)}}</td>
                <td v-if="isShowManage">
                  <button v-if="isShowTop && item.top" class="btn btn-danger btn-xs" @click.stop="topById(item.id, false)">取消置顶</button>
                  <button v-if="isShowTop && !item.top" class="btn btn-danger btn-xs" @click.stop="topById(item.id, true)">置顶</button>
                  <button v-if="isShowSolve && (state === constant.message.state.NORMAL)" class="btn btn-success btn-xs" @click.stop="updateState(item.id, constant.message.state.OVER)">解决</button>
                  <button v-if="isShowSolve && (state === constant.message.state.OVER)" class="btn btn-success btn-xs" @click.stop="updateState(item.id, constant.message.state.NORMAL)">未解决</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="panel panel-default sm">
          <table class="table">
            <tbody>
              <tr v-for="(item, index) in data.records" :key="index"
                  @click="detail(item.id)">
                <td>
                  <div class="title">
                    <span v-if="item.top" class="top">[置顶]</span> {{COMMON.messageTitleResize(item.title)}}
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
        name: "viewMessage",
        components:{myNavpager},
        activated(){
            this.freshData(this.data.current? this.data.current : 1);
            this.isShowTop = this.permission.message.topById();
            this.isShowSolve = this.permission.message.updateState();
            this.isShowManage = this.isShowSolve || this.isShowTop;
            // console.log("activated");
        },
        data(){
            return{
                data:{},
                state: this.constant.message.state.NORMAL,
                isShowSolve: false,
                isShowTop: false,
                isShowManage: false
            }
        },
        methods:{
            freshData: function(pageIndex) {
                this.api.message.getPage(this.state, pageIndex, 10).then(rs=>{
                    // console.log(rs);
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
            topById: function(id, top){
                this.api.message.topById(id, top).then(() => {
                    this.freshData(1);
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            }
        }
    }
</script>

<style scoped>

</style>
