<template>
	<div>
		<!--发布招聘 -->
		

<form id="frm1">



			
<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="changeShow()">
		<span style="font-size: 20px;">发布招聘</span>
		<img src="../../assets/common/images/save.png" style="position:absolute;right:10px;top:10px;width:25px;height:25px;"   @click="sendUnameByForm()">
		</header>
		
		
		<div class="_top_block"></div>
		
		<div id="_content" style="width:100%;height:20px;background: white;margin-top:5px">
		
		<input type="text" placeholder="请输入招聘标题" name="recruittitle" v-model="recruittitle" style="border:none" >

		
		</div>
		
		<div class="_line" style="height:20px;"></div>
		
		
		<div style="width:100%;height:45px;line-height: 45px;width:100%;background: white;margin-top:5px" id="end" >
			<input type="hidden" name="recruitendtime" :value="recruitendtime">
			<span style="display: block;position: absolute;left:10px;" >截止时间</span>
			<span style="position:absolute;right: 10px;">{{recruitendtime}}</span>
		</div>		
	<div class="_line"></div>
		

			<div style="width:100%;height:45px;line-height: 45px;width:100%;background: white;margin-top:5px" id="cityResult3" >
				<input type="hidden" name="recruitendtime" :value="recruitendtime">
				<input type="hidden" name="recruitProvice" :value="recruitProvice">
				<input type="hidden" name="recruitCity" :value="recruitCity">
				<input type="hidden" name="recruitArea" :value="recruitArea">
				<span style="display: block;position: absolute;left:10px;" >招聘地址</span>
				<span style="position:absolute;right: 10px;"> {{recruitProvice}} {{recruitCity}} {{recruitArea}} </span>
			</div>		
		<div class="_line"></div>
		
		
		
		
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;background-color:white">
			<span style="display: block;position: absolute;left:10px;">上传图片：</span><span style="position:absolute;right: 10px;"><input type="file" name="pic" style="border:0px;text-align:right;" /></span>
			
		</div>
		
		
		
		
		<div class="_line"  style="height:20px;"></div>
		
		<div style="width:100%;height:auto;line-height: 45px;margin-top:2px;">
			<textarea style="position:absolute;width:100%;height:150px;border:0px;"  name="recruitcontent" v-model="recruitcontent" id="textarea" placeholder="请填写活动事由"></textarea>
		</div>
					


</form>
	</div>


</template>


<script>
	//向后台接口发送数据，并获取值
	import {API} from '../../static/api.js'
	 import {cityData3} from '../../assets/common/js/city.data-3.js'
	
	import axios from 'axios'
	export default({
		data(){
			return{
				items:[],     
                recruitendtime:'',
                recruitEntity:{},
                recruittitle:'',
                recruitcontent:'',
                token:'',
                recruitCity:'',
                recruitProvice:'',
                recruitArea:''
               

			}
		},
		created(){
			this.token=localStorage.getItem('token')
			this.$nextTick(function(){
			//表示页面渲染后的
			this.getEndTime();
			this.initDom();
			})
		},
		methods:{
			addRecruit:function(){
			
        		var _this = this;
              axios.get(API.recruitAdd,
                  {
					params: {
      					token:_this.token,
      					recruitcontent:_this.recruitcontent,
      					recruittitle:_this.recruittitle,
      					recruitendtime:_this.recruitendtime,
      					recruitArea:_this.recruitArea,
      					recruitProvice:_this.recruitProvice,
      					recruitCity:_this.recruitCity
    				}
                  }                 
                )
                .then(function (response) {
                	
                	
                	if(response.data.code==0){

                		_this.changeShow();
                		console.log("finish!");
                		_this.sendUnameByForm();
                		_this.recruitList();
                		
                	}
                })
                .catch(function (error) {
                  console.log(error);
                });

        	},


        	//选择结束时间


        	getEndTime:function(){
				var _this = this;	
				(function($) {
					$.init();
					var end = document.getElementById("end");
					end.onclick = function(){
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new $.DtPicker(options);
						picker.show(function(rs) {
							_this.recruitendtime = rs.text;
							picker.dispose();
						});
					} 
				})(mui);

			},
			//添加地址


			initDom:function(){
				var _this = this ;
                 (function($, doc) {
				$.init();
				$.ready(function() {
				
					var cityPicker3 = new $.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData3);
					var showCityPickerButton = doc.getElementById('cityResult3');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker3.show(function(items) {
							

							_this.recruitProvice=items[0].text;
							_this.recruitCity=items[1].text;
							_this.recruitArea=items[2].text;
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				});
			})(mui, document);
			}
,
        	//上传图片
        	sendUnameByForm:function(){
	    		var _this = this;
	      		console.log("sendUnameByForm..");
	      		//将表单对象封装成一个js对象
	      		var formData=new FormData(document.getElementById("frm1"));
	      		formData.append("token",_this.token);
	      		//设置内容类型为：multipart/form-data
				var config={
              		headers:{'Content-Type':'multipart/form-data'}
            	};
            	//提交文件对象只能是post方法
              	axios.post(API.imgAdd,
              		
                  formData,
                  config
                )
                .then(function (response) {
                	console.log(response)
                  	if (response.data.code==0) {
                  		_this.$router.push('zsrecruit')
                  	}
                  	//console.log("url="+response.data.url);
                  	//将后台服务器传过来的imgUrl的值传给前台界面进行双向绑定
                  	//_this.imgUrl = response.data.url;
                })
                .catch(function (error) {
                  console.log(error);
                });
	      	},	      

        	changeShow:function(){
        		this.$router.push('zsrecruit')
        	}	
		}
	})
</script>
<style src="../../assets/common/styles/mui.poppicker.css" scoped/>
<style src="../../assets/common/styles/app.css" scoped/>
<style src="../../assets/common/styles/mui.picker.css" scoped/>

<style scoped>
	 	body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:70px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:2px;background: #f2f2f2;}

</style>