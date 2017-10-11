<template>
	

	<div>
	<div v-show='isShow==1'>
			<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"@click='back()'>
		<span style="font-size: 20px;">员工信息</span>
		<span style="position:absolute;right:10px;" @click='chongzhi()'>充值</span>
	</header>
	<div class="_top_block"></div>
	
	
	
	<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;line-height:25px;">

<div class="_line"></div>

<!-- <router-link :to="{name: 'empDetail', params: {item:emp}}"    > -->
		<div style="width:100%;height:140px;" @click='showDetail()'>
			<span style="display: block;position: absolute;left:10px;height:140px;line-height: 33px;">
			
			<div>
				
				姓名：{{emp.empname}}
			
			</div>
			<div>
				电话：{{emp.empphone}}
			</div>
			<div>
				当前状态：<span v-if='emp.empstate==1'>有效</span><span v-if='emp.empstate==0' style="color:red">待审核</span>
			</div>
			<div>
				到期时间：{{emp.empexpiretime}}
			</div>
			
			
			</span><span style="position:absolute;right: 10px;height:140px;line-height: 140px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
<!-- </router-link> -->

		
		<div class="_line" style="height:8px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;"  @click='showRole()'>
			<span style="display: block;position: absolute;left:10px;">

			<span v-if='emptype[0]==1'>老板</span>
			<span v-if='emptype[1]==1'>经理</span>
			<span v-if='emptype[2]==1'>销售</span>
			<span v-if='emptype[3]==1'>施工</span>


			 </span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		
		<div class="_line" style="height:8px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click='record()'>
			<span style="display: block;position: absolute;left:10px;">充值记录 </span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		
	</div>

</div>



	<div v-show='isShow==2'>



<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click='showInfo()'>
		<span style="font-size: 20px;">员工详情</span>
		
	</header>
	<div class="_top_block"></div>
	
	
	
	<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;line-height:25px;">

	<div class="_line"></div>
		<div style="width:100%;height:240px;padding-left:10px;line-height: 33px;">
			
			<div>
				姓名：{{emp.empname}}
			</div>
			<div>
				电话：{{emp.empphone}}
			</div>
			<div>
				当前状态：<span v-if='emp.empstate==0' style="color:red">申请中</span>
				<span v-if='emp.empstate==1'>在职</span>

			</div>
			<div>
				到期时间：{{emp.empexpiretime}}
			</div>
			<div v-if='emp.empbirthday'>
				生日：{{emp.empbirthday}}
			</div>
			<div>
				入职时间：{{emp.emphiretime}}
			</div>
			
		</div>
		
		
		
	</div>
	

	<footer class="_foot" v-if='usertype[0]==1 && emptype[0]!=1'>
		<div style="width:50%;float:left;">
		<img src="../../assets/common/images/wrong.png" style="margin-top:10px;" v-if='emp.empstate==0'  @click='fail'/>
		</div>

		<div style="width:50%;float:left;"  v-if='emp.empstate==0' @click='pass'>
		<img src="../../assets/common/images/success.png" style="margin-top:10px;"/>
		</div>
		
		<button v-if='emp.empstate==1  '  style="width:30%;margin:10px 8%;" @click='fail'>解雇</button>	
	</footer>
	
</div>
	
	</div>

</template>


<script>
	

	import axios from 'axios'
	import {API} from '../../static/api.js'
	import {sp} from '../../static/typeutil.js'

	export default({

		data(){
			return{
				s:'',
				usertype:[],
				emp:{},
				isShow:1,
				chooseempid:'',
				emptype:[],
			}
		},
		methods:{
			back:function(){
				this.$router.push('employeeList')
			
			},
			record:function(){
				this.$router.push('record')
			},
			chongzhi:function(){
				this.$router.push('chongzhi')
			},
			showDetail:function() {
				this.isShow=2
			},
			showInfo:function(){
				this.isShow=1
			},
			showRole:function(){
				var _this=this
				sessionStorage.setItem('empType',this.emp.emptype)
				this.$router.push('setRole')
			},


			employeeInfo:function(){
              var _this = this;

              var token=localStorage.getItem('token');

              var params = new URLSearchParams();

              params.append('token', token);
               params.append('chooseempid', _this.chooseempid);
              axios.post(API.getChooseEmpInfo, params)

              
            .then(function (response) {
                   _this.items = response.data.data;
                  _this.emp = response.data.data;
                  	//console.log(response.data.data)
                _this.emptype=sp(response.data.data.emptype)
                })
            .catch(function (error) {
                  console.log(error);
                });
              },

              pass:function(){
						var _this = this;

						

						var params = new URLSearchParams();

						params.append('token', localStorage.getItem('token'));
						params.append('code', 'success')
						params.append('empid', _this.chooseempid)
						axios.post(API.updateEmpState, params)

				   
				 .then(function (response) {
				     	if (response.data.code!=0) {
				     		alert("错误")
				     		console.log(response)
				     	}
				     	else{
				     		_this.$router.push('employeeList')
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
						params.append('empid', _this.chooseempid)
						axios.post(API.updateEmpState, params)

				   
				 .then(function (response) {
				     	if (response.data.code!=0) {
				     		//console.log(response)
				     		alert("错误")
				     	}
				     	else{
				     		_this.$router.push('employeeList')
				     	}

				     })
				 .catch(function (error) {
				       console.log(error);
				     });



			}



		},
		created(){
			var _this=this
			this.chooseempid=sessionStorage.getItem("chooseempid")
			//console.log(sessionStorage.getItem("chooseempid")+'asdasdasd')
			this.employeeInfo();
			
		
        	this.usertype=sp(sessionStorage.getItem("userType"))
        	console.log(this.emptype)
        	
        
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
