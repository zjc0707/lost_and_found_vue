import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    user: null,
    showPop: false,
  },
  getters:{
    showPop(state){
      return state.showPop;
    },
    user(state){
      if(state.user == null){
        let str = localStorage.getItem('user');
        if(str != null){
          state.user = JSON.parse(str);
        }
      }
      return state.user;
    },
    roleName(state){
      if(state.user == null || state.user.roles == null || state.user.roles.length === 0){
        return "";
      }
      return state.user.roles[0];
    },
    userName(state){
      if(state.user == null){
        return "";
      }
      return state.user.userName;
    }
  },
  mutations:{
    setShowPop(state, show){
      state.showPop = show;
    },
    setUser(state, user){
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      window.location.reload();
    },
    updateUser(state){
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUserLogin(state, user){
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clear(state){
      // localStorage.clear();
      localStorage.removeItem('user');
      state.user = null;
    }
  }
});
