/*
* @Author: admin
* @Date:   2017-11-15 22:05:31
* @Last Modified by:   admin
* @Last Modified time: 2017-11-15 22:37:09
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require("util/mm.js");
var _user = require('service/user-service.js');
//page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({name: 'user-pass-update'});
    },
    bindEvent: function(){
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password: $.trim($("#password").val()),
                passwordNew: $.trim($("#password-new").val()),
                passwordConfirm: $.trim($("#password-confirm").val())
            },
            //表单验证结果
            validateResult = _this.validateForm(userInfo);
            //验证成功
            if(validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //验证失败
            else{
                //错误提示
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    //验证注册信息
    validateForm: function(formData){
        var result = {
            status: false,
            msg: ''
        };
        //验证原密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        //验证新密码
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        //验证两次密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function(){
    page.init();
});