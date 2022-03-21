<template>
  <div style="padding-left: 200px">
    <table class="container">
      <th v-if="!isEdit"> 新增岗位</th>
      <th v-if="isEdit"> 编辑岗位</th>
    </table>
    <el-form  :model="jobInfo" status-icon ref="list" label-width="100px" class="formWrap">
      <el-form-item label="岗位名称" prop="name">
        <el-input v-model="jobInfo.jobName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="兼职时间" prop="location">
        <el-input v-model="jobInfo.workTime" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地点" prop="location">
        <el-input v-model="jobInfo.location" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="兼职标签" prop="location">
<!--        <el-input v-model="jobInfo.label" placeholder="日结、java、计算机、开发" auto-complete="off"></el-input>-->
        <el-select v-model="jobInfo.label" multiple placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位描述" prop="location">
        <el-input v-model="jobInfo.detail" placeholder="具体内容，地点" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="岗位要求" prop="location">
        <el-input v-model="jobInfo.requirement" placeholder="岗位要求，人员要求" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="薪资待遇" prop="location">
        <el-input v-model="jobInfo.salaryTreatment" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="简历附件" prop="location">
<!--        <el-input v-model="jobInfo.needResumeAttachment" auto-complete="off"></el-input>-->
        <el-radio v-model="jobInfo.needResumeAttachment" label='0'>不需要</el-radio>
        <el-radio v-model="jobInfo.needResumeAttachment" label='1'>需要</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button class='editor' @click="changeEdit">返回</el-button>
        <el-button  @click="submitInfo()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import store from "@/store";
export default {
  props: ['list', 'imageUrl'],
  data () {
    return {
      isEdit: false,
      companyOptions: [],
      jobOptions: [],
      intentionCompany: [],
      intentionJob: [],
      loginInfo: store.state,
      jobInfo:{
        needResumeAttachment:'0',
      },
      options: [],
      value1: [],
    }
  },
  mounted() {
    // this.getCompanyName()
    // this.getJobName()
    // this.getUnitInfo();
    this.init();
  },
  watch: {
    list(val, oldVal) {
      if (val !== oldVal) {
        this.intentionCompany = this.list.intentionCompany.split(',') || ''
        this.intentionJob = this.list.intentionJob.split(',') || ''
      }
    },
    //监听路由发生变化则刷新
    $route (to, from) {
      this.$router.go(0)
    }

  },
  methods: {
    changeEdit () {
      this.isEdit = !this.isEdit
    },
    // 提交信息
    submitInfo () {
      console.log('this.jobInfo' , this.jobInfo)
      //新增
      this.jobInfo.userId = this.loginInfo.userInfo.id
      this.jobInfo.label = JSON.stringify(this.jobInfo.label)
      if (!this.isEdit){
        this.$axios.post("/jobInfo/add",this.jobInfo).then(res=>{
          if (res.code == 200){
            this.$message.success("操作成功")
            //重置表单
            return (this.jobInfo = {});
          }
        })
      }else {
        console.log('this.jobInfo1' , this.jobInfo)
        this.$axios.post("/jobInfo/edit",this.jobInfo).then(res=>{
          if (res.code == 200){
            this.$message.success("操作成功")
            this.isEdit = false;

            //重置表单
            return (this.jobInfo = {});
          }
        })
      }

    },
    //查询标签
    queryJobLabelList(){
      this.$axios.post("/jobLabel/list",{}).then(res=>{
        if(res.code==200){
          this.options = res.data.records
          console.log('33'  )
        }
      })
    },
    //初始化判断是新增还是编辑
    init(){
      this.queryJobLabelList();

      console.log('jobId111' , this.$route.query.jobId)
      if (this.$route.query.jobId!=null){//传参数jobid表示编辑
        this.isEdit = true;
        console.log('4刚给他提供'  )
        this.$axios.get("/jobInfo/getById?id="+this.$route.query.jobId).then(res=>{
          if(res.code==200){
            this.jobInfo = res.data
            this.jobInfo.label = [1];

            console.log('33' ,this.jobInfo )
          }
        })
      }
    }
  }
}
</script>
<style>
  table {
    width: 600px;
    font-size: 16px
  }

  table tr td {
    padding: 11.2px;
    text-align: left;
  }

  .formWrap {
    width: 500px;
    font-size: 18px;
  }

  .edit {
    margin:10px auto auto 40px;
  }
</style>
