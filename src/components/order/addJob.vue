<template>
	<div>
		<header class="_head">
			<img src="../../assets/common/images/back.png" style="position:absolute;left:10px;top:10px;" @click="goJobList()">
			<span style="font-size: 20px;">发布职位</span>
			<img src="../../assets/common/images/select_up.png" style="position:absolute;right:10px;top:10px;" @click="addJob()">
		</header>

		<div class="_top_block"></div>
	
	
	
		<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;">
		
		
					
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">标题：</span>
				<span style="position:absolute;right: 10px;" id="selectTitle">请选择职位名称</span>
			</div>
		
			<div class="_line"></div>	
		
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">人数：</span><span style="position:absolute;right: 10px;" id="count">请选择人数</span>
			</div>
			
			<div class="_line"></div>
			
			
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">薪资：</span><span style="position:absolute;right: 10px;" id="salary">请选择薪资区间</span>
			</div>
			
			<div class="_line"></div>
			
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">区域：</span><span style="position:absolute;right: 10px;" id="showCityPicker3">请选择区域</span>
			</div>
		
			<div class="_line"></div>

		
			<div class="_line" style="height:8px;"></div>
			<div style="width:100%;height:45px;line-height: 45px;">
				<span style="display: block;position: absolute;left:10px;">职位描述</span>
			</div>
			<div class="_line" ></div>
		
			
			<div style="width:100%;height:150px;line-height: 45px;margin-top:2px;">
				<textarea style="position:absolute;width:100%;height:150px;border:0px;" placeholder="请填写职位简述" v-model="jobDesc"></textarea>
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

	import {API} from '../../static/api.js'
	import axios from 'axios'

	export default({
		data(){
			return{
				token:'',
				jobTitle:'',
				jobCount:'',
				jobSalary:'',
				province:'',
				city:'',
				area:'',
				jobDesc:'',
			}
		},
		created(){
			this.token=localStorage.getItem('token');
			this.$nextTick(function(){
			//表示页面渲染后的
			this.getJob();

			})
		},
		methods:{

			goJobList:function(){
        		this.$router.push('jobList');
        	},
			
			addJob:function(){
			
        		var _this = this;
        		
              	axios.get(API.jobAdd,
                  {
					params: {
      					token:_this.token,
      					jobTitle:_this.jobTitle,
						jobCount:_this.jobCount,
						jobSalary:_this.jobSalary,
						province:_this.province,
						city:_this.city,
						area:_this.area,
						jobDesc:_this.jobDesc
      					
      					
    				}
                  }                 
                )

                .then(function (response) {
                	
                	
                	if(response.data.code==0){

                		_this.goJobList();
                		console.log("finish!");
                		
                		
                	}
                })
                .catch(function (error) {
                  console.log(error);
                });

        	},
			getJob:function(){
				var _this = this;
				(function($, doc) {
				$.init();
				$.ready(function() {
					
					var titlePicker = new $.PopPicker();
					titlePicker.setData([{
						value: '暖气片施工人员',
						text: '暖气片施工人员'
					}, {
						value: '开工配送人员',
						text: '开工配送人员'
					}, {
						value: '市场销售人员',
						text: '市场销售人员'
					}, {
						value: '客户人员',
						text: '客户人员'
					}]);
					var showUserPickerButton = doc.getElementById('selectTitle');
					var userResult = doc.getElementById('selectTitle');
					showUserPickerButton.addEventListener('tap', function(event) {
						titlePicker.show(function(items) {
							userResult.innerText = items[0].value;
							//返回 false 可以阻止选择框的关闭
							//return false;
							_this.jobTitle=items[0].value;
						});
					}, false);
					
					
					//-----------------------------------------数量
					var countPicker = new $.PopPicker();
					countPicker.setData([{
						value: '1-5人',
						text: '1-5人'
					}, {
						value: '5-10人',
						text: '5-10人'
					}, {
						value: '10-20人',
						text: '10-20人'
					}, {
						value: '20以上',
						text: '20以上'
					}]);
					var countPickerButton = doc.getElementById('count');
					var count = doc.getElementById('count');
					countPickerButton.addEventListener('tap', function(event) {
						countPicker.show(function(items) {
							count.innerText = items[0].value;
							//返回 false 可以阻止选择框的关闭
							//return false;
							_this.jobCount=items[0].value;
						});
					}, false);
					
					//-----------------------------------------薪资区间
					var salaryPicker = new $.PopPicker();
					salaryPicker.setData([{
						value: '100-200人/天',
						text: '100-200人/天'
					}, {
						value: '200-400人/天',
						text: '200-400人/天'
					}, {
						value: '2000-4000人/月',
						text: '2000-4000人/月'
					}, {
						value: '4000-6000人/月',
						text: '4000-6000人/月'
					}]);
					var salaryPickerButton = doc.getElementById('salary');
					var salary = doc.getElementById('salary');
					salaryPickerButton.addEventListener('tap', function(event) {
						salaryPicker.show(function(items) {
							salary.innerText = items[0].value;
							//返回 false 可以阻止选择框的关闭
							//return false;
							_this.jobSalary=items[0].value;
						});
					}, false);
					
					
					var cityPicker3 = new $.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData3);
					var showCityPickerButton = doc.getElementById('showCityPicker3');
					var cityResult3 = doc.getElementById('showCityPicker3');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker3.show(function(items) {
							cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
							//返回 false 可以阻止选择框的关闭
							//return false;
							_this.province=(items[0] || {}).text;
							_this.city=(items[1] || {}).text;
							_this.area=(items[2] || {}).text;
						});
					}, false);
					
					
				
				});
			})(mui, document);
			}	

			
			
		}
	})
</script>		
		

<link  href="../css/mui.picker.min.css" /> 


<link href="../../assets/common/styles/app.css"scoped />
<link href="../../assets/common/styles/mui.picker.css" scoped/>
<link href="../../assets/common/styles/mui.poppicker.css" scoped/>
<link href="../../assets/common/styles/mui.min.css" scoped />
		
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
		
<!-- <script src="../js/mui.picker.min.js"></script> -->
