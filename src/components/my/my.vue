<template>
<div id='box'>
	
		
		<div id="setting" v-if='show' >
			<!--页面标题栏开始-->
			<div class=" mui-bar mui-bar-nav" >
				<button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
					
				</button>
				<h1 class="mui-center mui-title">我的</h1>
			</div>
			<!--页面标题栏结束-->
			<!--页面主内容区开始-->
			<div style="margin-top:40px;margin-bottom:50px">
				<div >
					<div >
						<ul class="mui-table-view " style="margin-top:60px;margin-bottom:10px">
							<li class="mui-table-view-cell mui-media">
								<a class="mui-navigate-right" href="#account">
									<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/heben.png">
									<div class="mui-media-body" @click='tu()'>
										{{s.empname}}
										<p class='mui-ellipsis'>手机号:{{s.empphone}}</p>
									</div>
								</a>
							</li>
						</ul>
				<!-- <div >
							<ul class="mui-table-view mui-grid-view mui-grid-9" style="background: #FFFFFF;">
					          

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" ><a  @click="b('暖通')">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >暖通</div></a></li>

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" ><a @click="b('门窗')">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >门窗</div></a></li>

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" ><a @click="b('软装')">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >软装</div></a></li> -->


<!-- 
					                    
					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-if='boss'><a  @click="employeeList()">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >员工管理</div></a></li>

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a  @click='noticeList()'>
					                    <span class="mui-icon mui-icon-chatbubble"></span>
					                    <div class="mui-media-body" >公告</div></a></li>
					        

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click='employeePayList()' v-if='boss'><a >
					            <span class="mui-icon mui-icon-location"></span>
					                    <div class="mui-media-body" >员工续费</div></a></li>


								<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click='myjoblist()' v-if='boss'><a >
								<span class="mui-icon mui-icon-location"></span>
								        <div class="mui-media-body" >我的招聘</div></a></li>

			                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"  v-if='!boss' @click='classifyJobs()' ><a >
			                    <span class="mui-icon mui-icon-location"></span>
			                            <div class="mui-media-body" >职位列表</div></a></li>



					          	
					          	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="invite()"><a >
					                    <span class="mui-icon mui-icon-search"></span>
					                    <div class="mui-media-body">邀请同事</div></a></li> -->

					    <!--     </ul> 
						</div>  --> 
						<ul class="mui-table-view mui-table-view-chevron">
							<li class="mui-table-view-cell" v-if='boss' @click="employeeList()">
								<a href="#" class="mui-navigate-right">员工管理</a>
							</li>
							<li class="mui-table-view-cell" @click='noticeList()'>
								<a  class="mui-navigate-right">公告</a>
							</li>
							<li class="mui-table-view-cell" @click='employeePayList()' v-if='boss'>
								<a  class="mui-navigate-right">员工续费</a>
							</li>
							<!-- <li class="mui-table-view-cell" @click='myjoblist()' v-if='boss'>
								<a class="mui-navigate-right">我的招聘</a>
							</li> -->
						<!-- 	<li class="mui-table-view-cell"  v-if='!boss' @click='classifyJobs()'>
							<a  class="mui-navigate-right">职位列表</a>
						</li> -->
							<li class="mui-table-view-cell" @click="invite()">
								<a  class="mui-navigate-right">邀请同事</a>
							</li>
							<li class="mui-table-view-cell" @click='fb()'>
								<a  class="mui-navigate-right">反馈</a>
							</li>
						</ul>
						
					</div>
				</div>
			</div>

			
			<!--页面主内容区结束-->
		</div>
		<!--单页面结束-->
		
		<div id="account"  v-if="!show">
			<div class="mui-navbar-inner mui-bar mui-bar-nav" >
				<button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click='tu()'>
					<span class="mui-icon mui-icon-left-nav"></span>设置
				</button>
				
			</div>

			<div class="mui-page-content">
				<div class="mui-scroll-wrapper">
					<div style="margin-top:50px">
					
					<ul class="mui-table-view " style="margin-top:60px;">
							<li class="mui-table-view-cell">
								<a  >
									<img class="mui-media-object mui-pull-left " id="head-img" src="../../assets/common/images/heben.png">
									<div >
										{{s.empname}}
										<p class='mui-ellipsis'>手机号:{{s.empphone}}</p>
									</div>
								</a>
							</li>
						</ul>
							
						
						<ul class="mui-table-view">
							<li class="mui-table-view-cell">
								<a>QQ号<span class="mui-pull-right">{{s.empqq}}</span></a>
							</li>
							<li class="mui-table-view-cell">
								<a>手机号<span class="mui-pull-right">{{s.empphone}}</span></a>
							</li>
							<li class="mui-table-view-cell">
								<a>邮箱地址<span class="mui-pull-right">{{s.empmail}}</span></a>
							</li>
							<li  @click='clear()' class="mui-table-view-cell">
								<a>退出登录</a>
							</li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>

		
		

		</div>
</template>
<script>
    import axios from 'axios'
    import {API} from '../../static/api.js'

	export default({
		name:'customList',
		data(){
			return {
				s:{},
				show:true,
				usertype:'',
				boss:'',
			}
		},
		/*初始化组件的过程*/
		created(){
			/*dom已经加载完*/
			var _this=this
			var a=sessionStorage.s
			this.s=JSON.parse(a)
			_this.usertype=_this.s.emptype
			
			var a=_this.usertype.split('');
			//console.log(a)
			if(a[0]==='1'){
				_this.boss=true
			}

			/*var _this=this

			if (sessionStorage.s != null) {
				var str = sessionStorage.s; 
			this.s = JSON.parse(str)	
			}

			else{
				_this.getEmpInfo()
			}

			
			_this.usertype=_this.s.emptype
			var a=_this.usertype.split('');
				//console.log(a)
			     		if(a[0]=='1'){
			     			_this.boss=true
			     		}*/
			
		},
		methods:{
			b:function(nn){
				var _this = this;
        		sessionStorage.setItem('bz1',nn);
              	this.$router.push('jobList');

			},
			fb:function(){
				this.$router.push('feedback')
			},
			myjoblist:function(){
				this.$router.push('myjobList')
			},
			classifyJobs:function(){
				this.$router.push('classifyJob')
			},

	 		
			orderHome:function(){
				this.$router.push('orderHome')
			},
			employeePayList:function(){
				this.$router.push('employeePayList')
			},
			tu:function(){
				this.show=! this.show
			},
			/*zsrecruit:function(){
				this.$router.push('zsrecruit')
			},*/

			newAct:function(){
				this.$router.push('newActivityList')
			},
			
			
			clear:function () {
				localStorage.removeItem('token');
				console.log("token has been token! becuse you have clicked logout button");
				console.log("token="+localStorage.getItem("token"));
				this.$router.push('login')
			},
			 invite:function() {
			 	this.$router.push('invite')
			 },
			 
         	employeeList:function(){
         		this.$router.push("employeeList")
         	},
         	noticeList:function(){
         		this.$router.push("noticeList")
         	},



	 		/*getEmpInfo:function(){
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

			     		_this.s=response.data.user
			     		sessionStorage.setItem('empent',_this.s.empent)
			     		sessionStorage.setItem('userid',_this.s.empid)
			     		var str = JSON.stringify(_this.s); 
			     		sessionStorage.s=str;
			     		_this.usertype=_this.s.emptype
			     		var a=_this.usertype.split('');
			     		if(a[0]){
			     			_this.boss=true
			     		}
			     		//console.log(_this.s.emptype)
			     	}

			     })
			 .catch(function (error) {
			       console.log(error);
			     });
		},
*/
         	
			
		}

	})
</script>
<style scoped>
	       html,
			body {
				background-color: #efeff4;
			}
			
			
		
			
</style>