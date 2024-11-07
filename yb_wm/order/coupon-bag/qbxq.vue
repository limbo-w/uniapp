<template>
	<view v-if="co.id" class="">
		<!-- <uni-nav-bar :uropcity="opcity" :uriconopcity='iconOpcity' :fixed='true' :ispr='false' :statusBar="true" :border="opcity>=1"
		 :title="co.name">
		</uni-nav-bar> -->
		<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
		<view class="bf p3">
			<view class="f-y-c">
				<view class="f-g-1">
					<text class="t-o-e cff0">{{sl}}<text class="f36 wei">{{Number(co.money)}}</text></text>
					<text class="t-o-e ml10 t-d-l cb f24">{{sl+Number(co.price)}}</text>
				</view>
				<view class="f26 c9">剩余{{co.stock}}份</view>
			</view>
			<view class="f34 c0 wei mt10">{{co.name}}</view>
		</view>
		<!-- <view class="p03">
			<view class="f36 wei p30">券内容</view>
			<mg-coupon ptype='10' :color='tColor' cname='mb30' v-for="(v,i) in dataList" :key='i' :co='v'></mg-coupon>
		</view> -->
		<view class="bf p3 mt15 f26">
			<view class="f34 wei c0 mb10">购买须知</view>
			<view class="f30">本订单包含以下代金券</view>
			<view class="f-row p10">
				<view class="yd bsf"></view>
				<view class="">
					<text v-for="(v,i) in co.coupon" :key='i'>{{v.fullMoney>0?`满${v.fullMoney}减${v.money}`:`${v.money+dw}无门槛`}}代金券{{v.num}}张,</text>
				</view>
			</view>
			<view class="f30 mt15">可购数量</view>
			<view class="f-row p10">
				<view class="yd bsf"></view>
				<view>{{co.isLimit==1?`每个用户限购${co.limitNum}份`:'每位用户每天可购卡券数量限制'+co.dayNum+'份'}}</view>
			</view>
			<view class="f30 mt15">抢购时间</view>
			<view class="f-row p10">
				<view class="yd bsf"></view>
				<view>{{timeToDate(co.startTime)}}至{{timeToDate(co.endTime)}}</view>
			</view>
			<view class="f30 mt15">有效期限</view>
			<view class="f-row p10">
				<view class="yd bsf"></view>
				<view>自购买日起{{co.days}}天内使用有效</view>
			</view>
			<view class="f30 mt15">适用商家</view>
			<view class="f-row p10">
				<view class="yd bsf"></view>
				<view>{{co.storeName}}</view>
			</view>
			<view class="f30 mt15">使用限制</view>
			<view class="f-row p10">
				<view class="yd bsf"></view>
				<view>须分次使用，每次可使用一张</view>
			</view>
		</view>
		<view class="bf mt15 p3 pb130">
			<view class="f34 wei c0">使用须知</view>
			<view v-if="co.details" class="mt20">
				<mg-rtext type='2' :content="co.details" />
			</view>
		</view>
		<view class="foot-btnc">
			<!-- <view @click="go({url:'/yb_o2o/shop/goods?storeId='+co.storeId})" class="f-c-c c9 mr30">
				<view class="sjlogo bsf">
					<mg-img :src='co.logo' />
				</view>
				<text class="f22 mt5">进入商家</text>
			</view> -->
			<view class="qbbtn o-h f-row">
				<view class="f-1 p3 b3 f-y-c cf">
					<text class="f24 ml10">{{sl}}</text>
					<text class="f40" style="margin-top: -10rpx;">{{Number(co.money)}}</text>
					<text class="t-d-l c9 f18 ml10">{{sl+Number(co.price)}}</text>
				</view>
				<button class="ljgm f30 cf f-c bs0" @click="ljgm" :style="{background:co.canBuy==1?tColor:'#ddd'}">{{co.canBuy==1?'立即购买':'已购买过了'}}</button>
			</view>
		</view>
	</view>
	<load v-else></load>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import utils from '@/common/utils.js'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	import load from '@/components/common/load.vue'
	import {
		getDw,
		wxShare,
		getSLink,
	} from "@/common/wechat-util"
	export default {
		name: 'qbxq',
		components: {
			MgSwiper,
			uniNavBar,
			mgCoupon,
			mgRtext,
			load,
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
				co: {},
				dataList: [],
			}
		},
		async onLoad(options) {
			let id = utils.getOptions(options, {
				key: 'id',
			})
			await this.getLoginInfo()
			this.id = id
			this.getData()
			this.getSystem({
				nosetNB: 1,
			})
		},
		onShow() {
			if (this.co.id) {
				this.getData()
				console.log('qbxq onshow')
			}
		},
		mixins: [utilMixins],
		computed: {},
		methods: {
			...mapActions(["getSjxx"]),
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.qbxq,
					mask: 1,
					data: {
						id: this.id,
					},
				})
				this.co = data
				this.util.setNT(data.name)
				this.swiper.swiper = data.media.map(v => ({
					url: v
				}))
				this.dataList = data.coupons
				wxShare({
					title: data.name,
					desc: data.body,
					imgUrl: this.getImgS(data.icon),
				})
			},
			ljgm() {
				if (this.co.canBuy != 1) return
				uni.setStorageSync('bdhc', this.co)
				this.go({
					url: 'qrdd'
				})
			},
		},
		onPageScroll(e) {
			if (this.opcity >= 1 && e.scrollTop / 64 >= 1) {
				return;
			}
			let o = e.scrollTop / 64
			this.opcity = o;
			this.iconOpcity = 0.5 * (1 - o < 0 ? 0 : 1 - o)
		},
		onShareAppMessage() {
			return this.util.mpShare({
				t: this.co.name,
				i: this.getImgS(this.co.icon),
			})
		},
	}
</script>
<style scoped lang="scss">
	.foot-btnc {
		padding: 30rpx 40rpx;
	}

	.qbbtn {
		box-shadow: 0rpx 10rpx 30rpx 8rpx rgba(0, 0, 0, 0.18);
		height: 96rpx;
		border-radius: 48rpx;
	}

	.ljgm {
		width: 230rpx;
		// background: linear-gradient(90deg, #FE7E23, #FE4E12);
	}

	.yd {
		margin: 15rpx 12rpx 0 8rpx;
		background: #333;
		width: 10rpx;
		height: 10rpx;
	}

	.sjlogo {
		width: 42rpx;
		height: 42rpx;
	}
</style>
