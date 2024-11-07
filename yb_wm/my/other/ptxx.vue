<template>
	<view class="mh100">
		<view class="gyhead posi-r">
			<view class="wh" :style="{background:tColor}"></view>
			<view class="posi-a t270 wh">
				<view class="m03">
					<view class="bf mb20 bs20 p3 minhe">
						<view class="iconwidth bs10">
							<mg-img :src="system.icon"></mg-img>
						</view>
						<view class="f-c c0 f32 mt90 f26 c3">{{system.name}}</view>
						<view class="f28 c6 mt30">
							<mg-rtext type='2' :content="system.introduction" />
						</view>
					</view>
					<!-- <view class="bf mb30 bs20 p20">
						<mg-cell last="1" cname="p23" btt='当前版本' bttc="c3" ft="1.33.45" />
						<mg-cell last="1" cname="p20 m03 b-t-e" btt='个人ID' bttc="c3" ft="85" />
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	export default {
		name: 'gywm',
		components: {
			mgRtext,
		},
		data() {
			return {
				loading: false,
				content: '',
				systemData: '',
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('关于我们')
			console.log(this.system)
		},
		computed: {
			...mapState(['vipConfig'])
		},
		methods: {},
	}
</script>
<style scoped lang="scss">
	.gyhead {
		width: 100%;
		height: 300rpx;
	}

	.t270 {
		top: 100rpx;
	}

	.iconwidth {
		width: 120rpx;
		height: 120rpx;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		//margin-top: -90rpx;
	}

	.minhe {
		min-height: 800rpx;
		margin-top: 60rpx;
	}
</style>
