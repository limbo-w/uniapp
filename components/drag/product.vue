<template>
	<view v-if="list.length" :style="{
			background: co.typeBg==3?`url(${co.img})`:co.typeBg==2 ? co.colorBg : '',
			margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`,
		}"
	 :class="['product', co.type == 1 ? 'f-x-bt f-w' : co.type == 2 ? 'f-raw' : '']">
		<block v-for="(v,i) in list" :key='i'>
			<view @click="goodinfo(v.id)" v-if="co.type<= 4" class="spi mb20 o-h p-r" :class="co.type == 2?'spi2':co.type == 3?'spi3 f-row':co.type == 4?'spi4':''"
			 :style="{background:co.colorProductBg,borderRadius: co.circle + u,width:co.type == 1?'49%':co.type == 2?'32%':''}">
				<view class="img f-g-0">
					<mg-img :src="v.icon"></mg-img>
				</view>
				<view class="spbtm p2 bf f-y-bt f-g-1">
					<view :class="{'l-h1':co.type != 3}">
						<view :style="{ color: co.colorTitle }" class="f30 t-o-e lh40">{{v.name}}</view>
						<view v-if="v.body" class="mt15 f20 c9" :class="co.type != 3?'t-o-e':'t-o-e3'">{{v.body}}</view>
					</view>
					<view class="f-y-c">
						<view class="f-1 f-y-e ln" :style="{color:co.colorBtn}">
							<view v-if="v.activityGoodData.type<1||v.activityGoodData.type>=4">{{sl+v.price}}</view>
							<block v-else>
								<view>{{sl+v.activityGoodData.activityMoney}}</view>
								<view class="t-d-l ml10 c9 f24">{{sl+v.price}}</view>
							</block>
							<!-- <view class="t-d-l f24 c9 ml5">￥99</view> -->
						</view>
						<text class="iconfont f40" :class="co.typeBtn==1?'icongwc':co.typeBtn==2?'iconkxj':'iconsxj'" :style="{color:co.colorBtn}"></text>
					</view>
				</view>
				<view v-if="co.typePay<=3&&co.typePay>0" class="p-a zsjtb">
					<image class="pimg" :src="`/static/pay${co.typePay}.png`"></image>
					<view class="p-a f22 cf ptxt l-h1">{{co.typeText}}</view>
				</view>
			</view>
		</block>
	</view>
	<jzz v-else bgcolor="transparent" :nodata="isget" :mygd='isget' otext='暂无商品' />
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'product',
		components: {
			jzz,
		},
		props: {
			type: {
				type: String,
				default: '1'
			},
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
			shopinfo: Object,
		},
		data() {
			return {
				list: [],
				isget: false,
			};
		},
		watch: {
			shopinfo: {
				handler(newVal) {
					if (newVal.id) {
						if (this.co.typeProduct == 1 && this.co.productName && this.co.productName.length) {
							let arr = this.co.productName.map(v => v.name.id).toString()
							this.getData({
								type: 1,
								ids: arr,
							})
							console.log('商品组', arr)
						} else if (this.co.typeProduct == 2 && this.co.productGroup && this.co.productGroup.length) {
							if (this.co.productGroup[0].name.pid > 0) {
								this.getData({
									type: 2,
									pid: this.co.productGroup[0].name.pid,
									id: this.co.productGroup[0].name.id,
									num: this.co.productNum,
								})
								console.log('商品组2级分类')
							} else {
								this.getData({
									type: 2,
									pid: this.co.productGroup[0].name.id,
									num: this.co.productNum,
								})
								console.log('商品组1级分类')
							}
						} else if (this.co.typeProduct == 3) {
							this.getData({
								type: 3,
								ranktype: this.co.productMarket,
								num: this.co.productNum,
							})
						}
					}
					// console.log('product newVal', newVal)
				},
				immediate: true
			},
		},
		methods: {
			async getData(p) {
				let {
					data
				} = await this.util.request({
					'url': this.api.tzssp,
					method: 'POST',
					data: { ...p,
						storeId: this.shopinfo.id
					}
				})
				this.list = data
				this.isget = true
			},
			goodinfo(v) {
				this.go({
					t: 1,
					url: `/yb_wm/shop/out/goods-dl?gid=${v}&storeId=${this.shopinfo.id}&page=index`,
				})
			},
		},
		created() {
			// console.log(this.co)
		}
	};
</script>

<style lang="scss" scoped>
	.product {
		padding: 20rpx 20rpx 0;
		border: 1px solid transparent;

		.spi {
			.img {
				height: 348rpx;
			}
		}

		.spbtm {
			height: 180rpx;
		}

		.spi2 {
			margin-right: 2%;

			.img {
				height: 218rpx;
			}

			&:nth-of-type(3n) {
				margin-right: 0;
			}
		}

		.spi3 {
			.img {
				width: 260rpx;
				height: 260rpx;
			}

			.spbtm {
				flex: 1;
				height: auto;
			}
		}

		.spi4 {
			.img {
				height: 706rpx;
			}
		}

		.zsjtb {
			left: 0;
			top: 0;
			padding: 6rpx;

			.pimg {
				width: 78rpx;
				height: 40rpx;
			}

			.ptxt {
				padding: 14rpx 20rpx;
				top: 0rpx;
				left: 0;
			}
		}
		
		.lh40{
			line-height: 40rpx;
		}
	}
</style>
