<template>

<div id="mywork">

			 <header class="mui-bar mui-bar-nav">
			  
			      <span class=" mui-icon  mui-pull-right " style="font-size: 18px;line-height: 25px;" @click="addWork()">提交</span>
			      <h1 class="mui-title">工作记录</h1>
			 </header>
			
			<form id="frm1">		
				<div class="mui-input-row" style="margin: 10px 5px;margin-right: 0;margin-left: 0;margin-top:45px;">
					<textarea name="recordcontent" rows="5" placeholder="工作记录内容" id="recordcontent"></textarea>
					浏览图片：<input type="file" name="pic" id="pic" /><br/>
					</div>
					<input type="text" name="recordorderid" id="recordorderid" hidden="true" />
			</form>
			<img v-bind:src="imgUrl" style="width:0px;height:0px;" />

</div>


</template>

<script>
	import {API} from '../../static/api.js'
	import axios from 'axios'
	export default({
		data(){
			return {
				s:{},
				imgUrl:"",
				id:"",
				token:'',
			
			}
		},

		 created(){
		 	this.token=localStorage.getItem('token')
            this.$nextTick(function(){
            	//表示页面渲染完成之后
            	//this.initDom();
            	this.id=this.$route.params.id;
            	//alert(this.id);
            })
		},

		methods:{

			addWork:function(){
				//判断工作内容和图片都为空时，不能添加
				var ss1 = document.getElementById("recordcontent").value;			
				var ss2 = document.getElementById("pic").value;
				if((ss1==""||ss1==null)&&(ss2==""||ss2==null)){
					/*alert("内容和图片都为空");*/
					mui.alert('内容和图片不能都为空', '添加记录', function() {return;});
				}else{
					var _this = this;
					//将表单对象封装成一个js对象
					//$("#recordorderid").val(this.id)
					document.getElementById("recordorderid").value=this.id;
		      		var formData=new FormData(document.getElementById("frm1"));
		      		formData.append('token',_this.token);
		      		//设置内容类型为：multipart/form-data
					var config={
	              		headers:{'Content-Type':'multipart/form-data'}
	            	};

	            	//提交文件对象只能是post方法http://localhost:8888/renren-security/api/workAdd
	              	 axios.post(API.addRecord,
	                  formData,
	                  config
	                )
	                .then(function (res) {
	                	if(res.data.code==0){
	                		//跳转到客户详情页面
	                		_this.$router.push('/workDetail/'+_this.id+"flag");
	                        _this.s=_this.res.data.data;
	                        console.log(_this.s)
	                		mui.toast('添加成功...');
	                	}
	                })
	                .catch(function (error) {
	                  console.log(error);
	                });
				}
			},


	


		}

	})

</script>

<style>

</style>