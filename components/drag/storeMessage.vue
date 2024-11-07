<template>
	<view class='' :style="{margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`}">
		<view class='f-row o-x-s p0'>
			<block v-for="(v,i) in storelist" :key='i'>
				<view v-if="i<10" @click="" class='f-g-0 w-210 mr20 p2 bs10 bf'>
					<view class='imgc bsf'>
						<mg-img />
					</view>
					<view class='mt10'>
						<view class='t-o-e'>{{'XXXXXXxxxxxx'||v.name}}</view>
						<view class="mt10 f24 c6 f-row">
							<text class="iconfont icondw c3 mr10 f28"></text>
							<text class='f22'>{{'xxx'||v.distance}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'storeMessage',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			storeInfo: {},
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			u: {
				type: String,
				default: 'px'
			},
		},
		data() {
			return {}
		},
		computed: {
			storelist() {
				// console.log(this.list)
				return [1, 2, 3, 4, 5] || this.list
			},
		},
		methods: {
			async goTo(v) {
				// console.log(v)
				if (v.isOpen != 1) {
					try {
						await this.util.modal(`[${v.name}] 休息中 确认切换到该门店吗？`)
						this.$emit('change-store', v)
					} catch (e) {}
				} else {
					try {
						await this.util.modal('您当前所在位置距离该门店较远 确认切换到该门店吗？')
						this.$emit('change-store', v)
					} catch (e) {}
				}
			}
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.b-s {
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(221, 221, 221, 0.6);
	}

	.imgc {
		width: 160rpx;
		height: 160rpx;
	}

	.w-210 {
		width: 210rpx;
	}
</style>
