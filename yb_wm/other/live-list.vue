<template>
	<view class="pb115">
		<view class="f-raw zbl f-bt">
			<view @click="goDl(v)" v-for="(v,i) in dataList" :key='i' class="zbc p-r b-s-3 bs15 mb20">
				<view class="zbfm bs15 p-r">
					<mg-img :src="v.cover_img"></mg-img>
					<view class="p-a udlr zban bsf f-c">
						<text class="iconfont iconsxxx cf f56 ml10" style="transform: rotate(-90deg);"></text>
					</view>
				</view>
				<view class="p23 bf">
					<view class="t-o-e l-n">{{v.name}}</view>
					<view class="f-y-c mt10">
						<view class="zbtx bsf mr10">
							<mg-img :src="v.cover_img"></mg-img>
						</view>
						<view class="f24 c9 f-1 t-o-e">{{v.anchor_name}}</view>
					</view>
				</view>
				<view class="p-a l0 t0 zbzt f-y-c cf f24">
					<view class="yd bsf bf mr10"></view>
					<view>{{ls(v)}}</view>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		sljz
	} from "@/common/util-mixins.js"
	import jzz from '@/components/common/jzz.vue'
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
			this.getSystem().then(() => {
				this.util.setNT(this.system.custom.live)
			})
			this.getList()
			this.getLayout()
		},
		mixins: [sljz],
		computed: {},
		methods: {
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.zblb,
					method: 'POST',
					data: this.params,
				})
				if (data) {
					this.dataList = this.dataList.concat(data)
					this.isget = true
					this.mygd = this.params.size > data.length
					this.params.page++
				} else {
					this.isget = this.mygd = true
				}
			},
			ls(v) {
				let t = ''
				switch (v.live_status) {
					case 101:
						t = '直播中'
						break;
					case 102:
						t = '未开始'
						break;
					case 103:
						t = '已结束'
						break;
					case 104:
						t = '禁播'
						break;
					case 105:
						t = '暂停中'
						break;
					case 106:
						t = '异常'
						break;
					case 107:
						t = '已过期'
						break;
				}
				return t
			},
			goDl(v) {
				uni.navigateTo({
					url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${v.roomid}`
				})
			},
			onShareAppMessage() {
				return {
					title: '邀你一起看直播！',
				}
			},
			onShareTimeline(e) {
				return {
					title: '邀你一起看直播！',
					imageUrl: this.getImgS(this.system.shareIcon),
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	.zbl {
		padding: 20rpx 20rpx 0;
	}

	.zbc {
		width: 345rpx;
	}

	.zbfm {
		height: 345rpx;
	}

	.zbtx {
		width: 46rpx;
		height: 46rpx;
	}

	.zbzt {
		width: 140rpx;
		padding: 15rpx 0 15rpx 20rpx;
		background: rgba(109, 109, 109, 0.9);
		border-radius: 0 60rpx 60rpx 0;

		.yd {
			width: 15rpx;
			height: 15rpx;
		}
	}

	.zban {
		width: 100rpx;
		height: 100rpx;
		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
