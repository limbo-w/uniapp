<template>
	<view @click="goTo" class="search" :style="{ background: `${co.colorBg}` }">
		<view class="searchbd" :class="{'f-c':co.wordStatus=='center'}" :style="{
				margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`,
				borderRadius: `${co.circle}${u}`,
				background: `${co.colorInput}`,
			}">
			<text class="iconfont iconsearch mr10" :style="{ color: `${co.colorWord}` }"></text>
			<text class="f24" :style="{ color: `${co.colorWord}` }">{{co.text}}</text>
			<!-- <input class="weui-input f-1 f24" :style="{ color: `${co.colorWord}` }" type="text" value="" v-model="co.text" /> -->
		</view>
	</view>
</template>
<script>
	export default {
		name: 'search',
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
		},
		data() {
			return {}
		},
		methods: {
			goTo() {
				this.go({
					url: '/yb_wm/shop/search/out?page=shopdl'
				})
			},
		},
	};
</script>
<style lang="scss" scoped>
	.search {
		padding: 25rpx;

		.searchbd {
			height: 68rpx;
			border-radius: 20rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
		}

		.weui-input {
			height: 100%;
			line-height: 68rpx;
		}
	}
</style>
