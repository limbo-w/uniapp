<template>
	<view class="bf mh100">
		<view class="yytop t-c" style="border-bottom: 24rpx solid #F6F6F6;">
			<view>可用{{system.custom.balance}}</view>
			<view class="wei f60 mb30" :style="{color:tColor}"><text class="f24 mr10">{{sl}}</text>{{user.balance}}</view>
			<view v-if="recharge.open == 1" @click="go({url:'index'})" class="ma ljcz f-c cf" :style="{background:tColor}">立即充值</view>
		</view>
		<view class="p21 mt30">
			<mg-cell @tab="go({url:'smzf'})" cname="p43 c0" last='1' arrow='1' btt='扫码支付' bttc='f30' ftc="f28" acolor="#9F9F9F">
				<view slot='ft' style="color: #C8CACD;" class="f24 wei mr20">可使用钱包直接支付</view>
			</mg-cell>
			<mg-cell @tab="go({url:'yemx'})" cname="p43 c0" last='1' arrow='1' btt='消费记录' bttc='f30' ftc="f28">
			</mg-cell>
			<mg-cell @tab='cjwt' cname="p43 c0" last='1' arrow='1' btt='储值说明' bttc='f30' ftc="f28">
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
		name: 'yesy',
		components: {},
		data() {
			return {

			}
		},
		onLoad(options) {
			this.getSystem().then(() => {
				this.util.setNT(this.system.custom.balance)
			})
			this.getLoginInfo()
			this.getConfig({
				key: 'recharge',
				api: 'config',
				params: {
					ident: 'recharge'
				}
			})
		},
		computed: {
			...mapState({
				recharge: state => state.config.recharge,
			}),
		},
		methods: {
			...mapActions(['getConfig']),
			cjwt() {
				this.go({
					t: 1,
					url: `/yb_wm/my/other/gywm?t=储值说明&p=5`
				})
			},
		},
	}
</script>
<style scoped lang="scss">
	.yytop {
		padding: 40rpx;
	}

	.ljcz {
		width: 322rpx;
		height: 80rpx;
	}
</style>
