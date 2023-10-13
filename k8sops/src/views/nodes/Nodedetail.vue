<template>
  <el-space direction="vertical" fill=true fill-ratio="100%">
    <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </el-card>
  </el-space>
</template>

<script>
import { onMounted } from 'vue'
  export default {
    name: '',
    data () {
      return {
        msg: '',
        nodenames:'',
        node:{},
      }
    },
    created(){
            this.getParams()
            this.getNodedetail()
        },
    mounted(){
      onMounted(() => {
      console.log('页面已刷新')
     })
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.nodename
        // 将数据放在当前组件的数据内
        this.msg = routerParams
        this.nodenames=routerParams
      },
      getNodedetail(){
        this.$ajax({
            method: 'get',
            url:'/node/detail',
            params:{
                node_name: this.nodenames
            }
        }).then((res)=>{
          console.log(res.data)
            }).catch(function(res){
                console.log(res.data);
            })
      }

    }
    
  }
</script>

<style>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>