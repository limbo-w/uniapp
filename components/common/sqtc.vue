<template>
	<mg-popup v-model="showSq" position="middle">
		<view class="bf t-c p3 bs30" style="width: 540rpx;">
			<view class="p03 f30 wei">温馨提示</view>
			<view class="m30">为了您更好的使用，您可以设置相关授权信息后，重新打开小程序体验</view>
			<view class="p03 f-x-bt">
				<button class="rbtn" @tap="showSq=false">不设置</button>
				<button class="rbtn cf" :style="{background: tColor}" @tap="qsz">去设置</button>
			</view>
		</view>
	</mg-popup>
</template>

<script>
	import mgPopup from '@/components/common/popup.vue'
	export default {
		name: 'popup',
		components: {
			mgPopup,
		},
		props: {
			name: {
				type: String,
				default: ''
			},
			value: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {}
		},
		methods: {
			qsz() {
				uni.openSetting({
					success: (res) => {
						this.showSq = false
						// if (res.authSetting && res.authSetting['scope.userLocation']) {
						// 	this.doGetLocation();
						// }
					},
					fail: (err) => {}
				})
			},
		},
		computed: {
			showSq: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
</style>
