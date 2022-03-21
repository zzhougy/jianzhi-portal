<!-- 列表页分类 -->
<template>
  <div class="header_list">
<!--    <div class="list_content">-->
<!--      <ul class="content_ul clearfix">-->
<!--        <li :class="{now: fourNow.includes(0)}" @click="changeFour(0)"><a href="javascript:" >全部</a></li>-->
<!--        <li :class="{now: fourNow.includes(item.id)}" v-for="(item, index) in unitLabelList" :key="index" @click="changeFour(item.id)"><a href="javascript:">{{item.name}}</a></li>-->
<!--      </ul>-->
<!--    </div>-->
    <div class="list_content">
      <ul class="content_ul clearfix">
        <li :class="{now: oneNow.includes(0)}" @click="changeOne(0)"><a href="javascript:" >全部</a></li>
        <li :class="{now: oneNow.includes(item.id)}" v-for="(item, index) in jobLabelList" :key="index" @click="changeOne(item.id)"><a href="javascript:">{{item.name}}</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
// import {courseClass} from '~/api/course.js'
export default {
  props: {
    // fourNow: {
    //   default: [0]
    // },
    // oneNow:{
    //   default: [0]
    // },
    courseType: {
      default: 'course'
    },
    classList: {
      type: [Array, Object],
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // webInfo: this.$store.state.webInfo,
      twoList: [],
      threeList: [],
      oneNow: [0],
      twoNow: 0,
      threeNow: 0,
      fourNow: [0],
      fiveNow: '',
      categoryObj: {
        categoryNo1: '',
        categoryNo2: '',
        categoryNo3: '',
        isFree: ''
      },
      jobLabelList:[],
      unitLabelList:[],
    }
  },
   methods: {
    changeOne (val) {
      console.log('val' ,val )
      if (val==0){
        this.oneNow = [0]
      }else {
        console.log('5555' ,this.oneNow )
        if (this.oneNow.includes(0)){
          console.log('5566666'  )
          var index = this.oneNow.indexOf(0)
          this.oneNow.splice(index,1);
        }
        console.log('77777777'  )
        if (!this.oneNow.includes(val)){
          console.log('8888888888'  )
          this.oneNow.push(val)
        }
      }
      this.$emit('my-event', this.oneNow)
    },
     changeFour (fourNow) {
       if (fourNow==0){
         this.fourNow = [0]
       }else {
         if (this.fourNow.includes(0)){
           var index = this.fourNow.indexOf(0)
           this.fourNow.splice(index,1);
         }
         if (!this.fourNow.includes(fourNow)){
           this.fourNow.push(fourNow)
         }
       }

     },
     queryJobLabelList(){
       this.$axios.post("/jobLabel/list",{}).then(res=>{
           if(res.code==200){
             this.jobLabelList = res.data.records
             console.log('33'  )
           }
       })
     },
   },
  mounted () {
    this.queryJobLabelList()
    // this.queryUnitLabelList()
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .header_list {
    /*border-top: 1px solid rgb(215, 215, 215);*/  /*顶部的线*/
    background: #fff;
    .list_content {
      width: 1200px;
      margin: 0 auto;
      height: 73px;
      border-bottom: 1px solid rgb(215, 215, 215);
      position: relative;
      &:last-child {
        border-bottom: none;
      }
      span {
        position: absolute;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        height: 26px;
        line-height: 26px;
        top: 23px;
      }
    }
  }
  .content_ul {
    display: inline-block;
    // margin-left: 60px;
    margin-top: 23px;
    li {
      float: left;
      font-size: 14px;
      height: 26px;
      line-height: 26px;
      padding: 0 6px;
      border-radius: 6px;
      margin: 0 6px;
      a:hover {
        color: red;
        text-decoration: none;
      }
      &.now {
        background: rgb(51, 51, 51);
        a {
          color: #fff;
        }
      }
    }
  }
</style>
