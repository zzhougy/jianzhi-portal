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
import Info from './Info'
import ChangePassword from './ChangePassword'

export default {
  name: 'setting',
  components: {
    Info,
    ChangePassword
  },
  data () {
    return {
      activeName: '个人信息',
      componentSrc: 'Info',
      settingList: [{
        icon: '',
        name: '个人信息',
        path: 'Info'
      },
        {
          icon: '',
          name: '修改密码',
          path: 'ChangePassword'
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
