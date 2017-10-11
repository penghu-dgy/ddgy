<template>
	<div>
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
			<h1 class="mui-center mui-title" >企业详情</h1>
		</div>
		<div style="margin-top: 55px;width: 100%;height: 55px;">
			

			<ul class="mui-table-view " style="margin-top:60px;">
					<li class="mui-table-view-cell">
						<a  >
							<img class="mui-media-object mui-pull-left " id="head-img" src="../../assets/common/images/heben.png">
							<div >
								公司名: {{entname}}
								<p class='mui-ellipsis'>管理员：{{entmanager}}</p><p class='mui-ellipsis'>企业人数：{{enttotal}}</p><p class='mui-ellipsis'>创建时间：{{entcreatetime}}</p>
							</div>
						</a>
					</li>
				</ul>




			
		</div>
		
			<div style="width:100%;height:10px;background:#f5f5f5;margin-top:40px; clear:both;"></div>

				<form class="mui-input-group">
					<div class="mui-input-row">
						<label>姓 名 :</label>
						<input class="inp" type="text" placeholder="输入真实姓名" v-model.lazy="empName" style="text-align:left">
					</div>
					<div class="mui-input-row">
						<label>手 机 号 :</label>
						<label>{{mobile}}</label>
					</div>
					<div class="mui-input-row mui-password">
						<label>密 码 :</label>
						<input type="password" class="mui-input-password" v-model.lazy="empPassword">
					</div>
				</form>
				<div class="mui-input-row" style="width: 100%;">
					<textarea id="textarea" rows="5" placeholder="填写身份描述，以便快速通过验证" v-model.lazy="empDetail"></textarea>
				</div>
				<div style="margin-top: 10px;width: 100%;text-align:center">
					<button 
			class="mui-btn mui-btn-primary " style="width: 90%;"@click='next()'>完成</button>
				</div>



	</div>
</template>
<script >
import Vue from 'vue'
import axios from 'axios'
import {API} from '../../static/api'
	export default({
		data(){
			return {
				s:{},
				mobile:'',
				entname:'',
				entcreatetime:'',
				entmanager:'',
				enttotal:'',
				empName:'',
				empPassword:'',
				empDetail:'',
				token:'',   	
				empEnt:''
			}
		},
		created(){
			this.token=sessionStorage.getItem('token'),
			this.entmanager=sessionStorage.getItem('entmanager'),
			this.entcreatetime=sessionStorage.getItem('entcreatetime'),
			this.entname=sessionStorage.getItem('entname'),
			//alert(sessionStorage.getItem('entname'))
			this.mobile=sessionStorage.getItem('mobile')
			this.enttotal=sessionStorage.getItem('enttotal')
			this.empEnt=sessionStorage.getItem('entId')
		},
		
		methods:{
			next:function(){
			var _this=this
			if (_this.empName =='' || _this.empPassword =='') {
				mui.toast('请填写完整信息')
				return
			}
		
			var params = new URLSearchParams();
			params.append('token', _this.token);
			params.append('empName', _this.empName);
			params.append('empPassword', _this.empPassword);
			params.append('empEnt', _this.empEnt);
			params.append('empDetail', _this.empDetail);
			//console.log( _this.mobile)
			axios.post(API.finishEmployeeInfo, params)

			.then(function (response) {
				     
			if (response.data.code===0) {

					alert("申请成功，等待企业管理员审核"),
					_this.$router.push('joinEnterprice3')
				
				  }


			else {

				  alert('填写信息不规范')

			}
			
				     })
				 .catch(function (error) {
				       console.log(error);
				     });




			}
			
		
		}
	})
</script>
<link  href="../../assets/common/styles/mui.min.css">
<link  href="../../assets/common/styles/mui.min.css">
<link  href="../../assets/common/styles/feedback.css" />
<style scoped>

			.inp::-ms-input-placeholder {
			text-align: left;
			}
			.inp::-webkit-input-placeholder {
			text-align: left;
			}
			.inp:-moz-placeholder {
			text-align: left;
			}
			.inp::-moz-placeholder {
			text-align: left;
			}
			.inp:input-placeholder {
			text-align: left
			}
		
</style>
