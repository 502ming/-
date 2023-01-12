<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline" :model="cForm">
           
            <el-form-item label="一级分类">
                <el-select :disabled="show"  placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
                    <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
                   
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="show" placeholder="请选择"  v-model="cForm.category2Id" @change="handler2">
                    <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
                   
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类"  >
                <el-select  :disabled="show" placeholder="请选择" v-model="cForm.category3Id"  @change="handler3">
                    <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
                   
                </el-select>
            </el-form-item>
           
        </el-form>
    </div>
</template>

<script>
export default {
   
    name: 'CategorySelect',
    props:['show'],
    data(){
        return{
            //一级分类数据
            list1:[],
            list2:[],
            list3:[],
            //收集的一二三级分类id
            cForm:{
                category1Id:'',
                category2Id:'',
                category3Id:'',
            }
        }
    },
    mounted(){
        this.getCategory1List();
    },
    methods: {
     async   getCategory1List(){
            let  result= await this.$API.attr.reqCategory1List();
            if(result.code==200){
                this.list1=result.data;
            }
        },
        //一级变了获取2级的分类 以此类推
    async    handler1(){
        //清除一下数据
        this.list2=[];
        this.list3=[];
        this.cForm.category2Id='';
        this.cForm.category3Id='';
      
            //解构一级分类的id
            const{category1Id}=this.cForm;

            this.$emit('getCategoryId',{categoryId:category1Id,level:1});

            let result= await this.$API.attr.reqCategory2List(category1Id);
           
          if(result.code==200){
            this.list2=result.data;
          }
        },

        async handler2(){
            this.list3=[];   
            this.cForm.category3Id='';
            const{category2Id}=this.cForm; 
            this.$emit('getCategoryId',{categoryId:category2Id,level:2});
            let result=await this.$API.attr.reqCategory3List(category2Id);
          
            if(result.code==200){
                this.list3=result.data;
            }
        },
        async handler3(){
            const{category3Id}=this.cForm;
            this.$emit('getCategoryId',{categoryId:category3Id,level:3});
        }
    },
}
</script>

<style>

</style>