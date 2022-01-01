import request from '@/utils/request'

export default {
    //带条件分页查询food
    getFoodPageVo(current,limit,foodQuery){
        return request({
            url: `/linux/food/getFoodPageVo/${current}/${limit}`,
            method: 'post',
            data: foodQuery  //转化json传递
          })
    },
 
    //加入订单
    addDing(id){
        return request({
            url: `/linux/food/addNum/${id}`,
            method: 'put'
          })
    },

    //移出订单
    removeDing(id){
        return request({
            url: `/linux/food/removeNum/${id}`,
            method: 'put'
          })
    },

    //展示订单页面
    getAllPicked(){
        return request({
            url: `/linux/food/`,
            method: 'get'
          })
    }
}