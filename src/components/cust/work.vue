<template>

<div id="mywork">

		<header class="_head">
		<img src="../../assets/common/images/back32.png" @click="goCustom(id)"  style="position:absolute;left:10px;top:10px;" >
		<span style="font-size: 20px;">添加评论</span>
		<img src="../../assets/common/images/save.png"  @click="addWork(id)"  style="position:absolute;right:10px;top:10px;width:25px;height:25px;">
		</header>
		
		
		<div class="_top_block"></div>
		
		<div id="_content" style="width:100%;height:auto;background: white;">

		<div class="_line"  style="height:8px;"></div>
		<form id="frm1">	
		<div style="width:100%;height:150px;line-height: 45px;margin-top:2px;">
			<textarea style="position:absolute;width:100%;height:150px;border:0px;" name="workcontent"  placeholder="工作记录内容" id="workcontent"></textarea>
		</div>
		
		<div class="_line"></div>
		
		<!-- <div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">上传图片：</span><span style="position:absolute;right: 10px;"><input type="hidden" name="token" :value="token"/>
				<input type="hidden" name="workcust" :value="id"/>
					<input type="file" name="pic" id="file"><br/></span>
		</div> -->
		</form>
	
	<div v-for="(item, index) in items"  style='display:inline-block ;width:100px;height:100px;overflow:hidden;line-height:150px'  @click='rmar(index)'>
		<img v-bind:src="item" style='width:100px'>
		{{ index }} 
	</div>

	<a  class="file" style='display:inline-block;width:100px;height:100px'>
	    <input type="file" name="" id="file" accept= "image/*" capture= "camera">
	</a>

	</div>


		</div>


</template>

<script>

	import {API} from '../../static/api.js'
	import axios from 'axios'
	export default({
		data(){
			return {
				imgUrl:"",
				id:"",
				token:'',
				items:[],
				imgUrl:''


			
			}
		},

		 created(){
		 	this.token=localStorage.getItem('token')
            this.$nextTick(function(){
            	//表示页面渲染完成之后
            	//this.initDom();
            	this.id=this.$route.params.ids;
            	this.listener()
            	//alert(this.id);
            })
		},
		/*watch:{
items:function(){
	alert('ok')
}
		},*/

		methods:{

			addWork:function(cid){
				var _this=this
				var tok=localStorage.token
				//var img=JSON.stringify(_this.items)
				//判断工作内容和图片都为空时，不能添加

			

				var ss1 = document.getElementById("workcontent").value;			
				
				if(ss1==""||ss1==null){
					/*alert("内容和图片都为空");*/
					mui.alert('内容和图片不能都为空', '添加记录', function() {return;});
				}else{
					var _this = this;
					//将表单对象封装成一个js对象
		      		//var formData=new FormData(document.getElementById("frm1"));
		      		//设置内容类型为：multipart/form-data
					var images=JSON.stringify(_this.items)
	            	var param = new URLSearchParams()

					param.append('token',tok)
					param.append('workcontent',ss1)
					param.append('workimage',images)
					param.append('workemp',cid)
					param.append('workcust',_this.id)

	            	//提交文件对象只能是post方法http://localhost:8888/renren-security/api/workAdd
	              	 axios.post(API.workAddnew,
	                  param
	                )
	                .then(function (response) {
	                	
	                	console.log("123");
	                	_this.imgUrl = response.data.url;
	                	if(response.data.code==0){
	                		console.log("finish!"); 
	                		//跳转到客户详情页面
	                		_this.$router.push('../detailcust/'+cid);
	                		mui.toast('添加成功...');
	                	}
	                })
	                .catch(function (error) {
	                  console.log(error);
	                });
				}
			},


			goCustom:function(id){
				 //跳转到客户详情页面必须传传参数
          		this.$router.push('../detailcust/'+id);
			},
			rmar:function(i){
								console.log(i)
								this.items.splice(i,1)
							
							},
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
								       // _this.imgUrl=dataUrl
								        //console.log(dataUrl)

								        _this.items.push(dataUrl)
								        // 上传略
								       //document.write(dataUrl)
								    }
								    img.src = res;
								}
							},


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
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:70px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:2px;background: #f2f2f2;}

</style>