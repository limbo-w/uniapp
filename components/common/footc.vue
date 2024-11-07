<template>
	<view class="bfooter f-c-c c9 f26 t-c" v-if="system && system.copyright">
		<view @click="false&&util.makeTel(system.tel)" class="f-c">
			<!-- <view v-if='system.icon' class="footimg mr20">
				<mg-img :src="system.icon"></mg-img>
			</view> -->
			<view v-if="system.copyright.support" class="">{{system.copyright.support}}</view>
		</view>
		<!-- <view class="mt10 f24">{{system.copyright}}</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'footc',
		props: {
			bottom: {
				type: String,
				default: ''
			},
		},
		data() {
			return {

			}
		},
	}
</script>

<style scoped lang='scss'>
	.bfooter {
		padding: 20rpx 20rpx 20rpx;
	}

	.footimg {
		width: 40rpx;
		height: 40rpx;
	}
</style>
