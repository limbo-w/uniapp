<template>
	<view class="f-row p3 hlt">
		<view class="f-g-0 mr30">
			<view class="gehdimg bsf">
				<mg-img :src='co.portrait'></mg-img>
			</view>
		</view>
		<view class="f-g-1">
			<view class="f-x-bt mt10 f24">
				<view class="f-g-1 mr20">
					<view class="t-o-e f26 wei">{{co.anonymous==1?'*****':co.userName}}</view>
					<view class="f-y-c mt10">
						<!-- <text v-for="(v,i) in [1,2,3,4,5]" :key='i' :style="{color:i+1<=co.rate?color:'#E0E2E6'}" class="iconfont iconxing f22"
						 style="margin-right: 4rpx;"></text> -->
						<uni-rate disabled size='22' :value="co.star" :margin="4" />
					</view>
				</view>
				<view class="f-g-0 c9 f24">{{co.createdAt}}</view>
			</view>
			<view class="mt20 t-o-e3">{{co.body}}</view>
			<view class="f-raw geplcon posi-r">
				<block v-for="(v,i) in co.media" :key='i'>
					<view @click="yl(i)" v-if='i<num' class="geplitem">
						<view class="geplimg bs5">
							<mg-img :src='v'></mg-img>
						</view>
					</view>
				</block>
				<view v-if='co.media.length>num' class='posi-a ptnum b05 cf p-5-20 bs30 f26'>{{co.media.length}}</view>
			</view>
			<view v-if="co.reply" class="bs10 bfa p23 f24 c6">商家回复:{{co.reply}}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniRate from '@/components/third/uni-rate.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'gf-evaluate',
		components: {
			uniRate,
		},
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
			num: {
				type: String,
				default: '3'
			},
			color: {
				type: String,
				default: '#FF5B0A'
			}
		},
		data() {
			return {

			}
		},
		mixins: [utilMixins],
		methods: {
			yl(i) {
				this.util.preImg({
					idx: i,
					urls: this.co.media.map(v => this.getImgS(v)),
				})
			}
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.gehdimg {
		width: 80rpx;
		height: 80rpx;
	}

	.geplcon {
		margin: 20rpx -10rpx 0;
	}

	.geplitem {
		width: 33.33%;
		height: 180rpx;
		margin-bottom: 20rpx;
	}

	.geplimg {
		margin: 0 10rpx;
		height: 100%;
		padding: 0rpx 0rpx;
	}

	.ptnum {
		right: 20rpx;
		bottom: 30rpx;
	}
</style>
