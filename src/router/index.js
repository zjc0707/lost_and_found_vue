import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import login from '../views/login'
import register from '../views/register'
import viewMessage from '../views/index/viewMessage'
import deployMessage from '../views/index/deployMessage'
import detailMessage from '../views/index/detailMessage'
import manage from '../views/manage/manage'
import editPassword from '../views/manage/editPassword'
import editContact from '../views/manage/editContact'
import myDeploy from '../views/manage/myDeploy'
import peopleCenter from '../views/manage/peopleCenter'
import checkMessage from '../views/manage/checkMessage'
import removeMessage from '../views/manage/removeMessage'
import checkUsers from '../views/manage/checkUsers'
Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path: '/',
          component: viewMessage,
          meta:{
            keepAlive: true
          }
        },
        {
          path: '/detail',
          component: detailMessage,
          meta:{
            keepAlive: false
          }
        },
        {
          path: '/deploy',
          component: deployMessage,
          meta:{
            needLogin: true,
            keepAlive: false
          }
        },
      ]
    },
    {
      path: '/manage',
      component: manage,
      meta:{
        needLogin: true,
        keepAlive: true
      },
      children:[
        {
          path: '',
          component: peopleCenter,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'peopleCenter',
          component: peopleCenter,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'editPassword',
          component: editPassword,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'myDeploy',
          component: myDeploy,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'editContact',
          component: editContact,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'checkMessage',
          component: checkMessage,
          meta:{
            permission: '/message/updateState',
            keepAlive: true
          }
        },
        {
          path: 'removeMessage',
          component: removeMessage,
          meta:{
            permission: '/message/removeById',
            keepAlive: true
          }
        },
        {
          path: 'checkUsers',
          component: checkUsers,
          meta:{
            permission: '/user/page',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: "/login",
      component: login,
      meta:{
        needLogin: false,
        keepAlive: false
      }
    },
    {
      path: '/register',
      component: register,
      meta:{
        needLogin: false,
        keepAlive: false
      }
    }
  ]
})
