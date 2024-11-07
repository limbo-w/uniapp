<template>
	<view class="" :class="">
		<view class="p253 bf5 posi-f w100 l0" :style="{top:ltop}" v-if="labelarr.length">
			<scroll-view class='ws-n ipolcs f-y-c' scroll-x='true' :scroll-into-view="siv">
				<block v-for="(v,i) in labelarr" :key="i">
					<bk-b :id='`l${i}`' @tab='lTab(i)' :c-name="`f-g-0 dis-in mr20 bs60 ${i!=laidx&&'c3'}`" :color="i==laidx?tColor:'#F1F2F3'"
					 :sname="{padding:'10rpx 30rpx',minWidth:'140rpx'}" :t='v'></bk-b>
				</block>
			</scroll-view>
		</view>
		<view :class="{'ipomt':hasLabel}">
			<my-order @operation='operation' v-for="(v,i) in datalist" :key='i' :co='v' :otype="otype"></my-order>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import myOrder from './my-dnorder.vue'
	import bkB from '@/components/common/block-b.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'orderIndex',
		components: {
			myOrder,
			bkB,
		},
		props: {
			datalist: Array,
			labelarr: Array,
			otype: [String, Number],
			ltop: String,
			value: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				siv: '',
			}
		},
		mixins: [utilMixins],
		computed: {
			laidx: {
				get() {
					return this.value
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
			hasLabel() {
				return this.labelarr.length > 0
			},
		},
		methods: {
			async operation(e) {
				this.orderInfo = e.co
				let obj = {}
				switch (e.t) {
					case 'qxdd':
						this.qxdd(e.tip)
						return;
					case 'sqtk':
						obj = {
							title: '您确认申请退款吗？',
							url: 'kcddcz',
							params: {
								orderId: e.co.id
							}
						}
						break;
					case 'cd':
						obj = {
							title: '您确认催单吗？',
							url: 'Reminder',
							params: {
								userId: this.user.userId,
								orderId: e.co.id
							}
						}
						break;
					case 'qrsh':
						obj = {
							title: '您确认已收到货吗？',
							url: 'Receiving',
							params: {
								orderId: e.co.id
							}
						}
						break;
					case 'scdd':
						obj = {
							title: '您确认删除订单吗？',
							url: 'OrderDel',
							params: {
								orderId: e.co.id
							}
						}
						break;
					case 'scpd':
						obj = {
							title: '您确认删除吗？',
							url: 'qxpd',
							params: {
								id: e.co.id,
								type: 'delete',
							}
						}
						break;
					case 'lxsj':
						return this.util.makeTel(e.co.storeTel)
					case 'pj':
						return this.util.message('功能持续完善中,敬请期待', 3);
					case 'tsljzf':
						this.go({
							t: 1,
							url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
								orderId: this.orderInfo.id,
								orderType: 7,
								info: {
									money: this.orderInfo.money,
									type: "堂内订单支付",
									cancel: 1,
									go: {
										t: 4,
									},
								}
							}))
						})
						return;
					case 'ljzf':
						this.go({
							t: 1,
							url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
								orderId: this.orderInfo.id,
								orderType: 6,
								info: {
									money: this.orderInfo.money,
									type: "下单支付",
									cancel: 1,
									go: {
										t: 4,
									},
								}
							}))
						})
						return;
				}
				console.log(e, obj)
				try {
					await this.util.modal(obj.title)
				} catch (e) {
					return
				}
				let data = await this.util.request({
					'url': this.api[obj.url],
					method: 'POST',
					mask: 1,
					data: obj.params,
				})
				if (data) {
					this.refresh();
					this.util.message('操作成功', 1)
				}
			},
			async qxdd(e) {
				console.log('qxdd')
				if (e) {
					try {
						await this.util.modal('您确认取消订单吗？')
					} catch (e) {
						return
					}
				}
				let data = await this.util.request({
					'url': this.api.kcddcz,
					method: 'POST',
					mask: '取消订单中',
					data: {
						orderId: this.orderInfo.id
					},
				})
				if (data) {
					this.refresh()
					this.util.message('操作成功', 1)
				}
			},
			refresh() {
				this.laidx = 0
				this.$emit('refresh', {
					refresh: 1
				})
			},
			lTab(e) {
				this.laidx = e
				this.siv = `l${e<1?e:e-1}`
				let state = ''
				if (this.otype == 1) {
					switch (e) {
						case 0:
							state = '';
							break;
						case 1:
							state = '1';
							break;
						case 2:
							state = '2';
							break;
						case 3:
							state = '3';
							break;
					}
					this.$emit('refresh', {
						state
					})
				} else if (this.otype == 4) {
					switch (e) {
						case 0:
							state = '';
							break;
						case 1:
							state = '1';
							break;
						case 2:
							state = '2';
							break;
						case 3:
							state = '3';
							break;
						case 4:
							state = '4';
							break;
						case 5:
							state = '5';
							break;
					}
					this.$emit('refresh', {
						state
					})
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	.payimg {
		width: 153rpx;
		height: 155rpx;
	}

	.pt60 {
		padding-top: 50rpx;
	}

	.btn {
		border-radius: 0px;
	}

	.btn::after {
		transform-origin: 50% 50%;
		border-radius: 0px;
	}

	.p25 {
		padding: 20rpx 50rpx;
	}

	.ipolcs {
		height: 65rpx;
	}

	.ipomt {
		margin-top: 95rpx;
	}
</style>
