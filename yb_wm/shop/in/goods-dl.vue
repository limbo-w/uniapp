<template>
	<view class="pb130 spxq" :class="">
		<block v-if="co">
			<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
			<goods type='3' addtype='2' :outin='outin' @dec='decn' @add='addn' :co='co'></goods>
			<view class="bf mt20 p3">
				<view class="f32 wei">商品详情</view>
				<!-- <view v-if="co.introduce" class="mt30"></view> -->
				<view v-if="co.details" class="mt15">
					<mg-rtext type='2' :content="co.details" />
				</view>
			</view>
			<!-- 购物车 -->
			<view class="f-y-c p-f w100 b0 gwcc bf" :style="{bottom: isIpx?'40rpx':0}">
				<view class="f-1 f-row f22 c3 l-h1">
					<view @click="go({t:6,url:'/yb_wm/index/index'})" class="f-1 f-c-c">
						<text class="iconfont iconsy f42 c3"></text>
						<text class="mt10">首页</text>
					</view>
					<!-- #ifndef MP-ALIPAY -->
				<!-- 	<view @click="ljyq" class="f-1 f-c-c">
						<text class="iconfont iconfx f46 c3"></text>
						<text class="mt10">分享</text>
					</view> -->
					<!-- #endif -->
					<view @click="gwc" class="f-1 f-c-c p-r">
						<text class="iconfont icongwc1 f48 c3"></text>
						<text class="mt10">购物车</text>
						<view class="posi-a dot bsf f-c" v-if="scarList.length || scarList2.length" :style="{background:tColor}">{{getTotal.num}}</view>
					</view>
				</view>
				<button :disabled="showjz" @click="jrgwc" class="jrgwc cf f-c f32" :style="{background:tColor}">加入购物车</button>
			</view>
			<view v-if="isIpx" class='bgf'></view>
			<!-- 规格弹窗 -->
			<spec :outin='outin' @add='add' :co='goodsInfo' :storeid='co.storeId' :systemGood='system' v-model="showGg"></spec>
			<mg-share wxs='1' hbs='1' v-model="shareshow" ptype='1' :co='shareCo'></mg-share>
			<!-- #ifdef H5 -->
			<uni-qrcode cid="fxzxewm" ref='fxzxewm' :text="ewmlink()" class="hidecanvas" :margin="10" />
			<!-- #endif -->
		</block>
		<load v-if="!co.id"></load>
		<load type="2" v-model="showjz"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import goodsCar from '@/components/goods/goods-car.vue'
	import spec from '@/components/goods/spec.vue'
	import goods from '@/components/goods/index.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	import utils from '@/common/utils.js'
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import load from '@/components/common/load.vue'
	import mgShare from '@/components/template/share.vue'
	import uniQrcode from '@/components/uQrcode/uni-qrcode.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import {
		getDw,
		wxShare,
		getEwmLink,
		getSLink,
	} from "@/common/wechat-util"
	export default {
		name: 'bzf',
		components: {
			MgSwiper,
			goodsCar,
			spec,
			goods,
			mgRtext,
			uniNavBar,
			load,
			mgShare,
			uniQrcode,
		},
		data() {
			return {
				opcity: 0,
				iconOpcity: 0.5,
				swiper: {
					class: '',
					padding: 0,
					swiper: [],
					duration: '',
					mode: '',
					height: '750',
					radius: '0',
					auto: true,
					interval: 5,
				},
				isshopGoods: false,
				co: null,
				showGg: false,
				outin: '3', 
				goodsInfo: {}, //规格弹窗信息
				showjz: false,
				shareshow: false,
				shareCo: {},
				query:'',
			}
		},
		async onLoad(options) {
			this.util.setNT('商品详情')
			if (options.scene) {
				let scene = decodeURIComponent(options.scene).split(',')
				this.id = scene[0]
				this.querystoreId = scene[1]
			} else {
				this.id = options.gid
				this.querystoreId = options.storeId
			}
			this.getSystem()
			await this.getLoginInfo({
				inviteId: options.userId
			})
			this.getData()
			//如果页面是跳转来的，判断上个页面是否是列表页面
			if (options.page == 'shopGoods' || options.page == 'fastGoods' || options.page == 'inGoods') {
				this.isshopGoods = true
				this.lastPage = this.util.getPage().$vm
			}
			this.query = options
			console.log('%c options ',
				'color: white; background-color: #2274A5', this.isshopGoods, options);
		},
		mixins: [utilMixins],
		computed: {
			...mapState(['sjxx']),
			...mapState({
				scarList: state => state.scarList.fast.data || [],
				scarList2: state => state.scarList.ins.data || [],
			}),
			canUseShopGoods() {
				return this.isshopGoods
			},
			getTotal() {
				let num = 0
				if(this.query.page == 'fastGoods'){
					this.scarList.forEach(v => {
						num += +v.num
					})
				}else{
					this.scarList2.forEach(v => {
						num += +v.num
					})
				}
				return {
					num,
				}
			},
		},
		methods: {
			...mapActions(["getSjxx", "supdCar", "getMycar"]),
			ljyq() {
				this.shareshow = true
			},
			ewmlink() {
				return getEwmLink(`yb_wm/index/index?userId=${this.uId}`)
			},
			decn(e) {
				if (this.co.num == 1) return
				this.co.num -= 1
				// console.log('listdec', e)
			},
			addn(e) {
				if (this.co.stock && this.co.num == this.co.stock) return
				this.co.num += 1
				// console.log('listadd', e)
			},
			add(e) {
				this.showjz = true
				this.updList({
					type: 1,
					e,
				})
				// console.log(e)
			},
			jrgwc() {
				if (!this.uId) return this.util.message('暂未登录', 3)
				this.showjz = true
				if (this.co.isSpecs == 1 || this.co.isMaterial == 1 || this.co.isAttr == 1) {
					this.showGg = true
					this.goodsInfo = this.co
					this.showjz = false
				} else {
					this.updList({
						type: 1,
						e: {
							addwz: 1,
							g: this.co,
						},
					})
				}
			},
			async updList(p) {
				// console.log('updList', p)
				// return
				try {
					let res = await this.supdCar(p.e.addwz == '1' ? p.e.g.ggnum ? { //选规格加
						storeId: this.co.storeId,
						type: p.type,
						goodsId: p.e.g.id,
						groupId: p.e.g.groupId || '',
						material: p.e.g.material || [],
						attribute: p.e.g.attribute || '',
						num: p.e.g.ggnum,
						item: this.query.page=='inGoods'?2:3,
						key: this.query.page=='inGoods'?'ins':'fast',
						tableId:this.query.page=='inGoods'?this.query.tableId:'',
					} : { //列表加
						storeId: this.co.storeId,
						type: p.type,
						goodsId: p.e.g.id,
						num: p.e.g.num,
						item: this.query.page=='inGoods'?2:3,
						key: this.query.page=='inGoods'?'ins':'fast',
						tableId:this.query.page=='inGoods'?this.query.tableId:'',
					} : { //购物车加
						storeId: this.co.storeId,
						type: p.type,
						goodsId: p.e.g.goodsId,
						id: p.e.g.id,
						item: this.query.page=='inGoods'?2:3,
						key:this.query.page=='inGoods'?'ins':'fast',
						tableId:this.query.page=='inGoods'?this.query.tableId:'',
					})
					//改变商品列表里的数量
					// if (this.canUseShopGoods) {
					// 	//改变上个页面数据
					// 	this.lastPage.refreshList()
					// }
					this.showjz = false
				} catch (e) {
					this.showjz = false
					console.log(e)
				}
			},
			async getData() {
				//获取商品详情
				let spxq = await this.util.request({
					'url': this.api.spxq,
					// mask: 1,
					data: {
						goodsId: this.id,
						storeId: this.querystoreId,
					},
				})
				if (!spxq.data.id) {
					this.util.message('此商家暂无此商品', 3)
					utils.swnb(1000)
					return
				}
				spxq.data.num = 1
				this.co = spxq.data
				this.swiper.swiper = spxq.data.media && spxq.data.media.length ? spxq.data.media.map(v => ({
					url: v
				})) : [{
					icon: spxq.data.icon
				}]
				if (!this.canUseShopGoods) {
					this.getMycar({
						storeId: spxq.data.storeId,
					})
				}
			},
			gwc() {
				if(this.query.page == "fastGoods"){
					this.go({
						t: 5,
						url: '/yb_wm/shop/ffmode/goods'
					})
				}else if(this.query.page == "inGoods"){
					this.go({
						t: 5,
						url: '/yb_wm/shop/in/goods'
					})
				}
				setTimeout(() => {
					uni.$emit('qjjtsj', {
						showgwc: 1
					})
				}, 200)
			},
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.spxq {
		.gwcc {
			height: 120rpx;
		}

		.jrgwc {
			width: 400rpx;
			margin-right: 20rpx;
			height: 86rpx;
			border-radius: 90rpx;
		}

		.dot {
			min-width: 40rpx;
			height: 40rpx;
			color: #fff;
			top: -20rpx;
			right: 15rpx;
		}
	}
</style>
