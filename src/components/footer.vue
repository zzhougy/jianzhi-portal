<template functional>
  <div class="footer">
<!--    <div class="footer-content-column">-->
<!--      <p class="title">© 2012-2020 兼职平台</p>-->
<!--      <p class="title">京公网安备 11000002002023号 I 京ICP备12025439号-3</p>-->
<!--    </div>-->
<!--    <div class="footer-content-column">-->
<!--      <div class="title">联系我们</div>-->
<!--      <p>关于投递</p>-->
<!--      <p>关于投递</p>-->
<!--    </div>-->
<!--    <div class="footer-content-column">-->
<!--      <div class="title">企业官网</div>-->
<!--      <p>兼职</p>-->
<!--    </div>-->
<!--    <div class="footer-content-column">-->
<!--      <div class="title">实时动态与招聘信息，请关注我们</div>-->
<!--    </div>-->
    <p>
<!--      <a href="javasrcipt:void(0);" >Copyright &nbsp;&nbsp;</a>-->
      <a href="http://beian.miit.gov.cn/" >粤ICP备号</a>

<!--      <a href="http://www.beian.gov.cn/portal/index.do">22222222</a>-->
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.footer {
  /*height: 220px;*/
  height: 104px;
  min-width: @main-width;
  /*background: rgba(0, 0, 0, 1);*/
  background: #333;
  color: #a5a4a4;
  /*display: flex;*/
  font-size: @font-size-small;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  text-align:center;
  /*position: fixed; !*or前面的是absolute就可以用*!*/
  /*bottom: 0px;*/
  /*width: 100%;*/
  &-content-column {
    padding: 0 40px;
    height: 100px;
    .title {
      color: @secondary-text-color;
    }
    &:last-child {
      width: 340px;
      padding: 0 80px;
    }
    & + & {
      text-align: center;
      flex: 1;
      border-left: 1px solid @border-dark-color;
    }

    &__contact {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .contact-item {
        border-radius: 50%;
        width: 33px;
        height: 33px;
        overflow: hidden;
      }
    }
  }
}
</style>
