import request from '@/utils/request'

export default {
    //带条件分页查询food
    getFoodPageVo(current,limit,foodQuery){
        return request({
            url: `/linux/food/getFoodPageVo/${current}/${limit}`,
            method: 'post',
            data: foodQuery  //转化json传递
          })
    }
 
}