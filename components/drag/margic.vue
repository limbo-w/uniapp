<template>
	<view class="margic o-h" :style="{
		margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`,
	}">
		<!-- 1 -->
		<view v-if="co.type == 1" class="f-row">
			<view class="bf margi1 f-1 b-re o-h" :class="{'b-n':co.shifting>0||v.img}" v-if="i < 2" v-for="(v, i) in co.imgList1"
			 :key="i" :style="{marginRight: i!=1?co.shifting + u:'',borderRadius: co.circle + u,height:imgH}" @click="goTo(v)">
				<mg-img v-if="v.img" :src="v.img"></mg-img>
			</view>
		</view>
		<view v-else-if="co.type == 2" class="f-row">
			<view class="bf margi2 f-1 b-re o-h" :class="{'b-n':co.shifting>0||v.img}" v-if="i < 3" v-for="(v, i) in co.imgList1"
			 :key="i" :style="{marginRight: i!=2?co.shifting + u:'',borderRadius: co.circle + u,height:imgH}" @click="goTo(v)">
				<mg-img v-if="v.img" :src="v.img"></mg-img>
			</view>
		</view>
		<view v-else-if="co.type == 3" class="f-row">
			<view class="bf f-1 b-re o-h" :class="{'b-n':co.shifting>0||v.img}" v-if="i==0" v-for="(v, i) in co.imgList1" :key="i"
			 :style="{marginRight: i!=2?co.shifting + u:'',borderRadius: co.circle + u,}" @click="goTo(v)">
				<mg-img v-if="v.img" :src="v.img"></mg-img>
			</view>
			<view class="f-1 f-col">
				<view class="bf margi2 f-1 b-be o-h" :class="{'b-n':co.shifting>0||v.img}" v-if="i>0" v-for="(v, i) in co.imgList1"
				 :key="i" :style="{marginBottom: i!=2?co.shifting + u:'',borderRadius: co.circle + u,height:co.height+'rpx'}"
				 @click="goTo(v)">
					<mg-img v-if="v.img" :src="v.img"></mg-img>
				</view>
			</view>
		</view>
		<view v-else-if="co.type == 4" class="">
			<view class="bf margi1 b-be o-h" :class="{'b-n':co.shifting>0||v.img}" v-if="i==0" v-for="(v, i) in co.imgList1"
			 :key="i" :style="{marginBottom: co.shifting + u,borderRadius: co.circle + u,height:imgH}" @click="goTo(v)">
				<mg-img v-if="v.img" :src="v.img"></mg-img>
			</view>
			<view class="f-row">
				<view class="bf margi1 f-1 b-re o-h" :class="{'b-n':co.shifting>0||v.img}" v-if="i>0" v-for="(v, i) in co.imgList1"
				 :key="i" :style="{marginRight: i!=2?co.shifting + u:'',borderRadius: co.circle + u,height:imgH}" @click="goTo(v)">
					<mg-img v-if="v.img" :src="v.img"></mg-img>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'margic',
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
		computed: {
			imgH() {
				return this.co.height * 2 + 'rpx'
			},
		},
		methods: {
			goTo(v) {
				this.goUrl(v.url, v)
			},
		},
		// created() {
		// 	console.log(this.co)
		// }
	};
</script>
<style lang="scss" scoped>
	.margic {

		.margi1 {
			height: 360rpx;
		}

		.margi2 {
			height: 250rpx;
		}

		.margi3 {
			height: 720rpx;
		}
	}
</style>
