<template>
	<div>
		<header class="_head">
			<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="backs()">
			<span style="font-size: 20px;">职位列表</span>
			<img src="../../assets/common/images/as.png" style="position:absolute;right:10px;top:10px;" @click="goAddJob()">
		</header>
		<div class="_top_block"></div>
		
		<div class="_line" style="height:8px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;background: white;text-align: center;">
				<span   id="showCityPicker" v-model='city'>请选择区域</span>
		</div>


		
		<div id="ls" style="margin-top:9px;width:100%;height:auto;background: white;" v-for="item in items">		
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">
					<img src="../../assets/common/images/as.png">
					{{item.job_title}}
				</span>
				<span style="position:absolute;right: 10px;">
					<img src="../../assets/common/images/as.png" style="margin-top:8px;" @click="goJobDetails(item.job_id)">
				</span>
			</div>
			<div class="_line"></div>
			
			 <div style="width:100%;height:90px;margin-top:8px;">			
				<div style="width:25%;height:100px;position: absolute;left:0px;width:70px;height:70px;margin-left:10px;">
					<img src="../../assets/common/images/as.png" style="width:70px;height:70px;"/>				
				</div>
				
				<div style="width:75%;height:90px;position: absolute;right: 0px;line-height: 24px;">
					<div style="padding-left:5px;font-size: 14px;"><span><img src="../../assets/common/images/as.png" style="width:14px;height:14px;"/></span>需求人数：{{item.job_count}}</div>
					<div style="padding-left:5px;font-size: 14px;"><img src="../../assets/common/images/as.png" style="width:14px;height:14px;"/>工资：{{item.job_salary}}</div>
					<div style="padding-left:5px;font-size: 14px;">
						<img src="../../assets/common/images/as.png" style="width:14px;height:14px;"/>
						区域：{{item.province}} {{item.city}} {{item.area}}
					</div>				
				</div>			
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {cityData3} from '../../assets/common/js/city.data-3.js'
	import city from '../../assets/common/js/city.data.js'
	import pick from '../../assets/common/js/mui.picker.js'
	import pop from '../../assets/common/js/mui.poppicker.js'
	import min from '../../assets/common/js/mui.min.js'
	import axios from 'axios'
	import {API} from '../../static/api.js'

	export default({
		data(){
			return{
				items:[],
				city:'',
				token:'',
			}
		},
		created(){
			this.token=localStorage.getItem('token');
			this.$nextTick(function(){
			//表示页面渲染后的
			this.getList();
			this.jobList();
			})
		},
		methods:{
			getList:function(){
				var _this=this;
				(function($, doc) {
				$.init();
				$.ready(function() {
					
					//级联示例
					var cityPicker = new $.PopPicker({
						layer: 2
					});
					cityPicker.setData(cityData3);
					var showCityPickerButton = doc.getElementById('showCityPicker');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker.show(function(items) {
							showCityPickerButton.innerText = items[0].text + " " + items[1].text;
							//返回 false 可以阻止选择框的关闭
							//return false;
							_this.jobList(items[1].text);
						});
					}, false);
					//-----------------------------------------时间日期插件
				
				});
			})(mui, document);
			},
			backs:function(){
				this.$router.push('my')
			},

			jobList:function(city){
				var _this=this;
				axios.get(API.jobList,
					{
						params:{
							token:_this.token,

							city:city
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

        	goJobDetails:function(id){
        		//跳转到详情界面
        		
        		sessionStorage.setItem('jobId',id)
        		this.$router.push('jobDetail');
        	},

        	goAddJob:function(){
        		this.$router.push('addJob');
        	}

		}
	})


</script>
<link  href="../css/mui.picker.min.css" scoped/> 

<link href="../../assets/common/styles/app.css" scoped/>
<link href="../../assets/common/styles/mui.picker.css" scoped/>
<link href="../../assets/common/styles/mui.poppicker.css" scoped/>
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