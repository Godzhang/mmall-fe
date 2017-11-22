/*
* @Author: p
* @Date:   2017-11-10 17:05:07
* @Last Modified by:   admin
* @Last Modified time: 2017-11-22 23:35:21
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $("." + type + '-success');
    if(type === 'payment'){
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
	//显示对应的提示元素
	$element.show();
});












