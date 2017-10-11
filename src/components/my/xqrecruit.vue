<template>
	<div>
		<!-- 详情
		<div id="detail" >
			<div class="mui-navbar-inner mui-bar mui-bar-nav" >
		      			<button type="button" class="mui-left  mui-btn mui-action-back  mui-btn-link mui-btn-nav mui-pull-left"   >
			        	<span class="mui-icon mui-icon-left-nav"></span>
			      		</button>
			      		<h1 class="mui-center mui-title">招聘详情</h1>
			      		
			    		<div style="margin-top: 45px;height:1px;width:100%;background:#B9B9B9;overflow:hidden;">
			    			
			    		</div >
		
				<div >	
					<form class="mui-input-group" style="margin-top: 60px;">
						<div class="mui-input-row" style="padding: 10px 8px;">
							<span style="float:left">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span>
							<span style="float:right">{{item.recruitTitle}}</span>
						</div>
					</form>	
					<form class="mui-input-group">
						<div class="mui-input-row" style="padding: 10px 9px">
							<span style="float:left">公&nbsp;司&nbsp;名：</span>
							<span style="float:right">{{item.entName}}</span>
						</div>
					</form>	
					<form class="mui-input-group">
						<div class="mui-input-row" style="padding: 10px 8px">
							<span style="float:left">职位要求</span>
						</div>
					</form>	
				
					<div class="mui-input-row" style="margin: 10px 5px;">
						<textarea id="textarea" rows="5" >{{item.recruitContent}}</textarea>
					</div>
				</div>
			    		
			</div>
		</div> 
		 -->







			<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click='changeShow()'>
		<span style="font-size: 20px;">招聘详情</span>
		<img src="../../assets/common/images/Category.png" style="position:absolute;right:10px;top:10px;">
	</header>
	<div class="_top_block"></div>
	
	
	
	<div id="ls" style="margin-top:15px;width:100%;height:auto;background: white;">
		
		
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">职位名称</span><span style="position:absolute;right: 10px;">{{item.recruitTitle}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">公司名称</span><span style="position:absolute;right: 10px;">{{item.entName}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">当前区域</span><span style="position:absolute;right: 10px;">{{item.recruitProvice}} {{item.recruitCity}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">联系人</span><span style="position:absolute;right: 10px;">{{item.empName}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">联系电话</span><span style="position:absolute;right: 10px;">{{item.entPhone}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">公司地址</span><span style="position:absolute;right: 10px;">{{item.recruitArea}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">发布时间</span><span style="position:absolute;right: 10px;">{{item.recruitTime}}</span>
		</div>
		

		
		<div class="_line" style="height:20px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">职位描述</span>
		</div>
		<div class="_line" ></div>
	
		<div style="width:100%;height:auto;">
			<div style="width:100%;height:auto;padding-left:10px;line-height: 26px;">
				{{item.recruitContent}}
			
		</div>

		</div>
	</div> 	

	</div>
</template>
<script type="text/javascript">
	//向后台接口发送数据，并获取值
	import {API} from '../../static/api.js'
	import axios from 'axios'
	export default({
		data(){
			return{
				recruitid:0,
				item:[],     
                token:'',
                recruitEntity:{},
                recruittitle:'',
                recruitcontent:''
			}
		},
		created(){
			this.token=localStorage.getItem('token')
			this.recruitid=this.$route.params.id;
			
			this.$nextTick(function(){
			//表示页面渲染后的
			
			this.goRecruitDetails(this.recruitid);
			})
		},
		methods:{
			goRecruitDetails:function(_recruitid){
				var _this=this;
				axios.get(API.recruitDetails,
					{
						params:{
							token:_this.token,
							recruitid:_recruitid
							
						}
					}
				)
				.then(function(response){
					console.log(response.data.data[0])
					_this.item=response.data.data[0];
					
				})
				.catch(function(error){

				});
			},
			changeShow:function(){
        		this.$router.go(-1)
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
			._line{height:2px;background: #f2f2f2;}
		


</style>