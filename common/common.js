import {
	mapActions,
	mapState,
	mapMutations,
	mapGetters
} from "vuex";
import {
	getDw,
	scanCode,
	configWX
} from "@/common/wechat-util.js"
const Plugin = Object.create(null);
// #ifdef MP-ALIPAY
const {
	requestSubscribeMessage
} = requirePlugin('subscribeMsg');
// #endif
Plugin.install = function(Vue, options) {
	Vue.mixin({
		data() {
			return {}
		},
		computed: {
			...mapState({
				user: state => state.user,
				uId: state => state.user.id || '',
				isVip: state => state.user.level > 0,
				isLogin: state => state.isLogin,
				tColor: state => state.system.color,
				url: state => state.system.attachurl,
				system: state => state.system,
				isIpx: state => state.isIpx,
				sl: state => state.system.custom.hbfh,
				dw: state => state.system.custom.hbmc,
				// pm: state => state.system.pm,
			}),
			...mapState('dndc', ['smConfig','fxsInfo','fxsSq']),
			onImgurl() {
				return getApp().globalData.onImgurl
			},
			isDev() {
				return getApp().globalData.siteInfo.isDev
			}
		},
		methods: {
			...mapActions(["getSystem", "getLoginInfo", "refreshUser", "getLayout"]),
			...mapActions('dndc', ['getSmConfig', 'getAddInfo','getFxzx','getFxSq']),
			...mapMutations('dndc', ["setCityInfo", 'setAddInfo']),
			go(option) {
				switch (option.t) {
					case undefined:
					case 1:
						uni.navigateTo({
							url: option.url
						})
						break;
					case 2:
						uni.redirectTo({
							url: option.url
						})
						break;
					case 6:
						uni.switchTab({
							url: option.url
						})
						break;
					case 3:
						uni.reLaunch({
							url: option.url
						})
						break;
					case 4:
						uni.navigateBack({
							delta: 1
						})
						break;
					case 5:
						if (getCurrentPages().length > 1) {
							uni.navigateBack({
								delta: 1
							})
						} else {
							uni.reLaunch({
								url: option.url
							})
						}
						break;
				}
			},
			getConfigWX() {
				return configWX()
			},
			async goUrl(option, obj) {
				let url, type;
				if (option) {
					type = option.t || '1'
					switch (option.params) {
						case 'platform':
							if (option.name.id == 'distribution') {
								await this.getFxzx()
								if(this.fxsInfo.open==2){
									this.util.message('未开启分销商功能', 3)
									return
								}
								await this.getFxSq()
								if (this.fxsSq) {
									let i = this.fxsSq.state
									if (i == 1) {
										this.util.message('请等待平台审核您的申请', 3)
									} else if (i == 3) {
										this.util.message('您的申请已被拒绝', 3)
									} else if (i == 2) {
										this.go({
											url: '/yb_wm/order/invitation/fxzx'
										})
									}
								} else {
									this.go({
										url: '/yb_wm/order/invitation/sqfx'
									})
								}
								return
							}
							url = this.changeUrl(option)
							if (!url) {
								return
							}
							type = '1'
							if (url.indexOf('/index/') != -1) {
								type = '4'
								if (option.name.id == 'takeOutFood') {
									// console.log(this)
									this.go({
										url: `/yb_wm/my/address/index?from=4&storeId=${this.$store.state.config.storeInfo.id}`,
									})
									return
								}
							}
							// console.log(this.changeUrl(option))
							break;
						case 'link':
							type = '1'
							if (option.category.indexOf('http') > -1) {
								url = '/yb_wm/other/web-view?src=' + encodeURIComponent(JSON.stringify(
									option.category.substring(0, 1) ==
									'h' ? option.category : option.category.substring(7)))
							} else {
								url = option.category
							}
							break;
						case 'appjump':
							url = option.name.path;
							type = '5'
							break;
						case 'call':
							this.util.makeTel(option.param.phone)
							return;
						case 'product':
							url =
								`/yb_wm/shop/out/goods-dl?gid=${option.name.id}&storeId=${this.$store.state.config.storeInfo.id}&page=index`
							break;
						case 'productCategory':
							url = '/yb_wm/index/goods'
							type = '4'
							break;
						case 'customPage':
							url = '/yb_wm/order/other/custom?pid=' + option.name.id
							break;
					}
					if (type == '1') {
						uni.navigateTo({
							url: url,
						})
					} else if (type == '4') {
						uni.switchTab({
							url: url,
						})
						if (option.name.id == 'TakeFood') {
							setTimeout(() => {
								uni.$emit('qjjtsj', option.name.id == 'TakeFood' ? 2 : 1)
							}, 200)
						} else if (option.params == 'productCategory') {
							setTimeout(() => {
								uni.$emit('qjjtsj', {
									flid: option.name.pid > 0 ? option.name.pid : option
										.name.id
								})
							}, 200)
						}
					} else if (type == '2') {
						uni.redirectTo({
							url: url,
						})
					} else if (type == '3') {
						uni.reLaunch({
							url: url,
						})
					} else if (type == '5') {
						uni.navigateToMiniProgram({
							appId: option.name.appId,
							path: option.name.path,
							// extraData: {
							// 	'data1': 'test'
							// },
							complete(res) {
								// console.log(res)
							}
						})
					}
				} else {
					// this.util.message('跳转路径无效', 3)
				}
				if (process.env.NODE_ENV === 'development') {
					console.log(option, url, type)
				}
			},
			changeUrl(option) {
				// console.log(option)
				let url = ''
				if (option.params == 'platform') {
					switch (option.name.id) {
						case 'index':
							url = '/yb_wm/index/index'
							break;
						case 'goods':
						case 'TakeFood':
						case 'takeOutFood':
							url = '/yb_wm/index/goods'
							break;
							// case 'TakeFood':
							// 	url = '/yb_wm/index/goods?type=2'
							// 	break;
							// case 'takeOutFood':
							// 	url = '/yb_wm/index/goods?type=1'
							// 	break;
						case 'myOrder':
							url = '/yb_wm/index/order-index'
							break;
						case 'member':
							url = '/yb_wm/index/my-index'
							break;
						case 'myAddress':
							url = '/yb_wm/my/address/index'
							break;
						case 'contactCustomer':
							url = '/yb_wm/my/other/kf'
							break;
						case 'businessCooperate':
							// return this.util.makeTel(this.system.tel)
							url = '/yb_wm/my/settled/apply'
							break;
						case 'aboutUs':
							url = '/yb_wm/my/other/gywmtwo'
							break;
						case 'helpCenter':
							url = '/yb_wm/my/other/bzzx'
							break;
						case 'couponCenter':
							url = '/yb_wm/my/coupon/center'
							break;
						case 'myCoupon':
							url = '/yb_wm/my/coupon/my'
							break;
						case 'live':
							url = '/yb_wm/other/live-list'
							break;
						case 'balanceRecharge':
							url = '/yb_wm/other/recharge/index'
							break;
						case 'signIndex':
							url = '/yb_wm/my/signin/index'
							break;
						case 'integralShop':
							url = '/yb_wm/my/integral/shop-index'
							break;
						case 'collectionCourtesy':
							url = '/yb_wm/other/scyl'
							break;
						case 'information':
							url = '/yb_wm/other/info/index'
							break;
						case 'cashier':
							url = '/yb_wm/shop/in/dmf'
							break;
						case 'navigation':
							url = '/yb_wm/shop/select/index?page=index&storeId=' + this.$store.state.config
								.storeInfo.id
								// url = `/yb_wm/shop/select/index?page=index&storeId=${this.$store.state.config.storeInfo.id?this.$store.state.config.storeInfo.id:''}`
							break;
						case 'fastOrder':
							url = '/yb_wm/shop/ffmode/goods'
							break;
						case 'cardIndex':
							url = '/yb_wm/order/vip/wkk'
							break;
						case 'payVip':
							url = '/yb_wm/order/payvip/index'
							break;
						case 'oldWithNew':
							url = '/yb_wm/order/invitation/yqyl'
							break;
						case 'storage':
							url = '/yb_wm/shop/storage/index'
							break;
						case 'userStorage':
							url = '/yb_wm/shop/storage/list'
							break;
						case 'queuing':
							url = '/yb_wm/shop/lineup/pdqh'
							break;
						case 'reserve':
							url = '/yb_wm/shop/reserve/index'
							break;
						case 'exchange':
							url = '/yb_wm/my/coupon/dh'
							break;
						case 'collect':
							url = '/yb_wm/order/jd'
							break;
						case 'scanOrder':
							scanCode(this)
							return;
					}
				}
				return url
			},
			requestSM(type) {
				return new Promise(async (resolve, reject) => {
					// #ifdef  MP-WEIXIN
					await this.getSmConfig()
					uni.requestSubscribeMessage({
						tmplIds: this.smConfig[type],
						complete: (res) => {
							if (res.errMsg == 'requestSubscribeMessage:ok') {
								if (JSON.stringify(res).indexOf('reject') > -1) {
									reject()
								} else {
									resolve()
								}
							} else {
								resolve()
							}
							// console.log(res, JSON.stringify(res).indexOf('reject'))
						}
					})
					// #endif
					// #ifdef MP-ALIPAY
					await this.getSmConfig()
					requestSubscribeMessage({
						entityIds: this.smConfig[type],
						// 接收结果的回调方法
						callback: res => {
							console.log('订阅回调', res);
							if (res.success) {
								const successIds = this.smConfig[type]
									.filter(i => res[i.entityId] === 'accept')
									.map(i => i.entityId);

								// 订阅成功
								// my.call('toast', {
								// 	content: `模板${successIds.join(',')}订阅成功`,
								// 	type: 'success',
								// });
								resolve()
							} else {
								switch (res.errorCode) {
									case 11: {
										my.call('toast', {
											content: '用户未订阅关闭弹窗',
										});
										reject()
										break;
									}
									default: {
										my.call('toast', {
											content: `ErrorCode: ${res.errorCode}, ErrorMsg: ${res.errorMessage}`,
										});
										resolve()
										break;
									}
								}
							}
						},
					});
					// #endif
					// #ifndef  MP-WEIXIN || MP-ALIPAY
					resolve()
					// #endif	
				});
			},
			getSjgd(v) {
				return parseInt((v * 2 * this.util.getSb().rate)) //375px/750rpx=h/(拖拽式400px*2)
			},
			addFwjl(obj) {
				this.util.request({
					'url': this.api.fwjl,
					method: 'POST',
					data: {
						storeId: obj.storeId,
						moduleName: obj.origin,
					}
				})
			},
			async qkdw() {
				getApp().globalData.gdlocation = null
				this.setAddInfo(null)
				this.setCityInfo({})
			},
			// async getLocInfo() {
			// 	let lc = await getDw({
			// 		t: 0
			// 	})
			// 	await this.getAddInfo(lc)
			// },
			getImgS(src) {
				return src ? src.indexOf('http') > -1 ? src : this.url + src : ''
			},
			async checkLogin() {
				if (!this.isLogin) {
					try {
						// await this.util.modal('请先进行登录');
						this.go({
							url: '/yb_wm/other/sq-login'
						})
					} catch (e) {
						return false
					}
				} else {
					return true
				}
			}
		}
	})
}
export default Plugin;
