<template>
	<mg-popup v-model="show" :z-index="5000">
		<view class="gdmdxx o-y-s bf7">
			<view class="p3 p-r f40 c0 wei t-c">{{co.shopData.name}}
				<text @click="show=false" class="iconfont iconx f38 p-a r0 mr10" :class="isIpx?'c6':'cd'"></text>
			</view>
			<scroll-view scroll-y class="svbd f24 c9">
				<block v-if="sjqb.length">
					<view class="p20 c0 f28">优惠购</view>
					<view class="">
						<block v-for="(v,i) in sjqb" :key='i'>
							<mg-coupon v-if="i<2||zkshow" @btntap='btntap(v.id)' ptype="8" cname='' :co='v'></mg-coupon>
						</block>
					</view>
				</block>
				<block v-if="sjyhqArr.length">
					<view class="p20 c0 f28">代金券</view>
					<view class="">
						<block v-for="(v,i) in sjyhqArr" :key='i'>
							<mg-coupon v-if="i<2||zkshow" @btntap='btntap(v.id)' ptype="5" cname='' :co='v'></mg-coupon>
						</block>
						<view @click="zkshow=!zkshow" v-if="sjyhqArr.length>2" class="p23 f-c f24 l-h1">
							<view>{{zkshow?'收起':'展开更多'}}</view>
							<text class="iconfont icontop c3 ml5 f28" :class="{'xzdw':!zkshow}"></text>
						</view>
					</view>
				</block>
				<view class="p20 c0 f28" v-if="co.discount.newReduction>0||co.discount.reduce.type||co.discount.give.id||co.discount.grantCoupon.name">优惠活动</view>
				<view class="f-s mb20" v-if="co.discount.newReduction>0">
					<view class="yhic f18 cf b00 f-c">新</view>
					<view class="f-1 ml10">本店新用户立减{{sl+co.discount.newReduction}}</view>
				</view>
				<view v-if='co.discount.reduce.type' class="f-s mb20">
					<view class="yhic f18 cf bf5f f-c">减</view>
					<view class="f-1 ml10">({{co.discount.reduce.people==1?'全部人群':co.discount.reduce.people==2?'新客专享':'VIP专享'}})
						<text class="ml20">{{mjtxt}}</text>
					</view>
				</view>
				<view v-if='co.discount.give.id' class="f-s mb20">
					<view class="yhic f18 cf bf5f f-c">赠</view>
					<view class="f-1 ml10">({{co.discount.give.name}})
						<text class="ml20">{{mztxt}}</text>
					</view>
				</view>
				<view v-if='co.discount.grantCoupon.name' class="f-s mb20">
					<view class="yhic f18 cf bf5f f-c">返</view>
					<view class="f-1 ml10">(满{{co.discount.grantCoupon.orderMoney}}返代金券)
						<text class="ml20">{{co.discount.grantCoupon.name}}</text>
					</view>
				</view>
				<!-- <view class="p20 wei c0 f28">商家服务</view>
				<view class="f-s mb20">
					<view class="lbtn">食无忧</view>
					<view class="f-1 ml20">该商户已购买食品安全责任险，食品安全有保障</view>
				</view>
				<view class="f-s">
					<view class="lbtn">开发票</view>
					<view class="f-1 ml20">该商户支持开发持开发持开发票，请在下单时填写好发票抬头</view>
				</view> -->
				<view class="p20 c0 f28">公告</view>
				<view>{{type==1||type==3?co.moreSet.notice:type==2?co.moreSet.fastNotice:''}}</view>
				<block v-if="type==1">
					<view class="p20 c0 f28">配送信息</view>
					<block v-if='co.moreSet.distributionSupport.find(v=>v==1)'>
						<view>满{{co.shopData.distribution.startMoney}}起送{{co.moreSet.distributionSupport.find(v=>v==2)?'，支持到店自取':''}}；</view>
						<view v-if="co.shopData.deliveryMode">由{{co.shopData.deliveryMode}}提供配送服务，距门店{{co.shopData.delivery}}km范围内配送，配送费用受天气、时间等多方因素影响，以实际配送费为准。</view>
					</block>
					<block v-else>
						<view>仅支持到店自取</view>
					</block>
				</block>
				<view class="p20 c0 f28">门店信息</view>
				<view>营业时间：{{yysj}}</view>
				<view>联系电话：{{co.shopData.storeTel}}</view>
				<view class="f-row">
					<view>门店地址：</view>
					<view class="f-1 mr20">{{co.shopData.address}}</view>
					<view class="f-y-c">
						<view @click="ckwz" class="f-c dzic bsf mr60 p-r o-v">
							<text class="iconfont icondtdh dzi"></text>
							<text class="p-a dd cf5f f18 bs10">到店</text>
						</view>
						<view @click="util.makeTel(co.shopData.storeTel)" class="f-c dzic bsf">
							<text class="iconfont icondh dzi"></text>
						</view>
					</view>
				</view>
				<!-- <view @click="ckda" class="p20 f-y-c wei c0 f28">查看食品安全档案<text class='iconfont iconright f24 ml10 c0'></text></view> -->
			</scroll-view>
		</view>
	</mg-popup>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgPopup from '@/components/common/popup.vue'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'mg-share',
		components: {
			mgPopup,
			mgCoupon,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			type: {
				type: String,
				default: '1'
			},
			value: {
				type: Boolean,
				default: false
			},
			ptype: String,
			qlist: Array,
			sjqb: Array,
		},
		data() {
			return {
				loading: false,
				sjyhqArr: [],
				zkshow: false,
			}
		},
		computed: {
			show: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
			mjtxt() {
				if (this.co.discount.reduce.type == 1) {
					return `每满${this.co.discount.reduce.moneyArr[0].fullMoney}减${this.co.discount.reduce.moneyArr[0].money}`
				} else if (this.co.discount.reduce.type == 2) {
					return this.co.discount.reduce.moneyArr.map(v => `满${v.fullMoney}减${v.money}`).reverse().toString()
				}
			},
			mztxt() {
				return this.co.discount.give.moneyArr && this.co.discount.give.moneyArr.map(v => `满${v.fullMoney}赠${v.give}`).reverse()
					.toString()
			},
			yysj() {
				let text = ''
				let info = this.co.moreSet
				if (info.timeType == 1) {
					text = '24小时营业'
				} else if (info.timeType == 2 && info.timeArr) {
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
		},
		watch: {
			qlist(newVal) {
				if (newVal.length) {
					this.sjyhqArr = utils.deepCopy(newVal)
				} else {
					this.sjyhqArr = []
					this.zkshow = false
				}
				// console.log('qlist', newVal)
			},
		},
		methods: {
			async btntap(e) {
				if (!await this.checkLogin()) return
				let res = await this.util.request({
					'url': this.api.lqyhq,
					method: 'POST',
					mask: 1,
					data: {
						couponId: e,
					},
				})
				if (res) {
					this.$set(this.sjyhqArr.find(v => v.id == e), 'islq', true)
				}
			},
			ckwz() {
				this.util.ckWz({
					lat: this.co.shopData.lat,
					lng: this.co.shopData.lng,
					name: this.co.shopData.name,
					address: this.co.shopData.address,
				})
			},
			ckda() {
				this.go({
					t: 1,
					url: 'sjjs?type=2&info=' + encodeURIComponent(JSON.stringify(this.co.storeInfo))
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.gdmdxx {
		border-radius: 35rpx 35rpx 0 0;
		padding: 10rpx 30rpx 40rpx;

		.svbd {
			max-height: 900rpx;
		}

		.lbtn {
			font-size: 20rpx;
			color: #666;
			padding: 3rpx 25rpx;
			border: 1px solid #ddd;
			border-radius: 5rpx;
		}

		.lbtn2 {
			color: #FF5F2F;
			border-color: #F3D8DB;
		}

		.lbtn3 {
			color: #4BC436;
			border-color: #98ED8B;
		}
	}

	.dzic {
		width: 58rpx;
		height: 58rpx;
		background: #F2F3F5;

		.dzi {
			color: #5B688B;
		}

		.dd {
			background: #FFEFEA;
			padding: 3rpx 10rpx;
			top: -10%;
			right: -70%;
		}
	}
</style>
