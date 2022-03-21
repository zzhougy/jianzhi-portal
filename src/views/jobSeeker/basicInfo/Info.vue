<template>
  <div class="info">
    <p class="title">编辑个人资料</p>
    <hr/>
    <div class="personal">
      <div style="text-align: center; margin-bottom: 10px">
        <!--            <img v-if="imageUrl" width="80px" height="80px" style="border-radius: 40px"-->
        <!--                 src="https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/111/1611987793378.jpg"/>-->
        <!--            <img v-else width="80px" height="80px" style="border-radius: 40px"/>-->
        <img width="80px" height="80px" :src="imageUrl">
        <div style="margin: 10px">
          <!--              <el-upload-->
          <!--                      class="avatar-uploader"-->
          <!--                      action="/file/upload"-->
          <!--                      :show-file-list="false"-->
          <!--                      :on-success="handleAvatarSuccess"-->
          <!--                      :before-upload="beforeAvatarUpload">-->
          <el-upload
                  class="upload-demo"
                  ref="upload"
                  action
                  multiple="false"
                  limit="1"
                  :on-preview="handlePreview"
                  :on-change="changelist"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">更改头像</el-button>
<!--            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传头像</el-button>-->

            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </div>
      </div>




      <el-form :model="basicData" class="demo-ruleForm" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="basicData.username" placeholder="用户名" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum" label="学校">
          <el-input  placeholder="学校" v-model="basicData.schoolName" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum" label="学号">
          <el-input  placeholder="学号" v-model="basicData.sno" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum" label="姓名">
          <el-input  placeholder="姓名" v-model="basicData.name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum" label="年级">
          <el-input  placeholder="年级" v-model="basicData.grade" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input  placeholder="性别" v-model="basicData.sex" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机">
          <el-input  placeholder="手机" v-model="basicData.phone" ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="basicData.email" placeholder="邮箱"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="save()" style="float:right;margin-right: 250px">保存</el-button>
      <el-button @click="goback" style="float:right;margin-right: 5px">返回</el-button>
<!--    <div class="btn">-->
<!--      <div >保存</div>-->
<!--      <div >取消</div>-->
<!--    </div>-->
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cities } from '../../../assets/data/form'
import {submitUpload,fileDownLoad} from '@/utils/ossCommonMethods'
// import { updateUserMsg, getUserOfId } from './index'


export default {
  name: 'info',
  data: function () {
    return {
      cities: [],
      basicData:{},
      imageUrl:"https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/111/1611987793378.jpg",//头像
      fileList:[],//头像
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.cities = cities
  },
  mounted () {
    // this.getMsg(this.userId)
    this.queryData()
    var element = document.createElement("script");
    element.src = "http://gosspublic.alicdn.com/aliyun-oss-sdk-6.12.0.min.js";
    document.body.appendChild(element);


  },
  methods: {
    queryData(){
      this.$axios.post("/jobSeeker/getOne",{}).then(res=>{
        if (res.code == 200){
          this.basicData = res.data
          this.queryUnitImag()
        }
      })
    },
    save(){
      this.$axios.post("/jobSeeker/edit",this.basicData).then(res=>{
        if (res.code == 200){
          this.$message.success("操作成功");
          this.queryData();
        }else {
          this.$message.error("操作失败");
        }
      })
    },
    getMsg (id) {
    },
    goback () {
      this.$router.go(-1)
    },
    saveMsg () {
      let d = new Date(this.registerForm.birth)
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('id', this.userId)
      params.append('username', this.registerForm.username)
      params.append('password', this.registerForm.password)
      params.append('sex', this.registerForm.sex)
      params.append('phone_num', this.registerForm.phoneNum)
      params.append('email', this.registerForm.email)
      params.append('birth', datetime)
      params.append('introduction', this.registerForm.introduction)
      params.append('location', this.registerForm.location)
      // updateUserMsg(params)
      //   .then(res => {
      //     if (res.code === 1) {
      //       this.showError = false
      //       this.showSuccess = true
      //       this.$store.commit('setUsername', this.registerForm.username)
      //       this.$notify.success({
      //         title: '编辑成功',
      //         showClose: true
      //       })
      //       setTimeout(function () {
      //         this.$router.go(-1)
      //       }, 2000)
      //     } else {
      //       this.showSuccess = false
      //       this.showError = true
      //       this.$notify.error({
      //         title: '编辑失败',
      //         showClose: true
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    //上传之后
    handlePreview(file){
      console.log("kkkk",file);
    },
    //选择文件
    changelist(file) {
      console.log(file)
      this.fileList.push(file.raw);

      //提交云端
      this.submitUpload();
    },
    //移除上传列表文件
    handleRemove(file, fileList) {
      this.fileList = [];
      this.fileList = fileList;
    },
    //提交云端
    async submitUpload(){
      var result = await submitUpload(this.fileList,'jobSeeker/'+this.basicData.id+'/image','jobSeekerImage',{used : '1',jobseekerId:this.basicData.id});

      if (result.code == 200){
        this.fileList = [];//防止提交重复数据
        this.queryUnitImag();
      }
    },
    queryUnitImag(){
      this.$axios.post("/aliyunOss/getOne",{used:1,jobseekerId:this.basicData.id}).then(res=>{
        if (res.code == 200){
          this.imageUrl = 'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/' + res.data.filePath;
        }else {
          this.imageUrl = ""
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/stycle-zhou/info';
</style>
