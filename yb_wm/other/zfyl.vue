<template>
	<view class="h100">
		<view class="">
			<view class="cf p-r" :style="{background:tColor}">
				<view class="rwimg p-a b0 r0">
					<mg-img m="aspectFit" src="/static/pay/ylbg.png"></mg-img>
				</view>
				<view class="p-r">
					<!-- <view class="p330 f30 t-r" :style="{marginTop:'0'||util.getSb().statusBarHeight+'px'}">完成</view> -->
					<view class="zl1c">
						<view class="f-y-c top">
							<view class="f-g-1">
								<view class="f42 mb30 wei6">支付成功</view>
								<view>
									<view>实付{{sl}}{{ylInfo.money||'--'}}</view>
									<view>{{ylInfo.payModeName}}</view>
								</view>
							</view>
							<view class="f-g-0 gouc f-c">
								<image mode="widthFix" class="img" src="/static/wd/yldd.png"></image>
							</view>
						</view>
						<view class="p30">
							<block v-if="ylInfo.payPolitely==1">
								<view v-if="ylInfo.couponName" class="mb20 f-y-c f24">
									<view class="f-y-c jli bf cf mr20 f-g-0">
										<!-- <image class="limg" src="/static/wd/hb.png"></image> -->
										<view class="wei f22">代金券</view>
									</view>
									<view class="">订单完成后，您将获得{{ylInfo.couponName}}门店代金券1张！</view>
								</view>
								<view v-if="ylInfo.balance>0" class="mb20 f-y-c f24">
									<view class="f-y-c jli bf cf mr20 f-g-0">
										<view class="wei f22">{{balanceName}}</view>
									</view>
									<view class="">订单完成后，您将获得{{ylInfo.balance}}{{balanceName}}！</view>
								</view>
								<view v-if="ylInfo.integral>0" class="mb20 f-y-c f24">
									<view class="f-y-c jli bf cf mr20 f-g-0">
										<view class="wei f22">{{jfName}}</view>
									</view>
									<view class="">订单完成后，您将获得{{ylInfo.integral}}{{jfName}}！</view>
								</view>
								<view v-if="ylInfo.growth>0" class="mb20 f-y-c f24">
									<view class="f-y-c jli bf cf mr20 f-g-0">
										<view class="wei f22">成长值</view>
									</view>
									<view class="">订单完成后，您将获得{{ylInfo.growth}}成长值！</view>
								</view>
							</block>
							<view class="f-c p10">
								<view class="ckdd b-d f-c mr40" @click="go({t:6,url:'/yb_wm/index/index'})">逛逛首页</view>
								<view class="ckdd b-d f-c" @click="ckdd">完成</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="zlbd p-r o-h">
				<view class="bf p3 f24 c9 bs30">注意:{{system.name}}及销售商不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。</view>
				<block v-if="shopinfo.id">
					<view class="f-y-c p23">
						<view class="tjl f-1"></view>
						<view class="f-y-c wntj c9">
							<!-- <text class="iconfont iconsz mr10 mt0"></text> -->
							<text>为你推荐</text>
						</view>
						<view class="tjr f-1 "></view>
					</view>
					<product-group :co="pgco" :shopinfo='shopinfo'></product-group>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	import productGroup from '@/components/drag/product.vue';
	let app = getApp().globalData
	export default {
		name: 'rwzx',
		components: {
			productGroup
		},
		data() {
			return {
				shopinfo: {},
				ylInfo: {},
			}
		},
		onLoad(options) {
			this.getSystem({
				setNB: 1,
			})
			this.util.setNT('')
			this.payObj = JSON.parse(decodeURIComponent(options.payObj)) || {
				orderId: 61,
				orderType: 1,
				info: {
					money: 0.01,
					storeName: '楚河11汉街店',
					type: "下单支付",
					cancel: 1,
					go: {
						t: 4,
					},
				}
			}
			this.getData()
			// console.log(this.payObj)
		},
		computed: {
			jfName() {
				return this.system.custom.integral
			},
			balanceName() {
				return this.system.custom.balance
			},
			pgco() {
				return {
					circle: "8",
					colorBg: "rgba(0,0,0,0)",
					colorBtn: this.tColor,
					colorProductBg: "#fff",
					colorTitle: "#212121",
					img: "https://bkycms.com/addons/yb_wm/web/static/yb_wm/36/2020/09/24/202009241022175541.png",
					marginBottom: "0",
					marginLR: "0",
					marginLeft: "0",
					marginRight: "0",
					marginTop: "0",
					productMarket: "3",
					productNum: "4",
					type: "1",
					typeBg: "1",
					typeBtn: "3",
					typePay: "4",
					typeProduct: "3",
					typeText: "推荐",
				}
			},
		},
		methods: {
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.zfyl,
					data: {
						id: this.payObj.orderId,
						orderType: this.payObj.orderType,
					},
				})
				this.ylInfo = data
				this.shopinfo = {
					id: data.storeId
				}
			},
			ckdd: utils.throttle(function(e) {
				if (this.payObj.info.go.t == 4) {
					let lastPage = this.util.getPage()
					lastPage.$vm.paySuccess && lastPage.$vm.paySuccess()
					// console.log(lastPage)
				}
				if (this.payObj.orderType == 5) {
					app.ddquery = {
						nt: 1,
						t: 2
					}
				} else if (this.payObj.orderType == 6) {
					app.ddquery = {
						nt: 1,
						t: 4
					}
				}else if (this.payObj.orderType == 9) {
					app.ddquery = {
						nt: 1,
						t: 3
					}
				}
				this.go(this.payObj.info.go)
				// this.go({
				// 	t: 6,
				// 	url: '/yb_wm/index/order-index'
				// })
			}, 1000),
		},
	}
</script>
<style scoped lang="scss">
	.rwimg {
		width: 194rpx;
		height: 146rpx;
		bottom: 10rpx;
	}

	.zl1c {
		padding: 0 90rpx 50rpx;

		.top {
			padding: 30rpx 0;
			border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
		}

		.jli {
			padding: 2rpx 10rpx;
			border-radius: 10rpx;
			background: #F44336;
		}

		.limg {
			width: 32rpx;
			height: 34rpx;
			margin-right: 3rpx;
		}
	}

	.cea {
		color: #E03D2A;
	}

	.ckdd {
		border-color: #fff;
		width: 220rpx;
		height: 68rpx;
		border-radius: 68rpx;
	}

	.mr40 {
		margin-right: 40rpx;
	}

	.gouc {

		// margin-right: 80rpx;
		// width: 70rpx;
		// height: 70rpx;
		// background: rgba($color: #fff, $alpha: 0.3);
		.img {
			width: 170rpx;
		}
	}

	.zlbd {
		border-radius: 30rpx 30rpx 0 0;
		margin-top: -30rpx;
	}

	.wntj {
		margin: 0 30rpx;
	}

	.tjl {
		height: 1px;
		background: linear-gradient(90deg, #f5f5f5, #BABABA);
	}

	.tjr {
		height: 1px;
		background: linear-gradient(-90deg, #f5f5f5, #BABABA);
	}
</style>
