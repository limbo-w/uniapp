<template>
	<view @click="go({t:1,url:'/yb_wm/order/order-dl?id='+co.id})" class="bf bs20 mb20 p-r">
		<block v-if='co.deliveryMode==10||co.appointment==1'>
			<view class="posi-a molta cf" :class="{yd:co.appointment==1}"></view>
			<view class="posi-a moltat cf f22 t-c">{{co.appointment==1?'预':'自'}}</view>
		</block>
		<mg-cell cname="p23" noc='1' last='1' :img='co.storeIcon' w='84' h='84' brs='8rpx'>
			<template slot='bd'>
				<view class="f-bt">
					<view class="f-g-1 f30 f-y-c">
						<text class='t-o-e f32'>{{co.storeName}}
							<block v-if="orderset.oIdOpen==1">
								(<text :style="{color:tColor}">#{{co.deliveryMode==10?co.mId:co.oId}}</text>)
							</block>
						</text>
						<!-- <text class="iconfont iconright c0 f24"></text> -->
					</view>
					<view class="f-g-0" :style="{color:stateColor()}">{{`${getState()}${stime}`}}</view>
				</view>
				<view class="mt5 f-x-bt f22 c9">
					<text>下单时间：{{timeToDate(co.createdAt)}}</text>
					<text v-if="co.takeNo">{{system.custom.orderNumber}}：#{{co.takeNo}}</text>
					<text v-if="co.state==7">订单超时未支付</text>
				</view>
				<view class="f-row mt20 p-r">
					<scroll-view class='f-1 ws-n f26' scroll-x='true'>
						<view v-for="(v,i) in co.goodsArr" :key="i" class="dis-in mobdli mr20">
							<view class="img bs10">
								<mg-img :src='v.icon'></mg-img>
							</view>
							<view class="mt10 f26 t-o-e">{{v.name}}</view>
						</view>
						<view class="dis-in mobdli mr20"></view>
					</scroll-view>
					<view class="p-a r0 t0 mobdrc f-c-xc t-r" :class="{'zbyy':co.goodsArr.length>2}">
						<view class="f34 wbba l-n"><text class="f24">{{co.symbol||sl}}</text>{{Number(co.money)}}</view>
						<view class="f26 c9 mt5">共{{co.num}}件</view>
						<!-- <view class="p-a l0 h100 zbyy"></view> -->
					</view>
				</view>
			</template>
		</mg-cell>
		<!-- <view class="t-r p03 mb10" v-if="co.takeNo">{{system.custom.orderNumber}}：#{{co.takeNo}}</view> -->
		<view class="t-r p03" v-if="co.deliveryMode==10&&co.state==4">取货码：<text :style="{color:tColor}" class="wei">{{co.selfCode}}</text></view>
		<view class="p23 f-y-c">
			<view class="f-1"></view>
			<view class="f-x-e">
				<view v-if="co.state==1" @click.stop="$emit('operation',{t:'qxdd',co,tip:1})" class="obtn">取消订单</view>
				<view v-if="co.state==1" @click.stop="$emit('operation',{t:'ljzf',co})" class="obtn cf" :style="{color: tColor,borderColor:tColor}">立即支付</view>
				<view v-if="co.isTk==1" @click.stop="$emit('operation',{t:'sqtk',co})" class="obtn">{{co.state==2?'取消订单':'取消订单'}}</view>
				<view v-if="(co.state==2||co.state==3||co.state==4)&&co.deliveryMode!=10" @click.stop="$emit('operation',{t:'cd',co})"
				 class="obtn cf" :style="{color: tColor,borderColor:tColor}">催单</view>
				<view v-if="co.state==3||co.state==7" @click.stop="$emit('operation',{t:'lxsj',co})" class="obtn">联系商家</view>
				<view v-if="co.state==4" @click.stop="$emit('operation',{t:'qrsh',co})" class="obtn cf" :style="{color: tColor,borderColor:tColor}">确认收货</view>
				<view v-if="co.state==5&&orderset.orderEvaluate=='1'" @click.stop="$emit('operation',{t:'pj',co})" class="obtn cf"
				 :style="{color: tColor,borderColor:tColor}">评价</view>
				<!-- <view v-if="co.state>=5" @click.stop="$emit('operation',{t:'zlyd',co})" class="obtn">再来一单</view> -->
				<view v-if="co.state==9" class="obtn cf" :style="{color: tColor,borderColor:tColor}">退款中</view>
				<view v-if="co.state==10" class="obtn">已退款</view>
				<view v-if="co.state==11" class="obtn c9">已拒绝</view>
				<!-- <view v-if="co.state>=5&&co.state!=9" @click.stop="$emit('operation',{t:'scdd',co})" class="obtn">删除订单</view> -->
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
	export default {
		name: 'tabbar',
		components: {
			bkB
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		data() {
			return {
				//1未付款,2已付款,3已接单,4配送中/待取货,5已收货,6已评价,7已取消,8.拒单，9申请退款,10已退款，11退款拒绝
				stateArr: ['', '等待支付', '已付款', '已接单', '配送中', '已完成', '已评价', '已取消', '门店已拒单', '申请退款中', '退款已通过', '退款已拒绝'],
				ztstateArr: ['', '等待支付', '已付款', '已接单', '待取货', '已完成', '已评价', '已取消', '门店已拒单', '申请退款中', '退款已通过', '退款已拒绝'],
				stime: '',
			}
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				orderset: state => state.config.orderset,
			}),
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			getState() {
				if (this.co.deliveryMode != 10) {
					return this.stateArr[+this.co.state]
				} else {
					return this.ztstateArr[+this.co.state]
				}
			},
			stateColor() {
				let color = ''
				switch (+this.co.state) {
					case 1:
						color = this.tColor;
						break;
						// case 7:
						// 	color = '';
						// 	break;
						// case 8:
						// case 11:
						// 	color = '#f00';
						// 	break;
					default:
						color = '#999';
				}
				return color
			},
			djs(time) {
				//，剩余 13:55
				if (this.co.state != 1 || this.orderset.autoClose != 1) return
				let now = this.dateToTime(),
					time2 = +time + this.orderset.closeTime * 60
				if (time2 > now) {
					let a = utils.countDownTime(time2 - now)
					this.stime = `，剩余 ${a[2]}:${a[3]}`
					this.dsq = setInterval(async () => {
						time2 -= 1
						if (time2 == now) {
							clearInterval(this.dsq)
							this.$emit('operation', {
								t: 'qxdd',
								co: this.co
							})
							//这里不单独放方法里执行会导致定时器await的bug，执行2此这里
						}
						let arr = utils.countDownTime(time2 - now)
						this.stime = `，剩余 ${arr[2]}:${arr[3]}`
						//console.log('倒计时', time2 - now)
					}, 1000)
				}
				//console.log(time, time2, now)
			},
		},
		async created() {
			this.djs(this.co.createdAt)
		},
		destroyed() {
			clearInterval(this.dsq)
		},
	}
</script>

<style scoped lang="scss">
	.mobdli {
		width: 158rpx;

		.img {
			width: 100%;
			height: 120rpx;
		}
	}

	.mobdrc {
		height: 100%;
		min-width: 118rpx;
		padding-bottom: 40rpx;
		padding-left: 10rpx;
		background: linear-gradient(to right, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 1));
	}

	.molta {
		top: -50rpx;
		left: -50rpx;
		width: 100rpx;
		height: 100rpx;
		background: linear-gradient(#96E666, #08C37D);
		transform: rotate(-45deg);
		// transform-origin: 50% 0%;
	}

	.moltat {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		top: 0;
	}

	.yd {
		background: linear-gradient(#F57E55, #F05D2C);
	}

	.zbyy {
		box-shadow: -18rpx 0 18rpx -16rpx rgba(13, 13, 13, 0.1);
	}
</style>
