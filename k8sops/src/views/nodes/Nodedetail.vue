<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Consistency" name="1">
        <div>
          <el-descriptions>
            <el-descriptions-item label="名 称">{{ metadata.name }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ metadata.creationTimestamp }}</el-descriptions-item>
            <el-descriptions-item label="Age">{{ age }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions>
            <el-descriptions-item label="标 签">
              <el-tag size="small" v-for="(v, k) in metadata.labels " :key="k">{{ k }}:{{ v }}&nbsp;&nbsp;</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Resource information" name="2">
        <el-descriptions>
          <el-descriptions-item label="ADDRESS">
            <el-tag size="small" v-for="(v, k) in status.addresses " :key="k">{{ v.type }}:{{ v.address
            }}&nbsp;&nbsp;</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="Taints">
            <el-tag size="small" v-for="(v, k) in spec.taints " :key="k">{{ v.key }}:{{ v.effect }}&nbsp;&nbsp;</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item title="System information" name="3">
        <el-descriptions direction="vertical" :column="4">
          <el-descriptions-item label="Machine ID">{{ status.nodeInfo.machineID }}</el-descriptions-item>
          <el-descriptions-item label="System UUID">{{ status.nodeInfo.systemUUID }}</el-descriptions-item>
          <el-descriptions-item label="Boot ID">{{ status.nodeInfo.bootID }}</el-descriptions-item>
          <el-descriptions-item label="Kernel version">{{ status.nodeInfo.kernelVersion }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions direction="vertical" :column="5">
          <el-descriptions-item label="OS Image">{{ status.nodeInfo.osImage }}</el-descriptions-item>
          <el-descriptions-item label="Container runtime version">{{ status.nodeInfo.containerRuntimeVersion
          }}</el-descriptions-item>
          <el-descriptions-item label="kubelet version">{{ status.nodeInfo.kubeletVersion }}</el-descriptions-item>
          <el-descriptions-item label="kube-proxy version">{{ status.nodeInfo.kubeProxyVersion }}</el-descriptions-item>
          <el-descriptions-item label="Architecture">{{ status.nodeInfo.architecture }}</el-descriptions-item>
          <el-descriptions-item label="Operating system">{{ status.nodeInfo.operatingSystem }}</el-descriptions-item>
          <el-descriptions-item label="CPU capacity">{{ status.allocatable.cpu }}</el-descriptions-item>
          <el-descriptions-item label="Memory capacity">{{ memory }}</el-descriptions-item>
          <el-descriptions-item label="Pods capacity">{{ status.allocatable.pods }}</el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item title="Allocation" name="4">
        <div style="height: 250px;width: 250px; float: left; overflow: hidden;">
          <div id="cpu_request" style="height: 250px;width: 250px;"></div>
        </div>
        <div style="height: 250px;width: 250px; float: left; overflow: hidden;">
          <div id="cpu_limit" style="height: 250px;width: 250px;"></div>
        </div>
        <div style="height: 250px;width: 250px; float: left; overflow: hidden;">
          <div id="memory_request" style="height: 250px;width: 250px;"></div>
        </div>
        <div style="height: 250px;width: 250px; float: left; overflow: hidden;">
          <div id="memory_limit" style="height: 250px;width: 250px;"></div>
        </div>
        <div style="height: 250px;width: 250px; float: left; overflow: hidden;">
          <div id="pods" style="height: 250px;width: 250px;"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Pods" name="5">

        <el-table :data="pods" stripe style="width: 100%">
          <el-table-column prop="Name" label="Date" width="180" />
          <el-table-column prop="Image" label="Name" width="180" />
          <el-table-column label="Address" width="300">
            <template #default="scope">
              <el-tag size="small" v-for="(v, k) in scope.row.Labels " :key="k">{{ k }}:{{ v }}<br></el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="Status" label="Date" width="180" />
          <el-table-column prop="Restart" label="Name" width="180" />
          <el-table-column prop="PodAge" label="Address" min-width="180" />
        </el-table>

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import * as echarts from 'echarts';
export default {
  name: '',
  data() {
    return {
      nodenames: 'k8s-master1',
      node: {},
      metadata: {},
      spec: {},
      status: {
        nodeInfo: {},
        allocatable: {},
      },
      pods: [],
      age: '',
      activeNames: ['1'],
      memory: '',
      result: {
        total: 1,
        cpu: 1
      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    }
  },
  created() {
    this.getParams()
    this.getNodedetail()
  },
  mounted() {
    this.getchart(this.result);//定义一个接口方法在methods中调用 
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数 
      let routerParams = this.$route.query.nodename
      // 将数据放在当前组件的数据内
      this.nodenames = routerParams
    },
    getNodedetail() {
      this.$ajax({
        method: 'get',
        url: '/node/detail',
        params: {
          node_name: this.nodenames
        }
      }).then((res) => {
        this.metadata = res.data.detail.metadata
        this.spec = res.data.detail.spec
        this.status = res.data.detail.status
        this.age = res.data.age
        this.memory = res.data.memory_allocator
        this.pods = res.data.pods
        console.log(res.data)
        console.log(this.status.nodeInfo.machineID)
      }).catch(function (res) {
        console.log(res.data);
      })
    },

    //图表方法
    getchart(result) {
      //获取id并初始化图表
      var cpu_request = echarts.init(document.getElementById('cpu_request'));
      var cpu_limit = echarts.init(document.getElementById('cpu_limit'));
      var memory_request = echarts.init(document.getElementById('memory_request'));
      var memory_limit = echarts.init(document.getElementById('memory_limit'));
      var pods = echarts.init(document.getElementById('pods'));
      //配置项
      var option = {
        color: ['#5fb878', '#eeeeee'],
        title: [{
          text: 'Pie',
          left: '85%',
        }, {
          subtext: 'alignTo',
          left: '50%',
          top: '85%',
          textAlign: 'center'
        }
        ],
        grid: {
          x2: 5,
          y2: 10
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['60%', '65%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,   //关闭放大动画
            selectedOffset: 0,     //选中块的偏移量
            label: {
              show: false,
              position: 'center',
              formatter: '{d}%\nrequest'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: (function () {
              var res = []
              res[0] = {
                value: result.total,
                name: '直接访问',
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
                res[1] = {
                  value: result.cpu,
                  name: '邮箱营销'
                }
              return res
            })()
          }
        ]
      };
      cpu_request.setOption(option)
      cpu_limit.setOption(option)
      memory_request.setOption(option)
      memory_limit.setOption(option)
      pods.setOption(option)
    },
  }
}
</script>

<style></style>