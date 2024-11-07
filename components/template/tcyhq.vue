<template>
	<mg-modal :ismr="true" v-model="show" :width="type==1?'632rpx':type==2?'632rpx':'562rpx'" :z-index="3000">
		<view v-if="type==1&&co.couponList" class="">
			<view class="tctop posi-r">
				<view class="tcimg">
					<mg-img :src="co.icon||`${onImgurl}img/yhqbg.png`"></mg-img>
				</view>
				<view class="posi-a tctopbd f-col">
					<view class="f-g-0 tctopbdt t-c">
						<view class="f34 wei cf f-c">
							<view class="hx"></view>
							<view class="zfls4">{{co.name||'活动名称'}}</view>
							<view class="hx"></view>
						</view>
						<!-- <view class="f20 cf mt10 zfls4">您的优惠券已放入卡包</view> -->
					</view>
					<scroll-view scroll-y class="f-1 tctopbdb o-h">
						<view v-for="(v,i) in co.couponList" :key='i' class='mb20'>
							<mg-coupon ptype="2" :color='color' cname='mb20' :co='v'></mg-coupon>
						</view>
					</scroll-view>
				</view>
				<view class="posi-a w100 tctopft f-c f22">
					<!-- <view class="zfls4">查看所有优惠券</view>
					<text class="iconfont iconright cf f22 ml5"></text> -->
					<button :disabled="loading" :style="{background:loading?'transparent':''}" class="lqbtn bs10 cf f28 f-c zfls4 wei bt"
					 @click="ljlq">立即领取</button>
				</view>
			</view>
			<view @click="show=false" class="tcbtm f-c"><text class="iconfont iconx2 cf" style="font-size: 66rpx;"></text></view>
		</view>
		<block v-else-if="type==2&&co.couponArr">
			<view class="tctop posi-r">
				<view class="tcimg2">
					<mg-img :src="co.bgImg||`${onImgurl}img/yhqbg.png`"></mg-img>
				</view>
				<view class="posi-a tctopbd2 f-col">
					<view class="f-g-0 tctopbdt t-c">
						<view class="f34 wei cf f-c">
							<view class="hx"></view>
							<view class="zfls4">{{co.name||'活动名称'}}</view>
							<view class="hx"></view>
						</view>
					</view>
					<scroll-view scroll-y class="f-1 tctopbd2b o-h">
						<view v-for="(v,i) in co.couponArr" :key='i' class='mb20'>
							<mg-coupon ptype="2" :color='color' cname='mb20' :co='v'></mg-coupon>
						</view>
					</scroll-view>
				</view>
				<view class="posi-a w100 tctopft f-c f22">
					<button :disabled="loading" :style="{background:loading?'transparent':''}" class="lqbtn bs10 cf f28 f-c zfls4 wei bt"
					 @click="ljlq">立即领取</button>
				</view>
			</view>
			<view @click="show=false" class="tcbtm2 f-c"><text class="iconfont iconx2 cf" style="font-size: 66rpx;"></text></view>
		</block>
		<block v-else-if="type==3">
			<view class="tctop posi-r">
				<view class="tcimg3">
					<mg-img :src="co.icon||`${onImgurl}img/xrzxbg.png`"></mg-img>
				</view>
				<view class="posi-a tctopbd3 f-col">
					<scroll-view scroll-y class="f-1 tctopbd3b o-h">
						<block v-if="co.couponArr.length">
							<view class="jlbt f-y-c">
								<view class="xhx"></view>
								<view class="f-g-0">优惠券奖励</view>
								<view class="xhx"></view>
							</view>
							<view class="jlic">
								<block v-for="(v,i) in co.couponArr" :key='i'>
									<mg-coupon ptype="2" :color='color' cname='mb20' :co='v'></mg-coupon>
								</block>
							</view>
						</block>
						<block v-if="co.balance>0">
							<view class="jlbt f-y-c">
								<view class="xhx"></view>
								<view class="f-g-0">{{system.custom.balance}}奖励</view>
								<view class="xhx"></view>
							</view>
							<view class="jlic p-r">
								<view class="bgimg">
									<image class="wh" :src="yhqbg"></image>
								</view>
								<view class="p-a coubd wh f-row">
									<view class="coubdl p20 f-c-c cf5">
										<view><text>{{sl}}</text><text class="f50 ml5 wei">{{co.balance}}</text></view>
									</view>
									<view class="p-10-30 f-1 f-y-c">
										<view class="f-g-1 f26">新人赠送{{system.custom.balance}}</view>
									</view>
								</view>
							</view>
						</block>
						<block v-if="co.integral>0">
							<view class="jlbt f-y-c">
								<view class="xhx"></view>
								<view class="f-g-0">{{system.custom.integral}}奖励</view>
								<view class="xhx"></view>
							</view>
							<view class="jlic p-r">
								<view class="bgimg">
									<image class="wh" :src="yhqbg"></image>
								</view>
								<view class="p-a coubd wh f-row">
									<view class="coubdl p20 f-c-c cf5">
										<view class="f-y-c"><text class="f50 wei">{{co.integral}}</text><text class="f22 ml5">{{system.custom.integral}}</text></view>
									</view>
									<view class="p-10-30 f-1 f-y-c">
										<view class="f-g-1 f26">新人赠送{{system.custom.integral}}</view>
									</view>
								</view>
							</view>
						</block>
						<block v-if="co.growth>0">
							<view class="jlbt f-y-c">
								<view class="xhx"></view>
								<view class="f-g-0">成长值奖励</view>
								<view class="xhx"></view>
							</view>
							<view class="jlic p-r">
								<view class="bgimg">
									<image class="wh" :src="yhqbg"></image>
								</view>
								<view class="p-a coubd wh f-row">
									<view class="coubdl p20 f-c-c cf5">
										<view class="f-y-c"><text class="f50 wei">{{co.growth}}</text><text class="f22 ml5">成长值</text></view>
									</view>
									<view class="p-10-30 f-1 f-y-c">
										<view class="f-g-1 f26">新人赠送成长值</view>
									</view>
								</view>
							</view>
						</block>
						<button :disabled="loading" :style='{background:tColor}' class="lqbtn bs10 cf f28 f-c zfls4 wei bt"
						 @click="dllq">登录领取</button>
					</scroll-view>
				</view>
			</view>
			<view @click="$emit('input', false)" class="tcbtm3 f-c"><text class="iconfont iconx2 cf f60"></text></view>
		</block>
	</mg-modal>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgModal from '@/components/common/modal.vue'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'searchBox',
		components: {
			mgModal,
			mgCoupon,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			value: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: ''
			},
			type: { //1弹窗优惠券2发券宝弹窗3新客专享弹窗
				type: String,
				default: '1'
			},
		},
		data() {
			return {
				list: [{
					name: '优惠券名称',
					type: 1,
					money: '8',
					fullMoney: '20',
					useExplain: '有效期至2020-11-85 12:56'
				}, {
					name: '优惠券名称',
					type: 2,
					discount: '8.9',
					fullMoney: '20',
					useExplain: '有效期至2020-11-85 12:56'
				}, {
					name: '优惠券名称',
					type: 1,
					money: '18',
					fullMoney: '',
					useExplain: '有效期至2020-11-85 12:56'
				}, ],
				yhqbg: '/static/yhq/xyhq.png',
				loading: false,
			}
		},
		computed: {
			show: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
		},
		methods: {
			ljck() {
				// this.$emit('close')
				setTimeout(() => {
					this.go({
						t: 1,
						url: '/yb_wm/my/coupon/my'
					})
				}, 100)
			},
			async ljlq() {
				if (!await this.checkLogin()) return
				this.loading = true
				let res = await this.util.request({
					'url': this.api[this.type == 1 ? 'lqtcyhq' : 'lqfqb'],
					method: 'POST',
					mask: 1,
					data: {
						id: this.co.id,
					},
				})
				if (res) {
					this.util.message('领取成功', 1)
					utils.stfn(() => {
						this.loading = this.show = false
					}, 500)
				} else {
					this.loading = false
				}
			},
			async dllq() {
				if (!await this.checkLogin()) 
				this.$emit('close')
				return
			},
		},
		async created() {}
	}
</script>

<style scoped lang="scss">
	.zfls4 {
		letter-spacing: 4rpx;
	}

	.tctop {}

	.tcimg {
		width: 100%;
		height: 845rpx;
	}

	.tctopbd {
		width: 572rpx;
		height: 540rpx;
		top: 168rpx;
		left: 50%;
		transform: translateX(-50%);
		// background: #fff;
	}

	.tctopft {
		height: 83rpx;
		bottom: 36rpx;
		color: #fff;

		.lqbtn {
			height: 100%;
			width: 360rpx;
		}
	}

	.tctopbdt {
		padding: 20rpx 30rpx;

		.hx {
			margin: 0 15rpx;
			width: 24rpx;
			height: 1.5px;
			background: #fff;
		}
	}

	.tctopbdb {
		padding: 0rpx 20rpx;
		// overflow-y: scroll;
	}

	.tcbtm {
		margin-top: 48rpx;
	}

	/*2*/
	.tcimg2 {
		width: 100%;
		height: 845rpx;
	}

	.tctopbd2 {
		width: 572rpx;
		height: 540rpx;
		top: 168rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.tctopbd2b {
		padding: 0rpx 20rpx;
	}

	.tcbtm2 {
		margin-top: 30rpx;
	}

	/**/
	.tcimg3 {
		height: 838rpx;
	}

	.tctopbd3 {
		width: 100%;
		height: 500rpx;
		top: 338rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.tctopbd3b {
		padding: 30rpx 40rpx 20rpx;
	}

	.tcbtm3 {
		margin-top: 30rpx;
	}

	.jlbt {
		color: #FCE82C;

		.xhx {
			width: 100%;
			margin: 0 20rpx;
			height: 0;
			border-top: 2px dashed #FCE82C;
		}
	}

	.jlic {
		margin: 10rpx 0 20rpx;

		.bgimg {
			height: 140rpx;
		}

		.coubd {
			top: 0;
			left: 0;
		}

		.coubdl {
			width: 205rpx;
		}
	}
</style>
