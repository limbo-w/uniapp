<template>
	<view class='bf' :style="{marginTop:`${co.marginTop}${u}`,
		marginBottom:`${co.marginBottom}${u}`,
		marginLeft:`${co.marginLR}${u}`,
		marginRight:`${co.marginLR}${u}`,
		borderRadius:`${co.circle}${u}`,
		backgroundColor:`${co.colorBg}`}">
	<!-- 	<view :class="'p3'">
			<mg-cell cname="p0" bgc="transparent" last='1'
			 :btt="co.title||'门店信息'" bttc='f32 wei' color="#fff" ftc='f24 c6' hc='1'></mg-cell>
		</view> -->
			<view class="infop" v-if="sjxx.shopData">
				<view class="f34 wei">{{sjxx.shopData.name}}</view>
				<view class="flex f24">
					<view>主营商品：{{sjxx.shopData.mainDishes}}</view>
					<view class="ml20">￥{{sjxx.shopData.perCapita}}/人</view>
				</view>
				<view v-if="sjxx.shopData && sjxx.shopData.environment.length" class="mt20">
					<scroll-view class='f-1 ws-n f26' scroll-x='true'>
						<view v-for="(v,i) in sjxx.shopData.environment" @click="yl(i)" :key="i" class="dis-in mobdli mr20">
							<mg-img :src='v'  class="img"/>
						</view>
					</scroll-view>
				</view>
				<view class="flex f24 c3 mt20 f-bt">
					<view class="f-c"><text class="iconfont iconsj c9 mr10 f28"></text>营业时间：{{yysj}} </view>
					<view class="ml20 f24 f-c" @click="go({t: 1,url: '/yb_wm/shop/out/sjjs?info=' + encodeURIComponent(JSON.stringify(sjxx.shopData))})">更多信息<text class="iconfont iconright c9 arrow ml5 f28"></text></view>
				</view>
				<view class="mt20 f-bt">
					<view class="c3 f24 f-1">
						<view class="f-1"><text class="iconfont iconditu c9 mr10 f28"></text>{{sjxx.shopData.address}}</view>
						<view class="f-1"><text class="iconfont icondh1 c9 mr10 f26"></text>门店电话：{{sjxx.shopData.storeTel}}</view>
					</view>
					<view class="f-y-c f-0">
						<view class="t-c c3">
							<view @click="util.ckWz(sjxx.shopData)" class="iconfont icondtdh f36 iccolor"></view>
							<view class="f20">一键导航</view>
						</view>
						<view class="t-c ml30 c3">
							<text @click="util.makeTel(sjxx.shopData.storeTel)" class="iconfont icondh f36 iccolor"></text>
							<view class="f20">联系电话</view>
						</view>
					</view>
				</view>
			</view>
<!-- 		<view v-else class="bf p3 t-c">
			<view class="pb20 c9 f-c">
				<text class="iconfont icondjs mr10 f28"></text>
				<text>暂无商家</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	export default {
		name: 'searchBox',
		components: {
			mgCoupon,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {
						infoTitle: "",
						isBottom: 0,
						reverseTwo: 0,
						topMargin: 0,
					}
				}
			},
			storeInfo: {},
			u: {
				type: String,
				default: 'px'
			},
			color: {
				type: String,
				default: ''
			},
			// sjqb: Array,
		},
		data() {
			return {
				list: [],
				sjqb: [],
			}
		},
		computed:{
			...mapState(['sjxx']),
			yysj() {
				let text = ''
				let info = this.sjxx.moreSet
				if (info && info.timeType == 1) {
					text = '24小时营业'
				} else if (info && info.timeType == 2 && info.timeArr) {
					text = `${info.timeArr[0].startTime}-${info.timeArr[0].ciri?'次日':''}${info.timeArr[0].endTime}`
					if (info.timeArr[1]) {
						text += ' ' +
							`${info.timeArr[1].startTime}-${info.timeArr[1].ciri?'次日':''}${info.timeArr[1].endTime}`
					}
					if (info.timeArr[2]) {
						text += ' ' +
							`${info.timeArr[2].startTime}-${info.timeArr[2].ciri?'次日':''}${info.timeArr[2].endTime}`
					}
				}
				return text
			},
			imgs() {
				return this.sjxx.shopData && this.sjxx.shopData.environment && this.sjxx.shopData.environment.map(v => this.getImgS(v))
			},
		},
		watch: {
			storeInfo: {
				async handler(newVal) {
					if (this.storeInfo.id) {
						let lc = getApp().globalData.gdlocation
						await this.getSjxx({
							storeId: this.storeInfo.id,
							// item: this.outin,
							lat: lc.latitude,
							lng: lc.longitude,
						})
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		async created() {},
		methods: {
			...mapActions(["getSjxx"]),
			yl(i) {
				this.util.preImg({
					idx: i,
					urls: this.imgs,
				})
			},
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style scoped lang="scss">
	.cbg{
		background:#FB6F3E;
	}
	.mobdli {
		width: 230rpx;
		height: 160rpx;
		.img {
			width: 100%;
			height: 120rpx;
		}
	}
	.infop{
		padding: 20rpx;
	}
	.iccolor{
		color: #464646;
	}
</style>
