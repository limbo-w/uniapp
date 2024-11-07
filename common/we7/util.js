import api from '../api';
import utils from '@/common/utils.js'
import {
	openLocation
} from '../wechat-util.js'
var util = {
	burl: ''
};
/**
	构造地址, 
	@params action 系统中的controller, action, do，格式为 'wxapp/home/navs'
	@params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
*/
util.url = function(action) {
	let url = ''
	if (util.burl) {
		url = util.burl
		// #ifdef H5
		if (api.platform == 'h5') {
			return uni.showModal({
				title: '提示',
				content: '请在微信内打开',
				showCancel: false
			})
		}
		// #endif
	} else {
		let siteInfo = getApp().globalData.siteInfo,
			nowtime = Date.parse(new Date())
		url = util.burl = siteInfo.isDev ? siteInfo.siteroot.match(/(\S*)app/)[1] +
			'addons/yb_wm/index.php/' : siteInfo.siteroot.indexOf('app/') == -1 ? siteInfo.siteroot +
			"/index.php/" : siteInfo.siteroot
			.match(/(\S*)app/)[1] + 'addons/yb_wm/index.php/';
		// if (utils.DiffTime(1557969779, utils.dateToTime())[0] >= 2) {
		// 	return ''
		// }
		// console.log('%c util.url ', 'color: white; background-color: #34aaff', siteInfo, uni.getStorageSync('schctime'),
		// 	nowtime,)
		// util.onImgurl = siteInfo.siteroot.match(/(\S*)app/)[1] + 'addons/yb_o2o/appfile/'
	}
	// console.log(action,url,getApp().globalData)
	return url + action;
}

function getQuery(url) {
	var theRequest = [];
	if (url.indexOf("?") != -1) {
		var str = url.split('?')[1];
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
				theRequest[i] = {
					'name': strs[i].split("=")[0],
					'value': unescape(strs[i].split("=")[1])
				}
			}
		}
	}
	return theRequest;
}
/*
 * 获取链接某个参数
 * url 链接地址
 * name 参数名称
 */
function getUrlParam(url, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
	var r = url.split('?')[1].match(reg); //匹配目标参数  
	if (r != null) return unescape(r[2]);
	return null; //返回参数值  
}
/**
 * url 链接地址
 * date 参数{参数名1 : 值1, 参数名2 : 值2} *
 */
util.request = async function(option) {
	if (option.mask) {
		uni.showLoading({
			title: option.mask == 1 ? '加载中' : option.mask,
			mask: true
		});
	}
	let app = getApp().globalData,
		url = util.url(option.url)
	var option = option || {};
	if (!url) {
		return false;
	}
	//my.showNavigationBarLoading();
	let [error, res] = await uni.request({
		'url': url,
		'data': option.data ? option.data : {},
		'method': option.method ? option.method : 'GET',
		'header': {
			'content-type': option.ct ? 'application/json' : 'application/x-www-form-urlencoded',
			"appType": api.platform,
			'uniacid': app.siteInfo.uniacid,
			'module': 'yb_wm',
			'userId': uni.getStorageSync('userId'),
		}
	});
	if (option.mask) {
		uni.hideLoading();
	}
	//console.log('res', res)
	if (res.data.code == 1) {
		return res.data
	} else {
		if (res.data.code == 2) {
			return util.message(res.data.msg || res.data, 3, 2000)
		} else {
			console.log('%c request异常', 'color: white; background-color: #f00000', res)
		}
	}
}
util.ckWz = (obj) => {
	if (api.platform != 'weChat') {
		uni.openLocation({
			latitude: +obj.lat,
			longitude: +obj.lng,
			name: obj.name,
			address: obj.address,
		})
	} else {
		openLocation(obj)
	}
}
/*
 * 提示信息
 */
util.message = function(c, t, d) {
	uni.showToast({
		// #ifdef MP-ALIPAY
		icon: t == 1 ? 'success' : t == 2 || t == 3 ? 'none' : '',
		// #endif
		// #ifndef MP-ALIPAY
		icon: t == 1 ? 'success' : t == 2 ? 'loading' : t == 3 ? 'none' : '',
		// #endif
		title: c,
		duration: d || 1000,
	});
}
util.modal = async (c, t) => {
	let [error, res] = await uni.showModal({
		title: t || '温馨提示',
		content: c,
	})
	return new Promise((resolve, reject) => {
		if (res.confirm) {
			resolve()
		} else if (res.cancel) {
			reject()
		}
	})
}
util.makeTel = (e) => {
	console.log(e)
	uni.makePhoneCall({
		phoneNumber: e || '123456'
	});
}

//封装微信等待提示，防止ajax过多时，show多次
util.showLoading = (c, m = 1) => {
	var isShowLoading = uni.getStorageSync('isShowLoading');
	if (isShowLoading) {
		uni.hideLoading();
		uni.setStorageSync('isShowLoading', false);
	}

	uni.showLoading({
		title: c || '加载中',
		mask: m ? true : false,
		complete: function() {
			uni.setStorageSync('isShowLoading', true);
		},
		fail: function() {
			uni.setStorageSync('isShowLoading', false);
		}
	});
}
util.getSb = () => {
	let info = getApp().globalData.sb;
	if (info) {
		return info
	} else {
		info = uni.getSystemInfoSync()
		// console.log(info)
		// let rate=uni.upx2px(750)/750,
		let rate = +(info.windowWidth / 750).toFixed(5),
			customNavh = info.statusBarHeight + 44
		getApp().globalData.sb = {
			...info,
			rate,
			customNavh,
		}
		return getApp().globalData.sb
	}
}
util.getPage = (i = 2) => {
	let pages = getCurrentPages()
	return pages[pages.length - i]
}
util.getRoute = () => {
	let pages = getCurrentPages(),
		currentPage = pages[pages.length - 1],
		url = currentPage.route || currentPage.__route__ //当前页面url
	//console.log(currentPage, currentPage.__route__, typeof currentPage)
	return url
}
util.preImg = (option) => {
	uni.previewImage({
		current: option.idx,
		urls: option.urls
	})
}
util.getSetting = (type) => {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: (res) => {
				if (res.authSetting['scope.' + type]) {
					resolve(1);
				} else {
					resolve(2);
				}
				console.log(res.authSetting)
			}
		});
	});
}
util.setNT = (n) => {
	uni.setNavigationBarTitle({
		title: n
	})
}
util.setNB = (n = '#fff', nofc = false) => {
	uni.setNavigationBarColor({
		frontColor: n.indexOf('#fff') > -1 || nofc ? '#000000' : '#ffffff',
		backgroundColor: n,
	})
}
util.sj = () => {
	let r = Math.floor(Math.random() * 2 + 0);
	return r
}
util.fz = (n) => {
	uni.setClipboardData({
		data: n,
		success() {
			util.message('复制成功', 1)
			console.log('success');
		}
	});
}
// 微信公众号授权
util.wxAuthorize = () => {
	let link = window.location.href;
	let params = utils.getUrlParams(link); // 地址解析

	// 已经授权登录过的就不用再授权了
	// if (store.state.token) return;

	// 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
	if (params.code) {
		console.log(params)
		// api.wxAuth(params.code); // 调用后台接口，授权
	} else {
		let appid = 'wx268d2c77f8c641fa';
		let uri = encodeURIComponent(link);
		let authURL =
			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
		window.location.href = authURL;
	}
}
util.mpShare = (obj) => {
	// console.log(obj,obj.p ? '/' + obj.p : '',)
	return {
		title: obj.t || '进来看看吧！',
		imageUrl: obj.i,
		// #ifndef MP-ALIPAY
		path: obj.p ? '/' + obj.p : '',
		// #endif
		// #ifdef MP-ALIPAY
		path: obj.p || '',
		// #endif
	}
}
export default util;
