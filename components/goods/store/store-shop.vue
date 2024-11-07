<template>
	<mg-popup v-model="show" :z-index="5000">
		<view class="gdmdxx o-y-s bf7">
			<view class="p-r f32 c0 wei t-c tit">
				<text class="f32 nowei c3">请确认门店信息</text>
			</view>
			<view class="flex f-y-c">
				<view class="f32 wei">{{co.shopData.name}}</view>
				<view class="ml20 f24 c9" v-if="storeInfo.distance">距离您{{storeInfo.distance}}</view>
			</view>
			<view class="flex f-c pb30 mt10">
				<view class="f-1">
					<view class="f24 c6 mt10"><text class="iconfont iconlocation mr10 f24"></text>{{co.shopData.address}}</view>
					<view class="f24 c6 mt10 ml32">门店电话:{{co.shopData.storeTel}}</view>
					<!-- <view class="flex f22 cf bs10 mt10">
						<view class="lbg p-3-10">营业时间</view>
						<view class="rbg p-3-10">{{yysj}}</view>
					</view> -->
				</view>
				<view class="f-0">
					<view class="text-btnf f24 f-c qhbtn c3" @click="selectShop">切换</view>
				</view>
			</view>
			<view class="flex p30 mt20">
				<button class="f-c shopbtn"  @click="selectShop" :style="{background:'transparent',border:'1px solid '+tColor,color:tColor}">更换门店</button>
				<button @click="show=false" class="cf shopbtn" :style="{background:tColor}">确定</button>
			</view>
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
			storeInfo: {
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
			selectShop(){
				this.show = false
				this.$emit('select-shop')
			},
		},
	}
</script>

<style scoped lang="scss">
	.gdmdxx {
		border-radius: 35rpx 35rpx 0 0;
		padding: 10rpx 30rpx 40rpx;

		.tit{
			padding: 10rpx 0 50rpx 0;
		}
		.qhbtn{
			width: 120rpx;
			border-radius: 30rpx;
			height: 58rpx;
			border:2rpx solid #C2C2C2;
		}
		.shopbtn {
			width: 320rpx;
			height: 70rpx;
			line-height: 70rpx;
		}
		.lbg{
			background: #333;
		}
		.rbg{
			background: #D7A975;
		}
		.ml32 {
			margin-left: 32rpx;
		}
	}
</style>
