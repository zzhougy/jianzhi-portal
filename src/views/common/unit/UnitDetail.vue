<template>

  <div class="my-music">
<!--    <div class="banner">兼职系统欢迎你</div>-->
    <div class="album-slide">
      <div class="album-img">
        <img :src="unitDetail.unitImageUrl" alt="">
      </div>
      <ul class="album-info" >
        <li><b>单位：</b> {{unitDetail.name}}</li>
        <li><b>地址：</b> {{unitDetail.location}}</li>
        <li><b>领域：</b> {{unitDetail.fieldStr}}</li>
        <li><b>规模：</b> {{unitDetail.scale}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="album-title">简介: </div>
      <div style="font-size:20px;margin-left: 30px" >{{unitDetail.profile}}</div>
      <div class="songs-body">
        <album-content :songList="collectList">
          <template slot="title">在招岗位</template>

        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AlbumContent from './AlbumContent'
// import { getCollectionOfUser, getUserOfId, getSongOfId } from '../api/index'

export default {
  name: 'my-music',
  components: {
    AlbumContent
  },
  data () {
    return {
      avator: '',
      username: '',
      userSex: '',
      birth: '',
      location: '',
      introduction: '',
      collection: [], // 存放收藏的歌曲ID
      collectList: [],// 收藏的歌曲
      unitDetail:{},
      unitImageUrl:''
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'id',
      'listOfSongs' // 存放的音乐
    ])
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color:#e6ecf0')
    // this.getMsg(this.userId)
    // this.getCollection(this.userId)
    ///document.body.style.backgroundColor="#bdc8d9";
    this.queryUnitInfo();
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    queryUnitInfo() {
      console.log('loginInfo' , this.loginInfo)
      const {id} = this.$route.params;
      this.$axios.get("/recruitUnit/getById", {params: {id: `${id}`}}).then(res => {
        if (res.code === 200) {
          this.unitDetail = res.data;
          console.log('resl111', res)
        }
      })
    },
    getMsg (id) {
      // getUserOfId(id)
      //   .then(res => {
      //     this.username = res[0].username
      //     this.getuserSex(res[0].sex)
      //     this.birth = this.attachBirth(res[0].birth)
      //     this.introduction = res[0].introduction
      //     this.location = res[0].location
      //     this.avator = res[0].avator
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    getuserSex (sex) {
      if (sex === 0) {
        this.userSex = '女'
      } else if (sex === 1) {
        this.userSex = '男'
      }
    },

  }
}
</script>

<style lang="scss" scoped>
@import './my-music.scss';
</style>
<!--<style>-->
<!--  .banner {-->
<!--    height: 400px;-->
<!--    line-height: 400px;-->
<!--    color: #fff;-->
<!--    width: 100%;-->
<!--    min-width: 1300px;-->
<!--    /*background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/joblistbanner2x.jpg");*/-->
<!--    background-image: url("../../../static/images/zzz.jpeg");-->
<!--    background-size: cover;-->
<!--    background-repeat: no-repeat;-->
<!--    background-position: center;-->
<!--    text-align: center;-->
<!--    font-size: 32px;-->
<!--  }-->
<!--</style>-->
