<template>
	<view class="mh100 gflb">
		<view class="p2">
			<mg-cell cname="p0 bs20" bgc='#fff' last="1">
				<view slot='bd'>
					<view class="">
						<view class="posi-r f-c p02">
							<view class="posi-a lIcon">
								<mg-img :src='`${onImgurl}gfhb/left.png`'></mg-img>
							</view>
							<view class="posi-r p3 c3 f-y-c f34">看看大家手气</view>
							<view class="posi-a RIcon">
								<mg-img :src='`${onImgurl}gfhb/right.png`'></mg-img>
							</view>
						</view>
					</view>
					<view>
						<mg-cell v-for="(v,i) in divinfolist" :key="i" cname="p43 f-s c3 weui-cellt posi-r" bgc='#fff'
							:btt="v.userName" bttc="f32">
							<view slot="hd">
								<view class="icon bsf">
									<mg-img :src="v.portrait" cname='imgshape1' />
								</view>
							</view>
							<view slot="bd" class="c6">{{v.createdAt}}</view>
							<view slot="ft" class="c3" :color='tColor'>
								<view class="flex">
									<view class="sqzj mr10" v-if="v.lucky=='1'">
										<mg-img :src='`${onImgurl}gfhb/sqzj4.png`'></mg-img>
									</view>
									<view>{{v.money}}元</view>
								</view>
							</view>
						</mg-cell>
					</view>
				</view>
			</mg-cell>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'

	export default {
		name: 'gflb',
		components: {

		},
		data() {
			return {
				divinfolist: [],
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('瓜分列表')
			this.query = options
			this.getInfolist()
		},
		computed: {},
		methods: {
			async getInfolist() {
				let {
					data
				} = await this.util.request({
					'url': this.api.divlist,
					data: {
						id: this.query.id,
					}
				})
				this.divinfolist = data
				this.showLoading = false
			},
		},
	}
</script>
<style scoped lang="scss">
	.gflb {
		background-color: #FDEECF;
	}

	.icon {
		width: 72rpx;
		height: 72rpx;
		margin: 15rpx 20rpx 0 0;
	}
	
	.lIcon {
		left: 160rpx;
		width: 64rpx;
		height: 52rpx;
	}

	.RIcon {
		right: 160rpx;
		width: 64rpx;
		height: 52rpx;
	}
	.sqzj{
		width: 138rpx;
		height: 41rpx;
	}
</style>
