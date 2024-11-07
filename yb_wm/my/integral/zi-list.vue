<template>
	<view>
		<mg-modal :ismr="true" v-model="showGg" width="90%" :z-index="2000">
			<view class="ggc p20 bf posi-r bs20">
				<scroll-view scroll-y class="ggb">
					<view class="p23">
						<block v-for='(v,i) in co' :key='i'>
							<view @click="chooseAdd(v)" class="bf bs20 p23 mb20 f-row">
								<view class="f-g-1">
									<view class="f-row">
										<view style="max-width: 80%;" class="f32 mr10 t-o-e">{{v.address}}</view>
									</view>
									<view class="f-row f24 c6 mt15">
										<text class="mr20">{{v.name}}</text>
										<text class="">({{v.linkMan}})</text>
										<text class="">{{v.tel}}</text>
									</view>
								</view>
								<view class="f-g-0">ID:{{v.id}}</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</mg-modal>
	</view>
</template>

<script>
	import mgModal from '@/components/common/modal.vue'
	export default {
		name: 'popup',
		components: {
			mgModal,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {

					}
				}
			},
			cname: {
				type: String,
				default: ''
			},
			value: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '70%'
			},
			zindex: {
				type: Number,
				default: 999
			},
			outin: {
				type: String,
				default: '1'
			},
			storeid: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				loading: false,
				//goodsInfo: {},
			}
		},
		methods: {
			async chooseAdd(e) {
				this.showGg = false
				this.$emit('chooseAdd', e)
			},
		},
		computed: {
			showGg: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},

		},
	}
</script>

<style scoped lang="scss">
	.ggc {
		height: 72vh;

		.ggx {
			top: 20rpx;
			right: 20rpx;
		}

		.ggh {
			height: 10vh;
		}

		.ggb {
			height: 100%;

			.specv {
				min-width: 185rpx;
				padding: 0 30rpx;
				height: 70rpx;
				border-radius: 8rpx;
				text-align: center;
				line-height: 70rpx;
				background: #EFF3F6;
				margin: 0 20rpx 20rpx 0;
			}
		}

		.ggf {
			height: 19vh;
		}
	}
</style>
