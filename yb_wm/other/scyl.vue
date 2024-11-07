<template>
	<view class="h100">
		<view class="rwimg p-f l0 wh">
			<mg-img v-if="scylConfig.icon" :src="scylConfig.icon"></mg-img>
		</view>
		<block v-if="info">
			<view class="p-r scmain">
				<view class="bd b-s bf bs10 f24">
					<block v-if="!showjl&&info.state!=1">
						<view class="c9 mb10">参与步骤：</view>
						<view>1.点击右上角“...”将“{{system.name}}”小程序添加至我的小程序</view>
						<view class="p3">
							<image class="w100" style="height: 262rpx;" :src='`${onImgurl}/img/tjsc.png`'></image>
						</view>
						<view>2.首页下拉任务栏(下图所示)截图，点击进入小程序并在下方上传，经管理员审核通过后即可获得“<text class="cf5">
								<text v-if="scylConfig.isCoupon==1">代金券：{{scylConfig.couponArr[0].name}}、</text>
								<text v-if="scylConfig.isBalance==1">{{scylConfig.balance}}{{dw}}、</text>
								<text v-if="scylConfig.isIntegral==1">{{scylConfig.integral}}{{jfName}}、</text>
								<text v-if="scylConfig.isGrowth==1">{{scylConfig.growth}}成长值</text>
							</text>”</view>
						<view class="p3">
							<image class="w100" style="height: 274rpx;" :src='`${onImgurl}/img/ysc.png`'></image>
						</view>
						<block v-if="info.state==null||info.state==3">
							<view class="mb10">3.立即上传图片，并提交审核</view>
							<mg-photo max="1" pt='上传图片' icon='iconxj' @change-img='changeImg' />
						</block>
					</block>
					<block v-if="info.state>0&&info.state<3">
						<view v-if='(info.state==2&&showjl)||info.state==1' class="ysc">
							<image class="img dis-b" mode="widthFix" :src='`${onImgurl}/img/scjl.png`'></image>
							<view class="t-c f30 c0 p20 wei">{{info.state==1?'您的审核已提交，请耐心等待审核！':info.state==2?'您的提交已通过审核，奖励已发放至您的账户':'审核已拒绝！'}}</view>
						</view>
						<view v-if="info.state==2&&showjl" class="sjlic f-x-bt f-w">
							<view v-if="scylConfig.isBalance==1" class="sjli p3 bs10 t-c">
								<text class="iconfont iconye t0 cf1c mt10"></text>
								<view class="t1 mt20 f26">{{balanceName}}</view>
								<view class="t2 f30">{{scylConfig.balance}}{{dw}}</view>
								<view class="ck bf mt10" @click="go({url:'/yb_wm/other/recharge/yemx'})">查看</view>
							</view>
							<view v-if="scylConfig.isIntegral==1" class="sjli p3 bs10 t-c">
								<text class="iconfont iconjf2 t0 cf1c mt10"></text>
								<view class="t1 mt20 f26">{{jfName}}</view>
								<view class="t2 f30">{{scylConfig.integral}}个</view>
								<view class="ck bf mt10" @click="go({url:'/yb_wm/my/integral/my-integral'})">查看</view>
							</view>
							<view v-if="scylConfig.isGrowth==1" class="sjli p3 bs10 t-c">
								<text class="iconfont iconzj t0 cf1c mt10"></text>
								<view class="t1 mt20 f26">成长值</view>
								<view class="t2 f30">{{scylConfig.growth}}</view>
								<view class="ck bf mt10" @click="go({url:'/yb_wm/order/vip/czz'})">查看</view>
							</view>
							<view v-if="scylConfig.isCoupon==1" class="sjli p3 bs10 t-c">
								<text class="iconfont iconyhq t0 cf1c mt10"></text>
								<view class="t1 mt20 f26">代金券</view>
								<view v-if="scylConfig.couponArr[0].type==1" class="t2 f30">{{scylConfig.couponArr[0].money}}{{dw}}</view>
								<view v-if="scylConfig.couponArr[0].type==2" class="t2 f30">{{scylConfig.couponArr[0].discount}}折</view>
								<view class="ck bf mt10" @click="go({url:'/yb_wm/my/coupon/my'})">查看</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<button v-if="info.state==null||info.state==3||info.state==2&&!showjl" :disabled="loading" :loading="loading" class="posi-f b0 w100 bs0 cf"
			 @click="save" :style="{bottom: isIpx?'40rpx':0,background:info.state==3?'#fa5151':'#00BE00'}">{{info.state==null?'提交审核':info.state==2?'审核已通过，查看奖励':'信息有误，请重新提交审核'}}</button>
			<view v-if="isIpx" class='bgf'></view>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgPhoto from '@/components/form/mg-photo.vue'
	import utils from '@/common/utils.js'
	import {
		uploadImg
	} from '@/common/wechat-util.js'
	export default {
		name: 'scyl',
		components: {
			mgPhoto,
		},
		data() {
			return {
				loading: false,
				params: {
					media: '',
				},
				info: '',
				scylConfig: {},
				showjl: false,
			}
		},
		async onLoad(options) {
			this.getSystem({
				setNB: 1,
			})
			this.util.setNT('收藏有礼')
			this.getConfig()
			await this.getLoginInfo()
			this.getData()
		},
		computed: {
			jfName() {
				return this.system.custom.integral
			},
			balanceName() {
				return this.system.custom.balance
			},
		},
		methods: {
			async getConfig() {
				if (getApp().globalData.scylConfig) {
					this.scylConfig = getApp().globalData.scylConfig
				} else {
					let {
						data
					} = await this.util.request({
						'url': this.api.config,
						data: {
							ident: 'collection'
						}
					})
					this.scylConfig = getApp().globalData.scylConfig = data
				}
			},
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.scyl,
				})
				this.info = data
				this.loading = false
			},
			changeImg(e) {
				this.params.media = e.p
			},
			tjsh() {
				this.state = 2
			},
			async save() {
				if (this.info.state > 0 && this.info.state < 3) {
					return this.showjl = true
				}
				// for (let i in this.params) {
				// 	console.log(`%c ${i} `,
				// 		'color: white; background-color: #07c160', this.params[i])
				// }
				let filterArr = []
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						media: '请上传截图',
					}
				})
				if (!judgeData) {
					return
				} else {
					this.loading = true
					this.util.showLoading('上传中')
					let parr = await uploadImg({
							files: this.params.media
						}),
						params = utils.deepCopy(this.params)
					params.media = parr.join()
					// console.log(this.params, params, parr)
					// return
					let res = await this.util.request({
						'url': this.api.scyl,
						method: 'POST',
						mask: 1,
						data: params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('提交成功', 1, 1000)
						utils.stfn(() => {
							this.showjl = true
							this.getData()
						})
					}
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	.b-s {
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	}

	.scmain {
		padding: 300rpx 20rpx 160rpx;

		.bd {
			padding: 30rpx 40rpx;
		}
	}

	.ysc {
		.img {
			margin: 70rpx auto 0;
			width: 190rpx;
		}
	}

	.sjlic {
		margin: 60rpx 0 60rpx;
		padding: 0 30rpx;

		.sjli {
			width: 265rpx;
			background: #FFE6B4;
			margin-bottom: 40rpx;
		}

		.t0 {
			font-size: 65rpx;
		}

		.t1 {
			color: #D18D37;
		}

		.t2 {
			color: #A13B00;
		}

		.ck,
		.qsy {
			padding: 9rpx 20rpx;
			border-radius: 50rpx;
		}

		.ck {
			color: #FFA115;
		}

		.qsy {
			background: #FF8C00;
		}
	}

	.cf1c {
		color: #FFAB1C;
	}
</style>
