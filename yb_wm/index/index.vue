<template>
	<view class="pb115 o-h"
		:style="{ background: layout.pageSetting?layout.pageSetting[0].styles.moduleTitle == 1 ? layout.pageSetting[0].styles.colorIcon : 'url('+layout.pageSetting[0].styles.img+')':'' }">
		<!-- 引导页 -->
		<block v-if="layout.open&&layout.open[0]">
			<open-list :co="layout.open[0].styles"></open-list>
		</block>
		<!-- #ifndef H5 -->
		<uni-nav-bar v-if="layout.pageSetting[0].styles.modulePage==1" id='uninavbar' uropcity="1" :isleft="false"
			:fixed='true' :ispr='true' :statusBar="true" :border='false' :bg='layout.pageSetting[0].styles.colorBg'
			:color="layout.pageSetting[0].styles.colorWord" :title="layout.pageSetting[0].styles.navTitle">
		</uni-nav-bar>
		<!-- <uni-nav-bar v-else id='uninavbar' :isleft="false" :uropcity="opcity" :fixed='true' :ispr='false' :statusBar="true"
		 :border="opcity>=1" :title="layout.pageSetting[0].styles.navTitle">
		</uni-nav-bar> -->
		<!-- #endif -->
		<!-- 关注条 -->
		<block v-for="(v, i) in layout.attention" :key="i">
			<atten-tion :co="v.styles" v-if="v.name == 'attention' && v.styles.status==1"></atten-tion>
		</block>
		<!-- 搜索框 -->
		<block v-for="(v, i) in layout.list" :key="i">
			<!-- 搜索框 -->
			<search-box :co="v.styles" v-if="v.name == 'search'"></search-box>

			<!-- 定位 -->
			<fixed-set :co="v.styles" v-else-if="v.name == 'fixed'"></fixed-set>

			<!-- 公告 -->
			<notice-sue :co="v.styles" v-else-if="v.name == 'notice'" :shopinfo='shopinfo'></notice-sue>

			<!-- 图片轮播 -->
			<picLunbo-by :co="v.styles" v-else-if="v.name == 'picLunbo'"></picLunbo-by>

			<!-- 资讯 -->
			<zx-list :co="v.styles" v-else-if="v.name == 'information'" :shopinfo='shopinfo'></zx-list>
			<!-- 按钮组 -->
			<btn-group :co="v.styles" v-else-if="v.name == 'btn'"></btn-group>

			<pictures :co="v.styles" v-else-if="v.name == 'pictures'"></pictures>

			<!-- 标题栏 -->
			<titles-bar :co="v.styles" v-else-if="v.name == 'titles'"></titles-bar>

			<blank :co="v.styles" v-else-if="v.name == 'blank'"></blank>

			<!-- 辅组线 -->
			<lines-wire :co="v.styles" v-else-if="v.name == 'lines'"></lines-wire>

			<!-- 更多门店 -->
			<store-Message :co="v.styles" v-else-if="v.name == 'storeMessage'"></store-Message>

			<!-- 富文本 -->
			<book-text :co="v.styles" v-else-if="v.name == 'book'"></book-text>

			<!-- 选项卡 -->
			<!-- <card-tab :styles="v.styles" v-else-if="v.name == 'card'"></card-tab> -->

			<!-- 热区 -->
			<hot-spots :co="v.styles" v-else-if="v.name == 'hot'"></hot-spots>

			<!-- 魔方 -->
			<margic-cube :co="v.styles" v-else-if="v.name == 'margic'"></margic-cube>
			<!-- 列表导航 -->
			<list-Nav :co="v.styles" v-else-if="v.name == 'listNav'"></list-Nav>
			<!-- 优惠券 -->
			<discount-coupons :styles="v.styles" v-else-if="v.name == 'discount'"></discount-coupons>

			<!-- 商品组 -->
			<product-group :co="v.styles" v-else-if="v.name == 'product'" :shopinfo='shopinfo'></product-group>
			
			<!-- 我的余额 -->
			<my-balance :co="v.styles" v-else-if="v.name == 'myBalance'"></my-balance>
			<store-evaluate :store-info='storeInfo' :co="v.styles" :color='tColor' v-else-if="v.name=='storeEvaluate'"></store-evaluate>
			<store-couponbag :store-info='storeInfo' :co="v.styles" :color='tColor' v-else-if="v.name=='storeRollbag'"></store-couponbag>
			<store-information :store-info='storeInfo' :co="v.styles" :color='tColor' v-else-if="v.name=='storeInformation'"></store-information>
			<block v-else-if="v.name=='storeVideo'" :color='tColor' >
				<!-- #ifdef MP-WEIXIN -->
<!-- 				<view class="" :style="{marginTop:`${v.styles.marginTop}px`,
				marginBottom:`${v.styles.marginBottom}px`,
				marginLeft:`${v.styles.marginLR}px`,
				marginRight:`${v.styles.marginLR}px`}">
					<txv-video :vid="v.styles.links" playerid="txv1" defn='超清'></txv-video>
					<custom-video :co="v.styles" :color='tColor' />
				</view> -->
				<!-- #endif -->
				<custom-video :co="v.styles" :color='tColor' />
			</block>
		</block>
		<!-- 悬浮设置 -->
		<block v-if="layout.susBtn&&layout.susBtn[0]">
			<sus-btn :co="layout.susBtn[0].styles"></sus-btn>
		</block>
		<!-- 下单提示 -->
		<view v-for="(v, i) in layout.remind" :key="i">
			<order-prompt :styles="v.styles" v-if="v.name == 'remind'"></order-prompt>
		</view>
		<tcyhq v-if='xkzxInfo' type="3" @close='xkzxshow=false' :co='xkzxInfo' v-model="xkzxshow" :color='tColor'>
		</tcyhq>
		<tcyhq v-if='fqbInfo' type="2" @close='fqbshow=false' :co='fqbInfo' v-model="fqbshow"></tcyhq>
		<footc></footc>
		<tab-bar></tab-bar>
		<load v-if="showloading"></load>
	</view>
</template>
<script>
	import searchBox from '@/components/drag/search.vue';
	import fixedSet from '@/components/drag/fixed.vue';
	import noticeSue from '@/components/drag/notice.vue';
	import picLunboBy from '@/components/drag/picLunbo.vue';
	import btnGroup from '@/components/drag/btn.vue';
	import pictures from '@/components/drag/pictures.vue';
	import titlesBar from '@/components/drag/titles.vue';
	import blank from '@/components/drag/blank.vue';
	import linesWire from '@/components/drag/lines.vue';
	import storeMessage from '@/components/drag/storeMessage.vue';
	import bookText from '@/components/common/functionCmp/rich-text.vue';
	import cardTab from '@/components/drag/card.vue';
	import hotSpots from '@/components/drag/hot.vue';
	import margicCube from '@/components/drag/margic.vue';
	import listNav from '@/components/drag/listNav.vue';
	import discountCoupons from '@/components/drag/discount.vue';
	import productGroup from '@/components/drag/product.vue';
	import susBtn from '@/components/drag/susBtn.vue';
	import attenTion from '@/components/drag/attenTion.vue';
	import orderPrompt from '@/components/drag/remind.vue';
	import openList from '@/components/drag/open.vue';
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import load from '@/components/common/load.vue'
	import tcyhq from '@/components/template/tcyhq.vue'
	import zxList from '@/components/drag/zx-list.vue';
	import footc from '@/components/common/footc.vue'
	import myBalance from '@/components/drag/myBalance.vue';
	import storeEvaluate from '@/components/drag/store-evaluate.vue'
	import storeCouponbag from '@/components/drag/store-couponbag.vue'
	import storeInformation from '@/components/drag/store-information.vue'
	import customVideo from '@/components/drag/custom-video.vue'
	import {
		mapActions,
		mapState
	} from 'vuex';
	import {
		getDw,
		wxShare,
		getSLink
	} from "@/common/wechat-util.js"
	import utils from '@/common/utils.js'
	export default {
		name: 'index',
		data() {
			return {
				showloading: true,
				shopinfo: {},
				opcity: 0,
				xkzxshow: false,
				xkzxInfo: '',
				fqbshow: false,
				fqbInfo: '',
			};
		},
		components: {
			searchBox,
			fixedSet,
			noticeSue,
			picLunboBy,
			btnGroup,
			pictures,
			titlesBar,
			blank,
			linesWire,
			storeMessage,
			bookText,
			cardTab,
			hotSpots,
			margicCube,
			listNav,
			discountCoupons,
			productGroup,
			susBtn,
			attenTion,
			orderPrompt,
			openList,
			uniNavBar,
			load,
			tcyhq,
			zxList,
			footc,
			myBalance,
			storeEvaluate,
			storeCouponbag,
			storeInformation,
			customVideo,
		},

		onLoad(options) {
			// console.log('onLoad', this.storeInfo.id)
			this.query = options
			if (options && options.scene) {
				this.storeId = ''
				this.ldxId = decodeURIComponent(options.scene).split(',')[0]
				this.ldxType = decodeURIComponent(options.scene).split(',')[1]
			} else {
				this.storeId = utils.getOptions(options, {
					key: 'storeId',
					q1: this.storeInfo.id,
				}) || ''
			}
			// console.log(this.storeId)
			this.xlsx(options)
			console.log('onLoad', options)
		},
		onShow() {
			// console.log('index onShowonShowonShow', this.shopinfo,this.storeInfo)
			if (this.shopinfo.id) {
				if (this.storeId != this.storeInfo.id) {
					this.changeStore(this.storeInfo)
					// console.log('index商家id切换了')
				} else {
					// this.refreshList()
					// console.log('index商家id没换')
				}
			}
		},
		computed: {
			...mapState('dndc', ['latLng']),
			...mapState({
				layout: state => state.layout.index.body || {},
				storeInfo: state => state.config.storeInfo,
			})
		},
		methods: {
			...mapActions(["getConfig"]),
			async xlsx(options) {
				await this.getLayout()
				// #ifdef H5
				this.util.setNT(this.layout.pageSetting[0].styles.navTitle || '首页')
				// #endif
				this.showloading = false
				let lc = await getDw({
					t: 0
				})
				this.getAddInfo(lc)
				this.getLoginInfo({
					inviteId: this.query.userId || this.ldxId,
					type: this.ldxType
				}).then(() => {
					this.getXkzx()
					// wxShare({
					// 	title: this.system.name,
					// 	desc: '进来看看吧！' || this.system.introduction,
					// 	link: getSLink(`yb_wm/index/index?userId=${this.uId}`),
					// 	imgUrl: this.system.icon,
					// })
				})
				this.refreshInfo()
			},
			//
			changeStore(v) {
				// this.tcyhqshow = this.tcggshow = false
				this.storeId = v.id
				this.refreshInfo()
				// console.log('changeStore', v)
			},
			async refreshInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.zjdp,
					data: {
						storeId: this.storeId,
						lat: this.latLng.lat,
						lng: this.latLng.lng,
					}
				})
				this.storeId = data.id
				this.getConfig({
					key: 'storeInfo',
					data: {
						id: data.id,
						name: data.name,
						distance: data.distance
					}
				})
				this.shopinfo = data
				this.getSystem();
				setTimeout(() => {
					this.addFwjl({
						storeId: this.storeId,
						origin: '1'
					})
				}, 1000)
			},
			async getXkzx() {
				let res = await Promise.all([this.util.request({
					'url': this.api.xkzx,
					method: 'POST',
				}), this.util.request({
					'url': this.api.sytchj,
				})])
				if (utils.getType(res[0].data) != 'array') {
					this.xkzxInfo = res[0].data
					setTimeout(() => {
						this.xkzxshow = true
					}, 400)
				}
				if (res[1].data.issueCoupons.couponArr) {
					this.fqbInfo = res[1].data.issueCoupons
					setTimeout(() => {
						this.fqbshow = true
					}, 400)
				}
			},
		},
		// onPageScroll(e) {
		// 	if (this.opcity >= 1 && e.scrollTop / 64 >= 1) {
		// 		return;
		// 	}
		// 	let o = e.scrollTop / 64
		// 	this.opcity = o;
		// },
		async onPullDownRefresh() {
			this.showloading = true
			uni.setStorageSync('firstdwtime', 0)
			this.getSystem({
				get: 1
			});
			this.$store.state.layout.index = {}
			await this.xlsx()
			uni.stopPullDownRefresh();
		},
		onShareAppMessage() {
			// let p = `yb_o2o/index/index?userId=${this.uId}`
			return this.util.mpShare({
				t: this.system.forwardTitle,
				i: this.getImgS(this.system.forwardIcon),
				// p,
			})
		},
		onShareTimeline(e) {
			// console.log("点击分享pyq", e)
			return {
				title: this.system.shareTitle,
				imageUrl: this.getImgS(this.system.shareIcon),
			}
		},
	};
</script>
<style lang="scss" scoped>
</style>
