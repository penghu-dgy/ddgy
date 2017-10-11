<template>
	<div>
<header id="header" class="mui-bar mui-bar-nav">
	<a class=" mui-icon mui-icon-left-nav mui-pull-left" @click='my()'></a>
	<span class="mui-title">邀请同事</span>
</header>
<div style="width: 100%;height: 130px;margin-top: 50px;padding-top: 35px;text-align:center">
	<span style="font-size:25px;color: #DF4F4E;">企业代码：{{empent}}</span><p></p>
	<span style="font-size:15px;color: #686868;">让同事主动加入，申请时填写企业代码</span>
</div>
	<!-- <ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="#account">
					<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/erweima.png">
					<div class="mui-media-body">
								二维码
							<p class='mui-ellipsis'>扫一扫加入企业</p>
					</div>
				</a>
			</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="#account">
					<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/yaoqinglianjie.png">
					<div class="mui-media-body">
								发送邀请链接
							<p class='mui-ellipsis'>可分享至QQ/微信/钉钉 等应用</p>
					</div>
				</a>
			</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="#account">
					<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/tongxunludaoru.png">
					<div class="mui-media-body">
								通讯录导入
							<p class='mui-ellipsis'>手机通讯录快速选择同事</p>
					</div>
				</a>
			</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="#account">
					<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/shoujihaoyaoqing.png">
					<div class="mui-media-body">
								手机号邀请
							<p class='mui-ellipsis'>填写手机号立即邀请同事</p>
					</div>
				</a>
			</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right" href="#account">
					<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../assets/common/images/PCduanpiliangdaoru.png">
					<div class="mui-media-body">
								PC端批量导入
							<p class='mui-ellipsis'>快速导入公司通讯录，见到高效</p>
					</div>
				</a>
			</li>
	</ul> -->

</div>

</template>


<style scoped>
	

</style>

<script>
	import axios from 'axios'
	export default({
		data(){
			return{
				empent:'',
			}
		},
		methods:{
			my:function(){
				this.$router.push("my")
			}
		},
		created(){
			
			this.empent=sessionStorage.getItem('empent')
		}


	})

</script>