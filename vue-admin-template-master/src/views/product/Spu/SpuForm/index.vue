<template>
  <div>

    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="Spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :value="tm.id" :label="tm.tmName" v-for="(tm, index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuImageList"
          :on-success="handlerSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option v-for="(unselect, index) in unSelectSaleAttr" :key="unselect.id"
            :value="`${unselect.id}:${unselect.name}`" :label="unselect.name"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName"
          @click="addSaleAttr">添加销售属性</el-button>

        <el-table border style="width:100%" :data="spu.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">

              <el-tag :key="tag.id" v-for="(tag, index ) in row.spuSaleAttrValueList" closable
                :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
              <!-- @click="showInput" -->
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  computed: {
    //计算出没选择的销售属性，
    unSelectSaleAttr() {
      let result = this.saleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName;
        })
      }
      )
      return result;
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      attrIdAndAttrName: '',  //收集没选择的id
      spu: {

        category3Id: 0,
        description: "",
        tmId: "",
        spuName: "",
        spuImageList: [
          // {
          //   id: 0,
          //    imgName: '',
          //   imgUrl: '',
          //   spuId: 0
          // }
        ],

        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: '',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //     id: 0,
          //       isChecked: '',
          //       saleAttrName: '',
          //       saleAttrValueName: '',
          //       spuId: 0
          //     }
          //   ]
          // }
        ],
      },

      tradeMarkList: [],//pinpaixinxi
      spuImageList: [], // spu tupian shuju
      saleAttrList: [],

    };
  },
  methods: {
    cancel(){
       this.$emit('changeScene', {scene:0,flag:''});
    Object.assign(this._data,this.$options.data());//合并 this.$options.data 就是data（）{}  this._data用来操作响应时数据，，，
    },
    // 点击spu按钮的时候发请求的函数
   async addSpuData(category3Id) {
    //搜集三级分类的id
          this.spu.category3Id=category3Id;
       //pinpaixinxi
       let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
     
        this.tradeMarkList = tradeMarkResult.data;
      }
      //pingtaixiaoshouxinxi
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
       
        this.saleAttrList = saleResult.data;
      }
    },
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        }
      });
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      
      if (result.code == 200) {
        this.$message({ type: 'success', message: '保存成功了' });
        this.$emit('changeScene', {scene:0,flag:this.spu.id?'修改':'添加'});
      }
      Object.assign(this._data,this.$options.data());
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == '') {
        this.$message('属性值不能空');
        return;
      }
      let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName != inputValue);
      if (!result) return;
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false;

    },
    addSaleAttrValue(row) {
      this.$set(row, 'inputVisible', true);
      this.$set(row, 'inputValue', '');
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':');
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spu.spuSaleAttrList.push(newSaleAttr);

      this.attrIdAndAttrName = '';
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initSpuData(spu) {
      let SpuResult = await this.$API.spu.reqSpu(spu.id);
      if (SpuResult.code == 200) {
       
        this.spu = SpuResult.data;

      }
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
      
        this.tradeMarkList = tradeMarkResult.data;
      }
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {

        let listArr = spuImageResult.data;
        listArr.forEach(item => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      
      }

      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
      
        this.saleAttrList = saleResult.data;
      }
    }

  }
}
</script>

<style>
.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
