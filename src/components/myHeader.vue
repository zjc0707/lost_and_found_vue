<template>
  <div>
    <!--导航-->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" ref="collapseButton"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false" @click="myCollapseButtonClick">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand" >首页</router-link>
        </div>

        <div class="collapse navbar-collapse" @click="closeMenuAndShadow" id="bs-example-navbar-collapse-1" ref="nav">
          <slot></slot>
          <ul class="nav navbar-nav">
            <li><a href="#" data-toggle="modal" data-target="#about-modal">关于</a></li>
          </ul>
          <ul v-if="!isLogin" class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/login">登录</router-link>
            </li>
            <li>
              <router-link to="/register">注册</router-link>
            </li>
          </ul>
          <ul v-else class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/manage">{{userName}}</router-link>
            </li>
            <li>
              <a href="#" @click="logout">注销</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="isShadowShow" class="shadow" @click="closeMenuAndShadow"></div>
    <!-- 关于 -->
    <div class="modal fade" id="about-modal" tabindex="-1" role="dialog" aria-labelledby="modal-label"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span
              aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
            <h4 class="modal-title" id="modal-label">关于</h4>
          </div>
          <div class="modal-body">
            <p>前端太难了</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myHeader",
        activated(){
            if(this.$refs.nav.classList.contains('in')){
                this.$refs.nav.classList.remove('in');
            }
            this.isShadowShow = false;
            this.freshData();
            if(!this.$store.getters.user){
                this.getCurrentUser();
            }
        },
        data(){
            return{
                isLogin: false,
                userName: '',
                isShadowShow: false,
            }
        },
        methods:{
            getCurrentUser: function () {
                this.api.user.getCurrentUser().then(rs => {
                    // console.log("getCurrentUser");
                    // console.log(rs);
                    if(rs.code === 7000){
                        this.$store.commit('setUser', rs.data);
                        this.freshData();
                    }else{
                        this.$store.commit('clear');
                    }
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
            logout: function () {
                this.api.user.logout().then(() => {
                    this.$store.commit('clear');
                    this.freshData();
                    alert("注销成功");
                    // this.$router.go(0);
                    window.location.reload();
                }).catch(err => {
                    this.COMMON.logError(err);
                });
            },
            freshData: function(){
                this.isLogin = this.$store.getters.user != null;
                if(this.$store.getters.roleName === ''){
                    this.userName = this.$store.getters.userName;
                }else{
                    this.userName = this.$store.getters.roleName + '[' + this.$store.getters.userName + ']';
                }
            },
            myCollapseButtonClick: function () {
                this.isShadowShow = !this.isShadowShow;
            },
            closeMenuAndShadow: function () {
                if(this.$refs.nav.classList.contains('in')){
                    // console.log("cl");
                    this.$refs.collapseButton.click();
                }
                this.isShadowShow = false;
            }
        }
    }
</script>

<style scoped>
  .shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
  }
</style>
