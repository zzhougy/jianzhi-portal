<template>
  <div class="upload">
    <p class="title">人员管理</p>
    <hr/>
<!--    <div class="section">-->
    <el-button>邀请人员</el-button>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                type="index"
                label="序号"
                width="400">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="400">
        </el-table-column>
        <el-table-column
                label="操作"
                width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" >移除</el-button><!--v-show="scope.row.id!=1"-->
          </template>
        </el-table-column>
      </el-table>
<!--    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {cities} from "../../../assets/data/form";

export default {
  name: 'PersonManage',
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.queryHrList()
  },
  methods: {
    queryHrList(){
      this.$axios.post("/hrInfo/list",{}).then(res=>{
        if (res.code === 200 ){
          this.tableData = res.data.records
        }else {
          this.$message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/stycle-zhou/upload';
</style>
