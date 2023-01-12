<template>
  <div>
    <el-card style="margin:20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width:100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width"></el-table-column>
          <el-table-column prop="description" label="Spu描述"></el-table-column>
          <el-table-column label="Spu操作">
            <template slot-scope="{row,$index}">
              <Hint-button type="success" icon="el-icon-plus" size="mini" title="添加Sku"
                @click="addSku(row)"></hint-button>
              <el-button type="warning" icon="el-icon-edit" size="mini" title="修改Sku" @click="updateSpu(row)">
              </el-button>
              <el-button type="info" icon="el-icon-info" size="mini" title="查看当前spu" @click="handler(row)"></el-button>
              <el-popconfirm title="这是一段内容这是一段内容确定删除吗" @onConfirm="deleteSpu(row)">
                <el-button style="margin-left:10px" type="danger" icon="el-icon-delete" size="mini" title="删除spu"
                  slot="reference"></el-button>
              </el-popconfirm>

            </template>  

          </el-table-column>
        </el-table>
        <el-pagination style="text-align:center" :total="total" :current-page="5" :page-size="limit"
          :page-sizes="[3, 5, 10]" @current-change="getSpuList" @size-change="handleSizeChange"
          layout="prev,pager,next,jumper,->,sizes,total">
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2" @changeScenes="changeScenes" ref="sku"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" style="width:100%" border v-loading="loading">
        <el-table-column property="skuName" label="名称" width="width"></el-table-column>
        <el-table-column property="price" label="价格" width="width"></el-table-column>
        <el-table-column property="weight" label="重量" width="width"></el-table-column>
        <el-table-column  label="默认图片">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style=" width:100px;height:100">
            
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm';
import SkuForm from './SkuForm';
export default {
  name: 'Spu',

  data() {
    return {

      category1Id: '',
      category2Id: '',
      category3Id: '',

      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0, //spu的列表数据展示   1添加Spu|修改Spu 2添加Sku
      dialogTableVisible: false,
      spu:{},
      skuList:[],
      loading:true,
    }
  },
  methods: {
    close(done){
      this.loading=true;
      this.skuList=[];
      done();
    },
    //chakan sku
   async handler(spu){
    this.dialogTableVisible=true;
    this.spu=spu;
    let result= await this.$API.spu.reqSkuList(spu.id);
    if(result.code==200){
      this.skuList=result.data;
      this.loading=false;
    }

    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getDate(this.category1Id, this.category2Id, row);
    },
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = '';
        this.category3Id = '';
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = '';
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);

      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);

    },
    changeScene({ scene, flag }) {
      if (flag = "修改") {
        this.scene = scene;
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }

    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);

      if (result.code == 200) {
        this.$message({ type: 'success', message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    changeScenes(scene) {
      this.scene = scene;

    },
  },
  components: {
    SpuForm,
    SkuForm,
  },
}
</script> 

<style>

</style>
