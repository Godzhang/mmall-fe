/*
* @Author: admin
* @Date:   2017-11-16 23:18:31
* @Last Modified by:   admin
* @Last Modified time: 2017-11-16 23:46:12
*/
var _mm = require('util/mm.js');

var _product = {
    //获取商品列表
    getProductList: function(listParam, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
}

module.exports = _product;