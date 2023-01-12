///admin/product/baseTrademark/{page}/{limit}
import request from '../../utils/request';
export const reqTradeMarkList=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});


//处理添加品牌
// /admin/product/baseTrademark/save   post  携带两个参数， 品牌名称 logo 不用穿id  服务器生成id
// 修改的   /admin/product/baseTrademark/update     三个参数 id  名称 logo
export const reqAddOrUpdateTradeMark=(tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark});
    }else
    return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark});
}

//删除品牌接口  /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})