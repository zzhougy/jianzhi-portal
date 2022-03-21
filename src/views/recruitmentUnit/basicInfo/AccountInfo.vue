<template>
  <div class="info">
    <p class="title">个人账号资料</p>
    <hr/>
    <div class="personal">
      <el-form :model="basicData" class="demo-ruleForm" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="basicData.username" placeholder="用户名" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum" label="姓名">
          <el-input  placeholder="姓名" v-model="basicData.name"></el-input>
        </el-form-item>
      </el-form>
    <div class="btn">
      <div @click="save()">保存</div>
      <div @click="goback">取消</div>
    </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cities } from '../../../assets/data/form'
// import { updateUserMsg, getUserOfId } from './index'

export default {
  name: 'AccountInfo',
  data: function () {
    return {
      cities: [],
      basicData:{}
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
  },
  methods: {
    queryData(){
      this.$axios.post("/hrInfo/getOne",{}).then(res=>{
        if (res.code == 200){
          this.basicData = res.data
        }
      })
    },
    save(){
      // this.$axios.post("/jobSeeker/edit",this.basicData).then(res=>{
      //   if (res.code == 200){
      //     this.$message.success("操作成功");
      //     this.queryData();
      //   }else {
      //     this.$message.error("操作失败");
      //   }
      // })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/stycle-zhou/info';
</style>
