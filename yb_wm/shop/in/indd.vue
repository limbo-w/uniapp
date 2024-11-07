<template>
	<view class="">
		<view class="fixedtop bf5">
			<nav-tab v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
			<!-- <view class="f-c wxts f22 c9">温馨提示：领取成功后请到‘个人中心-优惠券’查看</view> -->
		</view>
		<view class="ccbd p3">
			<dn-order @refresh='dnrefresh' :ltop='0' v-model='laIdx' :labelarr='[]' :otype="1" :datalist="dataList"></dn-order>
			<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' otext='暂无店内订单' />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import dnOrder from '@/yb_wm/index/components/dn-order.vue'
	import jzz from '@/components/common/jzz.vue'
	import {
		sljz
	} from "@/common/util-mixins.js"
	export default {
		name: 'myCoupon',
		components: {
			navTab,
			dnOrder,
			jzz,
		},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '全部',
					s: '',
				}, {
					name: '待付款',
					s: '1',
				}, {
					name: '已支付',
					s: '2',
				}, {
					name: '已关闭',
					s: '3',
				}],
				params: {
					page: 1,
					size: 10,
					state: 1,
				},
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('堂食订单')
			await this.getLoginInfo()
			this.aIdx = +options.idx || 0
			this.changeTab(this.aIdx)
			this.isLoad = true
		},
		onShow() {
			if (this.isLoad) {
				this.changeTab(this.aIdx)
			}
		},
		mixins: [sljz],
		computed: {},
		methods: {
			...mapActions(["getConfig"]),
			dnrefresh(e) {
				this.refresh();
			},
			refresh() {
				this.changeTab(this.aIdx)
			},
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.state = this.tabs[e].s
				this.dataList = []
				this.getList()
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.tsdd,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
		},
	}
</script>

<style scoped lang="scss">
	.wxts {
		height: 70rpx;
	}

	.ccbd {
		margin-top: 96rpx;
	}
</style>
