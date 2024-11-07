<template>
	<view>
		<view v-if="info.id" class="pb130">
			<view class="sltop cf" :style="{background:tColor}">
				<mg-cell bgc='transparent' last='1'>
					<view slot='bd' class="f-row">
						<view class="f-1 f36 f-y-c">
							<text class='t-o-e wei'>{{orderState.str1}}</text>
						</view>
						<view @click='util.makeTel(info.storeTel)' class="f-y-c lxmd b-d p-13-20 bs60" style="border-color: #FFFFFF;">
							<text class="iconfont icondh cf mr10 f28"></text>
							<view>联系门店</view>
						</view>
					</view>
				</mg-cell>
			</view>
			<view class="p03 olbd">
				<!-- 待支付 -->
				<mg-cell v-if="info.state==1&&orderset.instore.fastAutoClose == 1" cname="mb30 bs20" img='/static/lb.png' w='60' h='60'
				 brs='50%'>
					<view slot='bd' class="f26">
						<view>超过{{orderset.instore.fastCloseTime}}分钟未支付，订单将自动取消哦！</view>
						<view class="mt10" v-if='stime'>剩余:<text class="ml20" :style="{color: tColor}">{{stime[2]}}:{{stime[3]}}</text></view>
					</view>
				</mg-cell>
				<view class="bf mb30 bs20">
					<view class="p3">
						<view v-if="orderState.str2">
							<view class="f30 wei">{{orderState.str2}}</view>
							<view v-if="info.state>=2&&info.state<=4" class="mt30 t-c">
								<view class="f32">取单号</view>
								<view class="f56 wei p20" style="letter-spacing: 10rpx;">{{info.callNo}}</view>
								<view class="m30 f-y-c f24 c9">
									<view class="f-1 f-c-c">
										<text class="iconfont iconxd f56" :class="{'c3':info.state==2}"></text>
										<view class="mt10" :class="{'c3':info.state==2}">已下单</view>
									</view>
									<view class="ydhx"></view>
									<view class="f-1 f-c-c">
										<text class="iconfont icondjs f56" :class="{'c3':info.state==3}"></text>
										<view class="mt10" :class="{'c3':info.state==3}">制作中</view>
									</view>
									<view class="ydhx"></view>
									<view class="f-1 f-c-c">
										<text class="iconfont iconwc f56" :class="{'c3':info.state==4}"></text>
										<view class="mt10" :class="{'c3':info.state==4}">已完成</view>
									</view>
								</view>
							</view>
							<view v-if="orderState.str3" :style="{color: tColor}" class="f24 mt10">{{orderState.str3}}</view>
						</view>
					</view>
					<!-- <mg-cell @tab='util.makeTel(info.storeTel)' bgc='#FAFBFC' last='1' cname="b-t-e">
						<view slot='bd' class="">
							<view class="f30 f-c">
								<text class="iconfont f42 icondh c0 mr20"></text>
								<text class='t-o-e'>联系商家</text>
							</view>
						</view>
					</mg-cell> -->
				</view>
				<view class="mb30 bs20">
					<mg-cell isr='1'>
						<view slot='bd' class="">
							<view class="f30 f-y-c">
								<text class='t-o-e wei'>{{info.storeName}}</text>
							</view>
						</view>
					</mg-cell>
					<mg-cell isr='1' v-for="(v,i) in info.goodsArr" :key="i" w='104' h='104' brs='5rpx' :img='v.icon' :cname="i!=info.goodsArr.length-1?'la154':''">
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
					<mg-cell v-if="info.giveName" last='1' bdmw="120rpx" cname='p015'>
						<view slot='bd' class="f-y-c">
							<view class="yhic f18 cf bf5f f-c f-g-0">赠</view>
							<view>满赠</view>
						</view>
						<view slot='ft' class="cf5f">{{info.giveName}}</view>
					</mg-cell>
					<mg-cell v-if="info.boxMoney>0" isr='1' btt='打包盒费' :ft='`${osl+info.boxMoney}`' ftc='f32 c3'>
						<view slot='hd' class="itemcon popsf mr20">包装费</view>
					</mg-cell>
<!-- 					<mg-cell v-if="info.preferentialMoney>0" isr='1' btt='店铺满减优惠' :ft='`-${sl+info.preferentialMoney}`' ftc='f32'
					 :color='tColor'>
					</mg-cell> -->
					<mg-cell v-if="info.preferentialMoney>0" last='1' cname='p015' :ft='`-${sl+info.preferentialMoney}`'
						ftc='f32 cf5f'>
						<view slot='bd' class="f-y-c">
							<view class="yhic f18 cf bf5f f-c">减</view>
							<view>门店满减</view>
						</view>
					</mg-cell>
					<mg-cell v-if="info.newMoney>0" isl='1' btt='门店新客立减' :ft='`-${osl+info.newMoney}`' ftc='f32' :color='tColor'>
						<view slot='hd' class="itemcon poxk mr20">新客</view>
					</mg-cell>
					<!-- <mg-cell isl='1' cname='p30' btt='会员折扣' ft='0.9折' ftc='f32' :color='tColor'></mg-cell> -->
<!-- 					<mg-cell v-if="info.couponPreferential>0" isr='1' btt='商家优惠券抵扣' :ft='`-${osl+info.couponPreferential}`' ftc='f32'
					 :color='tColor'>
					</mg-cell> -->
<!-- 					<mg-cell v-if="info.platformCouponPreferential>0" isr='1' btt='平台优惠券抵扣' :ft='`-${sl+info.platformCouponPreferential}`'
					 ftc='f32' :color='tColor'>
					</mg-cell> -->
					<mg-cell v-if="info.couponPreferential>0" last='1' cname='p015' :ft='`-${sl+info.couponPreferential}`'
						ftc='f32 cf5f'>
						<view slot='hd' class="f-y-c">
							<view class="yhic f18 cf bf5f f-c">券</view>
							<view>门店代金券</view>
						</view>
					</mg-cell>
					<mg-cell v-if="info.platformCouponPreferential>0" last='1' cname='p015'
						:ft='`-${sl+info.platformCouponPreferential}`' ftc='f32 cf5f'>
						<view slot='hd' class="f-y-c">
							<view class="yhic f18 cf bf5f f-c">券</view>
							<view>{{system.custom.systemRedbag}}</view>
						</view>
					</mg-cell>
					<mg-cell v-if="info.taxRatio>0" isl='1'>
						<view slot='bd' class="f-y-c">税率<text class="ml10 c6 f24">({{info.taxRatio}}%)</text></view>
						<view slot='ft' class="f32 c3">+{{osl+info.tax}}</view>
					</mg-cell>
					<mg-cell isr='1' last='1'>
						<view slot='bd' class="c9 f24 f-row">
							<view class="f-g-0 f-y-c">优惠规则<text class="iconfont iconwen f26 c9 ml10"></text></view>
						</view>
						<view slot='ft' class="ml10 c3"><text class="f24">共{{info.goodsNum}}件商品</text><text class="m02">小计</text><text
							 class="f34">{{osl+info.money}}</text></view>
					</mg-cell>
					<!-- <mg-cell @tab='util.makeTel(info.storeTel)' bgc='#FAFBFC' last='1' cname="b-t-e">
				<view slot='bd' class="">
					<view class="f30 f-c">
						<text class="iconfont f42 icondh c0 mr20"></text>
						<text class='t-o-e'>联系商家</text>
					</view>
				</view>
			</mg-cell> -->
				</view>
				<view class="mb30 bf bs20">
					<mg-cell isr='1' btt='门店信息' bttc='f30 wei'></mg-cell>
					<view class="p20">
						<mg-cell last='1' cname='p13' btt='门店名称' :ft="info.storeName" bttc='c9' ftc='c3'></mg-cell>
						<mg-cell last='1' cname='p13' btt='门店地址' bttc='c9'>
							<view slot='ft' class="f-y-c flex" style="width: 500rpx;">
								<view class="t-o-e2">{{info.storeAddress}}</view>
								<view @click.stop="ckwz(info)" class="f-c bf5 dtanc ml10">
									<text class="iconfont icondtdh f26"></text>
								</view>
							</view>
						</mg-cell>
						<mg-cell last='1' cname='p13' btt='门店电话' bttc='c9' ftc='c3'>
							<view slot='ft' class="f-y-c">
								<view>{{info.storeTel}}</view>
								<view @click.stop="bddh(info)" class="f-c bf5 dtanc ml10">
									<text class="iconfont icondh f26"></text>
								</view>
							</view>
						</mg-cell>
					</view>
				</view>
				<view class="mb30 bf bs20">
					<mg-cell isr='1' btt='订单信息' bttc='f30 wei'></mg-cell>
					<view class="p20">
						<mg-cell last='1' cname='p13' btt='就餐方式' bttc='c9' :ft="info.isOut==1?this.system.custom.dnjc || '店内就餐':this.system.custom.dbdz || '打包带走'" ftc='c3'></mg-cell>
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
			await this.getConfig({
				key: 'orderset',
				api: 'ddsz',
			})
			this.getInfo()
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				orderset: state => state.config.orderset,
			}),
			orderState() {
				let str1 = '',
					str2 = '',
					str3 = ''
				switch (+this.info.state) {
					case 1:
						str1 = '订单待支付'
						str2 = '订单还未支付，请尽快支付哦！'
						break;
					case 2:
						str1 = '订单待接单'
						str2 = '请耐心等待商家接单哦！'
						break;
					case 3:
						str1 = '订单制作中'
						str2 = '订单商家已接单，请耐心等待商家备餐哦！'
						break;
					case 4:
						str1 = '订单已完成'
						str2 = '感谢您对我们的信任，期待下次光临！'
						break;
					case 5:
						str1 = '订单已关闭'
						str2 = '订单因支付超时，已被系统自动关闭！'
						break;
					case 6:
						str1 = '订单申请退款'
						str2 = '订单申请退款中，请等待商家处理！'
						break;
					case 7:
						str1 = '订单退款通过'
						str2 = '您的订单退款申请已通过，支付金额已原路退还！'
						break;
					case 8:
						str1 = '订单退款拒绝'
						str2 = '您的订单退款申请已被商家拒绝！'
						break;
					case 9:
						str1 = '订单拒单'
						str2 = '您的订单已被商家拒单'
						break;
				}
				return {
					str1,
					str2,
					str3,
				}
			},
			zqmArr() {
				return this.info.selfCode && this.info.selfCode.split('')
			},
			osl() {
				return this.info.symbol || this.sl
			},
		},
		methods: {
			...mapActions(["getConfig"]),
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.kcddxq,
					mask: '加载中',
					data: {
						id: this.orderId
					},
				})
				if (data) {
					this.info = data
					if (data.state == 1) {
						this.djs(data.createdAt)
					}
				}
			},
			itemTotal(v) {
				let itemTotal = +(v.vipMoney > 0 && +v.vipMoney < +v.money && v.vipMoney || v.money)
				return +(itemTotal * v.num).toFixed(2)
			},
			getJldata(v) {
				if (!v) return
				let str = ''
				v.forEach(v => {
					str += v.name + ','
				})
				return str.substr(0, str.length - 1)
			},
			djs(time) {
				if (this.info.state != 1 || this.orderset.instore.fastAutoClose != 1) return
				let now = this.dateToTime(),
					time2 = +time + this.orderset.instore.fastCloseTime * 60
				console.log(time2, now)
				if (time2 > now) {
					this.stime = utils.countDownTime(time2 - now)
					this.dsq = setInterval(async () => {
						time2 -= 1
						if (time2 == now) {
							clearInterval(this.dsq)
							this.util.message('加载中', 2)
							utils.swnb(1000)
						}
						this.stime = utils.countDownTime(time2 - now)
					}, 1000)
				}
			},
			bddh(v) {
				this.util.makeTel(v.storeTel)
			},
			ckwz(v) {
				this.util.ckWz({
					lat: v.storeLat,
					lng: v.storeLng,
					name: v.storeName,
					address: v.storeAddress,
				})
			},
		},
		onUnload() {
			this.dsq && clearInterval(this.dsq)
		},
	}
</script>

<style scoped lang="scss">
	.sltop {
		height: 330rpx;
	}

	.olbd {
		margin-top: -200rpx;
	}

	.obtn {
		margin: 0 25rpx 0 0;
	}

	.ydhx {
		width: 60rpx;
		margin-bottom: 30rpx;
		border-top: 4rpx dotted #999;
	}
	.dtanc {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>
