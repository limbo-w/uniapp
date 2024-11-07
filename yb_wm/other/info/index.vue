<template>
	<view class="mh100 pb115">
		<view @click="go({url:'/yb_wm/other/info/detail?id='+v.id})" class="weui-cell f-sh" v-for="(v,i) in dataList" :key='i'>
			<view class="f-1 f-y-bt">
				<view>
					<view class="f26 t-o-e">{{v.title}}</view>
					<view v-if="v.introduction" class="f24 t-o-e c9">{{v.introduction}}</view>
				</view>
				<view class="c9 f24 l-n">{{timeToDate(v.createdAt,'MM月dd日')}}</view>
			</view>
			<view class="img ml30 bs10">
				<mg-img :src="v.icon"></mg-img>
			</view>
		</view>
		<jzz bgcolor="transparent" imgn="zwjf" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		utilMixins,
		sljz
	} from "@/common/util-mixins.js"
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'myIntegral',
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
		async onLoad() {
			this.getSystem().then(() => {
				this.util.setNT(this.system.custom.informationTitle)
			})
			// await this.getLoginInfo()
			this.getList()
		},
		mixins: [utilMixins, sljz],
		computed: {},
		methods: {
			async getList() {
				//获取记录列表
				let {
					data
				} = await this.util.request({
					'url': this.api.zxlb,
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
		},
		onShareAppMessage() {
			return this.util.mpShare({
				t: '进来看看' + this.system.custom.informationTitle,
			})
		},
		onShareTimeline(e) {
			return {
				title: '进来看看' + this.system.custom.informationTitle,
			}
		},
	}
</script>

<style scoped lang="scss">
	.img {
		width: 178rpx;
		height: 123rpx;
	}
</style>
