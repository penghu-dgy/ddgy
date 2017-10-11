<template>
<div>
	<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">员工详情</h1>
		</header>
		<div class="mui-content">
			
			<ul class="mui-table-view" style="margin-top:20px">
				 <li class="mui-table-view-cell">员工姓名 : {{empname}}</li>
		         <li class="mui-table-view-cell">身份类型 :<span v-if='emptype==1'>老板</span><span v-if='emptype==2'>经理</span><span v-if='emptype==3'>销售</span><span v-if='emptype==4'>施工</span></li>
		         <li class="mui-table-view-cell" v-if='emphiretime !=null'>入职时间 : {{emphiretime}}</li>
		         <li class="mui-table-view-cell">手机号码 : {{empphone}}</li>
		         <li class="mui-table-view-cell" v-if='empqq'>QQ : {{empqq}}</li>
		         <li class="mui-table-view-cell" v-if='empwechat'>微信号码 : {{empwechat}}</li>
			</ul>
		</div>
		<button v-if='empstate==0 && usertype==1' style="width:30%;margin:10px 8%;" @click='pass'>通过</button>
		<button v-if='empstate==0 && usertype==1'  style="width:30%;margin:10px 8%;" @click='fail'>拒绝</button>
		<button v-if='empstate==1 && usertype==1 '  style="width:30%;margin:10px 8%;" @click='fail'>解雇</button>
	
</div>
</template>

<script>
	import axios from 'axios'
	import {API} from '../../static/api.js'

	export default({

		data(){
			return{
				s:'',
				empname:'',
				empphone:'',
				empqq:'',
				empwechat:'',
				emphiretime:'',
				emptype:'',
				empstate:'',
				empid:'',
				usertype:'',
				
			}
		},

		methods:{


			pass:function(){
						var _this = this;

						

						var params = new URLSearchParams();

						params.append('token', localStorage.getItem('token'));
						params.append('code', 'success')
						params.append('empid', _this.empid)
						axios.post(API.updateEmpState, params)

				   
				 .then(function (response) {
				     	if (response.data.code!=0) {
				     		alert("错误")
				     		console.log(response)
				     	}
				     	else{
				     		_this.router.push('employeeList')
				     	}
				     })
				 .catch(function (error) {
				       console.log(error);
				     });



			},
			fail:function(){
						var _this = this;

						var toke=localStorage.getItem('token');

						var params = new URLSearchParams();

						params.append('token', localStorage.getItem('token'));
						params.append('code', 'fail')
						params.append('empid', _this.empid)
						axios.post(API.updateEmpState, params)

				   
				 .then(function (response) {
				     	if (response.code!=0) {
				     		alert("错误")
				     	}
				     	else{
				     		_this.router.push('employeeList')
				     	}

				     })
				 .catch(function (error) {
				       console.log(error);
				     });



			}


		},

		created(){

			this.empname=this.$route.params.item.empname;
        	this.empphone=this.$route.params.item.empphone;
        	this.empqq=this.$route.params.item.empqq;
        	this.empwechat=this.$route.params.item.empwechat;
        	this.emphiretime=this.$route.params.item.emphiretime;
        	this.emptype=this.$route.params.item.emptype;
        	this.empstate=this.$route.params.item.empstate;	
        	this.empid=this.$route.params.item.empid;
        	this.usertype=sessionStorage.getItem("userType")

        	//console.log(sessionStorage.getItem("userType"))
        	//alert(this.empid)

		}




	})


</script>

<link  href="../../assets/common/styles/mui.min.css" scoped />
<link  href="../../assets/common/styles/mui.min.css" scoped />
<link  href="../../assets/common/styles/feedback.css" scoped />
<style scoped>
	

</style>