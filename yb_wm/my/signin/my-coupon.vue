<template>
	<view class="mh100">
		<view class="bf">
			<view class="f32 wei p3 hlb">优惠券列表</view>
			<view class='p3 bf hlb' v-for="(v,i) in dataList" :key="i">
				<view class="f-x-bt">
					<view class='t-o-e f28'>{{v.couponName}}</view>
					<view class="wei cf5">
						<block v-if="v.type==1">
							<text>{{sl}}</text><text class="f48 ml5">{{Number(v.money)}}</text>
						</block>
						<block v-else-if="v.type==2">
							<text class="f48">{{Number(v.discount)}}</text><text class="ml5">折</text>
						</block>
					</view>
				</view>
				<view class="f-x-bt">
					<view class='c9 f24 m10'>{{v.useExplain}}</view>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" imgn="zwcz" :nodata="dataList.length==0&&isget" :mygd='mygd' />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		utilMixins,
		sljz,
	} from "@/common/util-mixins.js"
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'mySignin',
		components: {
			jzz,
		},
		data() {
			return {
				params: {
					page: 1,
					size: 10,
					receiveType: 2,
				},
			}
		},
		onLoad() {
			this.getSystem()
			this.util.setNT('我的优惠券')
			this.getList()
		},
		mixins: [utilMixins, sljz],
		computed: {},
		methods: {
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wdyhq,
					mask: 1,
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
</style>
