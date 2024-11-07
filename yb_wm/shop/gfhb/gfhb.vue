<template>
	<view class="mh100 gfhb" v-show="!showLoading">
		<view class="imggfgb posi-a">
			<mg-img :src='`${onImgurl}gfhb/hbbg.jpg`'></mg-img>
		</view>
		<view class="main posi-r f-col f-y-c">
			<view class="gfbg posi-r">
				<block v-if="!isLogin">
					<view class="posi-a t0 wh">
						<mg-img :src='`${onImgurl}gfhb/wdlbg2.png`'></mg-img>
					</view>
					<view class="posi-r wh f-col f-y-c">
						<view class="top f40">最多可获得红包10元</view>
						<view class="btm mt20">
							<view class="yjyq posi-r f-c">
								<view class="wh">
									<mg-img :src='`${onImgurl}gfhb/btn1.png`'></mg-img>
								</view>
								<view class="posi-a top3 wh f-c">
									<view class="posi-r tl f38 l-h1" @click="yjdllq">一键登录领取</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="posi-a t0 wh">
						<mg-img :src='`${onImgurl}gfhb/dlbgh2.png`'></mg-img>
					</view>
					<view class="posi-r wh p2" v-if='divinfo.money'>
						<view class="f-bt mt30">
							<view class=""></view>
							<view class="flex c6 mr20 l-h1">
								<view class="tl f26" @click="seelist">
									看看大家手气</view>
								<view class="iconfont iconright tr f26"></view>
							</view>
						</view>
						<view class="f-c flex hbt f-y-e mt10">
							<view class="wei">￥</view>
							<view class="f80 wei l-h1">{{divinfo.money}}</view>
						</view>
						<view class="c3 f34 wei f-c mt20" v-if="divinfo.lucky=='1'">拼手气大红包</view>
						<view class="c3 f34 wei f-c mt20" v-else>拼手气小红包</view>
						<view class="f-c flex l-h1 mt10 czdy t-o-e">
							<view class="leftv">满{{divinfo.fullMoney}}元可用</view>
							<view class="rightv">{{divinfo.useDay}}天后过期</view>
						</view>
						<view class="f-col f-y-c">
							<view class="ljyq posi-r">
								<view class="wh">
									<mg-img :src='`${onImgurl}gfhb/btn2.png`'></mg-img>
								</view>
								<view class="posi-a top3 wh f-c">
									<view class="posi-r tl f38 wei l-h1" @click="use" :loading="loading"
										:disabled="loading">去使用</view>
								</view>
							</view>
						</view>
						<view class="f24 f-c mt10 ckco" @click="go({t:1,url:'/yb_wm/my/coupon/my'})">
							红包已放入：个人中心-我的卡券，去看看 ></span></view>
					</view>
				</block>
			</view>
		</view>
		<view class="p2">
			<mg-cell cname="p0 bs20" bgc='#FFD99A' last="1">
				<view slot='bd'>
					<view class="">
						<view class="posi-r f-c p02">
							<view class="bee posi-a poswz"></view>
							<view class="bff posi-r p3 c3 f-y-c f34 mt5">活动规则</view>
						</view>
					</view>
					<view class="plrb f28 c3">
						<book-text type='2' :content="divinfo.details" />
					</view>
				</view>
			</mg-cell>
		</view>
		<load v-if="showLoading"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import MgImg from '@/components/common/mg-img.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import bookText from '@/components/common/functionCmp/rich-text.vue';
	import load from '@/components/common/load.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'gfhb',
		components: {
			MgImg,
			MgCell,
			bookText,
			load,
		},
		data() {
			return {
				agreement: "",
				content: '',
				couponData: '',
				hbData: [],
				divinfo: '',
				showLoading: true,
			}
		},
		async onLoad(options) {
			await this.getLoginInfo()
			this.getSystem()
			this.util.setNT('瓜分红包')
			this.query = options
			this.getReceive()
		},
		mixins: [utilMixins],
		computed: {},
		methods: {
			async getReceive() {
				let res = await this.util.request({
					'url': this.api.divreceive,
					method: 'POST',
					data: {
						id: this.query.id,
					}
				}).then(res => {
					this.getInfo()
				})
			},
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.divinfo,
					data: {
						id: this.query.id,
					}
				})
				this.divinfo = data
				this.showLoading = false
			},
			async yjdllq() {
				if (!await this.checkLogin()) return
				this.getReceive()
			},
			use() {
				this.go({
					t: 6,
					url: `/yb_wm/index/goods`,
				})
			},
			seelist(){
				this.go({
					t: 1,
					url: `/yb_wm/shop/gfhb/gflb?id=${this.query.id}`
				})
			},
		},
	}
</script>
<style lang="scss">
	.gfhb {
		background: #EC8E1C;
	}

	.imggfgb {
		width: 100%;
		height: 780rpx;
	}

	.main {
		padding: 180rpx 40rpx 20rpx 40rpx;
	}

	.gfbg {
		width: 624rpx;
		height: 559rpx;

		.top {
			margin-top: 306rpx;
			color: #FEBC3C;
		}

		.btm {
			// margin-top: 50rpx;
		}
	}

	.yjyq {
		color: #D64A29;
		width: 454rpx;
		height: 111rpx;
	}

	.top3 {
		top: -6rpx;
	}

	.hbt {
		color: #F84D34;

		.f80 {
			font-size: 82rpx;
		}
	}

	.czdy {
		color: #514A37;
	}

	.czdy2 {
		color: #E0421D;
	}

	.leftv {
		padding-right: 10rpx;
		border-right: 1px solid #514A37;
	}

	.rightv {
		padding-left: 10rpx;
	}

	.ljyq {
		margin-top: 76rpx;
		color: #E33E1A;
		width: 320rpx;
		height: 110rpx;
	}

	.plrb {
		padding: 0 20rpx 30rpx 20rpx;
	}

	.bee {
		border-bottom: 1px solid #3A1D00;
	}

	.bff {
		background: #FFD99A;
	}

	.icon {
		width: 72rpx;
		height: 72rpx;
		margin: 15rpx 20rpx 0 0;
	}

	.plrb {
		padding: 0 30rpx 40rpx 30rpx;
	}

	.weui-cellt:after {
		left: 30rpx;
		right: 30rpx;
		border-bottom: 1px solid #E59FAE;
		content: '';
		position: absolute;
		-webkit-transform: scaleY(0.5);
		-ms-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
	}

	.poswz {
		left: 30rpx;
		right: 30rpx;
	}

	.ckco {
		color: #FFE9F4;
	}
</style>
