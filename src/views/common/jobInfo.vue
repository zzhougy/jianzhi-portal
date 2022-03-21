<template>
  <div class="zhou">
<!--    <div class="banner">兼职系统欢迎你</div>-->
<!--    <el-card v-if="isShow" class="jobcard">-->
<!--      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png">-->
<!--      <p>啊哦，职位已经下线了</p>-->
<!--    </el-card>-->
    <div v-if="!isShow">
<h1 align="center">岗位信息</h1>
      <el-card class="jobcard" style="height: 200px;">
        <img class="avatar" :src="jobDetail.recruitUnit.unitImageUrl">
        <div class="introduce">
          <p class="title">单位：{{jobDetail.recruitUnit.name}}</p>
          <p>简介：{{jobDetail.recruitUnit.profile}}</p>
          <p>{{jobDetail.recruitUnit.location}}<span>|</span>{{jobDetail.recruitUnit.fieldStr}}</p>
        </div>
      </el-card>
      <el-card class="jobcard" style="margin-top: 50px">
        <div class="job-detail">
          <h2 style="margin-top: 5px">{{ jobDetail.jobName }}</h2>
          <h3 class="job-detail-title"></h3>
<!--        <div class="jobintroduce">职位介绍</div>-->
<!--        <div class="jobcontent">-->
<!--          <p>{{ jobDetail.jobName }}</p>-->
<!--        </div>-->
<!--        <div class="jobintroduce">联系hr</div>-->
<!--        <div class="hrinfo">-->
<!--          <span><i class="el-icon-news"></i>{{hr.username}}</span>-->
<!--          <a :href="`mailto:${hr.email}`"><span><i class="el-icon-message"></i>{{hr.email}}</span></a>-->
<!--        </div>-->


          <div class="job-detail-subTitle" v-if="jobDetail.id">
      <span class="city_info">{{ jobDetail.location }}</span>&nbsp;|
            <span class="job_category">{{ jobDetail.labelStr }}</span>&nbsp;|
            <span class="recruit_type">{{ jobDetail.salaryTreatment }}</span>
          </div>
          <div class="job-detail-description job-detail-block">
            <h3 style="margin-top: 40px">岗位描述</h3>
            <pre class="textContent" style="font-size: 14px">{{ jobDetail.detail }}</pre>
          </div>
          <div class="job-detail-requirement job-detail-block">
            <h3 style="margin-top: 40px">岗位要求</h3>
            <pre class="textContent" style="font-size: 14px">{{ jobDetail.requirement }}</pre>
          </div>
          <div class="job-detail-button job-detail-block">
            <!--      <bytedance-button @click="delivery" size="large">投递</bytedance-button>-->
            <el-button @click="delivery" size="large" v-if="loginInfo.userInfo.type != 2">申请岗位</el-button>
            <el-button @click="goToAsk" size="large" v-if="loginInfo.userInfo.type != 2">在线咨询</el-button>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>


<script>
  // import fetch from '../api/fetch'
  import store from "@/store";
  export default {
    data() {
      return {
        company: [],
        hr: [],
        recruit: [],
        recruitId: 0,
        title: '',
        isShow: false,
        jobDetail: {},
        loginInfo: store.state,
        unitImageUrl:'',
      }
    },
    mounted() {
      // this.getJobDetail()
      this.queryJobByid();
    },
    computed: {
      isHr() {
        if (localStorage.getItem('role') === '1') {
          return true
        }
        return false
      },
      isLogin() {
        return localStorage.getItem('token') ? true : false
      }
    },
    methods: {
      getJobDetail() {
        // let jobId = localStorage.getItem('jobId')
        // fetch
        //   .getJobDetail(jobId)
        //   .then(res => {
        //     if (res.status === 200) {
        //       if (res.data.data === null) {
        //         this.isShow = true
        //       }
        //       if (res.data.success === true) {
        //         this.company = res.data.data.company
        //         this.hr = res.data.data.hr
        //         this.recruit = res.data.data.recruit
        //         this.recruitId = this.recruit.id
        //         this.title = this.recruit.title
        //       }
        //     }
        //   })
        //   .catch(e => {
        //     console.log(e)
        //   })
      },
      sendResume() {
        // let body = {
        //   recruitId: this.recruitId,
        //   title: this.title
        // }
        // fetch.deliveryReusme(body).then(res => {
        //   if (res.status === 200) {
        //     this.$message({
        //       message: res.data.data,
        //       type: 'success'
        //     })
        //   }
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      queryJobByid() {
        console.log('loginInfo' , this.loginInfo)
        const {id} = this.$route.params;
        this.$axios.get("/jobInfo/getById", {params: {id: `${id}`}}).then(res => {
          if (res.code === 200) {

            this.jobDetail = res.data;
            console.log('resl111', res)
          }
        })
      },
      delivery(){
        //判断简历的更新时间是否为空，为空提示去完善简历
        this.$axios.post("/resume/getOne",{}).then(res=>{
          if (res.code==200){
            if (res.data.updateTime==null||res.data.updateTime===''){
              this.$message.error('请先完善简历');
            }else {//可以投递
              this.$axios.post("/jobseekerJobRelation/add",{recruitUnitId:this.jobDetail.recruitUnitId, jobId:this.jobDetail.id})
                  .then(res=>{
                    if (res.code==200){
                      this.$message.success(res.data.msg);
                    }

                  })
            }
          }
        })


      },
      goToAsk(){
        //location.href=`http://${res.data.ip}/#/sys-check?t=${res.data.token}`
        sessionStorage.setItem('params.name','param.data');
        localStorage.setItem('params.name','param.data');
        let return_url = window.location.href;
        // console.log('dd' +this.baseIMURL)
        //this.$message.success(process.env.VUE_APP_BASE_API_IM)
        //this.$message.success(process.env.VUE_APP_BASE_API)

        //查hr的用户名
        let hruserid = this.jobDetail.creator;
        this.$axios.get("/user/getInfoById/"+hruserid).then(res=>{
          if (res.code == 200){
            let hrusername = res.data.username;
                location.href=`${process.env.VUE_APP_BASE_API_IM}/sys-check?t=${sessionStorage.getItem('JWT_TOKEN')}&to=${hrusername}&return_url=${return_url}`
          }
        })



         //  var form = document.createElement("form");
         //  form.action = "http://localhost:8081";
         // // form.method = 'post';
         //  form.style.display = "none";
         //  document.body.appendChild(form);
         // // params.forEach(function (param) {
         //    sessionStorage.setItem('params.name','param.data');
         // // });
         //  form.submit();
         //  return form;

      }
    },
  }
</script>
<style scoped>

  .zhou{
    margin-top:90px;
    /*background-image: url(../../static/images/background5.jpg);*/
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  div .jobcard {
    width: 1000px;
    margin: 20px auto auto auto;
  }

  .avatar {
    float: left;
    width: 126px;
    height: 110px;
  }

  .title {
    font-size: 21px;
  }

  .introduce {
    margin-left: 140px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .introduce p {
    margin: 8px;
  }

  p span {
    margin: 14px;
  }

  .jobintroduce {
    border-left: 5px solid #888;
    text-align: left;
    padding-left: 8px;
  }

  .jobcontent {
    height: 100px;
    margin: 15px auto 15px auto;
    text-align: left;
  }

  .hrinfo {
    margin: 14px auto 42px auto;
    float: left;
  }

  .hrinfo span {
    margin-right: 14px
  }

  .jobbtn {
    float: right;
    margin-bottom: 20px;
  }

  .banner {
    height: 400px;
    line-height: 400px;
    color: #fff;
    width: 100%;
    min-width: 1300px;
    /*background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/joblistbanner2x.jpg");*/
    background-image: url("../../static/images/zzz.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    font-size: 32px;
  }
</style>
