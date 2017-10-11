<template>

  <body>
    <form id="form" v-show="showOrder">
  	  <header class="_head">
			<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"  @click="back()">
			<span style="font-size: 20px;">新建订单</span>
			<img src="../../assets/common/images/selected.png" style="position:absolute;right:10px;top:10px;" @click="subContent()">
		</header>
		
		<div class="_top_block"></div>
		<div id="_content" style="margin-top:15px;width:100%;height:auto;background: white;">
		<div style="width:100%;height:45px;line-height: 45px;"  @click="enterSelectCustomer()">
			<span style="display: block;position: absolute;left:10px;">客户姓名</span><span style="position:absolute;right: 10px;">{{customer.custname}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">电话方式</span><span style="position:absolute;right: 10px;">{{customer.custphone}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">当前区域：</span><span style="position:absolute;right: 10px;"  id="showCityPicker">
			{{customer.custcity}}-{{customer.custarea}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">详细地址</span><span style="position:absolute;right: 10px;">{{customer.custaddress}}</span>
		</div>
		
		<div class="_line" style="height:20px;"></div>

		<div style="width:100%;height:45px;line-height: 45px;" id='showUserPicker'>
		<span style="display: block;position: absolute;left:10px;">工单类型</span>
		<span style="position:absolute;right: 10px;" >
		 <input type="text"  v-model="order" disabled="true" placeholder="选择工单类型" style='border-left:0px;border-top:0px;border-right:0px;border-bottom:1px '
            ></input>
		</span>
		</div>

		<div class="_line" style="height:20px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;" id="start">
			<span style="display: block;position: absolute;left:10px;">开始时间</span>
			<span style="position:absolute;right: 10px;" >
				<input type="text"  v-model="actstarttime" disabled="true" placeholder="请选择开始时间" style='border-left:0px;border-top:0px;border-right:0px;border-bottom:1px ' />
			</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;" id="end">
			<span style="display: block;position: absolute;left:10px;">结束时间</span><span style="position:absolute;right: 10px;" >
             <input type="text"  v-model="actendtime" disabled="true" placeholder="选择结束时间" style='border-left:0px;border-top:0px;border-right:0px;border-bottom:1px '
             ></input>
			</span>
		</div>
		<div style="width:100%;height:auto;line-height: 45px;margin-top:2px;">
			<textarea style="position:absolute;width:100%;height:150px;margin-top:10px;border:0px;" placeholder="请填写描述信息" id="content"></textarea>
		</div>
		</div>
       <input type="text" name="ordertype" id="ordertype" hidden="true"/>
		<input type="text" name="orderbegintime" id="orderbegintime" hidden="true" />
		<input type="text" name="orderendtime" id="orderendtime" hidden="true" />
		<input type="text" name="orderdesc" id="orderdesc" hidden="true"/>
		<input type="text" name="ordercust" id="ordercust" hidden="true"/>    
      </form>
         <!-- 客户列表 -->
        <div v-show="showCust">
        <header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="backToOrder()">
		<span style="font-size: 20px;">客户列表</span>
	    </header>
	    <div class="_top_block"></div>
	     <div id="ls" style="margin-top:15px;width:100%;height:auto;background: white;"
	     v-for="(item,index) in customers" @click="chooseCust(index)">
		<div style="width:100%;height:60px;" >
			<div style="width:15%;float: left;text-align: right;height:60px;">
				<img src="../../assets/common/images/Smile48.png" style="margin-top:5px;"/>
			</div>
			<div style="width:50%;line-height: 28px;float:left;margin-left:10px;">
				<div>{{item.custname}}</div>
				<div>{{item.custphone}}</div>
				
			</div>
			<div class="_line"></div>
		 </div>
			
	</div>
</div>
       
  </body>	
</template>
<script >
	import pick   from   '../../assets/common/js/mui.picker.min.js'
	import axios from 'axios'
    import {API} from '../../static/api.js'
    export default({
		data(){
			return {
               s:{},
               custid:'',
               actstarttime:'',
               actendtime:'',
               showOrder:true,
               showCust:false,
               order:'',
               customers:'',
               customer:{
               	custid:'',
               	custname:'',
               	custphone:'',
               	custaddress:'',
               	token:'',
               }
			}
		},
		created(){
			let id=this.$route.params.id;
			this.custid=id;
			this.token=localStorage.getItem('token')
			this.getEmpInfo()
			this.getCustomer();
			this.$nextTick(function(){
				this.initOrdertype();
                this.getStartTime()
				this.getEndTime()
			})		
			
		},
		methods:{
			back:function(){
               this.$router.push("/orderHome")
			},
			backToOrder:function(){
				this.showOrder=true;
                this.showCust=false; 
			},
			initOrdertype:function(){
				var _this=this;
				(function($, doc) {
				$.init();
				$.ready(function() {
					//普通示例
					var userPicker = new $.PopPicker();
					userPicker.setData([{
						value: '1',
						text: '开工'
					}, {
						value: '2',
						text: '收尾'
					}, {
						value: '3',
						text: '维修'
					}]);
					var showUserPickerButton = doc.getElementById('showUserPicker');
					showUserPickerButton.addEventListener('click', function(event) {
						userPicker.show(function(items) {
							_this.order =items[0].text;
						});
					}, false);
				
				});
			})(mui, document);
			},
			getStartTime:function(){
				var _this = this;	
				(function($) {
					$.init();
					var start = document.getElementById("start");
					start.onclick = function() {
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new $.DtPicker(options);
						picker.show(function(rs) {
							_this.actstarttime = rs.text;	
						});
					} 
				})(mui);
			},
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
										_this.actendtime = rs.text;
									});
								} 
							})(mui);
						},
            subContent:function(){
            	document.getElementById("orderdesc").value=document.getElementById("content").value;
            	document.getElementById("ordercust").value=this.customer.custid
            	document.getElementById("orderbegintime").value=this.actstarttime
            	document.getElementById("orderendtime").value=this.actendtime
            	if(this.order==="开工")
            		document.getElementById("ordertype").value="0"
            	if(this.order==="收尾")
            		document.getElementById("ordertype").value="1"
            	if(this.order==="维修")
            		document.getElementById("ordertype").value="2"
            	if(this.actstarttime>this.actendtime){
            		 mui.alert('开始时间需小于结束时间', '提示', function() {
					   
			         });
            	}
            	else{
            		this.addOrder();
            	}     	
            },
            //进入客户列表界面
            enterSelectCustomer:function(){
            		this.showOrder=false;
                	this.showCust=true;
            },
            //获取客户信息
            getCustomer:function(){
             var _this=this;
             var params = new URLSearchParams();
			  params.append('token', _this.token);
		    	axios.post(API.customerList,params)
				      .then(function(res){
                          _this.customers=res.data.data;
				      }, function(){
                         
				      })
           },
           addOrder:function(){
           	var _this=this;
           	if(_this.order===undefined||_this.order===''){
             	mui.alert('请选择工单类型', '提示', function() {		   
			 });
           	}else{

           	};
           	if(_this.customer.custname===undefined||_this.customer.custname===''){
             	mui.alert('请先选择客户', '提示', function() {		   
			 });
           	}else{
           	var formData=new FormData(document.getElementById("form"));
           	formData.append('token',_this.token);
            var config={
              		headers:{'Content-Type':'multipart/form-data'}
            	       };
            axios.post(API.addOrder,
                  formData,
                  config
                ).then(function (res) {
                	
                	_this.$router.push("/orderHome")
                	mui.toast("添加成功");
                }).catch(function (error) {
                	
                	_this.$router.push("/orderHome")
                
                });


           	}
           },
           getEmpInfo:function(){
					var _this = this;

					var toke=localStorage.getItem('token');

					var params = new URLSearchParams();

					params.append('token', localStorage.getItem('token'));
					
					axios.post(API.getEmpInfo, params)

			   
			 .then(function (response) {
			 	//console.log('asdasdasd'+response.data.code)
			     	if (response.data.code!=0) {
			     		//alert("错误")
			     	}
			     	else{

			     		_this.s=response.data.user
			     		sessionStorage.setItem('empent',_this.s.empent)
			     		sessionStorage.setItem('userid',_this.s.empid)
			     		var str = JSON.stringify(_this.s); 
			     		sessionStorage.s=str;
			     		_this.usertype=_this.s.emptype
			     		var a=_this.usertype.split('');
			     		if(a[0]){
			     			_this.boss=true
			     		}
			     		//console.log(_this.s.emptype)
			     	}

			     })
			 .catch(function (error) {
			       console.log(error);
			     });
		},
           //选择客户,即获取当前点击的对象
	       chooseCust:function(index){
			   	 	this.customer=this.customers[index];
			   	 	this.showOrder=true;
                	this.showCust=false;
			   	 }

		}
	})
</script>
<style  src="../../assets/common/styles/mui.picker.min.css" scoped></style>
<style  src="../../assets/common/styles/app.css" scoped></style>

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
	   body{
	        background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;
			}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:70px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:2px;background: #f2f2f2;}		
	
</style>