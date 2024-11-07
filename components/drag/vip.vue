<template>
	<view class="dragvip">
		<view class="posi-r f-x-c" :class="styles.vipStatus==1?'header':''" :style="{background:styles.bgType == 1?styles.colorBg:''}">
			<view v-if="styles.bgType != 1&&styles.img" class="posi-a mywh bgimg">
				<mg-img :src="styles.img"></mg-img>
			</view>
			<view class="posi-r mywh cf">
				<!-- #ifndef H5 -->
				<view v-if="ptype=='my'&&showpr==2" class="posi-r" :style="{height:util.getSb().customNavh-10+'px'}"></view>
				<!-- #endif -->
				<view v-if="isLogin" class="my-header f-row">
					<view class='f-g-0 posi-r'>
						<image v-if='isVip' class="posi-a hgimg" src="/static/wd/vip/hg.png"></image>
						<view class="img">
							<mg-img cname="bsf" :src="user.portrait||'/static/wd/mrtx.png'"></mg-img>
						</view>
					</view>
					<view class="f-g-1">
						<view class="f38 wei mb15 f-y-c">
							<view :style="{color:styles.colorName}" class="t-o-e mr20">{{user.userName}}</view>
							<view v-if='isVip' class="f-g-0 f-row f22 o-h" style="max-width: 60%;">
								<view class="vname-l t-c t-o-e">{{vipset.title}}</view>
								<view class="vname-r t-c t-o-e">{{user.cardName}}</view>
							</view>
						</view>
						<view class="f-y-c f24">
							<text class="mr10">用户ID:</text>
							<text>{{user.id}}</text>
							<text @click='util.fz(user.id)' class="fz">复制</text>
						</view>
						<!-- <view v-else class="f-y-c f24">
							<text class="iconfont icontel mr10 f28 cf"></text>
							<text>{{user.userTel}}</text>
						</view> -->
					</view>
					<view class="ml20 f-c" @click="go({url:'/yb_wm/my/other/bjzl'})">
						<text class="iconfont iconsz cf f46"></text>
					</view>
				</view>
				<view v-else class="my-header f-y-c">
					<view class="f-g-0 img">
						<mg-img cname="bsf" src='/static/wd/mrtx.png'></mg-img>
					</view>
					<view class="f-g-1">
						<view class="f38 mb15" :style="{color:styles.colorName}">{{user.userName}}</view>
						<view class="text-btn bs30 f24 p0 cf f-c" @click="ljdl">立即登录</view>
						<!-- <sq-btn cname="text-btn bs30 f24 p0 cf" w='135' h='50' t='点击登录'></sq-btn> -->
						<!-- <bk-b @tab="go({t:1,url:'login/index'})" type='2' c-name='bs30 f24 p-8-20' t='立即登录' :color=" tColor"></bk-b> -->
					</view>
				</view>
				<view v-if='styles.vipStatus==1' class="my-bd c3">
					<view v-if="isVip" class="vc f-x-bt f22">
						<view class="f-y-c" style="color:#FADCAD">
							<image class="vimg mr10" src="/static/wd/vip/mv.png"></image>
							<view>{{user.cardName}}</view>
						</view>
						<view @click="go({t:1,url:'/yb_wm/order/vip/wkk'})" class="bs30 p-8-20 dlbtn f-y-c">
							<view class="mr10">查看详情</view>
							<view class="ysj"></view>
						</view>
					</view>
					<view v-else class="vc f-x-bt f22">
						<view class="f-y-c" style="color:#fff">
							<image class="vimg mr10" src="/static/wd/vip/mv.png"></image>
							<view>领取会员卡，各种优惠享不停</view>
						</view>
						<view @click="go({t:1,url:'/yb_wm/order/vip/wkk'})" class="bs30 p-8-20 dlbtn f-y-c">
							<view class="mr10">立即领取</view>
							<view class="ysj"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-datac">
			<view class="my-data bf bs20 f-row">
				<block v-for="(v,i) in myData" :key='i'>
					<view v-show="!v.hide" @click="myDataClick(v)" class="datac f-1 b-r-d f-c-c">
						<view class="f36 wei t-o-e t-c" style="width: 90%;" :style="{color:styles.colorNumber}">{{isLogin?v.num:'***'}}</view>
						<view class="f24" :style="{color:styles.colorTitle}">{{v.name}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex';
	import sqBtn from '@/components/common/sq-btn.vue';
	export default {
		name: 'vip',
		components: {
			sqBtn
		},
		data() {
			return {};
		},
		props: {
			styles: Object,
			ptype: {
				type: String,
				default: 'my'
			},
			showpr: {
				type: String,
				default: ''
			},
		},
		methods: {
			async ljdl() {
				if (!await this.checkLogin()) return
			},
			async myDataClick(v) {
				if (!await this.checkLogin()) return
				let url = ''
				if (v.url) {
					url = v.url
				} else {
					url = '/yb_wm/my/other/kfz'
				}
				this.go({
					t: 1,
					url,
				})
			}
		},
		computed: {
			...mapState({
				vipset: state => state.config.vipset,
			}),
			myData() {
				// console.log(this.styles)
				return [{
					hide: this.styles.btnStatus[0].toString() == 'false',
					num: this.user.balance || 0,
					name: this.system.custom.balance,
					url: '/yb_wm/other/recharge/yesy'
				}, {
					hide: this.styles.btnStatus[1].toString() == 'false',
					num: this.user.integral || 0,
					name: this.system.custom.integral,
					url: '/yb_wm/my/integral/my-integral'
				}, {
					hide: this.styles.btnStatus[2].toString() == 'false',
					num: this.user.couponNum || 0,
					name: '优惠券',
					url: '/yb_wm/my/coupon/my'
				}, {
					hide: this.styles.btnStatus[3].toString() == 'false',
					num: 0,
					name: '收藏',
				}, ]
			},
		},
		created() {},
	};
</script>

<style lang="scss" scoped>
	.header {
		// height: 440rpx;
		width: 160%;
		margin-left: -30%;
		border-bottom-left-radius: 40%;
		border-bottom-right-radius: 40%;
		overflow: hidden;
	}
	.mywh {
		width: 100vw;
		height: 100%;
	}
	
	.bgimg {
		// background: linear-gradient(to right, #f6e0b1, #f6b13a);
	}

	.my-header {
		padding: 40rpx 30rpx 40rpx;

		.text-btn {
			width: 130rpx;
			height: 50rpx;
			border-color: #fff;
		}

		.img {
			width: 116rpx;
			height: 116rpx;
			margin-right: 30rpx;
		}

		.fz {
			font-size: 18rpx;
			padding: 2rpx 15rpx;
			border-radius: 5rpx;
			border: 1rpx solid #fff;
			margin-left: 20rpx;
		}

		.hgimg {
			top: -18rpx;
			right: 10rpx;
			width: 53rpx;
			height: 54rpx;
		}

		.vname-l {
			min-width: 120rpx;
			padding: 3rpx 10rpx 3rpx 15rpx;
			border-radius: 50rpx 0 0 50rpx;
			background: linear-gradient(to right, #503215, #55371A);
			color: #FFFADB;
		}

		.vname-r {
			min-width: 120rpx;
			padding: 3rpx 15rpx 3rpx 10rpx;
			border-radius: 0 50rpx 50rpx 0;
			background: linear-gradient(to right, #FFF3A6, #FCD96F);
			color: #7A5D24;
		}
	}

	.my-bd {
		margin: 0 25rpx;
		background: linear-gradient(to right, #535353, #131313);
		border-radius: 40rpx 40rpx 0 0;

		.vc {
			padding: 15rpx 30rpx 25rpx;
		}

		.dlbtn {
			background: linear-gradient(to right, #FFF5C2, #FFDD8B);
		}

		.vimg {
			width: 25rpx;
			height: 25rpx;
		}

		.img {
			width: 46rpx;
			height: 46rpx;
		}

		.ysj {
			width: 0;
			height: 0;
			border-top: 6rpx solid transparent;
			border-left: 10rpx solid #333;
			border-bottom: 6rpx solid transparent;
		}
	}

	.my-datac {
		padding: 20rpx 20rpx 0;
	}

	.my-data {
		padding: 35rpx 0rpx;

		.b-r-d:after {
			background: #fff;
		}

		.datac {

			&:last-child.b-r-d:after {
				background: #fff;
			}
		}
	}
</style>
