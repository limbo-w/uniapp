<template>
	<view class="mh100 pb130" v-show="system.color&&recharge.open==1">
		<view class="remain">
			<view class="topc p-r" :style="{background:tColor}">
				<view class="rwimg p-a r0">
					<mg-img m="aspectFit" :src="`${onImgurl}/czbg.png`"></mg-img>
				</view>
				<view class="f-y-c p-r">
					<view class="img mr30">
						<mg-img cname="bsf" :src="user.portrait||'/static/wd/mrtx.png'"></mg-img>
					</view>
					<view class="cf" v-if="rule.money>-1">
						<view>{{system.custom.balance}}：{{sl+rule.money}}</view>
						<!-- <view class="m10">赠送{{system.custom.balance}}：{{sl+rule.giveMoney}}</view> -->
						<view @click="go({url:'yemx?idx=1'})" class="f-y-c cf mt10 f24">交易记录<text class="iconfont iconright ml5 cf f28"></text></view>
					</view>
				</view>
				<!-- <view @click="go({url:'yemx?idx=1'})" class="f-y-c p-a jyjl cf">交易记录<text class="iconfont iconright ml5 cf f28"></text></view> -->
			</view>
			<view class="bdc o-h bf p-r">
				<!-- <view class="mt10 f26 c6">存款数额</view> -->
				<view class="f-bt f-w">
					<view @click="change(i)" v-for="(v,i) in rule.list" :key='i' class="ckic p02 bs15 bf5 f-col" :style="{background:aIdx==i?`#fff`:'',boxShadow:aIdx==i?'none':'',borderColor:aIdx==i?tColor:'',color:aIdx==i?tColor:'',}">
						<view class="f-1 f-c">
							<view class="f42" :class="{'f48 wei':aIdx==i}">{{Number(v.money)}}</view>
							<view class="ml15 mt10 f20" :class="{'f30':aIdx==i}">{{dw}}</view>
						</view>
						<view class="hx ma" :style="{background:aIdx==i?tColor:''}"></view>
						<view class="f-1 f-c-c f20">
							<view v-if="v.arr.includes(1)" class="">赠送:{{v.giveMoney}}{{dw}}</view>
							<view v-if="v.arr.includes(2)" class="t-o-e">赠送{{v.integral}}{{jfName}}</view>
							<view v-if="v.arr.includes(3)" class="">赠送:{{v.giveGrow}}成长值</view>
							<view v-if="v.arr.includes(4)">赠送优惠券</view>
						</view>
					</view>
					<view v-if="recharge.moneyOpen==1" @click="change(-1)" class="ckic p02 bs15 bf5 f-col" :style="{background:aIdx==-1?`#fff`:'',boxShadow:aIdx==-1?'none':'',borderColor:aIdx==-1?tColor:'',color:aIdx==-1?tColor:'',}">
						<view class="f-1 f-c">
							<input :focus='focus' v-model="money" class="f42 srk t-c bt" :class="{'f48 wei':aIdx==-1}" type="digit" maxlength="6"
							 placeholder="请输入" placeholder-class="f30 t-c"></input>
							<view class="f20" :class="{'f30':aIdx==-1}">{{dw}}</view>
						</view>
						<view class="hx ma" :style="{background:aIdx==-1?tColor:''}"></view>
						<view class="f-1 f-c-c f20">
							<view class="">其他金额</view>
							<!-- <view class="t-o-e">自定义输入</view> -->
						</view>
					</view>
				</view>
				<view v-if="aIdx!=-1" class="bs30 reqnr f24 c6" :style="{background:`rgba(${cTR(tColor)},0.2)`}">
					<view v-if="xzrule.moneyOpen==1" class="">赠送：{{xzrule.giveMoney}}{{dw}}</view>
					<view v-if="xzrule.integralOpen==1" class="t-o-e">赠送：{{xzrule.integral}}{{jfName}}</view>
					<view v-if="xzrule.growOpen==1" class="">赠送：{{xzrule.giveGrow}}成长值</view>
					<view v-if="xzrule.couponOpen==1" class="f-row">
						<view class="f-g-0">赠送：</view>
						<view class="">
							<view v-for="(v,i) in xzrule.couponArr" :key='i' class="f-row">
								<view>{{v.name}}</view>
								<view class="ml10 f-g-0">x 1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="mt30">
					<view class="mb10 wei f30">使用说明</view>
					<mg-rtext type='2' :content="recharge.details" />
				</view>
			</view>
			<!-- <mg-agree cname="p3" p='5' title='充值服务协议' :color="tColor" v-model="isAgree"></mg-agree> -->
			<view class="foot-btnc cf f30 f-c bf">
				<button @click="save" :loading="loading" :disabled="loading" class="foot-btn bs15 f30" hover-class="btnhc" :style="{background:tColor}">立即储值</button>
			</view>
		</view>
		<!-- <uni-fab v-if='!showLoading' :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="vertical"
		 @trigger="trigger"></uni-fab> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import MgImg from '@/components/common/mg-img.vue'
	import utils from '@/common/utils.js'
	import mgInput from '@/components/form/mg-input.vue'
	import mgAgree from '@/components/form/mg-agree.vue'
	import uniFab from '@/components/third/uni-fab.vue';
	import sqBtn from '@/components/common/sq-btn.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'index',
		components: {
			MgImg,
			mgInput,
			mgAgree,
			uniFab,
			sqBtn,
			mgRtext,
		},
		data() {
			return {
				aIdx: -1,
				focus: false,
				rule: {
					list: [],
				},
				xzrule: {},
				money: '',
				loading: false,
				isAgree: true,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '',
					buttonColor: ''
				},
				content: [{
						icon: 'iconzy',
						text: '首页',
						url: '/yb_o2o/index/index'
					},
					{
						icon: 'icondd',
						text: '订单',
						url: '/yb_o2o/order/index'
					},
					{
						icon: 'iconwd',
						text: '我的',
						url: '/yb_o2o/my/index'
					}
				],
			}
		},
		async onLoad() {
			this.getSystem({
				setNB: 1
			}).then(() => {
				this.isAgree = this.system.isCheck == 1
				this.util.setNT(this.system.custom.rechargeTitle)
			})
			this.getConfig({
				key: 'recharge',
				api: 'config',
				params: {
					ident: 'recharge'
				}
			}).then(() => {
				this.isload = true
				if (this.recharge.open != 1) {
					uni.showModal({
						title: '提示',
						content: '储值功能已关闭',
						showCancel: false,
						success: (res) => {
							this.go({
								t: 6,
								url: '/yb_wm/index/my-index'
							})
						}
					});
				}
			})
			await this.getLoginInfo()
			this.rechargeRule()
		},
		async onShow() {
			if (this.isload) {
				// console.log('show')
			}
			// setTimeout(() => {
			// 	// uni.switchTab({
			// 	// 	url: '/yb_wm/index/goods?query=123'//可以跳过去但是参数无效
			// 	// })
			// 	uni.reLaunch({
			// 		url: '/yb_wm/index/goods?query=123' //参数有效
			// 	})
			// }, 1000)
		},
		mixins: [utilMixins],
		computed: {
			jfName() {
				return this.system.custom.integral
			},
			...mapState({
				recharge: state => state.config.recharge,
			}),
		},
		methods: {
			...mapActions(['getConfig']),
			async rechargeRule() {
				let {
					data
				} = await this.util.request({
					'url': this.api.czgz,
				})
				data.list.forEach(v => {
					v.arr = []
					if (v.moneyOpen == 1) {
						v.arr.push(1)
					}
					if (v.integralOpen == 1) {
						v.arr.push(2)
					}
					if (v.growOpen == 1) {
						v.arr.push(3)
					}
					if (v.couponOpen == 1) {
						v.arr.push(4)
					}
					v.arr = v.arr.slice(0, 2)
				})
				// console.log(data.list)
				this.rule = data
				if (data.list.length) {
					this.aIdx = 0
					this.xzrule = data.list[0]
				}
			},
			change(v) {
				this.aIdx = v
				if (v == -1) {
					this.focus = true
				} else {
					this.focus = false
					this.xzrule = this.rule.list[v]
				}
			},
			checkboxChange(e) {
				console.log(e.detail.value, this.isAgree)
				if (this.isAgree == true) {
					this.isAgree = false
				} else {
					this.isAgree = true
				}
			},
			async paySuccess() {
				this.rechargeRule()
				// console.log('paySuccess')
			},
			async save() {
				if (!await this.checkLogin()) return
				let money = this.aIdx == -1 ? +this.money : this.xzrule.money
				// console.log('cz', money)
				if (money == '') {
					this.util.message('请确定储值金额', 3)
				} else if (this.aIdx == -1 && money < +this.recharge.downMoney) {
					this.util.message('最小储值金额' + this.recharge.downMoney, 3)
				} else {
					// return
					this.loading = true
					// await this.requestSM('recharge')
					let res = await this.util.request({
						'url': this.api.czxd,
						method: 'POST',
						mask: '下单中',
						data: {
							money: money
						}
					})
					if (!res) {
						this.loading = false
					} else {
						this.go({
							t: 1,
							url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
								orderId: res.data,
								orderType: 2,
								info: {
									money: money,
									type: "储值支付",
									cancel: 1,
									go: {
										t: 4,
										url: "/yb_wm/index/my-index"
									},
								}
							}))
						})
						this.loading = false
					}
				}
			},
			trigger(e) {
				this.go({
					t: 3,
					url: e.item.url
				})
				console.log(e);
			},
		},
		onAddToFavorites(res) {
			// console.log('WebviewUrl: ', res.webviewUrl)
			return {
				title: this.system.shareTitle,
				imageUrl: this.system.shareIcon,
				// query: 'name=xxx&age=xxx',
			}
		}
	}
</script>

<style scoped lang="scss">
	.rwimg {
		width: 216rpx;
		height: 208rpx;
		bottom: 50rpx;
	}

	.remain {
		margin: 0 0rpx;
	}

	.topc {
		padding: 55rpx 48rpx 130rpx;
	}

	.jyjl {
		right: 30rpx;
		top: 30rpx;
	}

	.img {
		width: 120rpx;
		height: 120rpx;
	}

	.bdc {
		margin-top: -70rpx;
		border-radius: 50rpx 50rpx 0 0;
		padding: 0 40rpx 50rpx;

		.ml15 {
			margin-left: 15rpx;
		}

		.srk {
			height: 70rpx;
			width: 60%;
		}
	}

	.ckic {
		width: 47%;
		margin-top: 45rpx;
		height: 180rpx;
		border: 1px solid #F5F5F5;
		// box-shadow: 0rpx 5rpx 18rpx 3rpx #EFEFEF;
	}

	.hx {
		width: 55%;
		height: 1px;
		background: #eee;
	}

	.reqnr {
		margin-top: 45rpx;
		padding: 30rpx 30rpx 30rpx 90rpx;
	}

	.foot-btn {
		width: 280rpx;
		height: 76rpx;
		line-height: 76rpx;
		border-radius: 60rpx;
	}
</style>
