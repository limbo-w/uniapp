<template>
	<view class="pb130">
		<view class="posi-f w100 t0 czztm bf5">
			<view class="bf">
				<view class="f-c-c p30">
					<view class="f28">当前成长值</view>
					<view class="f56 cf7 wei">{{user.growth}}</view>
				</view>
				<view class="f-x-bt">
					<view class="p03 f-row f22 o-h">
						<view class="vname-l t-c t-o-e">VIP{{user.level}}</view>
						<view class="vname-r t-c t-o-e">{{user.cardName}}</view>
					</view>
					<view class="f-c p3" @click='integralRule'>
						<text class="iconfont iconjfgz mr10 cf7 f34"></text>
						<text>会员权益</text>
					</view>
				</view>
			</view>
			<view class="bf mt30">
				<view class="f32 wei p3 bor-b">成长值记录</view>
			</view>
		</view>
		<view :style="{marginTop: topH+'px'}">
			<view class='p3 bf bor-b' v-for="(v,i) in dataList" :key="i">
				<view class="f-x-bt">
					<view class='t-o-e f28'>{{v.note}}</view>
					<view class="cf7 f28"><text v-if="v.type=='1'">+</text><text v-else if="v.type=='2'">-</text>{{v.growth}}</view>
				</view>
				<view class="f-x-bt">
					<view class='c9 f24 m10'>{{v.createdAt}}</view>
				</view>
			</view>
			<jzz bgcolor="transparent" imgn="zwjf" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		</view>
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
				integral: '0',
				topH: '',
			}
		},
		async onLoad() {
			this.getSystem()
			this.util.setNT('成长值')
			await this.getLoginInfo()
			this.refreshUser({
				nomask: 1,
				get: 1,
				now: 1,
			})
			const query = uni.createSelectorQuery();
			query.select('.czztm').boundingClientRect(data => {
				this.topH = data.height
			}).exec();
			this.integral = this.user.integral
			this.getList()
		},
		mixins: [utilMixins, sljz],
		computed: {
			jfName() {
				return this.system.custom.integral
			},
		},
		methods: {
			async getList() {
				//获取记录列表
				let {
					data
				} = await this.util.request({
					'url': this.api.hykczz,
					mask: 1,
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			integralMall() {
				this.go({
					t: 2,
					url: '/yb_wm/my/integral/shop-index'
				})
			},
			integralRule() {
				this.go({
					t: 1,
					url: `wkk?type=1`
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.vname-l {
		min-width: 120rpx;
		padding: 3rpx 10rpx 3rpx 15rpx;
		border-radius: 50rpx 0 0 50rpx;
		background: linear-gradient(to right, #503215, #55371A);
		color: #FFFADB;
	}

	.vname-r {
		min-width: 120rpx;
		padding: 3rpx 15rpx 3rpx 10rpx;
		border-radius: 0 50rpx 50rpx 0;
		background: linear-gradient(to right, #FFF3A6, #FCD96F);
		color: #7A5D24;
	}

	.bor-b {
		border-bottom: 1px solid #EFF3F6;
	}
</style>
