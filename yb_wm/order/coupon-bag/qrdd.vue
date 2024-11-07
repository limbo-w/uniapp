<template>
	<view v-if="co.id" class="pb130 p3">
		<view class="mb30 bs30 bf f24">
			<mg-cell last='1' :img='co.storeIcon' w='45' h='45' brs='50%' :btt='co.storeName' bttc=''></mg-cell>
			<mg-cell last='1' w='160' h='160' :img='co.icon' brs='5rpx' cname='f-sh p03' hdc='f-s'>
				<view slot='bd' class="f-row">
					<view class="f-1">
						<view>{{co.name}}</view>
					</view>
					<view class="ml20 t-r">
						<view class="">{{sl}}<text class="f28">{{co.money}}</text></view>
						<view class="c9">x{{params.num}}</view>
					</view>
				</view>
			</mg-cell>
			<mg-cell last="1" isl='1' btt='购买数量'>
				<view slot='ft' class="">
					<number-box :min="1" :value='params.num' :max="maxNum" @change="bindChange"></number-box>
				</view>
			</mg-cell>
			<view class="cf1 t-r p23"><text class="c3"><text class="c9 mr20">共{{params.num}}件</text<>小计：</text>{{sl}}<text class="f28">{{hjje}}</text></view>
		</view>
		<view class="c9 p02 f24">您本次购买的商品不需要收货地址，请仔细确认每个商品所需的购买信息，如手机号码，身份证号码等。
		</view>
		<view class="dbbtnc bf f-row f-x-e" :style="{bottom: isIpx?'40rpx':0}">
			<view class="f-y-c">
				<view class="cf1 mr30"><text class="c9 mr20 f24">共{{params.num}}件</text><text class="c3">合计：</text>{{sl}}<text
					 class="f36 wei">{{hjje}}</text></view>
			</view>
			<button :loading="loading" :disabled="loading" @click="tjdd" :style="{background:tColor}" class="dbr cf f-c ma0">提交订单</button>
		</view>
		<view v-if="isIpx" class='bgf'></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import numberBox from "@/components/form/number-box.vue"
	export default {
		name: 'order-index',
		components: {
			numberBox,
		},
		data() {
			return {
				co: {},
				params: {
					rollBagId: '',
					num: 1,
				},
				loading: false,
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('确认订单')
			this.params.rollBagId = uni.getStorageSync('bdhc').id
			this.co = uni.getStorageSync('bdhc')
		},
		computed: {
			maxNum() {
				if (this.co.id) {
					let co = this.co,
						sysl = co.stock - co.salesNum <= 0 ? 1 : co.stock - co.salesNum,
						num = co.isLimit != 1 ? +co.dayNum : sysl
					return num > sysl ? sysl : num
				}
			},
			hjje() {
				return +(this.co.money * this.params.num).toFixed(2)
			},
		},
		methods: {
			bindChange(value) {
				this.params.num = value
			},
			async tjdd() {
				this.loading = true
				let res = await this.util.request({
					'url': this.api.qbxd,
					method: 'POST',
					mask: '下单中',
					data: this.params,
				})
				if (res) {
					this.go({
						t: 2,
						url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
							orderId: res.data,
							orderType: 4,
							info: {
								money: this.hjje,
								type: "购买券包",
								cancel: 1,
								go: {
									t: 6,
									url: "/yb_wm/index/goods"
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
<style scoped lang="scss">
	.dbbtnc {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 998;
		padding: 30rpx;
	}

	.dbr {
		min-width: 210rpx;
		height: 80rpx;
		font-size: 30rpx;
		border-radius: 80rpx;
		// background: linear-gradient(to right, #ff7a01, #ff560a);
	}
</style>
