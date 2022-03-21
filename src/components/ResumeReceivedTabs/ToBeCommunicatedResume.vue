<template>
  <div class="getResumeWrap">
    <div :hidden="hasContent" class="nofind">
<!--      <img-->
<!--        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png" style="margin: 0 auto">-->
      <p>暂时没有记录哦</p>
    </div>
    <div v-for="(item, index) in resumeList" :key="index" :hidden="!hasContent">

      <el-card shadow="hover" class="receiveBox">
        <div class="flex">
          <!--          <el-progress :width="80" type="circle" :percentage="item.rate" color="#A6F6AF" class="circle"></el-progress>-->
          <img width="80px" height="80px" :src="item.jobSeeker.imgUrl">
          <!--          <span class="pipei">简历匹配度</span>-->
          <p class="receiveInfo">收到{{item.jobSeeker.name}}的{{item.jobInfo.jobName}}求职信息</p>
          <p class="receive" style="width: 100px;left:-9px" >{{item.createTime}}</p>
          <el-button @click="clickViewResume(item)" class="clickbtn">查看</el-button>
          <el-button  class="clickbtn" @click="clickUnprocessedResume(item)">待处理</el-button>
          <el-button  class="clickbtn" @click="clickImproperResume(item)">不合适</el-button>
          <el-button  class="clickbtn" @click="clickProperResume(item)">录用</el-button>
        </div>
        <!--        <p class="receive">{{item.createTime}}</p>-->
      </el-card>
      <el-dialog :title="item2.jobSeeker.name+'的简历'" :visible.sync="viewResume">
        <table border="1" cellspacing="0" style="border-color:#ededed" class="mytable">
          <tr>
            <td>头像：</td>
            <td>
              <img width="80px" height="80px" :src="item2.jobSeeker.imgUrl">
            </td>
          </tr>
          <tr>
            <td>姓名：</td>
            <td>{{item2.resume.resName}}</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{item2.resume.resSex}}</td>
          </tr>
          <tr>
            <td>年龄：</td>
            <td>{{item2.jobSeeker.birthday}}</td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>{{item2.resume.resEmail}}</td>
          </tr>
          <tr>
            <td>联系方式：</td>
            <td>{{item2.resume.resPhone}}</td>
          </tr>
          <!--          <tr>-->
          <!--            <td>性别：</td>-->
          <!--            <td>{{resumeList.sex}}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>电话：</td>-->
          <!--            <td>{{resumeList.phone}}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>邮箱：</td>-->
          <!--            <td>{{resumeList.email}}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>地址：</td>-->
          <!--            <td>{{resumeList.address}}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>学校：</td>-->
          <!--            <td>{{resumeList.school}}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>毕业时间：</td>-->
          <!--            <td>{{resumeList.endTime}}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>技术栈：</td>-->
          <!--            <td>-->
          <!--          <tr v-for="(item, key) in resumeList.skills" :key="key">-->
          <!--            <td class="progress2">{{item.name}}</td>-->
          <!--            <td class="progress2">熟悉程度：-->
          <!--              <el-progress :text-inside="true" :stroke-width="15" :percentage="item.level*25"></el-progress>-->
          <!--            </td>-->
          <!--          </tr>-->
          <!--          </td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>实习（工作）经历：</td>-->
          <!--            <td>{{resumeList.experience}}</td>-->
          <!--          </tr>-->
          <tr>
            <td>自我描述：</td>
            <td>{{item2.resume.resDesc}}</td>
          </tr>
          <tr>
            <td>附件简历：</td>
            <td><div class="download-link">
              <a
                      ref="resumeDownloadLink"
                      :href="item2.resume.resumeAttachUrl"
              >下载查看
                <i class="el-icon-download">
                </i>
              </a>
            </div></td>
          </tr>
        </table>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  //import fetch from '../../api/fetch'
  import store from "@/store";

  export default {
    data() {
      return {
        // getResumeList: {
        //   name: '',
        //   sex: '',
        //   age: '',
        //   skills: [{
        //     id: 1,
        //     name: '',
        //     level: '',
        //     resumeId: 1
        //   }],
        //   school: '',
        //   address: '',
        //   endTime: 2019,
        //   phone: '',
        //   email: '',
        //   introduce: '',
        //   experience: '',
        //   awards: '',
        //   avatar: ''
        // },
        resumeList:[],
        list: [],
        show: false,
        getResumev: false,
        loginInfo: store.state,
        viewResume:false,
        hasContent: true,
        item2:{
          jobSeeker:{
            name:'',
            imgUrl:'',
            birthday:''
          },
          resume:{
            resName:'',
            resSex:'',
            resEmail:'',
            resPhone:'',
            resDesc:'',
            resumeAttachUrl:''
          }}
      }
    },
    mounted() {
      this.getResumeList()
    },
    methods: {
      getList() {
        // fetch.receiveResume().then(res => {
        //   this.list = res.data.data.receiveList
        //   if (this.list.length === 0) {
        //     this.show = true
        //   }
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      getResumeList() {

        this.$axios.post("/jobseekerJobRelation/list",{userId:this.loginInfo.userInfo.id,status:2}).then(res=>{
          if (res.code == 200){
            if (res.data.records.length == 0){
              this.hasContent = false;
            }else {
              this.resumeList = res.data.records
            }
          }

          console.log('res11111111111111111111' , res.data.records)
        })
      },
      getTableList(id) {
        // this.getResumev = true
        // fetch
        //   .getResume(id)
        //   .then(res => {
        //     if (res.status === 200) {
        //       if (res.data.success === true) {
        //         if (res.data.data !== null) {
        //           this.getResumeList = res.data.data
        //         }
        //       }
        //     }
        //   })
        //   .catch(e => {
        //     console.log(e)
        //   })
      },
      clickViewResume(item){
        this.viewResume=true;
        console.log('item' , item)
        this.item2.jobSeeker.name = item.jobSeeker.name
        this.item2.jobSeeker.imgUrl = item.jobSeeker.imgUrl
        this.item2.jobSeeker.birthday = item.jobSeeker.birthday
        this.item2.resume.resName = item.resume.resName
        this.item2.resume.resSex = item.resume.resSex
        this.item2.resume.resEmail = item.resume.resEmail
        this.item2.resume.resPhone = item.resume.resPhone
        this.item2.resume.resDesc = item.resume.resDesc
        this.item2.resume.resumeAttachUrl = item.resume.resumeAttachUrl
      },
      clickImproperResume(val){
        this.editResumeStatus(val.id,3)
      },
      clickProperResume(val){
        this.editResumeStatus(val.id,4)
      },
      clickUnprocessedResume(val){
        this.editResumeStatus(val.id,1)
      },
      editResumeStatus(id,status){
        this.$axios.post("/jobseekerJobRelation/edit",{id:id,status:status}).then(res=>{
          if (res.code==200){
            this.getResumeList();
          }
        })
      }
    }
  }
</script>
<style>
  .getResumeWrap {
    height: 1000px;
    overflow: scroll;
  }

  .getResumeWrap::-webkit-scrollbar {
    display: none;
  }

  .progress2 {
    width: 182px;
    border: 0;
  }

  .mytable {
    width: 100%;
    height: 700px;
  }

  .clickbtn {
    height: 35px;
    margin-top: 14px;
  }

  .pipei {
    position: relative;
    top: 82px;
    left: -76px;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
  }

  .receiveInfo {
    margin: 28px auto auto 14px;
  }

  .receive {
    position: relative;
    left: 330px;
  }

  .receiveBox {
    margin-bottom: 14px;
    width: 100%;
  }

  .nofind p {
    font-size: 18px;
    color: #909399;
  }

  .nofind img {
    width: 350px;
    height: 280px;
    margin: 28px 28rem auto auto;
  }
</style>
