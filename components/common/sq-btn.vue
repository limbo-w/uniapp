<template>
	<block>
		<!-- #ifdef APP-PLUS || MP-TOUTIAO -->
		<button v-if="type==1" :class="['sqbtn',cname]"
			:style="[{width:w+'rpx',height:h+'rpx',lineHeight:h+'rpx',},sname]" @click="getUserInfo">{{t}}</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-ALIPAY -->
		<button v-if="type==1" :class="['sqbtn',cname]"
			:style="[{width:w+'rpx',height:h+'rpx',lineHeight:h+'rpx',},sname]"
			:open-type="api.platform=='ali'?'getAuthorize':'getUserInfo'" @getuserinfo="mpGetUserInfo" scope='userInfo'
			@getAuthorize="onGetAuthorize">{{t}}</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-BAIDU -->
		<button v-if="type==2" :class="['sqbtn',cname]"
			:style="[{width:w+'rpx',height:h+'rpx',lineHeight:h+'rpx',},sname]" open-type="getPhoneNumber"
			@getphonenumber="mpGetphonenumber">{{t}}</button>
		<!-- #endif -->
		<!-- 触发用户转发 -->
		<!-- #ifndef H5 -->
		<button @click="this.$emit('refresh')" hover-class='be' v-if="type==3" :class="['sqbtn',cname]"
			:style="[{width:w+'rpx',height:h+'rpx',lineHeight:h+'rpx',},sname]" open-type="share">{{t}}</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<button hover-class='be' v-if="type==3" :class="['sqbtn',cname]"
			:style="[{width:w+'rpx',height:h+'rpx',lineHeight:h+'rpx',},sname]" @click="share">{{t}}</button>
		<!-- #endif -->
		<view v-if="type==4">
			<mg-modal :ismr="true" v-model="show" width="600rpx" :z-index="3000">
				<view class="bf bs30 sqtel t-c">
					<view class="ptimg bsf ma">
						<mg-img :src="system.icon"></mg-img>
					</view>
					<view class="f36 mt30 mb20 l-h1">{{system.name}}</view>
					<view>绑定手机号后，将会获得更多权益哦！</view>
					<!-- #ifdef MP-WEIXIN || MP-BAIDU|| MP-TOUTIAO -->
					<button :disabled="loading" class="f30 telbtn cf" :style="{background:tColor}"
						open-type="getPhoneNumber" @getphonenumber="mpGetphonenumber">立即绑定</button>
					<!-- #endif -->
					<!-- #ifdef MP-ALIPAY -->
					<button :disabled="loading" class="f30 telbtn cf" :style="{background:tColor}"
						open-type="getAuthorize" scope='phoneNumber' @getAuthorize="getAlPhoneNumber">立即绑定</button>
					<!-- #endif -->
				</view>
			</mg-modal>
		</view>
	</block>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import mgModal from '@/components/common/modal.vue'
	export default {
		name: 'sq-btn',
		components: {
			mgModal,
		},
		props: {
			cname: '',
			sname: '',
			w: '',
			h: '',
			t: '',
			type: {
				type: String,
				default: '1',
			}, //1用户信息，2手机号3瓜分红包
			storeid: {
				type: String,
				default: '',
			},
			value: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				loading: false,
			}
		},
		computed: {
			ptname() {
				let t = ''
				switch (this.api.platform) {
					case 'mini':
						t = '微信'
						break;
					case 'ali':
						t = '支付宝'
						break;
					case 'baidu':
						t = '百度'
						break;
					case 'toutiao':
						t = '字节跳动'
						break;
				}
				return t
			},
			show: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
		},
		watch: {
			// sname: {
			// 	handler(newVal) {
			// 		console.log('newVal', newVal)
			// 	},
			// 	immediate: true
			// },
		},
		methods: {
			share() {
				uni.showModal({
					title: '提示',
					content: '点击右上角分享',
					showCancel: false,
					confirmText: '我知道了'
				})
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
						}).then(res => {
							this.$emit('refresh')
						})
					}
				});
			},
			getAlPhoneNumber() {
				my.getPhoneNumber({
					success: res => {
						var resData = JSON.parse(res.response);
						this.util.request({
							url: this.api.jm,
							method: 'POST',
							data: {
								data: resData.response
							}
						}).then(res => {
							console.log('jm res', res)
							if (res.data) {
								this.show = false
								if (this.type == 4) {
									this.util.message('绑定成功', 1, 1000)
								} else {
									this.$emit('refresh', res.data)
								}
								this.refreshUser({
									nomask: 1,
									get: 1,
									now: 1,
								})
							}
						})
						console.log('getAlPhoneNumber success', resData)
					},
					fail: res => {
						console.log('getAlPhoneNumber fail', res)
					}
				})
			},
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
			mpGetUserInfo(result) {
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg == 'getUserInfo:ok') {
					let portrait = result.detail.userInfo.avatarUrl,
						userName = result.detail.userInfo.nickName,
						userId = this.uId
					this.refreshUser({
						storeId: this.storeid,
						portrait,
						userName,
						userId
					}).then(res => {
						this.$emit('refresh')
					})
					console.log(portrait, userName, userId)
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '获取头像等信息失败',
						showCancel: false
					});
					return;
				}
			},
			mpGetphonenumber(result) {
				this.loading = true
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
						this.loading = false
						if (res.data) {
							this.show = false
							if (this.type == 4) {
								this.util.message('绑定成功', 1, 1000)
							} else {
								this.$emit('refresh', res.data)
							}
							this.refreshUser({
								nomask: 1,
								get: 1,
								now: 1,
							})
						}
						console.log(res)
					}).catch(() => {
						this.loading = false
					})
					console.log(sessionKey, data, iv)
				} else {
					this.loading = false
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
	.sqtel {
		padding: 70rpx 40rpx;
	}

	.ptimg {
		width: 136rpx;
		height: 136rpx;
	}

	.telbtn {
		line-height: 2.8;
		margin-top: 70rpx;
	}

	/*  #ifdef MP-ALIPAY*/
	/*  #endif  */
</style>
