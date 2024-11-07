<template>
	<view class="category bf h100v" :class="(tcyhqshow||tcggshow)&&'bgfix'">
		<!-- <tips></tips> -->
		<view class="posi-f l0 w100">
			<!-- #ifndef H5 -->
			<uni-nav-bar id='uninavbar' :uropcity="1" :uriconopcity='0' :fixed='false' :ispr='false' :border='false'
				:statusBar="true" leftcn='iconjiayuan' rightcn='iconsousuo1' :custommore="true" @on-more='onmore'
				:title="system.name||''">
			</uni-nav-bar>
			<!-- #endif -->
			<view class="header p03 bf" :style="{zIndex: showShopInfo?'2001':'',height:`${pageHeight.topH2}rpx`}">
				<view class="header-bd f-c-xc" :style="{height:`${pageHeight.topH2}rpx`}">
					<view class="f-bt">
						<view class="f-1 f-y-c">
							<!-- <text class="iconfont iconditu1 mr10" :style="{color:tColor}"></text> -->
							<view v-if="sjxx.shopData" class="f-1" style="padding-right: 20rpx;">
								<view class="f-row f32 wei o-h">
									<view class="f-y-c" style="padding-right: 15rpx;" @click="scdp">
										<text class="iconfont mt0 c3" :class="issc?'iconxx':'iconkxx'"
											:style="{color:issc?tColor:''}"></text>
									</view>
									<view class="f-y-c f-1" @click="goSelect">
										<text class="t-o-e f30">{{storeInfo.name}}<text class="ml20 f24 c9 nowei t-o-e">切换门店</text></text>
										<!-- <text class="t-o-e">切换门店</text> -->
										<text v-if="system.storeSet.storeModel==2"
											class="iconfont iconright ml5 c9 f24 mt8"></text>
									</view>
								</view>
								<view class="f-y-c c9 mt5">
									<!-- <text class="iconfont iconditu1 f28 mr10"></text> -->
									<text class="nowei" v-if="storeInfo.distance">距离您{{storeInfo.distance}}</text>
								</view>
							</view>
						</view>
						<view v-if="ModeArr.length" class="f-row ml30">
							<view v-if="ModeArr.length" class="f-c buytype">
								<view v-for="(v,i) in ModeArr" :key='i' class="type bs30 f-c f24 c9"
									:class="{'atype cf f28':buyType==v.value}"
									:style="{background1:buyType==v.value?tColor:''}" @click="changeBuyType(v)">
									{{v.name}}
								</view>
							</view>
							<view v-else class="bf6 f-c myicon bsf">
								<text @click="go({t:2,url:'/yb_cy/my/index'})" class="iconfont iconwd c3"></text>
							</view>
						</view>
					</view>
					<view class="f-bt mt10 c9" v-if='sjxx.discount.newReduction>0 || sjxx.discount.reduce.type'>
						<view class="f-1 f24 flex">
							<view class="f-0" v-if='sjxx.discount.newReduction>0'>
								<text class='text-btnf f22 mr10 p-3-10 bs10 cf5f borr'>新客立减{{sjxx.discount.newReduction}}</text>
							</view>
							<view class="f-1 t-o-e hihth" v-if='sjxx.discount.reduce.type'>
								<text class="text-btnf f22 mr10 p-3-10 bs10 cf5f borr">{{mjtxt}}</text>
							</view>
						</view>
						<!-- <view @click="showShopInfo=!showShopInfo" class="f22 ml20 f-y-c">更多
							<text class='iconfont icondown f22 ml5 c9'></text>
						</view> -->
					</view>
					<view class="f-bt mt20 c9">
						<view class="f-1 f-y-c f24">
							<text class="iconfont icontishi mr15" :style="{color:tColor}"></text>
							<text class="t-o-e">{{sjxx.moreSet.notice}}</text>
						</view>
						<view @click="showShopInfo=!showShopInfo" class="f22 ml20 f-y-c">更多
							<text class='iconfont icondown f22 ml5 c9'></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="h100" :style="{paddingTop:`${pageHeight.topH}px`}">
			<view v-show="showhdp==0" class="bodyer bf">
				<mg-swiper :co='lbswiper' u='rpx' :color='tColor'></mg-swiper>
				<block v-if="goodsList.length>0">
					<view class="m20 b-s-1 p02 bs20">
						<mg-cell cname='p20 f30' last="1" :btt="'商家推荐'||sjxx.orderSet.data.recommend" :arrow="0">
						</mg-cell>
						<goods :addgb='isClose' :storeid='storeInfo.id' type='2' addtype='2' :outin='outin' @dec='dec'
							@add='add' :d-list='goodsList'></goods>
					</view>
				</block>
			</view>
			<view class="category-c f-row" v-if="sjxx.moreSet">
				<!-- 左边导航 -->
				<scroll-view scroll-y class="left-c" scroll-with-animation="true" :scroll-into-view="lsiv"
					:style="{paddingBottom: leftpb}">
					<view class="title-c" :id="'l'+i" :class="{'onSelected':sIndex == i}" v-for="(v,i) in catrgoryList"
						:key="i" @click="choose(i)">
						<view v-if='sIndex == i' class="title-b" :style='{background:tColor}'></view>
						<view v-if='v.isRequire!=2' class="title-bx cf5f f18 nowei">{{v.isRequire==1?'必选':v.customName}}
						</view>
						<view class="title-n f-c-xc" :class="{'ysyj':i==sIndex+1,'yxyj':i==sIndex-1}">
							<block v-if="sjxx.categorySet.display==3">
								<view class="f-y-e">
									<view class="title-img" v-if="v.icon">
										<mg-img m='aspectFit' :src="v.icon" />
									</view>
									<text>{{lfName(v.name)}}</text>
								</view>
								<text class="t-o-e" :class="v.icon?'mt15':''" v-if="lsName(v.name)">{{lsName(v.name)}}</text>
							</block>
							<block v-else-if="sjxx.categorySet.display==2">
								<view class="f-x-c">
									<view class="title-img" v-if="v.icon">
										<mg-img m='aspectFit' :src="v.icon" />
									</view>
								</view>
								<text class="t-c t-o-e" :class="v.icon?'mt15':''">{{v.name}}</text>
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
				<scroll-view lower-threshold='100' scroll-y class="f-g-1 right-c" :scroll-into-view="rsiv"
					@scroll="myscroll" @scrolltoupper='myscrolltoupper' :style="{paddingBottom: rightpb}">
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
									<view class="flex">
										<view class="mt8" v-if="co.aloneType=='1'">
											<text class='text-btnf f22 mr10 p-3-10 bs5':style="{background:'#e6e3e3',color:'#666',}">单点不配送</text>
										</view>
										<view v-if="co.labelName||co.activityGoodData.type>3" class="mt8">
											<text v-if="co.labelName" class='text-btnf f22 mr10 p-3-10 bs5'
												:style="{background:`rgba(${cTR(co.labelColor)},0.1)`,color:co.labelColor,}">{{co.labelName}}</text>
											<text v-if="co.activityGoodData.type>3" class='text-btnf f22 mr10 p-3-10 bs5'
												:style="{background:ztqs,color:tColor,}">{{co.activityGoodData.type==4?`第二件${Number(co.activityGoodData.discount)}折`:'买一送一'}}</text>
										</view>
									</view>
									<view v-if="co.body" class="mt8 t-o-e2 f22">{{co.body}}</view>
									<view v-if="system.switch.saleShow==1||system.switch.stockShow==1"
										class="mt8 f-raw">
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
											<!-- <text class="f30 mr5">{{sl}}</text>{{co.price}}
											<text v-if="1==1" class="nowei c9 f24">/{{co.unit||'个'}}</text>
											<text v-if="system.switch.scribingPriceShow==1" class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text> -->
										</view>
										<view v-if="(co.isSpecs==1||co.isMaterial==1||co.isAttr==1)"
											@click.stop="add({addwz:1,g:co})" class="f-g-0 cartggc f-c">
											<view class='text-btnf f24 f-c ggc'
												:style="{background:isClose?tColor:'#ccc'}">
												<text>选 择</text>
												<text v-if='co.num>0' class="dot f-c"
													:style="{background:isClose?tColor:'#ccc'}">{{co.num}}</text>
											</view>
										</view>
										<view v-else class="f-g-0 f-bt">
											<view v-if="co.num>0" class="reducecon active f-y-c">
												<view @click.stop="dec({addwz:1,g:co})" class="cartc f-c">
													<button class="cartdec"
														:style="{borderColor:isClose?tColor:'#ccc'}">
														<view class="cartdecab"
															:style="{background:isClose?tColor:'#ccc'}"></view>
													</button>
												</view>
												<text class="f36 ma c0">{{co.num}}</text>
											</view>
											<view @click.stop="add({addwz:1,g:co})" class="cartc f-c">
												<button class="cartadd"
													:style="{background:isClose?tColor:'#ccc'}"></button>
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
									<view v-if="co.maxNum>0||co.minNum>1" class="mt8">
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
					<view class="f-g-1 bf">
						<scroll-view  scroll-y class="wh right-c" :scroll-into-view="rsiv2" :style="{paddingBottom: rightpb}">
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
											<view class="flex">
												<view class="mt8" v-if="co.aloneType=='1'">
													<text class='text-btnf f22 mr10 p-3-10 bs5':style="{background:'#e6e3e3',color:'#666',}">单点不配送</text>
												</view>
												<view v-if="co.labelName||co.activityGoodData.type>3" class="mt8">
													<text v-if="co.labelName" class='text-btnf f22 mr10 p-3-10 bs5'
														:style="{background:`rgba(${cTR(co.labelColor)},0.1)`,color:co.labelColor,}">{{co.labelName}}</text>
													<text v-if="co.activityGoodData.type>3" class='text-btnf f22 mr10 p-3-10 bs5'
														:style="{background:ztqs,color:tColor,}">{{co.activityGoodData.type==4?`第二件${Number(co.activityGoodData.discount)}折`:'买一送一'}}</text>
												</view>
											</view>
											<view v-if="co.body" class="mt8 t-o-e2 f22">{{co.body}}</view>
											<view v-if="system.switch.saleShow==1||system.switch.stockShow==1"
												class="mt8 f-raw">
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
													<!-- <text class="f30 mr5">{{sl}}</text>{{co.price}}
													<text v-if="1==1" class="nowei c9 f24">/{{co.unit||'个'}}</text>
													<text v-if="system.switch.scribingPriceShow==1" class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text> -->
												</view>
												<view v-if="(co.isSpecs==1||co.isMaterial==1||co.isAttr==1)"
													@click.stop="add({addwz:1,g:co})" class="f-g-0 cartggc f-c">
													<view class='text-btnf f24 f-c ggc'
														:style="{background:isClose?tColor:'#ccc'}">
														<text>选 择</text>
														<text v-if='co.num>0' class="dot f-c"
															:style="{background:isClose?tColor:'#ccc'}">{{co.num}}</text>
													</view>
												</view>
												<view v-else class="f-g-0 f-bt">
													<view v-if="co.num>0" class="reducecon active f-y-c">
														<view @click.stop="dec({addwz:1,g:co})" class="cartc f-c">
															<button class="cartdec"
																:style="{borderColor:isClose?tColor:'#ccc'}">
																<view class="cartdecab"
																	:style="{background:isClose?tColor:'#ccc'}"></view>
															</button>
														</view>
														<text class="f36 ma c0">{{co.num}}</text>
													</view>
													<view @click.stop="add({addwz:1,g:co})" class="cartc f-c">
														<button class="cartadd"
															:style="{background:isClose?tColor:'#ccc'}"></button>
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
											<view v-if="co.maxNum>0||co.minNum>1" class="mt8">
												<text v-if="co.minNum>1" class="cf5f mr20">{{co.minNum}}份起售</text>
												<text v-if="co.maxNum>0" class="cf5f">限{{co.maxNum}}份</text>
											</view>
										</view>
									</view>
								</view>
							</block>
							<view class="conw2mb"></view>
						</scroll-view>
					</view>
				</block>
			</view>
		</view>
		<block v-if='sjxx.shopData'>
			<tcyhq @close='tcyhqshow=false' :co='tcCoupon' v-model="tcyhqshow" :color='tColor'></tcyhq>
			<!-- <tcgg :list='tcggList' v-model="tcggshow"></tcgg> -->
			<goods-car ref='goodscar' id="goodscar" :show.sync='showCar' :carBtm="system.outTabbar!=1?isIpx?'155':'115':'0'"
				:carlistPab="system.outTabbar!=1?isIpx?'265':'225':'110'" :buytype='buyType' :sjxx='sjxx' @dec='dec'
				@add='add' @celar='celarCar' :goods-list='catrgoryList' :startmoney='startMoney'></goods-car>
			<store-info v-model="showShopInfo" :co='sjxx' :qlist='sjyhq' :sjqb="sjqb"></store-info>
			<store-shop v-model="showShopSelect" :co='sjxx' :storeInfo='storeInfo' @select-shop='goSelect'></store-shop>
		</block>
		<spec :outin='outin' @add='add' :co='goodsInfo' :storeid='storeInfo.id' :systemGood='system' v-model="showGg"></spec>
		<tab-bar></tab-bar>
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
	import storeShop from '@/components/goods/store/store-shop.vue'
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
			storeShop,
		},
		data() {
			return {
				showloading: true,
				catrgoryList: [],
				goodsList: [],
				sIndex: 0,
				// isscroll: false,
				rsiv: '', //右侧滑值
				rsiv2: '', 
				lsiv: '', //左侧滑值
				showGg: false,
				buyType: 2,
				showShopInfo: false, //更多门店信息
				showShopSelect:false,
				outin: '1', //1out2店内
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
				showhdp: 0,
			}
		},
		mixins: [utilMixins],
		async onLoad(options) {
			// class GLRandom {
			// 	constructor(min, max, percentage = new Map()) {
			// 		this.min = Math.trunc(min);
			// 		this.max = Math.trunc(max);
			// 		this.MATH_RANGE = 100;
			// 		this.percentage = percentage;
			// 	}

			// 	get percentage() {
			// 		if (!this._percentage) {
			// 			this._percentage = new Map();
			// 		}
			// 		return this._percentage;
			// 	}
			// 	set percentage(map) {
			// 		let result = Array.from(map.values()).reduce((p, v, a) => {
			// 			return p - v;
			// 		}, 1);
			// 		for (let i = this.min; i < this.max; i++) {
			// 			if (map.has(i)) {
			// 				this.percentage.set(i, map.get(i));
			// 			} else {
			// 				this.percentage.set(i, result / (this.max - this.min - map.size));
			// 			}
			// 		}
			// 	}
			// 	range() {
			// 		let [start, random, keys] = [0, this.MATH_RANGE, Array.from(this.percentage.keys())];
			// 		for (let i = 0; i < keys.length; i++) {
			// 			let temp = this.percentage.get(keys[i]);
			// 			this.percentage.set(keys[i], [start, start += temp * random]);
			// 		}
			// 	}
			// 	create() {
			// 		let num = Math.random() * this.MATH_RANGE;
			// 		for (let data of this.percentage.entries()) {
			// 			if (num >= data[1][0] && num < data[1][1]) {
			// 				return data[0];
			// 			}
			// 		}
			// 		return null;
			// 	}
			// }
			// let random = new GLRandom(40, 100);
			// random.percentage = new Map([
			// 	[41, 0.2],
			// 	[46, 0.5],
			// 	[90, 0.05]
			// ])
			// random.range();
			// (function() {
			// 	console.log('123', !!('0' && {}))
			// })()
			// console.log(random.create());

			// function encrypt(str, pwd) {
			// 	if (pwd == null || pwd.length <= 0) {
			// 		return null;
			// 	}
			// 	var prand = "";
			// 	for (var i = 0; i < pwd.length; i++) {
			// 		prand += pwd.charCodeAt(i).toString();
			// 	}
			// 	var sPos = Math.floor(prand.length / 5);
			// 	var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand
			// 		.charAt(sPos * 4) + prand.charAt(sPos * 5));
			// 	var incr = Math.ceil(pwd.length / 2);
			// 	var modu = Math.pow(2, 31) - 1;
			// 	if (mult < 2) {
			// 		return null;
			// 	}
			// 	var salt = Math.round(Math.random() * 1000000000) % 100000000;
			// 	prand += salt;
			// 	while (prand.length > 10) {
			// 		prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length)))
			// 			.toString();
			// 	}
			// 	prand = (mult * prand + incr) % modu;
			// 	var enc_chr = "";
			// 	var enc_str = "";
			// 	for (var i = 0; i < str.length; i++) {
			// 		enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
			// 		if (enc_chr < 16) {
			// 			enc_str += "0" + enc_chr.toString(16);
			// 		} else enc_str += enc_chr.toString(16);
			// 		prand = (mult * prand + incr) % modu;
			// 	}
			// 	salt = salt.toString(16);
			// 	while (salt.length < 8) salt = "0" + salt;
			// 	enc_str += salt;
			// 	return enc_str;
			// }

			// function decrypt(str, pwd) {
			// 	if (str == null || str.length < 8) {
			// 		return;
			// 	}
			// 	if (pwd == null || pwd.length <= 0) {
			// 		return;
			// 	}
			// 	var prand = "";
			// 	for (var i = 0; i < pwd.length; i++) {
			// 		prand += pwd.charCodeAt(i).toString();
			// 	}
			// 	var sPos = Math.floor(prand.length / 5);
			// 	var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand
			// 		.charAt(sPos * 4) + prand.charAt(sPos * 5));
			// 	var incr = Math.round(pwd.length / 2);
			// 	var modu = Math.pow(2, 31) - 1;
			// 	var salt = parseInt(str.substring(str.length - 8, str.length), 16);
			// 	str = str.substring(0, str.length - 8);
			// 	prand += salt;
			// 	while (prand.length > 10) {
			// 		prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length)))
			// 			.toString();
			// 	}
			// 	prand = (mult * prand + incr) % modu;
			// 	var enc_chr = "";
			// 	var enc_str = "";
			// 	for (var i = 0; i < str.length; i += 2) {
			// 		enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
			// 		enc_str += String.fromCharCode(enc_chr);
			// 		prand = (mult * prand + incr) % modu;
			// 	}
			// 	return enc_str;
			// }
			// console.log(encrypt('b-ke','12345678'),decrypt('bc61c8390507f246','12345678'))
			// #ifdef H5
			this.util.setNT(this.system.name || '下单页')
			// #endif
			uni.$on('qjjtsj', (data) => {
				if (data.showgwc) {
					this.showCar = true
				} else if (data.hasOwnProperty('flid')) {
					this.flid = ''
					setTimeout(() => {
						this.flid = data.flid
					})
				} else if (data.wmtz) {
					// #ifdef MP-TOUTIAO
					this.selectComponent('#goodscar').$vm.goPay(2)
					// #endif
					// #ifndef MP-TOUTIAO
					this.$refs.goodscar.goPay(2)
					// #endif
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
			console.log(this.storeId)
			this.query = options
			await this.getLoginInfo({
				inviteId: options.userId
			})
			this.getDw()
			this.getSystem()
			this.getLayout()
			this.getConfig({
				key: 'orderset',
				api: 'ddsz',
			}).then(() => {
				if(this.orderset.orderStore=='1'){
					this.showShopSelect = true
				}
			})
			// console.log('%c options ','color: white; background-color: #f44444', options);
		},
		onHide() {
			this.startMoney = ''
			// console.log('onHide')
		},
		computed: {
			...mapState(['sjxx']),
			...mapState({
				scarList: state => state.scarList.out.data || [],
				storeInfo: state => state.config.storeInfo,
				orderset: state => state.config.orderset,
			}),
			pageHeight() {
				if (!getApp().sgheight) {
					let h = uni.getSystemInfoSync(),
						topH = +(h.statusBarHeight + 44 + uni.upx2px(
							208)).toFixed(2),
							topH2 = 198 + 26
							// console.log(123,topH2)
							// if(this.sjxx){
							// 	if(this.sjxx.discount.newReduction>0 || this.sjxx.discount.reduce.type){
							// 		topH+=15
							// 		topH2+=23
							// 	}
							// 	if(this.sjxx.discount.newReduction>0 && this.sjxx.discount.reduce.type){
							// 		topH+=15
							// 		topH2+=23
							// 	}
							// }
					getApp().sgheight = {
						// mainH: +(h.windowHeight - topH).toFixed(2),
						topH,
						topH2,
					}
				}
				return getApp().sgheight
			},
			lbswiper() {
				return {
					class: 'mt10 mb20',
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
			ModeArr() {
				let arr = []
				if (this.sjxx.moreSet) {
					if (this.sjxx.moreSet.distributionSupport.length == 2) {
						arr = [{
							name: this.sjxx.moreSet.selfName,
							value: '2',
						}, {
							name: this.sjxx.moreSet.outName,
							value: '1',
						}] //1外卖2自取
						if (this.sjxx.moreSet.auto == 2) { //2外卖优先
							arr.reverse()
						}
						this.buyType = +arr[0].value
						if (this.xdtype) {
							this.buyType = this.xdtype
						}
					} else if (this.sjxx.moreSet.distributionSupport.find(v => v == 1)) {
						this.buyType = 1
					} else if (this.sjxx.moreSet.distributionSupport.find(v => v == 2)) {
						this.buyType = 2
					}
				}
				// console.log('ModeArrModeArr', this.buyType, arr, this.xdtype)
				return arr
			},
			isClose() {
				return this.sjxx.shopData && (this.sjxx.shopData.storeOpen == 1 || this.sjxx.shopData.storeOpen == 2 &&
					this.sjxx.moreSet
					.status == 1)
			},
			cshow() {
				return this.scarList.length > 0
			},
			leftpb() {
				if (this.system.outTabbar == 1) {
					return this.cshow ? '305rpx' : '115rpx'
				} else {
					return this.cshow ? '260rpx' : '115rpx'
				}
			},
			rightpb() {
				if (this.system.outTabbar == 1) {
					return this.cshow ? '230rpx' : '115rpx'
				} else {
					return this.cshow ? '230rpx' : '115rpx'
				}
			},
			qhfl() {
				return {
					jsgdwb: this.jsgdwb,
					flid: this.flid,
				}
			},
			ztqs() {
				return `rgba(${this.cTR(this.tColor)},0.1)`
			},
			mjtxt() {
				if (this.sjxx.discount && this.sjxx.discount.reduce.type == 1) {
					return `${this.sjxx.discount.reduce.moneyArr[0].fullMoney}减${this.sjxx.discount.reduce.moneyArr[0].money}`
				} else if (this.sjxx.discount && this.sjxx.discount.reduce.type == 2) {
					return this.sjxx.discount.reduce.moneyArr.map(v => `满${v.fullMoney}减${v.money}`).reverse().toString()
				}
			},
		},
		watch: {
			qhfl: {
				handler(newVal) {
					if (newVal.jsgdwb && newVal.flid) {
						if (this.sjxx.data.find(v => v.id == newVal.flid)) {
							let index = this.sjxx.data.findIndex(v => v.id == newVal.flid)
							this.sIndex = index;
							this.noscroll = true
							this.lsiv = `l${index-3}`
							this.rsiv = `r${index}`
							setTimeout(() => {
								this.noscroll = false
							}, 500)
							// console.log('切换选择分类')
						}
					}
					// console.log('qhfl newVal', newVal)
				},
				immediate: true
			},
		},
		methods: {
			...mapActions(["getSjxx", "getConfig", "supdCar", "getMycar"]),
			...mapMutations(["setScarList"]),
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
				app.xzdzInfo = null //选择的外卖地址清空
				this.setScarList({
					data: {}
				})
				this.init()
			},
			async init(type = 1) {
				let lc = getApp().globalData.gdlocation
				// console.time()
				await this.getSjxx({
					storeId: this.storeId,
					// item: this.outin,
					lat: lc.latitude,
					lng: lc.longitude,
				})
				await this.getMycar({
					storeId: this.sjxx.shopData.id
				})
				// console.timeEnd()
				this.storeId = this.sjxx.shopData.id
				// this.dates = new Date().getTime()
				this.goodsList = utils.deepCopy(this.sjxx.recommendData)
				this.catrgoryList = utils.deepCopy(this.sjxx.data)
				this.showloading = false
				// console.log(this.sjxx.data, this.goodsList)
				//购物车
				// console.time('gwc')
				for (let c = 0; c < this.scarList.length; c++) {
					for (let i = 0; i < this.catrgoryList.length; i++) {
						for (let j = 0; j < this.catrgoryList[i].goods.length; j++) {
							if (this.catrgoryList[i].goods[j].id == this.scarList[c].goodsId) {
								this.catrgoryList[i].goods[j].num = +this.catrgoryList[i].goods[j].num + (+this
									.scarList[c].num)
							}
						}
					}
					for (let i = 0; i < this.goodsList.length; i++) {
						if (this.goodsList[i].id == this.scarList[c].goodsId) {
							this.goodsList[i].num = +this.goodsList[i].num + (+this.scarList[c].num)
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
				// console.log(data.map(v=>v.goods))
				//访问记录
				setTimeout(async () => {
					await this.getOtherData()
					this.addFwjl({
						storeId: this.storeId,
						origin: '2'
					})
				}, 1000)
			},
			//获取弹窗数据
			async getOtherData() {
				this.issc = this.sjxx.shopData.isCollection == 1
				let {
					data
				} = await this.util.request({
					'url': this.api.qtsjjh,
					data: {
						location: 1,
						storeId: this.storeId,
					}
				})
				if (data.windowCoupon.hasOwnProperty('name')) {
					this.tcCoupon = data.windowCoupon
					this.tcyhqshow = true
				}
				this.sjyhq = data.storeCoupon
				this.sjqb = data.rollBag
			},
			//第一种样式
			getHeightList() {
				let selectorQuery = uni.createSelectorQuery();
				// selectorQuery.select('#main').boundingClientRect((rects) => {
				// 	this.pageHeight.mainB = rects.top - this.pageHeight.topH;
				// 	this.isscroll = this.pageHeight.mainB <= 5
				// 	console.log(rects, this.pageHeight.mainB)
				// });
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
				// if (!this.isscroll) {
				// 	this.isscroll = true
				// 	uni.pageScrollTo({
				// 		scrollTop: this.pageHeight.mainB,
				// 		duration: 0,
				// 	})
				// }
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
				// console.log('myscroll', this.noscroll, e)
				//引入节流	
				if (this.noscroll) return
				let scroll_top = e.detail.scrollTop;
				//判断当前的scrollTop在哪个区间内;
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
						this.rsiv = '' //这里不设置空导致siv不触发
						break
					}
				}
				// let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
				// 	index + 1]);
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
				let garr = this.goodsList
				for (let i = 0, len = garr.length; i < len; i++) {
					garr[i].num = 0
					for (let c = 0; c < carr.length; c++) {
						if (garr[i].id == carr[c].goodsId) {
							garr[i].num += +carr[c].num
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
					} : { //列表加
						storeId: this.storeId,
						type: p.type,
						goodsId: p.e.g.id,
					} : { //购物车加
						storeId: this.storeId,
						type: p.type,
						goodsId: p.e.g.goodsId,
						id: p.e.g.id,
					})
					// let carRes
					// if (e.updType == 1) {
					// 	carRes = await this.addCar({
					// 		g: e.g,
					// 		gnum: res,
					// 	})
					// } else {
					// 	carRes = await this.decCar({
					// 		g: e.g,
					// 		gnum: res,
					// 	})
					// }
					// console.log(res)
					//return
					if (res >= 0) {
						//改变商品列表里的数量
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
						//改变推荐商品里的数量
						let garr = this.goodsList
						for (let i = 0, len = garr.length; i < len; i++) {
							if (p.e.addwz == '1' && garr[i].id == p.e.g.id) {
								garr[i].num = res
							} else if (p.e.addwz == '2' && garr[i].id == p.e.g.goodsId) {
								garr[i].num = res
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
					if ((e.g.isSpecs != 1 && e.g.isMaterial != 1 && e.g.isAttr != 1) || e.g.hasOwnProperty(
							'groupId')) {
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
				//改变推荐商品里的数量
				let garr = this.goodsList
				for (let i = 0, len = garr.length; i < len; i++) {
					garr[i].num = 0
				}
			},
			changeBuyType(v) {
				if (v.value == this.buyType) return
				if (v.value == 1 && this.ModeArr[0].value == 2) { //外卖在后
					console.log('用户想切换外卖')
					app.xzdzInfo = null
					this.go({
						t: 1,
						url: `/yb_wm/my/address/index?from=2&storeId=${this.storeId}`,
					})
					return
				} else if (v.value == 2) {
					app.xzdzInfo = null
				}
				// console.log(v, this.ModeArr)
				this.buyType = this.buyType == 1 ? 2 : 1
			},
			trigger(e) {
				this.go({
					t: e.index > 1 ? 1 : 2,
					url: e.item.url
				})
				console.log(e);
			},
			lfName(v) {
				let f = v.substr(0, 2),
					s = v.substr(2, 4)
				return v.substr(0, 2)
			},
			lsName(v) {
				return v.substr(2, 5)
			},
			onmore() {
				this.go({
					url: '/yb_wm/shop/search/out?page=shopGoods'
				})
			},
			goodinfo(v) {
				this.go({
					t: 1,
					url: `/yb_wm/shop/out/goods-dl?gid=${v}&storeId=${this.storeId}&page=shopGoods&buyType=${this.buyType}`
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
			//页面滚动方法
			// goTop() {
			// 	uni.pageScrollTo({
			// 		scrollTop: this.other_height,
			// 		duration: 100
			// 	});
			// },
		},
		onShow() {
			//判断页面是返回，从商品详情页返回等
			// console.log('goods onShowonShowonShow', this.sjxx.moreSet)
			if (this.sjxx.moreSet) {
				// console.log('已加载过', this,this.storeInfo)
				if (this.storeId != this.storeInfo.id) {
					this.changeStore(this.storeInfo)
					// console.log('商家id切换了')
				} else {
					//判断自取外卖都有，并且自取在前
					if (this.ModeArr.length && this.ModeArr[0].value == 2) {
						if (this.buyType != 1 && app.xzdzInfo) { //选择了地址id,自动选中外卖
							this.buyType = 1
							console.log('选择了地址')
						} else if (this.buyType == 1 && !app.xzdzInfo) { //下单前选择的外卖,下完单后返回选中自取
							this.buyType = 2
						}
					}
					// else if (app.wmxzdz == 1 && app.xzdzInfo && (this.ModeArr.length && this.ModeArr[0].value == 1 || !this.ModeArr.length &&
					// 		this.buyType ==
					// 		1)) {
					// 	this.showloading = true
					// 	this.$refs.goodscar.goPay()
					// 	app.wmxzdz = 2
					// 	setTimeout(() => {
					// 		this.showloading = false
					// 	}, 200)
					// 	console.log('外卖在前')
					// }
					this.refreshList()
					// console.log('商家id没换')
				}
				this.$refs.goodscar.closeCar();
			} else {
				// console.log('没加载过')
			}
			// console.log('onShow this.ModeArr', this.ModeArr) 切换店铺ModeArr是异步的，这里读取是同步
			// console.log('goods onShow ModeArr', this.sjxx, this.ModeArr, 'addresInfo', app.xzdzInfo, 'storeId', this.storeId)
		},
		// onPageScroll(e) {
		// 	console.log(this.isscroll)
		// 	if (!this.isscroll && this.pageHeight.mainB - e.scrollTop <= 2) {
		// 		this.isscroll = true
		// 		console.log('111')
		// 	} else if (e.scrollTop < this.pageHeight.mainB) {
		// 		this.isscroll = false
		// 		console.log('222')
		// 	}
		// 	console.log('pscroll', e.scrollTop)
		// },
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
	@import './goods.scss';
	.borr{
		border:1rpx solid #FF5F2F
	}
	.hihth{
		height: 40rpx;
	}
</style>
