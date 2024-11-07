<template>
	<view class="mh100" v-show="dataInfo.id" :style="{background:color}">
		<view class="cl-main">
			<view class="timg bsf posi-r">
				<mg-img :src="dataInfo.shareImg||system.icon"></mg-img>
			</view>
			<view class="cl-bd bf">
				<view class="p03">
					<view class="t-c f32 wei">{{dataInfo.name}}</view>
					<view class="p20 bbd">
						<view class="">适用金额</view>
						<view class="mt20 f30 wei">{{dataInfo.fullMoney > 0 ?`满${sl+dataInfo.fullMoney}可用`:'无门槛'}}</view>
					</view>
					<view class="p20 bbd">
						<view class="mb10">卡券类型</view>
						<view class="f-row mb30 f24 c9">
							<view class="yd f-g-0"></view>
							<view>{{qlx}}</view>
						</view>
						<view class="mb10">有效期限</view>
						<view class="mb30 f24 c9">
							<view v-if="dataInfo.startTime" class="f-row mb10">
								<view class="yd f-g-0"></view>
								<view>活动时间：{{timeToDate(dataInfo.startTime)}}至{{timeToDate(dataInfo.endTime)}}</view>
							</view>
							<view class="f-row">
								<view class="yd f-g-0"></view>
								<view>使用时间：{{dataInfo.useExplain}}</view>
							</view>
						</view>
						<view class="mb10">卡券面额</view>
						<view class="mb30 f24 c9">
							<view class="f-row mb10" v-if="dataInfo.type!=3">
								<view class="yd f-g-0"></view>
								<view>面额：{{dataInfo.type==1?`${sl+dataInfo.money}`:`${dataInfo.discount}折`}}</view>
							</view>
							<view v-if="dataInfo.stock" class="f-row">
								<view class="yd f-g-0"></view>
								<view>库存：{{dataInfo.stock}}张</view>
							</view>
						</view>
						<view class="mb10">适用规则</view>
						<view class="mb30 f24 c9">
							<view class="f-row mb10">
								<view class="yd f-g-0"></view>
								<view class="f-row">
									<view class="f-g-0">适用门店：</view>
									<!-- <view>{{dataInfo.storeType==1?'仅本店可用':dataInfo.storeType==2?'全部门店':'指定店铺可用'}}</view> -->
									<view v-if="dataInfo.storeType=='2'">全部门店</view>
									<view v-else>
										<block v-if="dataInfo.storeData">
											<view v-for="(v,i) in dataInfo.storeData" @click="gosjDL(v)" :key='i'>{{v.name}}</view>
										</block>
									</view>
								</view>
							</view>
							<view class="f-row mb10" v-if="dataInfo.type!='3'">
								<view class="yd f-g-0"></view>
								<view class="f-g-0">适用商品：</view>
								<view>{{dataInfo.goodsType==1?'全部商品可用':dataInfo.goodsType==2?'指定商品可用':dataInfo.goodsType==3?'指定商品不可用':'指定商品分类可用'}}</view>
							</view>
							<view class="f-row mb10" v-if="dataInfo.type=='3'">
								<view class="yd f-g-0"></view>
								<view class="f-g-0">适用商品：</view>
								<view>{{dataInfo.goodsName}}</view>
							</view>
							<view class="f-row mb10">
								<view class="yd f-g-0"></view>
								<view class="f-row">
									<view class="f-g-0">适用场景：</view>
									<view>{{sycjName}}</view>
								</view>
							</view>
							<view class="f-row">
								<view class="yd f-g-0"></view>
								<view class="f-row">
									<view class="f-g-0">发行门店：</view>
									<view>{{dataInfo.storeName}}</view>
								</view>
							</view>
						</view>
						<block v-if="!query.islq">
							<view class="mb10">领取规则</view>
							<view class="mb30 f24 c9">
								<view class="f-row mb10">
									<view class="yd f-g-0"></view>
									<view class="f-row">
										<view class="cdlht">每人限领次数：</view>{{dataInfo.isMax==1?'不限次数':`每人限领${dataInfo.maxNum}次`}}
									</view>
								</view>
								<view class="f-row">
									<view class="yd f-g-0"></view>
									<view class="f-row">
										<view class="cdlht">领取人限制：</view>{{dataInfo.memberType==1?'所有人均可领':dataInfo.memberType==2?'会员可领':'指定标签用户可领'}}
									</view>
								</view>
							</view>
						</block>
						<view class="p3 t-c" v-if="dataInfo.useState>=2 && query.receiveId && dataInfo.isHx=='1'">
							<view>请出示此码给收银员核销</view>
							<view class="f-c">
								<view class="zqmimg p-r">
									<mg-img :src="qcmsrc"></mg-img>
									<view class="p-a zzc" v-if="dataInfo.useState>2" :style="{background:dataInfo.useState>2?'#ccc':''}"></view>
								</view>
							</view>
						</view>
						<view class="f-c mb10" v-if='query.nobtn!=1'>
							<button :disabled="loading" class="ljsy cf f32 bs15 f-c" :style="{background:dataInfo.useState>2?'#ddd':color}"
							 @click="ljsy">{{anlx}}</button>
						</view>
					</view>
				</view>
				<view class="p-r p03">
					<view class="p30">
						<view @click.stop="active=!active" class="f-x-bt" :class="{'active':active}">
							<view>注意事项</view>
							<text class="iconfont iconright" :class="{'jtactive':active}"></text>
						</view>
						<view class="coubb o-h" :class="{'cactive':active}">
							<view class="coubbv pt10" :class="{'show':active}">
								<mg-rtext type='2' :content="dataInfo.details||dataInfo.couponDetails" />
							</view>
						</view>
					</view>
					<view class="ydl p-a" :style="{background:color}"></view>
					<view class="ydr p-a" :style="{background:color}"></view>
				</view>
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
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	export default {
		name: 'couponDl',
		components: {
			mgCoupon,
			MgCell,
			mgRtext,
		},
		data() {
			return {
				dataInfo: {},
				query: {},
				active: false,
				loading: false,
				qcmsrc: '',
			}
		},
		async onLoad(options) {
			this.query = options
			this.getSystem()
			this.util.setNT('优惠券详情')
			await this.getLoginInfo()
			this.getInfo()
		},
		mixins: [utilMixins],
		computed: {
			color() {
				return this.dataInfo.color
			},
			sycjName() {
				if (this.dataInfo.useType) {
					let obj = this.dataInfo.useType,
						arr = []
					if (obj.indexOf(1) > -1) {
						arr.push('外卖可用')
					}
					if (obj.indexOf(2) > -1) {
						arr.push('堂食可用')
					}
					// if (obj.indexOf(3) > -1) {
					// 	arr.push('当面付可用')
					// }
					if (obj.indexOf(3) > -1) {
						arr.push('快餐可用')
					}
					return arr.toString()
				}
			},
			qlx() {
				if (this.dataInfo.id) {
					let t = ''
					switch (+this.dataInfo.type) {
						case 1:
							t = '代金券'
							break;
						case 2:
							t = '折扣券'
							break;
						case 3:
							t = '商品兑换券'
							break;
					}
					return t
				}
			},
			anlx() {
				if (this.dataInfo.id) {
					let t = ''
					switch (+this.dataInfo.useState) {
						case 1:
							t = '点击领取'
							break;
						case 2:
							t = '点击使用'
							break;
						case 3:
							t = '已使用'
							break;
						case 4:
							t = '未到使用时间'
							break;
						case 5:
							t = '已过期'
							break;
					}
					return t
				}
			},
		},
		methods: {
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.yhqxq,
					method: 'POST',
					mask: 1,
					data: {
						id: this.query.id || '',
						receiveId: this.query.receiveId || ''
					},
				})
				data.color || (data.color = '#EE472B')
				// this.util.setNB(data.color)
				this.dataInfo = data
				if(this.dataInfo.useState>=2 && this.query.receiveId && this.dataInfo.isHx=='1'){
					this.getqcm()
				}
				this.loading = false
			},
			async ljsy() {
				let u = this.dataInfo.useState
				if (u == 1) {
					this.loading = true
					let res = await this.util.request({
						'url': this.api.lqyhq,
						method: 'POST',
						mask: 1,
						data: {
							couponId: this.dataInfo.id,
						},
					})
					if (res) {
						this.util.message('领取成功', 1)
						setTimeout(() => {
							this.getInfo();
						}, 500)
					} else {
						this.loading = false
					}
				} else if (u == 2) {
					// this.$store.state.config.storeInfo.id = this.dataInfo.storeId
					this.go({
						t: 6,
						url: '/yb_wm/index/goods'
					})
				}
			},
			gosjDL(v) {
				this.go({
					t: 6,
					url: '/yb_wm/index/goods'
				})
			},
			async getqcm() {
				let {
					data
				} = await this.util.request({
					'url': this.api.mealCode,
					mask: '加载中',
					data: {
						id: this.query.receiveId,
					},
				})
				this.qcmsrc = data
			},
		},
		onShareAppMessage() {
			let p = `yb_wm/my/coupon/coupon-dl?id=${this.dataInfo.id}&receiveId=${this.query.receiveId||''}`
			return this.util.mpShare({
				t: this.dataInfo.shareTitle,
				i: this.getImgS(this.dataInfo.shareImg),
				p,
			})
		},
		onShareTimeline(e) {
			return {
				title: this.dataInfo.shareTitle,
				imageUrl: this.getImgS(this.dataInfo.shareImg),
			}
		},
	}
</script>

<style scoped lang="scss">
	.cl-main {
		padding: 50rpx 30rpx;
	}

	.timg {
		width: 120rpx;
		height: 120rpx;
		margin: 0 auto;
	}

	.cl-bd {
		padding: 70rpx 0 0;
		margin-top: -60rpx;
		border-radius: 12rpx;
	}

	.bbd {
		border-bottom: 1px dashed #EBEBED;
	}

	.yd {
		width: 6rpx;
		height: 6rpx;
		border-radius: 50%;
		background: #999;
		margin: 17rpx 12rpx 0 5rpx;
	}

	.ljsy {
		width: 60%;
		height: 75rpx;
	}

	.ydl,
	.ydr {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		top: -20rpx;
	}

	.ydl {
		left: -17rpx;
	}

	.ydr {
		right: -17rpx;
	}

	.jtactive {
		transform: rotate(90deg);
	}

	.coubb {
		height: 0;
		transition: all 0.3s ease-in-out;

		&.cactive {
			height: auto;
		}
	}

	.coubbv {
		opacity: 0;
		transform: translateY(-50%);
		transition: 0.3s ease-in-out;

		&.show {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.cdlht {
		min-width: 170rpx;
	}
	.zqmimg {
		width: 380rpx;
		height: 380rpx;
		margin: 10rpx auto;
		.zzc{
			width: 100%;
			height: 100%;
			top: 0;
			background: #ccc;
			opacity: 0.8;
		}
	}
</style>
