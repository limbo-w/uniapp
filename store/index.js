import Vue from 'vue'
import Vuex from 'vuex'
import util from '../common/we7/util';
import api from '../common/api';
import utils from '@/common/utils.js'
Vue.use(Vuex)

import dndc from './dndc'

const store = new Vuex.Store({
	state: {
		system: {
			custom: {
				live: '',
				takeOut: '',
				integral: '',
				balance: '',
				informationTitle: '',
				hbfh: '',
				hbmc: '',
				inStore: '',
			},
			powerList: {},
		},
		user: {},
		isLogin: false,
		isIpx: false,
		carList: [],
		scarList: {
			out: {
				data: []
			},
			fast: {
				data: []
			},
			ins: {
				data: []
			},
		},
		sjxx: {},
		layout: {
			index: {},
			personalcenter: {},
			custom: {},
		},
		config: {
			// showloading: true,
			showTips: !uni.getStorageSync('tips'),
			hasKp: false,
			enterset: {},
			orderset: {
				outName: '',
			},
			citys: {
				sArr: []
			},
			isshopdl: false,
			storeInfo: {},
			payConfig: {},
			recharge: {},
			vipset: {},
			payVipset: {},
			storageset: {},
		},
	},
	mutations: {
		setUser(state, data) {
			uni.setStorageSync('userId', data.id)
			data.integral = data.integral || 0
			data.balance = data.balance || 0
			state.user = data
			// #ifndef H5
			if (data.portrait) state.isLogin = true
			// #endif
			// #ifdef H5
			state.isLogin = true
			// #endif
			// console.log('setUsersetUsersetUser', data, state.isLogin)
		},
		setSystem(state, data) {
			state.system = data
		},
		setCarList(state, data) {
			state.carList = data
		},
		setScarList(state, data) {
			// console.log('setScarList', data, state.scarList)
			if (!data.key) {
				state.scarList['out'] = data.data
			} else {
				state.scarList[data.key] = data.data
			}
		},
		setSjxx(state, data) {
			state.sjxx = data
			uni.setStorageSync('storeId', data.shopData.id)
		},
		setLayout(state, {
			params,
			data
		}) {
			// console.log(state.layout, {
			// 	params,
			// 	data
			// })
			state.layout[params.page] = data
			// console.log(params,data)
		},
		setConfig(state, {
			params,
			data
		}) {
			// console.log(state.config, {
			// 	params,
			// 	data
			// })
			state.config[params.key] = data
		},
	},
	getters: {
		hcCar: state => () => {
			let hcCar = uni.getStorageSync('hcCar') || [],
				item = hcCar.find(v => v.storeId == state.sjxx.storeInfo.id)
			if (item) {
				item.list = state.carList
			} else {
				if (hcCar.length < 5) {
					hcCar.push({
						storeId: state.sjxx.storeInfo.id,
						list: state.carList
					})
				} else {
					hcCar.splice(0, 1)
					hcCar.push({
						storeId: state.sjxx.storeInfo.id,
						list: state.carList
					})
				}
			}
			uni.setStorageSync('hcCar', hcCar)
			// console.log('getters hcCar', state.sjxx.storeInfo.id, state.carList, uni.getStorageSync('hcCar'))
		}
	},
	actions: {
		async getSystem({
			commit,
			state
		}, params = {}) {
			// console.log('state', state, params)
			if (!state.system.color || params.get) {
				let res = {};
				state.isIpx = util.getSb().model.search('iPhone X') != -1 || util.getSb().model.search(
						'iPhone 1') != -1 || util
					.getSb().model.search('iPhone1') != -1
				//console.log(state.isIpx)
				res = await util.request({
					'url': api.config,
					data: {
						ident: 'system'
					}
				})
				res.data.color = res.data.color || '#FF5F2F'
				// res.data.pm = api.platform
				commit("setSystem", res.data);
				params.setNB && util.setNB(res.data.color, params.nofc)
			} else {
				params.setNB && util.setNB(state.system.color, params.nofc)
			}
			// // #ifndef MP-TOUTIAO
			// // #endif
		},
		async checkBindTel({
			commit,
			rootState
		}, params) {
			return new Promise((reslove, reject) => {
				if (!rootState.user.userTel) {
					uni.showModal({
						title: '提示',
						content: '请先绑定手机号',
						confirmText: '前往绑定',
						cancelText: '暂不绑定',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/yb_o2o/my/login/index',
								});
							}
						}
					});
				} else {
					reslove()
				}
			})
		},
		async getLoginInfo({
			commit,
			state
		}, params = {}) {
			if (state.user.id) {
				return
			} else {
				return await new Promise(async (resolve, reject) => {
					// #ifndef H5
					// util.showLoading()
					uni.login({
						// #ifdef MP-ALIPAY
						scopes: 'auth_base',
						// #endif
						success: async (lres) => {
							// console.log('uni.login', res)
							let res = await util.request({
								'url': api.login,
								// mask: 1,
								data: {
									code: lres.code,
									inviteId: params.inviteId || '',
									type: params.type || '',
								}
							})
							if (res) {
								// console.timeEnd('login')
								commit('setUser', res.data)
								resolve()
								if (res.data.session_key) {
									getApp().globalData.session_key = res.data
										.session_key
								}
							} else {
								reject()
								util.modal('请检查小程序秘钥等相关配置')
							}
						},
						fail: (err) => {
							console.log('接口调用失败，将无法正常使用开放接口等服务', err)
							if (err.errMsg.indexOf('permission') > -1) {
								resolve()
							}
							reject(err)
						}
					})
					// #endif
					// #ifdef H5
					if (api.platform == 'weChat') {
						// console.log('%c api.platform ', 'color: white; background-color: #95B46A', api.platform)
						if (!getApp().globalData.siteInfo.isDev) {
							util.showLoading()
							let {
								data
							} = await util.request({
								'url': api.login,
								mask: 1,
								data: {
									inviteId: params.inviteId || '',
								}
							})
							if(data && data.id){
								commit('setUser', data)
								resolve()
							}
							else{			
								let {
									data
								} = await util.request({
									'url': api.wechatLogin,
									mask: 1,
									data: {
										url: window.location.href
									}
								})
								window.location.href = data;
							}
							// let [error, res] = await uni.request({
							// 	'url': `${getApp().globalData.siteInfo.siteroot}/login/login?uniacid=${getApp().globalData.siteInfo.uniacid}`,
							// 	'data': {
							// 		inviteId: params.inviteId || '',
							// 	},
							// 	'method': 'GET',
							// 	'header': {
							// 		'content-type': 'application/x-www-form-urlencoded',
							// 		"appType": api.platform,
							// 	}
							// });
							// if (res.data.errno == 0) {
							// 	uni.hideLoading();
							// 	commit('setUser', res.data.data)
							// 	resolve()
							// } else {
							// 	util.message(res.data.message || res.data, 3, 2000)
							// }
							// console.log('%c login data ',
							// 	'color: white; background-color: #34aaff', data)
						} else {
							let {
								data
							} = await util.request({
								'url': api.login,
								mask: 1,
								data: {
									inviteId: params.inviteId || '',
								}
							})
							commit('setUser', data)
							resolve()
						}
					} else {
						commit('setUser', {
							id: "1",
							userId: '1',
							openId: "123",
							userName: "小",
							userTel: "13823515936",
							portrait: ""
						})
						resolve()
						console.log('%c api.platform ',
							'color: white; background-color: #95B46A', api.platform)
					}
					// #endif
				})
			}

		},
		async refreshUser({
			commit,
			state
		}, params) {
			// console.log(params)
			// return
			let {
				data
			} = await util.request({
				'url': api.xgyh,
				method: params.get ? 'GET' : 'POST',
				mask: params.nomask ? 0 : 1,
				data: params
			})
			if (params.now) {
				data && commit('setUser', data)
			} else {
				setTimeout(() => {
					data && commit('setUser', data)
				}, 200);
			}
			return data
		},
		async loginBind({
			commit,
			state
		}, params) {
			let res = await util.request({
				'url': api.bind,
				method: 'POST',
				mask: 1,
				data: params
			})
			res && commit('setUser', res.data)
			return res
		},
		addCar({
			commit,
			state
		}, params) {
			let i, isVip = state.user.rankId > 0,
				obj = {
					gnum: params.gnum || 1
				}
			if (params.g.isSpec != 1 && params.g.isMaterial != 1 && params.g.isAttribute != 1) {
				i = state.carList.findIndex(v => v.goodsId == params.g.goodsId)
			} else {
				i = state.carList.findIndex(v => v.goodsId == params.g.goodsId && v.groupId == params.g
					.groupId && v.jlids ==
					params.g.jlids && v.attribute == params.g.attribute)
			}
			if (params.outin == 1) {
				let item = state.carList.find(v => v.goodsId == params.g.goodsId && v.groupId == params.g
					.groupId && v.jlids ==
					params.g.jlids && v.attribute == params.g.attribute) || {
					num: 0
				}
				if (item.num >= params.g.outStock) {
					util.message('此商品库存不足', 3)
					return {
						isxg: true
					}
				} else if (item.num >= 99) {
					util.message('最多添加99个', 3)
					return {
						isxg: true
					}
				}
			}
			if (i > -1) {
				if (params.g.maxNum > 0 && state.carList[i].num >= params.g.maxNum) {
					util.message(`此商品限购${params.g.maxNum}份`, 3)
					return {
						isxg: true
					}
				}
				state.carList[i].num++
			} else {
				if (params.g.minNum > 1 && params.outin == 1) {
					obj.gnum = +params.g.minNum
				}
				let goods = Object.assign({}, params.g)
				goods.num = obj.gnum
				goods.price = params.outin == 1 ? isVip && params.g.outVipPrice > 0 ? +params.g.outVipPrice : +
					params.g.outSalesPrice :
					+params.g.inSalesPrice
				goods.price += params.g.jlmoney || 0
				goods.price = +goods.price.toFixed(2)
				state.carList.push(goods)
				// console.log(goods)
			}
			//
			if (params.outin == 1) store.getters.hcCar()
			// console.log('index.js,addCar', params, i)
			return obj
		},
		decCar({
			commit,
			state
		}, params) {
			let i, obj = {
				gnum: params.gnum || 1
			}
			if (params.g.isSpec != 1 && params.g.isMaterial != 1 && params.g.isAttribute != 1) {
				i = state.carList.findIndex(v => v.goodsId == params.g.goodsId)
			} else {
				i = state.carList.findIndex(v => v.goodsId == params.g.goodsId && v.groupId == params.g
					.groupId && v.jlids ==
					params.g.jlids && v.attribute == params.g.attribute)
			}
			if (i > -1) {
				if (params.g.minNum > 1 && params.outin == 1 && params.g.minNum == state.carList[i].num) {
					obj.gnum = +params.g.minNum
				}
				state.carList[i].num -= obj.gnum
				state.carList[i].num == 0 && state.carList.splice(i, 1)
			}
			//
			if (params.outin == 1) store.getters.hcCar()
			return obj
			//console.log(params, i, state.carList)
		},
		cshCar({
			commit,
			state
		}, params) {
			let hcCar = uni.getStorageSync('hcCar') || [],
				item = hcCar.find(v => v.storeId == params)
			if (item) {
				commit('setCarList', item.list)
			} else {
				commit('setCarList', [])
			}
			// console.log(hcCar, item)
		},
		//数据库car
		async clearMycar({
			commit,
			state
		}, params) {
			let res = await util.request({
				'url': api.qkgwc,
				method: 'POST',
				mask: 1,
				data: params
			})
			res && commit('setScarList', {
				key: params.key,
				data: {}
			})
		},
		async getMycar({
			commit,
			state
		}, params) {
			let res = await util.request({
				'url': api.wdgwc,
				mask: params.mask,
				data: params
			})
			res && commit('setScarList', {
				key: params.key,
				data: res.data
			})
			// console.log('index.js,getMycar', params, state.scarList)
		},
		async supdCar({
			dispatch,
			commit,
			state
		}, params) {
			let res = await util.request({
				'url': api.xggwc,
				ct: 1,
				method: 'POST',
				// mask: 1,
				data: params
			})
			// console.log('index.js,SaveShopCar', res)
			if (res) {
				commit('setScarList', {
					key: params.key,
					data: res.data
				})
				return +res.count
				// dispatch('getMycar', {
				// 	userId: params.userId,
				// 	item: params.item,
				// 	storeId: params.storeId,
				// 	tableId: params.tableId,
				// })
				// console.log(this)
			}
			// console.log('index.js,supdCar', params)
		},
		async getSjxx({
			commit,
			state
		}, params) {
			// if (state.sjxx.shopData) return
			// console.time('sjxx')
			let {
				data
			} = await util.request({
				'url': api.shopGoodsInfo,
				// mask: '接口',
				data: params
			})
			// console.timeEnd('sjxx')
			if (!data.newStoreSet || !data.newStoreSet.data) {
				data.newStoreSet = {
					data: []
				}
			}
			if (!data.storeSet || !data.storeSet.data) {
				data.storeSet = {
					data: []
				}
			}
			if (!data.vipStoreSet || !data.vipStoreSet.data) {
				data.vipStoreSet = {
					data: []
				}
			}
			commit('setSjxx', data)
			return data
		},
		async getLayout({
			commit,
			state
		}, params = {
			page: 'index',
			id: '1',
		}) {
			// console.time('getLayout')
			if (state.layout[params.page].id) {
				if (params.page == 'custom') {

				} else {
					return
				}
			}
			let res = await util.request({
				'url': api.layout,
				data: params
			})
			// console.timeEnd('getLayout')
			if (res) {
				commit('setLayout', {
					params,
					data: res.data
				})
			}
		},
		async getConfig({
			commit,
			state
		}, params) {
			if (params.api) {
				if (state.config[params.key].isget) {
					return
				}
				// if (params.local) {
				// 	if (uni.getStorageSync(params.key)) {
				// 		return uni.getStorageSync(params.key)
				// 	}
				// }
				let res = await util.request({
					'url': api[params.api],
					method: 'POST',
					data: params.params
				})
				if (res) {
					if (!state.config[params.key].sArr) {
						commit('setConfig', {
							params,
							data: {
								isget: true,
								...res.data
							}
						})
					} else {
						commit('setConfig', {
							params,
							data: {
								isget: true,
								sArr: res.data
							}
						})
					}
				}
			} else {
				if (params.key == 'storeInfo') {
					params.data.distance = Number((params.data.distance / 1000).toFixed(params.data
						.distance < 100 ? 2 : 1)) + 'km'
				}
				commit('setConfig', {
					params,
					data: params.data
				})
			}
		},
	},
	modules: {
		dndc,
	}
})

export default store
