<template>
	<view class="">
		<view class="fixedtop bf">
			<view class="f-row">
				<view class="f-1">
					<nav-tab color="#ff3a48" :isscroll='true' itw='27%' ncolor='#707070' ifsize="32" :isname="{fontSize:'34rpx',fontWeight:'bold'}"
					 v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
				</view>
				<!-- <view class="f-c p03 f32" @click="go({url:'dh'})">兑换卡券</view> -->
			</view>
			<view class="f-row o-x-s stabsc">
				<view v-for="(v,i) in stabs" @click="sclick(i)" :key='i' class="f-c p03 f30" :style="{color:saIdx==i?'#ff3a48':'#707070'}">{{v.name}}</view>
			</view>
		</view>
		<view class="cmymain p3">
			<mg-coupon @btntap='btntap(v)' ttype='2' :color='tColor' cname='mb30' @operation='operation' v-for="(v,i) in dataList"
			 :key='i' :co='v'></mg-coupon>
			<jzz bgcolor="transparent" imgn='zwhb' :nodata="dataList.length==0&&isget" :mygd='mygd' />
		</view>
		<view class="foot-btnc">
			<button @click="go({url:'dh'})" :disabled="loading" class="tcbtn f-1 bf f-c f32 cf" :style="{background:tColor}">兑换卡券</button>
		</view>
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
				stabs: [{
					name: '未使用',
					type: 1,
				}, {
					name: '已使用',
					type: 2,
				}, {
					name: '已失效',
					type: 3,
				}],
				saIdx: 0,
				params: {
					size: 10,
					page: 1,
					state: 1,
					type: 1,
				},
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('我的卡券')
			await this.getLoginInfo()
			this.aIdx = +options.idx || 0
			this.changeTab(this.aIdx)
			this.isOnLoad = true
		},
		onShow() {
			if (this.isOnLoad) {
				this.refresh();
			}
		},
		mixins: [sljz],
		computed: {
			tabs() {
				return [{
					name: this.system.custom.takeOut,
					type: 1,
				}, {
					name: '到店',
					type: 2,
				}]
			},
		},
		methods: {
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
			sclick(e) {
				this.saIdx = e
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.state = this.stabs[e].type
				this.dataList = []
				this.getList()
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wdyhq,
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
				if (e.storeId > 0) {
					this.go({
						t: 6,
						url: '/yb_wm/index/goods'
					})
				} else {
					this.go({
						t: 6,
						url: '/yb_wm/index/index'
					})
				}
				// console.log(e)
			}
		},
	}
</script>

<style scoped lang="scss">
	.cmymain {
		margin-top: 186rpx;
	}

	.stabsc {
		height: 90rpx;
	}
</style>
