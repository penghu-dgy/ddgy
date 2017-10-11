<template>
	
	
	<div>
		<header class="_head">
			<img src="../../assets/common/images/as.png" style="position:absolute;left:10px;top:10px;" @click="backMyJobList()">
			<span style="font-size: 20px;">申请信息</span>
			<img src="../../assets/common/images/as.png" style="position:absolute;right:10px;top:10px;">
		</header>
		<div class="_top_block"></div>
		
		
		


		
		<div id="ls" style="margin-top:9px;width:100%;height:auto;background: white;" v-for="item in items">		
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute; left:10px;" >
					<img src="../../assets/common/images/as.png">姓名：{{item.emp_name}}
				</span>
				<span style="display: block; position:absolute; right:10px;">
					<img src="../../assets/common/images/as.png" >电话：{{item.emp_phone}}
				</span>
			</div>
			<div class="_line"></div>
			
			 
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import {API} from '../../static/api.js'
	import axios from 'axios'

	export default({
		data(){
			return{
				jobId:0,
				items:[]
			}
		},
		created(){
			this.jobId = sessionStorage.getItem('jobId');
			this.$nextTick(function(){
			//表示页面渲染后的
			this.applyList(this.jobId);

			})
		},
		methods:{

			applyList:function(_jobId){
				var _this=this;
				axios.get('http://localhost:9090/renren-security/api/applyList',
					{
						params:{
							token:'feaedff1-7521-4564-9cb5-504bc619bcdf',
							jobId:_jobId
							
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

        	

        	backMyJobList:function(){
        		this.$router.push('myJobList');
        	}

		}
	})
</script>
<link href="../../assets/common/styles/mui.min.css" />

		
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
