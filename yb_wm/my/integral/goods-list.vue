<template>
	<view class='bf f-raw f-bt p23' v-if="goodsList.length">
		<view @click="go({t:1,url:'/yb_wm/my/integral/details?id=' + v.id})" class="bf goodsc mb20 bs15 b-s-1" v-for="(v,i) in goodsList"
		 :key='i'>
			<view class="goodsimg">
				<mg-img :src="v.icon"></mg-img>
			</view>
			<view class='jfgb'>
				<view class="f-bt">
					<view v-if="v.type=='2'" class="bf2 cf f24 mr10 boxs f-g-0">红</view>
					<view class="t-o-e f-g-1">{{v.name}}</view>
				</view>
				<view class="cfa">
					<view class="t-o-e f30" :style="{color:tColor}">
						<text v-if="v.score>0">{{v.score}}</text>
						<text v-if="v.score>0" class="f22 c9 nowei">{{jfName}}</text>
						<text v-if="v.score>0 && v.money>0" class="nowei c9">+</text>
						<text v-if="v.money>0">{{v.money}}<text class="f22 c9">{{dw}}</text></text>
					</view>
					<view class="t-o-e t-d-l c9 f22 wei4">{{sl+v.price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		name: 'goods-list',
		props: {
			co: {
				type: Object,
				default: function() {
					return {
						// coupon: 0,
					}
				}
			},
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
		},
		data() {
			return {

			}
		},
		computed: {
			jfName() {
				return this.system.custom.integral
			},
			goodsList() {
				// console.log(this.list)
				return this.list
			},
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style scoped lang="scss">
	.jfgb {
		padding: 12rpx 20rpx;
	}

	.bf2 {
		background: #FF5012;
	}

	.goodsc {
		width: 330rpx;
	}

	.goodsimg {
		width: 330rpx;
		height: 330rpx;
	}

	.boxs {
		border-radius: 8rpx;
		padding: 0 7rpx;
	}
</style>
