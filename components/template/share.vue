<template>
	<mg-popup close='1' v-model="show" :z-index="5000">
		<view class="p0">
			<view class="bf p3 fxc">
				<view class="f-c">
					<view class="hx"></view>
					<view class="m02 f32 wei">分享到</view>
					<view class="hx"></view>
				</view>
				<view class="sharec f-row">
					<!-- #ifdef H5 -->
					<!-- <view @click="fzlj" class="f-1 f-c-c">
						<view class="fximg bsf">
							<mg-img :src='`${onImgurl}/ljs.png`'></mg-img>
						</view>
						<view class="mt20 f24">复制链接</view>
					</view> -->
					<!-- #endif -->
					<view v-if="wxs" class="f-1 f-c-c posi-r">
						<view class="fximg bsf f-c">
							<text class="iconfont iconwxfx f60 c6"></text>
						</view>
						<view class="mt20 f24">分享好友</view>
						<!-- #ifndef H5 -->
						<button class='sharebtn' open-type='share'></button>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<button class='sharebtn' @click="share"></button>
						<!-- #endif -->
					</view>
					<!-- #ifndef H5 -->
					<view v-if="hbs" class="f-1 f-c-c" @click="hbfx">
						<view class="fximg bsf f-c">
							<text class="iconfont iconxzfx f56 c6"></text>
						</view>
						<view class="mt20 f24">海报分享</view>
					</view>
					<!-- #endif -->
				</view>
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
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	export default {
		name: 'mg-share',
		components: {
			mgPopup,
			MgSwiper,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			value: {
				type: Boolean,
				default: false
			},
			wxs: {
				type: String,
				default: '1'
			},
			hbs: {
				type: Boolean,
				default: false
			},
			link: {
				type: String,
				default: ''
			},
			ptype: String,
		},
		data() {
			return {}
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
		},
		watch: {},
		methods: {
			share() {
				this.show = false
				uni.showModal({
					title: '提示',
					content: '点击右上角分享',
					showCancel: false,
					confirmText: '我知道了'
				})
			},
			fzlj() {
				this.util.fz(this.link || location.href)
			},
			hbfx() {
				if (this.ptype == 1) {
					this.show = false
					uni.setStorageSync('bdhc', this.co)
					this.go({
						url: `/yb_wm/other/hb?type=${this.ptype}`
					})
				}
				if (this.ptype == 2) {
					this.show = false
					uni.setStorageSync('bdhc', this.co)
					this.go({
						url: `/yb_wm/other/hb?type=${this.ptype}`
					})
				}
				console.log(this.ptype)
			},
		},
	}
</script>

<style scoped lang="scss">
	.tcbtm {
		margin-top: 50rpx;
	}

	.fxc {
		border-radius: 30rpx 30rpx 0 0;
	}

	.hx {
		width: 120rpx;
		height: 2rpx;
		background: #EAEAEA;
	}

	.sharec {
		margin-top: 50rpx;
	}

	.fximg {
		width: 100rpx;
		height: 100rpx;
		background: #EFEEEF;
	}

	.sharebtn {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
		top: 0;
		background: none;
		left: 0;
	}
</style>
