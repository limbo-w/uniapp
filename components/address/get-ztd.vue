<template>
	<mg-cell bgc="transparent" isr='1'>
		<view class="f34" slot='bd'>
			<view @click="ckwz" class="f-y-c">
				<view class="t-o-e" style="max-width: 360rpx;">{{sjxx.shopData.name||'商家名称'}}</view>
				<!-- <text class="iconfont iconright c6"></text> -->
			</view>
			<view class="mt15 f24 f-y-c">
				<text class="iconfont iconlocation mr10 f28"></text>
				<view class="f24 c9">您距离当前门店{{storeInfo.distance}}，请确认下单门店是否正确</view>
			</view>
		</view>
	</mg-cell>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'get-ztd',
		props: {
			cname: '',
			address: '',
			sjxx: Object,
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				storeInfo: state => state.config.storeInfo,
			}),
			desc() {
				if (this.address) {
					return `${this.address.userName}(${this.address.sex}) ${this.address.userTel}`
				} else {
					return '请选择地址'
				}
			},
		},
		methods: {
			ckwz() {
				this.util.ckWz({
					lat: this.sjxx.moreSet.lat,
					lng: this.sjxx.moreSet.lng,
					name: this.sjxx.shopData.name,
					address: this.sjxx.moreSet.address,
				})
			},
		},
	}
</script>

<style scoped lang="scss">
</style>
