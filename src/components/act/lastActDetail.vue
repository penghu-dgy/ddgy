<template>


<div>

<DIV v-if='isShow2'>
	<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="goback()" />
		<span style="font-size: 20px;">活动详情</span>
		<!--<img src="../../assets/common/images/Category.png" style="position:absolute;right:10px;top:10px;">-->
	</header>
	<div class="_top_block"></div>
	
	
	
	<div id="ls" style="margin-top:15px;width:100%;height:auto;background: white;line-height:25px;" >

			<div  style="width:90%;margin-left:8%;">申请人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: black;">何奔</span></div>
			<div  style="width:90%;margin-left:8%;">活动类型：&nbsp;&nbsp;<span style="color: black;">{{item.actType}}</span></div>
			<div  style="width:90%;margin-left:8%;">开始时间：&nbsp;&nbsp;<span style="color: black;">{{item.actBeginTime}}</span></div>
			<div  style="width:90%;margin-left:8%;">结束时间：&nbsp;&nbsp;<span style="color: black;">{{item.actEndTime}}</span></div>
			<div  style="width:90%;margin-left:8%;">活动时长：&nbsp;&nbsp;<span style="color: black;">{{item.actDays}}天</span></div>
			<div  style="width:90%;margin-left:8%;">申请事由：&nbsp;&nbsp;<span style="color: black;">{{item.actReason}}</span></div>
			
			<div class="_line" style="height:15px;"></div>
			<div  style="width:90%;margin-left:8%;height:45px;line-height: 45px;">审批人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: black;">{{actchecker}}</span></div>
		
		<div class="_line"  style="height:15px;"></div>
			<div  style="width:90%;margin-left:5%;margin-top:10px;">
				<img v-bind:src="a" v-for='a in ite' style="width:25%;" @click='fangda(a)' />
			</div>
			
		
		
	</div>

	</DIV>


	<div v-if="!isShow2">

		<header class="mui-bar mui-bar-nav"  >
			<a @click="goback()" class=" mui-icon mui-icon-left-nav mui-pull-left" style="font-size: 20px;line-height: 25px;"></a>
			<h1 class="mui-title">员工列表</h1>
		
		</header>


<div v-for="item in itemssr" style="position:relative;top:60px">
<div style="width:100%;height:60px;background-color:#ffffff"  @click="pickEmp(item.empid,item.empname)">
			<div style="width:15%;float: left;text-align: right;height:60px;">
				<img src="../../assets/common/images/Smile.png" style="margin-top:15px;"/>
			</div>
			<div style="width:50%;line-height: 30px;float:left;margin-left:10px;" >
				<div style="height:20px;margin-top:5px">{{item.empname}}</div>
				<div style="height:20px;margin-top:5px">{{item.empphone}}</div>
				
			</div>
			<div class="_line"></div>
		</div>

</div>





		
		
</div>
	







<footer class="_foot" v-if="isShow && isShow2">
	<div @click="choseN()" style="width:33%;float:left;"><img src="../../assets/common/images/wrong.png" style="margin-top:10px;"/></div>
	<div  @click="choseY()" style="width:33%;float:left;"><img src="../../assets/common/images/success.png" style="margin-top:10px;"/></div>
	<div @click="showEmployeeList()"  style="width:33%;float:left;"><img src="../../assets/common/images/skip.png" style="margin-top:10px;"/></div>
</footer>
	


<div style="width:100%;height:100%;z-index:98;position:fixed;top:0;left:0;background-color:black;opacity:0.5" v-if='fang' @click='fang=!fang'>

     

    </div>
     <img :src="fangdahou" style="z-index:99;width:80%;position:absolute;left:10%;top:5%;" v-if='fang' @click='fang=!fang'>

	</div>
</template>


<script>
	import axios from 'axios'
	import {API} from '../../static/api.js'
	export default({
		data(){
			return{
				items:[],            //接收后台传过来的data
				isShow:false,        //控制按钮的显示与隐藏
				eid:0,               //接收newAct页面传来的empId
				e:0,                 //接收newAct页面传来的actId
				address:'',
				showPhoto:false,
				token:'',
				item:[],
				actchecker:'',
				isShow2:true,
				itemssr:[],
				ite:[],
				fangdahou:'',
				fang:false,
			}
		},
		created(){
			this.$nextTick(function(){
				//接收newAct的传值
				var ids = this.$route.params.id;
				console.log(ids)
				var s = ids.split("-");
				this.e = parseInt(s[0]);
				this.eid = parseInt(s[1]);
				this.token=localStorage.getItem('token')
				//执行actDetail方法
				this.actDetail();
				this.employeeList();
			})
		},
		methods:{
			//点击放大功能
			fangda:function(a){
				this.fangdahou=a
				this.fang=true
			},

			//转义字符转换器
			escape2Html:function (str) {
			 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
			},

			//返回按钮
			goback:function(){
				//this.$router.push('newAct');
				this.$router.go(-1);
			},

			//向服务器发请求,通过actid查询唯一的一条记录
			actDetail:function(){
				var _this = this;
				axios.get(API.activityById,{
					params:{token:_this.token,actid:_this.e}
				})
				.then(function(response){
					//console.log(response)
					_this.actchecker=response.data.data.check
					_this.item = response.data.data.list[0];
					//console.log(_this.item)
					/*_this.address = response.data.data[0].list[0].actAddress;*/

					_this.ite=JSON.parse(_this.escape2Html(_this.item.actAddress))
					//_this.item.actAddress

					if(_this.actaddress != null){
						_this.showPhoto = true;
					}
					
					if(_this.item.actChecker == _this.eid && _this.item.actState == 2){
						_this.isShow = true;
					}
				})
				.catch(function(error){
					console.log(error);
				})
			},

			//拒绝按钮
			choseN:function(){
				var _this = this;
				axios.get(API.ActivityUpdate,{
					params:{token:_this.token,empid:null,
						actid:_this.e, actstate:0
					}
				})
				.then(function(response){
					// _this.$router.push('newAct');
					_this.goback();
				})
				.catch(function(error){
					console.log(error)
				})
			},

			//通过按钮
			choseY:function(){
				var _this = this;
				axios.get(API.ActivityUpdate,{
					params:{token:_this.token,empid:null,
						actid:_this.e, actstate:1
					}
				})
				.then(function(response){
					_this.goback();
				})
				.catch(function(error){
					console.log(error)
				})
			},

			//转发按钮
			choseZ:function(){
				var _this = this;
				axios.get(API.ActivityUpdate,{
					params:{token:_this.token,empid:_this.empid,
						actid:_this.e, actstate:2
					}
				})
				.then(function(response){
					//_this.$router.push('newAct');
					_this.goback();
				})
				.catch(function(error){
					console.log(error)
				})
			},


			showEmployeeList:function(){
				this.isShow2 = false;
				//this.employeeList();
			},
			employeeList:function(){
				var _this = this;
				//alert(sessionStorage.getItem('entId'))

				axios.get(API.employeeAllList,{

					
					params:{token:_this.token,entid:sessionStorage.getItem('entId')}

					
				})
				.then(function(response){
					_this.itemssr = response.data.data;
					//console.log(_this.items)
				})
				.catch(function(error){
					console.log(error);
				})
				
			},
			pickEmp:function(e,n){
				this.isShow = 1;
				this.showChecker = 2;
				// console.log(e);
				// console.log(n);
				this.empid = e;
				this.empname = n;
				this.choseZ()
			}

			
		}
	})
	
</script>


<style scoped>

			body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:2px;background: #f2f2f2;}


</style>