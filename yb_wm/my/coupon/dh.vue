<template>
	<view class="pt30">
		<view class="p23 f-y-c bf hlt hlb">
			<input class="f-1 mr30 srk f30" v-model.trim="dhm" placeholder="请输入兑换码" />
			<text @tap="cleanKey" class="iconfont iconyx f42" style="color: #CBCBCB;"></text>
		</view>
		<view @click="go({url:'/yb_wm/order/coupon-bag/gmjl'})" class="f-c c9 f24 p23">
			<view>购买记录</view>
			<text class="iconfont iconright f28"></text>
		</view>
		<view class="foot-btnc">
			<button @click="dhcx" :loading="loading" class="foot-btn f30 bf" :style="{background:!dhm?'#999':tColor}">{{'立即兑换'}}</button>
		</view>
		<mg-modal :ismr="true" v-model="showyhq" width="630rpx" :z-index="3000">
			<view class="bf bs30">
				<view class="p3">
					<view class="t-c f32 mb20 c6">查询结果</view>
					<view class="p2">兑换码名称：{{dhmInfo.name}}</view>
					<view class="f-y-c p2" v-for="(v,i) in dhmInfo.couponArr">
						<view class="f-1 mr30">{{v.name}}</view>
						<view>x1</view>
					</view>
				</view>
				<view class="hlt f-row wei" style="height: 100rpx;">
					<button hover-class='be' class="tcbtn f-1 bf f-c f32" @click="showyhq=false">取消</button>
					<button :loading="dhloading" hover-class='be' class="tcbtn f-1 bf f-c f32" @click="save" :style="{color:tColor}">立即兑换</button>
				</view>
			</view>
		</mg-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgModal from '@/components/common/modal.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'coupon-dh',
		components: {
			mgModal
		},
		data() {
			return {
				dhm: '',
				loading: false,
				showyhq: false,
				dhloading: false,
				dhmInfo: {},
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('兑换卡券')
		},
		computed: {},
		methods: {
			cleanKey() {
				this.dhm = ''
			},
			async dhcx() {
				if (!this.dhm.trim()) return this.util.message('请输入兑换码', 3)
				// console.log(this.params)
				// return
				this.loading = true
				let res = await this.util.request({
					'url': this.api.dhm,
					mask: 1,
					data: {
						code: this.dhm
					},
				})
				if (!res) {
					this.loading = false
				} else {
					this.loading = false
					this.showyhq = true
					this.dhmInfo = res.data
				}
			},
			async save() {
				try {
					await this.util.modal('您确认兑换吗？')
				} catch (e) {
					return
				}
				this.dhloading = true
				let res = await this.util.request({
					'url': this.api.dhm,
					method: 'POST',
					mask: 1,
					data: {
						code: this.dhmInfo.code
					},
				})
				if (res) {
					this.util.message('兑换成功', 1)
					utils.stfn(() => {
						this.dhloading = this.showyhq = false
						this.go({
							t: 4,
							url: '/yb_wm/my/coupon/my'
						})
					}, 900)
				} else {
					this.dhloading = false
				}
			}
		},
	}
</script>
<style scoped lang="scss">
	.srk {
		height: 2rem;
	}
</style>
