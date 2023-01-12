<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import*  as echarts  from "echarts";

export default {
   name:'lineChart',
   mounted() {
    
    //初始化echarts实例
    let lineCharts=echarts.init(this.$refs.charts);

    lineCharts.setOption({
        xAxis:{ show:false,
        type:'category'},
        yAxis:{
            show:false,
        },
        series:[
            {
                type:'line',
                data:[11,6,25,11,55,6,18],
                //拐点样式
                itemStyle:{
                    opacity:0
                },
                lineStyle:{
                    color:"red"
                },
                areaStyle:{
                  color:{
                    type:"linear",
                   x:0,
                   y:0,
                   x2:0,
                   y2:1,
                   colorStops:[
                    {
                        offset:0,
                        color:"blue",
                    },
                    {
                        offset:1,
                        color:"pink",
                    },
                   ],
                   global:false,
                  }
                }
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

<style scoped>
.charts{width: 100%; height: 100%;}


</style>