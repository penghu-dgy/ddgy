<template>
	<body id="box">
		<header class="_head">
		<span style="font-size: 20px;">工单中心</span>
	</header>
	<div class="_top_block"></div>

	<div id="ls" style="margin-top:15px;width:100%;height:auto;background: white;">		
		<div style="width:100%;height:45px;line-height: 45px;" @click="releasing()">
			<span style="display: block;position: absolute;left:10px;">发布中
			{{s.fbz}}</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click="executing()">
			<span style="display: block;position: absolute;left:10px;">执行中
			{{s.zxz}}</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click="finished()">
			<span style="display: block;position: absolute;left:10px;">已完成
			{{s.ywc}}</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		
		<div class="_line" style="height:15px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click="myOrder()">
			<span style="display: block;position: absolute;left:10px;">我的发布
			{{s.wdfb}}</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click="myDistribution()">
			<span style="display: block;position: absolute;left:10px;">我的配送
			{{s.wdps}}</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		<div class="_line"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click="myConstruction()">
			<span style="display: block;position: absolute;left:10px;">我的施工
			{{s.wdsg}}</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
		</div>
		
		<div class="_line" style="height:15px;"></div>
		<div style="width:100%;height:45px;line-height: 45px;" @click="addOrder()" v-if='usertype !="0001"'>
			<span style="display: block;position: absolute;left:10px;">创建工单</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span>
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
           s:{},
           token:'',
          usertype:'',

      	}
      },
      created(){
      	var _this=this

			var str = sessionStorage.s; 
			this.s = JSON.parse(str)
			_this.usertype=_this.s.emptype

			

      	this.token=localStorage.getItem('token');
          this.getCount();
          
         /* alert(this.token)*/
      },
      methods:{
      
      	releasing:function(){
      		this.$router.push("workOrder/1")
      	},
      	executing:function(){
      		this.$router.push("workOrder/2")
      	},
      	finished:function(){
      		this.$router.push("workOrder/3")
      	},
      	myOrder:function(){
      		this.$router.push("workOrder/4")
      	},
      	myDistribution:function(){
      		this.$router.push("workOrder/5")
      	},
        myConstruction:function(){
        	this.$router.push("workOrder/6")
        },
        addOrder:function(){
        	this.$router.push("addOrder");
        },
        getCount:function(){
        	var _this=this;
        	 var params = new URLSearchParams();
			params.append('token',_this.token);
			//alert(_this.token)
			axios.post(API.getCount,params)
			 .then(function(res){
                console.log(res.data.data)
                _this.s=res.data.data;
			 },function(res){

			 })
        }
      	
      }
})
</script>
<style scoped>
     body{
     	background:#f2f2f2;color:#969797}
		body,div,ul,li,span
		{
			margin:0;padding:0;border:0;
		}
		ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
		._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
		._top_block{width:100%;height:50px;}
		._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
		._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
		._line{height:2px;background: #f2f2f2;margin-left:5px;margin-right:5px;
		}
	
</style>