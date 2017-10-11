<template>
	<div style="width:100%">
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click='back()'>
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
			<h1 class="mui-center mui-title">登录</h1>
		</div>
		<div class="mui-content" style="margin-top: 5px;width:100%">
			<div class="mui-content-padded" style="margin: 5px;">
			
				<form class="mui-input-group">
					
					<div class="mui-input-row">
						<label>手机号</label>
						<input class="inp"  type="text" placeholder="请输入手机号" v-model.lazy='mobile' style="text-align:left">
					</div>
					
					<div class="mui-input-row" >
						
							<label>密码</label>
							<input class="inp" type="password" placeholder="请输入密码" v-model.lazy='password'style="text-align:left">
						
						</div>
						
					
					
					</form>

					
						
					
					
					</div></div>
					
						<button  class="mui-btn mui-btn-primary"  style="width: 90%;margin-left: 5%;margin-top: 20px;" @click='login()'>登录</button>

						<div style="padding: 0;margin: 0;text-align: center;width: 100%;">
          <p style="height: 23px;line-height: 23px;text-align: center;font-size: 18px;color: #FF5050;margin: 0;" @click='loginByYzm()'>
          使用验证码登录
          </p>
        </div>
	
					

	</div>
</template>
<script >

	import axios from 'axios'
	import {API} from '../../static/api.js'




	export default({
		data(){
			return {
				 s:{},
                mobile:'',
                password:'',
                to:{}
			}
		},
		methods:{

			back:function(){
				this.$router.push('home')
			},

			loginByYzm:function(){
            	this.$router.push('loginByYzm')
          	},

          	getEmpInfo:function(){  //获取客户登陆信息，放到sessionStorage的s变量中，后期通过s获取用户信息
					var _this = this;
					var toke=localStorage.getItem('token');

					var params = new URLSearchParams();
					params.append('token', localStorage.getItem('token'));
					
					axios.post(API.getEmpInfo, params).then(function (response) {
				     	if (response.data.code!=0) {
				     		alert("错误")
				     	}else{
				     		var s=response.data.user
				     		sessionStorage.setItem('empent',s.empent)
				     		sessionStorage.setItem('userid',s.empid)
				     		var str = JSON.stringify(s); 
				     		sessionStorage.s=str;
				     		if (response.data.user.emptype=='0000') {
				     			_this.$router.push('firstMy')
				     		}else{
				     			_this.$router.push('orderHome')
				     		}
				     		
				     	}

			     	})
			 		.catch(function (error) {
			       		console.log(error);
			     	});
			},
            
           	login:function(){
            	console.log("begin loginByPwd ...");
            	var _this=this;

                if(!(/^1[34578]\d{9}$/.test(_this.mobile))){ 
                    mui.toast("手机号码有误，请重填");  
                    return false; 
                } 
              	var params = new URLSearchParams();
              	params.append('mobile', _this.mobile);
              	params.append('password',_this.password);

              	axios.post(API.login,params).then(function(res){
              	//将获取到的数据给vue对象
	              	_this.to=res.data;
	            	if (_this.to.code===0) {

		             	console.log("login success put token in localStorage token="+_this.to.token);
		             	if (res.data.user.empstate ==1) {
		             		localStorage.setItem('token',_this.to.token)
		             		//_this.$router.push('my')
		             		_this.getEmpInfo();
		             		
		             	}else{
		             		if (res.data.user.empent !=1) {
			             		sessionStorage.setItem('token',_this.to.token)
			             		localStorage.setItem('token',_this.to.token)
			             		_this.$router.push('joinEnterprice3')
		             		}else{
			             		sessionStorage.setItem('token',_this.to.token)
			             		localStorage.setItem('token',_this.to.token)
			             		_this.$router.push('joinEnterprice2')
		             		}
		             		
		             	}             
	             	}

            	})

             }


		}
	})
</script>
<style scoped>
		html,
			body {
				background-color: #efeff4;
			}
			
			

			.inp::-ms-input-placeholder {
			text-align: left;
			}
			.inp::-webkit-input-placeholder {
			text-align: left;
			}
			.inp:-moz-placeholder {
			text-align: left;
			}
			.inp::-moz-placeholder {
			text-align: left;
			}
			.inp:input-placeholder {
			text-align: left
			}


			

			
</style>
