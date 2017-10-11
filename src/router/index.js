import Vue from 'vue'
import VueRouter from 'vue-router'
import controllers from '@/components/controllers'
import getSession from '@/components/getSession'



import cust  from '@/components/cust/cust'
import my  from '@/components/my/my'
import orderHome from '@/components/order/orderHome'
import newActivityList from '@/components/act/newActivityList'



//order

import  addOrder from '@/components/order/addOrder'
import  operateDetail from '@/components/order/operateDetail'
import  workDetail from '@/components/order/workDetail'
import  addWorkDetail from '@/components/order/addWorkDetail'
import  workOrder from '@/components/order/workOrder'

import alterOrder from '@/components/order/alterOrder'



import myJobList from '@/components/order/myJobList'
import myJobDetail from '@/components/order/myJobDetail'
import myJobClassify from '@/components/order/myJobClassify'

import myAddJob from '@/components/order/myAddJob'
import jobList from '@/components/order/jobList'
import jobDetail from '@/components/order/jobDetail'
import classifyJob from '@/components/order/classifyJob'
import apply from '@/components/order/apply'
import addJob from '@/components/order/addJob'








//cust

import home from '@/components/cust/home'  //刚进入的界面
import loginByYzm from '@/components/cust/loginByYzm'
import loginByPwd from '@/components/cust/loginByPwd'
import addEp from '@/components/cust/addEp'
import addEp2 from '@/components/cust/addEp2'
import joinEnterprice from '@/components/cust/joinEnterprice'
import joinEnterprice2 from '@/components/cust/joinEnterprice2'
import enterpriceDetail from '@/components/cust/enterpriceDetail'
import joinEnterprice3 from '@/components/cust/joinEnterprice3'
import addCustom from '@/components/cust/addCustom'
import detailcust from '@/components/cust/detailcust'
import updatecust from '@/components/cust/updatecust'
import work from '@/components/cust/work'


//act

import lastActDetail from '@/components/act/lastActDetail'
import newAddAct from '@/components/act/newAddAct'

//my
import firstMy from '@/components/my/firstMy'
import employeeList from '@/components/my/employeeList'
import noticeList from '@/components/my/noticeList'
import invite from '@/components/my/invite'
import xqrecruit from '@/components/my/xqrecruit'
import zsrecruit from '@/components/my/zsrecruit'
import addrecruit from '@/components/my/addrecruit'
import chongzhi from '@/components/my/chongzhi'
import detail from '@/components/my/detail'
import record from '@/components/my/record'
import employeePayList from '@/components/my/employeePayList'

import empInfo from '@/components/my/empInfo'
import setRole from '@/components/my/setRole'

import feedback from '@/components/my/feedback'
Vue.use(VueRouter)





const routes=[
   
  {
    path:'/controllers',
    name:'controllers',

    
    component:controllers,
    children:[ 
   {
      path: '/cust',
      meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component: cust
    },
    {
      path: '/orderHome',
      meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component: orderHome
    },
    {
      path: '/newActivityList',
      meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component: newActivityList
    },
    {
      path: '/my',
      meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component: my,
      name:'my'
    },



     ] ,


  }
 ,
     {
      path:'/addOrder/:id?',
      name:'addOrder',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:addOrder
     },
     {
      path:'/operateDetail/:id?',
      name:'operateDetail',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:operateDetail
     },
     {
      path:'/workDetail/:id?',
      name:'workDetail',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:workDetail
     },
     {
      path:'/addWorkDetail/:id?',
      name:'addWorkDetail',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:addWorkDetail
    },
    {
      path:'/',
      name:'home',
    
    
      component:home
    },
    {
    	path:'/addEp',
    	name:'addEp',
    	component:addEp
    },
    {
    	path:'/addEp2',
    	name:'addEp2',
    	component:addEp2
    },
    {
    	path:'/joinEnterprice',
    	name:'joinEnterprice',
    	component:joinEnterprice
    },
    {
    	path:'/joinEnterprice2',
    	name:'joinEnterprice2',
    	component:joinEnterprice2
    },
    {
    	path:'/enterpriceDetail',
    	name:'enterpriceDetail',
    	component:enterpriceDetail
    },
    {
      path:'/noticeList',
      name:'noticeList',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:noticeList
    },
    {
    	path:'/joinEnterprice3',
    	name:'joinEnterprice3',
    	component:joinEnterprice3
    },
    {
    	path:'/addCustom',
    	name:'addCustom',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    	component:addCustom
    },
    
    
    {
      path:'/invite',
      name:'invite',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:invite
    },
    {
      path:'/loginByYzm',
      name:'loginByYzm',
      component:loginByYzm
    },
    {
    	path:'/loginByPwd',
    	name:'loginByPwd',
    	component:loginByPwd
    },
    
    {
      path:'/employeeList',
      name:'employeeList',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:employeeList
    },
    {
      path:'/detailcust/:ids',
      name:'detailcust',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:detailcust
    },
    {
      path:'/updatecust/:ids',
      name:'updatecust',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:updatecust
    },
    {
      path:'/work/:ids',
      name:'work',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:work
    },
    {
      path:'/xqrecruit/:id',
      name:'xqrecruit',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:xqrecruit
    },
    {
      path:'/zsrecruit',
      name:'zsrecruit',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:zsrecruit
    },
    {
      path:'/addrecruit',
      name:'addrecruit',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:addrecruit
    },
    {
      path:'/chongzhi',
      name:'chongzhi',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:chongzhi
    },
    {
     path:'/detail',
     name:'detail',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
     component:detail 
    },
    {
     path:'/record',
     name:'record',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
     component:record 
    },
    {
      path:'/employeePayList',
      name:'employeePayList',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:employeePayList
    },
    {
      path:'/lastActDetail/:id',
      name:'lastActDetail',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:lastActDetail
    },
    {
      path:'/newAddAct/:entid',
      name:'newAddAct',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:newAddAct
    },
    {
      path:'/empInfo',
      name:'empInfo',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:empInfo
    },
    {
      path:'/setRole',
      name:'setRole',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:setRole
    },
    {
      path:'/workOrder/:id?',
      name:'workOrder',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:workOrder
    },
    {
      path:'/orderHome',
      name:'orderHome',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:orderHome
    },
    {
      path:'/alterOrder/:id?',
      name:'alterOrder',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:alterOrder
    },
    {
      path:'/myJobList',
      name:'myJobList',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:myJobList
    },
    {
      path:'/myJobDetail',
      name:'myJobDetail',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:myJobDetail
    },



    {
      path:'/myJobClassify',
      name:'myJobClassify',
    
    
      component:myJobClassify
    },

    {
      path:'/myAddJob',
      name:'myAddJob',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:myAddJob
    },

    {
      path:'/classifyJob',
      name:'classifyJob',
    
    
      component:classifyJob
    },
    {
      path:'/jobList',
      name:'jobList',
    
    
      component:jobList
    },
    {
      path:'/jobDetail',
      name:'jobDetail',
    
    
      component:jobDetail
    },

    {
      path:'/apply',
      name:'apply',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:apply
    },

{
      path:'/addJob',
      name:'addJob',
    
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:addJob
    },
    {
      path:'/feedback',
      name:'feedback',
       /*meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },*/
      component:feedback
    },
    {
      path:'/firstMy',
      name:'firstMy',
       meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:firstMy
    },

	{
	path:'/getSession',
	name:'getSession',
	component:getSession
	},

    
    {
      path:'/list',redirect:'/employeeList'
    },
    
    {
    	path:'/*',redirect:'/'
    }

  ]

const router=new VueRouter({
     mode:'history',
     history:true,
     routes:routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限

        if (window.sessionStorage.s != null) { 
          var b=JSON.parse(window.sessionStorage.s)
          if(b.emptype=='0000'){
             next({
                path: '/getSession',
               
            })
          }
         // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
           next({
                path: '/getSession',
               // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})


export default router;
