<template>
	<view v-show="yyxx.set" class="bf9 mvh100 pb130">
		<view class="main">
			<view class="bf bs20 b-s">
				<mg-input @tab="go({url:'index?change=1&storeId='+params.storeId})" last='1' isr='1' dis='1' v-model="params.ydxx"
				 pr='请修改预定信息' icn='f30' iconn='iconbianji'>
					<view slot='ft' :style="{color:tColor}">修改</view>
				</mg-input>
			</view>
			<view class="bf bs20 b-s mt30">
				<mg-input isr='1' v-model="params.userName" pr='请填写联系人姓名' icn='f30' iconn='iconwd f34'>
					<view slot='ft' class="c3 f30">
						<mg-radio v-model="params.sex" :arr='sexArr' :rsname="{padding:'0 0 0 30rpx'}"></mg-radio>
					</view>
				</mg-input>
				<mg-input isr='1' v-model="params.userTel" :max='11' t='number' pr='请输入手机号' icn='f30' iconn='icondh4 f34'>
					<view slot='hd' class="f-y-c sjhqh hlr">
						<text>+86</text>
						<text class="iconfont icondown c3 f28 ml5"></text>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<sq-btn v-if="!user.userTel" slot='ft' @refresh='setTel' type="2" cname="text-btnf f24 ml20 p0 b00" w='120' h='50'
					 t='自动填写'></sq-btn>
					<!-- #endif -->
				</mg-input>
				<mg-input last='1' isr='1' v-model="params.note" max='25' pr='如有其它需求,请备注说明' icn='f30' iconn='icondd'>
					<view slot='ft'>{{params.note.length}}/25</view>
				</mg-input>
			</view>
			<view v-if="params.xzyy&&params.xzyy[4].value.money>0" class="bf bs20 b-s mt30 p23 l-n">
				<view class="f30 wei mb15">定金说明</view>
				<mg-rtext type='2' :content="yyxx.set.introduction" />
			</view>
		</view>
		<view class="foot-btnc bf9">
			<block v-if="params.xzyy&&params.xzyy[4].value.money>0">
				<view class="p-a ydjc bf f24">
					<view class="f-y-c">距离就餐时间不足{{yyxx.set.cancelTime}}分钟，商家接单后支付金额无法返还</view>
					<view class="p-a xxsj"></view>
				</view>
				<view class="yd2 f-y-c">
					<view class="f-1 ml20">
						<view class="f-row f-y-e wbba" :style="{color:tColor}">
							<text>{{sl}}</text>
							<text class="f34 wei ml5">{{params.xzyy[4].value.money}}</text>
						</view>
						<view class="f22 c9">支付即表示您已同意上述规则说明</view>
					</view>
					<button @click="save" :loading="loading" :disabled="loading" class="yd2r f34 f-c cf" :style="{background:tColor}">立即支付</button>
				</view>
			</block>
			<block v-else>
				<button @click="save" :loading="loading" :disabled="loading" class="foot-btn" :style="{background:tColor}"
				 hover-class="btnhc">立即预约</button>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import mgInput from '@/components/form/mg-input.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import mgRadio from '@/components/form/mg-radio.vue'
	import bkB from '@/components/common/block-b.vue'
	import sqBtn from '@/components/common/sq-btn.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue';
	import utils from '@/common/utils.js'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'reserve-ljyy',
		components: {
			mgInput,
			mgRadio,
			MgCell,
			bkB,
			sqBtn,
			mgRtext
		},
		data() {
			return {
				yyxx: {},
				params: {
					userId: '',
					region: '',
					storeId: '',
					people: '',
					serviceAt: '',
					userName: '',
					userTel: '',
					sex: '男',
					note: '',
					ydxx: '',
				},
				sexArr: [{
						value: '女',
						name: '女士'
					},
					{
						value: '男',
						name: '先生',
						checked: 'true'
					}
				],
				loading: false,
				isbj: false,
			}
		},
		async onLoad(options) {
			this.util.setNT('预定')
			this.params.storeId = options.storeId
			// console.log(this.params.storeId)
			this.getSystem({
				nosetNB: 1
			})
			this.getLoginInfo().then(() => {
				this.params.userId = this.uId
				this.params.userTel = this.user.userTel || ''
			})
			this.getData()
		},
		onShow() {
			this.params.ydxx = uni.getStorageSync('bdhc').map(v => v.name).join('，').replace('，', ' ').replace('，', ' ')
			this.params.xzyy = uni.getStorageSync('bdhc')
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				jbset: state => state.config.jbset,
			}),
		},
		methods: {
			...mapActions(["getConfig"]),
			async getData() {
				let data = uni.getStorageSync('fwb')
				this.yyxx = data
			},
			setTel(e) {
				this.params.userTel = e
			},
			// ljyy() {
			// 	this.go({
			// 		url: 'yyxq'
			// 	})
			// },
			async save() {
				if (!this.params.xzyy) return this.util.message('请完善预定信息', 3)
				this.params.region = this.params.xzyy[4].value.id
				this.params.people = this.params.xzyy[3].value
				this.params.serviceAt = this.params.xzyy[0].value + ' ' + this.params.xzyy[2].value
				// console.log(this.params)
				let filterArr = ['people', 'serviceAt', 'note']
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						userId: '缺少用户id',
						region: 'region',
						storeId: '缺少商家id',
						userName: '请填写联系人姓名',
						userTel: '请填写手机号',
					}
				})
				if (!judgeData) {
					return
				} else {
					if (!utils.isTelCode(this.params.userTel)) return this.util.message('请输入正确的手机号', 3)
					this.loading = true
					// await this.requestSM('vip')
					let orderRes = await this.util.request({
						'url': this.api.yyxd,
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!orderRes) {
						this.loading = false
					} else {
						this.util.message('提交成功', 1, 1000)
						uni.removeStorageSync('bdhc');
						setTimeout(() => {
							if (this.params.xzyy[4].value.money > 0) {
								this.go({
									t: 2,
									url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
										orderId: orderRes.data,
										orderType: 9,
										userId: this.uId,
										info: {
											money: this.params.xzyy[4].value.money,
											type: "下单支付",
											cancel: 1,
											go: {
												t: 6,
												url: '/yb_wm/index/order-index',
											},
										}
									}))
								})
							} else {
								this.go({
									t: 2,
									url: '/yb_wm/shop/reserve/yyxq?id=' + orderRes.data,
								})
							}
						}, 1000)
					}
				}
			},
		}
	}
</script>
<style scoped lang="scss">
	.pb130 {
		padding-bottom: 200rpx;
	}

	.main {
		padding: 30rpx;
	}

	.b-s {
		box-shadow: 5rpx 5rpx 8rpx 3rpx rgba(221, 221, 221, 0.5)
	}

	.sjhqh {
		padding-right: 30rpx;
		margin-right: 30rpx;
	}

	.hlr::after {
		border-color: #BBBBBB;
	}

	.ydjc {
		top: 10rpx;
		transform: translateY(-100%);
		padding: 20rpx 40rpx;
		border-radius: 60rpx;
	}

	.xxsj {
		bottom: -20rpx;
		left: 30rpx;
		width: 0;
		height: 0;
		border-width: 30rpx 30rpx 0;
		border-style: solid;
		border-color: #fff transparent transparent;
	}

	.yd2r {
		width: 250rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
