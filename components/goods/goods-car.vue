<template>
	<view v-if="type==1||type==2">
		<view v-show="cshow" class="posi-f carc1 c9 f22" :style="[{bottom:carBtm+'rpx'},sname]">
			<!-- 满减 -->
			<view v-show="!showCar&&mjInfo.discount.length" class="mjts cartopmj cf5f">
				<text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
				<block v-else>
					<text v-for="(v,i) in mjInfo.discount" :key='i'>满{{v.fullMoney}}减{{v.money}}<text
							v-if="i<mjInfo.discount.length-1" class="m01">,</text></text>
				</block>
			</view>
			<view class="car posi-r f-row">
				<view @click="openCar" class="f-g-1 carb f-row">
					<view class="carb-img posi-r f-c animated" :class="{'bounceIn':carList.length}">
						<view class="carb-i bsf bf f-c">
							<text class="iconfont iconshangpin c0 f42"></text>
						</view>
						<view class="posi-a dot bsf f-c" v-if="carList.length" :style="{background:tColor}">
							{{getTotal.num}}
						</view>
					</view>
					<view class="f-c-xc">
						<view>
							<text v-if="carList.length" class="f34 c3">{{sl+carPrice.nowPrice}}</text>
							<text v-else class="f28">未选购商品</text>
							<text v-if="carPrice.reduceMoney>0" class="ml10 t-d-l">{{sl+getTotal.total}}</text>
						</view>
						<view class="">
							<text
								v-if="buytype==1">另需配送费{{sl+Number(Number(sjxx.shopData.distribution.money).toFixed(2))}}</text>
							<text v-if="buytype==1&&havezq" class="m01">|</text>
							<text v-if="havezq&&type==1">支持自取</text>
						</view>
					</view>
				</view>
				<view @click="goPay()" class="f-g-0 carf f-c"
					:style="{background:qsText.reach?tColor:'#999',border:qsText.reach?`1rpx solid ${tColor}`:'',}">
					<view class="f32 cf">{{qsText.text}}</view>
					<!-- <sq-btn @refresh='goPay()' v-else :storeid='sjxx.shopData.id' :cname="`f32 cf`" h='105' :t='qsText.text'></sq-btn> -->
				</view>
			</view>
		</view>
		<!-- 关店 -->
		<view v-show="xxshow" class="posi-f closec" :style="{bottom:carBtm+'rpx'}">
			<view class="h100 f34 cf f-c-c">
				<view class="t-c">{{sjxx.shopData.storeOpen == 3?'门店已打烊':sjxx.moreSet.status == 1?'门店接受预定中':'门店休息中'}}
				</view>
				<view class="f24" style="color: #ccc;" v-if='sjxx.shopData.storeOpen == 2'>营业时间：{{yysj}}</view>
			</view>
			<view v-if="sjxx.shopData.storeOpen==2&&sjxx.moreSet.status == 1" class="p-a r0 t0 f-c p-10-15"
				@click="ydshow=false">
				<text class=" iconfont iconyx cf f36"></text>
			</view>
		</view>
		<!-- 购物车弹窗:style="{background:`rgba(${colorToRGB(tColor)},0.5)`}" -->
		<mg-popup v-model="showCar">
			<view v-show="mjInfo.discount.length" class="mjts cf5f">
				<text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
				<block v-else>
					<text v-for="(v,i) in mjInfo.discount" :key='i'>满{{v.fullMoney}}减{{v.money}}<text
							v-if="i<mjInfo.discount.length-1" class="m01">,</text></text>
				</block>
			</view>
			<view class="carlistc p03 bf" :style="{paddingBottom:carlistPab+'rpx'}">
				<mg-cell isl='1' cname='p30'>
					<view slot='bd' class="f-y-c">
						<text class="f24">已选商品</text>
					</view>
					<view @click="clearCar" class="f-y-c f24 c9" slot='ft'>清空购物车</view>
				</mg-cell>
				<scroll-view class="p0 carbody" scroll-y>
					<mg-cell v-for="(v,i) in carList" :key="i" w='136' h='136' :img='v.icon' brs='5rpx'
						cname='p30 la124' :last="i==carList.length-1">
						<template slot='bd'>
							<view class="t-o-e f30">{{v.name}}</view>
							<view class="f24 c9 f-raw">
								<text class="" v-if="v.groupName">{{v.groupName}}</text>
								<text v-if="v.attribute">({{v.attribute}})</text>
								<text class="ml10" v-if="v.materialName">+{{v.materialName}}</text>
							</view>
							<view v-if="v.discountNum>0" :style="{color:tColor}" class="f-row mt10">
								<view class="f20 bs5 b-d p-3-10" :style="{borderColor:tColor}">
									{{v.discountType==1?'特价':v.discountType==2?'折扣':v.discountType==3?'立减':v.discountType==4?'第二件打折':'买一送一'}}
								</view>
							</view>
							<view class="f-x-bt mt10">
								<view class="f-g-0 f30">{{sl+v.totalMoney}}<text v-if="v.discountNum>0"
										class="t-d-l ml10 c9 f26">{{sl+blxs(v.num*v.money)}}</text></view>
								<add-goods :addgb="addgb" :isprice='0' :showspec='false' addwz='2' @add='add($event,v)'
									@dec='dec($event,v)' :co='v' cname="f-g-0 mt10"></add-goods>
							</view>
						</template>
					</mg-cell>
				</scroll-view>
				<view class="f-y-c p30 hlt f30">
					<view style="width: 156rpx;">包装费</view>
					<view>
						<view v-show="getTotal.bzf>=0" @click="go({t:1,url:'/yb_wm/shop/out/bzf'})">
							<text class="">{{sl+getTotal.bzf}}</text>
							<text class='iconfont iconwen f24 m01'></text>
						</view>
						<view class="f20 c9">包装费不参与满减</view>
					</view>
				</view>
			</view>
		</mg-popup>
		<sq-btn @refresh='goPay()' type="4" v-model="showSqtel"></sq-btn>
	</view>
	<view v-else-if="type==3">
		<view v-show="cshow" class="posi-f carc2 cf f22" :style="[{bottom:carBtm+'rpx'},sname]">
			<!-- 满减 -->
			<view v-show="!showCar&&mjInfo.discount.length" class="mjts cartopmj2 cf5f">
				<text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
				<block v-else>
					<text v-for="(v,i) in mjInfo.discount" :key='i'>满{{v.fullMoney}}减{{v.money}}<text
							v-if="i<mjInfo.discount.length-1" class="m01">,</text></text>
				</block>
			</view>
			<view class="car posi-r f-row">
				<view @click="openCar" class="f-g-1 carb f-row" style="background: #393939;">
					<view class="carb-img posi-r f-c animated" :class="{'bounceIn':carList.length}">
						<text class="iconfont icongwc2 cf f46"></text>
						<view class="posi-a dot f-c" v-if="carList.length" :style="{background:tColor}">{{getTotal.num}}
						</view>
					</view>
					<view class="f-c-xc ml30">
						<view>
							<text v-if="carList.length" class="wei f34 cf">{{sl+carPrice.nowPrice}}</text>
							<text v-else class="f28">未选购商品</text>
							<text v-if="carPrice.reduceMoney>0" class="ml10 t-d-l">{{sl+getTotal.total}}</text>
						</view>
					</view>
				</view>
				<view @click="goPay" class="f-g-0 carf f-c"
					:style="{background:qsText.reach?tColor:'#323232',border:qsText.reach?`1rpx solid ${tColor}`:'',}">
					<view class="f28">{{qsText.text}}</view>
				</view>
			</view>
		</view>
		<view v-show="xxshow" class="posi-f closec" :style="{bottom:carBtm+'rpx'}">
			<view class="h100 f34 cf f-c-c">
				<view class="t-c">{{sjxx.shopData.storeOpen == 3?'门店已打烊':sjxx.moreSet.status == 1?'门店接受预定中':'门店休息中'}}
				</view>
				<view class="f24" style="color: #ccc;" v-if='sjxx.shopData.storeOpen == 2'>营业时间：{{yysj}}</view>
			</view>
		</view>
		<mg-popup v-model="showCar">
			<view v-show="mjInfo.discount.length" class="mjts cf5f">
				<text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
				<block v-else>
					<text v-for="(v,i) in mjInfo.discount" :key='i'>满{{v.fullMoney}}减{{v.money}}<text
							v-if="i<mjInfo.discount.length-1" class="m01">,</text></text>
				</block>
			</view>
			<view class="carlistc p03 bf" :style="{paddingBottom:carlistPab+'rpx'}">
				<mg-cell isl='1' cname='p30'>
					<view slot='bd' class="f-y-c">
						<text class="f24">已选商品</text>
					</view>
					<!-- <view @click="clearCar" class="f-y-c f24 c9" slot='ft'>清空购物车</view> -->
				</mg-cell>
				<scroll-view class="p0 carbody" scroll-y>
					<mg-cell v-for="(v,i) in carList" :key="i" w='136' h='136' :img='v.icon' brs='5rpx'
						cname='p30 la124' :last="i==carList.length-1">
						<template slot='bd'>
							<view class="t-o-e f30">{{v.name}}</view>
							<view class="f24 c9 f-raw">
								<text class="" v-if="v.groupName">{{v.groupName}}</text>
								<text v-if="v.attribute">({{v.attribute}})</text>
								<text class="ml10" v-if="v.materialName">+{{v.materialName}}</text>
							</view>
							<view v-if="v.discountNum>0" :style="{color:tColor}" class="f-row mt10">
								<view class="f20 bs5 b-d p-3-10" :style="{borderColor:tColor}">
									{{v.discountType==1?'特价':v.discountType==2?'折扣':v.discountType==3?'立减':v.discountType==4?'第二件打折':'买一送一'}}
								</view>
							</view>
							<view class="f-x-bt mt10">
								<view class="f-g-0 f30">{{sl+itemTotal(v)}}</view>
								<add-goods :addgb="addgb" :isprice='0' :showspec='false' addwz='2' @add='add($event,v)'
									@dec='dec($event,v)' :co='v' cname="f-g-0 mt10"></add-goods>
							</view>
						</template>
					</mg-cell>
				</scroll-view>
			</view>
		</mg-popup>
		<sq-btn @refresh='goPay' type="4" v-model="showSqtel"></sq-btn>
	</view>
	<view v-else-if="type==4">
		<view v-show="cshow && showCar" class="posi-f carc1 c9 f22" :style="[{bottom:carBtm+'rpx'},sname]">
			<view v-show="!showCar&&mjInfo.discount.length" class="mjts cartopmj cf5f">
				<text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
				<block v-else>
					<text v-for="(v,i) in mjInfo.discount" :key='i'>满{{v.fullMoney}}减{{v.money}}<text
							v-if="i<mjInfo.discount.length-1" class="m01">,</text></text>
				</block>
			</view>
			<view class="car posi-r f-row">
				<view @click="openCar" class="f-g-1 carb f-row">
					<view class="carb-img posi-r f-c animated" :class="{'bounceIn':carList.length}">
						<view class="carb-i bsf bf f-c">
							<text class="iconfont iconshangpin c0 f42"></text>
						</view>
						<view class="posi-a dot bsf f-c" v-if="carList.length" :style="{background:tColor}">
							{{getTotal.num}}
						</view>
					</view>
					<view class="f-c-xc">
						<view>
							<text v-if="carList.length" class="f34 c3">{{sl+carPrice.nowPrice}}</text>
							<text v-else class="f28">未选购商品</text>
							<text v-if="carPrice.reduceMoney>0" class="ml10 t-d-l">{{sl+getTotal.total}}</text>
						</view>
						<view class="">
							<text
								v-if="buytype==1">另需配送费{{sl+Number(Number(sjxx.shopData.distribution.money).toFixed(2))}}</text>
							<text v-if="buytype==1&&havezq" class="m01">|</text>
							<text v-if="havezq&&type==1">支持自取</text>
						</view>
					</view>
				</view>
				<view @click="goPay()" class="f-g-0 carf f-c"
					:style="{background:qsText.reach?tColor:'#999',border:qsText.reach?`1rpx solid ${tColor}`:'',}">
					<view class="f32 cf">{{qsText.text}}</view>
				</view>
			</view>
		</view>
		<!-- 关店 -->
		<view v-show="xxshow" class="posi-f closec" :style="{bottom:carBtm+'rpx'}">
			<view class="h100 f34 cf f-c-c">
				<view class="t-c">{{sjxx.shopData.storeOpen == 3?'门店已打烊':sjxx.moreSet.status == 1?'门店接受预定中':'门店休息中'}}
				</view>
				<view class="f24" style="color: #ccc;" v-if='sjxx.shopData.storeOpen == 2'>营业时间：{{yysj}}</view>
			</view>
			<view v-if="sjxx.shopData.storeOpen==2&&sjxx.moreSet.status == 1" class="p-a r0 t0 f-c p-10-15"
				@click="ydshow=false">
				<text class=" iconfont iconyx cf f36"></text>
			</view>
		</view>
		<!-- 购物车弹窗:style="{background:`rgba(${colorToRGB(tColor)},0.5)`}" -->
		<mg-popup v-model="showCar">
			<view v-show="mjInfo.discount.length" class="mjts cf5f">
				<text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
				<block v-else>
					<text v-for="(v,i) in mjInfo.discount" :key='i'>满{{v.fullMoney}}减{{v.money}}<text
							v-if="i<mjInfo.discount.length-1" class="m01">,</text></text>
				</block>
			</view>
			<view class="carlistc p03 bf" :style="{paddingBottom:carlistPab+'rpx'}">
				<mg-cell isl='1' cname='p30'>
					<view slot='bd' class="f-y-c">
						<text class="f24">已选商品</text>
					</view>
					<view @click="clearCar" class="f-y-c f24 c9" slot='ft'>清空购物车</view>
				</mg-cell>
				<scroll-view class="p0 carbody" scroll-y>
					<mg-cell v-for="(v,i) in carList" :key="i" w='136' h='136' :img='v.icon' brs='5rpx'
						cname='p30 la124' :last="i==carList.length-1">
						<template slot='bd'>
							<view class="t-o-e f30">{{v.name}}</view>
							<view class="f24 c9 f-raw">
								<text class="" v-if="v.groupName">{{v.groupName}}</text>
								<text v-if="v.attribute">({{v.attribute}})</text>
								<text class="ml10" v-if="v.materialName">+{{v.materialName}}</text>
							</view>
							<view v-if="v.discountNum>0" :style="{color:tColor}" class="f-row mt10">
								<view class="f20 bs5 b-d p-3-10" :style="{borderColor:tColor}">
									{{v.discountType==1?'特价':v.discountType==2?'折扣':v.discountType==3?'立减':v.discountType==4?'第二件打折':'买一送一'}}
								</view>
							</view>
							<view class="f-x-bt mt10">
								<view class="f-g-0 f30">{{sl+v.totalMoney}}<text v-if="v.discountNum>0"
										class="t-d-l ml10 c9 f26">{{sl+blxs(v.num*v.money)}}</text></view>
								<add-goods :addgb="addgb" :isprice='0' :showspec='false' addwz='2' @add='add($event,v)'
									@dec='dec($event,v)' :co='v' cname="f-g-0 mt10"></add-goods>
							</view>
						</template>
					</mg-cell>
				</scroll-view>
				<view class="f-y-c p30 hlt f30">
					<view style="width: 156rpx;">包装费</view>
					<view>
						<view v-show="getTotal.bzf>=0" @click="go({t:1,url:'/yb_wm/shop/out/bzf'})">
							<text class="">{{sl+getTotal.bzf}}</text>
							<text class='iconfont iconwen f24 m01'></text>
						</view>
						<view class="f20 c9">包装费不参与满减</view>
					</view>
				</view>
			</view>
		</mg-popup>
		<sq-btn @refresh='goPay()' type="4" v-model="showSqtel"></sq-btn>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import addGoods from '@/components/goods/add-goods.vue'
	import mgPopup from '@/components/common/popup.vue'
	import utils from '@/common/utils'
	import sqBtn from '@/components/common/sq-btn.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'goods-car',
		components: {
			addGoods,
			mgPopup,
			sqBtn,
		},
		props: {
			type: {
				type: String,
				default: '1'
			},
			cName: {
				type: String,
				default: ''
			},
			sname: '',
			carBtm: {
				type: [String, Number],
				default: ''
			},
			carlistPab: { //购物车弹窗每个页面距离底部距离
				type: [String, Number],
				default: ''
			},
			zIndex: {
				type: Number,
				default: 999
			},
			ingopay: { //是否触发内部结算方法
				type: String,
				default: '1'
			},
			buytype: {
				type: Number,
				default: 2
			},
			sjxx: {
				type: Object,
				default () {
					return {}
				}
			},
			goodsList: {
				type: Array,
				default () {
					return []
				}
			},
			startmoney: {
				type: [String, Number],
				default: ''
			},
			show: Boolean,
			outin: {
				type: String,
				default: '1'
			},
			tableinfo: '',
		},
		data() {
			return {
				showCar: false,
				ydshow: true,
				showSqtel: false,
			}
		},
		watch: {
			showCar(nval) {
				this.$emit('update:show', nval)
			},
			show(nval) {
				if (nval) this.showCar = nval
			},
			mjInfo: {
				handler(newVal) {
					if (newVal.discount.length > 0) {
						this.$emit('hasmj', true)
					}
					// console.log('mjInfo newVal', newVal)
				},
				immediate: true
			},
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				vscarList: state => state.scarList,
				// carList: state => state.scarList.data || [],
			}),
			scarList() {
				if (this.outin == 1) {
					return this.vscarList.out
				} else if (this.outin == 3) {
					return this.vscarList.fast
				} else if (this.outin == 2) {
					return this.vscarList.ins
				}
			},
			carList() {
				return this.scarList.data || []
			},
			yysj() {
				let text = ''
				let info = this.sjxx.moreSet
				if (info.timeType == 1) {
					text = '24小时营业'
				} else if (info.timeType == 2 && info.timeArr) {
					text = `${info.timeArr[0].startTime}-${info.timeArr[0].ciri?'次日':''}${info.timeArr[0].endTime}`
					if (info.timeArr[1]) {
						text += ' ' +
							`${info.timeArr[1].startTime}-${info.timeArr[1].ciri?'次日':''}${info.timeArr[1].endTime}`
					}
					if (info.timeArr[2]) {
						text += ' ' +
							`${info.timeArr[2].startTime}-${info.timeArr[2].ciri?'次日':''}${info.timeArr[2].endTime}`
					}
				}
				return text
			},
			cshow() {
				// return true
				this.carList.length == 0 && (this.showCar = false)
				if (this.type == 2 || this.type == 3) {
					return this.addgb
				}
				return (this.sjxx.shopData.storeOpen == 1 || this.sjxx.shopData.storeOpen == 2 && this.sjxx.moreSet
						.status == 1) &&
					this.carList.length > 0
			},
			addgb() {
				return this.sjxx.shopData.storeOpen == 1 || this.sjxx.shopData.storeOpen == 2 && this.sjxx.moreSet
					.status == 1
			},
			xxshow() {
				return this.sjxx.shopData.storeOpen != 1 && this.ydshow
			},
			havezq() {
				return this.sjxx.moreSet.distributionSupport && this.sjxx.moreSet.distributionSupport.find(v => v == 2)
			},
			getTotal() {
				let num = 0
				this.carList.forEach(v => {
					num += +v.num
				})
				return {
					total: +this.scarList.oldPrice || 0, //购物车原价
					price: +this.scarList.price,
					spzj: +(this.scarList.oldPrice - this.scarList.boxMoney).toFixed(2),
					bzf: +this.scarList.boxMoney || 0,
					num,
					hyzk: this.blxs(this.scarList.vipDiscount)
				}
			},
			carPrice() {
				let reduceMoney = this.mjInfo.mjMoney
				// console.log('carPrice', {
				// 	reduceMoney,
				// 	nowPrice: +(this.getTotal.total - reduceMoney).toFixed(2)
				// })
				return {
					reduceMoney,
					nowPrice: this.getTotal.price
				}
			},
			mjInfo() {
				let total = this.getTotal.spzj, //商品总计来算满减不包含包装费
					discount = [],
					type = '',
					mjMoney = this.scarList.reduce,
					index = -1,
					text = ''
				if (!this.sjxx.discount.reduce.type) {
					mjMoney = 0
				} else {
					discount = [].concat(this.sjxx.discount.reduce.moneyArr) //倒序最大排在前
					type = this.sjxx.discount.reduce.type
					if (discount.length) {
						if (type == 1) {
							//每满优惠
							// mjMoney = Math.floor(total / discount[0].fullMoney) * discount[0].money
							if (Math.floor(total / discount[0].fullMoney) <= 0) {
								text = `每满${this.sl+discount[0].fullMoney}减${discount[0].money}`
							} else {
								text = `已减${this.sl+mjMoney}`
							}
						} else {
							//多级优惠
							index = discount.findIndex(v => total >= v.fullMoney)
							// index > -1 && (mjMoney = discount[index].money)
							if (index == -1) {
								text =
									`满${this.sl}${discount[discount.length-1].fullMoney}减${this.sl}${discount[discount.length-1].money},还差${this.sl}${(discount[discount.length-1].fullMoney-total).toFixed(2)}`
							} else if (index == 0) {
								text = `已减${this.sl+mjMoney}`
							} else if (index > 0) {
								text =
									`已减${this.sl+mjMoney},再满${this.sl+discount[index-1].fullMoney}减${this.sl+discount[index-1].money}`
							}
						}
					}
				}
				if (this.buytype == 1 && +this.startMoney > this.getTotal.total) {
					text = `还差${this.sl}${(+this.startMoney-this.getTotal.total).toFixed(2)}起送`
				}
				// console.log('mjInfo', this.sjxx, discount, type, mjMoney, index, text, {
				// 	mjMoney,
				// 	text,
				// 	discount: [].concat(discount).reverse()
				// })
				return {
					mjMoney,
					text,
					discount: [].concat(discount).reverse()
				}
			},
			startMoney() {
				// console.log('startMoney', this.startmoney, this.sjxx.shopData.distribution.startMoney)
				return this.startmoney || this.sjxx.shopData.distribution.startMoney
			},
			qsText() {
				let totalPrice = this.getTotal.total,
					qsj = +this.startMoney,
					text = '',
					reach = false
				if (this.type <= 2 || this.type == 4) {
					if (totalPrice <= 0 || !this.carList.length) {
						text = this.buytype == 1 ? this.sl + qsj + '起送' : '去下单';
					} else if (totalPrice < qsj && this.buytype == 1) {
						let diff = +(qsj - totalPrice).toFixed(2);
						text = `差${this.sl}` + diff + '起送';
					} else {
						text = '去结算';
						reach = true
					}
				} else if (this.type == 3) {
					reach = true
					if (totalPrice <= 0 || !this.carList.length) {
						text = '查看购物车';
					} else {
						text = '选好了';
					}
				}
				return {
					text,
					reach
				}
				// console.log('起送价', totalPrice, qsj, this.getTotal, text)
			},
		},
		methods: {
			...mapMutations(["setCarList"]),
			...mapActions(['clearMycar']),
			openCar() {
				this.showCar = true
			},
			closeCar(){
				this.showCar = false
			},
			qsTextt(){
				return this.qsText
			},
			dec(e, co) {
				// console.log(e, co)
				this.$emit('dec', {
					addwz: e.addwz,
					g: co
				})
				// !this.carList.length && (this.showCar = false)
			},
			add(e, co) {
				// console.log(e, co)
				this.$emit('add', {
					addwz: e.addwz,
					g: co,
				})
			},
			async clearCar() {
				try {
					await this.util.modal('确认清空购物车吗？')
					await this.clearMycar({
						storeId: this.sjxx.shopData.id,
						item: this.outin,
						key: this.outin == 1 ? 'out' : this.outin == 2 ? 'ins' : 'fast',
					})
					this.$emit('celar')
					this.showCar = false
				} catch (e) {}

			},
			async goPay(t) {
				if (!this.qsText.reach) return
				if (!await this.checkLogin()) return
				// #ifdef MP-WEIXIN || MP-BAIDU
				if (this.system.member.payType == 1 && !this.user.userTel) { //下单绑定手机号
					return this.showSqtel = true
				}
				// #endif
				// console.log(this.carList)
				if (this.ingopay == 1) {
					//外卖在前或者只有外卖情况下没选过地址
					if (this.buytype == 1 && !getApp().globalData.xzdzInfo) {
						this.go({
							t: 1,
							url: `/yb_wm/my/address/index?from=3&storeId=${this.sjxx.shopData.id}`,
						})
						return
					}
					if (this.havebxp && this.type != 3) {
						let arr = this.goodsList.filter(v => v.isRequire == 1),
							num = 0,
							carr = this.carList.map(v => v.goodsId)
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].goods.find(item => carr.includes(item.id))) {
								num += 1
							}
						}
						if (num < arr.length) {
							return this.util.message('请选择必选品', 3, 1500)
						}
						// console.log(arr, carr, num)
					}
					// return
					this.util.showLoading()
					if (this.outin != 2) {
						uni.setStorageSync('carInfo', {
							carList: this.carList,
							getTotal: this.getTotal,
							mjInfo: this.mjInfo,
							carPrice: this.carPrice,
							sjxx: {
								discount: this.sjxx.discount,
								moreSet: this.sjxx.moreSet,
								outSet: this.sjxx.moreSet.distributionSupport,
								shopData: this.sjxx.shopData
							},
							buyType: this.buytype,
						})
					}
					if (this.outin == 1) {
						this.go({
							t: t || 1,
							url: '/yb_wm/shop/out/pay-order'
						})
					} else if (this.outin == 3) {
						this.go({
							url: '/yb_wm/shop/ffmode/pay-order'
						})
					} else if (this.outin == 2) {
						uni.setStorageSync('carInfo', {
							sjxx: {
								discount: this.sjxx.discount,
								moreSet: this.sjxx.moreSet,
								outSet: this.sjxx.moreSet.distributionSupport,
								shopData: this.sjxx.shopData
							},
						})
						this.go({
							url: '/yb_wm/shop/in/car?tableInfo=' + encodeURIComponent(JSON.stringify(this
								.tableinfo))
						})
					}
					this.showCar = false
					uni.hideLoading()
				} else {
					this.$emit('gopay')
				}
			},
			itemTotal(v) {
				return +(v.money * v.num).toFixed(2)
			},
			colorToRGB(color) {
				return utils.colorToRGB(color)
			},
		},
		created() {
			this.havebxp = this.sjxx.data.findIndex(v => v.isRequire == 1) > -1
			// console.log(this.havebxp)
		},
	}
</script>
<style scoped lang="scss">
	.mjts {
		padding: 15rpx 30rpx;
		font-size: 24rpx;
		text-align: center;
		background: #FFF4EE;
		opacity: 0.9;
		border-radius: 35rpx 35rpx 0 0;
	}

	.closec {
		width: 100%;
		height: 130rpx;
		bottom: 115rpx;
		background: rgba(0, 0, 0, 0.65);
		z-index: 2000;
	}

	.cartopmj {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 100%;
	}

	.carc1 {
		width: 100%;
		bottom: 115rpx;
		z-index: 2000;

		.car {
			height: 110rpx;
			background: #F0F0F0;

			.carb {

				&-img {
					padding: 0 30rpx;

					.dot {
						min-width: 40rpx;
						height: 40rpx;
						color: #fff;
						top: -15rpx;
						right: 20rpx;
					}
				}

				&-i {
					width: 110rpx;
					height: 110rpx;
					margin-bottom: 26rpx;
				}
			}

			.carf {
				width: 220rpx;
				height: 100%;
			}
		}
	}

	.carc2 {
		width: 100%;
		padding: 0 4%;
		height: 130rpx;
		bottom: 115rpx;
		background: rgba(255, 255, 255, 0);
		z-index: 2000;

		.cartopmj2 {
			position: absolute;
			width: 92%;
			height: 100rpx;
			border-radius: 10rpx;
			left: 4%;
			top: -60rpx;
		}

		.carleft {
			margin-right: 4%;

			.fabv {
				width: 105rpx;
				height: 105rpx;
			}

			.fabi {
				background: #000;
				border-radius: 50%;
				transition: transform 150ms cubic-bezier(0.4, 0, 1, 1);
			}

			.fabis {
				transform: scale(1) rotate(135deg);
			}

			.fabc {
				border-radius: 105rpx;
				padding-top: 30rpx;
				padding-bottom: 105rpx;
				transition: all 0.3s;
				transform: scaleY(0);
				transform-origin: 50% 100%;
				opacity: 0;
				visibility: hidden;
			}

			.fabcs {
				opacity: 1;
				transform: scaleY(1);
				visibility: visible;
			}
		}

		.car {
			height: 105rpx;
			border-radius: 60rpx;
			box-shadow: 0px 5rpx 5rpx 1rpx #DCDCDC;

			.carh {
				padding: 0 20rpx 0 40rpx;
				height: 70rpx;
			}

			.carb {
				border-radius: 105rpx 0 0 105rpx;

				&-img {
					width: 105rpx;
					background: #000;
					border-radius: 105rpx;

					.dot {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						border: 1px solid #fff;
						color: #fff;
						right: 0;
						top: -10rpx;
					}
				}
			}

			.carf {
				border-radius: 0 60rpx 60rpx 0;
				width: 190rpx;
				height: 100%;
			}
		}
	}

	.carlistc {
		padding-bottom: 235rpx;

		.carbody {
			max-height: 600rpx;
		}
	}

	.carimg {
		width: 80rpx;
		height: 110rpx;
		margin-bottom: 45rpx;
	}
</style>
