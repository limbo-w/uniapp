<template>
	<view class="pb115" :class="showCoupon||showCancel?'bgfix':''">
		<nav-tab cname="fixedtop" v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<view class="p253 bf5 ft" v-if="labelArr.length">
			<scroll-view class='ws-n ipolcs f-y-c' scroll-x='true'>
				<block v-for="(v,i) in labelArr" :key="i">
					<bk-b @tab='lTab(i)' :c-name="`f-g-0 dis-in mr20 bs60 ${i!=laIdx&&'c3'}`" :color="i==laIdx?tColor:'#F1F2F3'"
					 :sname="{padding:'10rpx 30rpx',minWidth:'140rpx'}" :t='v'></bk-b>
				</block>
			</scroll-view>
		</view>
		<view class="ipomt p3">
			<view v-for="(v,i) in dataList" :key='i' class="bs30 bf mb30">
				<mg-cell cname="p253" noc='1' isr='1'>
					<view slot='bd' class="f-y-c">
						<view class="mrltc bsf f-c mr15" :style="{background:cTRld(tColor, 0.3)}">
							<text class="iconfont iconmd cf f28"></text>
						</view>
						<view class="flex-1">
							<view class="f-x-bt">
								<view class="f-y-c" @click.stop='gosjDL'>
									<text class='t-o-e f28'>{{v.storeName}}</text>
									<!-- <text class="iconfont iconright c0 f24"></text> -->
								</view>
							</view>
						</view>
						<view class="f-g-0 ml10" :style="{color:stateColor(v.state)}">{{`${getState(v.state)}`}}</view>
					</view>
				</mg-cell>
				<mg-cell last='1' cname="p23" noc='1' :img='v.logo' w="110" h="110" brs='10rpx'>
					<view class="" slot='bd'>
						<view class=" wei">
							<view>寄存品牌：{{v.name}}</view>
						</view>
						<view class=" mt10 c6">
							<blcok v-if="v.type=='1'">
								<view>订单编号：{{v.outTradeNo}}</view>
								<view>联系名称：{{v.userName}}</view>
								<view>联系电话：{{v.userTel}}</view>
								<view>寄存时间：{{timeToDate(v.createdAt)}}</view>
								<view>过期时间：{{timeToDate(v.endAt)}}</view>
								<view>寄存数量：{{v.totalNum}}</view>
								<view>寄存剩余：{{v.totalNum-v.takeNum}}</view>
								<view v-if="v.note">订单备注：{{v.note}}</view>
							</blcok>
							<blcok v-else>
								<view>订单编号：{{v.outTradeNo}}</view>
								<view>联系名称：{{v.userName}}</view>
								<view>联系电话：{{v.userTel}}</view>
								<view>领取时间：{{timeToDate(v.createdAt)}}</view>
								<view>领取数量：{{v.takeNum}}</view>
								<view>寄存剩余：{{v.surplusNum}}</view>
							</blcok>
						</view>
					</view>
				</mg-cell>
				<view v-if="v.state==2&&v.type=='1'" class="p23">
					<view class="f-row">
						<!-- <view class="f-g-0 f-y-c c9">
							<text class="iconfont iconmd mr10"></text>
							<text>预约订单</text>
						</view> -->
						<view class="f-g-1 f-x-e">
							<view @click="lqjc(v)" class="obtn b-d">领取</view>
						</view>
					</view>
				</view>
			</view>
			<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		</view>
		<mg-modal :vs='true' :ismr="true" v-model="showCancel" width="600rpx" :z-index="3000">
			<view class="bs10 bf p-r">
				<view class="p20 ggh f-c f32">
					<view class="t-o-e t-c" style="width: 80%;">领取寄存</view>
				</view>
				<mg-input cname="p23" t='number' v-model="lqsl" isr='1' ht='领取数量' htc='f30' :pr='`请输入领取数量`' icn='f30' />
				<button @click="save" :disabled="loading" :loading="loading" class="foot-btn3 w33 cf" style="margin: 30rpx auto;"
				 hover-class="btnhc" :style="{background:tColor}">确定</button>
			</view>
		</mg-modal>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	import TabBar from '@/components/common/tabbar.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import bkB from '@/components/common/block-b.vue'
	import mgModal from '@/components/common/modal.vue'
	import mgInput from '@/components/form/mg-input.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'orderIndex',
		components: {
			navTab,
			jzz,
			TabBar,
			bkB,
			MgCell,
			mgModal,
			mgInput,
		},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '寄存记录',
					type: 1
				}, {
					name: '领取记录',
					type: 2
				}],
				laIdx: 0,
				labelArr: [],
				dataList: [],
				isget: false,
				mygd: false,
				params: {
					userId: '',
					size: 10,
					page: 1,
					state: '', //1未付款,2已付款,3已接单
				},
				iparams: {
					state: ''
				},
				lqsl: '',
				showCancel: false,
				loading: false,
				yyArr: [],
				yyradio: "",
				stateArr: ['', '审核中', '存储中', '已拒绝', '已失效'],
				qstateArr: ['', '待确认', '已完成', ]
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('我的寄存')
			await this.getLoginInfo()
			this.params.userId = this.user.id || ''
			this.aIdx = +options.idx || 0
			this.changeTab(this.aIdx)
		},
		onReachBottom() {
			if (!this.mygd && this.isget) {
				this.isget = false
				this.getList();
			}
		},
		async onShow() {},
		mixins: [utilMixins],
		computed: {
			...mapState('dndc', ['dcConfig']),
		},
		methods: {
			...mapActions(["getConfig"]),
			...mapActions('dndc', ['getPayConfig']),
			stateColor(v) {
				let color = ''
				switch (+v) {
					case 2:
						color = this.tColor;
						break;
					case 3:
						color = '#f00';
						break;
					default:
						color = '#999';
				}
				return color
			},
			getState(n) {
				if (this.aIdx == 0) {
					return this.stateArr[n]
				} else {
					return this.qstateArr[n]
				}
			},
			lqjc(v) {
				this.showCancel = true
				this.xzinfo = v
			},
			async save() {
				if (this.lqsl.trim() == '') return this.util.message('请输入数量', 3)
				this.loading = true
				let res = await this.util.request({
					'url': this.api.jcqj,
					method: 'POST',
					mask: 1,
					data: {
						takeNum: this.lqsl,
						id: this.xzinfo.id
					},
				})
				if (res) {
					this.util.message('保存成功', 1, 1000)
					this.showCancel = false
					this.refresh();
				}
				this.loading = false
			},
			refresh() {
				this.changeTab(this.aIdx)
			},
			changeTab(e) {
				this.laIdx = 0;
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.size = 10
				this.dataList = []
				switch (this.tabs[e].type) {
					case 1:
						this.labelArr = ['寄存记录', '审核中', '存储中', '已失效']
						this.params.api = 'jclb'
						this.params.type = 1
						this.iparams = {
							state: ''
						}
						break;
					case 2:
						this.labelArr = ['领取记录', '待确认', '已完成']
						this.params.api = 'jclb'
						this.params.type = 2
						this.iparams = {
							state: ''
						}
						break;
				}
				this.getList()
			},
			lTab(e) {
				this.laIdx = e
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.size = 10
				this.dataList = []
				if (this.aIdx == 0) {
					let state = ''
					switch (e) {
						case 0:
							state = '';
							break;
						case 1:
							state = '1';
							break;
						case 2:
							state = '2';
							break;
						case 3:
							state = '4';
							break;
					}
					this.iparams.state = state
				} else if (this.aIdx == 1) {
					let state = ''
					switch (e) {
						case 0:
							state = '';
							break;
						case 1:
							state = '1';
							break;
						case 2:
							state = '2';
							break;
					}
					this.iparams.state = state
				}
				this.getList()
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api[this.params.api],
					data: { ...this.params,
						...this.iparams
					},
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
		},
	}
</script>
<style scoped lang="scss">
	.ipolcs {
		height: 65rpx;
	}

	.ipomt {
		margin-top: 186rpx;
	}

	.mrltc {
		width: 50rpx;
		height: 50rpx;
	}

	.b-l-yy {
		background: linear-gradient(to bottom, #05CBE0, #02AABA);
	}

	.ft {
		position: fixed;
		top: 97rpx;
		z-index: 9;
		min-width: 100%;
		background-color: #F5F5F5;
	}
</style>
