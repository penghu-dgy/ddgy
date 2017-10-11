<template>
<body>
		
	<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"  @click="back()">
		<span style="font-size: 20px;">工单详情</span>
		<img src="../../assets/common/images/Category.png" style="position:absolute;right:10px;top:10px;">
	</header>
	<div class="_top_block"></div>
	<div id="ls" style="margin-top:15px;width:100%;height:auto;background: white;">
		
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">工单编号</span><span style="position:absolute;right: 10px;">{{order.orderid}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">工单类型</span><span style="position:absolute;right: 10px;">{{ordertype}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">当前状态</span><span style="position:absolute;right: 10px;">发布中</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">预约开始时间</span><span style="position:absolute;right: 10px;">{{order.orderbegintime}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">预约结束时间</span><span style="position:absolute;right: 10px;">{{order.orderendtime}}</span>
		</div>
		
		<div class="_line" style="height:20px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">客户姓名</span><span style="position:absolute;right: 10px;">{{customer.custname}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">客户电话</span><span style="position:absolute;right: 10px;">{{customer.custphone}}</span>
		</div>
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">所属区域</span><span style="position:absolute;right: 10px;">
			{{customer.custprovince}}
			{{customer.custcity}}
			{{customer.custarea}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">客户地址</span><span style="position:absolute;right: 10px;">{{customer.custaddress}}</span>
		</div>
		
		<div class="_line" style="height:20px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">
			发布人员</span><span style="position:absolute;right: 10px;">
			{{order.orderempname}}</span>
		</div>
		
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">
			配送人员</span><span style="position:absolute;right: 10px;">
			 <a :href="order.distributiontel">{{order.distributionname}}</a></span>
		</div>
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">
			施工人员</span><span style="position:absolute;right: 10px;">
			 <a :href="order.constructiontel"> {{order.constructionname}}</a></span>
		</div>	
		<div class="_line" style="height:20px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;">
			<span style="display: block;position: absolute;left:10px;">工作记录</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/comments.png" style="margin-top:5px;"  @click="addWorkDetail()" v-show="isShow"/></span>
		</div>
		<div class="_line" style="height:20px;"></div>
		<div class="_line"></div>
		<div v-for="(item,index) in workDetail" >
			<div style="width:100%;height:45px;">
				<span style="display: block;position: absolute;left:10px;">{{item.empName}}</span><span style="position:absolute;right: 10px;">{{item.recordTime}}<img src="../../assets/common/images/delete.png" v-show="item.showDelete" @click="deleteworkDetail(index)" ></span>
			</div>
			<div style="margin-left:10px;">{{item.recordContent}}</div>
			<img :src="item.recordAddress" style="width:150px;height:150px;margin-left:10px;"
			 />
		</div>
	</div>
</body>
</template>
<script >
  import {API} from '../../static/api.js'
  import axios  from 'axios' 
	export default({
		data(){
			return {
				s:{},
				isShow:false,
				id:'',
				order:'',
				ordertype:'',
			    workDetail:'',//工单备注信息
			    token:'',
			    customer:'' //custmer info 
			}
		},
		created(){
			this.token=localStorage.getItem('token')
       let id=this.$route.params.id;
       this.id=id;
      //是否是我的配送和我的施工界面
	   if(id.substring(id.length-4,id.length)=="flag"){
	           this.isShow=true;
	           id=id.substring(0,id.length-4);
	           this.id=id;
	     } 
	       this.getData(); 
	       this.getOrder();
	       this.getWorkDetail();
	  },
		methods:{
          back:function(){
          	this.$router.go(-1);
          },
          //获取工单操作信息
          getData:function(){
          	var _this=this;
             var params = new URLSearchParams();
			  params.append('token', _this.token);
			  params.append('recordorderid',_this.id);
		      axios.post(API.getRecordListByOrderId,params)
				      .then(function(res){
                          _this.s=res.data.data;
				      }, function(){
                                 
		              })
          },
          addWorkDetail:function(){
          	this.$router.push("/addWorkDetail/"+this.id);
          },
            //通过id获取工单信息
	       getOrder:function(){
	          	 var _this=this;
                 var params = new URLSearchParams();
			     params.append('token', _this.token);
                 params.append('orderid',this.id);
				 axios.post(API.getOrderByOrderId,params)
						      .then(function(res){
						      	console.log(res.data)
						      	//将获取到的数据给vue对象
						      	res.data.data.distributiontel="tel:"+res.data.data.distributiontel
						      	res.data.data.constructiontel="tel:"+res.data.data.constructiontel
						      	_this.order=res.data.data;

						      	_this.getOrderType();
						      	_this.getCustomerById();
						      }, function(res){
						      //	console.log(res);
						      })
	                   },
	           //通过工单类型数值获取工单类型
	          getOrderType:function(){
                if(this.order.ordertype==0)
            		this.ordertype="开工"
            	if(this.order.ordertype==1)
            		this.ordertype="收尾"
            	if(this.order.ordertype==2)
            		this.ordertype="维修"
	          },
              //获取工单的备注信息
              getWorkDetail:function(){
              var _this=this;
              var params = new URLSearchParams();
			  params.append('token', _this.token);
			  params.append('recordorderid',_this.id);
		      axios.post(API.getRecordListByOrderId,params)
				      .then(function(res){
				      	console.log(res.data)
                          //当前用户id
                          var id=res.data.emp.empid;
                          for(let i=0;i<res.data.data.length;i++){
                          	res.data.data[i].showDelete=false;
                          	//如果当前登录的用户是该备注的发布者
                          	if(res.data.data[i].recordEmp==id){
                               res.data.data[i].showDelete=true;
                          	}
                          	 _this.workDetail=res.data.data;
                          }
				      }, function(){

		              })
              },
              deleteworkDetail:function(index){
                 var _this=this;
                 var params = new URLSearchParams();
			     params.append('token', _this.token);
                 params.append('recordId',this.workDetail[index].recordId);
                 var btnArray = ['否', '是'];
                 mui.confirm('是否删除订单？', '提示', btnArray, function(e) {
							if (e.index == 1) {
                               axios.post(API.deleteRecordById,params).then(function(){
                                      mui.toast("删除成功");
                                      _this.workDetail.splice(index,1)
                               }, function(){
                               })
							}else{

							}
						})               
              },
              getCustomerById:function(){
                var _this=this;
              var params = new URLSearchParams();
			  params.append('token', _this.token);
			  params.append('custId', _this.order.ordercust);
              axios.post(API.getCustomerById,params)
				      .then(function(res){
                          _this.customer=res.data.data;
				      }, function(){
                         
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
		ul li{
			float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;
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
			width:100%;height:2px;background: #f2f2f2;
		}
</style>