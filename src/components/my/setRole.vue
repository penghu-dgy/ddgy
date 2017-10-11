

<template>
	
	<div>
		
<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click='back()'>
		<span style="font-size: 20px;">设置角色</span>
		<img src="../../assets/common/images/selected.png" style="position:absolute;right:10px;top:10px;" @click='change()'>
		</header>
		<div class="_top_block"></div>
	
		<div style="margin-top:8px;">
		
		<div class="mui-content">

			<div >
				<form class="mui-input-group">
					<div class="mui-input-row mui-checkbox" >
						<label>部门经理
						<input name="manager" value="部门经理" type="checkbox" v-model='managerT' ></label>
					</div>
					<div class="mui-input-row mui-checkbox" >
						<label>销售人员
						<input name="sell" value="销售人员" type="checkbox" v-model='sellT' ></label>
					</div>
					<div class="mui-input-row mui-checkbox">
						<label>施工人员
						<input name="worker" value="施工人员" type="checkbox" v-model='workT'></label>
					</div>
					
				</form>
			</div>
		</div>

	</div>
	</div>

</template>


<style scoped>
	
body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._line{width:100%;height:1px;background: #f2f2f2;}
</style>

<script>

	import axios from 'axios'
	import {API} from '../../static/api.js'
	/*import {sp} from '../../static/typeutil.js'*/
	export default({
		data(){
			return {
			chooseempid:'',
			managerT:false,
			sellT:false,
			workT:false,
			empType:'',
			typelist:[],
			}
		},
		watch:{
			managerT:function(){
				var _this=this
				//console.log(_this.managerT)
				if (_this.managerT) {_this.typelist[1]=1}
				else{_this.typelist[1]=0}
			},
			sellT:function(){
				var _this=this
				//console.log(_this.sellT)
				if (_this.sellT) {_this.typelist[2]=1}
				else{_this.typelist[2]=0}
			},
			workT:function(){
				var _this=this
				//console.log(_this.workT)
				if (_this.workT) {_this.typelist[3]=1}
				else{_this.typelist[3]=0}
			}
		},
		methods:{
			back:function() {
				this.$router.go(-1)
			},
			sp:function(n) {
				var a=new Array;
				a=n.split('');
				/*console.log(n)
				console.log(a)*/
				return a;
			},
			change:function(){


				var _this = this;
				_this.empType=''+_this.typelist[0]+_this.typelist[1]+_this.typelist[2]+_this.typelist[3]
				console.log(_this.empType)







				var token=localStorage.getItem('token');

				var params = new URLSearchParams();

				params.append('token', token);
				params.append('empType', _this.empType);
				params.append('chooseempid', _this.chooseempid);

				axios.post(API.updateEmployeeType, params)

				   
				 .then(function (response) {
				    	_this.$router.push('empInfo')
				       
				    
				     })
				 .catch(function (error) {
				       console.log(error);
				     });



				   },

				  

			
		},
		created(){
			var _this=this
			_this.chooseempid=sessionStorage.getItem("chooseempid")
			_this.empType=sessionStorage.getItem("empType")
			//console.log(sessionStorage.getItem("empType"))

			_this.typelist=_this.sp(_this.empType)
			_this.managerT= (_this.typelist[1]==1)
			_this.sellT= (_this.typelist[2]==1)
			_this.workT= (_this.typelist[3]==1)
		},





	})



</script>