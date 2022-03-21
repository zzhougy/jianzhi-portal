<template>
  <div>
    <h2 style="color: #34373b;padding-top: 50px;padding-left: 350px">岗位信息</h2>
    <el-tabs type="border-card" v-model="activeName" tabPosition="top" style="width:1000px;height: 1000px;" class="hr" @tab-click="handleClick" stretch="true">
      <el-tab-pane label="有效岗位" name="first">
        <OpenedJob :key="timer1"></OpenedJob>
      </el-tab-pane>
      <el-tab-pane label="已关闭的岗位" name="second">
        <ClosedJob :key="timer2"></ClosedJob>
      </el-tab-pane>
      <el-tab-pane label="岗位管理" name="third">
        <ManageJob :key="timer3"></ManageJob>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import OpenedJob from '../../components/JobInformationTabs/OpenedJob'
  import ClosedJob from "../../components/JobInformationTabs/ClosedJob.vue"
  import ManageJob from "../../components/JobInformationTabs/ManageJob.vue"

  export default {
    components: {
      OpenedJob,
      ClosedJob,
      ManageJob
    },
    data() {
      return {
        hrRefresh: 0,
        activeName: 'first',
        timer1:'',
        timer2:'',
        timer3:'',

      }
    },
    methods:{
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },
      handleClick (data) {
        let name = data.name
        if(name == "first"){
          this.$router.push({path: "jobInformationView?activeName=first"})//!!!!为了让路由变化刷新页面!!!!
          // this.timer1 = new Date().getTime()//!!!!上下的二选一，推荐上面的!!!!!
        }else if(name == "second"){
          this.$router.push({path: "jobInformationView?activeName=second"})
          // this.timer2 = new Date().getTime()
        }else if(name == "third"){
          this.$router.push({path: "jobInformationView?activeName=third"})
          // this.timer3 = new Date().getTime()
        }
      },
      showface(){
        console.log('3333'  )
        if(this.$route.query.activeName!=null){
          this.activeName = this.$route.query.activeName;
        }
      },
    },

    mounted() {
      this.hrRefresh = this.$route.params.hrRefresh !== undefined ? this.$route.params.hrRefresh : 0
      this.showface();
    },
    watch: {
      hrRefresh() {
        location.reload()
      }
    }
  }
</script>

<style>
  .hr {
    margin: 20px auto auto auto;
  }
</style>
