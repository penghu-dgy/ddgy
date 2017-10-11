<template>
   <body>
	<header class="_head">
		<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" onclick="javascript:history.back();">
		<span style="font-size: 20px;">工单进展</span>
		<img src="../../assets/common/images/Category.png" style="position:absolute;right:10px;top:10px;">
	</header>
	<div class="_top_block"></div>
	<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;">
		<div style="width:100%;height:70px;">
			<div style="width:100%;height:100px;position: absolute;right: 0px;line-height: 35px;">
				<div style="margin-left:10px;">订单编号：{{id}}</div>
				<div style="margin-left:10px;">订单类型：{{ordertype}}</div>	
			</div>	
		</div>	
		<div class="_line" style="height:8px;"></div>
		<div v-for="(item,index) in s">
		<div style="width:100%;height:60px;">
		<div style="width:100%;height:100px;position: absolute;right: 0px;line-height: 30px;">
				<div style="margin-left:10px;"><img src="../../assets/common/images/map.png" style="margin-top:5px;"/><span style="margin-left:13px;">{{item.operDesc}}&nbsp;&nbsp;{{item.bz1}}</span></div>
				<div style="margin-left:40px;font-size:14px;">{{item.operTime}}</div>	
			</div>	
		</div>
		<div class="_line" style="width:85%;margin-left:40px;margin-right:40px;"></div>
		</div>
	</div>
</body>
</template>
<style scoped>
	        body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{width:100%;height:2px;background: #f2f2f2;}
</style>
<script >
import axios from 'axios'
import {API}  from '../../static/api.js'
 	export default({
		data(){
			return {
				s:{},
				id:1,
				ordertype:'',
				token:'',
			}
		},
		created(){
			this.token=localStorage.getItem('token')
			//获取传过来的工单id
          this.id=this.$route.params.id;
          this.getData();
          this.getOrder();
		},
		methods:{
			back:function(){
              this.$router.go(-1);
			},
			//通过id获取工单的操作记录
	          getData:function(){
	          	 var _this=this;
                 var params = new URLSearchParams();
			     params.append('token', _this.token);
                 params.append('orderId',this.id);
				 axios.post(API.operateDetail,params)
						      .then(function(res){
						      	//将获取到的数据给vue对象
						      	_this.s=res.data.data;
						      }, function(res){
						      	console.log(res);
						      })
	          },
	          //通过id获取工单信息
	          getOrder:function(){
	          	var _this=this;
                 var params = new URLSearchParams();
			     params.append('token', _this.token);
                 params.append('orderid',this.id);
				 axios.post(API.getOrderByOrderId,params)
						      .then(function(res){
						      	//将获取到的数据给vue对象
						      	_this.order=res.data.data;
						      	 _this.getOrderType();
						      }, function(res){
						      	console.log(res);
						      })
	          },
	          //根据工单对应的数字获取对应类型
	          // 0代表开工  1代表收尾  2代表维修
	          getOrderType:function(){
                if(this.order.ordertype==0)
            		this.ordertype="开工"
            	if(this.order.ordertype==1)
            		this.ordertype="收尾"
            	if(this.order.ordertype==2)
            		this.ordertype="维修"
	          }
		}
	})
</script>