<template>
	<div>
		<div style="float:left;">
			
			<p  @click="b('门框')" style="display: inline-block; text-align: center; width:80px; height:30px; line-height:28px; border: 1px solid #dedede;">
			门框
			</p>
		</div>
		<div style="float:left; margin-left:100px">
			
			<p @click="b('卵痛')"  style="display: inline-block; text-align: center; width:80px; height:30px; line-height:28px; border: 1px solid #dedede;">
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
			
			b:function(nn){
				var _this = this;
        		sessionStorage.setItem('bz1',nn);
              	this.$router.push('myJobList');

			}
			
		}
	})
</script>