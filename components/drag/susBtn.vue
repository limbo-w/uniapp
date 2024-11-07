<template>
	<view v-if="co.status==1" class="susBtn posi-f p2" :class="[co.type == 'left' ? 'l0' : 'r0']" :style="{ top: (co.shifting*2)+'rpx' }">
		<view class="imgc bf bsf f-c" v-for="(v, i) in co.imgUrl" :key="i" @click="goTo(v)">
			<view class="img">
				<mg-img :src="v.img"></mg-img>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		name: 'susBtn',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		data() {
			return {
				img: ''
			};
		},
		methods: {
			goTo(v) {
				this.goUrl(v.url, v)
			}
		},
		created() {
			// console.log(this.co)
		}
	};
</script>
<style lang="scss" scoped>
	.susBtn {
		width: 140rpx;

		.imgc {
			width: 100rpx;
			height: 100rpx;

			&:not(:last-child) {
				margin-bottom: 20rpx;
			}

			.img {
				width: 53rpx;
				height: 53rpx;
			}
		}
	}
</style>
