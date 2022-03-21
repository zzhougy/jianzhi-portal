<template>
  <div>
<!--    text-align: center;-->
    <h2 style="color: #34373b;padding-top: 50px;padding-left: 350px">意见与反馈</h2>
    <div class="zz">
      <p style="padding-left: 50px;padding-right: 50px;text-indent:2em">&emsp;&emsp;&emsp; &emsp;&nbsp; 用户您好，请将您的意见、想法、建议或投诉内容告诉我们，以帮助为全体用户提供更加优质的服务。我们将在两个工作日之内回复您的反馈。</p>
      <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              show-word-limit
              :rows="10"
              style="padding-left: 50px;padding-right: 50px;"
      >
      </el-input>
      <el-button type="info" plain style="margin-left: 750px ">提交</el-button>
    </div>
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

      }
    },
    methods:{



    },

    mounted() {

    },
    watch: {

    }
  }
</script>

<style>
  .hr {
    margin: 20px auto auto auto;
  }
  .zz{
    font-size: 20px;
    line-height: 30px;
    margin-left: 350px;
    margin-right: 500px;
    height: 650px;
    width: 1000px;
    border: 1px solid #f5f5f5;
    padding: 40px 60px;
    background-image:url("../../static/images/i2.jpg");
  }
</style>
