<template>
	<div>




			<header class="_head">
					<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="listCust()">
					<span style="font-size: 20px;">添加客户</span>
					<img src="../../assets/common/images/selected.png" style="position:absolute;right:10px;top:10px;" @click="addCustomer()">
				</header>
				<div class="_top_block"></div>
				
				
				
				<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;">
					
					
								
					<div style="width:100%;height:45px;line-height: 45px;">
						<label style="display: block;position: absolute;left:10px;">客户姓名：</label>
						<span style="position:absolute;right: 10px;">
						<input type="text" name="uname" style="border:0px;width:250px;text-align: right;" placeholder="请输入姓名" id="myname" v-model="custname"/>
						</span>
					</div>
					
					<div class="_line"></div>	
					
					<div style="width:100%;height:45px;line-height: 45px;">
						<span style="display: block;position: absolute;left:10px;">手机号码：</span>
						<span style="position:absolute;right: 10px;">
						<input type="text" name="uname" style="border:0px;width:250px;text-align: right;" placeholder="请输入手机号码" id="mytel" v-model="custphone"/>
						</span>
					</div>
					
					<div class="_line"></div>
					
					
					<div style="width:100%;height:45px;line-height: 45px;" id='showUserPicker'>
						<span style="display: block;position: absolute;left:10px;">客户级别：</span><span style="position:absolute;right: 10px;"  id="showq">请选择</span>
					</div>
					
					<div class="_line"></div>

					<div style="width:100%;height:45px;line-height: 45px;" id="showCityPicker3">
						<span style="display: block;position: absolute;left:10px;">区域：</span>
						<span style="position:absolute;right: 10px;"  id="cityResult3">请选择区域</span>
					</div>
					
					<div class="_line"></div>

					<div style="width:100%;height:45px;line-height: 45px;">
						<span style="display: block;position: absolute;left:10px;">详细地址：</span>
						<span style="position:absolute;right: 10px;">
						<input type="text" name="uname" style="border:0px;width:250px;text-align: right;" id="myjd" v-model="custaddress" placeholder="请输入详细地址"/>
						</span>
					</div>

					
				</div>





<!-- 


		 <header class="mui-bar mui-bar-nav">
      		<span class="mui-icon mui-icon-left-nav mui-pull-left" @click="listCust()"></span>
      		<a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#topPopover"></a>
      	     <span class=" mui-icon  mui-pull-right " style="font-size: 18px;line-height: 25px;" @click="addCustomer()">提交</span>
              <h1 class="mui-title">新增客户</h1>
       </header>

		

		<table style="width:100%;background:white;margin-top:50px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">客户名称</td><td style="float:right;">
            <input type="text" id="myname" v-model="custname" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="请输入" />
            </td></tr>
        </table>

        <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">客户电话</td><td style="float:right;">
            <input type="text" id="mytel" v-model="custphone" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="请输入" />
            </td></tr>
        </table>

         <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;" id='showUserPicker'>
		
            <td style="padding-left:5px;">分类</td><td style="float:right;"  >
            
            <span style="float:right;" id="showq">请选择</span>
            </td></tr>
         </table>

          <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">地址</td><td style="float:right;">
            
            <span id="cityResult3" style="float:right;border-top: 1px;">请选择</span>
        
            </td></tr>
          </table>

          <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">街道</td><td style="float:right;">
            <input type="text" id="myjd" v-model="custaddress" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="请输入" />
            </td></tr>
          </table>
			
			 -->

	</div>
</template>
<script >
import {API} from '../../static/api.js'
    import {cityData3} from '../../assets/common/js/city.data-3.js'

	import axios from 'axios'
	
	
	export default({
		data(){
			return {
				custname:'',
				custphone:'',
				custtype:'',
				custaddress:'',
				custprovince:'',
				custEntity:{},
				token:''
			}
		},
		created(){
			this.token=localStorage.getItem('token')
            this.$nextTick(function(){
            	this.initDom();
            })
		},
		methods:{

			listCust:function(){
				//跳转到列表查询页面
				this.$router.push('cust')
			},


			addCustomer:function(){
				var th=this
			 var myname = document.getElementById("myname").value
			 var mytel = document.getElementById("mytel").value
			 var myjd = document.getElementById("myjd").value
			 var myaddress = document.getElementById("cityResult3").innerText
			 var mytype = document.getElementById("showUserPicker").innerText
			 
			 if(myname==""||myname==null){
			 	mui.alert('名称不能为空', '添加信息', function() {return;});
			 	return;
			 }
			 if(mytel==""||mytel==null){
			 	mui.alert('电话不能为空', '添加信息', function() {return;});
			 	return;
			 }
			 if(mytype=="请选择"){
			 	mui.alert('类型不能为空', '添加信息', function() {return;});
			 	return;
			 }
			 if(myaddress=="请选择"){
			 	 mui.alert('地址不能为空', '添加信息', function() {return;});
			 	 return;
			 }
			 if(myjd==""||myjd==null){
			 	mui.alert('街道不能为空', '添加信息', function() {return;});
			 	return;
			 }
			 
			  var _this = this;
              axios.get(API.customerAdd,
                  {
					params: {
      					token:th.token,
      					custname:_this.custname,
      					custphone:_this.custphone,
      					custtype:document.getElementById("showq").innerText,
      					custprovince:document.getElementById("cityResult3").innerText,
      					custaddress:_this.custaddress
    				}
                  }                 
                )
                .then(function (response) {
                	
                	console.log(response);
                	//_this.custEntity = response.data.data;
                	if(response.data.code==0){
                		
                		console.log("finish!");
                		
                		//跳转到列表页面去
                		_this.$router.push('cust');
                		 mui.toast('添加成功...');

                	}
                	else{
                		 mui.toast('请勿重复添加客户...');
                  //_this.$router.go(-1)
                	}
                })
                .catch(function (error) {
                  console.log(error);
                 
                });

			},

			initDom:function(){
                 (function($, doc) {
				$.init();
				$.ready(function() {
					//普通示例
					var userPicker = new $.PopPicker();
					userPicker.setData([{
						value: 'A',
						text: 'A级'
					}, {
						value: 'B',
						text: 'B级'
					}, {
						value: 'C',
						text: 'C级'
					}, {
						value: 'D',
						text: 'D级'
					}]);
					var showUserPickerButton = doc.getElementById('showUserPicker');
					//var userResult = doc.getElementById('userResult');
					showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
							document.getElementById("showq").innerText = items[0].text;
							//document.getElementById("showUserPicker").innerText = JSON.stringify(items[0]);
							//userResult.innerText = JSON.stringify(items[0]);

							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
					//-----------------------------------------

					//-----------------------------------------
					//					//级联示例
					var cityPicker3 = new $.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData3);
					var showCityPickerButton = doc.getElementById('cityResult3');
					var cityResult3 = doc.getElementById('cityResult3');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker3.show(function(items) {
							cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;


							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				});
			})(mui, document);
			}
		}
	})
</script>
<!-- 引入外部css样式 -->
<style src="../../assets/common/styles/mui.poppicker.css" scoped/>
<style src="../../assets/common/styles/app.css" scoped/>
<style src="../../assets/common/styles/mui.picker.css" scoped/>
<style scoped>
		._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:1px;background: #f2f2f2;}
		
</style>