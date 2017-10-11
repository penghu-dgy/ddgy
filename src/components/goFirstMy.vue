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

			if (a != '') {
				_this.getEmpInfo()
			}
			else{
				_this.$router.push('loginByPwd')
			}
			

		},
		methods:{
			getEmpInfo:function(){
					var _this = this;

					var toke=localStorage.getItem('token');

					var params = new URLSearchParams();

					params.append('token', localStorage.getItem('token'));
					
					axios.post(API.getEmpInfo, params)

			   
			 .then(function (response) {
			 	//console.log('asdasdasd'+response.data.code)
			     	if (response.data.code!=0) {
			     		alert("错误")
			     	}
			     	else{

			     		var s=response.data.user
			     		sessionStorage.setItem('empent',s.empent)
			     		sessionStorage.setItem('userid',s.empid)
			     		var str = JSON.stringify(s); 
			     		sessionStorage.s=str;
			     		_this.$router.push('my')
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