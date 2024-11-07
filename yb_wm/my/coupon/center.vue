<template>
	<view class="">
		<view class="fixedtop bf5">
			<!-- <nav-tab xhxjb="#F25F42" iwidth='150rpx' v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab> -->
			<view class="f-c wxts f22 c9">温馨提示：领取成功后请到‘个人中心-优惠券’查看</view>
		</view>
		<view class="ccbd p3">
			<mg-coupon @btntap='btntap(v.id)' :color='tColor' cname='mb30' v-for="(v,i) in dataList" :key='i' :co='v'></mg-coupon>
			<jzz bgcolor="transparent" imgn='zwhb' :nodata="dataList.length==0&&isget" :mygd='mygd' />
		</view>
<!-- 		<view class="hlt f-row wei" style="height: 100rpx;">
			<button hover-class='be' class="tcbtn f-1 bf f-c f32" @click="go({url:'dh'})":style="{color:tColor}">兑换卡券</button>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import jzz from '@/components/common/jzz.vue'
	import {
		sljz
	} from "@/common/util-mixins.js"
	export default {
		name: 'myCoupon',
		components: {
			navTab,
			mgCoupon,
			jzz,
		},
		data() {
			return {
				aIdx: 0,
				params: {
					page: 1,
					size: 10,
					type: 1,
					storeId: '',
				},
			}
		},
		async onLoad(options) {
			this.getSystem().then(() => {
				this.util.setNT(options.storeId ? options.name + '领券中心' : '领券中心')
			})
			await this.getLoginInfo()
			this.params.storeId = options.storeId || ''
			this.aIdx = +options.idx || 0
			this.changeTab(this.aIdx)
			console.log(options)
			this.isLoad = true
		},
		onShow() {
			// console.log(this.isLoad)
			if (this.isLoad) {
				this.changeTab(this.aIdx)
			}
		},
		mixins: [sljz],
		computed: {
			tabs() {
				return [{
					name: '优惠券'||this.system.custom.takeOut,
					type: 1,
				}]
			},
		},
		methods: {
			...mapActions(["getConfig"]),
			refresh() {
				this.changeTab(this.aIdx)
			},
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.type = this.tabs[e].type
				this.dataList = []
				this.getList()
				// console.log(e, this.aIdx)
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.lqzx,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			async btntap(e) {
				if (!await this.checkLogin()) return
				let res = await this.util.request({
					'url': this.api.lqyhq,
					method: 'POST',
					mask: 1,
					data: {
						couponId: e,
					},
				})
				if (res) {
					this.util.message('领取成功', 1)
					setTimeout(() => {
						this.refresh();
					}, 500)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.wxts {
		height: 70rpx;
	}

	.ccbd {
		padding-top: 80rpx;
	}
</style>
