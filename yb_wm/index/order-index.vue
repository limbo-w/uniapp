<template>
	<view class="pb115" :class="showCoupon||showCancel?'bgfix':''">
		<view class="fixedtop">
			<uni-nav-bar id='uninavbar' :uropcity="1" :uriconopcity='0' :fixed='false' :ispr='false' :border='false'
				:statusBar="true" :isleft='false' :custommore="true" @on-more='onmore'>
				<view slot='left' class="hdsy bsf f-c" @click="go({t:6,url:'/yb_wm/index/index'})">
					<text class="iconfont iconjiayuan c0 f38"></text>
				</view>
				<view class="oi1c be f-y-c bs15">
					<block v-for="(v,i) in tarr" :key='i'>
						<view v-if="v.show" @click="tClick(i)" class="item f-c bs10 f26 wei" :class="{bf:i==taIdx}">
							{{v.name}}
						</view>
					</block>
				</view>
			</uni-nav-bar>
			<nav-tab v-if="taIdx==0 && system.powerList.takeout=='1'" cname="" ifsize='32' v-model="aIdx"
				@changeTab='changeTab' :tabs='tabs'></nav-tab>
			<view v-else-if="taIdx==1&&tntabs.length" class="f-row bf">
				<view class="f-1 b-r-d">
					<nav-tab cname="" ifsize='32' v-model="aIdx" @changeTab='changeTab' :tabs='tntabs'></nav-tab>
				</view>
				<view class="f-y-c p03" @click="go({url:'/yb_wm/shop/in/indd'})">
					<text class="iconfont icondndc c0 mr10 f38"></text>
					<text class="f32 c0">堂食</text>
				</view>
			</view>
		</view>
		<view class="mt90 p2" :style="{marginTop:toph}">
			<block v-if="isLogin">
				<block v-if="system.powerList.takeout=='1' || system.powerList.instore=='1'">
					<block v-if="taIdx==0">
						<my-order @operation='operation' v-for="(v,i) in dataList" :key='i' :co='v'></my-order>
					</block>
					<block v-else>
						<dn-order @refresh='dnrefresh' :ltop='toph' v-model='laIdx' :labelarr='labelArr'
							:otype="tntabs[aIdx].type" :datalist="dataList"></dn-order>
					</block>
					<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' otext='您今天还没有下单'
						ttext='快去选择喜欢的商品吧' />
					<view @click="go({t:6,url:'goods'})" class="oiqdd bs5 f-c f34 cf ma"
						v-show="dataList.length==0&&isget" :style="{background:tColor}">去点单</view>
				</block>
			</block>
			<view v-else class="f-c-c">
				<view class="wdlimg">
					<mg-img :src="`${onImgurl}zwdd.png`"></mg-img>
				</view>
				<view class="c6">登录后才能查看订单哦</view>
				<view class="ljdl bs15 cf" :style="{background:tColor}" @click="checkLogin">立即登录</view>
			</view>
			<footc></footc>
		</view>
		<tab-bar></tab-bar>
		<mg-modal :ismr="true" v-model="showCoupon" width="630rpx" :z-index="3000">
			<view v-if="!tcCoupon.couponInfo" class="bf bs10">
				<view class="">
					<view class="p330 f-c-c">
						<image mode="widthFix" class="payimg" src="/static/pay/payok.png"></image>
						<view class="mt20 f30 wei">支付成功</view>
						<view class="mt5 f50 wei">{{sl+tcCoupon.paymoney}}</view>
					</view>
					<mg-cell last='1'>
						<view slot='bd' class="f-y-c c6">
							<view class="f-g-0 c3 mr30">返赠</view>
							<view class="f-g-1 c9 f26">恭喜你获得1张优惠券共{{tcCoupon.money}}元</view>
						</view>
					</mg-cell>
				</view>
				<view class="p25 hlt" :style="{background:`linear-gradient(45deg,rgba(${cTR(tColor)},0.5),${tColor})`}">
					<view v-for="(v,i) in tcCoupon.couponInfo" :key='i' class=''>
						<mg-coupon ptype="5" :color='color' cname='' :co='v'></mg-coupon>
					</view>
				</view>
				<view class="f-row hlt" style="height: 100rpx;">
					<button hover-class='be' class="btn f-1 bf f30 h100 f-c c9" @click="showCoupon=false">关闭</button>
					<button :style="{color:tColor}" hover-class='be' class="btn f-1 bf f30 h100 f-c hll"
						@click="ljck">立即查看</button>
				</view>
			</view>
		</mg-modal>
		<mg-popup v-model="showCancel" position="bottom">
			<view class="bf bs3000" :style="{paddingBottom:isIpx?'155rpx':'115rpx'}">
				<view class="p3 c0 t-c wei">取消订单</view>
				<view class="p20 o-y-s" style="max-height: 600rpx;">
					<view class="bs10 p23 bf5 f24 m03">
						<view class="mb20">温馨提示</view>
						<view> 1.限时特价、预约资格等购买优惠可能一并取消</view>
						<view> 2.支付券不予返还;支付优惠一并取消</view>
						<view> 3.订单一旦取消,无法恢复</view>
					</view>
					<view class="mt30 c0 wei p03">请选择取消订单的原因(必选):</view>
					<mg-radio rtype='2' ranktype='2' last='1' bttc='f24' v-model="yyradio" :arr='yyArr'></mg-radio>
				</view>
				<view class="foot-btnc p-r hlt">
					<button class="foot-btn bd6" @click="qdyy" :style="{background:yyradio==''?'':tColor}">确定</button>
				</view>
			</view>
		</mg-popup>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import navTab from '../../components/common/functionCmp/nav-tab.vue'
	import myOrder from './components/my-order.vue'
	import dnOrder from './components/dn-order.vue'
	import jzz from '@/components/common/jzz.vue'
	import TabBar from '@/components/common/tabbar.vue'
	import mgModal from '@/components/common/modal.vue'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import mgPopup from '@/components/common/popup.vue'
	import mgRadio from '@/components/form/mg-radio.vue'
	import footc from '@/components/common/footc.vue'
	import utils from '@/common/utils.js'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	let app = getApp().globalData
	export default {
		name: 'orderIndex',
		components: {
			uniNavBar,
			navTab,
			myOrder,
			dnOrder,
			jzz,
			TabBar,
			mgModal,
			mgCoupon,
			MgCell,
			mgPopup,
			mgRadio,
			footc,
		},
		data() {
			return {
				toph: 0,
				taIdx: 0,
				aIdx: 0,
				tabs: [{
					name: '当前订单',
				}, {
					name: '历史订单',
				}],
				tntabs: [{
					name: '快餐',
					type: 4,
				}, {
					name: '当面付',
					type: 2,
				}],
				labelArr: [],
				laIdx: 0,
				dataList: [],
				isget: false,
				mygd: false,
				params: {
					size: 10,
					page: 1,
				},
				tcCoupon: {},
				showCoupon: false,
				showCancel: false,
				yyArr: [],
				yyradio: "",
			}
		},
		async onLoad(options) {
			this.getSystem().then(() => {
				this.toph = (this.util.getSb().customNavh + uni.upx2px('96')) + 'px'
			})
			await this.getLoginInfo()
			await this.getConfig({
				key: 'orderset',
				api: 'ddsz',
			})
			// #ifdef H5
			this.util.setNT('我的订单')
			// #endif
			this.taIdx = (this.system.powerList.takeout=='1' && this.system.powerList.instore=='1') || (this.system.powerList.takeout=='1' && this.system.powerList.instore=='2')?0:1
			// console.log(app.ddquery)
			if (this.system.powerList.queuing == 1) {
				this.tntabs.push({
					name: '排队',
					type: 5,
				})
			}
			if (this.system.powerList.reserve == 1) {
				this.tntabs.push({
					name: '预约',
					type: 3,
				})
			}
			this.xgIdx()
			this.changeTab(this.aIdx)
			this.getLayout()
			this.isload = true
			return
			this.util.request({
				'url': this.api.Lable,
				data: {
					type: 2
				},
			}).then(res => {
				res.data.forEach(v => {
					v.value = v.id
				})
				this.qxyyArr = res.data.concat([{
					value: -1,
					name: '其他原因'
				}])
			})
			this.util.request({
				'url': this.api.Lable,
				data: {
					type: 3
				},
			}).then(res => {
				res.data.forEach(v => {
					v.value = v.id
				})
				this.tkyyArr = res.data.concat([{
					value: -1,
					name: '其他原因'
				}])
			})
		},
		onReachBottom: utils.debounce(function(e) {
			if (!this.mygd && this.isget) {
				this.isget = false
				this.getList();
			}
			// console.log('onReachBottom')
		}, 300),
		onHide() {
			app.ddquery = ''
		},
		async onShow() {
			// console.log('onShowonShow', app.ddquery)
			if (this.isload) {
				this.xgIdx()
				this.refresh()
			}
			// let p = uni.getStorageSync('payedCoupon')
			// if (p) {
			// 	let {
			// 		data
			// 	} = await this.util.request({
			// 		'url': this.api.redbag,
			// 		method: 'POST',
			// 		mask: 1,
			// 		data: {
			// 			orderId: p.orderId,
			// 		}
			// 	})
			// 	this.tcCoupon = data || {}
			// 	// this.$set(this.tcCoupon, 'paymoney', p.paymoney)
			// 	this.tcCoupon.paymoney = p.paymoney
			// 	uni.setStorageSync('payedCoupon', false)
			// 	if (this.tcCoupon.couponInfo && this.tcCoupon.couponInfo.length) {
			// 		setTimeout(() => {
			// 			this.showCoupon = true
			// 			setTimeout(() => {
			// 				this.go({
			// 					t: 1,
			// 					url: '/yb_o2o/order/order-dl?id=' + p.orderId,
			// 				})
			// 			}, 1000)
			// 		}, 100)
			// 	} else {
			// 		this.go({
			// 			t: 1,
			// 			url: '/yb_o2o/order/order-dl?id=' + p.orderId,
			// 		})
			// 	}
			// 	// console.log('支付成功')
			// }
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				orderset: state => state.config.orderset,
			}),
			tarr() {
				return [{
					show: this.system.powerList.takeout == 1,
					name: this.system.custom.takeOut + '订单',
					type: 1,
				}, {
					show: this.system.powerList.instore == 1,
					name: this.system.custom.inStore + '订单',
					type: 2,
				}]
			},
		},
		methods: {
			...mapActions(["getConfig"]),
			xgIdx() {
				// this.taIdx =1
				if (app.ddquery) {
					this.taIdx = app.ddquery.nt
					this.aIdx = this.tntabs.findIndex(v => v.type == app.ddquery.t)
				}
			},
			tClick(i) {
				if (i == this.taIdx) return
				this.taIdx = i
				this.aIdx = 0
				this.refresh()
			},
			ljck() {
				this.showCoupon = false
				this.go({
					t: 1,
					url: '/yb_wm/my/coupon/my'
				})
			},
			// paySuccess() {
			// 	this.refresh()
			// 	console.log('paySuccess')
			// },
			qdyy() {
				this.showCancel = false
				if (this.operationt == 'qxdd') {
					this.qxyy = this.qxyyArr.find(v => v.value == this.yyradio).name
					this.qxdd(1)
				} else {
					this.qxyy = this.tkyyArr.find(v => v.value == this.yyradio).name
					this.operation({
						t: 'tk',
						co: this.orderInfo
					})
				}
				// console.log(this.orderInfo, this.operationt, this.qxyy)
			},
			async operation(e) {
				this.orderInfo = e.co
				this.operationt = e.t
				let obj = {}
				switch (e.t) {
					case 'qxdd':
						if (e.tip) {
							return this.qxdd(1)
							this.yyradio = ''
							this.yyArr = this.qxyyArr
							this.showCancel = true
							return;
						} else {
							return this.qxdd()
						}
						// case 'sqtk':
						// 	this.yyradio = ''
						// 	this.yyArr = this.tkyyArr
						// 	this.showCancel = true
						// 	// this.qxdd(e.tip)
						// 	return;
						case 'sqtk':
							if (e.co.state == 2) {
								return this.qxdd(1)
							}
							// await this.requestSM('refund')
							obj = {
								title: '您确认取消订单吗？',
								url: 'wmddtk',
								params: {
									orderId: e.co.id,
									note: this.qxyy || '',
								}
							}
							break;
						case 'cd':
							obj = {
								title: '您确认催单吗？',
								url: 'wmddcd',
								params: {
									userId: this.user.userId,
									orderId: e.co.id
								}
							}
							break;
						case 'qrsh':
							obj = {
								title: '您确认已收到货吗？',
								url: 'wmddsh',
								params: {
									orderId: e.co.id
								}
							}
							break;
						case 'scdd':
							obj = {
								title: '您确认删除订单吗？',
								url: 'wmddsc',
								params: {
									orderId: e.co.id
								}
							}
							break;
						case 'lxsj':
							return this.util.makeTel(e.co.storeTel)
						case 'pj':
							return this.go({
								t: 1,
								url: '/yb_wm/order/pl?orderId=' + e.co.id + '&storeName=' + e.co.storeName+ '&storeId=' + e.co.storeId
							});
						case 'ljzf':
							this.go({
								t: 1,
								url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
									orderId: this.orderInfo.id,
									orderType: 1,
									info: {
										money: this.orderInfo.money,
										storeName: this.orderInfo.storeName,
										type: "下单支付",
										cancel: 1,
										go: {
											t: 4,
										},
									}
								}))
							})
							return;
				}
				// console.log(e, obj)
				try {
					await this.util.modal(obj.title)
				} catch (e) {
					return
				}
				let data = await this.util.request({
					'url': this.api[obj.url],
					method: 'POST',
					mask: 1,
					data: obj.params,
				})
				if (data) {
					this.refresh();
					this.util.message('操作成功', 1)
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
					'url': this.api.wmddqx,
					method: 'POST',
					mask: '取消订单中',
					data: {
						orderId: this.orderInfo.id,
						note: e ? this.qxyy || '' : '',
					},
				})
				if (data) {
					this.refresh();
					this.util.message('操作成功', 1)
				}
			},
			refresh() {
				this.changeTab(this.aIdx)
			},
			changeTab(e) {
				this.laIdx = 0
				this.isget = this.mygd = false
				this.params.page = 1
				if (this.taIdx == 0) {
					let type = ''
					switch (e) {
						case 0:
							type = '1';
							break;
						case 1:
							type = '2';
							break;
					}
					this.params.api = 'ddlb'
					this.iparams = {
						type
					}
				} else {
					switch (this.tntabs[e].type) {
						case 1:
							this.labelArr = ['全部', '待付款', '已支付', '已关闭']
							this.params.api = 'MyInOrder'
							this.iparams = {
								state: ''
							}
							break;
						case 2:
							this.labelArr = []
							this.params.api = 'dmlb'
							this.iparams = {}
							break;
						case 4:
							this.labelArr = ['全部', '制作中', '已完成']
							this.params.api = 'kclb'
							this.iparams = {
								state: '',
							}
							break;
						case 3:
							this.labelArr = []
							this.params.api = 'wdyy'
							this.iparams = {}
							break;
						case 5:
							this.labelArr = []
							this.params.api = 'pdlb'
							this.iparams = {}
							break;
					}
				}
				this.dataList = []
				this.getList()
				// console.log(e, this.aIdx)
			},
			dnrefresh(e) {
				if (e.hasOwnProperty('state')) {
					this.iparams.state = e.state
					this.isget = this.mygd = false
					this.params.page = 1
					this.dataList = []
					this.getList()
				} else {
					this.refresh();
				}
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api[this.params.api],
					method: 'POST',
					data: {
						...this.params,
						...this.iparams
					},
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			onmore() {},
		},
	}
</script>
<style scoped lang="scss">
	.hdsy {
		width: 64rpx;
		height: 64rpx;
		border: 0.5px solid #ddd;
	}

	.btn {
		border-radius: 0px;
	}

	.btn::after {
		transform-origin: 50% 50%;
		border-radius: 0px;
	}

	.oi1c {
		height: 68rpx;
		padding: 0 6rpx;

		.item {
			padding: 0 10rpx;
			min-width: 152rpx;
			height: 56rpx;
		}
	}

	.oiqdd {
		width: 360rpx;
		height: 88rpx;
		margin-top: 40rpx;
	}

	.payimg {
		width: 153rpx;
		height: 155rpx;
	}

	.pt60 {
		padding-top: 50rpx;
	}

	.p25 {
		padding: 20rpx 50rpx;
	}

	.wdlimg {
		margin: 170rpx 0 0;
		width: 340rpx;
		height: 340rpx;
	}

	.ljdl {
		margin-top: 70rpx;
		padding: 16rpx 48rpx;
	}
</style>
