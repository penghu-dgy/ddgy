<template>
	<div>
		


		<div id="list" v-show="isShow==1">
			
		<header class="_head">
    <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" onclick="javascript:history.back();">
    <span style="font-size: 20px;">当前公告</span>
    <img src="../../assets/common/images/add.png" style="position:absolute;right:10px;top:10px;" @click="publishNotice()">
    </header>
    <div class="_top_block"></div>

    
			<ul class="mui-table-view mui-table-view-chevron">

      <li class="mui-table-view-cell mui-media" v-for="item in items" @click="goNoticeDetail(item.noticeid)">
          <a class="mui-navigate-right" style="text-decoration: none">
            <img class="mui-media-object mui-pull-left" src="../../assets/common/images/cbd.jpg">
            <div class="mui-media-body">
              {{item.noticetitle}}
              <p class='mui-ellipsis'>{{item.noticeempname}}--<span style="font-size:12px;">{{item.noticetime}}</span></p>
            </div>
          </a>
        </li>		
				
			</ul>
		</div>


		<div id="detail" v-show="isShow==2">

      <header class="_head">
        <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="changeShow()">
        <span style="font-size: 20px;">{{noticeEntity.noticetitle}}</span>
      </header>
      <div class="_top_block"></div>
  
  
  
      <div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;">

        
        <div class="_line"></div>
        
        <div style="width:100%;height:auto;margin-top:15px;padding-bottom:15px;">
          <p style="margin-left:10px;">
            &nbsp;&nbsp;
            {{noticeEntity.noticecontent}}
            
          </p>
        </div>
        
        <div class="_line"></div>
        <div style="width:100%;height:25px;line-height: 25px;color:black;text-align: right;font-size:14px;">     
          {{noticeEntity.noticeempname}}{{noticeEntity.noticetime}}
        </div>
        <div class="_line"></div>
        <img :src="s" v-for='s in imgs' style="width:40%;margin-left:4%" @click='fangdahou(s)'/> 
      
      </div>
		</div>



		<div id="addNotice" v-show="isShow==3">

      <header class="_head">
      <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"  @click="isShow=1">
      <span style="font-size: 20px;">添加公告</span>
      <img src="../../assets/common/images/save.png" style="position:absolute;right:10px;top:10px;width:25px;height:25px;" @click="addNotice2()">
      </header>
    

      <div class="_top_block"></div>
      

      <form id="frm1">

      <div id="_content" style="width:100%;height:auto;background: white;">

      <div class="_line"  style="height:8px;"></div>
          
      <div style="width:100%;height:45px;line-height: 45px;">
        <span style="display: block;position: absolute;left:10px;">标题：</span><span style="position:absolute;right: 10px;"><input type="text"  style="border:0px;width:250px;text-align: right;" placeholder="请输入标题" name="title" v-model='noticetitle'/></span>
      </div>
      
      <div class="_line"></div>
      <div style="width:100%;height:150px;line-height: 45px;margin-top:2px;">
        <textarea style="position:absolute;width:100%;height:150px;border:0px;" placeholder="请填写公告内容" name="content" v-model='noticecontent'></textarea>
        
      </div>
      
      <div class="_line"></div>


      <div v-for="(item, index) in itemss"  style='display:inline-block ;width:100px;height:100px;overflow:hidden;line-height:150px'  @click='rmar(index)'>
        <img v-bind:src="item" style='width:100px'>
        {{ index }} 
      </div>

      <a  class="file" style='display:inline-block;width:100px;height:100px'>
            <input type="file" name="" id="file" accept= "image/*" capture= "camera">
        </a>


        
      </div>

      </form>




		

		</div>

    <div @click='fangda=!fangda'  style="width:100%;height:100%;background:black;opacity:0.4;z-index=98;position:absolute;top:0;left:0" v-if='fangda'></div>
    <img @click='fangda=!fangda'  :src="url" v-if='fangda' style="width:100%;z-index=99;position:fixed;top:40px;left:0">


	</div>


</template>

<script type="text/javascript">
	//向后台接口发送数据，并获取值
	import {API} from '../../static/api.js'
    import axios from 'axios'
	  export default({
        data(){
            return {
                items:[],
                isShow:1,
                noticeEntity:{},
                token:'',
                imgUrl:'',
                itemss:[],
                noticetitle:'',
                noticecontent:'',
                imgs:[],
                fangda:false,
                url:'',


            }
        },
        created(){
          this.token=localStorage.getItem('token')
            this.$nextTick(function(){
            	//表示页面渲染完成之后
            	//this.initDom();
            	this.noticeListByEntId();
              this.listener();
            })
		    },
        methods:{
          fangdahou:function(i){
            this.url=i
            this.fangda=!this.fangda
          },
            rmar:function(i){
              console.log(i)
              this.itemss.splice(i,1)
            
            },
            escape2Html:function (str) {
             var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
             return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
            },
            listener:function(){
              var _this=this
              document.getElementById('file').addEventListener('change', function() {
                  var reader = new FileReader();
                  reader.onload = function (e) {
                      compress(this.result);
                  };
                  reader.readAsDataURL(this.files[0]);
              }, false);

              var compress = function (res) {
                  var img = new Image(),
                      maxH = 720;
                  img.onload = function () {
                      var cvs = document.createElement('canvas'),
                          ctx = cvs.getContext('2d');
                      if(img.height > maxH) {
                          img.width *= maxH / img.height;
                          img.height = maxH;
                      }
                      cvs.width = img.width;
                      cvs.height = img.height;
                      ctx.clearRect(0, 0, cvs.width, cvs.height);
                      ctx.drawImage(img, 0, 0, img.width, img.height);
                      var dataUrl = cvs.toDataURL('image/jpeg',0.7);
                      _this.imgUrl=dataUrl
                      //console.log(_this.imgUrl)

                      _this.itemss.push(dataUrl)
                      // 上传略
                     //document.write(dataUrl)
                  }
                  img.src = res;
              }
            },

        	  addNotice2:function(){
                  //在这里验证是否输入，如果没有输入，则提示后直接返回
                  //console.log("aaa="+document.getElementById("title").value);
                  var _this = this;



                  if( _this.noticetitle==""){
                      mui.alert('请填写公告标题', '智能工单', function() {
                          
                      });
                      return ;
                  }

                  if(_this.noticecontent==""){
                      mui.alert('请填写公告内容', '智能工单', function() {
                          
                      });
                      return ;
                  }

               
                  /*console.log("sendUnameByForm..");
                    //将表单对象封装成一个js对象
                  var formData=new FormData(document.getElementById("frm1"));
                    //设置内容类型为：multipart/form-data
                  var config={
                          headers:{'Content-Type':'multipart/form-data'}
                      };*/
                      //提交文件对象只能是post方法
                      var b=JSON.stringify(_this.itemss)
                     var param = new URLSearchParams()
                     param.append('token',_this.token)
                     param.append('noticetitle',_this.noticetitle)
                     param.append('noticecontent',_this.noticecontent)
                     param.append('noticeaddress',b)
                     axios.post(API.noticeAdd,param)
                      .then(function (response) {
                          _this.isShow=1;
                          _this.noticeListByEntId();
                          //字段清空
                         
                        _this.noticetitle=''
                        _this.noticecontent=''
                          //document.getElementById("pic").value="";
                        _this.itemss.length=0
                          //obj.outerHTML=obj.outerHTML; 
                      })

                      .catch(function(error){
                           console.log(error);
                        })
                           

                        
                },


              	publishNotice:function(){
              		this.isShow=3;
              	},
              	changeShow:function(){
              		this.isShow = 1;
              	},

        	       goNoticeDetail:function(nid){
        		//this.$router.push('noticeDetail')
        		//发送http请求，获取对应的noticeEntity对象，然后将entity对象的值绑定到详情里面

        		       // console.log("nid==="+nid);
        		        var _this = this;
                    axios.get(API.noticeDetailByNoticeId,{
        					    params: {
              					token:_this.token,
              					noticeid:nid
            				  }
                    }).then(function (response) {
                      	_this.isShow= 2;
                      	//console.log("123");
                	       _this.noticeEntity = response.data.data;
                        var b= _this.escape2Html(_this.noticeEntity.noticeaddress)
                        _this.imgs=JSON.parse(b)
                    }).catch(function (error) {
                        console.log(error);
                });

        	},
            
           noticeListByEntId:function(){
           		var _this = this;
              axios.get(API.noticeListByEntId,{
					     params: {
      					 token:_this.token
    				    }
                }).then(function (response) {
                	//_this.isShow =1;
                	console.log("aaa="+response.data.data[0]);
                	_this.items = response.data.data;
                })
                .catch(function (error) {
                  console.log(error);
                });
              }


          }
    })


</script>

<style scoped>
				 .title {
				margin: 20px 15px 10px;
				color: #6d6d72;
				font-size: 15px;
			}

._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}

._line{width:100%;height:2px;background: #f2f2f2;}
._top_block{width:100%;height:50px;}
</style>