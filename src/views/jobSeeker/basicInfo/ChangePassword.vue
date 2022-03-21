<template>
  <div class="upload">
    <p class="title">修改密码</p>
    <hr/>
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
  name: 'ChangePassword',
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
    changePass (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         console.log('11'  )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
