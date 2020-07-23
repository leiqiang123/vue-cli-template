<template>
  <div>
    <el-table border :data="dataList">
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column align="center" label="姓名"></el-table-column>
      <el-table-column align="center" label="地址"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: 'adout',
    data() {
      return {
        dataList:[],
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
</style>
