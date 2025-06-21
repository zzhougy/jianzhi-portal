<template>
  <div class="header" :class="[{ fixedToTop }, themeColor]">
    <div class="logo">
      <a href="/" style="color:black;font-size:25px;">
<!--        <p :is-transparent="themeColor === 'is-transparent'" style="color:black;font-size:15px;">校园兼职平台</p>-->

        校园兼职平台
<!--        <logo :is-transparent="themeColor === 'is-transparent'"></logo>-->
      </a>
    </div>
    <ul class="navbar">
      <router-link to="/" exact v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <i class="el-icon-s-home"></i>
          <a :href="href" @click="navigate">主页</a>
        </li>
      </router-link>
      <router-link to="/units" exact v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <i class="el-icon-office-building"></i>
          <a :href="href" @click="navigate">企业</a>
        </li>
      </router-link>
      <router-link exact to="/jobs" v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <i class="el-icon-suitcase"></i>
          <a :href="href" @click="navigate">岗位</a>
        </li>
      </router-link>
<!--      <router-link exact to="/jobs2" v-slot="{ href, navigate, isActive }">-->
<!--        <li class="navbar-item" :class="{ active: isActive }">-->
<!--          <a :href="href" @click="navigate">职位zhou</a>-->
<!--        </li>-->
<!--      </router-link>-->
      <router-link exact to="/about" v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <i class="el-icon-info"></i>
          <a :href="href" @click="navigate">关于</a>
        </li>
      </router-link>

    </ul>
<!--    |-->
    <div class="user">
      <!--      <div class="login" v-if="!state.isLogin">-->
      <div class="login" v-if="!state.isLogin">
        <router-link to="/login">
          <i class="el-icon-s-custom"></i>
          <span class="login__text">登录/注册</span>
        </router-link>
      </div>

      <div class="dropdown-menu" v-else>
        <el-badge :value="noticeNum" class="item">
        <span class="dropdown-menu__email">
          {{ state.userInfo.username }}
          <i class="arrow"></i>
        </span>
        </el-badge>
        <ul class="dropdown-menu__wrapper">
          <li class="dropdown-menu__item" v-if="state.userInfo.type==1">
            <router-link to="/basicInfo">基本信息</router-link>
          </li>
          <li class="dropdown-menu__item" v-if="state.userInfo.type==1">
            <router-link to="/resume">我的简历</router-link>
          </li>
          <li class="dropdown-menu__item" v-if="state.userInfo.type==1">
            <router-link to="/applicationStatus">投递情况</router-link>
          </li>
<!--          <li class="dropdown-menu__item" v-if="state.userInfo.type==1">-->
<!--            <router-link to="/">我的收藏</router-link>-->
<!--          </li>-->
          <li class="dropdown-menu__item" v-if="state.userInfo.type==2">
             <router-link to="/unitInformationView2">基本信息</router-link>
          </li>
          <li class="dropdown-menu__item" v-if="state.userInfo.type==2">
            <router-link to="/jobInformationView">岗位信息</router-link>
          </li>

          <li class="dropdown-menu__item" v-if="state.userInfo.type==2" @click="clickResNotice">
            <el-badge :value="noticeNum" class="item" >
          <router-link to="/resumeReceivedView" >收到的简历</router-link>
          </el-badge>
          </li>

          <li class="dropdown-menu__item" >
            <router-link to="/feedback">意见与反馈</router-link>
          </li>
          <li class="dropdown-menu__item" @click="handleLogout">退出</li>
<!--          <li class="dropdown-menu__item" @click="connect">连接keshan</li>-->
<!--          <li class="dropdown-menu__item" @click="send">发送keshan</li>-->
<!--          <li class="dropdown-menu__item" @click="disconnect">断开keshan</li>-->

        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import store from "@/store";
  var socket;
  var sysCount = 0;
  var userCount = 0;
  export default {
    name: "Header",
    data() {
      return {
        state: store.state,
        isLogin: false,
        username: "",
        noticeNum:0,
      }
    },
    async created() {

      if (!this.state.isLogin) {
        store.expireLogin();
      } else if (this.state.isLogin && !this.state.userInfo.username) {
        //不做操作
      }

      console.log('vvvvvvv' )
     // let p1 = new Promise((resolve) => {
      //await this.connect();
      //  resolve('成功了')
     // })


    //  Promise.all([p1]).then((result) => {
    //    console.log(result)               //['成功了', 'success']
    //    this.send()
    //  }).catch((error) => {
   //     console.log(error)
   //   })

      // this.isLogin=localStorage.getItem("isLogin");
      // this.username=localStorage.getItem("username");
    },
    props: {
      fixedToTop: {
        type: Boolean,
        default: false
      },
      themeColor: {
        type: String,
        default: "main-color"
      }
    },
    methods: {
      handleLogout() {
        let p1
        //断开连接
        p1 = new Promise((resolve, reject) => {
          if (window.sessionStorage.getItem("JWT_TOKEN")!=null&&window.sessionStorage.getItem("JWT_TOKEN")!=''&&this.state.userInfo.type==2){
            this.disconnect();
            resolve('success')
          }
        })
        Promise.all([p1]).then((result) => {
          console.log(result)               //['成功了', 'success']
          store.requestLogout()
          store.expireLogin();
          this.$router.push("/");
          console.log('啵啵啵宝宝' )
        }).catch((error) => {
          console.log(error)
        })


        store.requestLogout()
        store.expireLogin();
        this.$router.push("/");





      },

      //建立websocket连接
      connect() {

        var self = this;
        return new Promise((resolve, reject) => {
        //connStatus.value = "正在连接 ......";

        console.log('正在连接 ......' )
        if(!window.WebSocket){
          window.WebSocket = window.MozWebSocket;
        }
        if(window.WebSocket){

          // socket = new WebSocket("ws://127.0.0.1:1234/ws");
          socket = new WebSocket(process.env.VUE_APP_BASE_API_WS);


          socket.onmessage = function(event){
            console.log('socket.onmessage' )
            //respText.scrollTop = respText.scrollHeight;
            //respText.value += "\r\n" + event.data;
            console.log('event.data;' , event.data)
            // var sysData = JSON.parse(event.data).data.sysNoticeCount;
            // if(sysData){
            //   sysCount = sysCount + parseInt(sysData)
            // }
            // var userData = JSON.parse(event.data).data.userNoticeCount;
            // if(userData){
            //   userCount = userCount + parseInt(userData)
            // }

            //如果招聘人员查看了简历
            if (sessionStorage.getItem("ResNoticeViewed")=='true'){
              var sysData = 0;
              sysData = JSON.parse(event.data).data.getResNoticeCount;

              if (sysData!=0){
                sessionStorage.setItem("ResNoticeViewed",false)
                console.log('sessionStorage.setItem("ResNoticeViewed",false)' )
              }

              self.noticeNum =sysData
               console.log('sysData = 0;' )
            }else {//如果招聘人员没有查看简历
              var sysData2 = JSON.parse(event.data).data.getResNoticeCount;

              if (sysData2!=0){
                sessionStorage.setItem("ResNoticeViewed",false)
                console.log('sessionStorage.setItem("ResNoticeViewed",false)' )
              }
              if(sysData2){
                sysCount = sysCount + parseInt(sysData2)
              }
              console.log('this.noticeNum' ,sysCount)
              self.noticeNum =sysCount
            }



            // this.noticeNum = sysCount

            //localStorage.setItem('noticeNum',sysCount)





            //this.noticeNum = sysCount
            //let vm = this
            //this.$set(this.noticeNum, 0, this.noticeNum);
            // respText.value += "\r\n现在有" + sysCount + "条订阅新消息";
            // respText.value += "\r\n现在有" + userCount + "条点赞新消息";
            //respText.scrollTop = respText.scrollHeight;
            console.log("\r\n现在有" + sysCount + "条订阅新消息" )
            //console.log("\r\n现在有" + userCount + "条点赞新消息")
          };
          socket.onopen = function(event){
            console.log('socket.onopen' )

            // respText.value += "\r\nWebSocket 已连接";
            console.log('WebSocket 已连接'  )
            // respText.scrollTop = respText.scrollHeight;

            //connStatus.value = "已连接 O(∩_∩)O";

            //actionBtn.value = "断开服务器";
            // actionBtn.onclick =function(){
            //   disconnect();
            // };
            resolve("seccess")
          };
          socket.onclose = function(event){
            console.log('socket.onclose' )
            // respText.value += "\r\n" + "WebSocket 已关闭";
            console.log('WebSocket 已关闭' )
            // respText.scrollTop = respText.scrollHeight;

            //  connStatus.value = "已断开";

            // actionBtn.value = "连接服务器";
            // actionBtn.onclick = function() {
            //   connect();
            // };
            //socket.close();
          };
          console.log('地导弹' )

        } else {
          //alert("您的浏览器不支持WebSocket协议！");
          // connStatus.value = "您的浏览器不支持WebSocket协议！";
          console.log('您的浏览器不支持WebSocket协议！'  )
          reject("fail")
        }

        console.log('大大大大大大'  )
        console.log('否付费' )


        })
      },

      //发送给后台要接收的信息
      send(){
        console.log('this.noticeNumwwww' , this.noticeNum)
        // 查询登陆用户单位id
        this.$axios.get("/user/info",).then(res=>{
          if(res.code==200){
            let message1 = {'userId':res.data.id};
            let message = JSON.stringify(message1)
            console.log('5555555555'  )
            if(!window.WebSocket){return;}
            if(socket.readyState == WebSocket.OPEN){
              socket.send(message);
            }else{
              alert("WebSocket 连接没有建立成功！");
            }
          }
        })


      },


      //断开websocket连接
      disconnect() {
        socket.close();
        console.log('断开连接' )
      },

      //查看了简历触发
      clickResNotice(){
        console.log('收到的简历被查看' )
        sessionStorage.setItem("ResNoticeViewed",true)
      }
    },
    watch:{
      // 方法1
      '$route' (to, from) { //监听路由是否变化
         console.log(999)
        if (window.sessionStorage.getItem("JWT_TOKEN")!=null&&window.sessionStorage.getItem("JWT_TOKEN")!=''&&this.state.userInfo.type==2){
          this.connect();
          this.send();
        }c
        if(to.path == "/"){ //跳转到哪个页面
          //location.reload()
        }
      },

    }
  };
</script>
<style lang="less" scoped>
  .header {
    color: #aaa;
    background-color: rgba(153, 169, 191, 0.49);//zhou 加的

    display: flex;
    height: 60px;
    align-items: center;
    padding: 10px 100px;
    min-width: 900px;

    &.fixedToTop {
      position: fixed;

      width: 100%;
    }

    &.main-color {
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);/*zhou加的顶部栏阴影*/
      font-size: 20px;
      .navbar-item {
        &:hover {
          color: @main-color;
        }
      }

      .login-text {
        color: @main-color;
      }
    }

    &.is-transparent {
      color: #fff;
      font-size: 20px;

      .navbar-item {
        &:hover {
          color: #ccc;
        }
      }

      .active {
        color: #fff;
      }
    }
  }

  .logo {
    width: 200px;
    height: 100%;

    a {
      height: 100%;
      display: block;
    }
  }

  .navbar {
    /*margin-left: auto;*/
    /*margin-right: 20px;*/
    margin-left: 20px;
    margin-right: auto;

    display: flex;

    &-item {
      padding: 4px 0px;
      /*margin: 0 20px;*/
      margin: 0 100px;

      &.active {
        border-bottom: 2px solid;
        color: @main-color;
      }
    }
  }

  .user {
    margin-left: 40px;
    position: relative;

    .arrow {
      display: inline-block;
      border: 1px solid;
      border-width: 1px 1px 0 0;
      transform: rotate(135deg);
      transform-origin: center;
      vertical-align: 5px;
      margin-left: 5px;
      transition: all 0.3s;
      width: 10px;
      height: 10px;
    }

    &:hover {
      .arrow {
        transform: rotate(-45deg);
        vertical-align: -3px;
      }

      .dropdown-menu__wrapper {
        display: block;
      }
    }

    .dropdown-menu {
      position: relative;
      z-index: 1000;

      &__email {
        line-height: 2;
        cursor: pointer;
      }

      &__wrapper {
        // padding-top:10px;
        position: absolute;
        display: none;
        right: 0;
        color: @regular-text-color;
        // &__wrapper {
        padding: 9px 0;
        width: 200px;
        border-radius: 5px;
        box-shadow: 0 0px 2px 1px #eee;
        background: #fff;
        // }
      }

      &__item {
        padding: 9px 12px;
        cursor: pointer;

        &:hover {
          background: #efefef58;
        }
      }
    }
  }

  .github-project {
    margin-left: 30px;
    margin-right: -30px;
  }
</style>
