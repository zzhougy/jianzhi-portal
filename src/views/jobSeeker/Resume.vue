<template>
  <div class="resume">
    <div class="banner"></div>

    <div class="profile">
      <div class="profile-header">
        <div class="profile-header__title">
          <h1 style="color: #34373b">我的简历</h1>
          <div>
<!--            <label v-if="resumeDetail.biz_create_time" class>-->
<!--              <i class="el-icon-time"></i>-->
<!--              最近更新:-->
<!--            </label>-->
            <label class style="color: #34373b">
              <i class="el-icon-time"></i>
              最近更新:{{ resumeDetail.updateTime!=""&& resumeDetail.updateTime!=null?resumeDetail.updateTime:resumeDetail.createTime}}
            </label>
<!--            <time></time>-->
          </div>
        </div>

        <div class="profile-header__editor-button">
          <router-link to="/resume/edit">
            <el-button plain round icon="el-icon-edit"></el-button>
          </router-link>
        </div>
      </div>

      <div class="resumeForm">
        <!-- 基本信息 -->
        <div class="resumeViewSection">
          <h2 class="resumeViewSection__title">基本信息</h2>

          <div class="resumeViewForm">
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">姓名</div>
              <div class="resumeViewItem__content">{{ resumeDetail.resName }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">手机号</div>
              <div class="resumeViewItem__content">
                {{ resumeDetail.resPhone }}
              </div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">邮箱</div>
              <div class="resumeViewItem__content">
                {{ resumeDetail.resEmail }}
              </div>
            </div>
          </div>
        </div>


        <!-- 教育经历 -->
<!--        <div class="resumeViewSection">-->
<!--          <h2 class="resumeViewSection__title">教育经历</h2>-->

<!--          <div-->
<!--                  :key="index"-->
<!--                  v-for="(item, index) in resumeDetail.education_list"-->
<!--                  class="resumeViewForm clearfix"-->
<!--          >-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">学校</div>-->
<!--              <div class="resumeViewItem__content">{{ item.school }}</div>-->
<!--            </div>-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">起止时间</div>-->
<!--              <div class="resumeViewItem__content">-->
<!--                {{ item.start_time | formatDate(false) }} ~-->
<!--                {{ item.end_time | formatDate(false) }}-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">专业</div>-->
<!--              <div class="resumeViewItem__content">{{ item.major }}</div>-->
<!--            </div>-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">学历</div>-->
<!--              <div class="resumeViewItem__content">{{ item.description }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <!-- 工作经历 -->
        <!--        v-if="resumeDetail.career_list && resumeDetail.career_list.length"-->
<!--        <div class="resumeViewSection">-->
<!--          <h2 class="resumeViewSection__title">工作经历</h2>-->
<!--          <div-->
<!--                  :key="index"-->
<!--                  v-for="(item, index) in resumeDetail.career_list"-->
<!--                  class="resumeViewForm clearfix"-->
<!--          >-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">公司</div>-->
<!--              <div class="resumeViewItem__content">{{ item.company }}</div>-->
<!--            </div>-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">起止时间</div>-->
<!--              <div class="resumeViewItem__content">-->
<!--                {{ item.start_time | formatDate(false) }} ~-->
<!--                {{ item.end_time | formatDate(false) }}-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="resumeViewItem">-->
<!--              <div class="resumeViewItem__label">职位</div>-->
<!--              <div class="resumeViewItem__content">{{ item.title }}</div>-->
<!--            </div>-->
<!--            <div class="resumeViewItem resumeViewItem-desc">-->
<!--              <div class="resumeViewItem__label">描述</div>-->
<!--              <div class="resumeViewItem__content">{{ item.description }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <!-- 自我评价 -->
<!--        v-if="resumeDetail.self_evaluation && resumeDetail.self_evaluation.trim() "-->
        <div class="resumeViewSection">
          <h2 class="resumeViewSection__title">自我评价</h2>
          <div class="resumeViewForm">
            <div class="resumeViewItem resumeViewItem-desc">
              {{ resumeDetail.resDesc }}
            </div>
          </div>
        </div>
<!--        v-if="resumeDetail.resume_attachment"-->
        <div class="resumeViewSection" >
          <h2 class="resumeViewSection__title">简历</h2>
          <div class="resumeViewItem resumeViewItem__resumeAttachment">
            <div class="fileIcon">
<!--              <file-icon :file-type="resumeFileType"></file-icon>-->
            </div>
            <div class="content">
              <h3>{{resumeDetail.aliyunOss.fileName + '.' +  resumeDetail.aliyunOss.type}}</h3>
<!--              <time>-->
<!--                上传时间：{{-->
<!--                  resumeDetail.resume_attachment.create_time | formatDate-->
<!--                }}-->
<!--              </time>-->
              <time>
                上传时间：2021-02-12 14:28:46
              </time>
            </div>
            <div class="download-link">
              <a
                ref="resumeDownloadLink"
                :href="'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/' + resumeDetail.aliyunOss.filePath"
                :download="resumeAttachmentLink"

                @click="downloadResume()"
              >
                <i class="el-icon-download"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchResume,
  fetchResumeWorksDownloadLink,
} from "@/helper/requestWithToken.js";
import store from "@/store";

export default {
  name: "resume",
  data() {
    return {
      resumeDetail: {},
      resumeAttachmentLink: "",
      state: store.state,
      hasResumeAttach:false,//是否有简历附件
    };
  },
  computed: {
    resumeFileType() {
      const pathArr = this.resumeDetail.resume_attachment.name.split(".");
      return pathArr[pathArr.length - 1];
    },
  },
  methods: {
    downloadResume() {

    },
    getUserResume(){
      const loading = this.$loading();
      console.log('state' , this.state)
      this.$axios.post("/resume/getOne",{}).then(res=>{
        if (res.code==200){
          loading.close();
          this.resumeDetail = res.data;
          //aliyunOss为空则赋默认值
          if (this.resumeDetail.aliyunOss==null){
            this.resumeDetail.aliyunOss={}
          }
          console.log('this.resumeDetail' , this.resumeDetail)
        }
        console.log('222222222222222222' )
      }).catch((err) => {
            loading.close();
      });
    }
  },
  created() {
    this.getUserResume();
  },
};
</script>

<style lang="less" scoped>
.banner {
  /*width: 1200px;*/
  /*background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/my_resume_banner_1577084307030.jpg");*/
  /*background-size: 100% 100%;*/
  height: 300px;
  background-repeat: no-repeat;
}

.profile {
  width: 900px;
  margin: auto;
  margin-top: -200px;
  &-header {
    color: #fff;
    display: flex;
    justify-content: space-between;

    align-items: center;

    margin-left: 400px;
  }

  .resumeForm {
    margin-top: 30px;
    background: #fff;
    box-shadow: 0px 9px 20px 0px #c2c1c180;
    border-radius: 4px;
    padding: 30px;

    .resumeViewSection {
      min-height: 200px;
      margin-bottom: 30px;
      &__title {
        margin-bottom: 20px;
      }
      .resumeViewForm {
        margin-bottom: 30px;
      }
      .resumeViewItem {
        float: left;
        width: 50%;
        margin-bottom: 20px;
        min-height: 50px;
        &__resumeAttachment {
          display: flex;
          padding: 10px;
          background-color: @bg-base-color;
          align-items: center;
          time {
            color: @regular-text-color;
            font-size: @font-size-base;
          }
          .fileIcon {
            margin-right: 10px;
            width: 50px;
            height: 50px;
          }
          .download-link {
            margin-left: auto;

            .el-icon-download {
              font-size: @font-size-large;
              border-radius: 50%;
              border: 1px solid @border-base-color;
              padding: 4px;
            }
            &:hover {
              color: @main-color;
            }
          }
        }
        &__content.is-link {
          color: @main-color;
          cursor: pointer;
        }
        &__label {
          color: @secondary-text-color;
          font-size: @font-size-base;
          margin-bottom: 7px;
        }
        &__content-link {
          color: @main-color;
        }
        &-desc {
          overflow: hidden;
          width: 70%;
          white-space: pre-line;
        }
      }
    }
  }
}
</style>
