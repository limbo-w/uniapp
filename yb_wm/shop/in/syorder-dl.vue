<template>
	<view>
		<view v-if="info.id" class="pb130">
			<view class="sltop cf" :style="{background:tColor}">
				<view class="p3 f36">{{orderState.str1}}</view>
			</view>
			<view class="p03 slbd">
				<view class="bf mb30 bs20">
					<view class="slbdt1 f30 wei">感谢您对我们的信任，期待下次光临</view>
					<mg-cell @tab='util.makeTel(info.storeTel)' bgc='#FAFBFC' last='1' cname="b-t-e">
						<view slot='bd' class="">
							<view class="f30 f-c">
								<text class="iconfont f42 icondh c0 mr20"></text>
								<text class='t-o-e'>联系商家</text>
							</view>
						</view>
					</mg-cell>
				</view>
				<view class="mb30 bs20">
					<mg-cell isr='1' @tab="">
						<view slot='bd' class="">
							<view class="f30 f-y-c">
								<text class='t-o-e wei'>{{info.storeName}}</text>
								<!-- <text class="iconfont iconright c3 f26 ml10"></text> -->
							</view>
						</view>
					</mg-cell>
					<mg-cell isr='1' btt='订单总额' :ft='`${osl+(info.originalMoney||info.money)}`' ftc='f32 c3'>
					</mg-cell>
					<mg-cell v-if="info.vipDiscountMoney>0" isr='1' btt='会员折扣' :ft='`${info.vipDiscount*10}折`' ftc='f32' :color='tColor'>
						<view slot='hd' class="itemcon pomj mr20">会员</view>
					</mg-cell>
					<mg-cell v-if="info.couponPreferential>0" isr='1' btt='优惠券抵扣' :ft='`-${osl+info.couponPreferential}`' ftc='f32'
					 :color='tColor'>
						<view slot='hd' class="itemcon pomj mr20">优惠券</view>
					</mg-cell>
					<mg-cell isr='1' last='1'>
						<view slot='ft' class="ml10 c3">
							<text v-if='zyh>0' class="">已优惠<text :style="{color:tColor}">{{osl+zyh}}</text></text>
							<text class="m02">小计</text>
							<text class="f34 wei">{{osl+info.money}}</text>
						</view>
					</mg-cell>
				</view>
				<view class="mb30 bf bs20">
					<mg-cell isr='1' btt='订单信息' bttc='f30 wei'></mg-cell>
					<view class="p20">
						<mg-cell last='1' cname='p13' btt='订单号码' bttc='c9'>
							<view slot='ft' class="f-y-c">
								<text class="c3">{{info.outTradeNo}}</text>
								<bk-b @tab='util.fz(info.outTradeNo)' type="2" c-name='f24 ml20' t='复制'></bk-b>
							</view>
						</mg-cell>
						<mg-cell last='1' cname='p13' btt='下单时间' bttc='c9' :ft="timeToDate(info.createdAt)" ftc='c3'></mg-cell>
						<mg-cell v-if='info.payMode' last='1' cname='p13' btt='支付方式' bttc='c9' :ft="payName(info.payMode)" ftc='c3'></mg-cell>
						<mg-cell v-if='info.userNote' last='1' noc='1' cname='p13' btt='订单备注' bdmw='130rpx' bttc='c9' :ft="info.userNote"
						 ftc='c3 f-s-1'></mg-cell>
					</view>
				</view>
			</view>
		</view>
	</view>
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
	import bkB from '@/components/common/block-b.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	export default {
		name: 'order-dl',
		components: {
			bkB,
			MgCell,
		},
		data() {
			return {
				info: {},
				stime: '',
				latitude: '',
				longitude: '',
				covers: [],
				line: [],
				sjxx: {},
				loading: false,
			}
		},
		async onLoad(options) {
			this.getSystem({
				setNB: 1
			})
			this.util.setNT('订单详情')
			this.orderId = options.id
			this.getInfo()
		},
		mixins: [utilMixins],
		computed: {
			orderState() {
				let str1 = '',
					str2 = '',
					str3 = ''
				switch (+this.info.state) {
					case 2:
						str1 = '订单已完成'
						str2 = ''
						break;
				}
				return {
					str1,
					str2,
					str3,
				}
			},
			osl() {
				return this.info.symbol || this.sl
			},
			zyh() {
				return +this.info.vipDiscountMoney + (+this.info.couponPreferential)
			},
		},
		methods: {
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.dmxq,
					mask: '加载中',
					data: {
						orderId: this.orderId,
						id: this.orderId
					},
				})
				if (data) {
					this.info = data
					// this.getStoreInfo(data.storeId)
				}
			},
			async getStoreInfo(id) {
				let {
					data
				} = await this.util.request({
					'url': this.api.StoreInfo,
					data: {
						storeId: id,
						item: 2,
						userId: this.uId,
					},
				})
				this.sjxx = data
			},
		},
	}
</script>

<style scoped lang="scss">
	.sltop {
		height: 206rpx;
	}

	.slbd {
		margin-top: -80rpx;
	}

	.slbdt1 {
		padding: 50rpx 30rpx;
	}
</style>
