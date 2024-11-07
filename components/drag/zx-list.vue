<template>
	<view class="titles o-h" :style="{
			marginTop: co.marginTop + u,
			marginBottom: co.marginBottom + u,
			marginLeft: (co.marginLR) + u,
			marginRight: (co.marginLR) + u,
			borderRadius: (co.circle) +u,
		}">
		<view class="titles-c bf" :style="{ background: co.colorBg, }">
			<view @click="go({url:'/yb_wm/other/info/index'})" class="p330 f-x-bt">
				<view class="f30 wei c0">{{co.title}}</view>
				<view class="f-y-c f-g-0">
					<text class="f24" style="color: #A4A4A4;">更多</text>
					<text class="iconfont iconright c6 arrow f26"></text>
				</view>
			</view>
			<view @click="go({url:'/yb_wm/other/info/detail?id='+v.id})" class="weui-cell f-sh" v-for="(v,i) in arr" :key='i'>
				<view class="f-1 f-y-bt">
					<view>
						<view class="f26 t-o-e">{{v.title}}</view>
						<view v-if="v.introduction" class="f24 t-o-e c9">{{v.introduction}}</view>
					</view>
					<view class="c9 f24 l-n">{{timeToDate(v.createdAt,'MM月dd日')}}</view>
				</view>
				<view class="img ml30 bs10">
					<mg-img :src="v.icon"></mg-img>
				</view>
			</view>
			<!-- <view @click="goLink(co.upLoad1)" class="f-1 f-y-c" :class="{'f-x-c':co.wordStatus=='center'}">
				<view v-if="co.upLoad1.img" class="img f-g-0 mr10">
					<mg-img :src='co.upLoad1.img'></mg-img>
				</view>
				<view class="f32 wei l-n" :style="{ color: co.upLoad1.colorWord }">{{ co.upLoad1.text }}</view>
			</view>
			<view @click="goLink(co.upLoad2)" class="f-y-c">
				<view class="f24 c9" :style="{ color: co.upLoad2.colorWord }">{{ co.upLoad2.text }}</view>
				<view v-if="co.upLoad2.img" class="img ml10">
					<mg-img :src='co.upLoad2.img'></mg-img>
				</view>
			</view> -->
		</view>
	</view>
</template>
<script>
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'titles',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			shopinfo: {
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
				arr: []
			};
		},
		mixins: [utilMixins],
		methods: {
			goLink(v) {
				this.goUrl(v.url)
			},
		},
		watch: {
			shopinfo: {
				async handler(newVal) {
					if (newVal.id) {
						let {
							data
						} = await this.util.request({
							'url': this.api.zxlb,
							data: {
								page: 1,
								size: 3,
								storeId: newVal.id
							},
						})
						this.arr = data
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		async created() {
			this.arr = this.arr
			// setTimeout(async () => {
			// 	let {
			// 		data
			// 	} = await this.util.request({
			// 		'url': this.api.zxlb,
			// 		data: {
			// 			page: 1,
			// 			size: 3
			// 		},
			// 	})
			// },200)
			// console.log(this.co)
		}
	};
</script>
<style lang="scss" scoped>
	.titles {
		&-c {
			padding: 0 0 20rpx;

			.img {
				width: 178rpx;
				height: 123rpx;
			}
		}
	}
</style>
