<template>
	<view class="mh100">
		<nav-tab cname="fixedtop" v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<view class="mt90">
			<view class="f26 c9 t-c">
				<view v-show="aIdx==0" class="p2">我的{{system.custom.balance}}：{{sl+user.balance}}<text class="ml50">累计支出：{{sl+(info.expenditure||0)}}</text></view>
				<view v-show="aIdx==1" class="p2">累计充值：{{sl+(info.money||0)}}<text class="ml50">累计赠送：{{sl+(info.giveMoney||0)}}</text></view>
			</view>
			<block v-for="(v,i) in dataList" :key='i'>
				<mg-cell cname="p43 f-s" isr="1" :btt="v.note" bttc="f32" :bbt="v.createdAt" :ft="v.type==1?'+'+ v.money:'-'+v.money"></mg-cell>
			</block>
		</view>
		<jzz bgcolor="transparent" imgn="zwye" :nodata="dataList.length==0&&isget" :mygd='mygd' />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	import {
		utilMixins,
		sljz
	} from "@/common/util-mixins.js"
	export default {
		name: 'yemx',
		components: {
			navTab,
			jzz,
		},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '支出',
				}, {
					name: '收入',
				}],
				params: {
					page: 1,
					size: 10,
					type: 2,
				},
				info: {},
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT(this.system.custom.balance + '明细')
			this.aIdx = options.idx || 0
			this.changeTab(this.aIdx)
		},
		mixins: [utilMixins, sljz],
		computed: {},
		methods: {
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				let type = ''
				switch (e) {
					case 0:
						type = '2';
						break;
					case 1:
						type = '1';
						break;
				}
				this.params.type = type
				this.dataList = []
				this.getList()
				// console.log(e, this.aIdx)
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.yemx,
					data: this.params,
				})
				this.dataList = this.dataList.concat(data.list)
				this.info = data
				this.isget = true
				this.mygd = this.params.size > data.list.length
				this.params.page++
			},
		},
	}
</script>
<style scoped lang="scss">
	.mt120 {
		margin-top: 120rpx
	}

	.p43 {
		padding: 40rpx 30rpx;
	}
</style>
