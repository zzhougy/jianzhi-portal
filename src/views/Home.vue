<template>
  <div class="home">
    <div ref="banner" class="banner content-item-block">
      <div class="video-wrapper">
<!--        <video-->
<!--          ref="video"-->
<!--          class="video"-->
<!--          preload="auto"-->
<!--          muted-->
<!--          loop-->
<!--          playsinline-->
<!--          autoplay-->
<!--          poster="src/static/images/background.jpeg"-->
<!--          tabindex="-1"-->
<!--        ></video>-->
        <img style="position: relative;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;" src="../../src/static/images/background8.jpg">
      </div>
      <h1 class="banner-title">
        兼职 实践<br>

      </h1>
      <h1 style="font-size: 30px;color: white;margin-bottom: -68px">Part-time Job<br></h1>

      <div class="search">
<!--        <input-search @search="searchJobs" placeholder="输入企业或岗位进行搜索"></input-search>-->

          <el-input placeholder="输入搜索内容" class="input-with-select" v-model="input" @keyup.enter.native="searchzhou">
<!--            <el-select slot="prepend" placeholder="请选择">-->
<!--              <el-option value="disabled" disabled>选择国家和地区</el-option>-->
<!--              <hr class="input-with-select__divider" />-->
<!--              <el-option-->
<!--                      :value="`+${item.val}`"-->
<!--                      v-for="item in aaaa"-->
<!--                      :key="item.id"-->
<!--              >{{ item.val }}</el-option>-->
<!--            </el-select>-->
            <el-select slot="prepend" v-model="value" placeholder="请选择" style="width: 100px;color:black;">
<!--              <el-option value="disabled" disabled>选择国家和地区</el-option>-->
<!--                            <hr class="input-with-select__divider" />-->
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" slot="append" @click="searchzhou" style="background: #3370ff;color: #fff">搜索</el-button>
          </el-input>

      </div>


<!--      <div class="bottom-tips">-->
<!--        <span class="arrow-down" @click="scrollDown">-->
<!--          <i>⤓</i>-->
<!--        </span>-->
<!--        <span class="vertical-dashed"></span>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { watchScrollDirection } from "@/helper/utilities.js";
export default {
  name: "home",
  data() {
    return {
      productLayerVisible: true,
      search: "",
      products: [],
      jobCategories: [],
      byteStandards: [],
      byteStandardActiveIndex: 0,
      staffStories: [],
      input1: '',
      input2: '',
      input3: '',
      select: '',
      options: [{
        value: '选项1',
        label: '企业'
      }, {
        value: '选项2',
        label: '岗位'
      }],
      value: '',
      input:'',
    };
  },
  created() {

  },
  methods: {
    onScrollRightAnimationEnd() {
      this.productLayerVisible = false;
    },
    scrollDown() {
      this.$refs.product.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    },
    searchJobs(keyword) {
      this.$router.push({ name: "jobs", params: { keyword } });
    },
    jumpToDetail(item) {
      this.$router.push({ name: "products", params: item });
    },
    searchzhou(){
      if (this.value === "选项1"){
        this.$router.push({ name: "units", params: {searchInput:this.input,type:this.value} });
      }else if (this.value === "选项2"){
        this.$router.push({ name: "jobs", params: {searchInput:this.input,type:this.value} });
      }else {
        this.$message.error("请选择搜索条件")
      }

    },
  },
  mounted() {
    const rootVm = this.$root;
    rootVm.$emit(
      "home-scrolling",
      { directionX: 1, directionY: -1 },
      { x: document.body.scrollLeft, y: document.body.scrollTop }
    );
    this.unwatch = watchScrollDirection(window, function(...args) {
      rootVm.$emit("home-scrolling", ...args);
    });
  },
  destroyed() {
    this.unwatch();
  }
};
</script>


<!--<style lang="scss" scoped>-->

<!--</style>-->
<style lang="less" scoped>
@keyframes verticalMotion {
  0% {
    transform: translateY(6px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(6px);
  }
}
@keyframes scrollToRight {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}


.home {
  .main {
    width: @main-width;
    margin: auto;
  }
  .content-item-block {
    .title {
      font-size: @font-size-larger;
    }
  }
}

.banner {
  height: 100vh;
  min-height: 400px;
  min-width: @main-width;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(51, 112, 255, 0.2);
  position: relative;
  .video-wrapper {
    font-size: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    .video {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  &-title {
    color: #fff;
    font-size: 60px;
    text-align: center;
    .subTitle {
      &::after,
      &::before {
        content: "";
        position: absolute;
        background-image: linear-gradient(
          270deg,
          hsla(0, 0%, 100%, 0),
          #fff 47%,
          hsla(0, 0%, 100%, 0)
        );
        height: 2px;
        width: 89px;
        top: 50%;
        transform: translateY(-50%);
      }
      &:before {
        right: 10px;
      }
      &:after {
        left: 10px;
      }
      position: relative;
      margin-top: 10px;
      font-size: @font-size-base;
      letter-spacing: 20px;
    }
  }
  .search {
    width: 500px;
    margin-top: 100px;
    margin-bottom: 40px;
  }
  .bottom-tips {
    position: absolute;
    bottom: 30px;
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    text-align: center;
    .arrow-down {
      display: block;
      margin-bottom: 4px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #fff;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
      font-size: 21px;
      i {
        animation: verticalMotion 1.3s infinite linear;
        display: inline-block;
        font-style: normal;
      }
    }
    // 分割竖线
    .vertical-dashed {
      border-left: 1px dashed #fff;
      height: 30px;

      display: inline-block;
    }
  }
}

// 产品
.product {
  margin-top: 40px;
  text-align: center;
  padding: 40px 40px;
  background: url(//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/global.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 370px;
  .desc {
    margin: 40px 0;
  }
  &-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &-item {
    width: 90px;
    // height: 90px;
    cursor: pointer;
    &:nth-child(1),
    &:nth-child(9) {
      margin-top: 116px;
    }
    &:nth-child(2),
    &:nth-child(8) {
      margin-top: 80px;
    }
    &:nth-child(3),
    &:nth-child(7) {
      margin-top: 55px;
    }
    &:nth-child(4),
    &:nth-child(6) {
      margin-top: 30px;
    }
    &:hover {
      color: @main-color;
      img {
        border-radius: 19px;

        transform: scale(1.2);
        transform-origin: bottom;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }
    img {
      width: 90px;
      height: 90px;
      border-radius: 19px;

      margin-bottom: 10px;
      transition: transform 0.3s;
    }
  }
  .more {
    margin: auto;
    margin-top: 170px;

    width: 149px;
  }
}

// 职位

.job-category {
  text-align: center;
  margin-top: 90px;

  &-list {
    margin-top: 70px;
  }
  &-item {
    float: left;
    margin-bottom: 16px;
    .image {
      width: 250px;
      height: 250px;
      line-height: 250px;
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 50%;
      margin: 0 auto;

      transition: all 0.3s;
      background-position: center;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 8px 1px #ccc;
        background-size: 110%;
        & + .name {
          color: @main-color;
        }
      }
      .overlay {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;

        font-size: 40px;
      }
    }
    .name {
      margin-top: 23px;
      font-size: @font-size-large;
    }
    margin: 0 2.5%;
    margin-bottom: 30px;
    width: 20%;
  }
}


// 员工故事
.staffStory {
  padding: 0 140px;
  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  &-list {
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  &-item {
    // height: 450px;
    overflow: hidden;
    padding: 30px;
    width: 30%;
    cursor: pointer;

    &:hover {
      box-shadow: 0 10px 30px 0 @box-shadow-hover-color;
      .circular-button {
        color: @main-color;
      }
    }
    .avatar {
      width: 70%;
      margin: auto;
    }
    .text {
      .title {
        color: @primary-text-color;
        font-weight: @font-weight-regular;
        font-size: @font-size-large;
        margin: 10px 0;
        white-space: nowrap;
      }
      .desc {
        color: @primary-text-color;
        margin: 12px 0;
        font-size: @font-size-base;
      }
      .remark {
        font-size: @font-size-base;

        color: @regular-text-color;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .circular-button {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: 1px solid;
      line-height: 30px;

      margin: auto;
      margin-top: 20px;
      color: #ccc;
    }
  }
}
</style>
