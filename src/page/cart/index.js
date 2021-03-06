/*
* @Author: admin
* @Date:   2017-11-19 10:36:59
* @Last Modified by:   admin
* @Last Modified time: 2017-11-19 15:01:35
*/
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var templateIndex = require('./index.string');
var _cart = require('service/cart-service.js');
var _mm = require("util/mm.js");

//page 逻辑部分
var page = {
    data: {
        
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadCart();
    },
    bindEvent: function(){
        var _this = this;
        //商品的选择/取消选择
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');

            //选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            //取消选中
            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        //商品的全选/取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            //全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            //取消全选
            else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        //商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = $pCount.data('max'),
                newCount = 0;

            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
                // $pCount.val(newCount);
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
                // $pCount.val(newCount);
            }
            //更新购物车商品数量
            _this.updateProduct(productId, newCount);
        });
        //手动改变商品数量
        $(document).on('blur', '.count-input', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id'),
                currCount = parseInt($this.val()),
                minCount = 1,
                maxCount = $this.data('max');

            if(currCount > maxCount){
                _mm.errorTips('该商品数量已达到上限');
                return;
            }else if(currCount < minCount){
                return;
            }
            //更新购物车商品数量
            _this.updateProduct(productId, currCount);
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                var arrProductIds = [],
                    $selectedItem = $(".cart-select:checked");
                //循环查找选中的productIds
                for(var i = 0, len = $selectedItem.length; i < len; i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }                
            }
        });
        //提交购物车，结算
        $(document).on('click', '.btn-submit', function(){
            //总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
    },
    //更新购物车商品数量
    updateProduct: function(productId, count){
        var _this = this;

        _cart.updateProduct({
            productId: productId,
            count: count
        }, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    //加载购物车信息
    loadCart: function(){
        var _this = this;

        //获取购物车列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    //渲染购物车
    renderCart: function(data){
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        //生成html
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $(".page-wrap").html(cartHtml);
        //通知导航的购物车更新数量
        nav.loadUserCount();
    },
    //删除指定商品，支持批量，productId用逗号分隔
    deleteCartProduct: function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    //数据匹配
    filter: function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">错误，刷新试试</p>');
    }
}

$(function(){
    page.init();
});
