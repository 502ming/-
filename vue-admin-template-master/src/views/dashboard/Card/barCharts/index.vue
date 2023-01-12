<template>
    <div class="charts" ref="charts"></div>
  </template>
  
  <script>
  import*  as echarts  from "echarts";
  
  export default {
     name:'barCharts',
     mounted() {
      
      //初始化echarts实例
      let barCharts=echarts.init(this.$refs.charts);
  
      barCharts.setOption({
          xAxis:{ show:false,
          type:'category'},
          yAxis:{
              show:false,
          },
          series:[
              {
                  type:'bar',
                  data:[11,6,25,11,55,6,18],
                  //拐点样式
               
             
              }
          ],
          grid:{
              left:0,
              top:0,
              right:0,
              bottom:0,
          }
      })
     },
  }
  </script>
  
  <style>
  .charts{width: 100%; height: 100%;}
  
  
  </style>