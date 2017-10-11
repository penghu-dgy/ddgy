<template>
<div>
	
		<header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" style="color: #e15252;font-size: 18px;line-height: 25px;" @click='back()'></a>
			<h5 class="mui-title" style="font-size: 14px;line-height: 35px;color: #333333;">创建企业</h5>
			<h5 class="mui-title" style="font-size: 12px;line-height: 65px;color: #333333;">1/2</h5>
				</header>
		

	<div class="mui-content" style="margin-top: 5px;;">
			<div class="mui-content-padded" style="margin: 5px;">
			
				<form class="mui-input-group">
					
					<div class="mui-input-row">
						<label>手机号</label>
						<input type="text" class="inp" placeholder="请输入手机号" v-model.lazy='mobile'  style="text-align:left">
					</div>
					
					<div class="mui-input-row" >
						
							<label>验证码</label>
							<input type="text" class="inp" placeholder="请输入验证码" v-model.lazy='Yzm'  style="text-align:left">
						
						</div>
						
					
					
					
					
						
					<div class="mui-input-row">
						<label>设置密码</label>
						<input type="password" placeholder="6位以上数字和字母的组合" class="inp" v-model.lazy='password'>
					</div>
					
					</form>
						<button class='mui-btn mui-btn-primary mui-btn-outlined' style="position: absolute;line-height: 11px;height: 31px;top: 44px;right: 5px;;margin-top:54px;" @click='sendYzm()'>获取验证码</button>
					
					</div></div>
					
						<button  class="mui-btn mui-btn-primary" type='button' style="width: 90%;margin-left: 5%;margin-top: 20px;" @click='next()'>下一步</button>

						 




		
					



</div>
</template>
<script>	
 import axios from 'axios'
 import {API} from '../../static/api.js'
    export default({
    	data(){
    		return{
    			s:{},
    			deviceId:123,
    			dataId:456,
    			mobile:'',
    			Yzm:'',
    			password:''

    	}
    	},
    	
    	methods:{
    		next:function(){

 				var _this = this;

            		var params = new URLSearchParams();
            		params.append('empPhone', _this.mobile);
            		params.append('Yzm', _this.Yzm);
            		params.append('Password', _this.password);
            		//console.log( _this.mobile)
            		axios.post(API.UpdateEmpPwd, params)

               
             .then(function (response) {
                 	//_this.isShow =1;
                 	//console.log(response.data);
     				
                 	//console.log("aaa="+response.data.list[0].empname);
                 	if (response.data.code!=0) {
                 		alert('网络错误')
                 	}
                 	else{
                 		console.log(response.data)
                 		_this.$router.push("addEp2");
                 		sessionStorage.setItem('token',response.data.token)
                 	}
                 	
                 })
             .catch(function (error) {
                   console.log(error);
                 });   			




    			
    		},
    		back:function(){
    			this.$router.push('home')
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
    		



    	}
    })


</script>
<style scoped>	
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