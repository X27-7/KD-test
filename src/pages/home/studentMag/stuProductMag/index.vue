<template>
  <div class="stuProduct">
    <div class="search">
      <el-input
        placeholder="请输入姓名,如果不更新,点击右侧搜索按钮"
        v-model="input"
        clearable
        class="search_ipt"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search"></el-button>
      <el-button type="primary">添加项目</el-button>
    </div>

    <div class="team">
      <span>班级选择：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="outExcel">
      <el-button type="success">成功按钮</el-button>
    </div>

    <div class="excel">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="头像" width="130">
        </el-table-column>
        <el-table-column prop="province" label="姓名" width="170">
        </el-table-column>
        <el-table-column prop="city" label="班级" width="333">
        </el-table-column>
        <el-table-column prop="address" label="项目" width="333">
        </el-table-column>

        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              size="small"
              type="primary"
              icon="el-icon-view"
              >查看</el-button
            >
            <el-button size="small" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              size="small"
              type="primary"
              icon="el-icon-delete"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
  data() {
    return {
      input: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  margin: 25px 0;
  display: flex;
  justify-content: flex-start;
  height: 40px;
  .search_ipt {
    width: 330px;
    margin-right: 10px;
    line-height: 0;
  }
}

.team {
  display: flex;
  justify-content: flex-start;
  margin: 25px 0;
  height: 40px;
  align-items: center;
}

.outExcel {
  display: flex;
  justify-content: flex-end;
  margin: 0 20px 10px 0;
}
</style>