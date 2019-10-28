import router from '../router'
import store from '../store'
import permission from "../common/permission";

router.beforeEach((to, from, next) => {
  let isLogin = store.getters.user !== null;
  let needLogin = to.meta.needLogin;
  if(needLogin !== undefined){
    // console.log("islogin:"+isLogin+"_needLogin:"+ needLogin);
    if(needLogin === true && !isLogin){
      alert("请先登录");
      next({
        path:'/login'
      });
      return;
    }
    //不能登录状态访问的页面，例如登录注册页面
    if(needLogin === false && isLogin){
      alert("已登录，请先注销");
      next({
        path:'/'
      });
      return;
    }
  }

  let permissionStr = to.meta.permission;
  if(permissionStr !== undefined){
    if(!permission.get(permissionStr)){
      alert("权限不足");
      next({
        path:'/'
      });
      return;
    }
  }

  next();
});
