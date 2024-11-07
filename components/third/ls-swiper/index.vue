<template>
	<view class="wrap">
		<swiper class="swiper" :style="{height: height *2 + 'rpx'}" :autoplay="autoplay" :interval="interval" :duration="duration"
		 :circular='loop' @change='change' :previous-margin='previousMargin + "rpx"' :next-margin='nextMargin + "rpx"'
		 :current='current'>
			<swiper-item v-for="(item,index) in list" :key='index' @click="$emit('clickItem',item)">
				<view v-if="list && list.length>0" class="item" :class="[!crown ? '' : current==index ? 'crown-active':'crown']">
					<image v-if="!slots" class="item-img" :class="[imgShadow?'imgShadow':'']" :src="item[imgKey]" :style="{ borderRadius: imgRadius + 'px',width:imgWidth}"
					 mode="aspectFill"></image>
					<slot v-else :data='item'></slot>
					<!-- #ifdef MP-TOUTIAO -->
					<template v-if="item">
						<view class="bs20 imgc p-r" :style="{background:item.bgType==1?data.color||tColor:''}">
							<view class="p-a wh">
								<mg-img :src="item.bgType==2?item.bgImg:'/static/wd/vip/vipbg.png'"></mg-img>
							</view>
							<view class="p-r wh cf">
								<view class="p34 f-y-c">
									<view class="f-1 f32 wei">{{item.name}}</view>
									<view class="rdj b-d f26 l-n">VIP{{item.level}}</view>
								</view>
								<view class="p3 mt30 f-y-e">
									<view class="f40 l-n">{{item.condition}}</view>
									<view class="ml20 f26">成长值</view>
								</view>
							</view>
						</view>
					</template>
					<!-- #endif -->
					<view>{{item.name}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="dots flex" :style="{bottom: bottom * 2 + 'rpx'}" v-if="dots">
			<view class="dot" :class="[current == i ? 'curr-dot' : '']" v-for="(d,i) in list" :key='i'>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			// 轮播图片key
			imgKey: {
				type: String,
				required: true
			},
			// 高度
			height: {
				type: Number,
				default: 200
			},
			// 图片圆角
			imgRadius: {
				type: Number,
				default: 0
			},
			// 图片阴影
			imgShadow: {
				type: Boolean,
				default: false
			},
			// 前边距
			previousMargin: {
				type: Number,
				default: 0
			},
			// 后边距
			nextMargin: {
				type: Number,
				default: 0
			},
			// 图片宽度
			imgWidth: {
				type: String,
				default: '100%'
			},
			// 是否循环
			loop: {
				type: Boolean,
				default: false
			},
			// 自动播放
			autoplay: {
				type: Boolean,
				default: false
			},
			// 播放时间间隔
			interval: {
				type: Number,
				default: 2000
			},
			// 滑动速度
			duration: {
				type: Number,
				default: 600
			},
			// 显示指示点
			dots: {
				type: Boolean,
				default: false
			},
			// 轮播点下边距
			bottom: {
				type: Number,
				default: 10
			},
			// 卡片特效
			crown: {
				type: Boolean,
				default: false
			},
			slots: {
				type: Boolean,
				default: false
			},
			swcurrent: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				current: 0,
				// slots: false
			};
		},
		watch: {
			swcurrent(val) {
				this.current = val
				// console.log('swcurrent', val)
			},
			// 判断异步数据源，是否使用插槽自定义样式
			// list: {
			// 	handler(val) {
			// 		console.log(this.$slots)
			// 		if (val.length > 0 && this.$slots.default) {
			// 			this.slots = true
			// 		}
			// 	},
			// 	immediate: true,
			// }
		},
		methods: {
			change(event) {
				// console.log('change', event)
				let current = event.detail.current
				this.current = current
				this.$emit('change', this.list[current])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: relative;

		.crown {
			transform: scale(0.93, 0.85);
		}

		.item {
			height: 100%;
			transition: 1.2s;
		}

		.item-img {
			width: 100%;
			height: 100%;
		}

		.imgShadow {
			height: calc(100% - 10px);
			margin-bottom: 10px;
			box-shadow: 0 6px 6px rgba(0, 0, 0, .15);
		}

		.crown-active {
			transform: scale(1);
		}

		.dots {
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);

			.dot {
				width: 6rpx;
				height: 6rpx;
				border-radius: 50%;
				background-color: #D6D6D6;
				margin-right: 8rpx;
			}

			.curr-dot {
				height: 6rpx;
				width: 22rpx;
				border-radius: 6rpx;
				background-color: #fff;
			}
		}

	}
	.imgc {
		height: 360rpx;
	}
	.p34 {
		padding: 30rpx 40rpx;
	}
	.rdj {
		padding: 6rpx 16rpx;
		border-radius: 30rpx;
		border-color: #fff;
	}
</style>
