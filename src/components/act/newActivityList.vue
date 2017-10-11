<template>
	
<div>
	

<header class="_head">
		<!-- <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"> -->
		<span style="font-size: 20px;">审批列表</span>
		<img src="../../assets/common/images/add.png" style="position:absolute;right:10px;top:10px;"  @click="prepareAct(empent)">
	</header>
	<div class="_top_block"></div>
	
	<div class="_line" style="height:10px;"></div>
	<div style="width:100%;height:45px;line-height: 45px;background: white;text-align: center;" id="showUserPicker">
			<span>请选择活动类型</span>
	</div>


	
	<div id="ls" style="margin-top:10px;width:100%;height:auto;background: white;" v-on:click="goActDetail(item.actId)" v-for="item in items">		
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">{{item.actType}}</span><span style="position:absolute;right: 10px;">{{item.actBeginTime}}<img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		<div class="_line"></div>
		
		<div style="width:100%;height:65px;margin-top:15px;">			
			<div style="width:25%;height:65px;position: absolute;left:0px;width:80px;height:80px;border:0px solid #969797;margin-left:10px;">
				<img src="../../assets/common/images/rejected-order.png" />				
			</div>
			
			<div style="width:75%;height:65px;position: absolute;right: 0px;line-height: 26px;margin-bottom:50px">
				<div><span><img src="../../assets/common/images/account.png"/></span>&nbsp;&nbsp;&nbsp;{{item.empName}}</div>
				<div v-if="item.actState==2 && item.empId!=empId">&nbsp;&nbsp;&nbsp;待审批</div>	
				<span v-else="item.actState" style="color:gray"><img src="../../assets/common/images/filter.png"/>{{item.actState | state}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						
			</div>			
		</div>
	</div>
	
		

</div>

</template>



<style scoped>
	
body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{width:98%;height:2px;background: #f2f2f2;margin-left:5px;margin-right:5px;}
	

</style>


<script>
	
import axios from 'axios'
	import {API} from '../../static/api.js'
	export default({
		data(){
			return{
				items:[],                //接收后台传过来的data
				myact:'我的审批',        //搜索按钮的值
				tp:4,                    //默认的搜索条件
				empId:0,                 //接收后台传过来的empId
				isShow:0,                //控制提示是否显示
				num:0,                   //控制提示的数量
				empent:0,
				token:''
			}
		},
		filters:{
			//通过数据库的状态码显示状态
			state:function(value){
				//var _this = this;
				var ziti = document.getElementById('#f1');
				if(value==0){
					return "已拒绝";
				}else if(value==1){
					return "已通过";
				}else{
					return "待审批";
				}
			}
		},
		created(){
			this.token=localStorage.getItem('token')
			this.$nextTick(function(){
				//this.activityList();
				this.myid();
				this.initDom();
			})
		},
		methods:{

		


	 		
			//跳转到活动详情页面
			goActDetail:function(aid){
				//把传的2个值拼成一个字符串
				var ids = aid+"-"+this.empId;
				this.$router.push('lastActDetail/'+ids);
			},

			//向后台发送请求获得登录人的员工ID:empId
			myid:function(){
				var _this = this;

				axios.get(API.activityAllList,{
					params:{token:_this.token,type:1}
				})
				.then(function(response){
					_this.empId = response.data.emp.empid;
					sessionStorage.setItem('entId',response.data.emp.empent)
					_this.empent = response.data.emp.empent;
					 //console.log(_this.empent);
					
					//console.log(response.data.emp);
					_this.activityList();    //只有在这里执行才是在myid方法之后执行
				})
				.catch(function(error){
					console.log(error);
				})
				
			},

			//向后台发送请求获得不同搜索条件下,查询得到的数据
			activityList:function(){
				var _this = this;
				var i = 0;
				var empid = this.empId;
				var checker;
				var sta;
				//console.log("empid2:"+empid);
				axios.get(API.activityAllList,{
					params:{token:_this.token,type:_this.tp}
				})
				.then(function(response){
					_this.items = response.data.data;
					console.log(_this.items)
					//动态控制待审批的提示数量
					if(_this.tp == 4 || _this.tp == 3){
						for(var k=0;k<_this.items.length;k++){
							checker = _this.items[k].actChecker;
							//console.log("checker:"+checker);
							sta = _this.items[k].actState;
							if(checker == empid && sta == 2){
								i++;
							}
						}
						if(i == 0){
							_this.isShow = 0;
						} else {
							_this.isShow = 1;
						}
						_this.num = i;
					}
					
				})
				.catch(function(error){
					console.log(error);
				})
			},

			//跳转到添加活动页面
			prepareAct:function(e){
				this.$router.push('newAddAct/'+e)
			},


			initDom:function(){
					var _this = this ;
                 (function($, doc) {
				$.init();

				$.ready(function() {
					//普通示例
					
					var userPicker = new $.PopPicker();
					userPicker.setData([{
						value: 'A',
						text: '我的审批'
					}, {
						value: 'B',
						text: '我发起的'
					}, {
						value: 'C',
						text: '我收到的'
					}, {
						value: 'D',
						text: '待我审批'
					}]);
					var showUserPickerButton = doc.getElementById('showUserPicker');
					//var userResult = doc.getElementById('userResult');
					showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
							//document.getElementById("showUserPicker").innerText = items[0].text;
							//console.log(items)
							if (items[0].value=='A') {_this.all()}
							else if (items[0].value=='B') {_this.wfq()}
							else if (items[0].value=='C') {_this.wsd()}
							else if (items[0].value=='D') {_this.dws()}
						});
					}, false);
	
				});
			})(mui, document);
			},

			//点击不同搜索条件的按钮
			all:function(){
				this.myact = '我的审批';
				this.tp = 4;
				this.activityList();
			},
			wfq:function(){
				this.myact = '我发起的';
				this.tp = 1;
				this.activityList();
			},
			wsd:function(){
				this.myact = '我收到的';
				this.tp = 2;
				this.activityList();
			},
			dws:function(){
				this.myact = '待我审批';
				this.tp = 3;
				this.activityList();
			}
			
		}
	})


</script>