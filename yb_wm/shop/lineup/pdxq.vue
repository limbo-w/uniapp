<template>
	<view v-if="info.id" class="mvh100 bf p3 pb130">
		<view class="ptc p23 p-r mb20">
			<view class="f30 f-x-bt">
				<text>我的号码</text>
				<text>{{info.code}}</text>
			</view>
			<view class="mt10 f-x-bt" :style="{color:tColor}">
				<view class="f50 wei">{{info.name}}</view>
				<view class="f-g-0" :class="{'c9':info.state>2}">{{pdState}}</view>
			</view>
			<block v-if="info.state==1">
				<view class="f28 mt20">前方等待桌数<text :style="{color:tColor}">{{info.waitNum}}</text>桌</view>
				<view class="c6 f26 mt10">预计等待时长{{info.waitMinute}}分钟</view>
			</block>
			<mg-cell cname="p30 mt20" isl="1">
				<view slot='bd' class="f26 c6">
					<view v-if="info.state!=2" class="flex mt5">
						<view class="flex-0 leftw">已等待：</view>
						<view class="flex-1">{{info.alreadyWaiting}}分钟</view>
					</view>
					<view class="flex mt5">
						<view class="flex-0 leftw">手机号码：</view>
						<view class="flex-1">{{hideNum(info.tel)}}</view>
					</view>
					<view class="flex mt5">
						<view class="flex-0 leftw">取号时间：</view>
						<view class="flex-1">{{timeToDate(info.createdAt)}}</view>
					</view>
					<view class="flex mt5">
						<view class="flex-0 leftw">取号渠道：</view>
						<view class="flex-1">在线取号</view>
					</view>
				</view>
			</mg-cell>
			<!-- <mg-input v-if="info.state==1" formt="2" cname="p20" v-model="jdtz" @input='tzkg' isl='1' ht='实时排队进度通知' hw='240' htc='c3 f26'></mg-input> -->
			<view class="c6 f24 tips pt20">
				<div class="mb10 f-y-c"><text class="iconfont iconjfgz mr10" :style="{color:tColor}"></text>商家提醒：</div>
				<book-text type='2' :content="info.notice" />
			</view>
			<view class="p-a w100 ptcdb">
				<mg-img m='aspectFill' :src="`${onImgurl}/img/pdbg.png`"></mg-img>
			</view>
		</view>
		<view v-if="info.state!=2" class="foot-btnc bf" @click='qxpd'>
			<view class="f22 t-c c6 mb20" v-if="info.state!=1">{{info.state==3?'您已过号':'订单已取消'}}，可点击下方按钮重新排队取号</view>
			<button class="foot-btn" :style="{background:'transparent',border:'1px solid '+tColor,color:tColor}">{{info.state==1?'取消排队':'重新排队取号'}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgInput from '@/components/form/mg-input.vue'
	// import mgRtext from '@/components/swiper/rich-text.vue'
	import bookText from '@/components/common/functionCmp/rich-text.vue';
	import utils from '@/common/utils.js'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'pdxq',
		components: {
			mgInput,
			bookText,
		},
		data() {
			return {
				info: {},
				jdtz: '2',
				stateArr: ['排队中', '已就餐', '已过号', '已取消'],
			}
		},
		onLoad(options) {
			this.query = options
			this.getSystem({
				nosetNB: 1,
			})
			this.getInfo()
		},
		mixins: [utilMixins],
		computed: {
			pdState() {
				return this.stateArr[+this.info.state - 1]
			},
		},
		methods: {
			hideNum(v) {
				return utils.hideNum(v)
			},
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.pdxq,
					mask: '加载中',
					data: {
						id: this.query.id
					},
				})
				this.info = data
				this.util.setNT('排队详情——' + this.stateArr[+data.state - 1])
			},
			qxpd() {
				if (this.info.state == 1) {
					uni.showModal({
						title: '提示',
						content: '确定取消排队吗？',
						cancelText: '取消排队',
						confirmText: '继续排队',
						success: async res => {
							if (res.cancel) {
								let data = await this.util.request({
									'url': this.api.qxpd,
									method: 'POST',
									mask: '取消中',
									data: {
										id: this.query.id,
										type: 'cancel',
									},
								})
								if (data) {
									this.util.message('操作成功', 1)
									utils.swnb(1000)
								}
							}
						}
					})
				} else {
					this.go({
						t: 3,
						url: '/yb_wm/index/index?storeId=' + this.info.storeId
					})
				}
			},
			tzkg(e) {
				console.log(e)
			},
		},
	}
</script>

<style scoped lang="scss">
	.ptc {
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
		border-radius: 15rpx;
	}

	.ptcdb {
		left: 0;
		bottom: -28rpx;
		height: 37rpx;
	}

	.leftw {
		min-width: 150rpx;
	}

	.tz {
		border-left: none;
		border-right: none
	}

	.tips {
		line-height: 40rpx;
	}
</style>
