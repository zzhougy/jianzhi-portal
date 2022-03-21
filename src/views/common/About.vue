<template>
  <div class="about" id="about" name="about">
    <div class="about-header">
      <div class="about-title">
        <i class="el-icon-tickets" style="color: #2b88ff;"></i>
        关于我们
      </div>
    </div>
    <div class="about-content">
      <MyMarkdown></MyMarkdown>
    </div>
  </div>
</template>
<script>
import MyMarkdown from "../../components/about/MyMarkdown";
export default {
  components: {
    MyMarkdown
  }
};
</script>
<style scoped>
.about {
  background-color: #f5f5f5;
}
.about .about-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #2b88ff;
}
.about .about-header .about-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
}
.about .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.about .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}
.about .about-content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
