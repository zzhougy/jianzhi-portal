<template>
  <div class="info">
<!--    <p class="title">资料</p>-->
<!--    <hr/>-->
      <div class="personal">
        <el-form ref="formInfo" v-loading="listLoading" :rules="rules" :model="formInfo">

          <div style="text-align: center; margin-bottom: 10px">
<!--            <img v-if="imageUrl" width="80px" height="80px" style="border-radius: 40px"-->
<!--                 src="https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/111/1611987793378.jpg"/>-->
<!--            <img v-else width="80px" height="80px" style="border-radius: 40px"/>-->
           <img width="80px" height="80px" style="border-radius: 40px" :src="imageUrl">
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
                      :hidden="formInfo.status == 3 ? true : false"
                      >
                <el-button slot="trigger" size="small" type="primary">选择Logo</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传Logo</el-button>

                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>

              <div>
                <p style="color: #20a0ff; font-size: 14px" v-if="formInfo.status == 2">已认证</p>
                <p style="color: #20a0ff; font-size: 14px" v-if="formInfo.status == 1">审核中</p>
                <p style="color: red; font-size: 14px" v-if="formInfo.status == 3">未认证</p>
              </div>

            </div>
          </div>

          <div class="form-item">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formInfo.name" :disabled="formInfo.status == 3 ? false : true"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="地址" prop="location">
              <el-input v-model="formInfo.location" :disabled="formInfo.status == 3 ? false : true"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="领域" prop="field">
<!--              <el-input v-model="formInfo.fieldStr" :disabled="formInfo.status == 3 ? false : true"/>-->
              <el-input :disabled="formInfo.status == 3 ? false : true"  placeholder="景点"></el-input>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="规模" prop="scale">
              <el-input v-model="formInfo.scale" :disabled="formInfo.status == 3 ? false : true"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="简介" prop="profile">
              <el-input type="textarea" rows="10" v-model="formInfo.profile" :disabled="formInfo.status == 3 ? false : true"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="相关证明" prop="profile">

              <el-upload
                      class="upload-demo"
                      ref="upload"
                      action
                      multiple
                      :on-preview="handlePreview2"
                      :on-change="changelist2"
                      :on-remove="handleRemove2"
                      :file-list="fileList2"
                      :auto-upload="false">
              <el-button size="small" type="primary">选择文件</el-button><!--【已审核通过的就不显示】-->
              <div slot="tip" class="el-upload__tip">上传证明照片，注：照片信息清晰可见，照片内容真实有效，不做任何修改，大小不超过10M。企业需上传营业执照,校园组织等只需上传相关证明</div>
            </el-upload>


            </el-form-item>
          </div>
          <div style="text-align: center">
            <el-button type="primary" @click="saveInfo('formInfo')" >保存</el-button>
            <el-button type="primary" @click="subAuth()">提交审核</el-button>
          </div>

        </el-form>
      </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cities } from '../../../assets/data/form'
import {submitUpload,fileDownLoad} from '@/utils/ossCommonMethods'
// import { updateUserMsg, getUserOfId } from './index'

export default {
  name: 'UnitInfo',
  data: function () {
    return {
      registerForm: { // 注册
        username: '',
        password: '',
        sex: '',
        phoneNum: '',
        email: '',
        birth: '',
        introduction: '',
        location: ''
      },
      cities: [],



      formInfo: {
        status:3//默认为新注册用户
      },//单位信息
      user: {},
      listLoading: false,
      inputVisible: false,
      inputValue: '',
      stateValue: ['待审核', '未认证', '禁用', '已认证'],
      rules: {
        id: [
          {required: true, message: 'ID不存在', trigger: 'blur'},
        ],
        companyName: [
          {required: true, message: '请输入公司名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        companyContent: [
          {required: true, message: '请输入公司简介', trigger: 'blur'},
        ],
      },
      fileList:[],//头像
      fileList2:[],//审核文件
      imageUrl:"https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/111/1611987793378.jpg",//单位头像
      recruitUnitId:0,//记录当前单位id
    }
  },
  methods: {
    getMsg (id) {
    },
    goback () {
      this.$router.go(-1)
    },
    queryUnitInfo(){
      this.$axios.post("/recruitUnit/getOne",{}).then(res=>{
        if (res.code == 200){
          console.log('vvvvvvvvvvvvvvv' , res)
          this.formInfo = res.data
          this.recruitUnitId = this.formInfo.id
          console.log('this.recruitUnitId' , this.recruitUnitId)
          this.queryUnitImag();
        }else {
          this.$alert(
              '<strong>您暂不属于任何单位！</strong>' +
              '<br>您可以提交单位审核信息作为单位管理者，' +
              '<br>或者等待单位邀请您的加入。', '提示信息', {
                dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }

      })

    },
    //上传之后
    handlePreview(file){
      console.log("kkkk",file);
    },
    //选择文件
    changelist(file) {
      console.log(file)
      this.fileList.push(file.raw);
    },
    //移除上传列表文件
    handleRemove(file, fileList) {
      this.fileList = [];
      this.fileList = fileList;
    },
    //点击提交云端
    async submitUpload(){
      console.log('this.recruitvvunitIdvvvvvvvvv',this.recruitUnitId )
      var result = await submitUpload(this.fileList,'recruitUnit/'+this.recruitUnitId+'/','recruitUnitImage',{used : '1',recruitUnitId:this.recruitUnitId});

      if (result.code == 200){
        this.fileList = [];//防止提交重复数据
        this.queryUnitImag();
      }
    },
    queryUnitImag(){
      this.$axios.post("/aliyunOss/getOne",{used:1,recruitUnitId:this.recruitUnitId}).then(res=>{
        if (res.code == 200){
          this.imageUrl = 'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/' + res.data.filePath;
        }else {
          this.imageUrl = ""
        }
      })
    },
    //上传之后
    handlePreview2(file){
      console.log("kkkk",file);
    },
    //选择文件
    changelist2(file) {
      console.log(file)
      this.fileList2.push(file.raw);
    },
    //移除上传列表文件
    handleRemove2(file, fileList) {
      this.fileList2 = [];
      this.fileList2 = fileList2;
    },
    async subAuth(){

      if (this.fileList2.length==0){
        this.$message.error("未选择审核文件");
        return ;
      }

      //插入招聘单位信息表中
      await this.$axios.post("/recruitUnit/add",this.formInfo).then(res=>{
        if (res.code==200){
          console.log(''  )
        }else {
          this.$message.error("提交失败，请重试");
          return;
        }
      })




      //提交审核文件
      var result = await submitUpload(this.fileList2,'recruitUnit/'+this.recruitUnitId+'/','recruitUnitAuthFiles',{used : '2'});
      if (result.code == 200){
        this.fileList2 = [];//防止提交重复数据

        this.queryUnitInfo()//提交成功回显数据
      }
      console.log('this.fileList2' ,this.fileList2 )
    }

  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.cities = cities
    this.queryUnitInfo()
  },
  mounted () {
    this.getMsg(this.userId)
    var element = document.createElement("script");
    element.src = "http://gosspublic.alicdn.com/aliyun-oss-sdk-6.12.0.min.js";
    document.body.appendChild(element);
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/stycle-zhou/info';
</style>
