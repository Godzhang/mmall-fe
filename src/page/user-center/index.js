/*
* @Author: admin
* @Date:   2017-11-15 20:46:11
* @Last Modified by:   admin
* @Last Modified time: 2017-11-15 22:44:17
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require("util/mm.js");
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
//page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({name: 'user-center'});
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $(".panel-body").html(userHtml);
            $(".loading").hide();
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
}

$(function(){
    page.init();
});