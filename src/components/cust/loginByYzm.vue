<template>
	<div>
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click='back()'>
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
			<h1 class="mui-center mui-title">验证码登录</h1>
		</div>
		<div class="mui-content" style="margin-top: 5px;;">
			<div class="mui-content-padded" style="margin: 5px;">
			
				<form class="mui-input-group">
					
					<div class="mui-input-row">
						<label>手机号</label>
						<input class="inp"  type="text" placeholder="请输入手机号" v-model.lazy='mobile' style="text-align:left">
					</div>
					
					<div class="mui-input-row" >
						
							<label>验证码</label>
							<input class="inp" type="text" placeholder="请输入验证码" v-model.lazy='yzm'style="text-align:left">
						
						</div>
						
					
					
					</form>

					
						<button  class="mui-btn mui-btn-primary mui-btn-outlined" style="position: absolute;line-height: 1px;height: 31px;top: 95px;right: 5px;"@click='sendYzm'>获取验证码</button>
					
					
					</div></div>
					
						<button  class="mui-btn mui-btn-primary"  style="width: 90%;margin-left: 5%;margin-top: 20px;" @click='next()'>登录</button>
	
					

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
				yzm:''
			}
		},
		methods:{

			back:function(){
				this.$router.push('loginByPwd') 
			},

			sendYzm:function () {				
				var _this = this;

				  if(!(/^1[34578]\d{9}$/.test(_this.mobile))){ 
                    mui.toast("手机号码有误，请重填");  
                    return false; 
                } 

           		var params = new URLSearchParams();
           		params.append('empPhone', _this.mobile);
           		console.log( _this.mobile)
           		axios.post(API.LoginSendYzm, params).then(function (response) {
                	if (response.data.code!=0) {
                		 mui.toast('该账号不存在，请注册')
				}})
            	.catch(function (error) {
                  	console.log(error);
                });
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
				     			_this.$router.push('my')
				     		}
				     		
				     	}

			     	})
			 		.catch(function (error) {
			       		console.log(error);
			     	});
			},


			next:function(){
				var _this=this
			
				var params = new URLSearchParams();
				params.append('empPhone', _this.mobile);
				params.append('empYzm', _this.yzm);
				console.log( _this.mobile)
				axios.post(API.loginByYzm, params)
				.then(function (response) {
				console.log(response.data);
					if (response.data.code==0) {
						if (response.data.user.empstate == 1) {
		             		localStorage.setItem('token',response.data.token)
		             		//_this.$router.push('my')
		             		_this.getEmpInfo();

		             	}else{
		             		if (response.data.user.empent !=1) {
			             		sessionStorage.setItem('token',response.data.token)
			             		_this.$router.push('joinEnterprice3')
		             		}else{
			             		sessionStorage.setItem('token',response.data.token)
			             		_this.$router.push('joinEnterprice2')
		             		}
		             	}
					}else {
						  alert(response.data.msg)
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},


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
