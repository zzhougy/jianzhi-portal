<template>
  <div class="container">

    <div class="registerbox">

<!--      /////////////先别删/////////////////////////////////////////-->
<!--      用户名：-->
<!--      <input type="tel" maxlength="110" placeholder="请输入用户名" v-model="ruleForm.username" style="align:right" ><br>-->
<!--      密码：-->
<!--      <input type="password" maxlength="20"  placeholder="请输入密码" v-model="ruleForm.password" style="align:right"><br>-->
      <!--      /////////先别删/////////////////////////////////////////////-->

<!--      <h2 style="font-size: 32px;margin-bottom: 16px;padding-left: 120px">兼职 实践</h2>-->
<!--      <h2 style="font-size: 32px;margin-bottom: 16px;padding-left: 80px">Part-time Job</h2>-->
      <!--      <p class="icon-arrow-down">{{userControlStatus}}</p>-->
<!--      <p style="padding: 0 56px;margin-bottom: 56px;font-size: 20px;font-weight: 800;padding-left: 175px">{{userControlStatus}}</p>-->
      <span style="font-size: 40px;margin-left: 150px">登录</span>

      <el-form status-icon ref="list" style="width: 375px" label-width="75px" class="formWrap">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.username" style="width: 300px" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="name">
          <el-input type="password" v-model="ruleForm.password" style="width: 300px" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom">
<!--        <div class="registerclick" @click="login()">登陆</div>-->
        <el-button type="primary" @click="login()" style="width: 250px;">登陆</el-button>

      </div>
      <span @click="$router.push('/register')" style="font-size:12px;line-height:38px;cursor: pointer;float:right;">没有账号？点击注册</span>


    </div>

    <ConfirmTip :tiptext="'内容不能为空'" v-show="confirmtipflag" @cancelevent="cancel()" @confirmenent="confirm()"/>
  </div>

</template>
<script>
  import ConfirmTip from './ConfirmTip'
  import store from "@/store";
  export default {

    props:[],
    data() {
      return {
        confirmtipflag:false,
        telnum:'',
        ruleForm:{
          username:'',
          password:''
        },



        state: store.state,
        headers: {
          Authorization: sessionStorage.getItem("JWT_TOKEN"),
        },
        checked: false,
        isForgetPassword: false,
        isLogin: true,
        isReg: false,
        userControlStatus: '登录',
        show: true, //验证码：显示”获取验证码”
        count: 60, //验证码：设置倒计时时长
        timer: null, //验证码：设置计时器
        checkForm: {
          username: "",
          password: "",
        },
        // ruleForm: {
        //   companyCode: '',
        //   username: '',
        //   phone: '',
        //   password: '',
        //   verificationCode: '',
        //   rememberMyName: true
        // },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },

      }

    },components:{ConfirmTip},
    methods: {
      cancel(){
        this.confirmtipflag=false;
      },
      confirm(){
        this.confirmtipflag=false
      },
      login(formName) {
        console.log("this.toLocalStorage", this.toLocalStorage);
        console.log("formName" + formName);
        this.rememberMe();
        //this.loading = true;
        console.log("this.ruleForm", this.ruleForm);
       // this.$refs[formName].validate((valid) => {
       //   if (valid) {
            this.$axios.post("/sysUser/login", this.ruleForm).then((res) => {
              console.log("res", res);
              if (res.code == 200) {
                //提交成功才保存
                this.toLocalStorage(this.checkForm);
                this.$message.success("登入成功");
                //保存token
                sessionStorage.setItem("JWT_TOKEN", res.data);
                this.getUserInfo();
              } else {
                console.log("登陆失败", res);
                this.$message.error({
                  title: "登入失败",
                  message: res.msg,
                  type: "error",
                });
              }
              //this.loading = false;
            }).catch(err => {
              this.$message.error({title: "登入失败", message: err, type: "error"});
             // this.loading = false;
            });
          // } else {
          //   console.log('222222222222222')
          //   this.$message.error("登录失败");
          //   return false;
          // }
      //  });
      },
      async getUserInfo() {
        var data = {};
        data["headers"] = this.headers;
        let res = await this.$axios.get("user/info", data);
        console.log("res1111111111111111", res);
        if (res.code !== 200) {
          return this.$message.error("获取用户信息失败:" + res.data.msg);
        }
        if (!res.data.isAdmin && res.data.roles.length < 1) {
          return this.$message.error("您没有任何权限进入此系统，请联系管理员为您分配");
        }
        //保存用户
        // this.$store.commit("SET_USER_INFO", res.data.data);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("isLogin", true);
        await store.requestUserInfo(res.data)
        await store.requestLoginStatus(true);
        console.log('res.data', res.data)
        // store.setUserInfo(response.data);
        //跳转到home
        this.$router.push("/");
        console.log("this.$router", this.$router);
      },
      //响应记住我，先保存在checkform中
      rememberMe() {
        if (this.checked === true) {
          this.checkForm.username = this.ruleForm.username;
          this.checkForm.password = this.ruleForm.password;
          //console.log("已选择记住我",this.checkForm);
        } else {
          this.checkForm.username = '';
          this.checkForm.password = '';
          //console.log("取消选择记住我",this.checkForm);
        }
      },
      //部位空字符串就保存
      toLocalStorage(data) {
        if (data.username !== '') {
          localStorage.setItem("username", data.username);
          localStorage.setItem("password", data.password);
        }
      },
    },
    mounted() {
      //不为空就填充
      if (localStorage.getItem("username") != null) {
        this.ruleForm.username = localStorage.getItem("username");
        this.ruleForm.password = localStorage.getItem("password");
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(../../../static/images/bbbb.jpg);
    background-size: cover;
    font-size: 3.667vw;
  }
  .container > .registerbox{
    font-size: 20px;
    border: 1px solid rgba(0, 0,0,0.4);
    border-radius: 10px;
    padding: 20px 40px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0,0,0.4);
    opacity:1.0;/*设置不透明*/
    background-color:#FFF
  }
  .container > .registerbox:hover{
    animation: boxshake 0.5s;

  }
  .registerclick:hover{
    color:rgb(226,107, 52);
    animation: boxshake 0.5s;
  }
  @keyframes boxshake {
    0%{}
    25%{
      transform: rotate(-0.3deg);
      transform: translateX(1px);
      transform: translateY(1px);
    }
    50%{
      transform: rotate(0.3deg);
      transform: translateX(-1px);
      transform: translateY(-1px);
    }
    75%{
      transform: rotate(-0.3deg);
    }
    100%{
      transform: rotate(0.3deg);
    }

  }
  .container > .registerbox >input{
    width: 300px;
    height: 30px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: 10px;
    outline: none;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
  }
  .bottom > span:hover{
    color: rgb(226,107, 52);
  }
  .registerclick{
    padding: 5px 20px;
    background-color: rgba(0, 0,0,0.4);
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
  }

</style>
