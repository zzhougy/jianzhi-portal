<template>
  <div class="setting">
    <div class="leftCol">
      <div class="settingsMainHeader">设置</div>
      <ul class="setting-aside">
        <li v-for="(item, index) in settingList" :key="index" :class="{activeColor: activeName === item.name}" @click="handleClick(item)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="contentCol">
      <component :is="componentSrc"></component>
    </div>
  </div>
</template>

<script>
import Info from './UnitInfo'
import Upload from './Upload'
import AccountInfo from './AccountInfo'
import PersonManage from './PersonManage'

export default {
  name: 'BasicInfo',
  components: {
    Info,
    Upload,
    AccountInfo,
    PersonManage
  },
  data () {
    return {
      activeName: '账号信息',
      componentSrc: 'AccountInfo',
      settingList: [
        {
          icon: '',
          name: '账号信息',
          path: 'AccountInfo'
        },{
        icon: '',
        name: '单位信息',
        path: 'Info'
      }, {
        icon: '',
        name: '人员管理',
        path: 'PersonManage'
      }, {
        icon: '',
        name: '修改密码',
        path: 'Upload'
      }]
    }
  },
  mounted () {
    ///document.body.style.backgroundColor="#bdc8d9";
    document.querySelector('body').setAttribute('style', 'background-color:#bdc8d9')
  },
  methods: {
    handleClick (item) {
      this.activeName = item.name
      this.componentSrc = item.path
    },
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
}
</script>

<style lang="scss" scoped>

  @import 'src/assets/stycle-zhou/setting';

</style>
