<template>


<div>
	
<form v-show="isShow==1" id="frm1">
<input type="hidden" name="token" v-model="token"/>
			
<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="goback()">
		<span style="font-size: 20px;">发起审批</span>
		<img src="../../assets/common/images/save.png" style="position:absolute;right:10px;top:10px;width:25px;height:25px;" @click="activityAdd()">
		</header>
		
		
		<div class="_top_block"></div>
		
		<div id="_content" style="width:100%;height:auto;background: white;">
	
		
		<!--<div class="_line" style="height:20px;"></div>-->
		
		<div style="width:100%;height:45px;line-height: 45px;" @click="showEmployeeList(entid)">
		<input type="hidden" name="actchecker" v-model="empid">
			<span style="display: block;position: absolute;left:10px;">审核人</span><span style="position:absolute;right: 10px;" v-model="empname" >{{empname}}</span>
		</div>
		
		<div class="_line" style="height:20px;"></div>
		
		<div style="width:100%;height:45px;line-height: 45px;" id="showpick">
		<input type="hidden" name="acttype" v-model="msg">
			<span style="display: block;position: absolute;left:10px;">活动类型</span><span style="position:absolute;right: 10px;"  v-model='msg' id='showUserPicker' >{{msg}}</span>
		</div>
		
		
		<div class="_line" style="height:20px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;" id="start">
			<input type="hidden" name="actbegintime" v-model="actstarttime">
			<span style="display: block;position: absolute;left:10px;">开始时间</span><span style="position:absolute;right: 10px;" id="beginTime">{{actstarttime}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;" id="end">
		<input type="hidden" name="actendtime" v-model="actendtime">
			<span style="display: block;position: absolute;left:10px;" id="end">结束时间</span><span style="position:absolute;right: 10px;" id="endTime">{{actendtime}}</span>
		</div>
		
		
		<div class="_line"  style=""></div>
		
		<div style="width:100%;height:45px;line-height: 45px;"  @click="days()">
		<input type="hidden" name="actdays" v-model="acttime">
			<span style="display: block;position: absolute;left:10px;">活动时长：</span><span style="position:absolute;right: 10px;"  id="">{{acttime}}</span>
		</div>
		

		<div class="_line"></div>
		<!-- <div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">上传图片：</span><span style="position:absolute;right: 10px;"><input type="file" name="pic" style="border:0px;text-align:right;" id="file" /></span>
		</div> -->

		<div v-for="(item, index) in ite"  style='display:inline-block ;width:100px;height:100px;overflow:hidden;line-height:150px'  @click='rmar(index)'>
			<img v-bind:src="item" style='width:100px'>
			{{ index }} 
		</div>

		<a  class="file" style='display:inline-block;width:100px;height:100px'>
		    <input type="file" name="" id="file" accept= "image/*" capture= "camera">
		</a>


		
		
		
		<div class="_line"  style="height:20px;"></div>
		
		<div style="width:100%;height:auto;line-height: 45px;margin-top:2px;">
			<textarea style="position:absolute;width:100%;height:150px;border:0px;"  name="actreason" v-model="actreason" id="textarea" placeholder="请填写活动事由"></textarea>
		</div>
					
	</div>

</form>

	<div v-show="isShow==2">

		<header class="mui-bar mui-bar-nav"  >
			<a @click="gobackAdd()" class=" mui-icon mui-icon-left-nav mui-pull-left" style="font-size: 20px;line-height: 25px;"></a>
			<h1 class="mui-title">员工列表</h1>
		
		</header>


<div v-for="item in items" style="position:relative;top:60px" v-if='userid!=item.empid'>
<div style="width:100%;height:60px;background-color:#ffffff"  @click="pickEmp(item.empid,item.empname)">
			<div style="width:15%;float: left;text-align: right;height:60px;">
				<img src="../../assets/common/images/Smile.png" style="margin-top:15px;"/>
			</div>
			<div style="width:50%;line-height: 30px;float:left;margin-left:10px;" >
				<div style="height:20px;margin-top:5px">{{item.empname}}</div>
				<div style="height:20px;margin-top:5px">{{item.empphone}}</div>
				
			</div>
			<div class="_line"></div>
		</div>

</div>





		
		
</div>



</div>

</template>

<script src="../../assets/common/js/newActDetail.js"></script>
<script>
	import {API} from '../../static/api.js'

	import axios from 'axios'

export default({



		data(){
			return{

				//actpublishtime:'',      //发布时间
				actstarttime:'',          //开始时间
				actendtime:'',            //结束时间
				acttime:'',               //活动天数
				actaddress:'',            //照片地址
				actreason:'',             //活动事由
				msg:'请选择',                   //活动类型
				token:'',
				entid:0,                  //登陆人所属公司id
				empid:0,                  //员工id
				isShow:1,				  //控制两个页面的显示隐藏
				items:[],                 //存入所有员工的信息
				showChecker:1,            //控制审批人的显示
				empname:'请选择' ,               //审核人姓名
				userid:'',
				imgUrl:'',
				ite:[],
			}
			},

		created(){
			var _this=this
			
					this.entid = this.$route.params.entid;
					this.token=localStorage.getItem('token')
					//console.log(_this.token)
		            this.$nextTick(function(){
		   				_this.listener()
		            	_this.initDom();
		            	_this.getStartTime();
		            	_this.getEndTime();
		            	_this.employeeList();
		            	
		            	
		            })
				},

				/*watch:{
					msg:function(){
						alert('1')
					}
				},*/
		methods:{
			//点击删除选择图片
			rmar:function(i){
				//console.log(i)
				this.items.splice(i,1)
			
			},
			//添加选择图片时间监听
			listener:function(){
					var _this=this
					document.getElementById('file').addEventListener('change', function() {
					    var reader = new FileReader();
					    reader.onload = function (e) {
					        compress(this.result);
					    };
					    reader.readAsDataURL(this.files[0]);
					}, false);

					var compress = function (res) {
					    var img = new Image(),
					        maxH = 720;
					    img.onload = function () {
					        var cvs = document.createElement('canvas'),
					            ctx = cvs.getContext('2d');
					        if(img.height > maxH) {
					            img.width *= maxH / img.height;
					            img.height = maxH;
					        }
					        cvs.width = img.width;
					        cvs.height = img.height;
					        ctx.clearRect(0, 0, cvs.width, cvs.height);
					        ctx.drawImage(img, 0, 0, img.width, img.height);
					        var dataUrl = cvs.toDataURL('image/jpeg',0.7);
					        _this.imgUrl=dataUrl
					        //console.log(_this.imgUrl)

					        _this.ite.push(dataUrl)
					        // 上传略
					       //document.write(dataUrl)
					    }
					    img.src = res;
					}
				},
				//mui选择器
				initDom:function(){
					var _this = this ;
                 (function($, doc) {
				$.init();

				$.ready(function() {
					//普通示例
					
					var userPicker = new $.PopPicker();
					userPicker.setData([{
						value: 'A',
						text: '请假'
					}, {
						value: 'B',
						text: '外出'
					}, {
						value: 'C',
						text: '出差'
					}, {
						value: 'D',
						text: '通用'
					}]);
					var showUserPickerButton = doc.getElementById('showpick');
					//var userResult = doc.getElementById('userResult');
					showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
							//document.getElementById("showUserPicker").innerText = items[0].text;
							_this.msg=items[0].text
						});
					}, false);
	
				});
			})(mui, document);
			}

			,

			gobackAdd:function(){
				this.isShow = 1;
			},

			//返回按钮
			goback:function(){
				this.$router.push('/newActivityList');
				// this.$router.go(-1);
			},
			

			//选择开始时间
			getStartTime:function(){
				var _this = this;	
				(function($) {
					$.init();
					var start = document.getElementById("start");
					start.onclick = function(){
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new $.DtPicker(options);
						picker.show(function(rs) {
							_this.actstarttime = rs.text;
							picker.dispose();
						});
					} 
				})(mui);

			},

			//选择结束时间
			getEndTime:function(){
				var _this = this;	
				(function($) {
					$.init();
					var end = document.getElementById("end");
					end.onclick = function() {
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new $.DtPicker(options);
						picker.show(function(rs) {
							//result.innerText = '选择结果: ' + rs.text;
							_this.actendtime = rs.text;
							picker.dispose();
						});
					} 
				})(mui);
			},

			//自动获得活动天数
			days:function(){
				var start = this.actstarttime.replace(/-/g,"/");
				var start_date = new Date(start);
				var end = this.actendtime.replace(/-/g,"/");
				var end_date = new Date(end);
				var num = (end_date - start_date)/(1000*3600*24);
				/*if(start_date < (new Date())){
					alert("开始时间不得小于当前时间!");
					return;
				}*/
				if(start==''|| end==''){
					alert("请填写完整日期!");
					return;
				}
				if(num < 0){
					alert("请正确填写日期!");
					return;
				}
				this.acttime = parseInt(Math.ceil(num));
			},

			//提交按钮
			activityAdd:function(){
				var _this = this;
				var tp = null;

				//按格式设置当前时间
				/*var date = new Date();
				var year = date.getFullYear();
				var month;
				if((date.getMonth()+1) < 10){
					month = 0 + "" + (date.getMonth()+1)
				} else {
					month = date.getMonth() + 1;
				}
				var day = date.getDate();
				var hour = date.getHours();
				var min;
				if((date.getMinutes()) < 10){
					min = 0 + "" + (date.getMinutes());
				} else {
					min = date.getMinutes();
				}
				var now = year + '-' + month + '-' + day + ' ' + hour + ':' + min;
				this.actpublishtime = now;*/

				//还要判断审批人是否为空
				//console.log(_this.msg)
				//console.log(_this.actstarttime)
				//console.log(_this.actendtime)
				//console.log(_this.acttime)
				
				if(_this.msg=='请选择'||_this.actstarttime==''||_this.actendtime==''||_this.acttime==''){
					alert("请按规则填写表格!");
					return;
				}
				if(_this.empid==0){
					alert("	请选择审批人!");
					return;
				}

				//判断时间选择是否合法
				var start = this.actstarttime.replace(/-/g,"/");
				var start_date = new Date(start);
				var end = this.actendtime.replace(/-/g,"/");
				var end_date = new Date(end);
				var num = (end_date - start_date)/(1000*3600*24);
				/*if(start_date < (new Date())){
					alert("开始时间不得小于当前时间!");
					return;
				}*/
				/*if(_this.acttime != num){
					alert("请重新计算活动天数");
					return;
				}*/
				if(num < 0){
					alert("请正确填写日期!");
					return;
				}

				/*axios.get('http://localhost:8088/renren-security/api/activityAdd',{
					params:{token:'feaedff1-7521-4564-9cb5-504bc619bcdf',
						actpublishtime:now,
						actbegintime:_this.actstarttime,
						actendtime:_this.actendtime,
						actdays:_this.acttime,
						actaddress:_this.actaddress,
						actreason:_this.actreason,
						acttype:_this.msg,
						//actchecker:
						//actphoto:
					}
				})*/
				var d = new Date()
				var to=localStorage.getItem('token')
					var o=JSON.stringify(_this.ite)

					var param = new URLSearchParams()
					param.append('token',to)
					param.append('actpublishtime',d.toLocaleString())
					param.append('actbegintime',_this.actstarttime)
					param.append('actendtime',_this.actendtime)
					param.append('actdays',_this.acttime)
					param.append('actreason',_this.actreason)
					param.append('acttype',_this.msg)
					param.append('actaddress',o)
					param.append('actchecker',_this.empid)

				//var formData = new FormData(document.getElementById("frm1"));
				/*var config = {
					headers : {'Content-Type':'multipart/form-data'}
				};*/
				axios.post(API.activityAddnew,param
				)
				.then(function(response){
					if(response.data.code == 0){
						mui.toast("保存成功!");
						_this.$router.push('/newActivityList');
					}
				})
				.catch(function(error){
					console.log(error);
				})
			},


			showEmployeeList:function(e){
				this.isShow = 2;
				//this.employeeList();
			},
			employeeList:function(){
				var _this = this;
				axios.get(API.employeeAllList,{
					params:{token:_this.token,entid:_this.entid}
				})
				.then(function(response){
					_this.items = response.data.data;
					_this.userid=response.data.userid
					console.log(_this.userid)
				})
				.catch(function(error){
					console.log(error);
				})
				
			},

			//点击员工列表中的一个，选为审批人
			pickEmp:function(e,n){
				this.isShow = 1;
				this.showChecker = 2;
				// console.log(e);
				// console.log(n);
				this.empid = e;
				this.empname = n;
			}


},




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