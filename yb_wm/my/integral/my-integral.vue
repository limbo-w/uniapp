<template>
	<view class="mh100 pb130" v-if="jfName">
		<view class="bf">
			<view class="f-c-c p30">
				<view class="f28">当前{{jfName}}</view>
				<view class="f56 cf7 wei">{{integral}}</view>
			</view>
			<view class="f-x-bt">
				<view class="f-c p3" @click='integralMall'>
					<text class="iconfont iconjfsc mr10 cf7 f34"></text>
					<text>{{jfName}}商城</text>
				</view>
				<view class="f-c p3" @click='integralRule'>
					<text class="iconfont iconjfgz mr10 cf7 f34"></text>
					<text>{{jfName}}规则</text>
				</view>
			</view>
		</view>
		<view class="bf mt30">
			<view class="f32 wei p3 bor-b">{{jfName}}记录</view>
			<view class='p3 bf bor-b' v-for="(v,i) in dataList" :key="i">
				<view class="f-x-bt">
					<view class='t-o-e f28'>{{v.note}}</view>
					<view class="cf7 f28"><text v-if="v.type=='1'">+</text><text v-else if="v.type=='2'">-</text>{{v.integral}}</view>
				</view>
				<view class="f-x-bt">
					<view class='c9 f24 m10'>{{v.createdAt}}</view>
				</view>
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
				integral: '0',
			}
		},
		async onLoad() {
			this.getSystem().then(() => {
				this.util.setNT('我的' + this.jfName)
			})
			await this.getLoginInfo()
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
					'url': this.api.jfmx,
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
					url: `/yb_wm/my/other/gywm?t=${this.jfName}规则&p=8`
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.bor-b {
		border-bottom: 1px solid #EFF3F6;
	}
</style>
