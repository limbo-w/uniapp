<template>
	<view class="notice" :style="{
			marginTop: co.marginTop + u,
			marginBottom: co.marginBottom + u,
			marginLeft: co.marginLR + u,
			marginRight: co.marginLR + u,
		}">
		<view class="f-y-c p02" :style="{ background: co.colorBg, borderRadius: co.circle+u }">
			<view class="f-g-0">
				<view v-if="co.title" class="ggbt wei mr20" :style="{color:co.color}">{{co.title}}</view>
				<block v-else>
					<view v-if="co.hand[0].img" class="limg mr20">
						<mg-img m='aspectFit' :src='co.hand[0].img' />
					</view>
					<text v-else class="iconfont icongg mt0 f38 mr10"></text>
				</block>
			</view>
			<view class="f-g-1 ngr b-s1 bs10" :style="{height:notice?'70rpx':''}">
				<uni-notice-bar v-if="type==1&&notice" :scrollable="true" :single="true" :color="ptype==1?co.colorWord:co.hand[0].img?tColor:'#8B5C42'"
				 :background-color="co.backgroundColor" :text="notice" />
				<swiper v-else class="wh" circular="true" vertical="true" :autoplay="true" interval="2000">
					<block v-for="(v,i) in nlist" :key='i'>
						<swiper-item @click.stop="goDl(v)" class='f-c-xc'>
							<!-- <rich-text class='w100 c6 f24 t-o-e' :nodes="v.title"></rich-text> -->
							<view class='c6 f24 t-o-e' :style="{color:co.colorWord}">{{v.title}}</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<text v-if="arrow&&!notice" class="iconfont iconright" :style="{color:co.colorWord}"></text>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniNoticeBar from '@/components/third/uni-notice-bar.vue'
	export default {
		name: 'searchBox',
		components: {
			uniNoticeBar
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			shopinfo: {
				type: Object,
				default: function() {
					return {}
				}
			},
			u: {
				type: String,
				default: 'px'
			},
			ptype: {
				type: String,
				default: '1' //1首页2商家主页3会员
			},
			type: {
				type: String,
				default: '1'
			},
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			color: {
				type: String,
				default: ''
			},
			arrow: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				notice: '',
				nlist: [],
			}
		},
		watch: {
			shopinfo: {
				async handler(newVal) {
					if (newVal.id && this.co.source == 2) {
						let {
							data
						} = await this.util.request({
							'url': this.api.ptgg,
							data: {
								type: this.co.source,
								storeId: newVal.id
							}
						})
						this.nlist = data
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		methods: {
			goLink(v) {
				this.goUrl(v.url)
			},
			goDl(v) {
				uni.setStorageSync('fwb', v.body)
				this.go({
					t: 1,
					url: `/yb_wm/my/other/gywm?t=${v.title}&p=4`
				})
			}
		},
		async created() {
			// console.log('notice-group', this.co)
			switch (+this.ptype) {
				case 1:
					if (this.co.source == 1) {
						let {
							data
						} = await this.util.request({
							'url': this.api.ptgg,
							data: {
								type: this.co.source,
							}
						})
						this.nlist = data
					}
					break;
				case 3:
					this.nlist = this.list
					break;
				default:
					break;
			}
		},
	}
</script>

<style scoped lang="scss">
	.ggbt {
		transform: skew(-12deg, 0deg);
		padding: 1rpx 12rpx;
		font-size: 24rpx;
		border-radius: 7rpx;
		background: linear-gradient(to right, #FE8F43, #FD4C44);
	}

	.limg {
		width: 48rpx;
		height: 48rpx;
	}

	.ngr {
		padding: 10rpx 0rpx;
		height: 80rpx;
	}
</style>
