<template>
	<view class="wux-steps" :class="[cname]">
		<block v-for="(v,i) in arr" :key='i'>
			<view class="wux-step" :class="[`wux-step--${direction}`, `wux-step--${i<value?'finish':i==value?'process':''}`]"
			 :style="{width: width}">
				<view class="wux-step__hd">
					<view class="wux-step__icon f-c" :style="{borderColor:i>value?'':color||tColor,background:i==value?color||tColor:'',color:i==value?'#fff':i<value?color||tColor:''}"
					 v-if="i>=value||!icon&&i<value">{{ i + 1 }}</view>
					<view class="wux-step__icon" style="border:none" v-else>
						<text :style="{color:color||tColor}" class="wux-step__thumb iconfont" :class="icon"></text>
					</view>
				</view>
				<view class="wux-step__bd">
					<view class="wux-step__title f28 c3" :class="[tcn]" v-if="v.title">{{v.title}}</view>
					<view class="wux-step__content f24 c9" :class="[ccn]" v-if="v.content">{{v.content}}</view>
				</view>
				<view class="wux-step__ft" v-if="i !== arr.length - 1">
					<view class="wux-step__ftitem" :style="{background:i<value?color||tColor:''}"></view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'steps',
		props: {
			cname: '',
			arr: {
				type: Array,
				default: function() {
	return []
}
			},
			value: {
				type: String,
				default: '',
			},
			direction: {
				type: String,
				default: 'horizontal'
			},
			color: {
				type: String,
				default: ''
			},
			tcn: '',
			ccn: '',
			icon: '',
		},
		data() {
			return {

			}
		},
		computed: {
			width() {
				return this.direction == 'horizontal' ? 100 / this.arr.length + '%' : '100%'
			},
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.wux-steps {
		position: relative;
		width: 100%
	}

	.wux-step {
		font-size: 0;
		position: relative;
		display: inline-block;
		box-sizing: border-box;
		padding: 0 10rpx;
		vertical-align: top
	}

	.wux-step--vertical {
		padding-bottom: 60rpx
	}

	.wux-step--vertical .wux-step__hd {
		float: left
	}

	.wux-step--vertical .wux-step__bd {
		overflow: hidden;
		display: block;
		margin-left: 80rpx;
		margin-top: 0;
		text-align: left;
		clear: inherit
	}

	.wux-step--vertical .wux-step__ft {
		position: absolute;
		left: 38rpx;
		top: 0;
		height: 100%;
		width: 2rpx;
		padding: 60rpx 0 8rpx;
		margin-left: 0
	}

	.wux-step--vertical .wux-step__ft::after {
		width: 2rpx;
		height: 100%
	}

	.wux-step__ft {
		position: absolute;
		left: 50%;
		width: 100%;
		top: 24rpx;
		padding: 0 48rpx;
		margin-left: 6rpx;
		box-sizing: border-box
	}

	.wux-step__ftitem {
		background: #d9d9d9;
		height: 2rpx;
		border-radius: 2rpx;
		width: 100%;
		transition: background .3s;
		position: relative;
		left: -4rpx
	}

	.wux-step__icon {
		box-sizing: border-box;
		font-size: 24rpx;
		width: 48rpx;
		height: 100%;
		border-radius: 50%;
		background: #fff;
		position: relative;
		z-index: 2;
		margin: 0 auto;
		border: #e9eaec solid 2rpx;
		color: #666;
	}

	.wux-step__thumb {
		font-size: 48rpx;
		margin-top: 0;
		display: inline-block;
		vertical-align: baseline;
		overflow: hidden
	}


	.wux-step__hd {
		width: auto;
		height: 48rpx;
		text-align: center;
		box-sizing: border-box
	}

	.wux-step__bd {
		margin-top: 20rpx;
		text-align: center;
		clear: both
	}

	.wux-step__title {}

	.wux-step__content {
		margin-top: 6rpx;
	}
</style>
