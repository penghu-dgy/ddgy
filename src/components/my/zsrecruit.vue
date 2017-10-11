<template>
	<div>


<!-- 
		<div id="list" >
	      
		    <div class="mui-navbar-inner mui-bar mui-bar-nav">
		      <button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left" >
		        <span class="mui-icon mui-icon-left-nav" @click="home()" ></span>
		      </button>
		      <h1 class="mui-center mui-title">招聘</h1>
		      <span style="float:right;color: red;padding-top: 11px;" @click="publishRecruit()">发布招聘</span>
		    </div>
		   <div style="margin-top: 45px;height:1px;width:100%;background:#B9B9B9;overflow:hidden;">
		   	
		   </div> 
			
				插件	
			<div class="mui-content">
				<div class="mui-content-padded">								
					<button  class="mui-btn mui-btn-block" type='button'
					id='showCityPicker' v-model='city' >请选择市/区</button>
					
					<div id='cityResult' class="ui-alert"></div>				
				</div>
			</div>


		      <ul class="mui-table-view mui-table-view-chevron">
		        <li class="mui-table-view-cell mui-media" v-for="item in items" @click="goRecruitDetails(item.recruitId)">
		          <span class="mui-navigate-right">

		          	
		            <img v-bind:src="item.bz1" style="width: 60px;height: 60px;float: left;margin-right: 10px;">
		            <div class="mui-media-body">
		            	<span>
		            		{{item.recruitTitle}}
		            		<p class='mui-ellipsis'>{{item.entName}}</p>
		              		<p class='mui-ellipsis'>
		              			{{item.entProvice}}-{{item.entCity}}-{{item.entArea}}
		              		</p>
		            	</span>
		            	<span style="float:right; margin-top:-60px; font-size:13px;">
		            		{{item.recruitTime}}截至{{item.recruitEndTime}}
		            	</span>
		                     
		            </div>
		          </span>
		        </li>       
		        
		      </ul>
		</div> -->







<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"  @click="home()">
		<span style="font-size: 20px;">职位列表</span>
		<img src="../../assets/common/images/add.png" style="position:absolute;right:10px;top:10px;"  @click="publishRecruit()">
	</header>
	<div class="_top_block"></div>
	
	<div class="_line" style="height:15px;"></div>
	<div style="width:100%;height:45px;line-height: 45px;background: white;text-align: center;">
			<span  id='showCityPicker' v-model='city' >请选择区域</span>
	</div>


	
	<div id="ls" style="margin-top:15px;width:100%;height:auto;background: white;" @click="goRecruitDetails(item.recruitId)" v-for="item in items">		
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">{{item.recruitTitle}}<img src="../../assets/common/images/hot.png"></span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		<div class="_line"></div>
		
		<div style="width:100%;height:100px;margin-top:15px;">			
			<div style="width:25%;height:100px;position: absolute;left:0px;width:80px;height:80px;border:1px solid #969797;margin-left:10px;">
				<img v-bind:src="item.bz1" style="width:80px;height:80px;"/>				
			</div>
			
			<div style="width:75%;height:100px;position: absolute;right: 0px;line-height: 26px;">
				<div><span><img src="../../assets/common/images/box.png"/></span>&nbsp;&nbsp;&nbsp;{{item.entName}}</div>
				<div><img src="../../assets/common/images/compass.png"/>&nbsp;&nbsp;&nbsp;{{item.recruitProvice}} {{item.recruitCity}}</div>
				<div><img src="../../assets/common/images/map.png"/>&nbsp;&nbsp;&nbsp;{{item.recruitArea}}</div>				
			</div>			
		</div>
	</div>
	
	
	







	</div>
</template>
<script>
	//向后台接口发送数据，并获取值
	import {API} from '../../static/api.js'
	import {cityData3} from '../../assets/common/js/city.data-3.js'
	import city from '../../assets/common/js/city.data.js'
	import pick from '../../assets/common/js/mui.picker.js'
	import pop from '../../assets/common/js/mui.poppicker.js'

	
	import axios from 'axios'
	export default({
		data(){
			return{
				items:[],     
                city:'',
                imgUrl:'',
                recruitEntity:{},
                recruittitle:'',
                recruitcontent:'',
                token:''
			}
		},
		created(){
			this.token=localStorage.getItem('token')
			this.$nextTick(function(){
			//表示页面渲染后的
			this.recruitList();
			this.getList();
			})
		},
		
		
		methods:{
			home:function(){
				this.$router.push('my')
			},
				
			recruitList:function(){
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
					var cityResult = doc.getElementById('cityResult');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker.show(function(items) {
							
							showCityPickerButton.innerText =  items[0].text + " " + items[1].text;
							
							//希望获取数据，获取到城市的信息
							_this.getList(items[1].text);
							
							
						});
					}, false);
					
				});
			})(mui, document);
			},

			publishRecruit:function(){
        		this.$router.push('addrecruit')
        	},

        	goRecruitDetails:function(id){
        		//跳转到详情界面
        		
        		this.$router.push('xqrecruit/'+id);
        	},

        	getList:function(city){
				var _this=this;
				axios.get(API.recruitList,
					{
						params:{
							token:_this.token,

							entcity:city
						}
					}
				)
				.then(function(response){

					_this.items=response.data.data;

					console.log(_this.items);	
				})
				.catch(function (error) {
                  console.log(error);
                });

        	}

        		
        	


		
        	}
	})
</script>

<style src="../../assets/common/styles/mui.poppicker.css" scoped/>
<style src="../../assets/common/styles/mui.picker.css" scoped />


<style scoped>
		body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{height:2px;background: #f2f2f2;margin-left:5px;margin-right:5px;}
	
</style>