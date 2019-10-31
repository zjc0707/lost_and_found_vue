import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from "../router";

axios.defaults.baseURL = "http://47.102.133.53:8567/LAF";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  if(data instanceof FormData){
    return data;
  }else{
    return qs.stringify(data);
  }
}];
axios.interceptors.response.use(
  response =>{
    if(response.status === 200){
      switch (response.data.code) {
        case 2201 : {
          if(!store.getters.user){
            alert("请先登录");
            router.replace({
              path:'/login',
              query:{
                redirect: router.currentRoute.fullPath
              }
            });
            // router.push('/login');
          }else{
            alert("登录已过期");
            store.commit('clear');
            router.replace('/');
            window.location.reload();
          }
          return Promise.reject(response);
        }
        case 1111 : {
          alert("请求失败");
          return Promise.reject(response);
        }
        case 1112 : {
          alert("无效请求参数");
          return Promise.reject(response);
        }
        case 1113 : {
          alert("账号非法请求，已注销");
          store.commit('clear');
          router.replace('/');
          window.location.reload();
          return Promise.reject(response);
        }
        case 1114 : {
          alert("操作超时,请刷新重试");
          return Promise.reject(response);
        }
      }
      return Promise.resolve(response);
    }else{
      return Promise.reject(response);
    }
  },
  error => {
    console.log(error);
    return Promise.reject(error.response);
  }
);
