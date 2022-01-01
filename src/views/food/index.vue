<template>
  <div class="app-container">
    
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="foodQuery.name" placeholder="菜名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="foodQuery.kind" clearable placeholder="菜品分类">
          <el-option :value="'荤菜'" label="荤菜"/>
          <el-option :value="'素菜'" label="素菜"/>
          <el-option :value="'主食'" label="主食"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getFoodPageQuery()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (current - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="菜名" width="150"/>

      <el-table-column  prop="kind" label="菜品分类" width="100" >
      </el-table-column>


      <el-table-column prop="price" label="价格" width="80"/>

      <el-table-column prop="start" label="评价" width="80"/>

        <el-table-column prop="note" label="简介" />

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/food/add/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">菜品评价</el-button>
          </router-link>

           <el-button
            type="success"
            size="mini"
            icon="el-icon-circle-plus-outline"
            @click="addOrderForm(scope.row.id)"
          >加入订单</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getFoodPageQuery"
    />
  </div>
</template>
<script>
import food from "@/api/food";

export default {
  data() {
    return {
      current: 1, //页码
      limit: 10, //每页多少行
      foodQuery: {}, //查询条件
      list: [], //列表数据
      total: 0 //总记录数
    };
  },
  created() {
    this.getFoodPageQuery();
  },
  methods: {
    getFoodPageQuery(current = 1) {
      this.current = current;
      food
        .getFoodPageVo(this.current, this.limit, this.foodQuery)
        .then(response => {
          console.log(response);
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    //清空
    resetData() {
      this.foodQuery = {};
      this.getFoodPageQuery();
    },

    //加入订单
    addOrderForm(id) {
      this.$confirm("确定加入此菜品进入订单吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          teacher.delTeacher(id).then(response => {
            //删除成功
            console.log("添加成功");
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            //刷新表格
            this.getTeacherPageQuery();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    }
    
  }
};
</script>
