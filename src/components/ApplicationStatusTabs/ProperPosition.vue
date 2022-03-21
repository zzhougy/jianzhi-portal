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
<!--          <span class="pipei">简历匹配度</span>-->
          <el-image
                  style="width: 100px; height: 100px"
                  :src="item.jobInfo.recruitUnit.unitImageUrl"
                  :fit="fit"></el-image>
          <div style="width: 450px">
            <!--            <p class="receiveInfo" style="margin: 10px 0px 0px 12px">{{item.jobInfo.recruitUnit.name}} 的  {{item.jobInfo.jobName}}  岗位</p>-->
            <p class="receiveInfo" style="margin: 10px 0px 0px 12px">{{item.jobInfo.jobName}}</p>
            <p class="el-icon-location-outline" style="margin: 10px 0px 0px 12px">{{item.jobInfo.location}}</p>
            <p class="el-icon-time" style="margin: 10px 0px 0px 12px">{{item.jobInfo.workTime}}</p>
            <p class="el-icon-office-building" style="margin: 10px 0px 0px 12px">{{item.jobInfo.recruitUnit.name}}</p>
            <p style="margin: 10px 0px 0px 12px">{{item.jobInfo.salaryTreatment}}</p>
          </div>
          <div>
            <p class="receive" style="left:200px;top: 25px">{{item.createTime}}</p>
            <p class="receive" style="left:200px;top: 25px" v-if="item.status == 1">申请状态：已提交</p>
            <p class="receive" style="left:200px;top: 25px" v-if="item.status == 2">申请状态：待沟通</p>
            <p class="receive" style="left:200px;top: 25px" v-if="item.status == 3">申请状态：不合适</p>
            <p class="receive" style="left:200px;top: 25px" v-if="item.status == 4">申请状态：已录用</p>
          </div>


        </div>



      </el-card>
    </div>
  </div>
</template>


<script>
  //import fetch from '../../api/fetch'
  import store from "@/store";

  export default {
    data() {
      return {
        resumeList:[],
        list: [],
        hasContent: true,
        getResumev: false,
        loginInfo: store.state,
        viewResume:false,
        reverse: false,
      }
    },
    mounted() {
      this.getResumeList()
    },
    methods: {
      getResumeList() {

        this.$axios.post("/jobseekerJobRelation/list",{status:4}).then(res=>{
          if (res.code == 200){
            if (res.data.records.length == 0){
              this.hasContent = false;
            }else {
              this.resumeList = res.data.records
            }
          }

          console.log('res11111111111111111111' , res.data)
        })
      },
      clickViewResume(){
        this.viewResume=true;
      },
      setCategory(row){
        // console.log('row' , row)
        if(row.status==0){
          return "不选择"
        }else if(row.status==1){
          return "原材料"
        }else if(row.status==2){
          return "半成品"
        }else if(row.status==3){
          return "成品"
        }
      },
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
