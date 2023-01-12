<template>
   <div>

      <el-form ref="form" label-width="80px">
         <el-form-item label="spu名称">{{ spu.spuName }}</el-form-item>
         <el-form-item label="sku名称">
            <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
         </el-form-item>
         <el-form-item label="价格(元)"> <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
         </el-form-item>

         <el-form-item label="重量(千克)"> <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
         </el-form-item>
         <el-form-item label="规格描述"> <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
         </el-form-item>
         <el-form-item label="平台属性">
            <el-form :inline="true" ref="form " label-width="80px">
               <el-form-item :label="attr.attrName" v-for="(attr, index) in attrInfoList" :key="attr.id">
                  <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                     <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"
                        v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id">
                     </el-option>

                  </el-select>
               </el-form-item>
               <!-- <el-form-item  label="无线通信"> 
                <el-select placeholder="请选择"> <el-option></el-option></el-select>
             </el-form-item>   -->
            </el-form>
         </el-form-item>
         <el-form-item label="销售属性">
            <el-form :inline="true" ref="form" label-width="80px">
               <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr, index) in spuSaleAttrList"
                  :key="saleAttr.id">
                  <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                     <el-option :label="saleAttrValue.saleAttrValueName"
                        v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"
                        :value="`${saleAttr.id}:${saleAttrValue.id}`"></el-option>
                  </el-select>
               </el-form-item>
            </el-form>
         </el-form-item>

         <el-form-item label="图片列表">
            <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
               <el-table-column type="selection" style="width=80"></el-table-column>
               <el-table-column label="图片 ">
                  <template slot-scope="{row,$index}">
                     <img :src="row.imgUrl" style="width:100px;height:100px">
                  </template>
               </el-table-column>
               <el-table-column label="名称" prop="imgName" width="width"></el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="{row,$index}">
                     <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设置默认</el-button>
                     <el-button v-else>默认</el-button>
                  </template>
               </el-table-column>
            </el-table>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="save"> 保存</el-button>
            <el-button @click="cancel"> 取消</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
   name: 'SkuForm',
   data() {
      return {
         //存储图片信息
         spuImageList: [],
         //存储销售
         spuSaleAttrList: [],
         //手机sku数据字段 
         attrInfoList: [],
         spu: {},
         imageList: [],
         skuInfo: {

            // 父组件给的数据                    
            weight: " ",
            category3Id: 0,
            spuId: 0,
            tmId: 0,
            //  双向绑定的
            skuName: "",
            price: 0,
            skuDesc: " ",
            //    需要手写
            //默认图片字段
            "skuDefaultImg": " ",
            skuAttrValueList: [
               {
                  "attrId": 0,

                  "valueId": 0,

               }
            ],


            "skuImageList": [
               {
                  // "id": 0,
                  // "imgName": "string",
                  // "imgUrl": "string",
                  // "isDefault": "string",
                  // "skuId": 0,
                  // "spuImgId": 0
               }
            ],

            "skuSaleAttrValueList": [
               {
                  // "id": 0,
                  // "saleAttrId": 0,
                  // "saleAttrName": "string",
                  // "saleAttrValueId": 0,
                  // "saleAttrValueName": "string",
                  // "skuId": 0,
                  // "spuId": 0
               }
            ],


         }
      };
   },
   methods: {
      async save() {
         const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
         // let arr=[];  方式1 
         // attrInfoList.forEach(item=>{
         //    if(item.attrIdAndValueId){
         //       const[attrId,ValueId]=item.attrIdAndValueId.split(':');
         //       let obj={ValueId,attrId};
         //       arr.push(obj);
         //    }
         // });
         //再吧整理好的参数给skuInfo.skuAttrValueList
         // skuInfo.skuAttrValueList=arr;
         // 方式2 prev是掐你慢的累加值 item是这次的值
         skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
            if (item.attrIdAndValueId) {
               const [attrId, ValueId] = item.attrIdAndValueId.split(':');
               prev.push({ attrId, ValueId });
            }
            return prev;
         }, []);

         skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
            if (item.attrIdAndValueId) {
               const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':');

               prev.push({ saleAttrId, saleAttrValueId });
            }
            return prev;
         }, []);


         skuInfo.skuImageList = imageList.map(item => {
            return {
               imgName:item.imgName,
               imgUrl: item.imgUrl,
               isDefault: item.isDefault,
               spuImageId: item.id,
            }
         });

         let result = await this.$API.spu.reqAddSku(skuInfo);
        if(result.code==200){
         this.$message({type:'success',message:'添加sku成功了'});
         this.$emit('changeScenes',0)
         Object.assign(this._data, this.$options.data());
        }
      },


      cancel() {
         this.$emit('changeScenes', 0);
         Object.assign(this._data, this.$options.data());
      },
      changeDefault(row) {
         this.spuImageList.forEach(item => {
            item.isDefault = 0;
         });
         row.isDefault = 1;
         //收集默认图片id
         this.skuInfo.skuDefaultImg = row.imgUrl;
      },

      handleSelectionChange(params) {
         this.imageList = params;
      },
      //获取skuform数据
      async getDate(category1Id, category2Id, spu) {
         this.skuInfo.category3Id = spu.category3Id;
         this.skuInfo.spuId = spu.id;
         this.skuInfo.tmId = spu.tmId;
         this.spu = spu;

         let result = await this.$API.sku.reqSpuImageList(spu.id);
         if (result.code == 200) {
            let list = result.data;
            list.forEach(item => {
               item.isDefault = 0;
            });
            this.spuImageList = list;
         }
         let result1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
         if (result.code == 200) {
            this.spuSaleAttrList = result1.data;
         }
         let result2 = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.category3Id);
         if (result.code == 200) {
            this.attrInfoList = result2.data;
         }
      }
   },
}
</script>

<style>

</style>
/admin/product/saveSkuInfo

