<template>
	<view class="pb130" v-show="sjxx.moreSet">
		<view class="header" :style="{background: '#fff'}">
			<view v-if="sjxx.moreSet&&sjxx.moreSet.orderNotice" class="w100 t0 f-y-c p23" :style="{background:`#FFF3EA`}">
				<text class="iconfont icontishi" :style="{color:'#ff7c1c'}"></text>
				<view class="f-1" :style="{color:'#ff7c1c'}">
					<uni-notice-bar :scrollable="true" :single="true" :color="'#ff7c1c'" backgroundColor="transparent" :text="sjxx.moreSet.orderNotice"
					 :speed='25' />
				</view>
			</view>
		</view>
		<view class="mainc" v-show="showLoading">
			<view class="bf bs20 f-c-c p3">
				<view class="p10 f24 cb">桌位号码</view>
				<view class="f44 f-y-c wei mb20">
					<text>{{tableInfo.typeName}}</text><text class="ml20">{{tableInfo.name}}</text>
				</view>
				<view class="f24 c6 p10">订单支付后，大厨就开始制作啦！</view>
			</view>
			<view class="p03 bf bs20 mt30">
				<mg-cell last="1" isl='1' cname='p30' btt='桌位人数' bttc='f30'>
					<view slot='ft' class="">
						<number-box :min="1" :value='params.people' :max="99" @change="bindChange"></number-box>
					</view>
				</mg-cell>
			</view>
			<!-- 切换 -->
			<view class="bs20">
				<view v-show="params.deliveryMode==1">
					<mg-cell last="1" v-if="ztTypeArr.length">
						<!-- <mg-radio rtype='2' v-model="params.isOut" :arr='ztTypeArr'></mg-radio> -->
						<view slot='bd' class="f-x-bt">
							<view @click="clickztMode(v)" v-for="(v,i) in ztTypeArr" :key='i' class="pstypec bs10 f-c" :style="{color:v.value==params.isOut?tColor:'',borderColor:v.value==params.isOut?tColor:''}">
								<text class="iconfont c3 mr20" :class="[v.icon]" :style="{color:v.value==params.isOut?tColor:''}"></text>
								<text class="f32">{{v.name}}</text>
								<view class="yddsj posi-a" :style="{borderBottom:v.value==params.isOut?'41rpx solid '+tColor:''}"></view>
								<text v-if="v.value==params.isOut" class="gou posi-a iconfont icongou cf f20"></text>
							</view>
						</view>
					</mg-cell>
				</view>
			</view>
			<!-- 商品 -->
			<view class="mt30 p03 bf bs20">
				<mg-cell isl='1' cname='p2 pl0' btt='商品明细' bttc='f30'></mg-cell>
				<mg-cell :isl='i==pcarList.length-1&&1' last="1" v-for="(v,i) in pcarList" :key="i" w='104' h='104' brs='12rpx'
				 :img='v.icon' cname='p2 pl0 pr0 la124'>
<!-- 					<template slot='bd'>
						<view class="f-bt">
							<view class="t-o-e l-h1">{{v.name}}</view>
							<view class="f-g-0 f32">{{sl+itemTotal(v.money,v.num)}}</view>
						</view>
						<view class="f-bt mt10 f24 c9">
							<view class="f-g-1 f-raw">
								<text class="ml10" v-if="v.groupName">{{v.groupName}}</text>
								<text v-if="v.attribute">({{v.attribute}})</text>
								<text class="ml10" v-if="v.materialName">+{{v.materialName}}</text>
							</view>
							<view class="ml10">x{{v.num}}</view>
						</view>
					</template> -->
					<template slot='bd'>
						<view class="f-bt">
							<view class="f-row">
								<view v-if="v.ishd&&v.discountType!=4" class="f-g-0 yhic f18 cf bf5f f-c hdspan">
									{{v.discountType==1?'特':v.discountType==2?'折':v.discountType==5?'赠':'减'}}
								</view>
								<view class="l-h1">{{v.name}}</view>
							</view>
							<view class="f-g-0 f32">
								{{sl+(v.ishd?itemTotal(v.discountPrice,v.spnum):itemTotal(v.money,v.spnum))}}
							</view>
						</view>
						<view v-if="v.ishd&&v.discountType==4" class="f-row cf5f">
							<view class="f20 bs5 b-d p-3-10" :style="{borderColor:'#FF5F2F'}">
								{{v.discountType==4?'第二件打折':'买一送一'}}
							</view>
						</view>
						<view class="f-bt mt10 f24 c9">
							<view class="f-g-1 f-raw">
								<text class="ml10" v-if="v.groupName">{{v.groupName}}</text>
								<text v-if="v.attribute">({{v.attribute}})</text>
								<text class="ml10" v-if="v.materialName">+{{v.materialName}}</text>
							</view>
							<view class="ml10">x{{v.spnum}}</view>
						</view>
					</template>
				</mg-cell>
				<mg-cell v-if="carInfo.vipDiscount>0" last='1' bdmw="180rpx" cname='p15'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f22 cf f-c f-g-0" style="background: #EDA555;">V</view>
						<view>会员折扣</view>
					</view>
					<view slot='ft' class="f32 cf7">{{sl+carInfo.vipDiscount}}</view>
				</mg-cell>
				<mg-cell last="1" cname='p15' btt='商品小计' :ft='`${sl+(carInfo.oldPrice-carInfo.boxMoney)}`' ftc='f32 c3'>
				</mg-cell>
				<mg-cell last="1" cname='p15' btt='桌位费' :ft='`${sl+xjMoney.zwf}`' ftc='f32 c3'>
				</mg-cell>
				<!-- <mg-cell v-if="carInfo.getTotal.bzf>=0" last="1" cname='p15' btt='包装费'>
					<view slot='ft' class="f32 c3">
						<text v-if='params.deliveryMode==1&&params.isOut==1' class="mr30 t-d-l f24 c9">{{sl+carInfo.getTotal.bzf}}</text>
						<text>{{sl+xjMoney.bzf}}</text>
					</view>
				</mg-cell> -->
				<!-- 满减 -->
				<mg-cell v-if="carInfo.reduce>0" last="1" cname='p15' :ft='`-${sl+carInfo.reduce}`' ftc='f32 cf5f'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c">减</view>
						<view>商品满减</view>
					</view>
				</mg-cell>
				<!-- 新客 -->
				<!-- <mg-cell v-if="orderMuster.newReduction>0" last='1' cname='p15' :ft='`-${sl+orderMuster.newReduction}`' ftc='f32 cf5f'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf b00 f-c">新</view>
						<view>门店新客立减</view>
					</view>
				</mg-cell> -->
				<!-- 满赠 -->
				<mg-cell v-if="jsInfo.mzInfo.title" last='1' bdmw="180rpx" cname='p15'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c f-g-0">赠</view>
						<view>{{jsInfo.mzInfo.name}}</view>
					</view>
					<view slot='ft' class="cf5f">{{jsInfo.mzInfo.title}}</view>
				</mg-cell>
				<!-- 满返 -->
				<mg-cell v-if="jsInfo.mfInfo.title" last='1' bdmw="180rpx" cname='p15'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c f-g-0">返</view>
						<view>{{jsInfo.mfInfo.name}}</view>
					</view>
					<view slot='ft' class="cf5f">{{jsInfo.mfInfo.title}}</view>
				</mg-cell>
				<!-- 店铺优惠券  -->
				<mg-cell v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1" @tab="tzxqyhq(1)" last='1' cname='p15'
				 :color="kyhb.dpyhq.n>0?tColor:''" arrow='1'>
					<view slot='hd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c">券</view>
						<view>门店代金券</view>
					</view>
					<view slot='ft'>
						<text v-if='couponInfo.store' class="f32 cf5f">-{{sl+yhqPreferential.store}}</text>
						<view v-else-if='kyhb.dpyhq.n>0' class="hongbao bs5 f20 f-y-c"><text class="iconfont iconhb cf mr10 f26"></text>{{kyhb.dpyhq.n}}个可用</view>
						<view v-else-if='kyhb.dpyhq.n==0' class="f24 f-y-c">暂无可用</view>
					</view>
				</mg-cell>
				<!-- 平台优惠券 -->
				<mg-cell v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1" @tab="tzxqyhq(2)" last='1' cname='p15'
				 :color="kyhb.ptyhq.n>0?tColor:''" arrow='1'>
					<view slot='hd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c">券</view>
						<view>{{system.custom.systemRedbag}}</view>
					</view>
					<view slot='ft'>
						<text v-if='couponInfo.platform' class="f32 cf5f">-{{sl+yhqPreferential.platform}}</text>
						<view v-else-if='kyhb.ptyhq.n>0' class="hongbao bs5 f20 f-y-c"><text class="iconfont iconhb cf mr10 f26"></text>{{kyhb.ptyhq.n}}个可用</view>
						<view v-else-if='kyhb.ptyhq.n==0' class="f24 f-y-c">暂无可用</view>
					</view>
				</mg-cell>
				<mg-cell isl='1' cname='p15'>
					<view @click="showyhgz=true" slot='bd' class="f-y-c c9 f24">优惠说明<text class="iconfont iconwen f20 c9 ml10"></text></view>
					<view slot='ft' class="ml10 c3"><text class="f24">共{{carInfo.num}}件商品</text><text class="m02">小计</text><text class="f34">{{sl}}{{xjMoney.total||0}}</text></view>
				</mg-cell>
				<mg-cell v-if="system.taxRatio>0" isl='1' cname='p15'>
					<view slot='bd' class="f-y-c">税率<text class="ml10 c6 f24">({{system.taxRatio}}%)</text></view>
					<view slot='ft' class="f32 c3">+{{sl+(xjMoney.slje||0)}}</view>
				</mg-cell>
			</view>
			<!-- 超值换购
			<!-- <view v-if="orderMuster.changePay&&orderMuster.changePay.goodsArr" class="mt20 p30 bf bs20">
				<view class="p03 mb10 f-y-c">
					<view class="yhic f18 cf bf5f f-c">换</view>
					<view class="">超值换购</view>
					<view v-show="hgInfo.id&&hgInfo.price>hgInfo.money" class="ml20 f22 c9">商品最多可为您节省{{sl+blxs(hgInfo.price-hgInfo.money)}}</view>
				</view>
				<view class='bf f-row o-x-s p13'>
					<view @click="xzhg(v)" class="bf f-g-0 hgic mr30 bs15 b-s-4 f-row p-r" v-for="(v,i) in orderMuster.changePay.goodsArr"
					 :key='i'>
						<view class="hgimg">
							<mg-img :src="v.icon"></mg-img>
							<view class="p-a spzk t0 f18 cf bf5f l-n ">{{Number((v.money/v.price*10).toFixed(2))}}折</view>
						</view>
						<view class='f-1 f-y-bt p-10-15 f24'>
							<view class="t-o-e">{{v.name}}</view>
							<view class="f-y-c">
								<view class="f-1 t-o-e f22">{{sl}}<text class="f28">{{v.money}}</text><text class="t-d-l ml10">{{sl+v.price}}</text></view>
								<text class="iconfont icongx f38 ce mt0 ml10" :class="{'cf5f':hgInfo.id==v.id}"></text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<!-- -->
			<view class="mt30 p03 bf bs20">
				<mg-cell @tab="go({t:1,url:'/yb_wm/shop/out/bz?color=#FE6E00&note='+params.userNote})" isl='1' cname='p30' btt='备注'
				 bttc="f30" bdmw='100rpx' :ft="params.userNote||'请填写你的其他要求'" arrow='1'></mg-cell>
			</view>
		</view>
		<view v-if="carInfo.data.length" class="foot-btnc" :style="{bottom: isIpx?'40rpx':0}">
			<button @click="ljzf" :loading="loading" :disabled="loading" class="foot-btn b-l-f0f0" hover-class="btnhc">确认下单</button>
		</view>
		<!-- <view class="dbbtnc" :style="{bottom: isIpx?'40rpx':0}">
			<view class="dbbtn">
				<view class="f-g-1 lt f-c-xc">
					<view class=""><text class="mr10">合计</text><text class="f36">{{sl}}{{jsInfo.hjMoney||0}}</text></view>
					<view class="f-y-c f22 c9">
						<view>为您节省</view>
						<view>{{sl}}{{jsInfo.yhzj||0}}</view>
					</view>
				</view>
				<button :disabled="loading" :loading="loading" @click="ljzf" class="rt f-c" :style="{background:tColor}">立即支付</button>
			</view>
		</view> -->
		<view v-if="isIpx" class='bgf'></view>
		<!-- 优惠规则 -->
		<mg-modal :ismr="true" v-model="showyhgz" width="630rpx" :z-index="3000">
			<view class="bf bs10">
				<view class="p3 c9">
					<view class="t-c f32 c0 mb20">优惠规则详情</view>
					<view v-if="carInfo.reduce>0" class="p10 f-y-c">
						<view class="f-1">满减</view>
						<view>-{{sl+carInfo.reduce}}</view>
					</view>
					<view v-if="orderMuster.newReduction>0" class="p10 f-y-c">
						<view class="f-1">新客立减</view>
						<view>-{{`${sl+orderMuster.newReduction}`}}</view>
					</view>
					<view class="p10 f-y-c">
						<view class="f-1">门店代金券抵扣</view>
						<view>-{{`${sl+yhqPreferential.store}`}}</view>
					</view>
					<view v-if="carInfo.vipDiscount>0" class="p10 f-y-c">
						<view class="f-1">会员折扣</view>
						<view>-{{`${sl+carInfo.vipDiscount}`}}</view>
					</view>
					<!-- 
					<view class="p10 f-y-c">
						<view class="f-1">{{system.custom.systemRedbag}}抵扣</view>
						<view>-{{`${sl+yhqPreferential.platform}`}}</view>
					</view> -->
					<!-- <view v-if="params.deliveryMode==1&&params.isOut==1" class="p10 f-y-c">
						<view class="f-1">包装费优惠</view>
						<view>-{{`${sl+carInfo.getTotal.bzf}`}}</view>
					</view> -->
					<view class="p10 f-y-c c0">
						<view class="f-1">总计</view>
						<view>-{{`${sl+jsInfo.yhzj}`}}</view>
					</view>
				</view>
				<view class="hlt" style="height: 100rpx;">
					<button hover-class='be' class="tcbtn f-1 bf h100 f28 f-c cf70" @click.stop="showyhgz=false">我知道了</button>
				</view>
			</view>
		</mg-modal>
		<!-- <load v-if="showLoading"></load> -->
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/third/uni-notice-bar.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	import mgPopup from '@/components/common/popup.vue'
	import bkB from '@/components/common/block-b.vue'
	import sqBtn from '@/components/common/sq-btn.vue'
	import mgRadio from '@/components/form/mg-radio.vue'
	import mgAgree from '@/components/form/mg-agree.vue'
	import mgModal from '@/components/common/modal.vue'
	import load from '@/components/common/load.vue'
	import numberBox from "@/components/form/number-box.vue"
	let app = getApp().globalData
	export default {
		name: 'pay-order',
		components: {
			uniNoticeBar,
			mgPopup,
			bkB,
			sqBtn,
			mgRadio,
			mgAgree,
			mgModal,
			load,
			numberBox,
		},
		data() {
			return {
				showLoading: false,
				tableInfo: {},
				closePay: false,
				showPay: false,
				carInfo: {
					data: []
				},
				ModeArr: [],
				wmAddress: '',
				params: {
					deliveryMode: '1', //自提传1 其他不传
					couponId: {
						store: '',
						platform: '',
					},
					people: 0,
					storeId: '',
					tableId: '',
					userNote: '',
					eatType: '',
				},
				loading: false,
				payObj: {},
				showTime: false,
				wmIndex: 0,
				wmTime: [],
				yjIndex: 0,
				yjTime: [],
				rsiv: '',
				yjrV: {},
				deliveryPreferential: 0, //配送费优惠
				yhqPreferential: {
					store: 0,
					platform: 0,
				}, //优惠券优惠
				kyhb: {
					dpyhq: {
						n: 0,
						data: []
					},
					ptyhq: {
						n: 0,
						data: []
					}
				},
				couponInfo: {
					store: '',
					platform: '',
				},
				orderMuster: {}, //下单必查
				ztTypeArr: [],
				agree: true,
				showyhgz: false,
				hgInfo: {},
				sjxx: {},
				pcarList:[],
			}
		},
		async onLoad(options) {
			// return
			this.getSystem()
			this.util.setNT('提交订单')
			this.sjxx = uni.getStorageSync('carInfo').sjxx
			this.tableInfo = JSON.parse(decodeURIComponent(options.tableInfo))
			this.params.people = this.tableInfo.pnum || 3
			this.params.storeId = this.tableInfo.storeId
			this.params.tableId = this.tableInfo.tableId
			this.params.eatType = this.sjxx.moreSet.payMode
			this.supdCarbp = {
				storeId: this.tableInfo.storeId,
				tableId: this.tableInfo.tableId,
				item: 2,
				key: 'ins',
				mask: 1,
			}
			this.getGoodsArr()
			console.log('payorder', this.tableInfo, this.sjxx)
			//订单设置
			this.getOrderset()
			//下单集合接口
			this.getOrderMuster()
			//获取可用红包
			this.getyhqArr()
			//监听事件
			uni.$on('payorder', (e) => {
				if (e.hasOwnProperty('hbInfo')) {
					if (e.type == 1) {
						this.couponInfo.store = e.hbInfo || ''
						this.params.couponId.store = this.couponInfo.store ? this.couponInfo.store.id : ''
					} else if (e.type == 2) {
						this.couponInfo.platform = e.hbInfo || ''
						this.params.couponId.platform = this.couponInfo.platform ? this.couponInfo.platform.id : ''
					}
				}
				console.log('payorderEl', e)
			})
			setTimeout(() => {
				this.isOnLoad = true
			})
		},
		onUnload() {
			// console.log('onUnload')
			// 移除监听事件  
			uni.$off('payorder');
		},
		onShow() {
			if (this.isOnLoad) {}
			// console.log('pay-order onShow', 'addresInfo', app.xzdzInfo, uni.getStorageSync('bdhc'))
		},
		mixins: [utilMixins],
		computed: {
			...mapState(['scarList']),
			...mapState({
				orderset: state => state.config.orderset,
			}),
			...mapState('dndc', ['latLng']),
			xjMoney() {
				if (this.carInfo.price) {
					let spjmj = +(this.carInfo.oldPrice - this.carInfo.boxMoney - this.carInfo.reduce).toFixed(2), //商品总金额先减掉满减
						newReduction = this.orderMuster.newReduction || 0 //新客金额
					newReduction = 0
					let yhqMoney = 0, //优惠券
						ptqMoney = 0
					if (this.couponInfo.store && (this.orderMuster.newReduction <= 0 || this.orderMuster.newandcoupon == 1)) { //新客=0或者新客立减和优惠券可以一起用
						if (this.couponInfo.store.type == 1 || this.couponInfo.store.type == 3) {
							yhqMoney = +this.couponInfo.store.money || 0
						} else if (this.couponInfo.store.type == 2) {
							// yhqMoney = +(spjmj - utils.nsswr(spjmj * this.couponInfo.store.discount / 10)).toFixed(2) //后台是截取保留2位
							yhqMoney = +this.couponInfo.store.money
						}
						yhqMoney < 0 && (yhqMoney = 0)
						// console.log(yhqMoney)
					}
					if (this.couponInfo.platform && (this.orderMuster.newReduction <= 0 || this.orderMuster.newandcoupon == 1)) { //新客=0或者新客立减和优惠券可以一起用
						if (this.couponInfo.platform.type == 1) {
							ptqMoney = +this.couponInfo.platform.money || 0
						} else if (this.couponInfo.platform.type == 2) {
							ptqMoney = +this.couponInfo.platform.money
						}
						ptqMoney < 0 && (ptqMoney = 0)
					}
					// let bzf = +this.carInfo.boxMoney || 0,
					let bzf = 0,
						zwf = this.blxs(this.sjxx.moreSet.serviceType == 1 ? this.params.people * this.sjxx.moreSet.serviceMoney : this.sjxx
							.moreSet.serviceMoney),
						total = 0,
						slje = 0,
						jpsfqMoney = +(spjmj - yhqMoney - ptqMoney - newReduction).toFixed(2) //计算满减配送费前，所有优惠算完了的金额
					this.deliveryPreferential = 0 //因为可以选优惠券，所以这里重新赋值
					jpsfqMoney <= 0 && (jpsfqMoney = 0.01)
					//配送费是最后加，不参与任何优惠,+包装费
					total = +(jpsfqMoney + bzf + zwf).toFixed(2)
					total <= 0 && (total = 0.01)
					this.yhqPreferential.store = yhqMoney
					this.yhqPreferential.platform = ptqMoney
					//税率
					if (this.system.taxRatio > 0) {
						slje = +(total * (this.system.taxRatio / 100)).toFixed(2)
					}
					// console.log(spjmj, yhqMoney, ptqMoney, newReduction, jpsfqMoney, total, zwf, slje)
					return {
						total,
						slje,
						bzf,
						zwf,
					}
				}
			},
			jsInfo() {
				if (this.carInfo.price) {
					//优惠价格=购物车原价+应付配送费的钱-实付的钱
					let yhzj = +this.carInfo.oldPrice + this.xjMoney.zwf - (this.params.deliveryMode == 2 && this.wmAddress ? Number(
							this.deliveryPreferential > 0 ? this.wmAddress.oldMoney : this.wmAddress.deliveryMoney) : 0) - this.xjMoney.total,
						hjMoney = this.xjMoney.total + this.xjMoney.slje,
						mzInfo = {}, //满赠
						mfInfo = {} //满返
						yhzj += +this.carInfo.vipDiscount
					let mzitem = this.sjxx.discount.give.moneyArr && this.sjxx.discount.give.moneyArr.find(v =>
						this.xjMoney.total >= v.fullMoney)
					// mzitem && (mzInfo = {
					// 	name: '满赠优惠',
					// 	title: `${mzitem.give}`
					// })
					if (this.xjMoney.total >= this.sjxx.discount.grantCoupon.orderMoney) {
						mfInfo = {
							name: `满返门店代金券`,
							title: this.sjxx.discount.grantCoupon.name
						}
					}
					if (this.hgInfo.id) {
						hjMoney = +this.hgInfo.money + hjMoney
					}
					// console.log(this.carInfo.sjxx.discount.give, mzitem, mzInfo, hjMoney)
					return {
						yhzj: +yhzj.toFixed(2),
						hjMoney: +(hjMoney).toFixed(2),
						mzInfo,
						mfInfo,
					}
				}
			},
		},
		methods: {
			...mapActions(["getConfig", "getMycar", ]),
			...mapMutations(["setScarList"]),
			bindChange(value) {
				this.params.people = value
			},
			clickMode(v) {
				if (v.value == this.params.deliveryMode) return
				this.util.showLoading('设置中...')
				this.params.deliveryMode = v.value
				this.getWmAddress()
				// console.log(v, this.params)
			},
			clickztMode(v) {
				this.params.isOut = v.value
			},
			setTel(e) {
				this.params.userTel = e
			},
			async getGoodsArr() {
				await this.getMycar(this.supdCarbp)
				this.carInfo = this.scarList.ins
				let arr = []
				for (let i in this.carInfo.data) {
					if (this.carInfo.data[i].originalNum > 0) {
						arr.push(Object.assign({
							ishd: 0,
							spnum: this.carInfo.data[i].originalNum
						}, this.carInfo.data[i]))
					}
					if (this.carInfo.data[i].discountNum > 0) {
						arr.push(Object.assign({
							ishd: 1,
							spnum: this.carInfo.data[i].discountNum
						}, this.carInfo.data[i]))
					}
				}
				this.pcarList = arr
				let num = 0
				this.scarList.ins.data.forEach(v => {
					num += +v.num
				})
				this.carInfo.num = num
				this.showLoading = true
			},
			async getOrderset() {
				// let data = this.carInfo.sjxx.moreSet,
				// 	support = this.carInfo.sjxx.outSet
				// this.params.deliveryMode = this.carInfo.buyType == 1 ? 2 : 1
				// //设置自提类型
				// if (![].includes('1')) {
				// 	this.ztTypeArr.push({
				// 		value: '1',
				// 		name: '店内就餐',
				// 		icon: 'icondianneitubiao f36',
				// 	})
				// }
				// if (![].includes('2')) {
				// 	this.ztTypeArr.push({
				// 		value: '2',
				// 		name: '打包带走',
				// 		icon: 'icondabao f42',
				// 	})
				// }
				// this.ztTypeArr[0] && (this.params.isOut = this.ztTypeArr[0].value)
				this.getConfig({
					key: 'orderset',
					api: 'ddsz',
				}).then(() => {
					uni.setStorageSync('fwb', this.orderset.selfAgreement)
				})
				// console.log('getOrdersetgetOrderset')
			},
			tzxqyhq(t) {
				// console.log(this.kyhb)
				// return
				if (t == 1) {
					uni.setStorageSync('kyhb', this.kyhb.dpyhq)
					this.go({
						t: 1,
						url: '/yb_wm/my/coupon/use-coupon?t=1&name=门店代金券&couponId=' + this.params.couponId.store
					})
				} else if (t == 2) {
					uni.setStorageSync('kyhb', this.kyhb.ptyhq)
					this.go({
						t: 1,
						url: '/yb_wm/my/coupon/use-coupon?t=2&name=' + this.system.custom.systemRedbag + '&couponId=' + this.params.couponId
							.platform
					})
				}
			},
			async getyhqArr() {
				uni.setStorageSync('kyhb', {
					n: 0,
					data: []
				})
				let arr = await Promise.all([this.util.request({
					'url': this.api.kyyhq,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
						tableId: this.params.tableId,
						type: 2,
						storeType: 1,
					}
				}), this.util.request({
					'url': this.api.kyyhq,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
						tableId: this.params.tableId,
						type: 2,
						storeType: 2,
					}
				})])
				this.kyhb = {
					dpyhq: {
						n: arr[0].data.length,
						data: arr[0].data,
					},
					ptyhq: {
						n: arr[1].data.length,
						data: arr[1].data,
					},
				}
				// console.log(arr)
				uni.hideLoading()
			},
			async getOrderMuster() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wmxdbd,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
						orderType: 2,
						userId: this.uId,
					}
				})
				this.orderMuster = data || {
					newReduction: 0
				}
			},
			itemTotal(m, n) {
				return this.blxs(m * n)
			},
			xzhg(v) {
				this.hgInfo = v.id == this.hgInfo.id ? {} : v
			},
			//
			async ljzf() {
				// if (!utils.isTelCode(this.params.userTel)) {
				// 	return this.util.message('请输入合理的预留手机号', 3)
				// } else if (!this.agree) {
				// 	return this.util.message('请阅读并同意服务协议', 3)
				// }
				this.loading = true
				let bxpres = await this.util.request({
					'url': this.api['tspdbxp'],
					method: 'POST',
					ct: 1,
					mask: 1,
					data: {
						storeId: this.params.storeId,
						item: 2,
						tableId: this.params.tableId,
					},
				})
				if (!bxpres) {
					this.loading = false
					return
				}
				await this.getGoodsArr()
				// await this.requestSM('inStoreOrder')
				// if (!this.jjmbxx) {
				// 	try {
				// 		await this.requestSM('saveOrder')
				// 	} catch (e) {
				// 		this.jjmbxx = true
				// 		this.loading = false
				// 		return
				// 	}
				// }
				//换购
				if (this.hgInfo.id) {
					this.params.changeId = this.orderMuster.changePay.id
					this.params.changeGoodsId = this.hgInfo.id
				}
				// console.log(this.params)
				// return
				let orderRes = await this.util.request({
					'url': this.api['tsxdd'],
					method: 'POST',
					ct: 1,
					mask: '下单中',
					data: this.params,
				})
				// console.log('ljzf orderRes', orderRes)
				if (orderRes) {
					this.util.message('下单成功', 1)
					// let lastPage = this.util.getPage()
					// lastPage.$vm.refreshInfo() //刷新点单页数据
					if (this.params.eatType == 1) {
						this.go({
							t: 3,
							url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
								orderId: orderRes.data,
								orderType: 7,
								info: {
									money: this.jsInfo.hjMoney,
									storeName: this.sjxx.shopData.name,
									type: "堂食下单支付",
									go: {
										t: 3,
										url: '/yb_wm/shop/in/order-dl?id=' + orderRes.data,
									},
								}
							}))
						})
					} else if (this.params.eatType == 2) {
						this.go({
							t: 3,
							url: 'order-dl?id=' + orderRes.data,
						})
					}
				} else {
					this.loading = false
				}
			},
		},
		async created() {},
	}
</script>
<style>
	.p15 {
		padding: 12rpx 0;
	}
</style>
<style scoped lang="scss">
	.header {
		// padding-bottom: 55rpx;

		.psmsc {
			right: 30rpx;
			top: 26rpx;
			height: 66rpx;
			padding: 0 6rpx;
			border-radius: 60rpx;

			.psms {
				border-radius: 66rpx;
				height: 56rpx;
				padding: 0 10rpx;
				min-width: 90rpx;
			}
		}
	}

	.pstypec {
		width: 330rpx;
		height: 95rpx;
		border: 1rpx solid #333;
		position: relative;
	}

	.yddsj {
		right: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-bottom: 41rpx solid #fff;
		border-left: 46rpx solid transparent;
	}

	.gou {
		right: 4rpx;
		bottom: 3rpx;
	}

	.mainc {
		padding: 30rpx;
		// margin-top: -55rpx;
	}

	.hdwith {
		width: 100rpx;
	}

	.dbbtnc {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 0rpx;
		// background: rgba(255, 255, 255, 0.2);

		.dbbtn {
			height: 104rpx;
			border-radius: 0rpx;
			overflow: hidden;
			display: flex;
			box-shadow: 0rpx 8rpx 18rpx 5rpx rgba(221, 221, 221, 0.9);

			.lt {
				color: #333;
				padding: 0 30rpx 0 30rpx;
				background: #fff;
			}

			.rt {
				color: #fff;
				width: 179rpx;
				height: 100%;
				border-radius: 0;
				font-size: 28rpx;
				padding: 0;
			}
		}
	}

	.mt20 {
		margin-top: 18rpx;
	}

	.hgic {
		width: 382rpx;
		height: 140rpx;

		.hgimg {
			width: 140rpx;
			height: 140rpx;
		}

		.spzk {
			border-bottom-right-radius: 15rpx;
			padding: 5rpx 14rpx;
		}
	}
</style>
