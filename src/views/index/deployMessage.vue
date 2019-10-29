<template>
  <div class="container">
    <form class="form-horizontal">
      <myAlert ref="myAlert"></myAlert>
      <div class="form-group">
        <label class="col-sm-1 control-label" for="title">标题</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" :placeholder="'请输入标题（不大于' + constant.message.title.max + '字）'" v-model.trim="title">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label" for="content">内容</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="5" id="content" :placeholder="'详细内容（选填，不大于' + constant.message.content.max + '字）'" v-model.trim="content"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label">图片</label>
        <div class=" col-sm-10">
          <label v-if="imgLen<imgMaxLen" class="btn btn-info realBtn">
            <input type="file" id="file" name="files" @change="addImg" ref="inputFile" multiple="multiple" style="left:-9999px;position:absolute;" accept="image/png, image/jpeg, image/jpg">
            <span>点击上传（可选，最多{{imgMaxLen}}张，点击图片删除）</span>
          </label>
          <br>

          <div v-for="(value, index) in imgs" :key="index" style="width: 200px">
            <div class="box">
              <img :src="getObjectUrl(value)" class="img-thumbnail" width="200" height="200" alt="">
              <div class="box-content" @click="delImg(index)">
                <span class="title">点击删除</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="form-group">
        <div style="text-align: center;">
          <input type="button" class="btn btn-default btn-success btn-lg" @click="submit" value="确认提交">
        </div>
      </div>
      <div class="form-group">
        <div style="text-align: center;">
          <input type="button" class="btn btn-default" @click="back" value="返回">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
    import myAlert from '../../components/myAlert'
    export default {
        name: "deployMessage",
        components:{myAlert},
        data(){
            return{
                formData: new FormData(),
                imgMaxLen: 2,
                imgLen: 0,
                imgs: {},

                title: "",
                content: "",
                isError: false,
            }
        },
        watch:{
            title(val){
                if(val.length > this.constant.message.title.max){
                    this.title = val.substring(0, this.constant.message.title.max);
                }
            },
            content(val){
                if(val.length > this.constant.message.content.max){
                    this.content = val.substring(0, this.constant.message.content.max);
                }
            }
        },
        methods:{
            back: function () {
                this.$router.go(-1);
            },
            submit: function(){
                if(this.title === ""){
                    this.$refs.myAlert.openAlert("标题不得为空");
                    return;
                }
                for(let key in this.imgs){
                    this.formData.append('files',this.imgs[key],key.split('?')[0]);
                }
                this.formData.append('title',this.title);
                this.formData.append('content',this.content);

                console.log(this.formData);
                this.api.message.deploy(this.formData).then(rs => {
                    if(this.$store.getters.roleName === ''){
                        alert('提交成功，请等待管理员审核');
                    }else{
                        alert('提交成功');
                    }

                    this.$router.replace("/");
                }).catch(err => {
                    this.COMMON.logError(err);
                });

                this.formData = new FormData();
            },
            addImg: function(){
                let files = this.$refs.inputFile.files;
                if(this.imgLen + files.length > this.imgMaxLen){
                    alert("最多可上传"+ this.imgMaxLen +"张");
                    return false;
                }
                for(let i=0; i < files.length; i++){
                    this.imgLen++;
                    this.$set(this.imgs, files[i].name+'?'+new Date().getTime()+i,files[i]);
                }
            },
            delImg: function(key){
              this.$delete(this.imgs, key);
              this.imgLen --;
            },
            getObjectUrl: function(file){
                let url = null ;
                if (window.createObjectURL!==undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!==undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!==undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
        }
    }
</script>

<style scoped>
  @import "../../../static/css/boxMark.css";
  .realBtn{
    width: 100%;
  }

</style>
