<template>
	<view class="jdred" v-if="jdData.orderNum">
		<view class="bf p30 bs20 m3">
			<view class="f-c f30" v-if="jdData.state == false">再下{{jdData.saleNum}}单 可返{{jdData.money}}元红包券1张</view>
			<view class="f30" v-else>
				<view class="f-c">已成功获得{{jdData.money}}元红包券1张</view>
				<view class="f24 f-c mt10 c9" @click="go({t:1,url:'/yb_wm/my/coupon/my'})">
					红包已放入：个人中心-我的卡券，去看看 ></span></view>
			</view>
			<view class="f24 c9 f-c mt20" v-if="jdData.state == false">
				*正价消费{{jdData.saleNum}}单，即返红包，当前已消费{{jdData.useNum}}单</view>
			<view class="jtc f-c mt20 f-w" v-if="jdData.data">
				<view class="jtitem be6 posi-r o-h" v-for="(v,i) in jdData.data" :key='i'
					:style="{background:v.state==true?tColor:'',}">
					<view class='posi-a udlr icw'>
						<mg-img :src="'/static/wd/signin/gou.png'" v-if="v.state"></mg-img>
						<mg-img :src="'/static/wd/signin/jb.png'" v-else></mg-img>
					</view>
				</view>
			</view>
			<view class="f-col f-y-c m20">
				<button class="clearbtn sbtn f-c cf f30" @click="qxd" :style="{background:tColor}"
					v-if="jdData.state == false">去下单</button>
				<button class="clearbtn sbtn f-c cf f30" @click="qxd" :style="{background:tColor}" v-else>去使用</button>
			</view>
		</view>
		<view class="bf bs20 m3">
			<mg-cell @tab="ljyq" btt="集点记录" cname='p3' isl='1' hc='1'></mg-cell>
			<view v-if="jdData.list.length">
				<block v-for="(v,i) in jdData.list" :key='i'>
					<mg-cell cname="f-s" isr="1" :btt="v.outTradeNo" bttc="f32" :bbt="timeToDate(v.createdAt)"
						:ft="'-'+v.money"></mg-cell>
				</block>
			</view>
			<view class="p30" v-else>
				<view class="f24 c9 f-c mt20">下一单开启集点活动</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import utils from '@/common/utils.js'
	export default {
		name: 'order-index',
		components: {

		},
		data() {
			return {
				jdData: {},
			}
		},
		async onLoad(options) {
			this.getSystem()
			await this.getLoginInfo()
			this.util.setNT('集点返红包')
			this.storeId = utils.getOptions(options, {
				key: 'storeId',
				q1: this.storeInfo.id,
			})
			this.getData()
		},
		computed: {
			...mapState({
				storeInfo: state => state.config.storeInfo,
			}),
		},
		mixins: [utilMixins],
		methods: {
			...mapActions(["getConfig"]),
			qxd() {
				this.go({
					t: 6,
					url: '/yb_wm/index/goods'
				})
			},
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.collectList,
					data: {
						storeId: this.storeId,
					},
				})
				this.jdData = data
				if(!this.jdData.orderNum){
					this.util.message(`活动不存在或已结束`,3,3000)
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	.jdred {
		.jtitem {
			width: 90rpx;
			height: 90rpx;
			margin: 0 20rpx 40rpx 20rpx;
			border-radius: 50%;
		}

		.jtc {
			padding: 40rpx 10rpx 20rpx 10rpx;
		}

		.icw {
			width: 40rpx;
			height: 40rpx;
		}

		.sbtn {
			width: 350rpx;
			height: 84rpx;
			border-radius: 47px;
		}
	}
</style>
