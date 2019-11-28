<template>
  <div class="container">
    <div v-if="isShow" class="panel panel-default">
      <div class="panel-body">
        <div class="button-group" style="float: right">
          <button v-if="isMyMessage && detailData.state === constant.message.state.NORMAL" class="btn btn-success" @click="overMyMessage">解决</button>
          <button v-else-if="permission.message.updateState() && detailData.state === constant.message.state.NORMAL" class="btn btn-success" @click="updateState(constant.message.state.OVER)">解决</button>
          <button v-if="permission.message.updateState() && detailData.state === constant.message.state.CHECK" class="btn btn-success" @click="updateState(constant.message.state.NORMAL)">通过审核</button>
          <button v-if="permission.message.updateState() && detailData.state === constant.message.state.CHECK" class="btn btn-danger" @click="updateState(constant.message.state.CHECK_FAILURE)">审核不通过</button>
          <button v-if="permission.message.remove()" class="btn btn-danger" @click="removeById">删除</button>
          <button v-if="permission.message.topById() && !detailData.top" class="btn btn-warning" @click="topById(true)">置顶</button>
          <button v-if="permission.message.topById() && detailData.top" class="btn btn-warning" @click="topById(false)">取消置顶</button>
          <button class="btn btn-info" @click="back">返回</button>
        </div>
        <div class="page-header">
          <h1>{{detailData.title}}
          </h1>
          <small class="small-is-show">发布人: {{detailData.userName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布时间：{{COMMON.getDate(detailData.deployTime * 1000)}}</small>
        </div>
<!--        <div class="text-wrapper">-->
<!--          {{detailData.content}}-->
<!--        </div>-->
        <pre>{{detailData.content}}</pre>
        <div class="">
          <img v-for="(item, index) in listImg" :key="index" class="img-thumbnail"
                  :src="item">
        </div>
      </div>
      <div class="panel-footer">
        <div class="footer-part-is-show">
          <p>发布人: {{detailData.userName}}</p>
          <p>发布时间：{{COMMON.getDate(detailData.deployTime * 1000)}}</p>
          <hr>
        </div>
        <p>电话：{{getMessageWithNull(detailData.telephone)}}</p>
        <p>qq：{{getMessageWithNull(detailData.qq)}}</p>
        <p>微信：{{getMessageWithNull(detailData.wechat)}}</p>
      </div>
    </div>
    <div v-else class="panel panel-default">
      {{loadMessage}}
    </div>
  </div>
</template>

<script>
    export default {
        name: "detailMessage",
        created(){
            // console.log(this.$route.query.id);
            if(!this.$route.query.id){
                alert("参数无效");
                this.$router.replace('/404');
                return;
            }
            this.freshData();
        },
        data(){
            return{
                isShow: false,
                loadMessage: '请求中',

                detailData:[],
                content: '',
                isMyMessage: false,
                listImg:{}
            }
        },
        methods:{
            back: function () {
                this.$router.go(-1);
            },
            freshData: function(){
                this.api.message.detail(this.$route.query.id).then(rs => {
                    if(rs === null){
                        alert("该页面不存在");
                        this.$router.replace("/404");
                        return;
                    }
                    this.detailData = rs.data;
                    this.isMyMessage = this.$store.getters.user && this.$store.getters.user.id === rs.data.userId;
                    //未审核的或审核失败的，需要有权限或者发布人才能查看
                    if((this.detailData.state === this.constant.message.state.CHECK || this.detailData.state === this.constant.message.state.CHECK_FAILURE)
                        && !this.permission.message.updateState() && !this.isMyMessage){
                        alert("无权限访问");
                        this.$router.replace("/404");
                        return;
                    }
                    this.listImg = [];
                    this.isShow = true;
                    for(let i in rs.data.fileUrls){
                        //todo: 这里添加LOADING图片
                        this.listImg.push(i);
                        this.getImg(rs.data.fileUrls[i], i);
                    }
                }).catch(() => {
                    this.isShow = false;
                    this.loadMessage = '请求失败';
                    alert("请求失败");
                })
            },
            updateState: function(state) {
                this.api.message.updateState(this.$route.query.id, state).then(() => {
                    alert("操作成功");
                    this.freshData();
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
            topById: function(top){
                this.api.message.topById(this.$route.query.id, top).then(() => {
                    this.freshData();
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
            overMyMessage: function() {
                this.api.user.overMyMessage({
                    userId: this.$store.getters.user.id,
                    messageId: this.$route.query.id
                }).then(() => {
                    alert("操作成功");
                    this.freshData();
                }).catch(err => {
                    this.COMMON.logError(err);
                })
            },
            removeById: function () {
                this.api.message.removeById(this.$route.query.id).then(() => {
                    alert("删除成功");
                    this.back();
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
            getMessageWithNull: function (msg) {
                return msg === null || msg === '' ? '无' : msg;
            },
            getImg: function(url, index){

                this.api.message.getBase64File(url).then(rs => {
                    if(rs.code === 4000){
                        //todo:文件没有找到，配上NOT FOUND图片
                        return;
                    }
                    if(rs.data && rs.data.content){
                        this.$set(this.listImg, index, 'data:image/png;base64,' + rs.data.content.data);
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .panel-body, .panel-footer{
    padding-left:5%;
    padding-right:5%;
  }
  small{
    font-size: 100%;
    color: #777;
  }
  .small-is-show{
    display: none;
  }
  .footer-part-is-show{
    display: block;
  }
  pre{
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
    border: none;
    background-color: white;
  }
  @media (min-width: 768px){
    .small-is-show{
      display: inline-block;
    }
    .footer-part-is-show{
      display: none;
    }
  }
</style>
