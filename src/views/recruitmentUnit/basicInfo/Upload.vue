<template>
  <div class="upload">
    <p class="title">修改密码</p>
    <hr/>
<!--    <div class="section">-->
<!--      <el-upload-->
<!--        drag-->
<!--        :action="uploadUrl()"-->
<!--        :show-file-list="false"-->
<!--        :on-success="handleAvatarSuccess"-->
<!--        :before-upload="beforeAvatarUpload">-->
<!--        <i class="el-icon-upload"></i>-->
<!--        <div class="el-upload__text">将文件拖到此处，或<em>修改头像</em></div>-->
<!--        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>-->
<!--      </el-upload>-->
<!--    </div>-->
    <div>
      <!--      <el-collapse>-->
      <!--        <el-collapse-item title="修改密码" name="2" class="set">-->
      <el-form :model="passForm" status-icon :rules="passwordrules" ref="passForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPassword" class="settinginput">
          <el-input type="password" v-model="passForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" class="settinginput">
          <el-input type="password" v-model="passForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" class="settinginput">
          <el-input type="password" v-model="passForm.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="float: right;margin-right: 450px" @click="changePass('passForm')">确定</el-button>
        </el-form-item>
      </el-form>
      <!--        </el-collapse-item>-->
      <!--      </el-collapse>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'upload',
  data () {
    var oldPassword = (rule, value, callback) => {console.log('5555'  )
      if (!value) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    var newPassword = (rule, value, callback) => {console.log('5555'  )
      if (!value) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    var confirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入正确的密码'))
      } else if (value !== this.passForm.newPassword) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '',
      passForm: {
        oldPassword:'',
        newPassword: '',
        confirmPassword: ''
      },
      passwordrules: {
        oldPassword:[{validator: oldPassword, trigger: 'blur'}],
        newPassword: [{validator: newPassword, trigger: 'blur'}],
        confirmPassword: [{validator: confirmPassword, trigger: 'blur'}],
      },
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    uploadUrl () {
      // return `${this.$store.state.configure.HOST}/user/avatar/update?id=${this.userId}`
    },
    handleAvatarSuccess (res, file) {
      if (res.code === 1) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$store.commit('setAvator', res.avator)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.notify('修改失败', 'error')
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/stycle-zhou/upload';
  .demo-ruleForm {
    margin-top: 20px
  }

  .set {
    margin-top: 21px;
    font-size: 14px;
    color: #909399
  }

  .btn {
    position: relative;
    top: -62px;
    left: 225px;
  }

  .settinginput {
    width: 75%
  }
</style>
