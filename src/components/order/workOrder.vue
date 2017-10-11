<template>
<body>
         	<header class="_head" style="background:#f2f2f2;color:#969797;z-index:99">
			<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="back()">
			<span style="font-size: 20px" id="title"></span>
		    </header>
	        <div class="_top_block"></div>
	        <div style="width:100%;height:45px;line-height: 45px;background: white;margin-top:8px;">
			<input type="text" name="search" id="search" style="width:100%;height:30px;border:0;padding-left:10px;" placeholder="请输入查询的电话或者姓名或者地址" @keyup.enter="getData()"/>
	        </div>
	        <div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;"
	        v-for="(item,index) in s">
			<div style="width:100%;height:45px;line-height: 45px;"  @click="workDetail(index)">
				<span style="display: block;position: absolute;left:10px;"><img src="../../assets/common/images/bussiness-man.png" style=""/>{{item.custName}} &nbsp;&nbsp;{{item.custPhone}}</span><span style="position:absolute;right: 10px;">{{item.bz1}}&nbsp;&nbsp;<img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
			</div>
		
		    <div class="_line"></div>
		
			<div style="width:100%;height:100px;margin-top:15px;">
				
				<div style="width:100%;height:100px;position: absolute;right: 0px;line-height: 26px;">
					<div style="margin-left:10px;">预约开始时间：{{item.orderBeginTime}}</div>
					<div style="margin-left:10px;">预约结束时间：{{item.orderEndTime}}</div>
					<div style="margin-left:10px;">施工地址：{{item.custProvince}}
                                  {{item.custCity}}
                                  {{item.custArea}}
                                  {{item.custAddress}}</div>
					
				</div>			
			</div>
		
		<div class="_line"></div>
	      <div style="width:100%;height:45px;line-height: 45px;" @click="operateDetail(index)">
				<span style="display: block;position: absolute;left:10px;">当前进度</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
			</div>
		
			<div class="_line"></div>
			
			<div style="width:100%;height:45px;line-height: 45px;">
				<span class="_btn" style="position:absolute;right: 5px;margin-top:8px;margin-bottom:8px;" 
				 v-show="item.distribution" 
				@click="applyDistribution(index)">申请配送</span>
				<span class="_btn" style="position:absolute;right: 95px;margin-top:8px;margin-bottom:8px;" v-show="item.construction"
				@click="applyConstruction(index)">申请施工</span>	
                <span class="_btn" style="position:absolute;right: 5px;margin-top:8px;margin-bottom:8px;" v-show="isDelete"
				@click="deletOrder(index)">删除</span>	
				<span class="_btn" style="position:absolute;right: 95px;margin-top:8px;margin-bottom:8px;" v-show="isUpdate"
				@click="updateOrder(index)">修改</span>	
				<span class="_btn" style="position:absolute;right: 5px;margin-top:8px;margin-bottom:8px;" v-show="isDistributioned"
				@click="isDistributioned1(index)">配送完成</span>	
				<span class="_btn" style="position:absolute;right: 95px;margin-top:8px;margin-bottom:8px;" v-show="cancelDistribution"
				@click="cancelDistribution1(index)">撤销配送</span>	
				<span class="_btn" style="position:absolute;right: 5px;margin-top:8px;margin-bottom:8px;"v-show="isConstructioned"
				@click="isConstructioned1(index)">施工完成</span>	
				<span class="_btn" style="position:absolute;right: 95px;margin-top:8px;margin-bottom:8px;"v-show="cancelConstruction"
				@click="cancelConstruction1(index)">撤销施工</span>	
			</div>
		</div>

</body>
</template>
<script>
    import {API} from '../../static/api.js'
    import axios  from 'axios' 
	export default({
		data(){
			return {
				s:{
				 },
				isDelete:false,
				isUpdate:false,
				isDistributioned:false,
				cancelDistribution:false,
				isConstructioned:false,
				cancelConstruction:false,
				flag:'',
				token:'',
			}
		},
		created(){
			this.token=localStorage.getItem('token')
			var id=this.$route.params.id;
            this.$nextTick(function(){
           	this.initTitle(id);
           	this.getData();
           })
		},
		methods:{
		back:function(){
            this.$router.push("/orderHome");
			},
	      addOrder:function(){
	      	this.$router.push("/addOrder");
	      },
	      operateDetail:function(index){
	      	let id=this.s[index].orderid;
	      	this.$router.push("/operateDetail/"+id);
	      },
	      initTitle:function(id){
	       //初始化标题
              if(id==1){
              	document.getElementById('title').innerText="发布中";
              }
              if(id==2){
              	document.getElementById('title').innerText="执行中";
              }
              if(id==3){
              	document.getElementById('title').innerText="已完成";
              }
              if(id==4){
              	document.getElementById('title').innerText="我的发布";
              }
              if(id==5){
              	document.getElementById('title').innerText="我的配送";
              }
              if(id==6){
              	document.getElementById('title').innerText="我的施工";
              }
	      },
	      workDetail:function(index){
	      	let id=this.s[index].orderid;

	     //如果是我的配送和我的施工界面则允许添加操作记录
	      if(this.$route.params.id==5||this.$route.params.id==6){
	      	id=id+"flag";
	      }
	      	this.$router.push("/workDetail/"+id);
	      },
	      getData:function(){
	      	          var _this=this;
	      	          this.flag=this.$route.params.id;
                      var params = new URLSearchParams();
                  //    var search=$("#search").val();
                      var search=document.getElementById("search").value;
                      if(search==undefined || search==""){
                      	search="";
                      }
                      params.append('search',search);
					  params.append('token', _this.token);
					  params.append('flag',this.flag);
				    	axios.post(API.orderList,params)
						      .then(function(res){
						      	//将获取到的数据给vue对象
						      	var temp=res.data.data;
						      	//给数据动态加入Boolean属性
						      	//	//发布中 执行中 已完成对应的页面
						      if(_this.$route.params.id==1||_this.$route.params.id==2||_this.$route.params.id==3){
						      	for(let i=0;i<temp.length;i++){
						      //未配送未施工
						      if(temp[i].orderState==0){
                                  temp[i].distribution=true;
                                  temp[i].construction=true;
                              }
                              //发布中配送中 或者发布中配送wanc
                              if(temp[i].orderState==1||temp[i].orderState==3){
                                  temp[i].distribution=false;
                                  temp[i].construction=true;
                              }
                              //发布中施工中
                              if(temp[i].orderState==2){
                                  temp[i].distribution=true;
                                  temp[i].construction=false;
                              }
                              if(temp[i].orderState==4||temp[i].orderState==5||temp[i].orderState==6){
                                  temp[i].distribution=false;
                                  temp[i].construction=false;
                              }
						      	}
						      }
                             //我的订单
						       if(_this.$route.params.id==4){
						       	for(let i=0;i<temp.length;i++){
                                  temp[i].distribution=false;
                                  temp[i].construction=false;
                                  
                              }
                                  _this.isDelete=true;
                                  _this.isUpdate=true;
						      }
                             //我的配送isDistributioned:false,
				              //cancelDistribution:false
                             if(_this.$route.params.id==5){
						       	for(let i=0;i<temp.length;i++){
                                  temp[i].distribution=false;
                                  temp[i].construction=false;
                                  
                              }
                              _this.isDistributioned=true;
                              _this.cancelDistribution=true;
                            }
                            //我的施工
                             if(_this.$route.params.id==6){
						       	for(let i=0;i<temp.length;i++){
                                  temp[i].distribution=false;
                                  temp[i].construction=false;
                                  
                              }
                              _this.isConstructioned=true;
                              _this.cancelConstruction=true;
                          }   
						      	_this.s=temp;
						      }, function(res){
						      	console.log(res);
						      })
	                        },   
		   applyDistribution:function(index){
		   		var _this=this;
		     	var btnArray = ['否', '是'];
		     	var i=0;
				mui.confirm('是否申请配送,确认？', '提示', btnArray, function(e) {
					if (e.index == 1) {
						i++;
						if(i>1)
						return;
				//	console.log("11");
						 //隐藏配送按钮
		              _this.s[index].distribution=false;
		              var that=_this;
		               //配送存在的情况只有2种(1未配送未施工 2未配送施工中)
		               if(that.s[index].orderState==0){//此时到1状态
		               	var params = new URLSearchParams();
					   params.append('token', that.token);
					   params.append('orderid',that.s[index].orderid);
				       axios.post(API.getOrderByOrderId,params)
				      .then(function(res){
                          if(res.data.data.orderstate!=0){
                             mui.toast('该订单已被接单');
                          }else{
                           that.updatestate(that.s[index].orderid,0,1,-1);
		                   that.insertOperation(that.s[index].orderid,"配送中");
		                   that.s[index].orderState=1;
                          }
				          }, function(res){
                                 mui.toast('...server error');
		                 })
		               }
		               if(that.s[index].orderState==2){//此时到4状态
                       	var params = new URLSearchParams();
					   params.append('token', that.token);
					   params.append('orderid',that.s[index].orderid);
				       axios.post(API.getOrderByOrderId,params)
				      .then(function(res){
                          if(res.data.data.orderstate!=2){
                             mui.toast('该订单已被接单');
                          }else{
                          that.updatestate(that.s[index].orderid,0,4);
		                  that.insertOperation(that.s[index].orderid,"配送中");
		                  that.s[index].orderState=4;
                          }
				          }, function(res){
                                 
		                 })		                  
		               }
		               //插入工单记录
		               
					} else {
						
					}
				})

		    },
		   applyConstruction:function(index){
		   	var _this=this;
		   	var i=0;
             var btnArray = ['否', '是'];
				mui.confirm('是否申请施工，确认？', '提示', btnArray, function(e) {
					if (e.index == 1) {
					//隐藏施工按钮
						i++;
						if(i>1)
						return;
				  	  _this.s[index].construction=false;
				  	  var that=_this;
				  	//施工存在的情况有3种(1未配送未施工2未施工配送中3未施工配送完成)
				  	 if(that.s[index].orderState==0){//此时到1状态
                        var params = new URLSearchParams();
					   params.append('token', that.token);
					   params.append('orderid',that.s[index].orderid);
				       axios.post(API.getOrderByOrderId,params)
				      .then(function(res){
                          if(res.data.data.orderstate!=0){
                             mui.toast('该订单已被接单');
                          }else{
                           that.updatestate(that.s[index].orderid,1,2,-1);
		                   that.insertOperation(that.s[index].orderid,"施工中");
		                  that.s[index].orderState=2;
                          }
				          }, function(res){
                                 
		                 })
		                  
		              }
		              if(that.s[index].orderState==1){//此时到4状态
                          var params = new URLSearchParams();
					   params.append('token', that.token);
					   params.append('orderid',that.s[index].orderid);
				       axios.post(API.getOrderByOrderId,params)
				      .then(function(res){
                          if(res.data.data.orderstate!=1){
                             mui.toast('该订单已被接单');
                          }else{
                           
		                  that.updatestate(that.s[index].orderid,1,4);
		                   that.insertOperation(that.s[index].orderid,"施工中");
		                  that.s[index].orderState=4;
                          }
				          }, function(res){
                                 
		                 })

		              }
		              if(that.s[index].orderState==3){//此时到5状态
                        var params = new URLSearchParams();
					   params.append('token', that.token);
					   params.append('orderid',that.s[index].orderid);
				       axios.post(API.getOrderByOrderId,params)
				      .then(function(res){
                          if(res.data.data.orderstate!=3){
                             mui.toast('该订单已被接单');
                          }else{
                           
		                  that.updatestate(that.s[index].orderid,1,5);
		                   that.insertOperation(that.s[index].orderid,"施工中");
		                  that.s[index].orderState=5;
                          }
				          }, function(res){
                                 
		                 })

		                  
		                }
		             
					} else {
							
						}
				})
		 
		   },
		   //更新状态
		   updatestate:function(orderid,flag,orderstate,index){
	                      var _this=this;
	                      var params = new URLSearchParams();
						  params.append('token', _this.token);
						  params.append('orderid',orderid);
						  params.append("flag",flag);
						  params.append('orderstate',orderstate);
					    	axios.post(API.updateOrderState,params)
							      .then(function(res){
                                      if(index!=-1){
                                      	_this.s.splice(index,1);
                                      }
                                  
							      }, function(){

							      })
		       },
		     insertOperation:function(operOrder,operDesc){
		     	        var _this=this;
	                     var params = new URLSearchParams();
						  params.append('token', _this.token);
						  params.append('operDesc',operDesc);
						  params.append('operOrder',operOrder);
					    	axios.post(API.operateDesc,params)
							      .then(function(){
                                      
							      }, function(){

					  })

		        },
		        deletOrder:function(index){
		        	//判断订单状态是否是0,即在未配送未施工中才可以删除
		        	     var _this=this;
		        	     var btnArray = ['否', '是'];
                         mui.confirm('是否删除订单？', '提示', btnArray, function(e) {
							if (e.index == 1) {
							var params = new URLSearchParams();
							  params.append('token', _this.token);
							  params.append('orderid',_this.s[index].orderid);
					    	 axios.post(API.getOrderByOrderId,params)
							      .then(function(res){
							      	//判断订单是否被接单
                                      if(res.data.data.orderstate!==0){
                                          mui.toast('该订单已被接单无法删除');
                                      }else{
                                      	  _this.doDelete(_this.s[index].orderid,index);
                                      }
							      }, function(){
                                  
					         })
							} else {
								
							}
						})
      
		        },
		        doDelete:function(orderid,index){
                         var _this=this;
	                     var params = new URLSearchParams();
						  params.append('token', _this.token);
						  params.append('orderid',orderid);
					      axios.post(API.deleteOrderByOrderId,params)
							      .then(function(res){
							      	//判断订单是否被接单
							      	_this.s.splice(index,1);
                                      	mui.toast('删除成功');
                                        
							      }, function(res){

					     })
		        },
		        isDistributioned1:function(index){	  
		        	var _this=this; 
                    var btnArray = ['否', '是'];
					mui.confirm('是否配送完成？', '提示', btnArray, function(e) {
						if (e.index == 1) {	 
						if(_this.s[index].orderState==1){
                        _this.updatestate(_this.s[index].orderid,0,3,index);
                        _this.insertOperation(_this.s[index].orderid,"配送完成");
                        _this.s[index].orderState=3;
			        	}
			        	if(_this.s[index].orderState==4){
			        		console.log(2)
			        		_this.updatestate(_this.s[index].orderid,0,5,index);
			        		_this.insertOperation(_this.s[index].orderid,"配送完成");
			        		_this.s[index].orderState=5;
			        	}
						} else {
							
						}
					})

		        	
		        },
		        cancelDistribution1:function(index){
		        	var _this=this; 
		        	var btnArray = ['否', '是'];
					mui.confirm('是都取消配送？', '提示', btnArray, function(e) {
						if (e.index == 1) {
							if(_this.s[index].orderState==1){
	                        _this.updatestate(_this.s[index].orderid,0,0,index);
	                        _this.insertOperation(_this.s[index].orderid,"撤销配送");
	                        _this.s[index].orderState=0;
			        	}
			        	if(_this.s[index].orderState==4){
	                        _this.updatestate(_this.s[index].orderid,0,2,index);
	                        _this.insertOperation(_this.s[index].orderid,"撤销配送");
	                        _this.s[index].orderState=2;
			        	}
						} else {
							
						}
					})
		        	
		        },
                isConstructioned1:function(index){
                	var _this=this; 
                	var btnArray = ['否', '是'];
					mui.confirm('是否施工完成？', '提示', btnArray, function(e) {
						if (e.index == 1) {
                        
							if(_this.s[index].orderState==2){
                		    mui.toast('配送还没完成');
			        	}
			        	if(_this.s[index].orderState==4){
	                        mui.toast('配送还没完成');
			        	}
			        	if(_this.s[index].orderState==5){
			        		_this.insertOperation(_this.s[index].orderid,"施工完成");
	                        _this.updatestate(_this.s[index].orderid,1,6,index);
	                       _this.s[index].orderState=6;
			        	}
						} else {
							
						}
					})
                	
                },
                cancelConstruction1:function(index){
                	var _this=this; 
                	var btnArray = ['否', '是'];
					mui.confirm('是否取消施工？', '提示', btnArray, function(e) {
						if (e.index == 1) {
						if(_this.s[index].orderState==2){						
                        _this.updatestate(_this.s[index].orderid,1,0,index);
                        _this.insertOperation(_this.s[index].orderid,"撤销施工");
                       _this.s[index].orderState=0;
			        	}
			        	if(_this.s[index].orderState==4){
			        		
	                        _this.updatestate(_this.s[index].orderid,1,1,index);
	                        _this.insertOperation(_this.s[index].orderid,"撤销施工");
	                        _this.s[index].orderState=1;
			        	}
			        	if(_this.s[index].orderState==5){
			        		
                           _this.updatestate(_this.s[index].orderid,1,3,index);
                           _this.insertOperation(_this.s[index].orderid,"撤销施工");
	                        _this.s[index].orderState=3;
			        	}
			        	
						} else {
						
						}
					})
                    
                },
		        //修改订单
		        updateOrder:function(index){
		        	var _this=this;
		        	var btnArray = ['否', '是'];
				   mui.confirm('是否修改订单？', '提示', btnArray, function(e) {
					if (e.index == 1) {
					let id=_this.s[index].orderid;
                    _this.$router.push("/alterOrder/"+id);
					} else {
						
					}
				})
                   
		        }
		    }
		 })
</script>
<style scoped>
	
			body{
				background:#f2f2f2;color:#969797
			}
			body,div,ul,li,span{
				margin:0;padding:0;border:0;
			}
			._head{
				position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;
			}
			._top_block{
				width:100%;height:50px;
			}
			._foot{
				position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;
			}
			._btn{
				display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;
			}
			._line{
				height:2px;background: #f2f2f2;margin-left:5px;margin-right:5px;
			}
	
</style>
