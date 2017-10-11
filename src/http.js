/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import router from './router/index.js'

// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
/*axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });*/

// http response 拦截器
axios.interceptors.response.use(
    response => {
        /*switch (response.data.code) {
                case 500:
                case 100:
                    // 401 清除token信息并跳转到登录页面
                     alert('登陆失效')
                  localStorage.removeItem('token')
                    router.replace({
                        path: '/home',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }*/
           
           if (response.data.msg=='token失效，请重新登录') {
                 alert('登陆失效')
                  localStorage.removeItem('token')
                    router.replace({
                        path: '/home',
                        query: {redirect: router.currentRoute.fullPath}
                    })
           }

           else if (response.data.msg=='手机号或密码错误') {
                alert('手机号或密码错误')
                return
           }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.code) {
                case 500:
                    // 401 清除token信息并跳转到登录页面
                  localStorage.removeItem('token')
                    router.replace({
                        path: '/home',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
