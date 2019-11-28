import axios from 'axios'
import '../config/axiosConfig'

function get(url){
  return new Promise((resolve, reject) => {
    // console.log("get:" + url);
    axios.get(url).then(rs => {
      resolve(rs.data);
    }).catch(err => {
      reject(err);
    });
  })
}

function post(url, data){
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(rs => {
      resolve(rs.data);
    }).catch(err => {
      reject(err);
    });
  })
}

function formPost(url, formData){
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      headers:{'Content-Type': 'multipart/form-data'}
    }).then(rs => {
      resolve(rs.data);
    }).catch(err => {
      reject(err.data);
    });
  })
}

const message = {
  deploy(formData) {
    return formPost('/message/deploy', formData);
  },
  getPage(state, pageIndex, pageSize) {
    return post('/message/page', {
      state: state,
      pageIndex: pageIndex,
      pageSize: pageSize
    });
  },
  getPageMy(state, pageIndex, pageSize){
    return post('/message/pageMy', {
      state: state,
      pageIndex: pageIndex,
      pageSize: pageSize
    });
  },
  getPageCheck(state, pageIndex, pageSize){
    return post('/message/pageCheck', {
      state: state,
      pageIndex: pageIndex,
      pageSize: pageSize
    });
  },
  getPageRemove(pageIndex, pageSize){
    return post('/message/pageRemove', {
      pageIndex: pageIndex,
      pageSize: pageSize
    });
  },
  detail(id){
    return post('/message/detail',{
      id: id,
    });
  },
  updateState(id, state){
    return post('/message/updateState',{
      id: id,
      state: state
    });
  },
  topById(id, top){
    return post('/message/topById',{
      id: id,
      top: top
    });
  },
  removeById(id){
    return post('/message/removeById',{
      id: id,
    });
  },
  getBase64File(url){
    return get("/fileServer/getBase64File/"+ url);
  },

};

const user = {
  getCurrentUser(){
    return get("/register/getCurrentUser");
  },
  logout(){
    return get("/register/logout");
  },
  login(data){
    return post("/register/login", data);
  },
  register(data){
    return post('/register/register', data);
  },
  editPassword(data){
    return post('/user/editPassword', data);
  },
  editContact(data){
    return post('/user/editContact', data);
  },
  overMyMessage(data){
    return post('/user/overMyMessage', data);
  },
  getPage(roleId, pageIndex, pageSize){
    return post('/user/page',{
      roleId: roleId,
      pageIndex: pageIndex,
      pageSize: pageSize
    })
  },
  editRole(userId, roleId){
    return post('/userRole/editRole',{
      roleId: roleId,
      userId: userId,
    })
  }
};

export default {
  message,
  user
};
