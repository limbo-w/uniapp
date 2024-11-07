<template>
	<mg-form>
		<view class="f-col h100">
			<mg-cell :sname="{padding:'50rpx'}" bgc="transparent" last='1' btt="付款给商家" bttc='f32 wei' :bbt="`名称:${shopinfo.name||''}`">
				<view slot='ft' class="sjimg bsf">
					<mg-img :src="shopinfo.icon||''" />
				</view>
			</mg-cell>
			<view class="f-g-1 bf mdbd p30">
				<view class="mdbdt">
					<view class="c9 f-x-bt">
						<text>金额</text>
						<text>请询问服务员后输入</text>
					</view>
					<view class="p20 b-b-e f-row" style="align-items: flex-start;">
						<text class="mr20 f56 wei" style="margin-top: -6rpx;">{{sl}}</text>
						<input v-model="money" @input='minput' :style="{caretColor:tColor}" focus='true' type="digit" maxlength='6' class="f-g-1 mdinput wei"
						 placeholder="输入金额" placeholder-class='mdps itpc' placeholder-style="line-height: normal;" />
					</view>
				</view>
				<view class="mdbdb mt30" v-if="discountData.discount && discountData.newMoney>0 && discountData.discountMoney>0">
					<mg-cell isl='1' last='1' cname='p30' :ft='`-${sl+discountData.discountMoney}`' ftc='f32'>
						<view slot='bd'>
							<text class="f30 wei">会员折扣</text>
							<text class="ml10 cfc">（{{discountData.discount}}折）</text>
						</view>
<!-- 						<view slot='hd' class="f-row mr10">
							<view class="f-row">
								<view class="vipr f-y-c">VIP</view>
								<view class="vipl f-y-c">
									<view>{{sl+discountData.discount}}</view>
								</view>
							</view>
						</view> -->
					</mg-cell>
				</view>
				<view v-if="mdconfig" class="mdbdb mt30">
					<!-- <mg-cell isl='1' last='1' cname='p30' btt='满减优惠' :ft='`-0.00`' ftc='f32' :color='tColor'>
						<view slot='hd' class="f-row hdwith">
							<view class="itemcon pomj">满减</view>
						</view>
					</mg-cell> -->
					<mg-cell v-if="yhq" @tab="go({t:1,url:'/yb_o2o/my/coupon/use-coupon?storeId='+params.storeId})" isl='1' last='1'
					 btt='优惠券抵扣' bttc="f30 wei" cname='p30' :color="kyhb.n>0?tColor:''" arrow='1'>
						<!-- <view slot='hd' class="f-row hdwith">
							<view class="itemcon pomj">优惠券</view>
						</view> -->
						<view slot='ft'>
							<text v-if='couponInfo' class="f32">-{{sl+couponInfo.money}}</text>
							<view v-else-if='kyhb.n>0' class="hongbao bs5 f20 f-y-c"><text class="iconfont iconhb cf mr10 f26"></text>{{kyhb.n}}个可用</view>
							<view v-else-if='kyhb.n==0' class="f24 f-y-c">暂无可用</view>
						</view>
					</mg-cell>
					<mg-cell v-if="vip" isl='1' last='1' cname='p30' :ft='`-${sl+zkmoney}`' ftc='f32'>
						<!-- <view slot='hd' class="f-row hdwith">
							<view class="itemcon pomj">VIP</view>
						</view> -->
						<view slot='bd'>
							<text class="f30 wei">会员折扣</text>
							<text v-if="user.discount" class="ml10 cfc">（{{user.discount}}折）</text>
						</view>
						<!-- <view slot='hd' class="hdwith f-row">
							<view class="vipl f-y-c">
								<view>0.9折</view>
							</view>
							<view class="vipr f-y-c">VIP</view>
						</view> -->
					</mg-cell>
				</view>
				<view class="mdbdb mt30">
					<mg-cell isl='1' last='1' btt='实际应付' bttc="f30 wei" cname='p30'>
						<view slot='ft' class="c3">
							<text class="mr20">合计</text>
							<text class="f26">{{sl}}</text>
							<text class="f40">{{money?total:0}}</text>
						</view>
					</mg-cell>
					<view class="p20 f-y-c">
						<view class="mr30">备注</view>
						<input v-model="params.userNote" class="weui-input f-1" maxlength="20" placeholder="添加备注(20字以内)"
						 placeholder-class='itpc' />
					</view>
				</view>
				<view class="foot-btnc" v-if="shopinfo.id">
					<button :disabled="loading" :loading="loading" @click="qdzf" class="foot-btn" :style="{background:tColor}">已和店员确认，立即买单</button>
				</view>
			</view>
		</view>
	</mg-form>

</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import utils from '@/common/utils.js'
	import MgCell from '@/components/common/mg-cell.vue'
	import sqBtn from '@/components/common/sq-btn.vue'
	export default {
		name: 'bzf',
		components: {
			MgCell,
			sqBtn,
		},
		data() {
			return {
				money: '',
				params: {
					money: '',
					storeId: '',
					userNote: '',
					useCouponId: '',
				},
				shopinfo: {},
				mdconfig: null,
				discountData:null,
				loading: false,
				kyhb: {
					n: 0,
					data: []
				},
				couponInfo: null,
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('买单')
			// this.getConfig()
			this.params.storeId = utils.getOptions(options, {
				key: 'storeId',
				q1: this.storeInfo.id,
			})
			this.getLoginInfo().then(() => {
				// this.refreshUser({
				// 	get: 1,
				// 	now: 1,
				// })
				//获取可用红包
				// this.getyhqArr()
			})
			let {
				data
			} = await this.util.request({
				'url': this.api.zjdp,
				data: {
					storeId: this.params.storeId,
				}
			})
			this.shopinfo = data
			this.getDiscount()
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				storeInfo: state => state.config.storeInfo,
			}),
			yhq() {
				return this.mdconfig && this.mdconfig.discount.indexOf('1') > -1
			},
			vip() {
				return this.isVip && this.mdconfig && this.mdconfig.discount.indexOf('3') > -1
			},
			zkmoney() {
				let m = 0,
					yhqMoney = +(this.couponInfo && this.couponInfo.money || 0)
				if (this.vip && this.user.discount) {
					m = (10 - this.user.discount) / 10 * (this.money - yhqMoney)
				}
				return this.blxs(m)
			},
			newMoney(){
				return this.discountData && this.discountData.newMoney 
			},
			total() {
				let m = 0,
					yhqMoney = +(this.couponInfo && this.couponInfo.money || 0),
					zkmoney = this.zkmoney
				m = this.blxs(this.money - yhqMoney - zkmoney)
				if(this.newMoney){
					m = this.newMoney
				}
				m <= 0 && (m = 0.01)
				// console.log(this.money,yhqMoney,zkmoney,this.money - yhqMoney - zkmoney)
				return m
			},
		},
		methods: {
			minput(e) {
				this.couponInfo = null
				this.getDiscount()
				// this.changeUsecoupon()
			},
			changeUsecoupon() {
				let n = 0,
					data = utils.deepCopy(this.yhqArr)
				for (let i in data) {
					if (data[i].isUse == 1) {
						if (this.money >= +data[i].full || data[i].isLimit == 1) {
							// console.log(data[i], this.money, data[i].full, this.money >= data[i].full)
							data[i].isUse = 1
							n += 1
						} else {
							data[i].isUse = 2
						}
					}
				}
				this.kyhb = {
					n,
					data
				}
				uni.setStorageSync('kyhb', this.kyhb)
				// console.log(this.money, data)
			},
			async getConfig() {
				let {
					data
				} = await this.util.request({
					'url': this.api.config,
					data: {
						ident: 'cashierset'
					}
				})
				this.mdconfig = data
			},
			async getDiscount() {
				let {
					data
				} = await this.util.request({
					'url': this.api.getDiscount,
					data: {
						money: this.money
					}
				})
				this.discountData = data
			},
			async getyhqArr() {
				this.util.showLoading()
				uni.setStorageSync('kyhb', {
					n: 0,
					data: []
				})
				let {
					data
				} = await this.util.request({
					'url': this.api.AvailableCoupon,
					method: 'POST',
					data: {
						type: 3,
						userId: this.params.userId,
						storeId: this.params.storeId,
					}
				})
				if (data) {
					this.yhqArr = data
					this.changeUsecoupon()
				}
				uni.hideLoading()
			},
			changeCoupon(e) {
				this.couponInfo = e || null
				this.params.useCouponId = e ? e.id : ''
				console.log(e)
			},
			async qdzf() {
				if (!this.money) {
					return this.util.message('请输入金额', 3)
				}
				if (!await this.checkLogin()) return
				this.loading = true
				// await this.requestSM('cashierOrder')
				this.params.money = this.money
				// console.log(this.params)
				// return
				let res = await this.util.request({
					'url': this.api['syxd'],
					method: 'POST',
					mask: '下单中',
					data: this.params,
				})
				if (res) {
					this.go({
						t: 2,
						url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
							orderId: res.data,
							orderType: 5,
							info: {
								money: this.total,
								type: "买单支付",
								cancel: 1,
								go: {
									t: 6,
									url: "/yb_wm/index/order-index"
								},
							}
						}))
					})
				} else {
					this.loading = false
				}
			},
		},
	}
</script>
<style>
	page {
		background-color: #F8F8F8;
	}

	.itpc {
		color: #E6E6E6;
	}

	.mdps {
		font-size: 45rpx;
		font-weight: normal;
		line-height: normal;
	}
</style>
<style scoped lang="scss">
	.cfc {
		color: #FF5D0C;
	}

	.sjimg {
		width: 90rpx;
		height: 90rpx;
	}

	.mdbd {
		border-radius: 40rpx 40rpx 0 0;
	}

	.mdbdt {
		margin: 0 50rpx;
	}

	.mdinput {
		font-size: 70rpx;
		height: 2.9rem;
		line-height: 2.9rem;
		caret-color: #17E883
	}

	.mdbdb {
		padding: 0 50rpx;
	}

	.hdwith {
		width: 100rpx;
	}
</style>
