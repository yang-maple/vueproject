<template>
  <!-- 用来放echarts图表的容器，一定要有宽高 -->
<div>
<div id="main" style="height: 300px;width: 400px;"></div>
</div>

</template>


<script>
import * as echarts from 'echarts';
export default {
  data (){
      return{
      }
  },
  mounted() {
      this.getchart();//定义一个接口方法在methods中调用 
  },
  methods: {
 
      //图表方法
      getchart() {
          //获取id并初始化图表
          var chartDom  = document.getElementById('main');
          var myChart = echarts.init(chartDom);
          //配置项
          var option;
          option = {
         xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
         yAxis: {
          type: 'value'
           },
          series: [
            {
            data: [150, 230, 224, 218, 135, 147, 260],
         type: 'line'
           }
         ]
       };
          option && myChart.setOption(option)//通过setOption()方法生成图表
      },
  },
}
</script>
<style scoped>
  .generalStyle {
      width: 100%;
      height: 90%;
  }
</style>