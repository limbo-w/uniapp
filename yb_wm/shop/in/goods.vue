<template>
	<view class="category bf h100" :class="(tcyhqshow||tcggshow)&&'bgfix'">
<!-- 		<uni-nav-bar id='uninavbar' :isleft="false" :uropcity="1" :fixed='true' :ispr='false' :statusBar="true" :border="false"
		 :title="sjxx.shopData&&sjxx.shopData.name||'扫码点单'">
		</uni-nav-bar> -->
		<view class="posi-f l0 w100">
		<uni-nav-bar id='uninavbar' :uropcity="1" :uriconopcity='0' :fixed='false' :ispr='false' :border='false'
			:statusBar="true" leftcn='iconjiayuan' rightcn='iconsousuo1' :custommore="true" @on-more='onmore'
			:title="sjxx.shopData&&sjxx.shopData.name||'扫码点单'">
		</uni-nav-bar>
		<view class="posi-f t0 w100 headerc p03 bf" :style="{top:util.getSb().customNavh+'px'}">
			<view class="h100 f-c-xc">
				<view class="f-bt">
					<view class="f-1 f-y-c">
						<view v-if="storeInfo.tableInfo" class="f-y-c f32 c0">
							<text class="iconfont icondndc mr10 c0 f40"></text>
							<text>{{storeInfo.tableInfo.typeName}}</text>
							<text class="ml10 wei">{{storeInfo.tableInfo.name}}</text>
							<text v-if="paIx"><text class="wei">·{{paIx}}</text>位</text>
						</view>
					</view>
					<view class="f-row ml30">
						<view class="f-c">
							<text @click="tzdd" class="iconfont icondd f48 c3"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
		<view class="h100" :style="{paddingTop:util.getSb().customNavh+'px'}">
			<view class="h100 pt90">
				<view v-show="showhdp==0" class="bodyer bf">
					<view class="f-x-bt">
						<view class="f44 wei t-o-e">{{sjxx.shopData.name}}</view>
					</view>
					<view class="f-bt mt10 c9" v-if='sjxx.discount.reduce.type'>
						<view class="f-1 f24 flex">
							<view class="f-1 t-o-e hihth" v-if='sjxx.discount.reduce.type'>
								<text class="text-btnf f22 mr10 p-3-10 bs10 cf5f borr">{{mjtxt}}</text>
							</view>
						</view>
					</view>
					<view class="f-bt mt15 c9 mb20">
						<view class="f-1 f-y-c f24">
							<text class="iconfont icontishi mr15" :style="{color:tColor}"></text>
							<text class="t-o-e">{{sjxx.moreSet.notice}}</text>
						</view>
						<view @click="showShopInfo=!showShopInfo" class="f22 ml20 f-y-c">更多
							<text class='iconfont icondown f22 ml5 c9'></text>
						</view>
					</view>
					<mg-swiper :co='lbswiper' u='rpx' :color='tColor'></mg-swiper>
					<!-- <block v-if="goodsList.length>0">
						<view class="m20 b-s-1 p02 bs20">
							<mg-cell cname='p20 f30' last="1" :btt="'商家推荐'||sjxx.orderSet.data.recommend" :arrow="0"></mg-cell>
							<goods :addgb='isClose' :storeid='storeInfo.id' type='2' addtype='2' :outin='outin' @dec='dec' @add='add'
							 :d-list='goodsList'></goods>
						</view>
					</block> -->
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
						<view v-for="(v,i) in [1,1,1,1]" :key='i' class="title-c">
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
						<scroll-view lower-threshold='100' scroll-y class="f-g-1 right-c" :scroll-into-view="rsiv2"
						 :style="{paddingBottom: rightpb}">
							<block v-if="catrgoryList.length">
								<view class="c-item" id='r0' v-if="catrgoryList[sIndex].goods.length">
									<view class="c-title">{{catrgoryList[sIndex].name}}</view>
									<view @click='goodinfo(co.id)' v-for="(co,i) in catrgoryList[sIndex].goods" :key="i" class='conw2 f-row p2'>
										<view class="f-g-0 bf6 left bs5 p-r">
											<mg-img cname='wh' :src='co.icon' />
											<view v-if='co.stock<=0' class="p-a ysq f-c b0 cf w100 f22">已售罄</view>
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
		<view v-if='sjxx.shopData'>
			<tcyhq @close='tcyhqshow=false' :co='tcCoupon' v-model="tcyhqshow" :color='tColor'></tcyhq>
			<!-- <tcgg :list='tcggList' v-model="tcggshow"></tcgg> -->
			<goods-car type='3' :tableinfo='storeInfo.tableInfo' :outin='outin' :show.sync='showCar' :carBtm="0" :carlistPab="130"
			 :buytype='buyType' :sjxx='sjxx' @dec='dec' @add='add' @celar='celarCar' :goods-list='catrgoryList'></goods-car>
			<store-info type='3' v-model="showShopInfo" :co='sjxx' :qlist='sjyhq' :sjqb="sjqb"></store-info>
		</view>
		<spec :outin='outin' @add='add' :co='goodsInfo' :storeid='storeInfo.id' v-model="showGg"></spec>
		<view v-if="showTable" class="tablec z9999 posi-f udlr">
			<view class="tcbg posi-a wh">
				<mg-img :src="dndcConfig.background||sjxx.shopData.icon"></mg-img>
			</view>
			<view class="posi-r h100 f-col">
				<view class="f-g-1 f-c-c cf">
					<view class="f-y-c">
						<view class="tcimg mr30">
							<mg-img :src="system.icon"></mg-img>
						</view>
						<view class="tctt">{{system.name}}</view>
					</view>
					<view class="tctbt f34 p03">欢迎来到{{sjxx.shopData.name}}</view>
				</view>
				<view class="f-g-0 tbbd o-h p-r">
					<view class="p-a wh bf bs15 f-col tbbdc" :class="{totop:showTotop}">
						<view class="w100 f40 c0 t-l mt20">客官，您几位？</view>
						<view class="f-y-c mt10">
							桌号：<text>{{storeInfo.tableInfo.typeName}}</text><text class="ml10">{{storeInfo.tableInfo.name}}</text>
						</view>
						<view class="tbbdvc f-y-c o-x-s">
							<view @click="dcParr(i+1)" class="f-g-0 tbbdv f30 f-c" :class="{'bva':i+1==paIx}" v-for="(v,i) in parr" :key='i'>{{v}}{{i>9?'':'人'}}</view>
						</view>
						<view class="ljdc f-c b-l-f0f0 f30 cf" @click="ljdc">开始点单</view>
					</view>
				</view>
				<view class="f-g-0 p3 f-c cf">{{system.name+'提供技术支持'}}</view>
			</view>
			<mg-modal :vs='true' :ismr="true" v-model="showxzrs" width="630rpx" :z-index="3000">
				<view class="bf bs10">
					<view class="p3 f30">
						<view class="t-c mb20">选择人数</view>
						<mg-input cname="p23" t='number' max="2" v-model="zdyrs" last='1' ht='人数' pr='请输入' />
					</view>
					<view class="f-row hlt" style="height: 100rpx;">
						<button hover-class='be' class="tcbtn f-1 bf f30 f-c c9" @click="showxzrs=false">取消</button>
						<button :style="{color:'#FF6735'}" hover-class='be' class="tcbtn f-1 bf f30 f-c" @click="qdxzrs">确定</button>
					</view>
				</view>
			</mg-modal>
		</view>
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
	import mgInput from '@/components/form/mg-input.vue'
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
			mgInput,
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
				outin: '2',
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
				storeInfo: {},
				showTable: false,
				showTotop: false,
				parr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '更多'],
				paIx: 1,
				showxzrs: false,
				zdyrs: '',
				sjxx: {},
				showhdp:'',
			}
		},
		mixins: [utilMixins],
		async onLoad(options) {
			// uni.$on('qjjtsj', (data) => {
			// 	if (data.showgwc) {
			// 		this.showCar = true
			// 	} else if (data.hasOwnProperty('flid')) {
			// 		this.flid = ''
			// 		setTimeout(() => {
			// 			this.flid = data.flid
			// 		})
			// 	} else {
			// 		this.xdtype = ''
			// 		this.xdtype = data
			// 	}
			// })
			// return
			let tableId = utils.getOptions(options, {
				key: 'tableId',
			})
			this.query = options
			this.tableId = tableId
			if (!tableId) {
				return this.tips()
			}
			await Promise.all([this.getLoginInfo(), this.getConfig({
				key: 'orderset',
				api: 'ddsz',
			})])
			let lc = {}
			if (this.dndcConfig.distanceOpen == 1) {
				lc = await getDw({
					t: 0
				})
			}
			let res = await this.util.request({
				'url': this.api.tsczxq,
				method: 'POST',
				data: {
					tableId: tableId,
					lat: lc.latitude || '',
					lng: lc.longitude || '',
				}
			})
			if (res) {
				res.data.tableId = tableId
				this.storeInfo = {
					id: res.data.storeId,
					tableInfo: res.data,
				}
				this.storeId = res.data.storeId
			} else {
				return this.tips()
			}
			this.supdCarbp = {
				storeId: this.storeId,
				tableId: tableId,
				item: this.outin,
				key: 'ins',
			}
			this.getDw()
			this.getSystem()
			// console.log('%c options ','color: white; background-color: #f44444', options);
		},
		onShow() {
			if (this.storeInfo.id) {
				setTimeout(async () => {
					await this.getMycar({ ...this.supdCarbp,
						mask: 1
					})
					this.refreshList()
				}, 100)
			}
		},
		computed: {
			...mapState({
				scarList: state => state.scarList.ins.data || [],
				dndcConfig: state => state.config.orderset.instore || {},
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
			isClose() {
				return this.sjxx.shopData && (this.sjxx.shopData.storeOpen == 1 || this.sjxx.shopData.storeOpen == 2 && this.sjxx.moreSet
					.status == 1)
			},
			leftpb() {
				if (this.system.outTabbar == 1) {
					return '0'
				} else {
					return '100rpx'
				}
			},
			rightpb() {
				if (this.system.outTabbar == 1) {
					return '0'
				} else {
					return '100rpx'
				}
			},
			mjtxt() {
				if (this.sjxx.discount && this.sjxx.discount.reduce.type == 1) {
					return `${this.sjxx.discount.reduce.moneyArr[0].fullMoney}减${this.sjxx.discount.reduce.moneyArr[0].money}`
				} else if (this.sjxx.discount && this.sjxx.discount.reduce.type == 2) {
					return this.sjxx.discount.reduce.moneyArr.map(v => `满${v.fullMoney}减${v.money}`).reverse().toString()
				}
			},
			// qhfl() {
			// 	return {
			// 		jsgdwb: this.jsgdwb,
			// 		flid: this.flid,
			// 	}
			// },
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
			ljdc() {
				if (this.paIx == '') return this.util.message('请选择人数', 3)
				this.storeInfo.tableInfo.pnum = this.paIx
				this.showTable = false
			},
			dcParr(i) {
				if (i == 11) return this.showxzrs = true
				this.paIx = i
			},
			qdxzrs() {
				if (this.zdyrs == '') return this.util.message('请输入人数', 3)
				this.storeInfo.tableInfo.pnum = this.paIx = this.zdyrs
				this.showTable = false
			},
			tips() {
				uni.showModal({
					title: '提示',
					content: '未获取到桌位信息或者超出商家范围',
					showCancel: false,
					success: res => {
						this.go({
							t: 6,
							url: '/yb_wm/index/index'
						})
					},
				});
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
					key: 'ins',
					data: {}
				})
				this.init()
			},
			async init(type = 1) {
				let lc = getApp().globalData.gdlocation
				await this.getSjxx2({
					storeId: this.storeId,
					goodsType: 2,
					lat: lc.latitude,
					lng: lc.longitude,
				})
				await this.getMycar(this.supdCarbp)
				this.storeId = this.sjxx.shopData.id
				this.catrgoryList = utils.deepCopy(this.sjxx.data)
				if (!this.sjxx.data.length) {
					uni.showModal({
						title: '提示',
						content: '暂无堂食商品',
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
				this.refreshList()
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
				//访问记录
				setTimeout(async () => {
					await this.getOtherData()
					// this.addFwjl({
					// 	storeId: this.storeId,
					// 	origin: '2'
					// })
				}, 1000)
			},
			refreshList() {
				this.showjz = true
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
				this.showjz = false
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
				if (data.moreSet.orderMode == 1) {
					if (this.storeInfo.tableInfo.orderInfo) {
						this.showLoading = false
						if (!this.query.tableId) {
							this.go({
								t: 2,
								url: '/yb_wm/shop/in/order-dl?id=' + this.storeInfo.tableInfo.orderInfo.id
							})
						}
					} else {
						if (this.storeInfo.tableInfo.state == 1) {
							this.showTable = true
							this.showLoading = false
							setTimeout(() => {
								this.showTotop = true
							}, 100)
						} else {
							this.showLoading = false
						}
					}
				} else {
					// if (this.storeInfo.tableInfo.orderInfo) {
					// 	this.showLoading = false
					// 	this.go({
					// 		t: 2,
					// 		url: '/yb_wm/shop/in/order-dl?id=' + this.storeInfo.tableInfo.orderInfo.id
					// 	})
					// } else {
					this.showTable = true
					this.showLoading = false
					setTimeout(() => {
						this.showTotop = true
					}, 100)
					// }
				}
			},
			//获取弹窗数据
			async getOtherData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.qtsjjh,
					data: {
						location: 2,
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
			//
			async updList(p) {
				// console.log('updList', p)
				// return
				try {
					let res = await this.supdCar(p.e.addwz == '1' ? p.e.g.ggnum ? {
						...this.supdCarbp,
						type: p.type,
						goodsId: p.e.g.id,
						groupId: p.e.g.groupId || '',
						material: p.e.g.material || [],
						attribute: p.e.g.attribute || '',
						num: p.e.g.ggnum,
					} : {
						...this.supdCarbp,
						type: p.type,
						goodsId: p.e.g.id,
					} : {
						...this.supdCarbp,
						type: p.type,
						goodsId: p.e.g.goodsId,
						id: p.e.g.id,
					})
					if (res >= 0) {
						this.refreshList()
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
					url: `/yb_wm/shop/search/out?page=inGoods&tableId=${this.tableId}`
				})
			},
			goodinfo(v) {
				// return
				this.go({
					t: 1,
					url: `/yb_wm/shop/in/goods-dl?gid=${v}&storeId=${this.storeId}&page=inGoods&tableId=${this.tableId}`
				})
			},
			goSelect() {
				this.system.storeSet.storeModel == 2 && this.go({
					url: '/yb_wm/shop/select/index?page=goods&storeId=' + this.storeId
				})
			},
			tzdd() {
				this.go({
					t: 1,
					url: '/yb_wm/shop/in/indd'
				})
			},
		},
		// onShareAppMessage() {
		// 	let p = `yb_cy/shop/goods?storeId=${this.storeId}&userId=${this.uId}`
		// 	return this.util.mpShare({
		// 		t: this.sjxx.storeInfo.name,
		// 		p,
		// 	})
		// },
	}
</script>
<style scoped lang="scss">
	@import '@/yb_wm/index/goods.scss';

	.headerc {
		height: 90rpx;
	}
	
	.borr{
		border:1rpx solid #FF5F2F
	}

	.tablec {

		.tcbg {
			&::before {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				// background: linear-gradient(0deg, hsla(0, 0%, 100%, 0), rgba(0, 0, 0, .8));
				background: rgba(0, 0, 0, .55);
			}
		}

		.tcimg {
			width: 100rpx;
			height: 100rpx;
		}

		.tctt {
			font-size: 70rpx;
		}

		.tctbt {
			margin-top: 40rpx;
		}

		.tbbd {
			height: 496rpx;
			margin: 0 30rpx;
			border-radius: 15rpx;
		}

		.tbbdc {
			padding: 0 30rpx;
			bottom: 0;
			transition: all 0.6s linear;
			transform: translateY(100%);
		}

		.totop {
			transform: none;
		}

		.tbbdvc {
			margin: 70rpx 0 70rpx 0;
		}

		.tbbdv {
			width: 140rpx;
			height: 78rpx;
			border-radius: 78rpx;
		}

		.bva {
			background: #FD9800;
			color: #fff;
		}

		.ljdc {
			width: auto;
			background: #FF6735;
			height: 110rpx;
			border-radius: 110rpx;
		}
	}
	.hihth{
		height: 40rpx;
	}
</style>
