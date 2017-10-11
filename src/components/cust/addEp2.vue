<template>
   <div>
   	<header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" style="color: #e15252;font-size: 18px;line-height: 25px;" @click='back()'></a>
			<h5 class="mui-title" style="font-size: 14px;line-height: 35px;color: #333333;">创建企业</h5>
			<h5 class="mui-title" style="font-size: 12px;line-height: 65px;color: #333333;">2/2</h5>
				</header>
		

	<div class="mui-content" style="margin-top: 5px;;">
			<div class="mui-content-padded" style="margin: 5px;">
			
				<form class="mui-input-group">
					
					<div class="mui-input-row">
						<label>姓 名</label>
						<input type="text" placeholder="您的真实姓名" v-model='empName'>

					</div>
					
					<div class="mui-input-row" >
						
							<label>企业名称</label>
							<input type="text" placeholder="请填写企业名称，以便邀请同事加入"v-model='entName'>
						
						</div>

						<div style="width:100%;height:45px;line-height: 45px;" id='showUserPicker'>
							<span style="display: block;position: absolute;left:10px;">企业类型</span><span style="position:absolute;right: 10px;"  id="showq">请选择</span>
						</div>
						
						
					<div style="width:100%;height:45px;line-height: 45px;" id="showCityPicker3">
						<span style="display: block;position: absolute;left:10px;">区域：</span>
						<span style="position:absolute;right: 10px;"  id="cityResult3">请选择公司区域</span>
					</div>
					
					<div class="_line"></div>

					<div  class="mui-input-row">
						<label>详细地址：</label>
						
						<input type="text" name="uname" id="myjd" v-model="entAddress" placeholder="请输入详细地址"/>
						</span>
					</div>
					
					</form>

					
					
					
					</div></div>
					
						<button    class="mui-btn mui-btn-primary " type='button' style="width: 86%;margin-left: 7%;"  @click='AddEnterpriseInfo()'>完成</button>
						
						<button  class="mui-btn mui-btn-primary mui-btn-outlined" type='button' style="width: 86%;margin-left: 7%;"@click='join'>加入现有企业</button>
		
					
					
				
				
   </div>
</template>


<script>	

    import axios from 'axios'
    import {API} from '../../static/api.js'
    import {cityData3} from '../../assets/common/js/city.data-3.js'
    export default({
    	data(){
    		return {
    			empName:'',
    			entName:'',
    			items:[],
    			token:'',
    			entProvice:'',
    			entCity:'',
    			entArea:'',
    			entAddress:'',
    			bz1:''
    		}
    	},
    	methods:{

    		next:function(){
                console.log("next.to cust");
    			this.$router.push("cust");
    		},
    		back:function(){
    			this.$router.push('addEP')
    		},
    		join:function(){
    			this.$router.push("joinEnterprice2")
    		},

            getEmpInfo:function(){  //获取客户登陆信息，放到sessionStorage的s变量中，后期通过s获取用户信息
                    var _this = this;
                    var toke=localStorage.getItem('token');

                    var params = new URLSearchParams();
                    params.append('token', localStorage.getItem('token'));
                    
                    axios.post(API.getEmpInfo, params).then(function (response) {
                        if (response.data.code!=0) {
                            alert("错误")
                        }else{
                            var s=response.data.user
                            sessionStorage.setItem('empent',s.empent)
                            sessionStorage.setItem('userid',s.empid)
                            var str = JSON.stringify(s); 
                            sessionStorage.s=str;
                            if (response.data.user.emptype=='0000') {
                                _this.$router.push('firstMy')
                            }else{
                                _this.$router.push('my'); //跳转到my界面
                                //_this.next();  //跳转到cust界面

                            }
                            
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

    		AddEnterpriseInfo:function(){
    	 	 		var _this = this;

    	 	 		var params = new URLSearchParams();
    	 	 		if (_this.empName =='') {
    	 	 			alert("姓名为空，请输入")
    	 	 			return
    	 	 		}
    	 	 		if (_this.entName =='') {
    	 	 			alert("企业名称为空，请输入")
    	 	 			return
    	 	 		}
    	 	 		if (_this.bz1 =='') {
    	 	 			alert("请选择公司主要业务")
    	 	 			return
    	 	 		}
    	 	 		if (_this.entProvice =='') {
    	 	 			alert("请选择公司区域")
    	 	 			return
    	 	 		}
    	 	 		if (_this.entAddress=='') {
    	 	 			alert("请输入详细地址")
    	 	 			return
    	 	 		}
    	 	 		
    	 	 		
    	 	 		

    	 	 		_this.token=sessionStorage.getItem('token');
    	 	 		localStorage.setItem('token', _this.token);
    	 	 		params.append('token', localStorage.getItem('token'));
    	 	 		params.append('empName',_this.empName);
    	 	 		params.append('entName',_this.entName);
    	 	 		params.append('entProvice',_this.entProvice)
    	 	 		params.append('entCity',_this.entCity)
    	 	 		params.append('entArea',_this.entArea)
    	 	 		params.append('entAddress',_this.entAddress)
    	 	 		params.append('bz1',_this.bz1)
    	 	    	axios.post(API.AddEnterpriseInfo,params)
    	 	       
    	 	      .then(function (response) {
                    console.log("code="+response.data.code);
                    if(response.data.code==505){ //如家已经添加了该手机的企业，给出提示信息
                        //alert(response.data.msg);
                        mui.toast(response.data.msg);

                    }else {
                        console.log(response.data); //如果成功之后继续向下执行
                        console.log("go next");
                        //_this.next();
                        _this.getEmpInfo(); //更新sessionStorage中的用户信息
                    }
 
    	 	      	
    	 	      })
    	 	      .catch(function (error) {
    	 	        console.log(error);
    	 	      });
    	 	    },
    	 	    			initDom:function(){
    	 	    				var _this = this;
    	 	                     (function($, doc) {
    	 	    				$.init();
    	 	    				$.ready(function() {
    	 	    					//普通示例
    	 	    					var userPicker = new $.PopPicker();
    	 	    					userPicker.setData([{
    	 	    						value: 'A',
    	 	    						text: '暖通'
    	 	    					}, {
    	 	    						value: 'B',
    	 	    						text: '门窗'
    	 	    					}, {
    	 	    						value: 'C',
    	 	    						text: '软装'
    	 	    					}]);
    	 	    					var showUserPickerButton = doc.getElementById('showUserPicker');
    	 	    					//var userResult = doc.getElementById('userResult');
    	 	    					showUserPickerButton.addEventListener('tap', function(event) {
    	 	    						userPicker.show(function(items) {
    	 	    							document.getElementById("showq").innerText = items[0].text;
    	 	    							_this.bz1=items[0].text;

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
    	 	    					var showCityPickerButton = doc.getElementById('showCityPicker3');
    	 	    					var cityResult3 = doc.getElementById('cityResult3');
    	 	    					showCityPickerButton.addEventListener('tap', function(event) {
    	 	    						cityPicker3.show(function(items) {
    	 	    							cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
    	 	    							//console.log(items)
    	 	    							_this.entProvice=items[0].text
    	 	    							_this.entCity=items[1].text
    	 	    							_this.entArea=items[2].text
    	 	    							//返回 false 可以阻止选择框的关闭
    	 	    							//return false;
    	 	    						});
    	 	    					}, false);
    	 	    				});
    	 	    			})(mui, document);
    	 	    			}
    		
    	},
    	created(){
           this.$nextTick(function(){
            	this.initDom();
            })
           

       
    
		},
	
    	
    })

	

	
</script>
<style scoped>	
   .mui-btn {
				font-size: 16px;
				padding: 8px;
				margin: 3px;
			}
			h5.mui-content-padded {
				margin-left: 3px;
				margin-top: 20px !important;
			}
			h5.mui-content-padded:first-child {
				margin-top: 12px !important;
			}
			.ui-alert {
				text-align: center;
				padding: 20px 10px;
				font-size: 16px;
			}
	body{font-family: "微软雅黑";margin: 0;padding: 0;}
	html,
	body {
		background-color: #efeff4;
	}
	.mui-bar .mui-pull-left .mui-icon {
		padding-right: 5px;
		font-size: 28px;
	}
	.mui-bar .mui-btn {
		font-weight: normal;
		font-size: 17px;
	}
	.mui-bar .mui-btn-link {
		top: 1px;
	}
	input[type='text']{
     text-align:right;
     }
	.mui-input-row{
		font-size: 17px;
	}
	
	::-webkit-input-placeholder { /* WebKit browsers */  
	 font-size: 15px;text-align:left;
	}  
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
	  font-size: 15px;text-align:left; 
	}  
	::-moz-placeholder { /* Mozilla Firefox 19+ */  
	    font-size: 15px;text-align:left; 
	}  
	:-ms-input-placeholder { /* Internet Explorer 10+ */  
	    font-size: 15px;text-align:left;
	}  
						
	._line{width:100%;height:1px;background: #f2f2f2;}		
			input[type=text]{
    text-align:left;
}

</style>