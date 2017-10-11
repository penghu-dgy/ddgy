<template>
<div>


<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" @click='back()'></a>
			<button id="submit" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click='insert()'>发送</button>
			<h1 class="mui-title">问题反馈</h1>
		</header>


		<div class="mui-content">


<br>
		<div class="mui-input-row">
			<input v-model='desc' id='contact' type="text" class="mui-input-clear contact" placeholder="请用一句话描述您的问题" />
		</div>


			<div class="mui-content-padded">
				
				
			</div>
			<div class="row mui-input-row">
				<textarea v-model='content' id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
			</div>
			<br>
			
		<div >
			
		</div>

				<div v-for="(item, index) in items"  style='display:inline-block ;width:100px;height:100px;overflow:hidden;line-height:150px'  @click='rmar(index)'>
					<img v-bind:src="item" style='width:100px'>
					{{ index }} 
				</div>

				<a  class="file" style='display:inline-block;width:100px;height:100px'>
				    <input type="file" name="" id="file" accept= "image/*" capture= "camera">
				</a>


			
		</div>


<div>
	

</div>

</div>



</template>
<script>
import {API} from '../../static/api.js'
import axios from 'axios'

		export default({
			data(){
				return{
					imgUrl:'',
					items:[],
					//sh:true,
					desc:'',
					content:''
				}
			},
			created(){
				  this.$nextTick(function(){
         this.listener()
            })
				
			},
			watch:{
				/*items:function(){
					var _this=this
					if (_this.items.length>2) {
						_this.sh=false
					}
					else{
						_this.sh=true
					}
					
				}*/
			},
			methods:{
				rmar:function(i){
					console.log(i)
					this.items.splice(i,1)
				
				},
				back:function(){
					this.$router.push('my')
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
					        _this.imgUrl=dataUrl
					        //console.log(_this.imgUrl)

					        _this.items.push(dataUrl)
					        // 上传略
					       //document.write(dataUrl)
					    }
					    img.src = res;
					}
				},
				insert:function(){
					var _this=this
					var tok=localStorage.token
					var img=JSON.stringify(_this.items)
					//console.log(img)

					if (_this.desc === '') {
						alert('请描述您的问题')
						return
					}

					if (_this.content === '') {
						alert('请详细描述您的问题,谢谢')
						return
					}

					var param = new URLSearchParams()
					param.append('token',tok)
					param.append('fbdesc',_this.desc)
					param.append('fbcontent',_this.content)
					param.append('imgs',img)
					axios.post(API.addFeedBack,param)
					 .then(function (response) {
					 	if (response.data.code==0) {
					 		mui.toast('感谢')
					 		_this.$router.push('my')
					 	}
					 })

					 .catch(function(error){

					 	})
				}

			}

		})
			
		
</script>
<style>
.file {
	background-color:#fff;
    position: relative;
    display: inline-block;
    background-image: url('../../assets/common/images/bigadd.png') ;
    background-size: 100px,100px;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    width: 80px;
    height:80px;
	 background-repeat:no-repeat;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    opacity: 0.6
}
</style>