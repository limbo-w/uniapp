<template>
	<view class='bf' :style="{marginTop:`${co.marginTop}${u}`,
		marginBottom:`${co.marginBottom}${u}`,
		marginLeft:`${co.marginLR}${u}`,
		marginRight:`${co.marginLR}${u}`,
		borderRadius:`${co.circle}${u}`}">
		<view :class="'p3'">
			<mg-cell @tab="go({t:1,url:`/yb_wm/order/pl-list?id=${storeInfo.id}&t=${co.title||'评价'}`})" cname="p0" last='1'
			 :btt="co.title||'评价'" bttc='f32 wei' ft="查看更多" ftc='f24 c6' arrow="1" hc='1'></mg-cell>
		</view>
		<view class="bf" v-if="list.length">
			<block v-for="(v,i) in list" :key='i'>
				<gf-evaluate v-if="i<2" :co='v' />
			</block>
		</view>
		<view v-else class="bf p2 t-c">
			<view class="pb20 c9 f-c">
				<text class="iconfont icondjs mr10 f28"></text>
				<text>暂无评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import gfEvaluate from '@/components/goods/gf-evaluate.vue'
	export default {
		name: 'searchBox',
		components: {
			gfEvaluate,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {
						infoTitle: "",
						isBottom: 0,
						reverseTwo: 0,
						topMargin: 0,
					}
				}
			},
			storeInfo: {},
			u: {
				type: String,
				default: 'px'
			},
			color: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				list: [],
			}
		},
		watch: {
			storeInfo: {
				async handler(newVal) {
					if (this.storeInfo.id) {
						let {
							data
						} = await this.util.request({
							'url': this.api.EvaluateList,
							data: {
								storeId: this.storeInfo.id,
								page: 1,
								size: 2,
							}
						})
						this.list = data.list
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		async created() {},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style scoped lang="scss">
	.cartadd {
		width: 40rpx;
		height: 40rpx;
	}

	.goodsc {
		width: 345rpx;
	}

	.goodsimg {
		width: 345rpx;
		height: 345rpx;
	}
</style>
