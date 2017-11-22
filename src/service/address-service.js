/*
* @Author: admin
* @Date:   2017-11-19 16:01:47
* @Last Modified by:   admin
* @Last Modified time: 2017-11-20 21:57:28
*/
var _mm = require('util/mm.js');

var _address = {
    //获取地址列表
    getAddressList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //新建收件人
    save: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //获取单条收件人信息
    getAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //更新收件人
    update: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //删除收件人
    deleteAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }
}

module.exports = _address;