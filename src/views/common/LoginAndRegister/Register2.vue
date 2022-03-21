<template>
  <div class="container">
<!--    注册<br>-->

    <div class="registerbox">

<!--      <el-form ref="form" style="width: 375px" label-width="75px" :model="form" :rules="passwordrules">-->
<!--        <el-form-item label="用户名" >-->
<!--          <el-input v-model="form.username"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="password">-->
<!--          <el-input v-model="form.password" type="password"  ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="确认密码" prop="confirmPassword">-->
<!--          <el-input v-model="form.confirmPassword" type="password" ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学校" v-if="radio == 1">-->
<!--&lt;!&ndash;          <el-input v-model="school_id"></el-input>&ndash;&gt;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学号" v-if="radio == 1">-->
<!--          <el-input v-model="form.sno" ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="姓名" v-if="radio == 1">-->
<!--          <el-input v-model="form.name"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <el-radio v-model="radio" label="1">求职者</el-radio>-->
<!--      <el-radio v-model="radio" label="2">招聘方</el-radio>-->

      <span style="font-size: 40px;margin-right: 150px">注册</span>
      <el-tabs v-model="userType" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="求职者" name="1">
          <el-form ref="form" style="width: 375px" label-width="75px" :model="form" :rules="passwordrules">
            <el-form-item label="用户名" >
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"  ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" ></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-select v-model="value" placeholder="***学校" style="width: 300px">
                <el-option
                        key="item.value"
                        label="***学校"
                        value="***学校">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="form.sno" ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="招聘方" name="2">
          <el-form ref="form" style="width: 375px" label-width="75px" :model="form" :rules="passwordrules">
            <el-form-item label="用户名" >
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"  ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>



      <div class="bottom">
<!--        <div class="registerclick" @click="register">注册</div>-->
        <el-button type="primary" @click="register('form')" style="width: 300px;">注册</el-button>

      </div>
      <span @click="$router.push('/login')" style="font-size:12px;line-height:38px;cursor: pointer;">已有账号？点击登陆</span>
      <ConfirmTip :tiptext="'内容不能为空'" v-show="confirmtipflag" @cancelevent="cancel()" @confirmenent="confirm()"/>

    </div>
  </div>

</template>
<script>
  import ConfirmTip from './ConfirmTip'
  export default {

    props:[],
    data() {
      var password = (rule, value, callback) => {console.log('5555'  )
        if (!value) {
          return callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      }
      var confirmPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入正确的密码'))
        } else if (value !== this.form.password) {
          return callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      return {
        confirmtipflag:false,
        telnum:'',
        username:'',
        password:'',
        radio: '1',
        form:{
          username:'',
          password:'',
          sno:'',
          name:'',
          confirmPassword: ''
        },
        passwordrules: {
          password: [{validator: password, trigger: 'blur'}],
          confirmPassword: [{validator: confirmPassword, trigger: 'blur'}]
        },
        userType: '1',
      }

    },
    components:{ConfirmTip},
    methods: {
      cancel(){
        this.confirmtipflag=false
      },
      confirm(){
        this.confirmtipflag=false
      },

      register(formName){
        // if(this.telnum===''||this.username===''||this.password===''){
        //   this.confirmtipflag=true
        //   return
        // }
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.form.type = this.userType;
            this.$axios.post("/sysUser/register",this.form).then(res=>{
              if (res.code == 200){
                this.$message.success("注册成功")
                this.$router.push({path: "/login"})
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })


      },
      handleClick(tab, event) {
        console.log(tab, event);
        console.log('tab' , tab)
        console.log('event' , event)
        console.log('userType' , this.userType)
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
    padding: 80px 90px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0,0,0.4);
    text-align:right;
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
