<template>
	<view class="fixed" :style="{
			marginTop: co.marginTop + 'px',
			marginBottom: co.marginBottom + 'px',
			marginLeft: co.marginLR + 'px',
			marginRight: co.marginLR + 'px'
		}">
		<view class="wrap">
			<swiper v-if="co.orPic == 2" class="swiper" :indicator-dots="false" autoplay="true" circular="true">
				<swiper-item v-for="(v, i) in co.imgUrl" :key="i" @click="goTo(v)">
					<image class="wh" :src="v.img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<!-- 悬浮链接 -->
			<view class="xfcc" v-if="co.orPic == 2&&co.isFloat == 2">
				<view class="xfc posi-r f-y-c bf bs15">
					<view @click="goTo(co.floatUrl1)" class="f-1 f-c-c hlr">
						<view class="img">
							<mg-img :src="co.floatUrl1.img"></mg-img>
						</view>
						<view class="f24 c6 mt20 l-n" v-if="co.floatUrl1.text">{{ co.floatUrl1.text }}</view>
					</view>
					<view @click="goTo(co.floatUrl2)" class="f-1 f-c-c">
						<view class="img">
							<mg-img :src="co.floatUrl2.img"></mg-img>
						</view>
						<view class="f24 c6 mt20 l-n" v-if="co.floatUrl2.text">{{ co.floatUrl2.text }}</view>
					</view>
				</view>
			</view>
			<!-- 定位样式 -->
			<view v-if="storeInfo.name" :class="co.orPic == 2 ? 'Locate' : ''" :style="{paddingTop:dwpt,top:dwtop,background:`rgba(${cTR(co.colorBg)},${co.percent/100})`, color: co.colorWord }">
				<!-- 样式一 -->
				<view v-if="co.module == 1" class="Locate_one f-x-bt p2" :style="{ borderRadius: co.circle + 'px'}">
					<view class="left f-1">
						<view class="wei f34 f-y-c">
							<!-- #ifdef MP-WEIXIN || MP-BAIDU -->
							<open-data type="userNickName"></open-data>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN || MP-BAIDU -->
							<text class="t-o-e" style="max-width: 350rpx;">{{ user.userName||'' }}</text>
							<!-- #endif -->
							<text class="f-g-0">,{{whtime}}好</text>
						</view>
						<view @click="goSelect" class="f-y-c f24">
							<view :style="{ color: co.colorWord }" class="iconfont iconlocation f28"></view>
							<view class="dpmc mr10 t-o-e">{{storeInfo.name}}</view>
							<view style="opacity: 0.8;">距您{{storeInfo.distance}}</view>
							<block v-if="system.storeSet && system.storeSet.storeModel==2">
								<view class="f-g-0 ml10">更多门店</view>
								<view class="iconfont icondown ml5 f28" :style="{color:co.colorWord}"></view>
							</block>
						</view>
					</view>
					<!-- 图片 -->
					<view class="f-c">
						<view @click="goTo(co.upLoad1)" class="ritem">
							<view class="img">
								<mg-img :src="co.upLoad1.img"></mg-img>
							</view>
							<view v-if="co.upLoad2.text">{{ co.upLoad1.text }}</view>
						</view>
						<view @click="goTo(co.upLoad2)" class="ritem">
							<view class="img">
								<mg-img :src="co.upLoad2.img"></mg-img>
							</view>
							<view v-if="co.upLoad2.text">{{ co.upLoad2.text }}</view>
						</view>
					</view>
				</view>

				<!-- 样式二 -->
				<view v-else-if="co.module == 2" class="Locate_two f-x-bt p2" :style="{ borderRadius: co.circle + 'px'}">
					<view class="left f-1">
						<view @click="goSelect" class="f-y-c">
							<view :style="{ color: co.colorWord }" class="iconfont iconlocation f28 mr10"></view>
							<view class="wei f30 t-o-e">{{storeInfo.name}}</view>
							<text v-if="system.storeSet && system.storeSet.storeModel==2" class="iconfont iconright ml5 wei f28" :style="{ color: co.colorWord }"></text>
						</view>
						<view class="btm f24 t-o-e">距离您{{storeInfo.distance}}</view>
					</view>
					<!-- 图片 -->
					<view class="f-c">
						<view @click="goTo(co.upLoad1)" class="ritem">
							<view class="img">
								<mg-img :src="co.upLoad1.img"></mg-img>
							</view>
							<view v-if="co.upLoad2.text">{{ co.upLoad1.text }}</view>
						</view>
						<view @click="goTo(co.upLoad2)" class="ritem">
							<view class="img">
								<mg-img :src="co.upLoad2.img"></mg-img>
							</view>
							<view v-if="co.upLoad2.text">{{ co.upLoad2.text }}</view>
						</view>
					</view>
				</view>

				<!-- 样式三 -->
				<view v-else-if="co.module == 3" class="Locate_two f-x-bt p2" :style="{ borderRadius: `${co.circle + 'px'}`}">
					<view class="left f-1">
						<view class="f-y-c">
							<view :style="{ color: co.colorWord }" class="iconfont iconlocation f28 mr10 wei"></view>
							<view class="f-1 wei f30 t-o-e">{{address}}</view>
							<!-- <view class="iconfont icondown f28 ml10" :style="{color:co.colorWord}"></view> -->
						</view>
						<view class="f-row">
							<view @click="goSelect" class="btm3 f20 f-y-c bs20">
								<view class="f-y-c o-a">
									<text>由</text>
									<text class="t-o-e m01 f-1">{{storeInfo.name}}</text>
									<text class="">送出</text>
								</view>
								<view v-if="system.storeSet && system.storeSet.storeModel==2" class="iconfont iconright f28 ml5" :style="{color:co.colorWord}"></view>
							</view>
						</view>
					</view>
					<!-- 图片 -->
					<view class="f-c">
						<view @click="goTo(co.upLoad1)" class="ritem">
							<view class="img">
								<mg-img :src="co.upLoad1.img"></mg-img>
							</view>
							<view v-if="co.upLoad2.text">{{ co.upLoad1.text }}</view>
						</view>
						<view @click="goTo(co.upLoad2)" class="ritem">
							<view class="img">
								<mg-img :src="co.upLoad2.img"></mg-img>
							</view>
							<view v-if="co.upLoad2.text">{{ co.upLoad2.text }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'fixed',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			u: {
				type: String,
				default: 'px'
			},
		},
		data() {
			return {
				whtime: '',
			};
		},
		mixins: [utilMixins],
		computed: {
			...mapState('dndc', ['addInfo', 'latLng']),
			...mapState({
				storeInfo: state => state.config.storeInfo,
				layout: state => state.layout.index.body
			}),
			address() {
				if (this.addInfo) {
					return this.addInfo.maddress
				} else {
					return '定位中...'
				}
			},
			ztlh() {
				return (this.util.getSb().customNavh - 16) + 'px'
			},
			dwpt() {
				return this.co.orPic != 2 && this.layout.pageSetting[0].styles.modulePage != 1 ? this.ztlh : 0
			},
			dwtop() {
				// #ifndef H5
				return this.layout.pageSetting[0].styles.modulePage == 1 ? 0 : this.ztlh
				// #endif
				// #ifdef H5
				return  0
				// #endif
			},
		},
		// watch: {
		// 	co: {
		// 		async handler(nv) {
		// 			console.log('newVal', nv)
		// 		},
		// 		immediate: true
		// 	},
		// },
		methods: {
			goTo(v) {
				this.goUrl(v.url, v)
			},
			goSelect() {
				this.system.storeSet.storeModel == 2 && this.go({
					url: '/yb_wm/shop/select/index?page=index&storeId=' + this.storeInfo.id
				})
			},
			getWhtime() {
				let t = new Date().getHours(),
					t2 = ''
				if (t < 6) {
					t2 = '凌晨'
				} else if (t < 9) {
					t2 = '早上'
				} else if (t < 12) {
					t2 = '上午'
				} else if (t < 13) {
					t2 = '中午'
				} else if (t < 18) {
					t2 = '下午'
				} else if (t < 22) {
					t2 = '晚上'
				} else {
					t2 = '夜里'
				}
				this.whtime = t2
			},
		},
		created() {
			if (this.co.module == 1) {
				this.getWhtime()
			}
		}
	};
</script>
<style lang="scss" scoped>
	.fixed {
		.wrap {
			position: relative;
		}

		.swiper {
			height: 531rpx;
			position: relative;
		}

		.xfcc {
			padding-bottom: 20rpx;
		}

		.xfc {
			width: 90%;
			padding: 90rpx 0;
			margin: 0 auto;
			margin-top: -50rpx;
			// box-shadow: 0px 0px 4px 2px rgb(238, 238, 238);

			.img {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.Locate {
			position: absolute;
			top: 0;
			width: 100%;
		}

		// 样式一
		.Locate_one {
			.left {
				.dpmc {
					max-width: 200rpx;
				}
			}

			.right {}
		}

		// 样式二
		.Locate_two {
			.left {
				.dpmc {
					max-width: 200rpx;
				}

				.btm {
					padding-left: 35rpx;
				}

				.btm3 {
					background-color: rgba(255, 255, 255, 0.4);
					padding: 4rpx 10rpx 4rpx 20rpx;
					margin: 10rpx 0 0 35rpx;
					max-width: 65%;
				}
			}
		}

		.ritem {
			text-align: center;
			margin-left: 20rpx;
			width: 80rpx;
			font-size: 24rpx;


			.img {
				width: 40rpx;
				height: 40rpx;
				margin: 0 auto;
			}
		}
	}

	.hlr::after {
		border-color: #dddddd;
	}
</style>
