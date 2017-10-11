<template>
	<div>
		<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
		</div>
		<div style="height: 150px;margin-top: 50px;text-align:center">
			<h3 style="padding-top: 50px;">等待企业管理人审核</h3>
			<h4 v-if='wait'>企业管理员尚未通过您的申请</h4>
		</div>

		
		<div style="margin-top: 10px;width: 100%;text-align:center" @click="home()">
			<button style="width: 90%;background-color:#E15151 ;color: white;">刷新</button>
		</div>
		<div style="margin-top: 10px;width: 100%;text-align:center" @click="back()">
			<button style="width: 90%;background-color:#E15151 ;color: white;">撤销申请</button>
		</div>
        <div style="margin-top: 10px;width: 100%;text-align:center" @click="my()">
            <button style="width: 90%;background-color:#E15151 ;color: white;">立即体验</button>
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
            	token:'',
            	wait:false
            }
		},
		methods:{
			home:function(){
				
				var _this = this
           		var params = new URLSearchParams();
           		params.append('token', sessionStorage.getItem('token'));
        
           		axios.post(API.refreshEmpState, params)

              
            .then(function (response) {
              
                console.log(response.data);
    				
                
                if (response.data.code!=0) {

                		alert('网络错误')

                	}

                else{
                	if (response.data.msg==1) {
                		
                		_this.$router.push('cust')
                		_this.token=sessionStorage.getItem('token');
                		localStorage.setItem('token', _this.token);
                	}
                	else{
                		_this.wait=true

                	}
                	
                }
                	
                })
                
            .catch(function (error) {
                  console.log(error);
                })




			},
            my:function(){
                this.$router.push('getSession')
            },
			back:function(){
						
				var _this = this
           		var params = new URLSearchParams();
           		params.append('token', sessionStorage.getItem('token'));
        		params.append('code', "0");
                params.append('empid', "0");
           		axios.post(API.updateEmpState, params)

              
            .then(function (response) {
              
                //console.log(response.data);
    				
                
                if (response.data.code!=0) {

                		alert('请刷新页面重试')

                	}

                else{
                	
                		sessionStorage.removeItem('token');
                		_this.$router.push('home')
                	
                	
                }
                	
                })
                
            .catch(function (error) {
                  console.log(error);
                })

			}
		}
	})
</script>
<link  href="../../assets/common/styles/mui.min.css">
<link  href="../../assets/common/styles/mui.min.css">
<link  href="../../assets/common/styles/feedback.css" />
<style scoped>
		
</style>

