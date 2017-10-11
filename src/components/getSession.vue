<template>
<div >
	
		
		
		

		</div>
</template>
<script>
    import axios from 'axios'
    import {API} from '../static/api.js'

	export default({
		
		data(){
			return {
				
			}
		},
		created(){
			var _this=this
			var a=localStorage.token
			console.log("token in getSession="+a);

			if (a) {
				_this.getEmpInfo()
			}
			else{
				_this.$router.push('loginByPwd')
			}
			

		},
		methods:{
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

         	
			
		}

	})
</script>
<style scoped>
	       html,
			body {
				background-color: #efeff4;
			}
			
			
		
			
</style>