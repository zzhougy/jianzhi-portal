<template>
  <div class="wrapper">
    <div :hidden="hasContent" class="nofind">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png" style="margin: 0 auto">
      <p>暂时没有发布的职位哦，快去发布吧</p>
    </div>
    <el-card  v-for="(item, key) in joblist" :key="key" class="mycard"  :hidden="!hasContent" >
      <p class="myflex">{{item.jobName}}</p>
      <el-button class="delbtn" @click="checkDetail(item.id)">查看详情</el-button>
      <el-button class="delbtn" @click=openJob(item.id)>开启岗位</el-button>
    </el-card>
  </div>
</template>
<script>
//import fetch from '../../api/fetch'
import store from "@/store";
export default {
  data () {
    return {
      loginInfo: store.state,
      joblist: [],
      count: 0,
      hasJob: false,
      hasContent: true,
    }
  },
  mounted () {
    this.checkJob()
    this.queryJobList()
  },
  created() {
    console.log('点击加载了')
  },
  watch: {
    count () {
      location.reload()
    },
    // //监听路由发生变化则刷新
    // $route (to, from) {
    //   this.$router.go(0)
    // }
  },
  methods: {
    checkDetail (id) {
      console.log('ssssssssssssssssssss' )
      //localStorage.setItem('jobId', id)


      this.$router.push({path: "/jobs/"+id})
    },
    checkJob () {
      // fetch.checkJob().then(res => {
      //   if (res.status === 200) {
      //     this.joblist = res.data.data
      //     if (this.joblist.length === 0) {
      //       this.show = true
      //     }
      //   }
      // }).catch(e => {
      //   console.log(e)
      // })
    },
    openJob (id) {
      console.log('id' ,id )
      this.$confirm("是否继续开启?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            console.log("确认关闭");
            this.$axios.post("/jobInfo/edit",{id:id,status:1}).then(res=>{
              if(res.code==200){
                this.queryJobList()
              }
            })
          })
          .catch(() => {
            console.log("取消关闭");
            this.$message({
              type: "info",
              message: "已取消关闭",
            });
          });
    },
    queryJobList(){
      this.$axios.post("/jobInfo/list",{userId:this.loginInfo.userInfo.id,status:2}).then(res=>{
        if (res.code == 200){
          // console.log('res' , res)
          this.joblist = res.data.records
          if (this.joblist.length == 0 ){
            console.log('bbbbbbbbbbb' )
            this.hasContent = false
          }else {
            console.log('fffffffff' )
            this.hasContent = true
          }

        }

      })
    }

  }
}
</script>

<style>

.mycard {
  border-left: 5px solid #888;
  height: 100px;
  margin-bottom: 14px;
}
.myflex {
  float: left;
}
.delbtn {
  float: right;
}
</style>
