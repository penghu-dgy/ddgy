<template>
	<div>
		<header class="_head">
			<img src="../../assets/common/images/as.png" style="position:absolute;left:10px;top:10px;" @click="changeJob()">
			<span style="font-size: 20px;">招聘详情</span>
			
		</header>
		<div class="_top_block"></div>
		
		
		
		<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;">
			
			
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">职位名称</span><span style="position:absolute;right: 10px;">{{items.job_title}}</span>
			</div>
			
			<div class="_line"></div>
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">需求人数</span><span style="position:absolute;right: 10px;">{{items.job_count}}</span>
			</div>
			<div class="_line"></div>
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">薪资</span><span style="position:absolute;right: 10px;">{{items.job_salary}}</span>
			</div>
			<div class="_line"></div>
			
			
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">当前区域</span><span style="position:absolute;right: 10px;">{{items.province}} {{items.city}} {{items.area}}</span>
			</div>
			
			<div class="_line"></div>
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">发布时间</span><span style="position:absolute;right: 10px;">{{items.job_pub_time}}</span>
			</div>
			
		
			
			<div class="_line" style="height:8px;"></div>
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">职位描述</span>
			</div>
			<div class="_line" ></div>
		
			<div style="width:100%;height:auto;">
				<div style="width:100%;height:auto;padding-left:10px;line-height: 26px;">
					{{items.job_desc}}
				
				</div>
			</div>
			
		</div> 
	
		<footer class="_foot">
			<div style="width:100%;" @click="addApply()">
				申请
			</div>

	    </footer>
	</div>
</template>
<script type="text/javascript">
	import {cityData3} from '../../assets/common/js/city.data-3.js'
	import city from '../../assets/common/js/city.data.js'
	import pick from '../../assets/common/js/mui.picker.js'
	import pop from '../../assets/common/js/mui.poppicker.js'
	import min from '../../assets/common/js/mui.min.js'
	import {API} from '../../static/api.js'
	import axios from 'axios'

	export default({
		data(){
			return{
				jobId:0,
				items:{},
				jobName:'',
				token:'',
			}
		},
		created(){
			this.token=localStorage.getItem('token');
			this.jobId=sessionStorage.getItem('jobId');
			
			this.$nextTick(function(){
			//表示页面渲染后的
			this.goJobDetails(this.jobId);
			})
		},
		methods:{
			goJobDetails:function(_jobId){
				
				var _this=this;
				axios.get(API.jobDetails,
					{
						params:{
							token:_this.token,
							jobId:_jobId
							
						}
					}
				)
				.then(function(response){
					console.log(response)
					_this.items=response.data.data[0];
					
				})
				.catch(function(error){

				});
			},
			addApply:function(){
				var _this=this;
				axios.get(API.addApply,
					{
						params:{
							token:_this.token,
							
					        jobId:_this.items.job_id,
							jobName:_this.items.job_title	
							
						}
					})
							
					.then(function(response){

						console.log(response)

                		alert(response.data.data);	

				})
				.catch(function(error){

				});
			},
			changeJob:function(){
        		this.$router.push('../jobList');
        	}
		}
	})


</script>
<link  href="../css/mui.picker.min.css" scoped/> 

<link href="../../assets/common/styles/app.css" scoped/>
<link href="../../assets/common/styles/mui.picker.css" scoped/>
<link href="../../assets/common/styles/mui.poppicker.css" scoped />
<link href="../../assets/common/styles/mui.min.css" scoped/>
<style scoped>
			body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:1px;background: #f2f2f2;}
</style>