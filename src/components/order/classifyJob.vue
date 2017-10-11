<template>
	<div>

		<header class="_head">
	    	<img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="back()">
	    <span style="font-size: 20px;">选择职位类型</span>
	    	<img src="../../assets/common/images/add.png" style="position:absolute;right:10px;top:10px;" @click="publishNotice()">
	    </header>


		<div style="float:left;margin-top:90px">
			
			<p  @click="b('门框')" style="display: inline-block; text-align: center;margin-top:90px; width:80px; height:30px; line-height:28px; border: 1px solid #dedede;">
			门框
			</p>
		</div>
		<div style="float:left; margin-left:100px">
			
			<p @click="b('卵痛')"  style="display: inline-block;margin-top:90px; text-align: center; width:80px; height:30px; line-height:28px; border: 1px solid #dedede;">
			卵痛
			</p>
		</div>
		<div style="float:left; margin-left:100px">
			
			<p  @click="b('软通')" style="display: inline-block; text-align: center; width:80px; height:30px; line-height:28px; border: 1px solid #dedede;">
			软通
			</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {API} from '../../static/api.js'
	import axios from 'axios'

	export default({
		data(){
			return{
				bz1:''
			}
		},
		created(){
			this.$nextTick(function(){
				this.go();
			})
		},
		methods:{
		back:function(){
			this.$router.push('my')
		},	
			b:function(nn){
				var _this = this;
        		sessionStorage.setItem('bz1',nn);
              	this.$router.push('jobList');

			}
			
		}
	})
</script>
<style>
	
	 body{background:#f2f2f2;color:#969797}
      body,div,ul,li,span{margin:0;padding:0;border:0;}
      ._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
      ._top_block{width:100%;height:50px;}
      ._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
      ._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
      ._line{height:2px;background: #f2f2f2;}
</style>