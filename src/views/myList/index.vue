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

      <el-table-column prop="price" label="价格/元" width="130"/>

        <el-table-column prop="num" label="份量/份" width="100"/>
        

        
    </el-table>
  合计：{{this.sum}}元
  <el-button type="danger">确定支付</el-button>
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
      total: 0, //总记录数
      sum:0
    };
  },
  computed:{
      sum(){
          this.c=a*b;
      }
  },
  created() {
    this.showDingd();
    
  },
  methods: {
    showDingd(){
        food.showDing()
        .then(response=>{
            this.list=response.data.foodPickedList
            for(let i=0;i<this.list.length;i++){
                this.sum+=(this.list[i].price)*(this.list[i].num)
            }
        })
    },
    
   
    
  }
};
</script>
