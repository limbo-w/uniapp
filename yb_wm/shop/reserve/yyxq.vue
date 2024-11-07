<template>
	<view v-if="co.state" class="bf9 mvh100 pb130">
		<view class="yyxqbgc p-r cf" :style="{background:`linear-gradient(90deg,${tbgo},${tColor})`}">
			<view class="top">
				<view class="f44 wei">{{co.s1}}</view>
				<view class="mt10">{{co.s2}}</view>
				<view v-if="co.state==2" class="mt20">
					<view class="bztc p-r f-y-c">
						<view class="bzyd" :style="{background:tbgo2,}" :class="{active:0==aIdx}"></view>
						<view class="bzhx f-1" :style="{background:tbgo2,}"></view>
						<view class="bzyd" :style="{background:tbgo2,}" :class="{active:1==aIdx}"></view>
						<view class="bzhx f-1" :style="{background:tbgo2,}"></view>
						<view class="bzyd" :style="{background:tbgo2,}" :class="{active:2==aIdx}"></view>
						<view class="p-a jdt" :style="{width:(aIdx+1)/3*100+'%'}"></view>
					</view>
					<view class="f-x-bt mt10">
						<view v-for="(v,i) in arr" :key='i' :style="{opacity:i==aIdx?'':'0.6',}">{{v}}</view>
					</view>
				</view>
			</view>
			<view class="p-a b0 zjsjx"></view>
		</view>
		<view class="p3 p-r" :style="{marginTop: '-230rpx',}">
			<view v-if="co.state==3&&zqmArr" class="bf p23 bs20 b-s mb30">
				<view class="f30 wei">订单核销码</view>
				<view class="mt30 mb20 f-c">
					<view class="zqmc f-c" :class="{'mr30':i<zqmArr.length-1}" v-for="(v,i) in zqmArr" :key='i'>{{v}}</view>
				</view>
			</view>
			<view class="bf bs20 b-s p-r">
				<mg-cell @tab='go({t: 3,url: `/yb_wm/index/goods?storeId=${co.storeId}`})' isr='1' :img='co.storeIcon' w='60' h='60'
				 brs="5rpx" :btt='co.storeName' bttc='f36 wei' arrow="1" ftc='c6'></mg-cell>
				<view class="p23 f30 c9">
					<view class="p20 f-row">
						<view class="f32 mr30 c3">时间人数</view>
						<view class="f-1">{{`${co.serviceDay} ${co.serviceTime}，${co.people}人`}}</view>
					</view>
					<view class="p20 f-row">
						<view class="f32 mr30 c3">位置要求</view>
						<view class="f-1">{{co.regionName}}</view>
					</view>
					<view class="p20 f-row">
						<view class="f32 mr30 c3">联系方式</view>
						<view class="f-1">{{`${co.userName}(${co.sex}) ${co.userTel}`}}</view>
					</view>
					<view v-if="co.money>0" class="p20 f-row">
						<view class="f32 mr30 c3">预约定金</view>
						<view class="f-1">{{co.money}}</view>
					</view>
					<view class="p20 f-row">
						<view class="f32 mr30 c3">下单时间</view>
						<view class="f-1">{{timeToDate(co.createdAt)}}</view>
					</view>
					<view class="p20 f-row">
						<view class="f32 mr30 c3">订单编号</view>
						<view class="f-1">{{co.outTradeNo}}</view>
					</view>
					<view v-if="co.note" class="p20 f-row">
						<view class="f32 mr30 c3">订单备注</view>
						<view class="f-1">{{co.note}}</view>
					</view>
				</view>
				<text v-if="co.state==4||co.state==6" class="p-a iconfont yyzt" :class="co.state==4?'iconyjj':'iconyqx'"></text>
			</view>
		</view>
		<view class="foot-btnc">
			<button v-if="co.state==2||co.state==3||co.state==4||co.state==6" @click="save" :loading="loading" :disabled="loading"
			 class="foot-btn" :style="{background:co.state<4?'#ddd':`linear-gradient(90deg,${tbgo},${tColor})`}" hover-class="btnhc">{{co.state==2||co.state==3?'取消订单':'重新预约'}}</button>
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
		name: 'reserve-yyxq',
		data() {
			return {
				aIdx: 0,
				arr: ['联系商家中', '商家处理中', '结果确认'],
				loading: false,
				co: {},
			}
		},
		onLoad(options) {
			this.query = options
			this.getSystem({
				nosetNB: 1
			})
			this.util.setNT('预约详情')
			this.getData()
		},
		mixins: [utilMixins],
		computed: {
			tbgo() {
				return `rgba(${this.cTR(this.tColor)},0.65)`
			},
			tbgo2() {
				return this.cTRld(this.tColor, 0.15)
			},
			zqmArr() {
				return this.co.code && this.co.code.split('')
			},
		},
		methods: {
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.yyxq,
					mask: 1,
					data: {
						id: this.query.id,
					},
				})
				let s1, s2
				switch (+data.state) {
					case 1:
						s1 = '订单待支付'
						s2 = '请尽快支付'
						break;
					case 2:
						s1 = '订单待确认'
						s2 = '等待商家确认中，稍后将以短信方式告知结果'
						break;
					case 3:
						s1 = '待到店'
						s2 = '商家已确认您的预定信息，请您按时到店就餐'
						break;
					case 4:
						s1 = '订单已拒绝'
						s2 = '拒绝理由：商家暂时无法接受预定'
						break;
					case 5:
						s1 = '订单已核销'
						s2 = '期待下次光临'
						break;
					case 6:
						s1 = '订单已取消'
						s2 = '取消理由：行程有变需重新下单'
						break;
				}
				data.s1 = s1
				data.s2 = s2
				this.co = data
			},
			async qxdd(e) {
				if (e) {
					try {
						await this.util.modal('您确认取消订单吗？')
					} catch (e) {
						return
					}
				}
				let data = await this.util.request({
					'url': this.api.qxyy,
					method: 'POST',
					mask: '取消订单中',
					data: {
						id: this.query.id,
						type:'cancel'
					},
				})
				if (data) {
					this.util.message('操作成功', 1)
					utils.swnb(1000)
				}
			},
			save() {
				if (this.co.state == 2 || this.co.state == 3) {
					this.qxdd(1)
				} else {
					this.go({
						t: 3,
						url: `/yb_wm/index/index?storeId=${this.co.storeId}`
					})
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.yyxqbgc {
		padding-bottom: 200rpx;

		.top {
			padding: 30rpx 50rpx;
		}
	}

	.bztc {
		padding: 10rpx 0rpx;
		margin: 0 50rpx;

		.jdt {
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			height: 6rpx;
			background: #fff;
		}
	}

	.bzyd {
		width: 18rpx;
		height: 18rpx;
		border-radius: 50%;
	}

	.active {
		position: relative;

		&::after {
			content: '';
			position: absolute;
			width: 35rpx;
			height: 35rpx;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: rgba(#fff, 0.4);
			border-radius: 50%;
		}

		&::before {
			content: '';
			position: absolute;
			width: 18rpx;
			height: 18rpx;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			border-radius: 50%;
		}
	}

	.bzhx {
		height: 6rpx;
	}

	.zjsjx {
		width: 0;
		height: 0;
		border-color: #F9F9F9 transparent;
		border-width: 0 0 130rpx 100vw;
		border-style: solid;
	}

	.yyzt {
		top: 110rpx;
		right: 50rpx;
		font-size: 160rpx;
		color: #ddd;
	}

	.zqmc {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		border: 1px dashed #ddd;
	}
</style>
