<template>
	<!-- <mg-cell last='1' :btt="sjxx.storeInfo.name||'商家名称'" bttc='f34' :bbt="sjxx.storeInfo.address">
		<view @click="util.ckWz(sjxx.storeInfo)" slot='ft' class="f-y-c">
			<text :style="{color:tColor}" class="iconfont iconditu f44"></text>
		</view>
	</mg-cell> -->
	<mg-cell @tab="ztshow" last='1' :btt="address&&address.address||'暂无自提地址'" bttc='f34' arrow='1'>
		<view slot='bd' class="mt10 f24">{{desc}}</view>
	</mg-cell>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'get-ztjf',
		props: {
			cname: '',
			address: '',
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState(['sjxx']),
			desc() {
				if (this.address) {
					return `${this.address.name}(${this.address.linkMan}) ${this.address.tel}`
				} else {
					return '请选择地址'
				}
			},
		},
		methods: {
			// goChoose() {
			// 	this.go({
			// 		t: 1,
			// 		url: `../my/address/index?from=1&storeId=${this.sjxx.storeInfo.id}`,
			// 	})
			// }
			ztshow(e) {
				this.$emit('ztshow', {
					g: this.co,
					e
				})
			},
		},
	}
</script>

<style scoped lang="scss">
</style>
