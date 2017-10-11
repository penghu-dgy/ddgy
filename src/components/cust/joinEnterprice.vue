<template>
	<div>
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click='back'>
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
			<h1 class="mui-center mui-title">验证手机号</h1>
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
					
						<button  class="mui-btn mui-btn-primary"  style="width: 90%;margin-left: 5%;margin-top: 20px;" @click='next()'>下一步</button>
	
					

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
				this.$router.go(-1)
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
           		axios.post(API.sendYzm, params)

              
            .then(function (response) {
                	//_this.isShow =1;
                	console.log(response.data);
    				
                	//console.log("aaa="+response.data.list[0].empname);
                	if (response.data.code!=0) {
                		alert('请输入正确手机号')
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
				     	//_this.isShow =1;
			console.log(response.data);
				
			//console.log("aaa="+response.data.list[0].empname);
			if (response.data.code===0) {

				sessionStorage.setItem('mobile', _this.mobile)
				localStorage.setItem('token',response.data.token)
				sessionStorage.setItem('token', response.data.token)

				if (response.data.user.empstate==0) {
					_this.$router.push("joinEnterprice2");
				}
				else{
					_this.$router.push("cust");
				}



				   
				  }


			else {

				  alert('请输入正确手机号')

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
