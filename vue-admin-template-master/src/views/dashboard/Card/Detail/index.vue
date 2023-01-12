<template>
  <div>
  <div class="card-header">
    <span>{{title}}</span>
    <svg t="1673327380105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3715" width="16" height="16"><path d="M473.173333 220.586667a35.84 35.84 0 1 0 35.84-35.84 35.84 35.84 0 0 0-35.84 35.84z m157.013334 485.12h-85.333334V355.413333a35.84 35.84 0 0 0-35.84-35.84H413.013333a35.84 35.84 0 1 0 0 72.106667h60.16v314.026667h-85.333333a35.84 35.84 0 1 0 0 72.106666h242.346667a35.84 35.84 0 1 0 0-72.106666z m192.853333 117.333333A439.893333 439.893333 0 1 1 341.333333 106.666667a439.893333 439.893333 0 0 1 481.706667 716.373333zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z" fill="#5E5C5C" p-id="3716"></path></svg>
  </div>
  <div class="card-content">{{count}}</div>
  <div class="card-charts">
      <slot name="charts"></slot>
  </div>
  <div class="card-footer"> </div>
  <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
   name:'Detail',
   props:['title','count'],
}
</script>

<style scoped>
.card-header{
    display: flex;
    justify-content: space-around;
    color: #d9d9d9;
}
.card-content{
    font-size: 30px;
    padding: 10px 0px;
}
.card-charts{
height: 50px;
}
.card-footer{
    border-top: 1px solid  #eee;
    padding-top:  10px ;

}
</style>