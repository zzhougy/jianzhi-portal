<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
    </h1>
    <hr>
    <ul>
      <li class="list-title">
        <div class="song-item">
          <span class="item-index">序号</span>
          <span class="item-title">名称</span>
          <span class="item-name">标签</span>
          <span class="item-intro">薪资</span>
        </div>
      </li>
      <li class="list-content" v-for="(item, index) in jobListData" :key="index">
        <router-link :to="`/jobs/${item.id}`">
        <div class="song-item" :class="{'is-play': id === item.id}"  >
          <span class="item-index">
<!--            <span v-if="id !== item.id">{{index + 1}}</span>-->
<!--            <svg v-if="id === item.id" class="icon" aria-hidden="true">-->
<!--              <use xlink:href="#icon-yinliang"></use>-->
<!--            </svg>-->
            {{index + 1}}
          </span>
          <span class="item-title">{{ item.jobName }}</span>
          <span class="item-name">{{ item.label }}</span>
          <span class="item-name">{{item.salaryTreatment}}</span>
<!--          <span class="item-intro">{{item.introduction}}</span>-->
        </div>
        </router-link>
      </li>
    </ul>
<!--    <ul class="content-list">-->
<!--      <li class="content-item" v-for="item in jobListData" :key="item.id">-->
<!--        <router-link :to="`/jobs/${item.id}`">-->
<!--          <h3 class="title">{{ item.jobName }}</h3>-->

<!--          <div class="subTitle">-->
<!--            <span class="city">{{ item.label }}</span>&nbsp;|-->
<!--            <span class="job_category">{{ item.label }}</span>&nbsp;|-->
<!--            <span class="recruitment_channel">社招</span>-->
<!--          </div>-->
<!--          <p class="desc">{{ item.detail }}</p>-->
<!--        </router-link>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'album-content',
  props: [
    'songList'
  ],
  data() {
    return {
      jobListData:[]
    };
  },
  methods:{
    queryJobList(){
      const {id} = this.$route.params;
      this.$axios.post("/jobInfo/list",{recruitUnitId: `${id}`,status:1}).then(res=>{
        if (res.code === 200){
          this.jobListData = res.data.records;
        }
      })
    },
    queryUnitInfo() {
      this.$axios.get("/recruitUnit/getById", {params: {id: `${id}`}}).then(res => {
        if (res.code === 200) {
          this.unitDetail = res.data;
          console.log('resl111', res)
        }
      })
    },
  },
  mounted() {
    this.queryJobList();
  },

  // computed: {
  //   ...mapGetters([
  //     'id' // 音乐ID
  //   ])
  // },

}
</script>

<style lang="scss" scoped>
@import './album-content.scss';
</style>
