<template>
	<view class="pb130 spxq" :class="">
		<!-- <uni-nav-bar :uropcity="opcity" :uriconopcity='iconOpcity' :fixed='true' :ispr='false' :statusBar="true" :border="opcity>=1"
		 :title="co.name">
		</uni-nav-bar> -->
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
					<view @click="ljyq" class="f-1 f-c-c">
						<text class="iconfont iconfx f46 c3"></text>
						<text class="mt10">分享</text>
					</view>
					<!-- #endif -->
					<view @click="gwc" class="f-1 f-c-c p-r">
						<text class="iconfont icongwc1 f48 c3"></text>
						<text class="mt10">购物车</text>
						<view class="posi-a dot bsf f-c" v-if="scarList.length" :style="{background:tColor}">{{getTotal.num}}</view>
					</view>
				</view>
				<view class="f-row f28 o-h mr20 cf">
					<button @click="jrgwc" class="cf f-c f28 dname-l t-o-e">加入购物车</button>
					<button @click="dlgoPay" class="dname-r cf f-c f28 t-o-e" :style="{background:tColor}">立即购买</button>
				</view>
				<!-- <button :disabled="showjz" @click="jrgwc" class="jrgwc cf f-c f28" :style="{background:tColor}">加入购物车</button> -->
				<!-- <button :disabled="showjz" @click="jrgwc" class="jrgwc cf f-c f28" :style="{background:tColor}">立即购买</button> -->
			</view>
			<view v-if="isIpx" class='bgf'></view>
			<!-- 规格弹窗 -->
			<spec :outin='outin' @add='add' :co='goodsInfo' :storeid='co.storeId' :systemGood='system' v-model="showGg"></spec>
			<mg-share wxs='1' :hbs='true' v-model="shareshow" ptype='1' :co='shareCo'></mg-share>
			<goods-car ref='goodscar' id="goodscar" :show.sync='showCar' :carBtm="40"
				:carlistPab="130" :buytype='buyType' :sjxx='sjxx' @dec='dec'
				@add='add' @celar='celarCar' :goods-list='catrgoryList' :startmoney='startMoney' :type='4'></goods-car>
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
				outin: '1', //1out2店内
				goodsInfo: {}, //规格弹窗信息
				showjz: false,
				shareshow: false,
				shareCo: {},
				buyType:'2',
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
				this.querystoreId = options.storeId || this.storeInfo.id
				this.buyType = options.buyType
			}
			this.getSystem()
			await this.getLoginInfo({
				inviteId: options.userId
			})
			this.getData()
			//如果页面是跳转来的，判断上个页面是否是列表页面
			if (options.page == 'shopGoods') {
				this.isshopGoods = true
				this.lastPage = this.util.getPage().$vm
			}
			console.log('%c options ',
				'color: white; background-color: #2274A5', this.isshopGoods, options,this.storeInfo);
		},
		mixins: [utilMixins],
		computed: {
			...mapState(['sjxx']),
			...mapState({
				scarList: state => state.scarList.out.data || [],
				storeInfo: state => state.config.storeInfo,
			}),
			canUseShopGoods() {
				return this.isshopGoods
			},
			getTotal() {
				let num = 0
				this.scarList.forEach(v => {
					num += +v.num
				})
				return {
					// total: +this.scarList.price || 0,
					// spzj: +(this.scarList.price - this.scarList.boxMoney).toFixed(2),
					// bzf: +this.scarList.boxMoney || 0,
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
			//
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
			dec(e) {
				this.showjz = true
				this.updList({
					type: 2,
					e,
				})
			},
			// 加入购物车
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
					} : { //列表加
						storeId: this.co.storeId,
						type: p.type,
						goodsId: p.e.g.id,
						num: p.e.g.num,
					} : { //购物车加
						storeId: this.co.storeId,
						type: p.type,
						goodsId: p.e.g.goodsId,
						id: p.e.g.id,
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
			gopay() {
				if (!this.canUseShopGoods) {
					this.go({
						t: 3,
						url: `/yb_o2o/shop/goods?storeId=${this.co.storeId}&isgl=1`
					})
				} else {
					this.go({
						t: 4
					})
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
				// #ifdef  MP
				// let data = 'https://bkycms.com/addons/yb_wm/web/static/yb_wm/36/2020/09/28/202009280950476763.png'
				let {
					data
				} = await this.util.request({
					'url': this.api.xcxm,
					data: {
						page: 'yb_wm/shop/out/goods-dl',
						ident: 'goodsDl',
						scene: this.co.id + ',' + this.co.storeId,
					},
				})
				// #endif
				// #ifdef  H5
				let link = getSLink(`yb_wm/index/index?userId=${this.uId}`)
				let data = await this.$refs.fxzxewm.make()
				wxShare({
					title: this.co.name,
					desc: this.co.notice,
					link,
					imgUrl: this.co.icon,
				})
				// #endif
				try {
					// console.time()
					let arr = await Promise.all([uni.getImageInfo({
						src: this.co.icon,
					}), uni.getImageInfo({
						src: data,
					}), await uni.getImageInfo({
						src: this.co.storeIcon,
					})])
					// console.timeEnd()
					this.shareCo = {
						isget: true,
						bgimg: arr[0][1].path,
						code: arr[1][1].path,
						logo: arr[2][1].path,
						co: this.co,
					}
					// console.log(arr)
					// console.log(e1, res1, e2, res2, e3, res3)

				} catch (e) {
					console.log('图片error', e)
				}
				// if (!this.sjxx.shopData) {
				// 	//获取定位
				// 	let lc = await getDw({
				// 		t: 0
				// 	})
				// 	this.getSjxx({
				// 		storeId: data.storeId,
				// 		item: this.outin,
				// 		lat: lc.latitude,
				// 		lng: lc.longitude,
				// 	})
				// }
				// wxShare({
				// 	title: data.name,
				// 	desc: data.body,
				// 	link: getSLink(`yb_o2o/shop/goods-dl?gid=${this.id}&userId=${this.uId}`),
				// 	imgUrl: this.getSingleImg(data.media[0]),
				// })
			},
			itemBoxMoney(m, n) {
				return (m * n).toFixed(1)
			},
			gwc() {
				 this.$refs.goodscar.openCar();
				// this.go({
				// 	t: 6,
				// 	url: '/yb_wm/index/goods'
				// })
				setTimeout(() => {
					uni.$emit('qjjtsj', {
						showgwc: 1
					})
				}, 200)
			},
			dlgoPay(){
				let qsTextt = this.$refs.goodscar.qsTextt()
				if(qsTextt.reach==true){
					this.$refs.goodscar.goPay(2)
				}else{
					this.util.modal(qsTextt.text)
				}		
			},
		},
		async created() {},
		// onPageScroll(e) {
		// 	if (this.opcity >= 1 && e.scrollTop / 64 >= 1) {
		// 		return;
		// 	}
		// 	let o = e.scrollTop / 64
		// 	this.opcity = o;
		// 	this.iconOpcity = 0.5 * (1 - o < 0 ? 0 : 1 - o)
		// },
		onShareAppMessage() {
			this.shareshow = false
			let p = `yb_wm/shop/out/goods-dl?gid=${this.id}&storeId=${this.co.storeId}&userId=${this.uId}&buyType=${this.buyType}`
			return this.util.mpShare({
				t: this.co.name,
				i: this.getImgS(this.co.icon),
				p,
			})
		},
		onShareTimeline(e) {
			return {
				title: this.co.name,
				imageUrl: this.getImgS(this.co.icon),
			}
		},
	}
</script>

<style scoped lang="scss">
	.spxq {
		.gwcc {
			height: 120rpx;
		}

		.jrgwc {
			width: 200rpx;
			margin-right: 20rpx;
			height: 76rpx;
			border-radius: 90rpx;
		}
		
		.dname-l {
			width: 210rpx;
			height: 76rpx;
			padding: 3rpx 10rpx 3rpx 15rpx;
			border-radius: 50rpx 0 0 50rpx;
			background: #313131;
			// background: linear-gradient(to right, #0C0C0C, #4A4A4A);
		}
		
		.dname-r {
			width: 210rpx;
			height: 76rpx;
			padding: 3rpx 15rpx 3rpx 10rpx;
			border-radius: 0 50rpx 50rpx 0;
			background: linear-gradient(to right, #FFF3A6, #FCD96F);
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
