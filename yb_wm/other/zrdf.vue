<template>
	<view class="container pb130">
		<form @submit="formSubmit">
			<view class="">
				<view class="cf p-r" :style="{background:tColor}">
					<view class="rwimg">
						<mg-img m="aspectFit" :src="payConfig.icon && payConfig.icon"></mg-img>
					</view>
					<view class="p-a dftxt f32">{{payConfig && payConfig.help}}</view>
				</view>
				<view class="zlbd p-r o-h">
					<view class="bf p3 f24 c9 bs10 f-bt">
						<view>代付金额</view>
						<view v-if="info">收货人：{{info.receivedName}}</view>
					</view>
					<view class="bf p3 f24 c9 f-bt">
						<view class="paymoeny wei f50 cf0"><text class="">{{sl}}</text><text
								class="cf0">{{pmoney}}</text></view>
						<view v-if="info" class="f26 djsc">剩余支付时间：<text class="ml10"
								v-if="stime">{{stime[2]}}:{{stime[3]}}</text></view>
					</view>
				</view>
				<view v-if="info"  class="mb30 bs20 mt10 bf">
					<mg-cell isr='1' cname='p3' last="1" v-for="(v,i) in info.goodsArr" :key="i" w='104' h='104' brs='12rpx' :img='v.icon'
						:cname="i!=info.goodsArr.length-1?'la154 p3':'p3'">
						<template slot='bd'>
							<view v-if="v.isChange==1" class="p-a hgc f18 cf bf5f l-n">换购</view>
							<view class="f-bt">
								<view class="f-row">
									<view v-if="v.isActivity>0&&v.isActivity!=4" class="f-g-0 yhic f18 cf bf5f f-c hdspan">
										{{v.isActivity==1?'特':v.isActivity==2?'折':v.isActivity==5?'赠':'减'}}
									</view>
									<view class="l-h1">{{v.name}}</view>
								</view>
								<view class="f-g-0 f32">{{sl+itemTotal(v)}}</view>
							</view>
							<view v-if="v.isActivity==4" class="f-row cf5f">
								<view class="f20 bs5 b-d p-3-10" :style="{borderColor:'#FF5F2F'}">
									{{v.isActivity==4?'第二件打折':'买一送一'}}
								</view>
							</view>
							<view class="f-bt mt10 f24 c9">
								<view class="f-g-1 f-raw">
									<text class="ml10" v-if="v.data">{{v.data}}</text>
									<text v-if="v.attribute">({{v.attribute}})</text>
									<text class="ml10" v-if="v.material">+{{v.material}}</text>
								</view>
								<view class="ml10">x{{v.num}}</view>
							</view>
						</template>
					</mg-cell>
					<mg-cell isr='1' cname='p13' last="1" btt='包装费' :ft='`${sl+info.boxMoney}`' ftc='f32 c3'></mg-cell>
					<mg-cell v-if="info.deliveryMode!=10" isr='1' cname='p13'
						:btt="info.deliveryPreferential>0?info.deliveryPreferentialType==1?'满免配送费':'满免配送费':''" ftc='f32 c3'>
						<view slot='hd' class="mr20">配送费</view>
						<view slot='ft'>
							<text v-if='info.deliveryPreferential>0'
								class="mr30 t-d-l f32 c9">{{sl+info.deliveryPreferential}}</text>
							<text class="f32">{{sl}}{{info.deliveryMoney}}</text>
						</view>
					</mg-cell>
					<mg-cell isr='1' last='1' cname='p13'>
						<view slot='bd' class="c9 f24 f-row"></view>
						<view slot='ft' class="ml10 c3"><text class="f24">共{{info.num}}件商品</text><text
								class="m02">小计</text><text class="f34">{{sl+info.money}}</text></view>
					</mg-cell>
				</view>
				<view class="mt20 p20 bf">
					<view class="f24 c9 p253">付款说明:</view>
					<view class="p03 f22 c9">1、付款前务必和好友再次确认，避免是诈骗行为</view>
					<view class="p03 f22 c9">2、如果发生退款，钱将退还到你的微信账户里</view>
				</view>
				<view class="foot-btnc">
					<button form-type="submit" :disabled="loading" :loading="loading" class="foot-btn b-s-2 f30 wei"
						:style="{background:tColor}">立即支付</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex'
	import utils from '@/common/utils.js'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'df',
		components: {

		},
		data() {
			return {
				stime: '',
				info: null, //订单详情
				loading: false,
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('求付款')
			this.getLoginInfo().then(async () => {
				await this.getConfig({
					key: 'payConfig',
					api: 'config',
					params: {
						ident: 'payConfig'
					}
				})
				await this.getConfig({
					key: 'orderset',
					api: 'ddsz',
				})
				if (options.orderId) {
					let {
						data
					} = await this.util.request({
						'url': this.api.orderRep,
						data: {
							orderId: options.orderId,
						}
					})
					if (data) {
						if (data.state == 1) {
							this.info = data
							this.djs(data.createdAt)
						} else {
							uni.showModal({
								title: '提示',
								content: '订单已付款或异常',
								showCancel: false
							})
							setTimeout(() => {
								this.go({
									t: 6,
									url: "/yb_wm/index/order-index"
								})
							}, 1000)
						}
					}
				
				}
			})
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				payConfig: state => state.config.payConfig,
				orderset: state => state.config.orderset,
			}),
			pmoney() {
				return Number(this.info && this.info.money || 0).toFixed(2)
			},
		},
		methods: {
			...mapActions(['getConfig']),
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
					orderId: this.info.orderId,
					paymoney: this.pmoney,
				})
			},
			async formSubmit(e) {
				console.log(e)
				this.loading = true
				let payres = await this.util.request({
					'url': this.api.pay,
					method: 'POST',
					mask: 1,
					data: {
						orderId: this.info.id,
						orderType: 1,
					}
				})
				if (payres) {
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
						// #ifdef MP-WEIXIN
						success: (res) => {
							this.setzfcg()
							this.go({
								url: '/yb_wm/other/zfyl?payObj=' +
									encodeURIComponent(JSON.stringify({
										orderId: this.info.id,
										orderType: 1,
										info: {
											go: {
												t: 6,
												url: "/yb_wm/index/order-index"
											},
										}
									}))
							})
						},
						fail: (err) => {
							console.log('fail:' + JSON.stringify(err))
							if (err.errMsg == 'requestPayment:fail cancel') {
								this.util.message('取消支付', 2)
								// if (payObj.info.cancel) {
								// 	return this.loading = false;
								// }
								setTimeout(() => {
									this.go({
										t: 6,
										url: "/yb_wm/index/order-index"
									})
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
						complete: (e) => {
							console.log("paymentcomplete", e)
						}
					});
					// #endif
				} else {
					// this.util.message('请检查支付配置', 3, 1500)
					this.loading = false;
				}
				console.log('formSubmit payres', payres)
			},
			itemTotal(v) {
				let itemTotal = +(v.vipMoney > 0 && +v.vipMoney < +v.money && v.vipMoney || v.money)
				return +(itemTotal * v.num).toFixed(2)
			},
		},
		onShareAppMessage() {
			this.go({
				url: '/yb_wm/index/index'
			})
			let p = `yb_wm/other/zrdf?orderId=${this.info.id}`
			return this.util.mpShare({
				t: this.payConfig.help,
				i: this.payConfig.icon && this.getSingleImg(this.payConfig.icon),
				p,
			})
		},
	}
</script>
<style scoped lang="scss">
	.rwimg {
		width: 100%;
		height: 300rpx;
		bottom: 10rpx;
	}

	.dftxt {
		top: 80rpx;
		left: 75rpx;
		right: 75rpx;
	}

	.zlbd {
		border-radius: 10rpx 10rpx 0 0;
		margin-top: -30rpx;

		.paymoeny {
			display: flex;
			align-items: baseline;
		}

		.cf0 {
			color: #F41C0D;
		}
	}

	.djsc {
		line-height: 70rpx;
	}
</style>
