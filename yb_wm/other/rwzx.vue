<template>
	<view class="h100 p03">
		<view class="rwimg p-f l0 wh">
			<mg-img :src="system.shareIcon"></mg-img>
		</view>
		<view class="p-r">
			<view class="rwtop t-c">
				<view class="cf">我的成长值</view>
				<view class="f60 cf">60</view>
			</view>
			<view class="bs20 b-s bf mb30">
				<view class="p3 wei f30">基础任务</view>
				<view class="cell" v-for="(v,i) in arr" :key='i'>
					<mg-cell last="1" cname="p253" img='https://bkycms.com/addons/yb_wm/web/static/yb_wm/36/2020/09/16/202009161334184075.png'
					 w='90' h='90' imgr="40" :btt='v.b' bttc="c0" :bbt="v.t">
						<view slot='ft' class="qwc ml20 cf">去完成</view>
					</mg-cell>
				</view>
			</view>
			<view class="bs20 b-s bf mb30">
				<view class="p3 wei f30">购物任务</view>
				<view class="cell" v-for="(v,i) in arr2" :key='i'>
					<mg-cell last="1" cname="p253" img='https://bkycms.com/addons/yb_wm/web/static/yb_wm/36/2020/09/16/202009161334184075.png'
					 w='90' h='90' imgr="40" :btt='v.b' bttc="c0" :bbt="v.t">
						<view slot='ft' class="qwc ml20 cf">去完成</view>
					</mg-cell>
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
	export default {
		name: 'rwzx',
		components: {},
		data() {
			return {
				arr: [{
					b: '完善信息',
					t: '+1成长值',
				}, {
					b: '绑定手机号',
					t: '+1成长值',
				}, {
					b: '收藏小程序',
					t: '+10成长值',
				}, {
					b: '每日签到',
					t: '+2成长值',
				}],
				arr2: [{
					b: '购买商品',
					t: '每消费1元，获得1成长值',
				}, {
					b: '订单评价',
					t: '每完成1笔订单评价，获得1成长值',
				}],
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('任务中心')
		},
		computed: {},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>
<style scoped lang="scss">
	.rwimg {}

	.rwtop {
		padding: 110rpx 40rpx;
	}

	.b-s {
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	}

	.qwc {
		background: #FF4444;
		padding: 5rpx 25rpx;
		border-radius: 50rpx;
	}

	.cell:after {
		left: 160rpx;
		right: 30rpx;
	}
</style>
