<template>
	<view class="mh100 bf pb130">
		<view class="paytop f-c-c cf p-r" :style="{background:xzcolor}">
			<image class="p-a payimg b0 r0" :src="`/static/pay/${xzzfimg}.png`"></image>
			<view v-if="payObj.orderType" class="f30 mb10" style="opacity: 0.8;">{{payObj.info.storeName}}</view>
			<view class="paymoeny wei f60"><text class="">{{sl}}</text><text class="">{{pmoney}}</text></view>
			<!-- <mg-cell hc='1' @tab="go({t:1,url:'/yb_o2o/order/order-dl?id='+info.id})" v-if="payObj.orderType==1&&info" cname="p13"
			 last='1' :btt='`${info.storeName} 订单详情`' bttc="f26" arrow="1"></mg-cell> -->
			<view v-if="payObj.orderType" class="p13 f26">{{payObj.info.type}}</view>
			<view v-if="info" class="f26 djsc">支付剩余时间：<text class="ml10" v-if="stime">{{stime[2]}}:{{stime[3]}}</text>
			</view>
		</view>
		<form @submit="formSubmit">
			<view class="">
				<radio-group name='radiogroup' @change="radioChange">
					<label class="weui-cell right30 f-s" v-for='(v,i) in payArr' :key='i'>
						<view class="f-y-c">
							<image class='hdimg' mode='aspectFit' :src='v.img'></image>
						</view>
						<view class="weui-cell__bd">
							<view class="f-row">
								<view class="f34 f-1 l-n">{{v.name}}</view>
								<view class="weui-cell__ft_in-radio">
									<text class="iconfont f40" :class="v.value == radioVal?'icongx':'iconwgx'"
										:style="{color:v.value == radioVal?v.color||tColor:''}"></text>
									<radio :value="v.value" :checked="v.value == radioVal" class="weui-check" />
								</view>
							</view>
							<view class='yezf f24 mt10' v-if="v.value=='ye'" :style="{color:tColor}">
								可用{{balanceName}}{{sl+user.balance}}
							</view>
							<view class="mt20 mswz bf5 bs10 l-n f24 c9">{{v.text}}</view>
							<block v-if="v.value=='ye'">
								<block v-for="(v,i) in yeczrule" :key='i'>
									<view v-if="i<2" class="f-y-c f22 mt20">
										<view class="hdc f18 mr15 f-g-0 cf">惠</view>
										<view class="c6 f-raw">
											<view>充{{v.money}}赠送：</view>
											<view v-if="v.moneyOpen == 1">{{sl+v.giveMoney}},</view>
											<view v-if="v.integralOpen == 1">{{v.integral}}{{jfName}},</view>
											<view v-if="v.growOpen == 1">{{v.giveGrow}}成长值,</view>
											<view v-if="v.couponOpen == 1">{{v.couponArr.length}}张代金券</view>
										</view>
									</view>
								</block>
								<view v-if="yeczrule.length" @click.stop="go({url:'/yb_wm/other/recharge/index'})"
									class="f-y-c mt20">
									<view class="c6 f24 f-1">更多优惠</view>
									<text class="iconfont iconright arrow ml5" :class="ftc"
										style="color:#C4C4C4"></text>
								</view>
							</block>
						</view>
					</label>
				</radio-group>
			</view>
			<view v-if="payArr.length" class="foot-btnc">
				<button :disabled="loading" :loading="loading" form-type="submit" class="foot-btn b-s-2 bs0 f30 wei"
					:style="{background:xzcolor}">确认支付</button>
			</view>
		</form>
		<subscribe-msg />
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from "vuex";
	import mgPopup from '@/components/common/popup.vue'
	import mgModal from '@/components/common/modal.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import utils from '@/common/utils.js'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import {
		chooseWXPay
	} from "@/common/wechat-util"
	export default {
		name: 'mg-pay',
		components: {
			mgPopup,
			mgModal,
		},
		data() {
			return {
				loading: false,
				payObj: {},
				payArr: [],
				showCoupon: false,
				stime: '',
				info: null, //订单详情
				radioVal: '',
				xzcolor: '',
				xzzfimg: '',
				yeczrule: [],
			}
		},
		async onLoad(options) {
			this.util.setNT('收银台')
			this.payObj = JSON.parse(decodeURIComponent(options.payObj))
			this.getConfig({
				key: 'payConfig',
				api: 'config',
				params: {
					ident: 'payConfig'
				}
			}).then(res => {
				this.getPayArr()
			})
			if (this.payObj.orderType == 1) { //1下单2充值
				let {
					data
				} = await this.util.request({
					'url': this.api.wmddxq,
					mask: 1,
					data: {
						orderId: this.payObj.orderId
					},
				})
				if (data) {
					if (data.state == 1) {
						this.info = data
						this.djs(data.createdAt)
					}
				}
			}
			uni.getProvider({
				service: 'payment',
				success: (res) => {
					if (res.provider.indexOf('wxpay')) {
						this.provider = 'wxpay'
					} else if (res.provider.indexOf('alipay')) {
						this.provider = 'alipay'
					} else if (res.provider.indexOf('baidu')) {
						this.provider = 'baidu'
					} else if (res.provider.indexOf('toutiao')) {
						this.provider = 'toutiao'
					}
					// console.log(res.provider)
				}
			});
			uni.setStorageSync('payPage', true)
			uni.setStorageSync('payedCoupon', false)
			// console.log(options, this.payObj)
		},
		onShow() {
			this.refreshUser({
				get: 1,
				now: 1,
			})
		},
		onUnload() {
			setTimeout(() => {
				uni.removeStorageSync('payPage');
				this.dsq && clearInterval(this.dsq)
			}, 1000)
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				payConfig: state => state.config.payConfig,
				orderset: state => state.config.orderset,
			}),
			pmoney() {
				return Number(this.payObj.info && this.payObj.info.money || 0).toFixed(2)
			},
			jfName() {
				return this.system.custom.integral
			},
			balanceName() {
				return this.system.custom.balance
			},
		},
		methods: {
			...mapActions(['getConfig']),
			radioChange(e) {
				this.radioVal = e.detail.value
				let item = this.payArr.find(v => v.value == e.detail.value)
				this.util.setNB(item.color)
				this.xzcolor = item.color
				this.xzzfimg = item.img2
				// console.log(this.radioVal, item)
			},
			getPayArr() {
				//可选支付类型
				let payArr = []
				if (1) {
					if ((this.payConfig.payOpen == 1 && this.api.platform == 'mini' || this.api.platform == 'weChat') || (this.payObj.orderType == 2 && this.api.platform == 'mini' || this.api.platform == 'weChat')) {
						payArr.push({
							name: '微信支付',
							value: 'wx',
							img: '/static/pay/wxzf.png',
							img2: 'wxb',
							color: '#65B05B',
							text: '更方便，更快捷'
						})
					} else if (this.api.platform == 'ali') {
						payArr.push({
							name: '支付宝支付',
							value: 'zfb',
							img: '/static/pay/zfbzf.png',
							img2: 'ylbg',
							color: '#1890ff',
							text: '更方便，更快捷'
						})
					} else if (this.api.platform == 'baidu') {
						payArr.push({
							name: '百度支付',
							value: 'baidu',
							img: '/static/pay/bdzf.png',
						})
					} else if (this.api.platform == 'toutiao') {
						payArr.push({
							name: '头条支付',
							value: 'toutiao',
							color: '#37BECC',
							img: '/static/pay/ttzf.png',
							text: '更方便，更快捷'
						})
					}
				}
				if (this.payConfig.balancePayOpen == 1) {
					switch (+this.payObj.orderType) {
						case 2:
							break;
						default:
							payArr.push({
								name: this.balanceName + '支付',
								value: 'ye',
								img: '/static/pay/yezf.png',
								img2: 'yeb',
								color: this.tColor,
								text: this.balanceName + '支付，充值有优惠'
							})
							break;
					}
				}
				if (this.payObj.orderType == 1 && this.payConfig.payMentOpen == 1) {
					switch (+this.payObj.orderType) {
						case 2:
							break;
						default:
							payArr.push({
								name: '好友代付',
								value: 'df',
								img: '/static/pay/zrdf.png',
								img2: 'yeb',
								color: '#2D8CF0',
								text: '一键代付，方便快捷'
							})
							break;
					}
				}
				if (this.payObj.orderType == 1 && this.payConfig.deliveryOpen == 1) {
					switch (+this.payObj.orderType) {
						case 2:
							break;
						default:
							payArr.push({
								name: '货到付款',
								value: 'hdfk',
								img: '/static/pay/hdfk.png',
								img2: 'yeb',
								color: '#FF972E',
								text: '货到付款，方便快捷'
							})
							break;
					}
				}
			
				this.payArr = payArr
				// let item = payArr.find(v => v.value != 'ye')
				this.radioChange({
					detail: {
						value: payArr[0].value
					}
				})
				if (payArr.find(v => v.value == 'ye')) {
					this.rechargeRule()
				}
			},
			async rechargeRule() {
				let {
					data
				} = await this.util.request({
					'url': this.api.czgz,
				})
				this.yeczrule = data.list || []
			},
			djs(time) {
				let now = this.dateToTime(),
					time2 = +time + this.orderset.closeTime * 60
				if (time2 > now) {
					this.stime = utils.countDownTime(time2 - now)
					this.dsq = setInterval(async () => {
						time2 -= 1
						if (time2 == now) {
							clearInterval(this.dsq)
							this.go({
								t: 4
							})
						}
						this.stime = utils.countDownTime(time2 - now)
					}, 1000)
				}
			},
			setzfcg() {
				uni.setStorageSync('payedCoupon', {
					orderId: this.payObj.orderId,
					paymoney: this.pmoney,
				})
			},
			async formSubmit(e) {
				let payObj = utils.deepCopy(this.payObj)
				// console.log(e.detail.value, payObj)
				if (e.detail.value.radiogroup == 'ye') {
					payObj.payType = 1
					if (+this.pmoney > +this.user.balance) {
						return this.util.message('您的' + this.balanceName + '不足支付', 3)
					}
				}
				// return
				// this.util.showLoading()
				// let orderRes = await this.util.request({
				// 	'url': this.api[payobj.api],
				// 	method: 'POST',
				// 	data: payobj.params,
				// })
				// console.log('formSubmit orderRes', orderRes)
				//下单订阅消息
				if (this.payObj.orderType == 1) {
					if (!this.jjmbxx) {
						try {
							await this.requestSM('payOrder')
						} catch (e) {
							this.jjmbxx = true
							this.loading = false
							return
						}
					}
				}
				if (this.payObj.orderType == 1 && e.detail.value.radiogroup == 'df') {
					payObj.payType = 1
					this.go({
						t: 1,
						url: `/yb_wm/other/fqdf?orderId=${this.payObj.orderId}`,
					})
					return
				}
				this.loading = true
				if (this.payObj.orderType == 1 && e.detail.value.radiogroup == 'hdfk') {
					payObj.payType = 2
				}
				let payres = await this.util.request({
					'url': this.api.pay,
					method: 'POST',
					mask: 1,
					data: payObj,
				})
				if (payres) {
					if (e.detail.value.radiogroup != 'ye' && e.detail.value.radiogroup != 'hdfk') {
						// #ifndef  H5
						uni.requestPayment({
							provider: this.provider,
							// #ifdef MP-WEIXIN
							timeStamp: payres.data.timeStamp,
							nonceStr: payres.data.nonceStr,
							package: payres.data.package,
							signType: payres.data.signType,
							paySign: payres.data.paySign,
							// #endif
							// #ifdef MP-ALIPAY
							orderInfo: payres.data.alipay_trade_create_response.trade_no,
							// #endif
							// #ifdef MP-BAIDU
							orderInfo: {
								"dealId": payres.data.dealId,
								"appKey": payres.data.appKey,
								"totalAmount": payres.data.totalAmount,
								"tpOrderId": payres.data.tpOrderId,
								"dealTitle": payObj.info.type,
								"signFieldsRange": "1",
								"rsaSign": payres.data.sign,
								"bizInfo": ''
							},
							// #endif
							// #ifdef MP-TOUTIAO
							orderInfo: {
								"order_id": payres.data.order_id,
								"order_token": payres.data.order_token,
								// "app_id": payres.data.app_id,
								// "method": 'tp.trade.confirm',
								// "sign": payres.data.sign,
								// "sign_type": payres.data.sign_type,
								// "timestamp": payres.data.timestamp + '',
								// "trade_no": payres.data.trade_no,
								// "merchant_id": payres.data.biz_content.merchant_id,
								// "uid": payres.data.biz_content.uid,
								// "total_amount": payres.data.biz_content.total_amount,
								// pay_channel: 'ALIPAY_NO_SIGN',
								// pay_type: 'ALIPAY_APP',
								// risk_info: payres.data.biz_content.risk_info,
								// "params": JSON.stringify({
								// 	url: payres.data.aliUrl
								// }),
							},
							service:5,
							// #endif
							// #ifdef MP-WEIXIN
							success: (res) => {
								// this.util.message('支付成功', 1)
								this.setzfcg()
								this.go({
									t: 2,
									url: 'zfyl?payObj=' + encodeURIComponent(JSON.stringify(
										payObj
									))
								})
								// if (payObj.info.go.t == 4) {
								// 	let lastPage = this.util.getPage()
								// 	lastPage.$vm.paySuccess && lastPage.$vm.paySuccess()
								// 	//console.log(lastPage)
								// }
								// setTimeout(() => {
								// 	this.go(payObj.info.go)
								// }, 1000)
								// console.log('success:' + JSON.stringify(res));
							},
							fail: (err) => {
								console.log('fail:' + JSON.stringify(err))
								if (err.errMsg == 'requestPayment:fail cancel') {
									this.util.message('取消支付', 2)
									if (payObj.info.cancel) {
										return this.loading = false;
									}
									setTimeout(() => {
										this.go(payObj.info.go)
									}, 1000)
								} else {
									uni.showModal({
										title: '提示',
										content: err.errMsg + err.err_desc,
										showCancel: false
									})
									this.loading = false;
								}
							},
							// #endif
							// #ifdef MP-ALIPAY
							success: (res) => {
								if (res.resultCode == 9000) {
									this.setzfcg()
									this.go({
										t: 2,
										url: 'zfyl?payObj=' + encodeURIComponent(JSON.stringify(
											payObj
										))
									})
								} else if (res.resultCode == 6001) { //取消支付
									this.util.message('取消支付', 2)
									if (payObj.info.cancel) {
										return this.loading = false;
									}
									setTimeout(() => {
										this.go(payObj.info.go)
									}, 1000)
								} else {
									uni.showModal({
										title: '提示',
										content: JSON.stringify(res),
									});
								}
								console.log('success:' + JSON.stringify(res));
							},
							// #endif
							// #ifdef MP-BAIDU
							success: (res) => {
								this.util.message('支付成功', 1)
								setTimeout(() => {
									this.util.message('请耐心等待，页面即将跳转', 3, 2000)
								}, 1000)
								if (payObj.info.go.t == 4) {
									let lastPage = this.util.getPage()
									setTimeout(() => {
										lastPage.$vm.paySuccess && lastPage.$vm.paySuccess()
									}, 3500)
								}
								setTimeout(() => {
									this.go(payObj.info.go)
								}, 3500)
								//console.log('success:' + JSON.stringify(res));
							},
							fail: (err) => {
								this.util.message('取消支付', 2)
								console.log('fail:' + JSON.stringify(err));
								if (payObj.info.cancel) {
									return this.loading = false;
								}
								setTimeout(() => {
									this.go(payObj.info.go)
								}, 1000)
							},
							// #endif
							// #ifdef MP-TOUTIAO
							success: (res) => {
								if(res.code=='0'){
									this.util.message('支付成功', 1)
								}else if(res.code=='1'){
									this.util.message('支付超时', 2)
								}else if(res.code=='2'){
									this.util.message('支付失败', 2)
								}else if(res.code=='3'){
									this.util.message('支付关闭', 2)
								}else if(res.code=='4'){
									this.util.message('支付取消', 2)
								}
								setTimeout(() => {
									this.util.message('请耐心等待，页面即将跳转', 3, 2000)
								}, 1000)
								if (payObj.info.go.t == 4) {
									let lastPage = this.util.getPage()
									setTimeout(() => {
										lastPage.$vm.paySuccess && lastPage.$vm.paySuccess()
									}, 3500)
								}
								setTimeout(() => {
									this.go(payObj.info.go)
								}, 3500)
								console.log('success:' + JSON.stringify(res));
							},
							fail: (err) => {
								this.util.message('取消支付', 2)
								console.log('fail:' + JSON.stringify(err));
								if (payObj.info.cancel) {
									return this.loading = false;
								}
								setTimeout(() => {
									this.go(payObj.info.go)
								}, 1000)
							},
							// #endif
							complete: (e) => {
								console.log("paymentcomplete", e)
							}
						});
						// #endif
						// #ifdef  H5
						chooseWXPay(payres.data).then((res) => {
							if (res == 1) {
								this.util.message('支付成功', 1)
								uni.setStorageSync('payedCoupon', {
									orderId: payObj.orderId,
									paymoney: this.pmoney,
								})
								if (payObj.info.go.t == 4) {
									let lastPage = this.util.getPage()
									lastPage.$vm.paySuccess && lastPage.$vm.paySuccess()
									//console.log(lastPage)
								}
								setTimeout(() => {
									this.go(payObj.info.go)
								}, 1000)
							} else if (res == 3) {
								this.util.message('取消支付', 2)
								if (payObj.info.cancel) {
									return this.loading = false;
								}
								setTimeout(() => {
									this.go(payObj.info.go)
								}, 1000)
							}
						})
						// #endif
					} else {
						this.setzfcg()
						this.go({
							t: 2,
							url: 'zfyl?payObj=' + encodeURIComponent(JSON.stringify(
								payObj
							))
						})
					}
				} else {
					// this.util.message('请检查支付配置', 3, 1500)
					this.loading = false;
				}
				console.log('formSubmit payres', payres)
				//this.util.message(e.detail.value.radiogroup + '支付')
				//this.show = false
			}
		},
		// created() {
		// 	console.log(this.api.platform)
		// },
	}
</script>

<style scoped lang="scss">
	.paytop {
		padding: 10rpx 30rpx 30rpx;
	}

	.paymoeny {
		display: flex;
		align-items: baseline;
	}

	.weui-cell {
		padding: 45rpx 35rpx 30rpx;
	}

	.weui-cell:last-child:after {
		display: block;
	}

	.weui-cell:after {
		left: 112rpx;
	}

	.hdimg {
		width: 49rpx;
		height: 49rpx;
		margin-right: 30rpx;
	}

	.right30::after {
		right: 30rpx;
	}

	.payimg {
		width: 145rpx;
		height: 125rpx;
	}

	.djsc {
		background: rgba($color: #fff, $alpha: 0.12);
		border-radius: 60rpx;
		padding: 10rpx 25rpx;
	}

	.mswz {
		padding: 10rpx 13rpx;
	}

	.hdc {
		// border: 1px solid #BCBCBC;
		border-radius: 15rpx 5rpx;
		padding: 0rpx 10rpx;
		background: #F44336;
	}

	.foot-btn {
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 78rpx;
	}
</style>
