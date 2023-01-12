<template>
    <div>
        <div class="header">
            <span class="search-header">搜索用户数</span>
            <svg t="1673327380105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3715" width="16" height="16
                ">
                <path
                    d="M473.173333 220.586667a35.84 35.84 0 1 0 35.84-35.84 35.84 35.84 0 0 0-35.84 35.84z m157.013334 485.12h-85.333334V355.413333a35.84 35.84 0 0 0-35.84-35.84H413.013333a35.84 35.84 0 1 0 0 72.106667h60.16v314.026667h-85.333333a35.84 35.84 0 1 0 0 72.106666h242.346667a35.84 35.84 0 1 0 0-72.106666z m192.853333 117.333333A439.893333 439.893333 0 1 1 341.333333 106.666667a439.893333 439.893333 0 0 1 481.706667 716.373333zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z"
                    fill="#5E5C5C" p-id="3716"></path>
            </svg>

           
        </div>
        <div class="main"> <span class="main-title">1111</span> <span class=" main-content">18.8</span>
            <svg t="1673331770593" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3652" width="13" height="13">
                <path
                    d="M554.666667 42.569344C554.666667 19.058944 535.728427 0 512 0L512 0C488.43584 0 469.333333 19.255509 469.333333 42.570368L469.333333 882.615125 218.411008 631.6928C201.803136 615.084885 174.948437 615.012907 158.169899 631.791445L158.169899 631.791445C141.507499 648.453803 141.600597 675.561899 158.182016 692.14336L474.943232 1008.904576C483.129771 1017.091072 499.405824 1024 510.960768 1024 524.629675 1024 540.698496 1017.241557 549.035477 1008.904576L865.796693 692.14336C882.465749 675.474261 882.587349 648.569984 865.808811 631.791445L865.808811 631.791445C849.146453 615.129088 822.08704 615.173419 805.569963 631.690496L554.666667 882.593835 554.666667 42.569344Z"
                    fill="#1afa29" p-id="3653"></path>
            </svg>
            <svg t="1673331880260" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4904" width="18" height="18">
            <path
                d="M703.280488 365.511671c-4.329609 10.697643-13.921058 17.040095-25.236777 17.040095L544.234145 382.551766 544.234145 835.109955c0 17.838274-14.398942 32.296567-32.232099 32.296567-17.838274 0-32.236192-14.458293-32.236192-32.296567L479.765855 382.551766l-134.206608 0c-11.314697 0-20.906146-6.342452-25.234731-17.040095-4.330632-10.69969-2.081405-22.148439 5.92085-30.334889l166.241208-170.104189c5.333472-5.459339 11.773138-8.1711 19.315928-8.1711 7.543813 0 13.982456 2.742461 19.316951 8.201799l166.241208 170.068374C705.358823 343.358115 707.610096 354.813005 703.280488 365.511671z"
                p-id="4905" fill="#f4ea2a"></path>
        </svg>
       
       
        </div>
      
        
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
import*  as echarts  from "echarts";
export default {
    name: 'lineCharts',
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
header {
    display: flex;
    align-items: center;
}

.search-header {
    margin-right: 20px;

}
.main{
    margin:10px 0px;
}
.main-title{
    margin-right: 30px;
}
.main-content{
    margin-right: 10px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>