<!--
 * @Description: 渲染markdown文件
 -->
<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown :source="md"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
export default {
  name: "MyMarkdown",
  components: {
    VueMarkdown
  },
  data() {
    return {
      md: ""
    };
  },
  created() {
    // 从后端请求README.md
    // this.$axios
    //   .get("/api/public/docs/README.md", {})
    //   .then(res => {
    //     this.md = res.data;
    //   })
    //   .catch(err => {
    //     return Promise.reject(err);
    //   });

    // const url = `../../../README.md`;
    // this.$axios.get(url).then((response) => {
    //   this.md = response.data;
    // });

    this.md="# jianzhi-portal\n" +
        "\n" +
        "#### 介绍\n" +
        "jianzhi门户\n" +
        "\n" +
        "#### 软件架构\n" +
        "软件架构说明\n" +
        "\n" +
        "\n" +
        "#### 安装教程\n" +
        "\n" +
        "1.  xxxx\n" +
        "2.  xxxx\n" +
        "3.  xxxx\n" +
        "\n" +
        "#### 使用说明\n" +
        "\n" +
        "1.  xxxx\n" +
        "2.  xxxx\n" +
        "3.  xxxx\n" +
        "\n" +
        "#### 参与贡献\n" +
        "\n" +
        "1.  Fork 本仓库\n" +
        "2.  新建 Feat_xxx 分支\n" +
        "3.  提交代码\n" +
        "4.  新建 Pull Request\n" +
        "\n" +
        "\n" +
        "#### 特技\n" +
        "\n" +
        "1.  使用 Readme\\_XXX.md 来支持不同的语言，例如 Readme\\_en.md, Readme\\_zh.md\n" +
        "2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)\n" +
        "3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目\n" +
        "4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目\n" +
        "5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)\n" +
        "6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)\n"
  }
};
</script>
<style>
@import "./github-markdown.css";
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
</style>
