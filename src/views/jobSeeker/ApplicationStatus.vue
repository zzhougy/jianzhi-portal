<template>
  <div>
    <h2 style="color: #34373b;padding-top: 50px;padding-left: 350px">投递情况</h2>
    <el-tabs type="border-card" v-model="activeName" tabPosition="top" style="width:1000px;height: 1000px;" class="hr" @tab-click="handleClick" stretch="true">
      <el-tab-pane name="first">
        <span slot="label">全部</span>
        <AllAppliedPosition :key="timer1"></AllAppliedPosition>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">待沟通</span>
        <ToBeCommunicatedPosition :key="timer2"></ToBeCommunicatedPosition>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">不合适</span>
        <ImproperPosition :key="timer3"></ImproperPosition>
      </el-tab-pane>
      <el-tab-pane name="forth">
        <span slot="label">已录用</span>
        <ProperPosition :key="timer4"></ProperPosition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AllAppliedPosition from '../../components/ApplicationStatusTabs/AllAppliedPosition.vue'
  import ImproperPosition from '../../components/ApplicationStatusTabs/ImproperPosition.vue'
  import ProperPosition from '../../components/ApplicationStatusTabs/ProperPosition.vue'
  import ToBeCommunicatedPosition from '../../components/ApplicationStatusTabs/ToBeCommunicatedPosition.vue'

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
    components: {
      AllAppliedPosition,
      ImproperPosition,
      ProperPosition,
      ToBeCommunicatedPosition
    },
    mounted() {
      this.hrRefresh = this.$route.params.hrRefresh !== undefined ? this.$route.params.hrRefresh : 0
    },
    watch: {
      hrRefresh() {
        location.reload()
      }
    },
    methods:{
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },
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
  }
</script>

<style>
  .hr {
    margin: 20px auto auto auto;
  }
</style>
