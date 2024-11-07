<template>
	<view class="">
		<view class="bf">
			<view class='p3 hlb f-row' v-for="(v,i) in dataList" :key="i">
				<view class="glimg mr30 bs10">
					<mg-img :src="v.bagIcon"></mg-img>
				</view>
				<view class="f-1">
					<view class="f-x-bt">
						<view class='t-o-e f28'>{{v.bagName}}</view>
						<view class="cf7 f28">{{sl+v.money}}</view>
					</view>
					<view class="f-x-bt c9 f24 mt10">
						<view>{{v.createdAt}}</view>
						<view>{{v.payModeName}}</view>
					</view>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import jzz from '@/components/common/jzz.vue'
	import {
		sljz
	} from "@/common/util-mixins.js"
	export default {
		name: 'order-index',
		components: {
			jzz,
		},
		data() {
			return {
				params: {
					page: 1,
					size: 10,
				},
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('券包购买记录')
			this.getList()
		},
		mixins: [sljz],
		computed: {},
		methods: {
			async getList() {
				try {
					let {
						data
					} = await this.util.request({
						'url': this.api.qbgmjl,
						data: this.params,
					})
					// console.log('签到明细', data)
					this.dataList = this.dataList.concat(data)
					this.isget = true
					this.mygd = this.params.size > data.length
					this.params.page++
				} catch (e) {
					//TODO handle the exception
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	.glimg {
		width: 100rpx;
		height: 100rpx;
	}
</style>
