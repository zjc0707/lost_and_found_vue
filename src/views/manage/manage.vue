<template>
  <div>
    <myHeader>
      <ul class="nav navbar-nav nav-add">
        <li v-for="(item, index) in menuList" :key="index" v-if="item.isShow"
            :class="item.active ? 'active' : ''" @click = 'menuClick(index)'>
          <router-link :to="item.to">{{item.text}}</router-link>
        </li>
      </ul>
      <hr class="nav-add">
    </myHeader>

    <div class="container">
      <div class="panel panel-default menu">
        <ul class="nav nav-pills nav-stacked">
          <li v-for="(item, index) in menuList" :key="index" v-if="item.isShow"
              :class="item.active ? 'active' : ''" @click = 'menuClick(index)'>
            <router-link :to="item.to">{{item.text}}</router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
    import myHeader from "../../components/myHeader"
    export default {
        name: "manage",
        components:{myHeader},
        activated(){
            let str = window.location.href;
            str = str.substring(str.lastIndexOf('/manage'));

            if(str === '/manage' || str === '/manage/'){
                str = '/manage/peopleCenter';
            }
            for(let i in this.menuList){
                this.menuList[i].active = (this.menuList[i].to === str);
            }
        },
        data(){
            return{
                menuList:[
                    this.menuData('个人信息', true, '/manage/peopleCenter', true),
                    this.menuData('修改密码', false, '/manage/editPassword', true),
                    this.menuData('修改信息', false, '/manage/editContact', true),
                    this.menuData('我发布的', false, '/manage/myDeploy', true),
                    this.menuData('管理消息', false, '/manage/checkMessage', this.permission.message.updateState()),
                    this.menuData('管理用户', false, '/manage/checkUsers', this.permission.user.page()),
                    this.menuData('删除历史', false, '/manage/removeMessage', this.permission.message.remove()),
                ]
            }
        },
        methods:{
            menuData: function (text, active, to, isShow) {
                return {text: text, active: active, to: to, isShow: isShow};
            },
            menuClick: function (index) {
                for(let i in this.menuList){
                    this.menuList[i].active = (i === index.toString());
                }
            }
        }
    }
</script>

<style scoped>
  .menu{
    width: 20%;
    padding: 5px;
    float: left;
    margin-right: 2%;
    display: none;
  }
  .right{

  }
  .container{
    margin-top: 60px;
  }
  /*菜单的变化是>=768*/
  @media (min-width: 767px) {
    .menu{
      display: inline-block;
    }
    .right{
      float: left;
      width: 78%;
    }
    .nav-add{
      display: none;
    }
  }
  @media (min-width: 1170px) {

  }
</style>
