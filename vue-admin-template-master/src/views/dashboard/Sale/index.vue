<template>
    <el-card class="box-card" style="margin:10px 0px">
        <div slot="header" class="clearfix">
            <!-- v-model="activeName" @tab-click="handleClick" -->
            <!-- 左侧 -->
            <el-tabs class="tab" v-model="activeName">
                <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
                <el-tab-pane label="访问量" name="visite"> </el-tab-pane>

            </el-tabs>
            <!-- 右侧 -->
            <div class="right">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <!-- v-model="value1" -->
                <el-date-picker v-model="data" class="date" type="datetimerange" start-placeholder="开始日期"
                    end-placeholder="结束日期" :default-time="['12:00:00']" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>

        </div>

        <div>
            <el-row :gutter="10">
                <el-col :span="18">
                    <div class="charts" ref="charts"></div>
                </el-col>
                <el-col :span="6" class="right">

                    <div>
                        <h3>门店{{ title }}排名</h3>
                        <ul>
                            <li>
                                <span class="rindex">0</span>
                                <span>喜欢科技</span>
                                <span class="rvalue">123213</span>
                            </li>
                            <li><span class="rindex">1</span>
                                <span>手抓饼</span>
                                <span class="rvalue">7657227</span>
                            </li>
                            <li><span class="rindex">2</span>
                                <span>肉夹馍</span>
                                <span class="rvalue">428373</span>
                            </li>
                            <li><span class="rindex">3</span>
                                <span>鸡蛋灌饼</span>
                                <span class="rvalue">72727</span>
                            </li>
                            <li><span class="rindex">4</span>
                                <span>煎饼果子</span>
                                <span class="rvalue">89793</span>
                            </li>
                            <li><span class="rindex">5</span>
                                <span>烤冷面</span>
                                <span class="rvalue">78322</span>
                            </li>
                            <li><span class="rindex">6</span>
                                <span>麻辣烫</span>
                                <span class="rvalue">785875</span>
                            </li>
                            <li><span class="rindex">7</span>
                                <span>烤肉拌饭</span>
                                <span class="rvalue">175823</span>
                            </li>
                        </ul>
                    </div>

                </el-col>
            </el-row>

        </div>

    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import {mapState} from 'vuex';
export default {
    name: 'Sale',
    data() {
        return {
            activeName: "sale ",
            mycharts: null,
            data: [] //收集日历
        }
    },
    mounted() {
        this.mycharts = echarts.init(this.$refs.charts);
        this.mycharts.setOption({
            title: {
                text: this.title + ' 趋势',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220, 120, 119, 133, 177, 354],
                    color: 'yellow'
                }
            ]
        })
    },
    computed: {
        title() {
            return this.activeName == 'sale' ? '销售额' : '访问量'
        },
        ...mapState({
            listState:(state)=>state.home.list
        })
    },
    watch: { 
        title() {
            this.mycharts.setOption({
                title: {
                    text: this.title
                },
                xAxis:{
                    data:this.title=="销售额"?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
                },
                series:[
                    {
                        name:"Direct",
                        type:"bar",
                        barWidth:"60%",
                        data:this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear,
                        color:"yellowgreen",
                    }
                ]
            })
        },
        listState(){
            this.mycharts.setOption({
            title: {
                text: this.title + ' 趋势',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.listState.orderFullYearAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.listState.orderFullYear,
                    color: 'yellow'
                }
            ]
        })
        },
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY-MM-DD');   
            this.data = [day,day];
        },
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM-DD');
            const end = dayjs().day(7).format('YYYY-MM-DD');
          
            this.data = [start, end]
        },
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY-MM-DD');
            const end = dayjs().endOf('month').format('YYYY-MM-DD');
            this.data = [start, end]
        },
        setYear() {
            const start = dayjs().startOf('year').format('YYYY-MM-DD');
            const end = dayjs().endOf('year').format('YYYY-MM-DD');
            this.data = [start, end]
        }
    },
}
</script>

<style scoped>
.clearfix {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0px;
}

.date {
    width: 250px !important;
    margin: 0px 20px;
}

.right span {
    margin: 0px 10px;
}

.charts {
    width: 100%;
    height: 300px;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}

ul li {
    height: 8%;
    margin: 10px 0px;
}

.rindex {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
}

.rvalue {
    float: right;
}
</style>