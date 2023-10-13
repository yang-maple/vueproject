<template >
      <div v-if="!showtable">
        <el-table
          :data="tableData"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
          stripe
          @cell-click="handle"
          >
          <el-table-column align="center" type='index' label="序号" width="65"/>
          <el-table-column  prop="metadata.name" label="名称" sortable width="150" />
          <el-table-column   label="标签"  width="350" >
            <template #default="scope">
   	 	        <el-tag class="ml-2" type="success" v-for="(v,k) in scope.row.metadata.labels " :key="k" >{{ k }}:{{ v }}<br></el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status.conditions[4].type" label="状态" width="100" />
          <el-table-column prop="status.addresses[0].address" label="ip 地址" width="100" />
          <el-table-column prop="status.allocatable.cpu" align="center" label="CPU(核)" width="100" />
          <el-table-column align="center" label="可分配内存" width="100" >
            <template #default="scope" >
            <span> {{  node.memory[scope.row.metadata.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="pod 数量" width="100" >
            <template #default="scope" >
              <span> {{  node.pod[scope.row.metadata.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="metadata.creationTimestamp" label="创建时间" width="200" />
          <el-table-column prop="status.nodeInfo.kubeletVersion" label="版本" width="100" />
          <el-table-column prop="status.nodeInfo.containerRuntimeVersion" label="镜像驱动" width="160" />
        </el-table>
     </div>
     <RouterView></RouterView>
</template>
    
<script>
  import { onMounted } from 'vue'
  export default {
    data() {
      return {
        tableData: [],
        node:{
          pod:{},
          memory:{},
        },
        msg: 'test message',
        showtable:false
      }
    },
    created(){
            this.GetNodelistaxios()
        },
    mounted(){
      onMounted(() => {
      this.GetNodelistaxios()
      this.showtable=false
      console.log('页面已刷新')
     })
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 2) {
          return 'success-row';
        }
        return '';
      },
      Getnodes(name){
        this.$ajax({
            method: 'get',
            url:'/node/detail',
            params:{
                node_name: name
            }
        }).then((res)=>{
          this.node.pod[name]=res.data.total
          this.node.memory[name]=res.data.memory_allocator
            }).catch(function(res){
                console.log(res.data);
            })
      },
      
      GetNodelistaxios(){
            this.$ajax.get("/node/list").then((res)=>{
                this.tableData=res.data.node_name
                this.tableData.forEach(v=>{
                  this.Getnodes(v.metadata.name)
                })
                console.log(this.$route.path)
            }).catch(function(res){
                console.log(res.data);
            })
        },

      handle(row,column,event,cell){
        
        this.$router.push({
          path:'/cluster/node/node_detail',
          name:'node详情',
          query:{
            nodename:row.metadata.name
          }
        })
        this.showtable=true
      },
    }
}
</script>

<style>
  .el-table__body tr:hover>td{
 background-color: #f0f9eb !important;
  }  
 
</style>