<template>
	<view>
		<view v-if="info.id" class="pb130">
			<view v-if="info.eatType == 1" class="posi-s w100 t0 f-y-c tgg cfc">
				<text class="iconfont iconsgg mr30 cfc"></text>
				<view class="f-1 f22">订单成功支付后，大厨就开始制作啦！</view>
				<view class="f-c ml20">
					<text @click="tzdd" class="iconfont icondd f48 c3"></text>
				</view>
			</view>
			<view v-else class="f-c-e p330">
				<text @click="tzdd" class="iconfont icondd f48 c3"></text>
			</view>
			<view class="f-c-c oltop">
				<view class="f36 wei">{{orderState.str1}}</view>
				<view class="mt15" v-if="orderState.str2">
					<view class="f-y-c">
						<text class="iconfont iconsgg c0 f34 mr10"></text>{{orderState.str2}}</view>
					<view v-if="orderState.str3" :style="{color: tColor}" class="f24 mt10">{{orderState.str3}}</view>
				</view>
			</view>
			<view class="p03 olbd">
				<!-- 待支付 餐后付款 就不需要这个倒计时-->
				<mg-cell v-if="info.state==1&&info.eatType==1" cname="mb30 bs20" img='/static/lb.png' w='60' h='60' brs='50%'>
					<view slot='bd' class="f26">
						<view>超过{{orderset.instore.closeTime}}分钟未支付，订单将自动取消哦！</view>
						<view class="mt10" v-if='stime'>剩余:<text class="ml20" :style="{color: tColor}">{{stime[2]}}:{{stime[3]}}</text></view>
					</view>
				</mg-cell>
				<view class="mb30 bs20">
					<mg-cell isr='1'>
						<view slot='bd' class="">
							<view class="f30 f-y-c">
								<text class='t-o-e wei'>已点商品({{info.goodsNum}})</text>
							</view>
						</view>
					</mg-cell>
					<mg-cell isr='1' v-for="(v,i) in info.goodsArr" :key="i" w='104' h='104' brs='5rpx' :img='v.icon' :cname="i!=info.goodsArr.length-1?'la154':''">
						<template slot='bd'>
							<view class="f-bt">
								<view class="t-o-e">{{v.name}}</view>
								<view class="f-g-0 f32">{{osl+itemTotal(v)}}</view>
							</view>
							<view class="f-bt mt10 f24 c9">
								<view class="f-g-1">
									<text class="" v-if="v.data">{{v.data}}</text>
									<text v-if="v.attribute">({{v.attribute}})</text>
									<text class="ml10" v-if="v.material">+{{v.material}}</text>
								</view>
								<view class="ml20">x{{v.num}}</view>
							</view>
						</template>
					</mg-cell>
				</view>
				<view class="mb30 bs20" v-for="(pv,pi) in info.addGoods" :key="pi">
					<!-- <mg-cell v-if="info.addGoods.length" isr='1'>
						<view slot='bd' class="">
							<view class="f30 f-y-c">
								<text class='t-o-e wei'>添加商品</text>
							</view>
						</view>
					</mg-cell> -->
					<view class="p-r pt30 bf">
						<mg-cell isr='1' v-for="(v,i) in pv" :key="i" w='104' h='104' brs='5rpx' :img='v.icon' :cname="i!=pv.length-1?'la154':''">
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
						<view class="p-a sjx cf">加</view>
					</view>
				</view>
				<view class="mb30 bs20 bf">
					<mg-cell isr='1' btt='桌位费' cname='p015' :ft='`${osl+info.tablewareMoney}`' ftc='f32 c3'>
					</mg-cell>
<!-- 					<mg-cell v-if="info.preferentialMoney>0" isr='1' btt='店铺满减优惠' :ft='`-${sl+info.preferentialMoney}`' ftc='f32'
					 :color='tColor'>
					</mg-cell> -->
<!-- 					<mg-cell v-if="info.newMoney>0" isl='1' btt='门店新客立减' :ft='`-${osl+info.newMoney}`' ftc='f32' :color='tColor'>
						<view slot='hd' class="itemcon poxk mr20">新客</view>
					</mg-cell> -->
					<mg-cell v-if="info.preferentialMoney>0" last='1' cname='p015' :ft='`-${sl+info.preferentialMoney}`'
						ftc='f32 cf5f'>
						<view slot='bd' class="f-y-c">
							<view class="yhic f18 cf bf5f f-c">减</view>
							<view>门店满减</view>
						</view>
					</mg-cell>
					<mg-cell last="1" v-if="info.newMoney>0" cname='p015' :ft='`-${sl+info.newMoney}`' ftc='f32 cf5f'>
						<view slot='bd' class="f-y-c">
							<view class="yhic f18 cf bf5f f-c">新</view>
							<view>新客立减</view>
						</view>
					</mg-cell>
					<!-- <mg-cell isl='1' cname='p30' btt='会员折扣' ft='0.9折' ftc='f32' :color='tColor'></mg-cell> -->
<!-- 					<mg-cell v-if="info.couponPreferential>0" isr='1' btt='商家优惠券抵扣' :ft='`-${sl+info.couponPreferential}`' ftc='f32'
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
				</view>
				<!-- <mg-cell @tab='util.makeTel(info.storeTel)' bgc='#FAFBFC' last='1' cname="b-t-e">
				<view slot='bd' class="">
					<view class="f30 f-c">
						<text class="iconfont f42 icondh c0 mr20"></text>
						<text class='t-o-e'>联系商家</text>
					</view>
				</view>
			</mg-cell> -->
				<view class="mb30 bs20 bf" v-if="info.deliveryMode==1">
					<mg-cell isr='1' btt='自取信息' bttc='f30 wei'></mg-cell>
					<view class="p20">
						<mg-cell v-if="info.appointment==1" last='1' cname='p13' btt='自取时间' bttc='c9' :ft="timeToDate(info.serviceTime)"
						 ftc='c3'></mg-cell>
						<mg-cell v-else last='1' cname='p13' btt='自取时间' bttc='c9' :ft="info.serviceAt" ftc='c3'></mg-cell>
						<mg-cell last='1' cname='p13' btt='取货码' bttc='c9' :ft="info.selfCode" ftc='c3'></mg-cell>
						<mg-cell last='1' noc='1' cname='p13' btt='商家地址' bttc='c9' ftc='c3'>
							<view slot='ft' class="f-c-e w500">
								<view @click='ckwz' class="t-r">{{info.storeAddress}}</view>
								<view @click='util.makeTel(info.storeTel)' class="">{{info.storeName}} ({{info.storeTel}})</view>
							</view>
						</mg-cell>
						<mg-cell last='1' cname='p13' btt='预留电话' bttc='c9' :ft="info.receivedTel" ftc='c3'></mg-cell>
					</view>
				</view>
				<view class="mb30 bs20 bf">
					<view class="p20">
						<mg-cell hc='1' @tab='go({t:6,url:`/yb_wm/index/index?storeId=${info.storeId}`})' last='1' cname='p13' btt='商家信息'
						 :ft="info.storeName" ftc='c3' arrow="1"></mg-cell>
						<mg-cell last='1' cname='p13' btt='桌号' :ft="info.typeName+info.number" ftc='c3'></mg-cell>
						<mg-cell last='1' cname='p13' btt='人数' :ft="info.people+'位'" ftc='c3'></mg-cell>
						<mg-cell last='1' cname='p13' btt='结算模式' :ft="info.eatType==1?'餐前支付':'餐后支付'" ftc='c3'></mg-cell>
					</view>
				</view>
				<view class="mb30 bs20 bf">
					<view class="p20">
						<mg-cell last='1' cname='p13' btt='订单信息' bttc=''></mg-cell>
						<mg-cell last='1' cname='p13' btt='订单号码' bttc='c9'>
							<view slot='ft' class="f-y-c">
								<text class="">{{info.outTradeNo}}</text>
								<bk-b @tab='util.fz(info.outTradeNo)' type="2" c-name='f24 ml20' t='复制' color='#fd5b00'></bk-b>
							</view>
						</mg-cell>
						<mg-cell last='1' cname='p13' btt='下单时间' bttc='c9' :ft="timeToDate(info.createdAt)"></mg-cell>
						<mg-cell v-if='info.payMode&&info.state>=3' last='1' cname='p13' btt='支付方式' bttc='c9' :ft="payName(info.payMode)"></mg-cell>
						<mg-cell v-if='info.userNote' last='1' noc='1' cname='p13' btt='订单备注' bdmw='130rpx' bttc='c9' :ft="info.userNote"></mg-cell>
					</view>
				</view>
			</view>
		</view>
<!-- 		<view v-if="info.state<3" class="foot-btnc f-row" :style="{bottom: '20rpx'}">
			只要餐前支付就可以取消订单
			<button v-if="info.eatType == 1" @click="qxdd({tip:1})" class="f-1 foot-btn b-l-qx mr30" hover-class="btnhc">取消订单</button>
			<button v-if="info.eatType==1" @click="ljzf" :loading="loading" :disabled="loading" class="f-1 foot-btn b-l-f0f0"
			 hover-class="btnhc">立即支付</button>
			<button v-if="info.state==2&sjxx.orderMode==1&&info.eatType == 2" @click="jxtj" class="f-1 foot-btn b-l-fdf3 mr30"
			 hover-class="btnhc">继续加菜</button>
		</view> -->
		<view class="foot-btnc f-row" :style="{bottom: '20rpx'}">
			<!-- 只要餐前支付就可以取消订单 -->
			<button v-if="info.state==1" @click="qxdd({tip:1})" class="f-1 foot-btn b-l-qx mr30" hover-class="btnhc">取消订单</button>
			<button v-if="(info.eatType==1 && info.state==1) || (info.eatType==2 && info.state==2 && info.onLine!=2)" @click="ljzf" :loading="loading" :disabled="loading" class="f-1 foot-btn b-l-f0f0"
			 hover-class="btnhc">立即支付</button>
			<button v-if="info.state==2 && sjxx.orderMode==1 && info.eatType == 2" @click="jxtj" class="f-1 foot-btn b-l-fdf3 mr30"
			 hover-class="btnhc">继续加菜</button>
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
			this.getSystem()
			this.util.setNT('订单详情')
			this.orderId = options.id
			await this.getConfig({
				key: 'orderset',
				api: 'ddsz',
			})
			this.getInfo()
		},
		onShow() {
			if (this.isload) {
				this.getInfo()
			} else {
				this.isload = true
			}
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
						str1 = this.info.eatType == 1 ? '待支付' : '等待商家接单'
						str2 = this.info.eatType == 1 ? '请尽快支付' : ''
						break;
					case 2:
						str1 = '就餐中'
						// str1 = this.info.eatType == 1 ? '就餐中' : '已接单'
						str2 = '请耐心等待商家备餐'
						break;
					case 3:
						// str1 = '已支付'
						str1 = '已完成'
						str2 = ''
						break;
					case 4:
						str1 = '已关闭'
						str2 = '订单已关闭'
						break;
					case 5:
						str1 = '已退款'
						str2 = '订单已退款'
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
			jxtj() {
				this.go({
					t: 3,
					url: '/yb_wm/shop/in/goods?tableId=' + this.info.tableId
				})
			},
			async ljzf() {
				this.loading = true
				let checkRes
				if (this.sjxx.orderMode == 1 && this.info.eatType == 2) { //多人点单可加菜判断购物车
					checkRes = {
						data: 1
					}
				} else {
					checkRes = {
						data: 2
					}
				}
				if (checkRes.data == 1) {
					await this.getInfo()
				}
				this.go({
					t: 1,
					url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
						orderId: this.orderId,
						orderType: 7,
						info: {
							money: this.info.money,
							type: "堂内订单支付",
							cancel: 1,
							go: {
								t: 3,
								url: "/yb_wm/shop/in/indd"
							},
						}
					}))
				})
				this.loading = false
			},
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.tsddxq,
					mask: '加载中',
					data: {
						id: this.orderId
					},
				})
				if (data) {
					this.info = data
					if (data.state == 1 && data.eatType == 1) {
						this.djs(data.createdAt)
					}
					this.sjxx = data.storeSet
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
				//13:55
				if (this.info.state != 1 || this.orderset.instore.autoClose != 1) return
				let now = this.dateToTime(),
					time2 = +time + this.orderset.instore.closeTime * 60 + 2
				if (time2 > now) {
					this.stime = utils.countDownTime(time2 - now)
					this.dsq = setInterval(async () => {
						time2 -= 1
						if (time2 == now) {
							clearInterval(this.dsq)
							this.qxdd()
						}
						this.stime = utils.countDownTime(time2 - now)
					}, 1000)
				}
			},
			async qxdd(e) {
				if (e) {
					try {
						await this.util.modal('您确认取消订单吗？')
					} catch (e) {
						return
					}
				}
				let data = await this.util.request({
					'url': this.api.tsqxdd,
					method: 'POST',
					mask: '取消订单中',
					data: {
						orderId: this.info.id
					},
				})
				if (data) {
					setTimeout(() => {
						this.go({
							t: 3,
							url: "/yb_wm/shop/in/indd"
						})
					}, 1000)
					this.util.message('操作成功', 1)
				}
			},
			ckwz() {
				this.util.ckWz({
					lat: this.info.storeLat,
					lng: this.info.storeLng,
					name: this.info.storeName,
					address: this.info.storeAddress,
				})
			},
			tzdd() {
				this.go({
					t: getCurrentPages().length > 1 ? 4 : 1,
					url: '/yb_wm/shop/in/indd'
				})
			},
		},
		onUnload() {
			this.dsq && clearInterval(this.dsq)
		},
	}
</script>

<style scoped lang="scss">
	.obtn {
		margin: 0 25rpx 0 0;
	}

	.map {
		width: 690rpx;
		height: 400rpx;
	}

	.zqmc {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		border: 1px dashed #ddd;
	}

	.oltop {
		padding: 60rpx 30rpx;
	}

	.tgg {
		padding: 10rpx 30rpx;
		height: 70rpx;
		background: #FFF3EA;
	}

	.cfc {
		color: #ff7c1c;
	}

	.sjx {
		top: 0;
		left: 0rpx;
		padding: 0 40rpx;
		height: 35rpx;
		font-size: 20rpx;
		line-height: 35rpx;
		border-radius: 0 0 20rpx 0;
		background: linear-gradient(#F75214, #F87D22);
	}
</style>
