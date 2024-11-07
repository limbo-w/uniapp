import util from '../../common/we7/util.js';
import api from '../../common/api.js';

export default {
	namespaced: true,
	state: {
		dndcConfig: {},
		ldxConfig: {},
		smConfig: {},
		addInfo: null,
		cityInfo: {},
		latLng: {},
		myAdData: [],
		mySwitch: {},
		fxsInfo: {},
		fxsSq: {},
	},
	mutations: {
		setDndcConfig(state, data) {
			state.dndcConfig = data
		},
		setLdxConfig(state, data) {
			state.ldxConfig = data || {}
		},
		setSmConfig(state, data) {
			state.smConfig = data
		},
		setAddInfo(state, data) {
			state.addInfo = data
			// console.log('dndc setAddInfo', data)
		},
		setCityInfo(state, data) {
			state.cityInfo = data
			// console.log('dndc setCityInfo', data)
		},
		setLatLng(state, data) {
			state.latLng = data
			// console.log('dndc setLatLng', data)
		},
		setMyAdData(state, data) {
			state.myAdData = data
		},
		setMySwitch(state, data) {
			state.mySwitch = data
		},
		setFsxInfo(state, data) {
			state.fxsInfo = data
		},
		setFsxSq(state, data) {
			state.fxsSq = data
		},
	},
	actions: {
		//定位信息
		async getAddInfo({
			commit,
			state
		}, params) {
			if (!state.addInfo) {
				let add = {
					maddress: '',
					city: '',
				}
				// #ifndef MP-TOUTIAO 
				if (!params.city) {
				// #endif
				// #ifdef MP-TOUTIAO 
				if (params.city && !params.address || !params.city) {
				// #endif
					let {
						data
					} = await util.request({
						'url': api.zbtdz,
						method: 'POST',
						data: {
							lat: params.latitude,
							lng: params.longitude,
						}
					})
					add.maddress = params.address || data.result.formatted_addresses && data.result
						.formatted_addresses.recommend ||
						data.result.address
					add.city = data.result.address_component.city
				} else {
					add.maddress = params.address
					add.city = params.city;
				}
				commit('setAddInfo', add)
				// let res = await util.request({
				// 	'url': api.CityToId,
				// 	method: 'POST',
				// 	data: {
				// 		name: add.city
				// 	}
				// })
				// commit('setCityInfo', {
				// 	cityName: add.city,
				// 	cityId: res.data
				// })
			}
		},
		//设置
		async getSwitchConfig({
			commit,
			state
		}, params) {
			if (!state.mySwitch.hasOwnProperty('jfName')) {
				let res = await util.request({
					'url': api.Getswitch,
				})
				res && commit('setMySwitch', res.data)
			}
		},
		//设置
		async getDndcConfig({
			commit,
			state
		}, params) {
			if (!state.dndcConfig.location) {
				let res = await util.request({
					'url': api.config,
					data: {
						ident: 'instoreset'
					},
				})
				res && commit('setDndcConfig', res.data)
			}
		},
		//老带新分销商
		async getLdxConfig({
			commit,
			state
		}, params) {
			if (!state.ldxConfig.location) {
				let res = await util.request({
					'url': api.config,
					data: {
						ident: params,
					},
				})
				res && commit('setLdxConfig', res.data)
			}
		},
		async getSmConfig({
			commit,
			state
		}, params) {
			if (!state.smConfig.saveOrder) {
				let res = await util.request({
					'url': api.wmmbxx,
					mask: 1,
				})
				res && commit('setSmConfig', res.data)
				return
			}
		},
		async getMyAd({
			commit,
			state
		}, params) {
			if (!state.myAdData.length) {
				let res = await util.request({
					'url': api.PlatformAdList,
					data: {
						location: 6,
						type: 1,
					}
				})
				res && commit('setMyAdData', res.data)
			}
		},
		async getFxzx({
			commit,
			state
		}, params) {
			let res = await util.request({
				'url': api.config,
				data: {
					ident: 'distributionSet'
				},
			})
			if (res) {
				// res.data.createdAt = res.data.createdAt.substring(0, 16)
				commit('setFsxInfo', res.data)
			} else {
				setTimeout(() => {
					params.that.go({
						t: 5,
						url: '/yb_wm/index/my-index'
					})
				}, 1500)
			}
		},
		async getFxSq({
			commit,
			state
		}, params) {
			let res = await util.request({
				'url': api.distributionAD,
				mask: 1,
			})
			if (res) {
				commit('setFsxSq', res.data)
			} else {
				setTimeout(() => {
					params.that.go({
						t: 5,
						url: '/yb_wm/index/my-index'
					})
				}, 1500)
			}
		},
	}
}
