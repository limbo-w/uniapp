import util from '@/common/we7/util'
import api from '@/common/api';
// import wx from "@/static/util-js/jweixin-1.4.0.js";
// let wx = require('@/static/util-js/index.js')
// #ifdef  H5
import wx from 'weixin-js-sdk';
// #endif
import store from '@/store'
import siteInfo from '@/common/siteinfo'
export const jsApiList = [
	"chooseWXPay", "getLocation", "updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage",
	"onMenuShareTimeline", "openLocation", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice",
	"stopVoice", "onVoicePlayEnd", "chooseImage", "getLocalImgData", "downloadImage", "uploadImage", "uploadVoice",
	"downloadVoice", "scanQRCode"
];
let isWxRegistered = false
export function registerConfig(url) {
	return new Promise(async function(resolve, reject) {
		// if(location.hostname=='127.0.0.1'){
		// 	url = 'https://v2.bkycms.com/channelApi/wechat/index?acid=39'
		// }
		// console.log(123,url)
		try {
			let {
				data
			} = await util.request({
				'url': api.WxSign,
				// method:'POST',
				// ct: 1,
				data: {
					url: url || encodeURIComponent(url)
				}
			})
			if (data) {
				wx.config({
					debug: false,
					appId: data.appId,
					nonceStr: data.nonceStr,
					timestamp: data.timestamp,
					signature: data.signature,
					jsApiList: jsApiList
				});
				wx.error(err => {
					console.log('config fail:', err);
				});
				wx.ready(res => {
					resolve()
					console.log('%c wx.ready ', 'color: white; background-color: #95B46A')
				});
			}
		} catch (e) {
			console.log("微信环境出问题了", e)
		}
	})
}
export function configWX(url) {
	return new Promise(async function(resolve, reject) {
		// #ifdef  H5
		if (isWxRegistered) {
			resolve()
		} else {
			let signUrl = url || location.href.split('#')[0]
			console.log('%c configWX ', 'color: white; background-color: #95B46A', signUrl, util.getSb())
			if (util.getSb().platform == 'ios') {
				await registerConfig(signUrl)
				isWxRegistered = true
				resolve()
				console.log('iosios')
			} else {
				await registerConfig(signUrl)
				isWxRegistered = true
				resolve()
				console.log('android')
			}
		}
		// #endif
		// #ifdef  MP
		resolve()
		// #endif
	})
}
export async function getDw(option) {
	let timestamp = Date.parse(new Date()),
		firstdwtime = uni.getStorageSync('firstdwtime'),
		gdlocation = getApp().globalData.gdlocation;
	return new Promise(async (resolve, reject) => {
		//console.log(option, timestamp, firstdwtime, firstdwtime + 300 * 1000, gdlocation)
		if (option.t == '0' && gdlocation && timestamp < (firstdwtime + 300 * 1000)) {
			resolve(gdlocation)
			return
		}
		// #ifndef H5
		// util.showLoading('定位中')
		uni.getLocation({
			type: 'gcj02' || option.type,
			success: res => {
				resolve(res)
				store.commit('dndc/setLatLng', {
					lat: res.latitude,
					lng: res.longitude,
				})
				// uni.hideLoading()
				getApp().globalData.gdlocation = res
				uni.setStorageSync('firstdwtime', timestamp)
				if (process.env.NODE_ENV === 'development') {
					console.log('当前位置res', res)
				}
			},
			fail: (err) => {
				console.log('util.getDwfail', err);
				resolve({
					latitude: '39.906930',
					longitude: '116.397570'
				})
				store.commit('dndc/setLatLng', {
					lat: '39.906930',
					lng: '116.397570'
				})
				// uni.hideLoading()
				getApp().globalData.gdlocation = {
					latitude: '39.906930',
					longitude: '116.397570'
				}
				// #ifdef MP-BAIDU
				if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
					//this.showDw=true
				}
				// #endif
				// #ifndef MP-BAIDU
				if (err.errMsg.indexOf("auth deny") >= 0) {
					util.message('访问位置被拒绝', 3)
				} else {
					uni.showModal({
						title: '温馨提示',
						showCancel: false,
						content: '定位失败,请检查GPS后,重新进入'
					})
				}
				// #endif
			},
		})
		// #endif
		// #ifdef H5
		if (api.platform == 'weChat') {
			util.showLoading('定位中')
			await configWX()
			wx.getLocation({
				type: 'gcj02' || option.type,
				success: res => {
					resolve(res)
					store.commit('dndc/setLatLng', {
						lat: res.latitude,
						lng: res.longitude,
					})
					uni.hideLoading()
					getApp().globalData.gdlocation = res
					uni.setStorageSync('firstdwtime', timestamp)
					console.log('当前位置res', res)
				},
				fail: (err) => {
					console.log('util.getDwfail', err);
					resolve({
						latitude: '39.906930',
						longitude: '116.397570'
					})
					store.commit('dndc/setLatLng', {
						lat: '39.906930',
						lng: '116.397570'
					})
					uni.hideLoading()
					getApp().globalData.gdlocation = {
						latitude: '39.906930',
						longitude: '116.397570'
					}
					uni.hideLoading()
					console.log("%c 定位失败", "font-size:40px;color:orange", e)
				}
			});
		} else {
			util.showLoading('定位中')
			uni.getLocation({
				type: 'gcj02' || option.type,
				success: res => {
					resolve(res)
					store.commit('dndc/setLatLng', {
						lat: res.latitude,
						lng: res.longitude,
					})
					uni.hideLoading()
					getApp().globalData.gdlocation = res
					uni.setStorageSync('firstdwtime', timestamp)
					console.log('当前位置res', res)
				},
				fail: (err) => {
					console.log('util.getDwfail', err);
					resolve({
						latitude: '39.906930',
						longitude: '116.397570'
					})
					store.commit('dndc/setLatLng', {
						lat: '39.906930',
						lng: '116.397570'
					})
					uni.hideLoading()
					getApp().globalData.gdlocation = {
						latitude: '39.906930',
						longitude: '116.397570'
					}
				}
			})
		}
		// #endif
	})
}
export async function openLocation(obj) {
	await configWX()
	wx.openLocation({
		latitude: +obj.lat || 39.903740,
		longitude: +obj.lng || 116.397827,
		name: obj.name || '天安门广场', // 位置名
		address: obj.address || '北京市东城区东长安街',
		scale: 18,
		infoUrl: obj.url || '',
	});
}
export async function scanCode(obj) {
	// console.log(obj)
	// #ifndef H5
	uni.scanCode({
		success: (res) => {
			let path = res.path,
				tnurl = '/' + path
			obj.go({
				t: 1,
				url: tnurl,
			})
			// console.log(res)
		},
		fail: (res) => {
			console.log('扫码fail')
		}
	});
	// #endif
	// #ifdef H5
	if (api.platform == 'weChat') {
		await configWX()
		wx.scanQRCode({
			needResult: 0,
			scanType: ["qrCode", "barCode"],
			success: function(res) {
				console.log('wx.scanQRCode', res)
			}
		})
	} else {
		console.log(api.platform, util)
		obj.util.message('H5端不支持此功能', 3)
	}
	// #endif
}
export async function chooseWXPay(config, callback) {
	console.log("%c 支付参数", "font-size:40px;color:orange", config)
	await configWX()
	return new Promise((resolve, reject) => {
		wx.chooseWXPay({
			timestamp: config.timeStamp,
			nonceStr: config.nonceStr,
			package: config.package,
			signType: config.signType,
			paySign: config.paySign,
			success(res) {
				// 支付成功后的回调函数
				resolve(1)
				callback && callback(res);
			},
			fail(e) {
				resolve(2)
				uni.showModal({
					title: '微信支付错误',
					content: JSON.stringify(e)
				})
			},
			cancel() {
				resolve(3)
				// 支付取消
			}
		});
	})
}
export function getImgS(src) {
	return src.indexOf('http') > -1 ? src : store.state.system.attachurl + src
}
export function getEwmLink(src) {
	return `${siteInfo.siteroot}?i=${siteInfo.uniacid}&link=/${src}`
	// return `${siteInfo.siteroot.match(/(\S*)app/)[1]}app/index.php?i=${siteInfo.uniacid}&c=entry&eid=${siteInfo.eid}&link=/${src}`
}
export function getSLink(src) {
	if (api.platform == 'weChat') {
		return `${location.href.split('#')[0]}#/${src}`
	}
}
export async function wxShare(config = {}) {
	if (api.platform == 'weChat') {
		return new Promise(async function(resolve, reject) {
			await configWX()
			let url = config.link || location.href;
			let {
				title = store.state.system.title || "标题",
					desc = '进来看看吧' || "描述",
					link = url, //默认为当前页面的路径
					imgUrl = getImgS(store.state.system.icon),
			} = config;
			// link = link.split('#')[0] + '#' + link.split('#')[1]
			link =
				`${siteInfo.siteroot}?uniacid=${siteInfo.uniacid}&link=${encodeURIComponent(link.split('#')[1])}`
				// `${siteInfo.siteroot.match(/(\S*)app/)[1]}app/index.php?i=${siteInfo.uniacid}&c=entry&eid=${siteInfo.eid}&link=${encodeURIComponent(link.split('#')[1])}`
			console.log("%c wxShare url", "font-size:20px;color:green", url, link)
			//朋友
			wx.updateAppMessageShareData({
				title,
				desc,
				link,
				imgUrl: getImgS(imgUrl),
			})
			// wx.onMenuShareAppMessage()
			//圈
			wx.updateTimelineShareData({
				title,
				link,
				imgUrl: getImgS(imgUrl),
			})
			// wx.onMenuShareTimeline()
		})
	} else {
		return
	}
}
export function choosePhoto(option) {
	return new Promise(async (resolve, reject) => {
		if (api.platform != 'weChat') {
			uni.chooseImage({
				count: +option.num || 9,
				sizeType: ['compressed'],
				// sourceType: ['album'],
				success: (res) => {
					resolve(res.tempFilePaths)
					console.log(res.tempFilePaths);
				}
			});
		} else {
			await configWX()
			wx.chooseImage({
				count: +option.num || 9,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async function(res) {
					console.log('choosePhoto', res.localIds);
					resolve(res.localIds);
				}
			});
		}
	})
}
export function uploadImage(localId, showTips = 1) {
	return new Promise(function(resolve, reject) {
		wx.uploadImage({
			localId,
			isShowProgressTips: showTips,
			success: function(res) {
				resolve(res)
			}
		});
	})
}
export function uploadImg({
	files
}) {
	// const that = this;
	// async function ys(file) {
	// 	console.log("file", file)
	// 	return new Promise((resolve, reject) => {


	// 		if (that.getType(file) == 'string') {
	// 			if (file.indexOf('http') > -1) {
	// 				return resolve({
	// 					type: 'img',
	// 					url: file.substring(that.assetPath.length)
	// 				})
	// 			}
	// 		}

	// 		picCompress({
	// 			file,
	// 			quality: 5,
	// 			async callBack(ret) {
	// 				//console.log("图片压缩成功");
	// 				const res = await requestByUpload(ret)
	// 				return resolve({
	// 					url: res.src,
	// 					type: "img"
	// 				})
	// 			}
	// 		})
	// 	})
	// }
	return new Promise(async function(resolve, reject) {
		let images = files.map(async item => {
			if (item.tmp) {
				if (api.platform != 'weChat') {
					return await wxUploadImg(item.url); //去掉await也可以
				} else {
					let {
						data
					} = await util.request({
						'url': api.WxUpload,
						method: 'POST',
						data: {
							mediaId: item.url
						}
					})
					return data
				}
			} else {
				return item.url
			}
		})
		images = await Promise.all(images)
		return resolve(images)
	})
}

function wxUploadImg(file) {
	return new Promise(function(resolve, reject) {
		uni.uploadFile({
			url: util.url(api.sctp),
			filePath: file,
			fileType: 'image',
			name: 'file',
			header: {
				'content-type': 'multipart/form-data',
				"appType": api.platform,
				'uniacid': siteInfo.uniacid,
				'module': 'yb_wm',
			},
			success: (res) => {
				resolve(res.data)
				// console.log('uploadImage success, res is:', res)
			},
			fail: (err) => {
				console.log('uploadImage fail', err);
			},
			// complete(res) {
			// 	console.log('uploadImage complete', res);
			// }
		});
	})
}
