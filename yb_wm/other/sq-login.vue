<template>
	<view class="wh bf">
		<view class="topimg p-r">
			<mg-img :src="`${onImgurl}img/sqbg.png`"></mg-img>
			<view class="p-a logoc">
				<mg-img :src="system.icon"></mg-img>
			</view>
		</view>
		<view class="snbtnc">
			<!-- #ifdef APP-PLUS || MP-TOUTIAO -->
			<button class="btni cf f-c f28" :style="{background:tColor,borderColor:tColor,}"
				@click="getUserInfo">用户登录</button>
			<!-- #endif -->
			<!-- #ifdef MP-BAIDU || MP-ALIPAY -->
			<button class="btni cf f-c f28" :style="{background:tColor,borderColor:tColor,}"
				:open-type="ptname?'getAuthorize':'getUserInfo'" @getuserinfo="mpGetUserInfo" scope='userInfo'
				@getAuthorize="onGetAuthorize">用户登录</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="btni cf f-c f28" :style="{background:tColor,borderColor:tColor,}"
				@click="getUserProfile">用户登录</button>
			<!-- #endif -->
			<button class="btni bf f-c f28" :style="{borderColor:tColor,color:tColor}" @click="go({t:4})">取消</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	export default {
		name: 'sq-login',
		data() {
			return {
				loading: false,
				ptname: this.api.platform == 'ali'
			}
		},
		onLoad() {
			this.getSystem()
			this.util.setNT('登录')
		},
		methods: {
			// 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
			getUserInfo() {
				uni.getUserInfo({
					success: (result) => {
						// #ifdef MP-TOUTIAO
						let portrait = result.userInfo.avatarUrl,
							userName = result.userInfo.nickName,
							userId = this.uId
						// #endif
						this.refreshUser({
							storeId: this.storeid,
							portrait,
							userName,
							userId
						}).then(res => {
							this.$emit('refresh')
							this.util.message('登录成功', 1, 1000)
							utils.swnb(1000)
						})
						console.log('getUserInfo success', result);
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						uni.showModal({
							title: '温馨提示',
							content: '获取头像等信息失败',
							showCancel: false
						});
					}
				});
			},
			getUserProfile() {
				if (this.loading) return
				this.loading = true
				uni.getUserProfile({
					desc: '用于完善用户资料',
					success: res => {
						try {
							if (res.errMsg == 'getUserProfile:ok') {
								let portrait = res.userInfo.avatarUrl,
									userName = res.userInfo.nickName,
									userId = this.uId
								this.refreshUser({
									storeId: this.storeid,
									portrait,
									userName,
									userId,
									now: 1,
								}).then(res => {
									this.util.message('登录成功', 1, 1000)
									utils.swnb(1000)
								}).catch(() => {
									this.loading = false
								})
								// console.log(portrait, userName, userId)
							}

						} catch (e) {
							this.loading = false
							console.log(e)
						}
					},
					fail: err => {
						this.loading = false
						uni.showModal({
							title: '温馨提示',
							content: '获取头像等信息失败',
							showCancel: false
						});
					}
				})
			},
			mpGetUserInfo(result) {
				if (this.loading) return
				this.loading = true
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg == 'getUserInfo:ok') {
					let portrait = result.detail.userInfo.avatarUrl,
						userName = result.detail.userInfo.nickName,
						userId = this.uId
					this.refreshUser({
						storeId: this.storeid,
						portrait,
						userName,
						userId,
						now: 1,
					}).then(res => {
						this.util.message('登录成功', 1, 1000)
						utils.swnb(1000)
					}).catch(() => {
						this.loading = false
					})
					// console.log(portrait, userName, userId)
				} else {
					this.loading = false
					uni.showModal({
						title: '温馨提示',
						content: '获取头像等信息失败',
						showCancel: false
					});
				}
			},
			onGetAuthorize(res) {
				// console.log('onGetAuthorize', res)
				my.getOpenUserInfo({
					fail: (res) => {},
					success: (res) => {
						// console.log('my.getOpenUserInfo', JSON.parse(res.response).response)
						let result = JSON.parse(res.response).response
						this.refreshUser({
							storeId: this.storeid,
							portrait: result.avatar,
							userName: result.nickName,
							userId: this.uId,
							now: 1,
						}).then(res => {
							this.util.message('登录成功', 1, 1000)
							utils.swnb(1000)
						})
					}
				});
			},
			mpGetphonenumber(result) {
				console.log('mpGetphonenumber', result);
				if (result.detail.errMsg == 'getPhoneNumber:ok') {
					let sessionKey = getApp().globalData.session_key,
						data = result.detail.encryptedData,
						iv = result.detail.iv,
						userId = this.uId
					this.util.request({
						url: this.api.jm,
						method: 'POST',
						data: {
							userId,
							sessionKey,
							data,
							iv
						}
					}).then(res => {
						res.data && this.$emit('refresh', res.data)
						this.refreshUser({
							get: 1,
						})
						console.log(res)
					})
					console.log(sessionKey, data, iv)
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '授权手机号失败',
						showCancel: false
					});
					return;
				}
			}
		}
	}
</script>
<style scoped lang='scss'>
	.topimg {
		height: 100vw;
	}

	.logoc {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 166rpx;
		height: 166rpx;
	}

	.snbtnc {
		margin-top: 95rpx;
	}

	.btni {
		margin: 0 19.5% 50rpx;
		border: 1px solid #000;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
