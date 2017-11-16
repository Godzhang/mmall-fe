/*
* @Author: admin
* @Date:   2017-11-16 22:31:47
* @Last Modified by:   admin
* @Last Modified time: 2017-11-16 23:47:54
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex = require('./index.string');
var _product = require('service/product-service.js');
var _mm = require("util/mm.js");

//page 逻辑部分
var page = {
    data: {
        listParam: {
            keyword    : _mm.getUrlParam('keyword') || '',
            categoryId : _mm.getUrlParam('categoryId') || '',
            orderBy    : _mm.getUrlParam('orderBy') || 'default',
            pageNum    : _mm.getUrlParam('pageNum') || 1,
            pageSize   : _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadList();
    },
    bindEvent: function(){
        
    },
    loadList: function(){
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam;
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $(".p-list-con").html(listHtml);
            _this.loadPagination(res.pageNum, res.pages);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    loadPagination: function(pageNum, pages){
        
    }
}

$(function(){
    page.init();
});
