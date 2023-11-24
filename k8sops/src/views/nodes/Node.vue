<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple">
        <el-table :data="tableData" :header-cell-style="{ background: '#e6e7e9' }" style="width: 100%" size="small"
          :default-sort="{ prop: 'date', order: 'descending' }" @cell-click="handle">
          <el-table-column label="Name" width="220" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon>
                  <timer />
                </el-icon>
                <span style="margin-left: 10px">{{ scope.row.metadata.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="标签" width="350">
            <template #default="scope">
              <el-tag class="ml-2" size="small" v-for="(v, k) in scope.row.metadata.labels " :key="k">{{ k }}:{{ v
              }}<br></el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status.conditions[4].type" label="状态" width="100" />
          <el-table-column prop="status.addresses[0].address" label="ip 地址" width="100" />
          <el-table-column prop="status.allocatable.cpu" align="center" label="CPU(核)" width="100" />
          <el-table-column align="center" label="可分配内存" width="100">
            <template #default="scope">
              <span> {{ node.memory[scope.row.metadata.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="pod 数量" width="100">
            <template #default="scope">
              <span> {{ node.pod[scope.row.metadata.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="metadata.creationTimestamp" label="创建时间" width="200" />
          <el-table-column prop="status.nodeInfo.kubeletVersion" label="版本" width="100" />
          <el-table-column prop="status.nodeInfo.containerRuntimeVersion" label="镜像驱动" width="160" />
        </el-table>
        <el-row>
          <el-col :span="4">
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="4">
            <div class="grid-content ep-bg-purple-light" />
          </el-col>
          <el-col :span="4">
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="4">
            <div class="grid-content ep-bg-purple-light" />
          </el-col>
          <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="5">
            <div class="grid-content3">
              <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="page_size" small
                background layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
          </el-col>
        </el-row>
      </div>


    </el-col>
  </el-row>
</template>

<script scoped>
export default {
  data() {
    return {
      tableData: [],
      node: {
        pod: {},
        memory: {},
      },
      msg: 'test message',
    }
  },
  created() {
    this.GetNodelistaxios()
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'warning-row';
      } else if (rowIndex === 2) {
        return 'success-row';
      }
      return '';
    },
    Getnodes(name) {
      this.$ajax({
        method: 'get',
        url: '/node/detail',
        params: {
          node_name: name
        }
      }).then((res) => {
        this.node.pod[name] = res.data.total
        this.node.memory[name] = res.data.memory_allocator
      }).catch(function (res) {
        console.log(res.data);
      })
    },

    GetNodelistaxios() {
      this.$ajax.get("/node/list").then((res) => {
        this.tableData = res.data.node_name
        this.tableData.forEach(v => {
          this.Getnodes(v.metadata.name)
        })
        console.log(this.$route.path)
      }).catch(function (res) {
        console.log(res.data);
      })
    },

    handle(row, column, event, cell) {

      this.$router.push({
        path: '/cluster/node_detail',
        name: 'node详情',
        query: {
          nodename: row.metadata.name
        }
      })
    },
  }
}
</script>


<style>
.el-table__body tr:hover>td {
  background-color: #f0f9eb !important;
}

.el-row {
  margin-bottom: 100px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #f0f2f5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.grid-content {
  border-radius: 4px;
  min-height: 10px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.grid-content1 {
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 4px;
}

.grid-content2 {
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 4px;
}

.grid-content3 {
  border-radius: 4px;
}

.el-table,
.el-table__expanded-cell {
  padding: 10px;
  background-color: transparent;
}

.el-table th,
.el-table tr {
  background-color: transparent;
}

.el-button--text {
  margin-right: 15px;
}


.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-dialog--center {
  min-height: 400px;
  min-width: 200px;
}

.el-dialog__body {
  min-height: 400px;
}

.demo-pagination-block+.demo-pagination-block {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}


/* .el-form-item__content .el-input {
    width: 500px;
} */
</style>