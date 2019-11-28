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
import notFound from '../views/page404'
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
            keepAlive: true,
            needLogin: true,
          }
        },
        {
          path: 'peopleCenter',
          component: peopleCenter,
          meta:{
            keepAlive: true,
            needLogin: true,
          }
        },
        {
          path: 'editPassword',
          component: editPassword,
          meta:{
            keepAlive: true,
            needLogin: true,
          }
        },
        {
          path: 'myDeploy',
          component: myDeploy,
          meta:{
            keepAlive: true,
            needLogin: true,
          }
        },
        {
          path: 'editContact',
          component: editContact,
          meta:{
            keepAlive: true,
            needLogin: true,
          }
        },
        {
          path: 'checkMessage',
          component: checkMessage,
          meta:{
            permission: '/message/updateState',
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: 'removeMessage',
          component: removeMessage,
          meta:{
            permission: '/message/removeById',
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: 'checkUsers',
          component: checkUsers,
          meta:{
            permission: '/user/page',
            needLogin: true,
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
    },
    {
      path: '/404',
      component: notFound
    }
  ]
})
