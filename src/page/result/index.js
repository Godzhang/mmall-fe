/*
* @Author: p
* @Date:   2017-11-10 17:05:07
* @Last Modified by:   p
* @Last Modified time: 2017-11-10 18:06:54
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $("." + type + '-success');
	//显示对应的提示元素
	$element.show();
});












