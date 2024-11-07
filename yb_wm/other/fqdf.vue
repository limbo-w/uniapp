<template>
	<view class="h100">
		<view class="">
			<view class="cf p-r" :style="{background:tColor}">
				<view class="rwimg">
					<mg-img m="aspectFit" :src="payConfig.icon && payConfig.icon"></mg-img>
				</view>
				<view class="p-a dftxt f32">{{payConfig && payConfig.help}}</view>
			</view>
			<view class="zlbd p-r o-h">
				<view class="bf p3 f24 c9 bs10 f-c">
					<view>代付金额</view>
				</view>
				<view class="bf p3 f24 c9">
					<view class="paymoeny wei f50 cf0 f-c"><text class="">{{sl}}</text><text
							class="cf0">{{pmoney}}</text></view>
					<view v-if="info" class="f26 djsc f-c">剩余支付时间：<text class="ml10"
							v-if="stime">{{stime[2]}}:{{stime[3]}}</text></view>
				</view>
			</view>
			<view class="mt20 p20 bf">
				<view class="f24 c9 p253">代付说明:</view>
				<view class="p03 f22 c9">1、对方需要开通微信支付才能帮你付款，如未开通，请重新选择好友发送；</view>
				<view class="p03 f22 c9">2、如果你将来退款了，钱将退还到好友的微信账户里</view>
			</view>
			<view class="foot-btnc">
				<button form-type="submit" class="foot-btn b-s-2 f30 wei" :style="{background:tColor}"
					@click="fqdf">发送代付请求</button>
			</view>
		</view>
		<mg-share wxs='1' v-model="shareshow"></mg-share>
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
	import mgShare from '@/components/template/share.vue'
	export default {
		name: 'df',
		components: {
			mgShare,
		},
		data() {
			return {
				stime: '',
				info: null, //订单详情
				loading: false,
				shareshow: false,
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('求付款')
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
					}
				}

			}
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
			fqdf() {
				this.shareshow = true
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
