<template>
	<view class='f-x-bt' :class="[cname]">
		<view v-if="isprice" class='f-g-1 wei t-o-e' :class="[pcname,'cf0a']"><text class="f26 mr5">{{sl}}</text>{{co.activityGoodData.type<1||co.activityGoodData.type>=4?co.price:co.activityGoodData.activityMoney}}
			<text v-if="isunit" class="nowei c9 f24">/{{co.unit}}</text>
			<text v-if="isyprice" class="t-d-l nowei ml10 c9 f24">{{sl+co.price}}</text>
		</view>
		<view v-if="(co.isSpecs==1||co.isMaterial==1||co.isAttr==1)&&showspec" @click.stop="isClose&&$emit('add',{addwz:addwz})"
		 class="f-g-0 cartggc f-c">
			<view class='text-btnf f22 f-c ggc' :style="{background:isClose?color||tColor:'#ccc'}">
				<!-- <text>{{co.isSpec==1?'选规格':co.isMaterial==1?'选加料':'选属性'}}</text> -->
				<text>选 择</text>
				<text v-if='co.num>0' class="dot f-c" :style="{background:isClose?color||tColor:'#ccc'}">{{co.num}}</text>
			</view>
		</view>
		<view v-else-if="showjj" class="f-g-0 f-bt">
			<!-- <view class="reducecon f-y-c" :class="{active:co.num>0}">
				<view @click.stop="isClose&&$emit('dec',{addwz:addwz})" class="cartc f-c">
					<button class="cartdec" :style="{borderColor:tColor}">
						<view class="cartdecab" :style="{background:tColor}"></view>
					</button>
				</view>
				<text class="f26 ma c0">{{co.num}}</text>
			</view> -->
			<view v-if="co.num>0" class="reducecon active f-y-c">
				<view @click.stop="isClose&&$emit('dec',{addwz:addwz})" class="cartc f-c">
					<button class="cartdec" :style="{borderColor:color||tColor}">
						<view class="cartdecab" :style="{background:isClose?color||tColor:'#ccc'}"></view>
					</button>
				</view>
				<text class="f26 ma c0" :class="numc">{{co.num}}</text>
			</view>
			<view @click.stop="isClose&&$emit('add',{addwz:addwz})" class="cartc f-c">
				<button class="cartadd" :style="{background:isClose?color||tColor:'#ccc'}"></button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		name: 'add-goods',
		props: {
			co: {
				type: Object,
				default: function() {
					return {

					}
				}
			},
			cname: {
				type: String,
				default: ''
			},
			numc: String,
			addwz: { //加数据库位置1列表2购物车
				type: String,
				default: '1'
			},
			outin: { //只要是动态的值都要规范写
				type: String,
				default: '1'
			},
			pcname: '',
			isprice: {
				type: Number,
				default: 1
			},
			isyprice: {
				type: Boolean,
				default: false
			},
			isunit: {
				type: Boolean,
				default: false
			},
			showspec: {
				type: Boolean,
				default: true
			},
			showjj: {
				type: Boolean,
				default: true
			},
			nocheckgd: {
				type: Boolean,
				default: false
			},
			addgb: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			}
		},
		computed: {
			// ...mapState(['sjxx']),
			isClose() {
				return this.nocheckgd || this.addgb
			},
			// price() {
			// 	return +(this.outin == 1 ? +this.co.outSalesPrice : +this.co.inSalesPrice).toFixed(2)
			// },
		},
		methods: {
			// yprice() {
			// 	return +(this.outin == 1 ? +this.co.outPrice : +this.co.inPrice).toFixed(2)
			// },
		},
	}
</script>

<style scoped lang="scss">
	.ggc {
		position: relative;
		border-radius: 30rpx;
		height: 43rpx;
		padding: 3rpx 15rpx;
		width: 97rpx;
	}

	.dot {
		position: absolute;
		width: 36rpx;
		height: 36rpx;
		right: -10rpx;
		top: -18rpx;
		border-radius: 50%;
		color: #fff;
		border: 1rpx solid #fff;
	}

	.mr5 {
		margin-right: 5rpx;
	}
</style>
