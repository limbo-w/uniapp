<template>
	<view class="">
		<!-- <mg-popup :close='false' v-model="showSq" position="middle">
			<view class="bf f-c-c p3 bs30" style="width: 500rpx;">
				<view class="p03 f30 wei mb30">预览保存</view>
				<view class="kfimg" @click="util.preImg({urls:[url+system.customerService]})">
					<mg-img :src='system.customerService'></mg-img>
				</view>
			</view>
		</mg-popup> -->
		<view class="dlhd f-c-c">
			<view class="hdimg bsf">
				<mg-img :src='system.icon'></mg-img>
			</view>
			<view class="c9 f26 p23">{{system.name}}</view>
		</view>
		<!-- #ifdef MP-WEIXIN || MP-BAIDU -->
		<view class="foot-btnc posi-r">
			<button v-if="system.serviceUrl" @click="zxkf" class="foot-btn" :style="{background:tColor}">在线客服</button>
			<button v-else open-type='contact' class="foot-btn" :style="{background:tColor}">在线客服</button>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || H5 -->
		<view v-if="system.serviceUrl" class="foot-btnc posi-r">
			<button @click="zxkf" class="foot-btn" :style="{background:tColor}">在线客服</button>
		</view>
		<!-- #endif -->
		<view class="foot-btnc posi-r" @click='util.makeTel(system.tel)'>
			<button class="foot-btn f-c" :style="{background:'transparent',border:'1px solid '+tColor,color:tColor}">
				<text :style='{color:tColor}' class='iconfont icondh mr20 f42'></text>联系电话</button>
		</view>
		<view class="posi-f b0 w100" style="height: 100rpx;" @click="bbh"></view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgPopup from '@/components/common/popup.vue'
	export default {
		name: 'kf',
		components: {
			mgPopup,
		},
		data() {
			return {
				showSq: true
			}
		},
		onLoad(options) {
			this.getSystem({
				normal: 1
			})
			this.util.setNT('联系客服')
		},
		computed: {},
		methods: {
			zxkf() {
				this.go({
					t: 1,
					url: '/yb_o2o/other/web-view?src=' + encodeURIComponent(JSON.stringify(this.system.serviceUrl))
				})
			},
			bbh() {
				uni.showModal({
					title: '小程序版本号',
					content: '21.09.01'
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.kfimg {
		width: 400rpx;
		height: 400rpx;
	}

	.dlhd {
		padding: 130rpx 30rpx 80rpx;
	}

	.hdimg {
		width: 150rpx;
		height: 150rpx;
	}
</style>
