<template>
  <div>
<!--    text-align: center;-->
    <h2 style="color: #34373b;padding-top: 50px;padding-left: 350px">收到的简历</h2>
    <el-tabs type="border-card" v-model="activeName" tabPosition="top" style="width:1000px;height: 1000px;" class="hr" @tab-click="handleClick" stretch="true">
      <el-tab-pane label="待处理的简历" name="first">
        <UnprocessedResume :key="timer1"></UnprocessedResume>
      </el-tab-pane>
      <el-tab-pane label="待沟通的简历" name="second">
        <ToBeCommunicatedResume :key="timer2"></ToBeCommunicatedResume>
      </el-tab-pane>
      <el-tab-pane label="不合适" name="third">
        <ImproperResume :key="timer3"></ImproperResume>
      </el-tab-pane>
      <el-tab-pane label="已录用" name="forth">
        <ProperResume :key="timer4"></ProperResume>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import UnprocessedResume from '../../components/ResumeReceivedTabs/UnprocessedResume.vue'
  import ToBeCommunicatedResume from '../../components/ResumeReceivedTabs/ToBeCommunicatedResume.vue'
  import ImproperResume from '../../components/ResumeReceivedTabs/ImproperResume.vue'
  import ProperResume from '../../components/ResumeReceivedTabs/ProperResume.vue'


  export default {
    data() {
      return {
        hrRefresh: 0,
        activeName: 'first',
        timer1:'',
        timer2:'',
        timer3:'',
        timer4:'',
      }
    },
    methods:{

        handleClick (data) {
          let name = data.name
          if(name == "first"){
            this.timer1 = new Date().getTime()
          }else if(name == "second"){
            this.timer2 = new Date().getTime()
          }else if(name == "third"){
            this.timer3 = new Date().getTime()
          }else if(name == "forth"){
            this.timer4 = new Date().getTime()
          }

      }
    },
    components: {
      UnprocessedResume,
      ToBeCommunicatedResume,
      ImproperResume,
      ProperResume
    },
    mounted() {
      this.hrRefresh = this.$route.params.hrRefresh !== undefined ? this.$route.params.hrRefresh : 0
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
