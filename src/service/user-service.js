/*
* @Author: p
* @Date:   2017-11-10 11:34:14
* @Last Modified by:   p
* @Last Modified time: 2017-11-10 12:07:37
*/

var _mm = require('util/mm.js');

var _user = {
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