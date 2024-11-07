<template>
	<view v-if="type==1" :class="{'mb80':last}">
		<view v-for="(co,i) in dList" :key="i" class='conw2 f-row p2'>
			<view @click='goodinfo' class="f-g-0 bf6 left bs5 p-r">
				<mg-img cname='wh' :src='co.icon' />
				<view v-if='outin==1?co.outStock<=0:co.inStock<=0' class="p-a ysq f-c b0 cf w100 f26">已售罄</view>
			</view>
			<view class="f-g-1 right ml20 f24 c9">
				<view class="f30 t-o-e c0">{{co.name}}</view>
				<view class="mt10">
					<bk-b c-name='f22 bf7 cb mr10 p-3-10' t='含茶'></bk-b>
					<bk-b c-name='f22 bf7 cb mr10 p-3-10' t='含乳制品'></bk-b>
				</view>
				<view class="mt10 t-o-e2 f20">{{'防疫期间，为减少接触，如有不便请您谅解。'||co.body}}</view>
				<view v-if="orderset.sales==1&&co.salesNum>0" class="mt10 f-raw">
					<text class="mr30">销量 {{co.salesNum}}</text>
				</view>
				<view v-if="vipPrice(co)" class="mt10 f-row">
					<view class="vipr f-y-c">VIP</view>
					<view class="vipl f-y-c">
						<!-- <image class="vimg" mode="aspectFit" src="/static/gvip.png"></image> -->
						<view>{{sl+vipPrice(co)}}</view>
					</view>
				</view>
				<add-goods :isunit='isunit(co)' :isyprice='isyprice(co)' :outin='outin' @add='add($event,co)' @dec='dec($event,co)'
				 :co='co' cname="mt10" pcname='f36 c3'></add-goods>
				<view v-if="co.maxNum>0||co.minNum>1">
					<text v-if="co.minNum>1" class="crb mr20">{{co.minNum}}份起售</text>
					<text v-if="co.maxNum>0" class="crb">限{{co.maxNum}}份</text>
				</view>
			</view>
		</view>
	</view>
	<scroll-view class="ws-n mb10" scroll-x v-else-if="type==2">
		<view v-for="(co,i) in dList" :key="i" class='dis-in conw mr20 bs15'>
			<view @click='goodinfo(co.id)' class='goodsimg'>
				<mg-img cname='wh' :src='co.icon' />
			</view>
			<view class='conwb'>
				<view class='t-o-e f26'>{{co.name}}</view>
				<add-goods :addgb="addgb" :outin='outin' @add='add($event,co)' @dec='dec($event,co)' :co='co' pcname='f26'></add-goods>
			</view>
		</view>
	</scroll-view>
	<!-- 商品详情 -->
	<view v-else-if="type==3" class='p23 bf'>
		<view class="">
			<view class='c0 f-y-c f-1' style="min-width: 60%;">
				<text v-if="co.labelName" class='text-btnf f22 mr20 p-3-10 bs5 f-g-0' :style="{background:`rgba(${cTR(co.labelColor)},0.1)`,color:co.labelColor,}">{{co.labelName}}</text>
				<text class="f34 wei">{{co.name}}</text>
			</view>
			<view class='c6 f24 mt10'>
				<text v-if="system.switch.saleShow==1&&co.salesNum>0"  class='mr30'>销量{{co.salesNum}}</text>
				<text v-if="system.switch.stockShow==1">库存{{co.stock}}</text>
			</view>
		</view>
		<view class='c9 f24 m10'>{{co.body}}</view>
		<view v-if="Number(co.vipPrice)<Number(co.activityGoodData.activityMoney)" class="mt10 f-row">
			<view class="vipr f-y-c">
				<view class="vipimg">
					<mg-img :src='`${onImgurl}vipimg.png`'></mg-img>
				</view>
			</view>
			<view class="vipl f-y-c">
				<view>{{sl+co.vipPrice}}</view>
			</view>
		</view>
		<add-goods :isunit='isunit(co)' :isyprice='isyprice(co)' :outin='outin' @add='add($event,co)' @dec='dec($event,co)'
		 :co='co' cname="mt10" pcname='f44' :showspec="false" :showjj="co.isSpecs!=1&&co.isMaterial!=1&&co.isAttr!=1"
		 :nocheckgd='true' numc='f36'></add-goods>
		<view v-if="co.activityGoodData.type>0" class="mt5 f-row f20 mb10" :style="{color:tColor}">
			<view v-if="co.activityGoodData.type<3" class="f-row bs5 b-d p1 l-h1" :style="{borderColor:tColor}">
				<view class="">{{co.activityGoodData.type==1?'特价':Number(co.activityGoodData.discount)+'折'}}</view>
				<view class="ml10 sphdir" v-if="co.activityGoodData.limitNum>0" :style="{borderColor:tColor}">限{{co.activityGoodData.limitNum}}份</view>
			</view>
			<view v-else-if="co.activityGoodData.type==3">
				<text>商品立减{{sl+co.activityGoodData.discount}}</text>
				<text v-if="co.activityGoodData.limitNum>0" class="ml10">限{{co.activityGoodData.limitNum}}份</text>
			</view>
			<view v-else>{{co.activityGoodData.type==4?`第二件${Number(co.activityGoodData.discount)}折`:'买一送一'}}</view>
		</view>
		<view class="f24" v-if="co.maxNum>0||co.minNum>1">
			<text v-if="co.minNum>1" class="cf5f mr20">{{co.minNum}}份起售</text>
			<text v-if="co.maxNum>0" class="cf5f">限{{co.maxNum}}份</text>
		</view>
	</view>
	<!-- 弹窗购物车 -->
	<!-- <mg-cell last="1" v-else-if="type==4" w='104' h='104' :img='co.icon' brs='5rpx' cname='p30 la124'>
		<template slot='bd'>
			<view class="f-bt">
				<view class="t-o-e">{{co.name}}</view>
				<view class="f-g-0 f32" :style="{color:tColor}">{{sl+itemTotal(co.price,co.num)}}</view>
			</view>
			<view class="f-bt mt10">
				<view class="f-g-1 f24 c9 f-y-c">
					<text class="ml10" v-if="co.isSpec==1">{{co.data}}</text>
					<text v-if="co.attribute">({{co.attribute}})</text>
					<text class="ml10" v-if="co.jldata">+{{co.jldata}}</text>
				</view>
				<add-goods v-if="showadd" addwz='2' :isprice="0" :showspec='false' @add='add' @dec='dec' :co='co' cname="f-g-0 mt10"></add-goods>
				<view v-else class="c9">x{{co.num}}</view>
			</view>
		</template>
	</mg-cell> -->
	<!-- 购物车 -->
	<view v-else-if="type==6">
		<mg-cell v-for="(co,i) in dList" :key="i" w='160' h='160' :img='co.icon' brs='5rpx' cname='f-sh' hdc='f-s'>
			<view slot='bd' class="h100 f-y-bt">
				<view class="f-bt">
					<view class="t-o-e f32 c0">{{co.name}}</view>
				</view>
				<view class="f-bt mt10">
					<view class="f-g-1 f24 c9">
						<text class="" v-if="co.groupName">{{co.groupName}}</text>
						<text v-if="co.attribute">({{co.attribute}})</text>
						<text class="ml10" v-if="co.materialName">+{{co.materialName}}</text>
					</view>
				</view>
				<view class="f-x-bt mt10">
					<view class="f-g-0" style="color:#ff560a">{{sl}}<text class="f36 wei">{{itemTotal(co.money,co.num)}}</text></view>
					<add-goods color='#ff560a' addwz='2' :isprice="0" :showspec='false' @add='add($event,co)' @dec='dec($event,co)'
					 :co='co' cname="f-g-0 mt10" numc="f36"></add-goods>
				</view>
			</view>
<!-- 			<view slot='bd' class="h100 f-y-bt">
				<view class="f-bt">
					<view class="f-row">
						<view v-if="co.ishd&&v.discountType!=4" class="f-g-0 yhic f18 cf bf5f f-c hdspan">
							{{co.discountType==1?'特':co.discountType==2?'折':co.discountType==5?'赠':'减'}}
						</view>
						<view class="l-h1">{{co.name}}</view>
					</view>
					<view class="f-g-0 f32">
						{{sl+(co.ishd?itemTotal(co.discountPrice,co.spnum):itemTotal(co.money,co.spnum))}}
					</view>
				</view>
				<view v-if="co.ishd&&co.discountType==4" class="f-row cf5f">
					<view class="f20 bs5 b-d p-3-10" :style="{borderColor:'#FF5F2F'}">
						{{co.discountType==4?'第二件打折':'买一送一'}}
					</view>
				</view>
				<view class="f-bt mt10 f24 c9">
					<view class="f-g-1 f-raw">
						<text class="ml10" v-if="co.groupName">{{co.groupName}}</text>
						<text v-if="co.attribute">({{co.attribute}})</text>
						<text class="ml10" v-if="co.materialName">+{{co.materialName}}</text>
					</view>
					<view class="ml10">x{{co.spnum}}</view>
					<view class="f-x-bt mt10">
						<view class="f-g-0" style="color:#ff560a">{{sl}}<text class="f36 wei">{{itemTotal(co.money,co.num)}}</text></view>
						<add-goods color='#ff560a' addwz='2' :isprice="0" :showspec='false' @add='add($event,co)' @dec='dec($event,co)'
						 :co='co' cname="f-g-0 mt10" numc="f36"></add-goods>
					</view>
				</view>
			</view> -->
		</mg-cell>
	</view>
	<view v-else-if="type==7" class='p23 bf'>
		<view class="">
			<view class='c0 f-y-c f-1' style="min-width: 60%;">
				<text v-if="co.labelName" class='text-btnf f22 mr20 p-3-10 bs5 f-g-0' :style="{background:`rgba(${cTR(co.labelColor)},0.1)`,color:co.labelColor,}">{{co.labelName}}</text>
				<text class="f34 wei">{{co.name}}</text>
			</view>
			<view class='c6 f24 mt10'>
				<text v-if="system.switch.saleShow==1&&co.salesNum>0"  class='mr30'>销量{{co.salesNum}}</text>
				<text v-if="system.switch.stockShow==1">库存{{co.stock}}</text>
			</view>
		</view>
		<view class='c9 f24 m10'>{{co.body}}</view>
		<view v-if="Number(co.vipPrice)<Number(co.activityGoodData.activityMoney)" class="mt10 f-row">
			<view class="vipr f-y-c">
				<view class="vipimg">
					<mg-img :src='`${onImgurl}vipimg.png`'></mg-img>
				</view>
			</view>
			<view class="vipl f-y-c">
				<view>{{sl+co.vipPrice}}</view>
			</view>
		</view>
		<view v-if="co.activityGoodData.type>0" class="mt5 f-row f20 mb10" :style="{color:tColor}">
			<view v-if="co.activityGoodData.type<3" class="f-row bs5 b-d p1 l-h1" :style="{borderColor:tColor}">
				<view class="">{{co.activityGoodData.type==1?'特价':Number(co.activityGoodData.discount)+'折'}}</view>
				<view class="ml10 sphdir" v-if="co.activityGoodData.limitNum>0" :style="{borderColor:tColor}">限{{co.activityGoodData.limitNum}}份</view>
			</view>
			<view v-else-if="co.activityGoodData.type==3">
				<text>商品立减{{sl+co.activityGoodData.discount}}</text>
				<text v-if="co.activityGoodData.limitNum>0" class="ml10">限{{co.activityGoodData.limitNum}}份</text>
			</view>
			<view v-else>{{co.activityGoodData.type==4?`第二件${Number(co.activityGoodData.discount)}折`:'买一送一'}}</view>
		</view>
		<view class="f24" v-if="co.maxNum>0||co.minNum>1">
			<text v-if="co.minNum>1" class="cf5f mr20">{{co.minNum}}份起售</text>
			<text v-if="co.maxNum>0" class="cf5f">限{{co.maxNum}}份</text>
		</view>
	</view>
	<!-- <view v-else class='conw2 f-row p2'>
		<view class="f-g-0 left bf6">
		</view>
		<view class="f-g-1 right ml20 f22 c9">
			<view class="be p20"></view>
			<view class="mt20 be p15 w80"></view>
			<view class='mt20 f-x-bt'>
				<view class='be p20 w50'></view>
				<view class="f-g-0 f-bt">
					<button class="cartadd be"></button>
				</view>
			</view>
		</view>
	</view> -->
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import addGoods from '@/components/goods/add-goods.vue'
	import bkB from '@/components/common/block-b.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'goods',
		components: {
			addGoods,
			bkB,
			MgCell,
		},
		props: {
			dList: {
				type: Array,
				default: function() {
					return []
				}
			},
			co: Object,
			type: { //样式类型1列表2推荐3商品详情
				type: String,
				default: '1'
			},
			showbody: {
				type: Boolean,
				default: true
			},
			showadd: {
				type: Boolean,
				default: true
			},
			addtype: { //加类型1本地2数据库
				type: String,
				default: '1'
			},
			outin: {
				type: String,
				default: '1'
			},
			color: {
				type: String,
				default: ''
			},
			last: {
				type: Boolean,
				default: false
			},
			storeid: {
				type: String,
				default: ''
			},
			addgb: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {}
		},
		computed: {
			...mapState({
				orderset: state => state.config.orderset,
			}),
		},
		// watch: {
		// 	dList: {
		// 		handler(newv) {
		// 			console.log(newv)
		// 		},
		// 		immediate:true
		// 	}
		// },
		methods: {
			dec(e, co) {
				if (this.addtype == 1) {
					this.$emit('dec', co)
				} else {
					this.$emit('dec', {
						addwz: e.addwz,
						g: co
					})
				}
				// console.log('goods,dec', this.addtype, e, co)
			},
			add(e, co) {
				if (this.addtype == 1) {
					this.$emit('add', {
						g: co,
						// e: e.e,
					})
				} else {
					this.$emit('add', {
						addwz: e.addwz,
						g: co,
						// e: e.e,
					})
				}
				// console.log('goods,add', this.addtype, e, co)
			},
			goodinfo(v) {
				this.go({
					t: 1,
					url: `/yb_wm/shop/out/goods-dl?gid=${v}&storeId=${this.storeid}&page=shopGoods`
				})
			},
			itemTotal(m, n) {
				return (m * n).toFixed(2)
			},
			isunit(co) {
				return co.unit ? true : false
			},
			isyprice(co) {
				return this.co.activityGoodData.type > 0 && this.co.activityGoodData.type < 4
			},
			vipPrice(co) {
				return (this.outin == 1 ? co.outVipPrice > 0 ? co.outVipPrice : '' :
					co.inVipPrice > 0 ? co.inVipPrice : '')
			},
			cTR(c) {
				return utils.colorToRGB(c)
			},
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.conw {
		width: 210rpx;

		.goodsimg {
			width: 210rpx;
			height: 210rpx;
		}

		.conwb {
			padding: 10rpx 6rpx 0 2rpx;
		}
	}

	.conw2 {
		.left {
			width: 138rpx;
			height: 138rpx;
		}
	}

	.mb80 {
		padding-bottom: 100rpx;
	}

	.ysq {
		height: 50rpx;
		background: rgba($color: #000000, $alpha: 0.5);
	}

	.sphdir {
		padding-left: 10rpx;
		border-left: 0.5px solid #eee;
	}

	// .vipl {
	// 	color: #F5ECB3;
	// 	font-size: 20rpx;
	// 	padding: 7rpx 10rpx;
	// 	border-radius: 5rpx 0 0 5rpx;
	// 	background: linear-gradient(to right, #69625B, #252002);

	// 	.vimg {
	// 		width: 28rpx;
	// 		height: 19rpx;
	// 		margin-right: 5rpx;
	// 		margin-top: -2rpx;
	// 	}
	// }
</style>
