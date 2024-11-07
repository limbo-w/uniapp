<template>
	<view class="bf p23">
		<block v-if="co.id">
			<view class="f40 wei">{{co.title}}</view>
			<view class="p20 c9 f-raw f24">
				<view v-if="co.storeName" class="yc bs5 c9 f22 mr20">{{co.storeName}}</view>
				<view class="mr20">{{getTime(co.createdAt)}}</view>
				<view class="t-o-e mr20">浏览量:{{co.views}}</view>
			</view>
			<view class="mt15">
				<mg-rtext type='2' :content="co.body" />
			</view>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import jzz from '@/components/common/jzz.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'order-index',
		components: {
			jzz,
			mgRtext,
		},
		data() {
			return {
				co: {}
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('资讯详情')
			this.id = options.id
			this.getData()
		},
		computed: {},
		methods: {
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.zxxq,
					data: {
						id: this.id,
					},
				})
				this.co = data
			},
			getTime(v) {
				return utils.settime(v)
			}
		},
		onShareAppMessage() {
			return this.util.mpShare({
				t: this.co.title,
				i: this.getImgS(this.co.icon),
			})
		},
		onShareTimeline(e) {
			// console.log("点击分享pyq", e)
			return {
				title: this.co.title,
				imageUrl: this.getImgS(this.co.icon),
			}
		},
	}
</script>
<style scoped lang="scss">
	.yc {
		padding: 3rpx 10rpx;
		background: #F0F0F0;
	}
</style>
