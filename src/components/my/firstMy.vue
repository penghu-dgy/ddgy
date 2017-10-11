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
			<div style="margin-top:40px;margin-bottom:50px" >
				<div >
					<div >
						<ul class="mui-table-view " style="margin-top:60px;margin-bottom:10px"  @click='tu()'>
							<li class="mui-table-view-cell mui-media">
								<a class="mui-navigate-right" >
									<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/heben.png">
									<div class="mui-media-body">
										{{s.empname}}
										<p class='mui-ellipsis'>手机号:{{s.empphone}}</p>
									</div>
								</a>
							</li>
						</ul>
<!-- 				<div >
							<ul class="mui-table-view mui-grid-view mui-grid-9" style="background: #FFFFFF;">
					         
					         <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" ><a  @click="b('暖通')">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >暖通</div></a></li>

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" ><a @click="b('门窗')">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >门窗</div></a></li>

					            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" ><a @click="b('软装')">
					            		<span class="mui-icon mui-icon-home"></span>
					                    <div class="mui-media-body" >软装</div></a></li>

					        </ul> 
					</div>  --> 
					
						<ul class="mui-table-view mui-table-view-chevron">
							
							<li class="mui-table-view-cell">
								<a href="#" @click='fb()' class="mui-navigate-right">反馈</a>
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
									<div @click='up("empname")'>
										{{s.empname}}
										<p class='mui-ellipsis'>手机号:{{s.empphone}}</p>
									</div>
								</a>
							</li>
						</ul>
							
						
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" @click='up("empqq")'>
								<a>QQ号<span class="mui-pull-right">{{s.empqq}}</span></a>
							</li>
							<li class="mui-table-view-cell">
								<a>手机号<span class="mui-pull-right">{{s.empphone}}</span></a>
							</li>
							<li class="mui-table-view-cell" @click='join()' v-if='s.empent==1'>
								<a><span class="mui-pull-right">加入企业</span></a>
							</li>
							<li class="mui-table-view-cell">
								<a>邮箱地址<span class="mui-pull-right">{{s.empmail}}</span></a>
							</li>
							<li class="mui-table-view-cell" v-if='s.emppassword == ""' @click='up("emppassword")'>
								<a><span class="mui-pull-right">补全密码</span></a>
							</li>
							<li  @click='clear()' class="mui-table-view-cell">
								<a>退出登录</a>
								
							</li>
							<li  class="mui-table-view-cell" style="margin-top:20px" v-if='updates'>
							
								<div  style="display:fixed;bottom:0;z-index=99;width:100%;left:0"><input type="text" v-model.lazy='values' ><button @click='ok()'>确定</button></div>
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
				updates:false,
				keyname:'',
				values:''
			}
		},
		created(){
			var a=sessionStorage.s
			this.s=JSON.parse(a)

		},
		methods:{
			ok:function(){

				
				
				var _this = this
           		var params = new URLSearchParams();
           		params.append('token', localStorage.getItem('token'));
           		if(_this.keyname=='empname'){
           			params.append('empname',_this.values)
           		}
           		else if(_this.keyname=='emppassword'){
           			params.append('emppassword',_this.values)
           		}
           		else if(_this.keyname=='empqq'){
           			params.append('empqq',_this.values)
           		}
        		
           		axios.post(API.updateEmp, params)

              
            .then(function (response) {
              
                //console.log(response.data);
    			_this.values=''	
                
                if (response.data.code!=0) {

                		alert('网络错误')

                	}

                else{
                	if (response.data.msg==1) {
                		
                	mui.toast('成功')
                	}
                	else{
                		//_this.wait=true

                	}
                	
                }
                	
                })
                
            .catch(function (error) {
                  console.log(error);
                })





this.updates=false;
			


			},
			up:function(a){
				this.keyname=a;
				this.updates=true;

			},
			join:function(){
				this.$router.push('joinEnterprice2')
			},
			clear:function () {
				localStorage.removeItem('token');
				this.$router.push('login')
			},
			b:function(nn){
				var _this = this;
        		sessionStorage.setItem('bz1',nn);
              	this.$router.push('jobList');

			},

			fb:function(){
				this.$router.push('feedback')
			},
			
			tu:function(){
				this.show=! this.show
			},
			/*zsrecruit:function(){
				this.$router.push('zsrecruit')
			},*/

		



	 	/*	getEmpInfo:function(){
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