<script>
	import siteInfo from './common/siteinfo';
	import utils from '@/common/utils';
	export default {
		globalData: {
			siteInfo,
			onImgurl: 'https://s.y-bei.cn/static/miniapp/',
			//api: require('./common/config.js'),
		},
		//api: require('./common/config.js'),
		onLaunch: function(options) {
			// #ifdef H5
			if (!siteInfo.isDev) {
				let params = utils.getUrlParams(location.href);
				this.globalData.siteInfo.uniacid = params.uniacid;
				this.globalData.siteInfo.eid = params.eid;
				console.log('%c params ', 'color: white; background-color: #f00000', params);
				this.getLoginInfo();
			} else {
				// this.globalData.siteInfo.uniacid = 6
			}
			// #endif
			// #ifdef MP
			this.autoUpdate()
			// #endif
			// #ifdef MP-ALIPAY
			if (options.query && options.query.qrCode) {
			      this.globalData.siteInfo.qrCode = options.query.qrCode;
			    } 
			// #endif
			// console.log('App Launch')
			// this.util.wxAuthorize();
		},
		methods: {
			// #ifdef MP
			autoUpdate() {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(res => {
					if (res.hasUpdate) {
						uni.showModal({
							title: '更新提示',
							confirmText: "确定更新",
							showCancel: false,
							content: '新版本已经准备好，是否重启应用？',
							success: res => {
								if (res.confirm) {
									//2. 用户确定下载更新小程序，小程序下载及更新静默进行
									this.downLoadAndUpdate(updateManager)
								} else {
									uni.showModal({
										title: '温馨提示~',
										content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
										showCancel: false,
										confirmText: "确定更新",
										success: res => {
											if (res.confirm) {
												this.downLoadAndUpdate(updateManager)
											}
										}
									})
								}
							}
						})
					}
				});
			},
			downLoadAndUpdate: function(updateManager) {
				uni.showLoading();
				//静默下载更新小程序新版本
				updateManager.onUpdateReady(function() {
					uni.hideLoading()
					updateManager.applyUpdate()
				})
				updateManager.onUpdateFailed(function() {
					uni.hideLoading()
					// 新的版本下载失败
					uni.showModal({
						title: '已经有新版本了哟~',
						content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
					})
				})
			},
			// #endif
		},
		onShow: async function(data) {
			if (data) {
				if (data.hasOwnProperty('referrerInfo')) {
					if (data.referrerInfo.appId == 'wxeb490c6f9b154ef9') {
						if (data.referrerInfo.extraData) {
							let res = await this.util.request({
								url: this.api.jhhyk,
								method: 'POST',
								data: {
									activate_ticket: data.referrerInfo.extraData.activate_ticket,
									card_id: data.referrerInfo.extraData.card_id,
									code: data.referrerInfo.extraData.code,
									userId: this.$store.state.user.userId
								}
							});
							console.log('%c extraData ', 'color: white; background-color: #34aaff', data.referrerInfo,
								res.data);
						}
					}
				}
			}
		},
		onHide: function() {},

	};
</script>

<style lang="scss">
	@import './common/styles/index.css';

	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}

	/* #endif */
</style>
