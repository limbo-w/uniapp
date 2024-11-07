<template>
	<mg-cell bgc="transparent" @tab="goChoose" last='1' :acolor="color">
		<view class="f34" slot='bd' :style="{color:color}">
			<view class="f-y-c">
				<view class="t-o-e" :style="{maxWidth: mw+'rpx'}">{{address&&address.address+address.details||'暂无地址'}}</view>
				<text class="iconfont iconright c6"></text>
			</view>
			<view class="mt10 f24">{{desc}}</view>
		</view>
	</mg-cell>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'get-address',
		props: {
			cname: '',
			address: '',
			ptype: {
				type: String,
				default: '1',
			},
			color: {
				type: String,
				default: '#333',
			},
			mw: {
				type: String,
				default: '360',
			},
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState(['sjxx']),
			desc() {
				if (this.address) {
					return `${this.address.userName}(${this.address.sex}) ${this.address.userTel}`
				} else {
					return '请选择地址'
				}
			},
		},
		methods: {
			goChoose() {
				if (this.ptype == '1') {
					this.go({
						t: 1,
						url: `/yb_wm/my/address/index?from=1&storeId=${this.sjxx.shopData.id}`,
					})
				} else if (this.ptype == '2') {
					this.go({
						t: 1,
						url: `/yb_wm/my/address/index?from=5`,
					})
				}

			}
		},
	}
</script>

<style scoped lang="scss">
</style>
