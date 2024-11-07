<template>
	<view class="category bf h100v" :class="(tcyhqshow||tcggshow)&&'bgfix'">
		<view class="h100 f-col">
			<uni-nav-bar id='uninavbar' :uropcity="1" :uriconopcity='0' :fixed='false' :ispr='false' :border='false'
				:statusBar="true" leftcn='iconjiayuan' rightcn='iconsousuo1' :custommore="true" @on-more='onmore'
				:title="storeInfo.name||''">
			</uni-nav-bar>
			<view class="header p03 bf" :style="{zIndex: showShopInfo?'2001':''}">
				<view class="header-bd f-c-xc">
					<view class="f-bt">
						<view class="f-1 f-y-c">
							<view v-if="sjxx.shopData" class="f-1" style="padding-right: 20rpx;">
								<view class="f-row f32 wei o-h">
									<view class="f-y-c" style="padding-right: 15rpx;" @click="scdp">
										<text class="iconfont mt0 c3" :class="issc?'iconxx':'iconkxx'" :style="{color:issc?tColor:''}"></text>
									</view>
									<view class="f-y-c f-1" @click="0&&goSelect">
										<text class="t-o-e">{{storeInfo.name}}</text>
										<!-- <text v-if="system.storeSet.storeModel==2" class="iconfont iconright ml5 c0 f28"></text> -->
									</view>
								</view>
							</view>
						</view>
						<view class="f-row ml30">
							<view class="f-c myicon">
								<text @click="tzdd" class="iconfont icondd f48 c3"></text>
							</view>
						</view>
					</view>
					<view class="f-bt mt10 c9" v-if='sjxx.discount.reduce.type'>
						<view class="f-1 f24 flex">
							<view class="f-1 t-o-e hihth" v-if='sjxx.discount.reduce.type'>
								<text class="text-btnf f22 mr10 p-3-10 bs10 cf5f borr">{{mjtxt}}</text>
							</view>
						</view>
					</view>
					<view class="f-bt mt20 c9">
						<view class="f-1 f-y-c f24">
							<text class="iconfont icontishi mr15" :style="{color:tColor}"></text>
							<text class="t-o-e">{{sjxx.moreSet.fastNotice}}</text>
						</view>
						<view @click="showShopInfo=!showShopInfo" class="f22 ml20 f-y-c">更多
							<text class='iconfont icondown f22 ml5 c9'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="f-1 o-h">
				<view class="bodyer bf" v-show="showhdp==0">
					<mg-swiper :co='lbswiper' u='rpx' :color='tColor'></mg-swiper>
				</view>
				<view class="category-c f-row" v-if="sjxx.moreSet">
					<!-- 左边导航 -->
					<scroll-view scroll-y class="left-c" scroll-with-animation="true" :scroll-into-view="lsiv" :style="{paddingBottom: leftpb}">
						<view class="title-c" :id="'l'+i" :class="{'onSelected':sIndex == i}" v-for="(v,i) in catrgoryList" :key="i"
						 @click="choose(i)">
							<view v-if='sIndex == i' class="title-b" :style='{background:tColor}'></view>
							<view v-if='v.isRequire!=2' class="title-bx cf5f f18 nowei">{{v.isRequire==1?'必选':v.customName}}</view>
							<view class="title-n f-c-xc" :class="{'ysyj':i==sIndex+1,'yxyj':i==sIndex-1}">
								<block v-if="sjxx.categorySet.display==3">
									<view class="f-y-e">
										<view class="title-img">
											<mg-img m='aspectFit' :src="v.icon" />
										</view>
										<text>{{lfName(v.name)}}</text>
									</view>
									<text class="mt15 t-o-e" v-if="lsName(v.name)">{{lsName(v.name)}}</text>
								</block>
								<block v-else-if="sjxx.categorySet.display==2">
									<view class="f-x-c">
										<view class="title-img">
											<mg-img m='aspectFit' :src="v.icon" />
										</view>
									</view>
									<text class="mt15 t-c t-o-e">{{v.name}}</text>
								</block>
								<block v-else>
									<view class="f-x-c">
										<text class="t-o-e2">{{v.name}}</text>
									</view>
								</block>
							</view>
						</view>
						<view class="title-c">
							<view class="title-n"></view>
						</view>
						<view class="title-c">
							<view class="title-n"></view>
						</view>
						<view class="title-c">
							<view class="title-n"></view>
						</view>
					</scroll-view>
					<block v-if="sjxx.moreSet.goodload == 1">
					<scroll-view lower-threshold='100' scroll-y class="f-g-1 right-c" :scroll-into-view="rsiv" @scroll="myscroll"  @scrolltoupper='myscrolltoupper'
					 :style="{paddingBottom: rightpb}">
						<block v-for="(pv,pi) in catrgoryList" :key="pv.id">
							<view class="c-item" :id="'r'+pi">
								<view class="c-title">{{pv.name}}</view>
								<view @click='goodinfo(co.id)' v-for="(co,i) in pv.goods" :key="i" class='conw2 f-row p2'>
									<view class="f-g-0 bf6 left bs5 p-r">
										<mg-img cname='wh' :src='co.icon' />
										<view v-if='co.stock<=0' class="p-a ysq f-c b0 cf w100 f22">已售罄</view>
										<!-- <view v-if="co.labelName" class="p-a ppbq f20 cf" :style="{background:co.labelColor}">{{co.labelName}}</view> -->
									</view>
									<view class="f-g-1 ml20 f24 c9">
										<view class="f30 t-o-e c0 l-h1">{{co.name}}</view>
										<view v-if="co.labelName" class="mt8">
											<text class='text-btnf f22 mr10 p-3-10 bs5' :style="{background:`rgba(${cTR(co.labelColor)},0.1)`,color:co.labelColor,}">{{co.labelName}}</text>
										</view>
										<view v-if="co.body" class="mt8 t-o-e2 f22">{{co.body}}</view>
										<view v-if="system.switch.saleShow==1||system.switch.stockShow==1" class="mt8 f-raw">
											<text v-if='co.salesNum>0 && system.switch.saleShow==1' class="mr30">销量{{co.salesNum}}</text>
											<text v-if="system.switch.stockShow==1" class="mr30">库存{{co.stock}}</text>
										</view>
										<view v-if="Number(co.vipPrice)<Number(co.activityGoodData.activityMoney)"
											class="mt8 f-row">
											<view class="vipr f-y-c">
												<view class="vipimg">
													<mg-img :src='`${onImgurl}vipimg.png`'></mg-img>
												</view>
											</view>
											<view class="vipl f-y-c">{{sl+co.vipPrice}}</view>
										</view>
										<view class='f-x-bt mt8'>
											<view class='f-g-1 wei t-o-e c3 f36'>
												<block v-if="co.activityGoodData.type<1||co.activityGoodData.type>=4">
													<text class="f30 mr5">{{sl}}</text>{{co.price}}
												</block>
												<block v-else>
													<text class="f30 mr5">{{sl}}</text>{{co.activityGoodData.activityMoney}}
													<text class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text>
												</block>
												<!-- <text class="f30 mr5">{{sl}}</text>{{co.price}} -->
												<!-- <text v-if="1==1" class="nowei c9 f24">/{{co.unit||'个'}}</text> -->
												<!-- <text v-if="system.switch.scribingPriceShow==1" class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text> -->
											</view>
											<view v-if="(co.isSpecs==1||co.isMaterial==1||co.isAttr==1)" @click.stop="add({addwz:1,g:co})" class="f-g-0 cartggc f-c">
												<view class='text-btnf f24 f-c ggc' :style="{background:isClose?tColor:'#ccc'}">
													<text>选 择</text>
													<text v-if='co.num>0' class="dot f-c" :style="{background:isClose?tColor:'#ccc'}">{{co.num}}</text>
												</view>
											</view>
											<view v-else class="f-g-0 f-bt">
												<view v-if="co.num>0" class="reducecon active f-y-c">
													<view @click.stop="dec({addwz:1,g:co})" class="cartc f-c">
														<button class="cartdec" :style="{borderColor:isClose?tColor:'#ccc'}">
															<view class="cartdecab" :style="{background:isClose?tColor:'#ccc'}"></view>
														</button>
													</view>
													<text class="f36 ma c0">{{co.num}}</text>
												</view>
												<view @click.stop="add({addwz:1,g:co})" class="cartc f-c">
													<button class="cartadd" :style="{background:isClose?tColor:'#ccc'}"></button>
												</view>
											</view>
										</view>
										<view v-if="co.activityGoodData.type>0" class="mt5 f-row f22"
											:style="{color:tColor}">
											<view v-if="co.activityGoodData.type<4" class="f-row bs5 sptjc"
												:style="{background:ztqs,color:tColor,}">
												<text class="iconfont iconspzk f22" :style="{color:tColor}"></text>
												<view class="">
													{{co.activityGoodData.type==1?'特价':co.activityGoodData.type==2?Number(co.activityGoodData.discount)+'折':'商品立减'+sl+co.activityGoodData.discount}}
												</view>
												<view class="ml10 sphdir" v-if="co.activityGoodData.limitNum>0"
													:style="{borderColor:tColor}">限{{co.activityGoodData.limitNum}}份</view>
											</view>
											<!-- <view v-else-if="co.activityGoodData.type==3">
												<text>商品立减{{sl+co.activityGoodData.discount}}</text>
												<text v-if="co.activityGoodData.limitNum>0" class="ml10">限{{co.activityGoodData.limitNum}}份</text>
											</view>
											<view v-else>{{co.activityGoodData.type==4?`第二件${Number(co.activityGoodData.discount)}折`:'买一送一'}}</view> -->
										</view>
										<view v-if="co.maxNum>0||co.minNum>1">
											<text v-if="co.minNum>1" class="cf5f mr20">{{co.minNum}}份起售</text>
											<text v-if="co.maxNum>0" class="cf5f">限{{co.maxNum}}份</text>
										</view>
									</view>
								</view>
							</view>
						</block>
						<view class="conw2mb"></view>
					</scroll-view>
					</block>
					<block v-else>
						<scroll-view lower-threshold='100' scroll-y class="f-g-1 right-c" :scroll-into-view="rsiv2"  @scroll="myscroll2"  @scrolltoupper='myscrolltoupper' :style="{paddingBottom: rightpb}">
							<block v-if="catrgoryList.length">
								<view class="c-item" id='r0' v-if="catrgoryList[sIndex].goods.length">
									<view class="c-title">{{catrgoryList[sIndex].name}}</view>
									<view @click='goodinfo(co.id)' v-for="(co,i) in catrgoryList[sIndex].goods" :key="i" class='conw2 f-row p2'>
										<view class="f-g-0 bf6 left bs5 p-r">
											<mg-img cname='wh' :src='co.icon' />
											<view v-if='co.stock<=0' class="p-a ysq f-c b0 cf w100 f22">已售罄</view>
											<!-- <view v-if="co.labelName" class="p-a ppbq f20 cf" :style="{background:co.labelColor}">{{co.labelName}}</view> -->
										</view>
										<view class="f-g-1 ml20 f24 c9">
											<view class="f30 t-o-e c0 l-h1">{{co.name}}</view>
											<view v-if="co.labelName" class="mt8">
												<text class='text-btnf f22 mr10 p-3-10 bs5' :style="{background:`rgba(${cTR(co.labelColor)},0.1)`,color:co.labelColor,}">{{co.labelName}}</text>
											</view>
											<view v-if="co.body" class="mt8 t-o-e2 f22">{{co.body}}</view>
											<view v-if="system.switch.saleShow==1||system.switch.stockShow==1" class="mt8 f-raw">
												<text v-if='co.salesNum>0 && system.switch.saleShow==1' class="mr30">销量{{co.salesNum}}</text>
												<text v-if="system.switch.stockShow==1" class="mr30">库存{{co.stock}}</text>
											</view>
											<view v-if="Number(co.vipPrice)<Number(co.activityGoodData.activityMoney)"
												class="mt8 f-row">
												<view class="vipr f-y-c">
													<view class="vipimg">
														<mg-img :src='`${onImgurl}vipimg.png`'></mg-img>
													</view>
												</view>
												<view class="vipl f-y-c">{{sl+co.vipPrice}}</view>
											</view>
											<view class='f-x-bt mt8'>
												<view class='f-g-1 wei t-o-e c3 f36'>
													<block v-if="co.activityGoodData.type<1||co.activityGoodData.type>=4">
														<text class="f30 mr5">{{sl}}</text>{{co.price}}
													</block>
													<block v-else>
														<text class="f30 mr5">{{sl}}</text>{{co.activityGoodData.activityMoney}}
														<text class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text>
													</block>
													<!-- <text class="f30 mr5">{{sl}}</text>{{co.price}} -->
													<!-- <text v-if="1==1" class="nowei c9 f24">/{{co.unit||'个'}}</text> -->
													<!-- <text v-if="system.switch.scribingPriceShow==1" class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text> -->
												</view>
												<view v-if="(co.isSpecs==1||co.isMaterial==1||co.isAttr==1)" @click.stop="add({addwz:1,g:co})" class="f-g-0 cartggc f-c">
													<view class='text-btnf f24 f-c ggc' :style="{background:isClose?tColor:'#ccc'}">
														<text>选 择</text>
														<text v-if='co.num>0' class="dot f-c" :style="{background:isClose?tColor:'#ccc'}">{{co.num}}</text>
													</view>
												</view>
												<view v-else class="f-g-0 f-bt">
													<view v-if="co.num>0" class="reducecon active f-y-c">
														<view @click.stop="dec({addwz:1,g:co})" class="cartc f-c">
															<button class="cartdec" :style="{borderColor:isClose?tColor:'#ccc'}">
																<view class="cartdecab" :style="{background:isClose?tColor:'#ccc'}"></view>
															</button>
														</view>
														<text class="f36 ma c0">{{co.num}}</text>
													</view>
													<view @click.stop="add({addwz:1,g:co})" class="cartc f-c">
														<button class="cartadd" :style="{background:isClose?tColor:'#ccc'}"></button>
													</view>
												</view>
											</view>
											<view v-if="co.activityGoodData.type>0" class="mt5 f-row f22"
												:style="{color:tColor}">
												<view v-if="co.activityGoodData.type<4" class="f-row bs5 sptjc"
													:style="{background:ztqs,color:tColor,}">
													<text class="iconfont iconspzk f22" :style="{color:tColor}"></text>
													<view class="">
														{{co.activityGoodData.type==1?'特价':co.activityGoodData.type==2?Number(co.activityGoodData.discount)+'折':'商品立减'+sl+co.activityGoodData.discount}}
													</view>
													<view class="ml10 sphdir" v-if="co.activityGoodData.limitNum>0"
														:style="{borderColor:tColor}">限{{co.activityGoodData.limitNum}}份</view>
												</view>
												<!-- <view v-else-if="co.activityGoodData.type==3">
													<text>商品立减{{sl+co.activityGoodData.discount}}</text>
													<text v-if="co.activityGoodData.limitNum>0" class="ml10">限{{co.activityGoodData.limitNum}}份</text>
												</view>
												<view v-else>{{co.activityGoodData.type==4?`第二件${Number(co.activityGoodData.discount)}折`:'买一送一'}}</view> -->
											</view>
											<view v-if="co.maxNum>0||co.minNum>1">
												<text v-if="co.minNum>1" class="cf5f mr20">{{co.minNum}}份起售</text>
												<text v-if="co.maxNum>0" class="cf5f">限{{co.maxNum}}份</text>
											</view>
										</view>
									</view>
								</view>
							</block>
							<view class="conw2mb"></view>
						</scroll-view>
					</block>
				</view>
			</view>
		</view>
		<block v-if='sjxx.shopData'>
			<tcyhq @close='tcyhqshow=false' :co='tcCoupon' v-model="tcyhqshow" :color='tColor'></tcyhq>
			<!-- <tcgg :list='tcggList' v-model="tcggshow"></tcgg> -->
			<goods-car type='2' :outin='outin' :show.sync='showCar' :carBtm="getreet" :carlistPab="getreet2"
			 :buytype='buyType' :sjxx='sjxx' @dec='dec' @add='add' @celar='celarCar' :goods-list='catrgoryList'></goods-car>
<!-- 			 <goods-car type='2' :outin='outin' :show.sync='showCar' :carBtm="getreet" :carlistPab="hasTabbar?isIpx?'265':'225':'110'"
			  :buytype='buyType' :sjxx='sjxx' @dec='dec' @add='add' @celar='celarCar' :goods-list='catrgoryList'></goods-car> -->
<!-- 			<goods-car type='2' :outin='outin' :show.sync='showCar' :carBtm="isIpx?'40':'0'" :carlistPab="isIpx?'132':'110'"
			 :buytype='buyType' :sjxx='sjxx' @dec='dec' @add='add' @celar='celarCar' :goods-list='catrgoryList'></goods-car> -->
			<store-info type='2' v-model="showShopInfo" :co='sjxx' :qlist='sjyhq' :sjqb="sjqb"></store-info>
		</block>
		<spec :outin='outin' @add='add' :co='goodsInfo' :storeid='storeInfo.id' v-model="showGg"></spec>
		<tab-bar @refresh='tbrh'></tab-bar>
		<load v-if="showloading"></load>
		<load type="2" v-model="showjz"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import goods from '@/components/goods/index.vue'
	import goodsCar from '@/components/goods/goods-car.vue'
	import spec from '@/components/goods/spec.vue'
	import load from '@/components/common/load.vue'
	import mgPopup from '@/components/common/popup.vue'
	import mgModal from '@/components/common/modal.vue'
	import jzz from '@/components/common/jzz.vue';
	import utils from '@/common/utils.js'
	import tips from '@/components/common/tips.vue'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import tcyhq from '@/components/template/tcyhq.vue'
	import tcgg from '@/components/template/tcgg.vue'
	import storeInfo from '@/components/goods/store/store-info.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import {
		getDw
	} from "@/common/wechat-util.js"
	let app = getApp().globalData
	export default {
		components: {
			uniNavBar,
			goods,
			goodsCar,
			spec,
			load,
			mgPopup,
			mgModal,
			jzz,
			tips,
			MgSwiper,
			tcyhq,
			tcgg,
			storeInfo,
		},
		data() {
			return {
				showloading: true,
				catrgoryList: [],
				sIndex: 0,
				// isscroll: false,
				rsiv: '', //右侧滑值
				rsiv2: '', 
				lsiv: '', //左侧滑值
				showGg: false,
				buyType: 2,
				showShopInfo: false, //更多门店信息
				outin: '3',
				goodsInfo: {}, //规格弹窗信息
				showjz: false,
				tcyhqshow: false,
				tcCoupon: {},
				tcggshow: false,
				tcggList: [],
				showCar: false,
				startMoney: '',
				xdtype: '',
				issc: false,
				sjyhq: [],
				flid: '',
				jsgdwb: false,
				sjqb: [],
				hasTabbar: false,
				sjxx: {},
				showhdp: 0,
			}
		},
		mixins: [utilMixins],
		async onLoad(options) {
			uni.$on('qjjtsj', (data) => {
				if (data.showgwc) {
					this.showCar = true
				} else if (data.hasOwnProperty('flid')) {
					this.flid = ''
					setTimeout(() => {
						this.flid = data.flid
					})
				} else {
					this.xdtype = ''
					this.xdtype = data
				}
			})
			// return
			this.storeId = utils.getOptions(options, {
				key: 'storeId',
				q1: this.storeInfo.id,
			}) || ''
			this.query = options
			await this.getLoginInfo({
				inviteId: options.userId
			})
			this.getDw()
			this.getSystem()
			// this.getLayout()
			// console.log('%c options ','color: white; background-color: #f44444', options);
		},
		computed: {
			...mapState({
				scarList: state => state.scarList.fast.data || [],
				storeInfo: state => state.config.storeInfo,
			}),
			lbswiper() {
				return {
					class: 'mt20 mb20',
					swiper: this.sjxx.moreSet && this.sjxx.moreSet.orderMedia.map(v => ({
						url: v
					})),
					duration: '',
					mode: '',
					height: '260',
					radius: '8',
					auto: true,
					interval: 5,
				}
			},
			// pageHeight() {
			// 	if (!getApp().sgheight) {
			// 		let h = uni.getSystemInfoSync(),
			// 			topH = +(h.statusBarHeight + 44 + uni.upx2px(
			// 				178)).toFixed(2)
			// 		getApp().sgheight = {
			// 			// mainH: +(h.windowHeight - topH).toFixed(2),
			// 			topH,
			// 		}
			// 	}
			// 	return getApp().sgheight
			// },
			isClose() {
				return this.sjxx.shopData && (this.sjxx.shopData.storeOpen == 1 || this.sjxx.shopData.storeOpen == 2 && this.sjxx.moreSet
					.status == 1)
			},
			leftpb() {
				if (this.system.outTabbar == 1) {
					return '0'
				} else {
					return '0'
				}
			},
			rightpb() {
				if (this.system.outTabbar == 1) {
					return '0'
				} else {
					return '0'
				}
			},
			getreet(){
			  var button=''
			  if(this.isIpx && !this.hasTabbar){
				return button='40'
			  }else if(!this.isIpx && this.hasTabbar){
				return button='115'
			  }else if(this.isIpx && this.hasTabbar){
				return button='155'
			  }else{
				 return button='0' 
			  }
			},
			getreet2(){
			  var button2=''
			  if(this.isIpx && !this.hasTabbar){
				return button2='132'
			  }else if(!this.isIpx && this.hasTabbar){
				return button2='225'
			  }else if(this.isIpx && this.hasTabbar){
				return button2='265'
			  }else{
				 return button2='110' 
			  }
			},
			// qhfl() {
			// 	return {
			// 		jsgdwb: this.jsgdwb,
			// 		flid: this.flid,
			// 	}
			// },
			mjtxt() {
				if (this.sjxx.discount && this.sjxx.discount.reduce.type == 1) {
					return `${this.sjxx.discount.reduce.moneyArr[0].fullMoney}减${this.sjxx.discount.reduce.moneyArr[0].money}`
				} else if (this.sjxx.discount && this.sjxx.discount.reduce.type == 2) {
					return this.sjxx.discount.reduce.moneyArr.map(v => `满${v.fullMoney}减${v.money}`).reverse().toString()
				}
			},
		},
		watch: {
			// qhfl: {
			// 	handler(newVal) {
			// 		if (newVal.jsgdwb && newVal.flid) {
			// 			if (this.sjxx.data.find(v => v.id == newVal.flid)) {
			// 				let index = this.sjxx.data.findIndex(v => v.id == newVal.flid)
			// 				this.sIndex = index;
			// 				this.noscroll = true
			// 				this.lsiv = `l${index-3}`
			// 				this.rsiv = `r${index}`
			// 				setTimeout(() => {
			// 					this.noscroll = false
			// 				}, 500)
			// 				// console.log('切换选择分类')
			// 			}
			// 		}
			// 		// console.log('qhfl newVal', newVal)
			// 	},
			// 	immediate: true
			// },
		},
		methods: {
			...mapActions(["getSjxx", "getConfig", "supdCar", "getMycar"]),
			...mapMutations(["setScarList"]),
			tbrh(e) {
				this.hasTabbar = true
			},
			async getDw() {
				let lc = await getDw({
					t: 0
				})
				this.init();
				// console.log(this.pageHeight)
			},
			//切换门店触发
			changeStore(v) {
				this.showloading = true
				this.tcyhqshow = this.tcggshow = this.jsgdwb = false
				this.startMoney = ''
				this.xdtype = this.flid = ''
				this.sIndex = 0
				this.storeId = v.id
				this.refreshInfo()
				// console.log('changeStore', v)
			},
			async refreshInfo() {
				this.sIndex = 0
				this.rsiv = 'r0'
				// app.xzdzInfo = null
				this.setScarList({
					key: 'fast',
					data: {}
				})
				this.init()
			},
			async init(type = 1) {
				let lc = getApp().globalData.gdlocation
				await this.getSjxx2({
					storeId: this.storeId,
					goodsType: 2,
					isKc: 1,
					// item: this.outin,
					lat: lc.latitude,
					lng: lc.longitude,
				})
				await this.getMycar({
					storeId: this.sjxx.shopData.id,
					item: this.outin,
					key: 'fast',
				})
				this.storeId = this.sjxx.shopData.id
				this.catrgoryList = utils.deepCopy(this.sjxx.data)
				if (!this.sjxx.data.length) {
					uni.showModal({
						title: '提示',
						content: '暂无快餐商品',
						confirmText: '返回主页',
						cancelText: '我知道了',
						success: res => {
							if (res.confirm) {
								this.go({
									t: 6,
									url: '/yb_wm/index/index'
								})
							}
						}
					})
				}
				this.showloading = false
				//购物车
				// console.time('gwc')
				for (let c = 0; c < this.scarList.length; c++) {
					for (let i = 0; i < this.catrgoryList.length; i++) {
						for (let j = 0; j < this.catrgoryList[i].goods.length; j++) {
							if (this.catrgoryList[i].goods[j].id == this.scarList[c].goodsId) {
								this.catrgoryList[i].goods[j].num = +this.catrgoryList[i].goods[j].num + (+this.scarList[c].num)
							}
						}
					}
				}
				// console.timeEnd('gwc')
				// let num = 0
				// this.catrgoryList.forEach(v => {
				// 	num += v.goods.length
				// })
				// console.log(num)
				this.$nextTick(() => {
					// console.log(this.dates, new Date().getTime() - this.dates)
					// uni.hideLoading()
					setTimeout(() => {
						this.getHeightList();
					}, 100)
				})
				this.getConfig({
					key: 'storeInfo',
					data: {
						id: this.sjxx.shopData.id,
						name: this.sjxx.shopData.name,
						distance: this.sjxx.shopData.distance
					}
				})
				//访问记录
				setTimeout(async () => {
					await this.getOtherData()
					// this.addFwjl({
					// 	storeId: this.storeId,
					// 	origin: '2'
					// })
				}, 1000)
			},
			async getSjxx2(params) {
				let {
					data
				} = await this.util.request({
					'url': this.api.shopGoodsInfo,
					data: params
				})
				data.discount.newReduction = data.discount.give.id = data.discount.grantCoupon.name =
					null
				this.sjxx = data
				this.util.setNT(data.shopData.name)
			},
			//获取弹窗数据
			async getOtherData() {
				this.issc = this.sjxx.shopData.isCollection == 1
				let {
					data
				} = await this.util.request({
					'url': this.api.qtsjjh,
					data: {
						location: 3,
						storeId: this.storeId,
					}
				})
				if (data.windowCoupon.hasOwnProperty('name')) {
					this.tcCoupon = data.windowCoupon
					this.tcyhqshow = true
				}
				this.sjyhq = data.storeCoupon
				// this.sjqb = data.rollBag
			},
			//第一种样式
			getHeightList() {
				let selectorQuery = uni.createSelectorQuery();
				selectorQuery.selectAll('.c-item').boundingClientRect((rects) => {
					let arr = [],
						h = 0
					rects.forEach(v => {
						h += v.height
						arr.push(h)
					})
					this.right_height = arr;
					this.jsgdwb = true
					// console.log(this.dates, new Date().getTime() - this.dates)
					// console.log('rects', rects, this.right_height)
				}).exec();
			},
			choose(index) {
				if (this.sjxx.moreSet.goodload == 1) {
					if (this.sIndex == index) return
					this.sIndex = index;
					this.noscroll = true
					this.lsiv = `l${index-3}`
					this.rsiv = `r${index}`
					setTimeout(() => {
						this.noscroll = false
					}, 500)
				}else{
					if (this.sIndex == index) {
						return;
					}
					this.sIndex = index;
					this.swiperChange(index)
				}
			},
			myscroll(e) {
				if (this.noscroll) return
				let scroll_top = e.detail.scrollTop;
				if(scroll_top>10){
					this.showhdp = 1
				}else{
					this.showhdp = 0
				}
				for (let i = 0; i < this.right_height.length; i++) {
					if (scroll_top < this.right_height[0]) {
						this.sIndex = 0
						this.lsiv = `l0`
					} else if (scroll_top >= this.right_height[i - 1] && scroll_top < this.right_height[i]) {
						this.sIndex = i
						this.lsiv = `l${i-3}`
						this.rsiv = ''
						break
					}
				}
			},
			myscroll2(e) {
				if (this.noscroll) return
				let scroll_top = e.detail.scrollTop;
				if(scroll_top>10){
					this.showhdp = 1
				}else{
					this.showhdp = 0
				}
			},
			myscrolltoupper(e){
				if(e.detail.direction=='top'){
					this.showhdp = 0
				}
			},
			async swiperChange(index) {
				this.rsiv2 = ''
				setTimeout(() => {
					this.rsiv2 = 'r0'
				}, 50)
				this.lsiv = `l${index-3}` //让左侧滚动居中
				if (this.catrgoryList[index].goods.length == 0) {
					this.util.showLoading()
					// this.getDishsByType(index)
					this.$nextTick(() => {
						uni.hideLoading()
					})
					// console.log('请求数据')
				}
				//console.log(this.rsiv2)
			},
			refreshList() {
				let carr = this.scarList,
					arr = this.catrgoryList
				for (let i = 0, len = arr.length; i < len; i++) {
					for (let j = 0, len = arr[i].goods.length; j < len; j++) {
						arr[i].goods[j].num = 0
						for (let c = 0; c < carr.length; c++) {
							if (arr[i].goods[j].id == carr[c].goodsId) {
								arr[i].goods[j].num += +carr[c].num
							}
						}
					}
				}
			},
			//
			async updList(p) {
				// console.log('updList', p)
				// return
				try {
					let res = await this.supdCar(p.e.addwz == '1' ? p.e.g.ggnum ? { //选规格加
						storeId: this.storeId,
						type: p.type,
						goodsId: p.e.g.id,
						groupId: p.e.g.groupId || '',
						material: p.e.g.material || [],
						attribute: p.e.g.attribute || '',
						num: p.e.g.ggnum,
						item: this.outin,
						key: 'fast',
					} : { //列表加
						storeId: this.storeId,
						type: p.type,
						goodsId: p.e.g.id,
						item: this.outin,
						key: 'fast',
					} : { //购物车加
						storeId: this.storeId,
						type: p.type,
						goodsId: p.e.g.goodsId,
						id: p.e.g.id,
						item: this.outin,
						key: 'fast',
					})
					if (res >= 0) {
						let arr = this.catrgoryList
						for (let i = 0, len = arr.length; i < len; i++) {
							for (let j = 0, len = arr[i].goods.length; j < len; j++) {
								if (p.e.addwz == '1' && arr[i].goods[j].id == p.e.g.id) {
									arr[i].goods[j].num = res
								} else if (p.e.addwz == '2' && arr[i].goods[j].id == p.e.g.goodsId) {
									arr[i].goods[j].num = res
								}
							}
						}
					}
					this.showjz = false
				} catch (e) {
					this.showjz = false
					console.log(e)
				}
			},
			async dec(e) {
				if (this.isClose) {
					this.showjz = true
					this.updList({
						type: 2,
						e,
					})
				}
				// console.log('listdec', g)
			},
			async add(e) {
				// console.log('listadd', e, )
				// return
				if (this.isClose) {
					if (e.g.SalesStock && e.g.SalesStock <= 0) return this.util.message('商品已售罄', 3)
					if (e.g.stock <= 0) return this.util.message('商品已售罄', 3)
					this.showjz = true
					if ((e.g.isSpecs != 1 && e.g.isMaterial != 1 && e.g.isAttr != 1) || e.g.hasOwnProperty('groupId')) {
						this.updList({
							type: 1,
							e,
						})
					} else {
						this.showGg = true
						this.goodsInfo = e.g
						this.showjz = false
					}
				}
			},
			celarCar(e) {
				let arr = this.catrgoryList
				for (let i = 0, len = arr.length; i < len; i++) {
					for (let j = 0, len = arr[i].goods.length; j < len; j++) {
						arr[i].goods[j].num = 0
					}
				}
			},
			lfName(v) {
				let f = v.substr(0, 2),
					s = v.substr(2, 4)
				return v.substr(0, 2)
			},
			lsName(v) {
				return v.substr(2, 5)
			},
			async onmore() {
				let lc = getApp().globalData.gdlocation
				await this.getSjxx({
					storeId: this.storeId,
					// item: this.outin,
					lat: lc.latitude,
					lng: lc.longitude,
				})
				this.go({
					url: '/yb_wm/shop/search/out?page=fastGoods'
				})
			},
			goodinfo(v) {
				// return
				this.go({
					t: 1,
					url: `/yb_wm/shop/in/goods-dl?gid=${v}&storeId=${this.storeId}&page=fastGoods`
				})
			},
			goSelect() {
				this.system.storeSet.storeModel == 2 && this.go({
					url: '/yb_wm/shop/select/index?page=goods&storeId=' + this.storeId
				})
			},
			scdp: utils.throttle(async function(e) {
				let res = await this.util.request({
					'url': this.api.scjk,
					method: 'POST',
					data: {
						collectionId: this.storeId,
						type: 1,
					},
				})
				if (res) {
					this.issc = !this.issc
					this.util.message((this.issc ? '' : '取消') + '收藏成功', 3)
				}
			}, 1000),
			tzdd() {
				app.ddquery = {
					nt: 1,
					t: 4
				}
				this.go({
					t: 6,
					url: '/yb_wm/index/order-index'
				})
			},
		},
		onShow() {
			// if (this.sjxx.moreSet) {
			// 	if (this.storeId != this.storeInfo.id) {
			// 		this.changeStore(this.storeInfo)
			// 	} else {
			// 		// this.refreshList()
			// 	}
			// }
		},
		onShareAppMessage() {
			let p = `yb_cy/shop/goods?storeId=${this.storeId}&userId=${this.uId}`
			return this.util.mpShare({
				t: this.sjxx.storeInfo.name,
				p,
			})
		},
	}
</script>
<style scoped lang="scss">
	@import '@/yb_wm/index/goods.scss';

	.category {
		padding-bottom: 110rpx;
	}
	.borr{
		border:1rpx solid #FF5F2F
	}
	.hihth{
		height: 40rpx;
	}
</style>
