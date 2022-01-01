<template>
  <div class="app-container">
    
    
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{ (current - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="菜名" width="270"/>

      <el-table-column prop="price" label="价格(/元)" width="130"/>

        <el-table-column prop="num" label="份量(/份)" width="100"/>
        <el-table-column prop="(num*price)" label="总价"/>

        
    </el-table>
  合计：
  </div>
</template>
<script>
import food from "@/api/food";

export default {
  data() {
    return {
      b:2,
      pick:0,
      current: 1, //页码
      limit: 10, //每页多少行
      foodQuery: {}, //查询条件
      list: [], //列表数据
      total: 0, //总记录数
      np:0
    };
  },
  created() {
    this.showDingd();
    
  },
  methods: {
    showDingd(){
        food.showDing()
        .then(response=>{
            this.list=response.data.foodPickedList
        })
    },
    
    //加入订单
    addOrderForm(id) {
      this.$confirm("确定加入此菜品进入订单吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          food.addDing(id).then(response => {
            //添加成功
            console.log("添加成功");
            this.$message({
              type: "success",
              message: "添加成功!"
            });
             //刷新表格
            this.getFoodPageQuery();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },

    //移出订单
    removeOrderForm(id) {
      this.$confirm("确定将此菜品移出订单吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          food.removeDing(id).then(response => {
            //移出成功
            console.log("移出成功");
            this.$message({
              type: "success",
              message: "移出成功!"
            });
             //刷新表格
            this.getFoodPageQuery();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移出"
          });
        });
    },

    
  }
};
</script>
