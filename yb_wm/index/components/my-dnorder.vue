<template>
	<view @click="goDL" class="bf bs30 mb30 pb10 f24">
		<block v-if="otype==1">
			<mg-cell cname="p253" noc='1' isr='1'>
				<view slot='bd' class="f-y-c">
					<view class="mrltc bsf f-c b-l-ts mr15">
						<text class="iconfont icondndc cf"></text>
					</view>
					<view class="f-1">
						<view class="f-y-c" @click.stop='gosjDL'>
							<text class='t-o-e f28'>{{co.storeName}}
							</text>
							<text class="iconfont iconright c0 f24"></text>
						</view>
					</view>
					<view class="f-g-0" :style="{color:stateColor()}">{{`${getState()}${stime}`}}</view>
				</view>
			</mg-cell>
			<mg-cell last='1' cname="p23" noc='1' :img='co.goodsArr[0].icon' w="110" h="110" brs='10rpx'>
				<view class="" slot='bd'>
					<view>时间：{{timeToDate(co.createdAt)}}</view>
					<view class="mt10">{{`${co.goodsArr[0].name} 等 ${co.goodsNum}件商品`}}</view>
					<view class="f-y-c mt10 c9">
						<view class="">堂食</view>
						<view class="b-r"></view>
						<view>{{co.people}}位</view>
					</view>
				</view>
			</mg-cell>
			<view class="p23">
				<view class="f-x-bt mb20">
					<view class="f-y-c" :style="{color:tColor}">
						桌号:<text class="ml20">{{co.typeName+co.number}}</text>
					</view>
					<view>共{{co.goodsNum}}件<text class="ml20">{{`${(co.symbol||sl)+co.money}`}}</text></view>
				</view>
				<view class="f-row">
					<view class="f-g-0 f-y-c c9">
						<text class="iconfont icondndc mr10"></text>
						<text>堂食订单</text>
					</view>
					<view class="f-g-1 f-x-e">
						<!-- <view v-if="co.state==1" @click.stop="$emit('operation',{t:'qxdd',co,tip:1})" class="obtn b-d">取消订单</view> -->
						<view v-if="co.state==1&&co.eatType==1||co.state==2&&co.eatType==2" @click.stop="$emit('operation',{t:'tsljzf',co})"
						 class="obtn cf" :style="{color: tColor,borderColor:tColor}">立即支付</view>
						<!-- <view v-if="co.isTk==1" @click.stop="$emit('operation',{t:'sqtk',co})" class="obtn cf" :style="{background: tColor}">申请退款</view> -->
						<view v-if="co.state==3" @click.stop="$emit('operation',{t:'lxsj',co})" class="obtn b-d">联系商家</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else-if="otype==2">
			<mg-cell cname="p253" noc='1' isr='1'>
				<view slot='bd' class="f-y-c">
					<view class="mrltc bsf f-c b-l-sy mr15">
						<text class="iconfont iconyue cf f28"></text>
					</view>
					<view class="f-1">
						<view class="f-y-c" @click.stop='gosjDL'>
							<text class='t-o-e f28'>{{co.storeName}}
							</text>
							<text class="iconfont iconright c0 f24"></text>
						</view>
						<!-- <view class="mt10">堂食订单</view> -->
					</view>
					<view class="f-g-0" :style="{color:stateColor()}">{{`${getState()}`}}</view>
				</view>
			</mg-cell>
			<mg-cell last='1' cname="p23" noc='1' :img='co.storeIcon' w="110" h="110" brs='10rpx'>
				<view class="" slot='bd'>
					<view>时间：{{timeToDate(co.createdAt)}}</view>
					<!-- <view class="mt10">总计：{{`${(co.symbol||sl)+co.originalMoney}`}}</view> -->
					<view class="mt10">实付：{{`${(co.symbol||sl)+co.money}`}}</view>
				</view>
			</mg-cell>
			<view class="p23">
				<view class="f-row">
					<view class="f-g-0 f-y-c c9">
						<text class="iconfont iconyue mr10"></text>
						<text>当面付订单</text>
					</view>
					<view class="f-g-1 f-x-e">
						<view class="obtn b-d">查看详情</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else-if="otype==4">
			<mg-cell cname="p253" noc='1' isr='1'>
				<view slot='bd' class="f-y-c">
					<view class="mrltc bsf f-c b-l-kc mr15">
						<text class="iconfont iconmd cf"></text>
					</view>
					<view class="f-1">
						<view class="f-y-c" @click.stop='gosjDL'>
							<text class='t-o-e f28'>{{co.storeName}}
							</text>
							<text class="iconfont iconright c0 f24"></text>
						</view>
					</view>
					<view class="f-g-0" :style="{color:stateColor()}">{{`${getState()}${stime}`}}</view>
				</view>
			</mg-cell>
			<mg-cell last='1' cname="p23" noc='1' :img='co.goodsArr[0].icon' w="110" h="110" brs='10rpx'>
				<view class="" slot='bd'>
					<view>时间：{{timeToDate(co.createdAt)}}</view>
					<view class="mt10">{{`${co.goodsArr[0].name} 等 ${co.goodsNum}件商品`}}</view>
					<view class="mt10">{{co.isOut==1? thisCustom.dnjc || '店内就餐':thisCustom.dbdz || '打包带走'}}</view>
				</view>
			</mg-cell>
			<view class="p23">
				<view class="f-x-bt mb20">
					<view class="f-y-c wei" :style="{color:tColor}">{{co.callNo?`取单号：${co.callNo}`:''}}</view>
					<view>共{{co.goodsNum}}件<text class="ml20">{{`${(co.symbol||sl)+co.money}`}}</text></view>
				</view>
				<view class="f-row">
					<view class="f-g-0 f-y-c c9">
						<text class="iconfont iconmd mr10"></text>
						<text>快餐订单</text>
					</view>
					<view class="f-g-1 f-x-e">
						<view v-if="co.state==1" @click.stop="$emit('operation',{t:'qxdd',co,tip:1})" class="obtn b-d">取消订单</view>
						<view v-if="co.state==1" @click.stop="$emit('operation',{t:'ljzf',co})" class="obtn cf" :style="{color: tColor,borderColor:tColor}">立即支付</view>
						<view v-if="co.isTk==1" @click.stop="$emit('operation',{t:'sqtk',co})" class="obtn cf" :style="{color: tColor,borderColor:tColor}">取消订单</view>
						<view v-if="co.state==3" @click.stop="$emit('operation',{t:'lxsj',co})" class="obtn b-d">联系商家</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else-if="otype==3">
			<mg-cell cname="p253" noc='1' isr='1'>
				<view slot='bd' class="f-y-c">
					<view class="mrltc bsf f-c b-l-yy mr15">
						<text class="iconfont iconmd cf f28"></text>
					</view>
					<view class="f-1">
						<view class="f-y-c" @click.stop='gosjDL'>
							<text class='t-o-e f28'>{{co.storeName}}
							</text>
							<text class="iconfont iconright c0 f24"></text>
						</view>
					</view>
					<view class="f-g-0" :style="{color:stateColor()}">{{`${getState()}`}}</view>
				</view>
			</mg-cell>
			<mg-cell last='1' cname="p23" noc='1' :img='co.storeIcon' w="110" h="110" brs='10rpx'>
				<view class="" slot='bd'>
					<view class="f-y-c wei">
						<view class="mr10">{{co.serviceDay}}</view>
						<view>{{co.serviceTime}}</view>
					</view>
					<view class="f-y-c mt10 c6">
						<view class="">{{co.regionName}}</view>
						<view class="b-r"></view>
						<view>{{co.people}}人就餐</view>
					</view>
					<view class="mt10 c6">下单时间：{{timeToDate(co.createdAt)}}</view>
				</view>
			</mg-cell>
			<view class="p23">
				<view class="f-row">
					<view class="f-g-0 f-y-c c9">
						<text class="iconfont iconmd mr10"></text>
						<text>预约订单</text>
					</view>
					<view class="f-g-1 f-x-e">
						<view class="obtn b-d">查看详情</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else-if="otype==5">
			<mg-cell cname="p253" noc='1' isr='1'>
				<view slot='bd' class="f-y-c">
					<view class="mrltc bsf f-c b-l-pd mr15">
						<text class="iconfont icondd cf f28"></text>
					</view>
					<view class="f-1">
						<view class="f-y-c" @click.stop='gosjDL'>
							<text class='t-o-e f28'>{{co.storeName}}
							</text>
							<text class="iconfont iconright c0 f24"></text>
						</view>
					</view>
					<view class="f-g-0" :style="{color:stateColor()}">{{`${getState()}`}}</view>
				</view>
			</mg-cell>
			<mg-cell last='1' cname="p23" noc='1' :img='co.logo' w="110" h="110" brs='10rpx'>
				<view class="" slot='bd'>
					<view>时间：{{timeToDate(co.createdAt)}}</view>
					<view class="f-y-c mt10 c6">
						<view class="">{{co.name}}</view>
						<view class="b-r"></view>
						<view>{{co.people}}人就餐</view>
					</view>
					<view class="mt10 wei" :style="{color:tColor}">排队号：{{co.code}}</view>
				</view>
			</mg-cell>
			<view class="p23">
				<view class="f-row">
					<view class="f-g-0 f-y-c c9">
						<text class="iconfont icondd mr10"></text>
						<text>排队订单</text>
					</view>
					<view class="f-g-1 f-x-e">
						<view class="obtn b-d" @click.stop="$emit('operation',{t:'scpd',co})">删除</view>
					</view>
				</view>
			</view>
		</block>
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
		name: 'my-dnorder',
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
			otype: {
				type: Number, //1堂食2收银
				default: 1,
			},
		},
		data() {
			return {
				stateArr: ['', '待付款', '就餐中', '已支付', '已关闭', '已退款'],
				kcstateArr: ['待付款', '待接单', '制作中', '已完成', '已关闭', '申请退款', '退款通过', '退款拒绝', '商家拒单'],
				yystateArr: ['待支付', '预约中', '预约成功', '已拒绝', '确认到店', '已取消'],
				pdstateArr: ['排队中', '已就餐', '已过号', '已取消'],
				stime: '',
			}
		},
		mixins: [utilMixins],
		computed: {
			// tColor() {
			// 	return '#FF5B0A'
			// },
			thisCustom(){
			return this.system.custom
			}
		},
		methods: {
			goDL() {
				let url
				switch (this.otype) {
					case 1:
						url = '/yb_wm/shop/in/order-dl?id=' + this.co.id
						break;
					case 2:
						url = '/yb_wm/shop/in/syorder-dl?id=' + this.co.id
						break;
					case 4:
						url = '/yb_wm/shop/ffmode/order-dl?id=' + this.co.id
						break;
					case 3:
						url = '/yb_wm/shop/reserve/yyxq?id=' + this.co.id
						break;
					case 5:
						url = '/yb_wm/shop/lineup/pdxq?id=' + this.co.id
						break;
				}
				this.go({
					t: 1,
					url,
				})
			},
			gosjDL() {
				// this.$store.state.config.storeInfo.id = this.co.storeId
				this.go({
					t: 6,
					// url: `/yb_wm/index/goods?storeId=${this.co.storeId}`
					url: '/yb_wm/index/goods'
				})
			},
			getState() {
				if (this.otype == 1) {
					return this.stateArr[+this.co.state]
				} else if (this.otype == 2) {
					return '已完成'
				} else if (this.otype == 4) {
					return this.kcstateArr[+this.co.state - 1] || ''
				} else if (this.otype == 3) {
					return this.yystateArr[+this.co.state - 1]
				} else if (this.otype == 5) {
					return this.pdstateArr[+this.co.state - 1]
				}
			},
			stateColor() {
				let color = ''
				if (this.otype == 1 || this.otype == 2) {
					switch (+this.co.state) {
						case 1:
						case 2:
							color = this.otype == 1 ? this.tColor : '#999';
							break;
						case 7:
							color = '';
							break;
						case 8:
						case 5:
							color = '#f00';
							break;
						default:
							color = '#999';
					}
				} else if (this.otype == 3) {
					switch (+this.co.state) {
						case 2:
						case 3:
							color = this.tColor;
							break;
						case 4:
							color = '#f00';
							break;
						default:
							color = '#999';
					}
				} else if (this.otype == 4) {
					switch (+this.co.state) {
						case 1:
						case 3:
							color = this.tColor;
							break;
						default:
							color = '#999';
					}
				} else if (this.otype == 5) {
					switch (+this.co.state) {
						case 1:
							color = this.tColor;
							break;
						default:
							color = '#999';
					}
				}
				return color
			},
			djs(time) {
				//，剩余 13:55
				if (this.co.state != 1) return
				let now = this.dateToTime(),
					time2 = +time + 900
				if (time2 > now) {
					let a = utils.countDownTime(time2 - now)
					this.stime = `，
							剩余 $ {
								a[2]
							}: $ {
								a[3]
							}
							`
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
						this.stime = `，
							剩余 $ {
								arr[2]
							}: $ {
								arr[3]
							}
							`
						//console.log('倒计时', time2 - now)
					}, 1000)
				}
				//console.log(time, time2, now)
			},
		},
		// async created() {
		// 	this.djs(this.co.createdAt)
		// },
		// destroyed() {
		// 	clearInterval(this.dsq)
		// },
	}
</script>

<style scoped lang="scss">
	.mrltc {
		width: 50rpx;
		height: 50rpx;
	}

	.b-l-ts {
		background: linear-gradient(to bottom, #f38529, #fe912c);
	}

	.b-l-sy {
		background: linear-gradient(to bottom, #a57afa, #a175f8);
	}

	.b-l-kc {
		background: linear-gradient(to bottom, #07C160, #09BB07);
	}

	.b-l-yy {
		background: linear-gradient(to bottom, #05CBE0, #02AABA);
	}

	.b-l-pd {
		background: linear-gradient(to bottom, #FFCD42, #FABC0A);
	}

	.b-r {
		width: 1px;
		height: 23rpx;
		background: #999;
		margin: 0 12rpx;
	}
</style>
