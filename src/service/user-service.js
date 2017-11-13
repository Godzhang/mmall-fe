/*
* @Author: p
* @Date:   2017-11-10 11:34:14
* @Last Modified by:   admin
* @Last Modified time: 2017-11-13 23:12:37
*/

var _mm = require('util/mm.js');

var _user = {
	//用户登录
	login: function(userInfo, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			data: userInfo,
			method: 'post',
			success: resolve,
			error: reject
		});
	},
	//验证用户名
	checkUsername: function(username, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			data: {
				type: 'username',
				str: username
			},
			method: 'post',
			success: resolve,
			error: reject
		});
	},
	//用户注册
	register: function(userInfo, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			data: userInfo,
			method: 'post',
			success: resolve,
			error: reject
		});
	},
	//检查登录状态
	checkLogin: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'post',
			success: resolve,
			error: reject
		});
	},
	//登出
	logout: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'post',
			success: resolve,
			error: reject
		});
	}
}

module.exports = _user;