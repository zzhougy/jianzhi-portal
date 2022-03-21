<template>

  <div class="jobs">
<!--    <div class="banner">兼职系统欢迎你</div>-->


    <el-carousel :interval="4000" type="card" height="360px" style="background-color: rgb(231,236,240)">
      <el-carousel-item v-for="(item,index) in imageList" :key="index" >
        <!--        <h3 class="medium">{{ item }}</h3>-->
        <el-image :src="item" style="height: 100%;width: 100%"></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索 -->
    <div ref="searchBar" :class="{ fixedTop: searchBarFixedTop }" class="search-wrapper">
<!--      <input-search-->
<!--        :size="searchBarFixedTop ? 'small' : 'medium'"-->
<!--        placeholder="搜索单位1"-->
<!--        v-model="searchKeyword"-->
<!--      ></input-search>-->


      <el-input placeholder="输入搜索内容" class="input-with-select" v-model="searchKeyword" @keyup.enter.native="queryUnitList2">
        <el-button type="primary" slot="append" @click="queryUnitList2" style="background: #3370ff;color: #fff">搜索</el-button>
      </el-input>

    </div>

    <div style="margin-top: 55px">
      <UnitHeaderList @my-event="queryUnitList"></UnitHeaderList>
    </div>

    <div class="main clearfix">
      <!-- 主体内容 -->
<!--      <div class="content" v-loading:#ffffff7d.scrollFixed="loading">-->
        <h2 class="content-title">招聘单位</h2>
        <ul class="content-list">
          <li class="content-item" v-for="item in unitListData" :key="item.id">
            <router-link :to="`/units/${item.id}`">
              <div class="demo-image__preview" style="display:inline-block;">
              <el-image
                      style="width: 100px; height: 100px"
                      :src="item.unitImageUrl"
              >
              </el-image>
            </div>
              <div style="display:inline-block;margin-left:9px">
              <h3 class="title">{{ item.name }}</h3>
              <div class="subTitle">
                <span class="city">{{ item.location }}</span>&nbsp;|
                <span class="job_category">{{ item.field }}</span>&nbsp;|
                <span class="recruitment_channel">{{ item.scale }}</span>
              </div>
              <p class="desc">在招岗位数量： {{item.jobNum}}</p>
              </div>
            </router-link>

          </li>
        </ul>

        <!-- 分页器 -->
<!--        <div v-show="!loading" class="pagination-wrapper">-->
<!--          <pagination :current-page.sync="currentPage" :total="results.count"></pagination>-->
<!--        </div>-->
      <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageCurrent"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
              style="float: right">
      </el-pagination>


<!--      </div>-->

    </div>
  </div>
</template>
<script>
import { getOffsetTop } from "@/helper/utilities";
import UnitHeaderList from "./UnitHeaderList";
let positionY = 0;
let searchBarClientHeight = 0;
export default {
  name: "job",
  components: {
    UnitHeaderList,
  },
  data() {
    const { searchInput, job_category_id } = this.$route.params;
    return {
      searchKeyword: searchInput || "",
      currentPage: 1,
      job_category_id_list: job_category_id ? [job_category_id] : [],
      jobCategories: [],
      jobCities: [],
      location_code_list: [],
      cityList: [],
      cities: [],
      results: [],
      searchBarFixedTop: false,
      loading: false,
      unitListData:[],
      unitImageUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      imageList:['https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/background/zzz.jpeg',
        'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/background/zzz.jpeg',
        'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/background/zzz.jpeg'],
      queryVal:[0],//记录子组件传过来的条件标签
      pageCurrent:1,
      pageSize:10,//每页显示数目
      total:0,
    };
  },

  created() {
    // const jobConfigRequest = this.request
    //   .get("/job-filters")
    //   .then(response => {
    //     this.jobCities = response.city_list;
    //     this.jobCategories = response.job_type_list;
    //   })
    //   .catch();
    //
    // const dataRequest = this.fetchList();
    //
    // this.loadingIns = this.$loading();
    // Promise.all([jobConfigRequest, dataRequest]).then(() => {
    //   this.loadingIns.close();
    // });

  },
  mounted() {
    this.$nextTick(() => {
      positionY = getOffsetTop(document.body, this.$refs.searchBar);

      searchBarClientHeight = this.$refs.searchBar.clientHeight;
    });
    const onPageScroll = () => {
      const top = this.$refs.searchBar.getBoundingClientRect().top;

      this.searchBarFixedTop =
        window.scrollY > positionY - searchBarClientHeight / 2;
    };
    window.addEventListener("scroll", onPageScroll);

    this.$on("hook:destroyed", () => {
      window.removeEventListener("scroll", onPageScroll);
    });

    console.log('searchKeyword' , this.searchKeyword)
    this.queryUnitList2();
  },
  computed: {
    queryFilter() {
      return {
        job_category_id_list: this.job_category_id_list,
        location_code_list: this.location_code_list,
        keyword: this.searchKeyword,
        offset: Math.max(0, this.currentPage - 1) * 10
      };
    },
    clearable() {
      return (
        this.job_category_id_list.length !== 0 ||
        this.location_code_list.length !== 0
      );
    }
  },
  methods: {
    clearFilter() {
      if (this.job_category_id_list.length) {
        this.job_category_id_list = [];
      }
      if (this.location_code_list.length) {
        this.location_code_list = [];
      }
    },

    //子组件调用的搜索
    queryUnitList(queryVal){
      console.log('queryVal' , queryVal)
      this.queryVal = queryVal
      this.queryUnitList2();
    },

    //当前页面搜索
    queryUnitList2(){
      this.$axios.post("/recruitUnit/list",{status:2,field:JSON.stringify(this.queryVal),name:this.searchKeyword,pageCurrent:this.pageCurrent,pageSize:this.pageSize}).then(res=>{
        if (res.code === 200){
          this.unitListData = res.data.records;
          this.total = res.data.total
        }
      })
    },


    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageCurrent = val;
      this.queryUnitList2()
    },



  }
};
</script>
<style lang="less" scoped>
.banner {
  height: 400px;
  line-height: 400px;
  color: #fff;
  width: 100%;
  min-width: @main-width;
  /*background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/joblistbanner2x.jpg");*/
  /*background-image: url("../../static/images/zzz.jpeg");*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  font-size: @font-size-larger;
}
.search-wrapper {
  /*position: absolute;*/
  /*width: 100%;*/
  /*padding: 0 200px;*/
  /*padding: 0 600px;*/
width: 500px;
  margin: 0 auto;



  transform: translateY(-50%);
  z-index: 100;
  &.fixedTop {
    position: fixed;

    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
    top: 0;
    padding: 20px 130px;
    z-index: 1000;
    background-color: #fff;
    transform: translateY(0);
  }
}
.main {
  width: @main-width;
  margin: 0 auto;
  margin-top: 100px;
  padding: 0px 100px 0 200px;    /*原来:padding: 103px 100px 0 200px;*/
  .aside-filter {
    float: left;
    width: 300px;
    padding-right: 20px;
    .header {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid @border-lighter-color;
      padding-bottom: 10px;
      width: 100%;
      .clear {
        &.clearable {
          color: @main-color;
          cursor: pointer;
        }
      }
    }
    .job-filter-block {
      margin-bottom: 40px;
    }
  }

  .content {
    min-height: 500px;
    padding-left: 20px;
    border-left: 1px solid @border-lighter-color;
    margin-left: 300px;
    &-title {
      margin-bottom: 30px;
      margin-left: 20px;
    }

    &-item {
      margin-bottom: 10px;
      padding: 10px 20px;
      cursor: pointer;
      .title {
        margin: 12px 0;
      }
      .subTitle {
        color: @regular-text-color;
      }
      .desc {
        white-space: pre-line;
        font-size: 14px;
        color: @secondary-text-color;
        .text-overflow-visible-line(2);
        text-overflow: clip;
      }
      &:hover {
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 10px 30px 0 rgba(136, 150, 171, 0.15);
      }
    }
    .pagination-wrapper {
      margin-top: 50px;
      text-align: right;
    }
  }
}


/*-----start--------轮播图---------------------------*/
.el-carousel__item {
  color: #475669;
  font-size: 14px;
  /*opacity: 0.75;*/  /*这个是设置透明度*/
  line-height: 200px;
  margin: 0;
  height: 360px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*-----end--------轮播图---------------------------*/

</style>
