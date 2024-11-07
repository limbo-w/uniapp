<template>
	<view class="titles o-h" :style="{
			marginTop: co.marginTop + u,
			marginBottom: co.marginBottom + u,
			marginLeft: co.marginLR + u,
			marginRight: co.marginLR + u,
			borderRadius: co.circle +u,
		}">
		<view class="titles-c f-y-c" :style="{ background: co.colorBg, }">
			<view @click="goLink('/yb_wm/my/integral/my-integral')" class="f-1" v-if="co.type==2">
				<view class="wei">
					<text class="f24">我的积分 </text>
					<text class="ml10 f38">{{isLogin?user.integral:'***'}}</text>
				</view>
				<view class="f24 c9 l-n mt10">{{ co.upLoad1.text }}</view>
			</view>
			<view @click="goLink('/yb_wm/other/recharge/yesy')" class="f-1" v-else>
				<view class="wei">
					<text class="f24">我的余额 </text>
					<text class="ml10 f38">{{isLogin?user.balance:'***'}}</text>
				</view>
				<view class="f24 c9 l-n mt10">{{ co.upLoad1.text }}</view>
			</view>
			<view @click="goLink('/yb_wm/other/recharge/smzf')" class="blf9">
				<view class="img ml10">
					<mg-img src='/static/hym.png'></mg-img>
				</view>
				<view class="f24 c9 mt10">会员码</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'titles',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			u: {
				type: String,
				default: 'px'
			},
		},
		data() {
			return {};
		},
		methods: {
			async goLink(url) {
				if (!await this.checkLogin()) return
				this.go({
					t: 1,
					url,
				})
			},
		},
		created() {
			// console.log(this.co)
		}
	};
</script>
<style lang="scss" scoped>
	.titles {
		&-c {
			padding: 30rpx;

			.img {
				width: 48rpx;
				height: 48rpx;
			}
			.blf9{
				border-left: 1rpx solid #f9f9f9;
				padding-left: 30rpx;
			}
		}
	}
</style>
