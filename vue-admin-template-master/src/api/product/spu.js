import request from '../../utils/request';



//GET /admin/product/{page}/{limit}
export const reqSpuList=(page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

// 获取某一个spu信息
export const reqSpu=(spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});

//获取品牌的信息
export const reqTradeMarkList=()=>request({url:`/admin/product/baseTrademark/getTrademarkList`,method:'get'});
//tubiaojiekou
export const reqSpuImageList=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});

//pingtaiquanbuxiaoshoushuxing
export const reqBaseSaleAttrList=()=>request({url:`/admin/product/baseSaleAttrList`,method:'get'});

//修改spu或者添加
export const  reqAddOrUpdateSpu  =(spuInfo)=>{
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo});
    }else{
        // 携带参数不带id是添加
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo});
    }
}
export const reqDeleteSpu=(spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'});



//添加sku
export const reqAddSku=(skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo});

//获取sku列表数据接口
export const reqSkuList=(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get' })