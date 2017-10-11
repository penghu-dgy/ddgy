<template>
	
	<div>
		<header class="_head">
			<img src="../../assets/common/images/as.png" style="position:absolute;left:10px;top:10px;" @click='bac()'>
			<span style="font-size: 20px;">我的招聘</span>
			<img src="../../assets/common/images/as.png" style="position:absolute;right:10px;top:10px;" @click="goMyAddJob()">
		</header>
		<div class="_top_block"></div>
		
		
		


		
		<div id="ls" style="margin-top:9px;width:100%;height:auto;background: white;" v-for="item in items">		
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;" @click="goMyJobDetail(item.job_id)">
					<img src="../../assets/common/images/as.png">详情
				</span>
				<span style="display: block; position:absolute;right: 10px;" @click="goApplyList(item.job_id)">
					<img src="../../assets/common/images/as.png" >查看申请
				</span>
			</div>
			<div class="_line"></div>
			
			 <div style="width:100%;height:90px;margin-top:8px;">			
				
				
				<div style="width:80%;height:90px;position: absolute; margin-left:10px; line-height: 24px;">
					<div style="padding-left:5px;font-size: 14px; padding-top:10px;">
					<span>
						<img src="../../assets/common/images/as.png" style="width:14px;height:14px;"/>
					</span>需求职位：{{item.job_title}}
					</div>
					
					<div style="padding-left:5px;font-size: 14px;padding-top:10px;">
						<img src="../../assets/common/images/as.png" style="width:14px;height:14px;"/>
						发布时间：{{item.job_pub_time}}
					</div>
									
				</div>
				<div style="width:15%;height:90px;position: absolute; right:10px; line-height:90px;">
						{{item.job_state}}
				</div>			
			</div>
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import {API} from '../../static/api.js'
	import axios from 'axios'

	export default({
		data(){
			return{
				items:[],
				token:''
			}
		},
		created(){
			this.token=localStorage.getItem('token');
			this.$nextTick(function(){
			//表示页面渲染后的
			this.myJobList();
			
			})
		},
		methods:{
			bac:function(){
				this.$router.push('my')
			},

			myJobList:function(){
				var _this=this;
				axios.get(API.myJobList,
					{
						params:{
							token:_this.token

							
						}
					}
				)
				.then(function(response){

					_this.items=response.data.data;

					console.log("_this.items="+_this.items);	
				})
				.catch(function (error) {
                 console.log(error);
                });

        	},

        	

        	goMyJobDetail:function(id){
        		//跳转到详情界面
        		sessionStorage.setItem('jobId',id)
        		this.$router.push('myJobDetail');
        	},

        	goMyAddJob:function(){
        		this.$router.push('myAddJob');
        	},

        	goApplyList:function(id){
        		sessionStorage.setItem('jobId',id);
        		this.$router.push('apply');
        	}

		}
	})
</script>
<link href="../../assets/common/styles/mui.min.css" scoped/>

		
<style scoped>
		._wrap{background:#f2f2f2;color:#000;font-family: "微软雅黑";font-size:16px;}
			._title_fontsize{font-size:18px;}
			.img_back{position:absolute;left:5px;top:10px;width:28px;height:28px;}
		
			body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._line{width:100%;height:1px;background: #f2f2f2;}
</style>