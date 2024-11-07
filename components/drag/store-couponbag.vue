<template>
	<view class='bagbg' :style="{marginTop:`${co.marginTop}${u}`,
		marginBottom:`${co.marginBottom}${u}`,
		marginLeft:`${co.marginLR}${u}`,
		marginRight:`${co.marginLR}${u}`,
		borderRadius:`${co.circle}${u}`,
		backgroundColor:`${co.colorBg}`}">
		<view :class="'p3'">
			<mg-cell cname="p0 cf" bgc="transparent" last='1'
			 :btt="co.title||'我的券包'" bttc='f32 wei' color="#fff" ftc='f24 c6' hc='1'></mg-cell>
		</view>
		<block v-if="sjqb.length">
			<scroll-view class='f-1 ws-n f26' scroll-x='true'>
				<view v-for="(v,i) in sjqb" :key="i" class="dis-in mobdli mr20 ml20" :style="{width:sjqb.length>1?`${630}rpx`:`${670}rpx`}">
					<mg-coupon v-if="i<2||zkshow" @btntap='btntap(v.id)' ptype="8" cname='' :co='v'></mg-coupon>
				</view>
<!-- 				<view class="flex f-c cf">
					<view><text class="iconfont icondjs mr10 f28 cf"></text></view>
					<view class="f20">
						<view>滑</view>
						<view>动</view>
						<view>查</view>
						<view>看</view>
						<view>更</view>
						<view>多</view>
					</view>
				</view> -->
			</scroll-view>
		</block>
		<view v-else class="bf p3 t-c">
			<view class="pb20 c9 f-c">
				<text class="iconfont icondjs mr10 f28"></text>
				<text>暂无券包活动</text>
			</view>
		</view>
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
		watch: {
			storeInfo: {
				async handler(newVal) {
					if (this.storeInfo.id) {
						// let {
						// 	data
						// } = await this.util.request({
						// 	'url': this.api.EvaluateList,
						// 	data: {
						// 		storeId: this.storeInfo.id,
						// 		page: 1,
						// 		size: 2,
						// 	}
						// })
						// this.list = data.list
						let {
							data
						} = await this.util.request({
							'url': this.api.qtsjjh,
							data: {
								location: 1,
								storeId: this.storeInfo.id,
							}
						})
						this.sjqb = data.rollBag
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		async created() {},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style scoped lang="scss">
	.bagbg{
		background:#FB6F3E;
	}
	.cbg{
		background:#FB6F3E;
	}
	.mobdli {
		width: 630rpx;
	
		.img {
			width: 100%;
			height: 120rpx;
		}
	}
</style>
