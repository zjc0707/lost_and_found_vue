import store from '../store'

function get(name) {
  let user = store.getters.user;
  // console.log("permission:get:" + user);
  if(user != null && user.permissions != null){
    for(let i in user.permissions){
      // console.log(user.permissions[i]);
      if(user.permissions[i] === name){
        // console.log("success");
        return true;
      }
    }
  }
  return false;
}

const message = {
  remove: function () {
    return get("/message/removeById");
  },
  updateState: function () {
    return get("/message/updateState");
  },
  topById: function () {
    return get("/message/topById");
  },
};

const user = {
  page: function () {
    return get("/user/page");
  },
  editRole: function () {
    return get('/userRole/editRole');
  }
};

export default {
  get,
  message,
  user
}
