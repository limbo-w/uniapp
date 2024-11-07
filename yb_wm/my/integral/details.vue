<template>
	<view class="pb130">
		<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
		<view class='p3 bf mb20'>
			<view class="f-x-bt">
				<view class='t-o-e f34 wei'>{{dlDatl.name}}</view>
			</view>
			<view class="f-bt mt10">
				<view class='cfa f30 mb10' :style="{color:tColor}">
					<view>
						<text v-if="dlDatl.score>0">{{dlDatl.score}}</text>
						<text v-if="dlDatl.score>0" class="f22 nowei c9">{{jfName}}</text>
						<text v-if="dlDatl.score>0 && dlDatl.money>0" class="nowei c9">+</text>
						<text v-if="dlDatl.money>0">{{dlDatl.money}}<text class="f22 c9">{{dw}}</text></text>
					</view>
					<view v-if="dlDatl.type==1" class="t-o-e t-d-l c9 f22 wei4">{{sl+dlDatl.price}}</view>
					<!-- <view v-else class="f-y-c c9 f22 nowei">红包金额：{{dlDatl.price}}</view> -->
				</view>
				<view>
					<view class="f24 c9" v-if="dlDatl.stock-dlDatl.convertNum>-1">剩余{{dlDatl.stock-dlDatl.convertNum}}件</view>
					<!-- <view class="f24 c9 t-r">库存：{{dlDatl.stock}}</view> -->
				</view>
			</view>
		</view>
		<view class="bf p3">
			<view class="f32 wei">商品详情</view>
			<view v-if="dlDatl.notice" class="mt30">
				<mg-rtext type='2' :content="dlDatl.notice" />
			</view>
		</view>

		<view class="dbbtnc" :style="{bottom: isIpx?'40rpx':0}">
			<view class="dbbtn">
				<button @click="ljdh" class="rt f-c" :style="{background:tColor}">立即兑换</button>
			</view>
		</view>
		<view v-if="isIpx" class='bgf'></view>
		<mg-popup v-model="showTime">
			<view class="bf c3 bs2000">
				<view class='f24 p3 pb0 bor-b'>
					<view class="bf cout f-row pb30">
						<view class="f-g-0 coutl mr30">
							<view class="imgw bs10 bf7">
								<mg-img :src="dlDatl.icon" />
							</view>
						</view>
						<view class="f-g-1 f-y-bt">
							<view class="wei4 f32 t-o-e c3">{{dlDatl.name}}</view>
							<view class="f-x-bt mt20 cf7 f36 wei4">
								<view class="cfa" :style="{color:tColor}">
									<text v-if="dlDatl.score>0" class="">{{dlDatl.score}}</text>
									<text v-if="dlDatl.score>0" class="f22 nowei c9">{{jfName}}</text>
									<text v-if="dlDatl.score>0 && dlDatl.money>0" class="nowei c9">+</text>
									<text v-if="dlDatl.money>0">{{dlDatl.money}}<text class="f22 c9">{{dw}}</text></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="f-x-bt p3 bor-b" v-if="dlDatl.type==1">
					<view class="f28 wei4">配送方式</view>
					<view>
						<view class="bf f-x-bt">
							<view @click="clickMode(v)" v-for="(v,i) in ModeArr" :key='i' class="pstypec f-c ml30" :style="{color:v.value==params.deliveryMode?tColor:'',borderColor:v.value==params.deliveryMode?tColor:''}">
								<text class="iconfont f28 mr10" :class="[v.icon]" :style="{color:v.value==params.deliveryMode?tColor:''}"></text>
								<text class="f24">{{v.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<block v-if="dlDatl.type==1">
					<get-address mw=' ' v-if="params.deliveryMode==1" :ptype='2' :address='wmAddress' color="#333"></get-address>
					<get-ztjf v-if="params.deliveryMode==2" :address='ziAddress' @ztshow='ztshow'></get-ztjf>
				</block>
				<view class="f-x-bt p3 bor-t">
					<view class="f28 wei4">兑换数量</view>
					<view>
						<number-box :min="1" :max="maxNum" @change="bindChange"></number-box>
					</view>
				</view>
				<view v-if="params.deliveryMode==1&&dlDatl.type==1" class="f-x-bt p3 bor-b bor-t">
					<view class="f28 wei4">配送运费</view>
					<view>{{sl+dlDatl.deliveryMoney}}</view>
				</view>
				<view class="p3 f28 t-r">
					<view>共{{params.convertNum}}份，合计
						<text v-if="dlDatl.score>0" class="cfa">{{xjMoney.totalScore}}</text>
						<text v-if="dlDatl.score>0">{{jfName}}</text>
						<text v-if="dlDatl.score>0 && dlDatl.money>0">+</text>
						<text v-if="dlDatl.money>0" class="cfa">{{sl+xjMoney.total}}</text>
					</view>
				</view>
				<view class="p3" :class="{mb30:isIpx}">
					<button :disabled="loading" :loading="loading" @click="qrdh" :style='{background:tColor}' class="w100 cf f34 qrdh">确认兑换</button>
				</view>
			</view>
		</mg-popup>
		<!-- 自提列表弹窗 -->
		<zi-list :co='zitiList' @chooseAdd='chooseAdd' v-model="showGg"></zi-list>
		<load v-if="showLoading"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	import utils from '@/common/utils.js'
	import mgPopup from '@/components/common/popup.vue'
	import getAddress from '@/components/address/get-address.vue'
	import getZtjf from '@/components/address/get-ztjf.vue'
	import ziList from './zi-list.vue'
	import numberBox from "@/components/form/number-box.vue"
	import load from '@/components/common/load.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'js-details',
		components: {
			MgSwiper,
			mgRtext,
			mgPopup,
			getAddress,
			getZtjf,
			ziList,
			numberBox,
			load,
		},
		data() {
			return {
				swiper: {
					class: '',
					padding: 0,
					swiper: [{
						icon: ''
					}],
					duration: '',
					mode: '',
					height: '500',
					radius: '0',
					auto: true,
					interval: 5,
				},
				showLoading: true,
				loading: false, //加载
				payObj: {},
				showTime: false, //底部弹出层
				wmAddress: '', //收货地址
				ziAddress: '', //自提地址
				params: {
					selfId: '', //自提id
					goodsId: '', //商品Id
					convertNum: '1', //兑换数量
					deliveryMode: '', //1快递2到店
					userAddId: '', //快递id
				},
				dlDatl: '',
				config: '',
				ModeArr: [],
				showGg: false,
				zitiList: {}, //自提点弹窗信息
				maxNum: 1,
			}
		},
		async onLoad(options) {
			let id
			if (options.scene) {
				id = decodeURIComponent(options.scene)
			} else {
				id = options.id
			}
			this.id = id
			this.getSystem()
			this.util.setNT(this.jfName + '商城-商品详情')
			// this.getConfig()
			this.getData()
			uni.$on('changeChoose', (e) => {
				if (e.hasOwnProperty('addInfo')) {
					this.refreshAddress(e.addInfo)
				}
				// console.log('changeChoose', e)
			})
			console.log('%c options ',
				'color: white; background-color: #2274A5', options);
		},
		onUnload() {
			uni.$off('changeChoose');
		},
		mixins: [utilMixins],
		computed: {
			jfName() {
				return this.system.custom.integral
			},
			xjMoney() {
				if (this.dlDatl) {
					let num = +this.params.convertNum,
						score = +this.dlDatl.score,
						money = +this.dlDatl.money,
						yf = +(this.params.deliveryMode == 1 && this.dlDatl.type == 1 ? this.dlDatl.deliveryMoney || 0 : 0),
						total = 0,
						totalScore = 0
					total = +(num * money + yf).toFixed(2) //总金额
					totalScore = num * score //总
					// console.log(total, totalScore)
					return {
						total,
						totalScore
					}
				}
			},
		},
		methods: {
			async getConfig() {
				let {
					data
				} = await this.util.request({
					'url': this.api.config,
					data: {
						ident: 'integral'
					}
				})
				this.config = data
			},
			async getData() {
				//获取商品详情
				let {
					data
				} = await this.util.request({
					'url': this.api.jfspxq,
					mask: 1,
					data: {
						id: this.id
					},
				})
				this.swiper.swiper[0].icon = data.icon
				this.dlDatl = data
				await this.getLoginInfo()
				this.getziList()
				this.maxNum = data.stock
				this.params.goodsId = data.id
				if (data.deliveryMode.indexOf(1) > -1) {
					this.ModeArr.push({
						icon: 'iconddys',
						name: '快递配送',
						value: '1',
					})
				}
				if (data.deliveryMode.indexOf(2) > -1) {
					this.ModeArr.push({
						icon: 'iconshangjia',
						name: '到店自取',
						value: '2',
					})
				}
				if (this.ModeArr.length == 1 && data.deliveryMode.indexOf(2) > -1) {
					this.params.deliveryMode = 2
				} else {
					this.params.deliveryMode = 1
				}
				//如果兑换类型type为1为实物兑换，deliveryMode==1为快递发货
				//获取到详情数据或打开遮罩
				this.showLoading = false
			},
			//获取地址
			async getziList() {
				if (this.dlDatl.type == '1') {
					//收货地址
					let res1 = await this.util.request({
						'url': this.api.wdshdz,
					})
					if (res1.data.length > 0) {
						this.wmAddress = res1.data[0]
					}
					//自提地址
					let res = await this.util.request({
						'url': this.api.jfscztlb,
					})
					this.zitiList = res.data
					this.ziAddress = res.data[0]
				}
			},
			refreshAddress(e) {
				this.wmAddress = e
			},
			//自提列表显示
			ztshow(e) {
				this.showGg = true
			},
			//自提列表选择
			chooseAdd(v) {
				this.ziAddress = v
				console.log('chooseAdd', this.ziAddress)
			},
			//选择快递配送还是到店自取
			clickMode(v) {
				this.util.showLoading('设置中...')
				this.params.deliveryMode = v.value
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
				console.log(v.name)
			},
			//商品数量加减
			bindChange(value) {
				console.log('Changenum', value)
				this.params.convertNum = value
				// if (value>this.maxNum) {
				// 	return this.util.message('超出库存限制', 3)
				// }
			},
			//点击立即兑换
			async ljdh() {
				this.showTime = true
			},
			//确认兑换提交
			async qrdh() {

				// deliveryMode == 1是快递发货
				//dlDatl.type=='2'是虚拟兑换
				if (this.dlDatl.type == '2') {
					this.params.selfId = ''
					this.params.userAddId = ''
				} else {
					if (this.params.deliveryMode == '1') {
						// console.log('收货地址', this.wmAddress)
						if (!this.wmAddress) {
							return this.util.message('请选择收货地址后下单', 3)
						}
						this.params.userAddId = this.wmAddress.id
						this.params.selfId = ''
					} else {
						// console.log('自提地址', this.zitiList, this.ziAddress)
						if (!this.ziAddress) {
							return this.util.message('请选择自提地址后下单', 3)
						}
						this.params.userAddId = ''
						this.params.selfId = this.ziAddress.id
					}
				}
				// console.log('%c options ',
				// 	'color: white; background-color: #2274A5', this.params);
				// return
				this.loading = true
				let orderRes = await this.util.request({
					'url': this.api.jfspxd,
					method: 'POST',
					mask: '下单中',
					data: this.params,
				})
				// console.log('ljdh orderRes', orderRes, this.xjMoney.total, this.xjMoney.totalScore)
				if (orderRes) {
					// console.log('有现金兑换', orderRes, this.xjMoney.total)
					this.util.message('提交成功', 1, 1000)
					utils.stfn(() => {
						if (this.xjMoney.total > 0) {
							this.go({
								t: 2,
								url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
									orderId: orderRes.data,
									orderType: 3,
									info: {
										money: this.xjMoney.total,
										type: "下单支付",
										cancel: 1,
										go: {
											t: 2,
											url: "/yb_wm/my/integral/integral-record"
										},
									}
								}))
							})
						} else {
							this.go({
								t: 2,
								url: `/yb_wm/my/integral/integral-record`,
							})
						}
					})
				} else {
					this.loading = false
				}
			},

		},
		// onShareAppMessage() {
		// 	return {
		// 		title: this.co.name,
		// 		imageUrl: this.getSingleImg(this.co.media[0]),
		// 	}
		// },
	}
</script>

<style scoped lang="scss">
	.bor-b {
		border-bottom: 1px solid #EFF3F6;
	}

	.bor-t {
		border-top: 1px solid #EFF3F6;
	}

	.dbbtnc {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 30rpx;

		.dbbtn {
			height: 96rpx;
			border-radius: 90rpx;
			overflow: hidden;
			display: flex;
			box-shadow: 0rpx 8rpx 18rpx 5rpx rgba(221, 221, 221, 0.9);

			.rt {
				color: #fff;
				width: 100%;
				height: 100%;
				border-radius: 0;
				font-size: 34rpx;
				padding: 0;
			}
		}
	}

	.imgw {
		width: 130rpx;
		height: 130rpx;
	}

	.pstypec {
		width: 180rpx;
		height: 58rpx;
		border: 1rpx solid #ddd;
		border-radius: 28px;
	}

	.qrdh {
		border-radius: 48rpx;
	}
</style>
