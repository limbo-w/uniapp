<template>
	<view class="mvh100 pb130">
		<nav-tab  cname="" ifsize='32' v-model="tIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<block v-if="tIdx==0">
			<view v-if="notice" class="p230">
				<view class="p03 bs60 f-y-c" :style="{background:tbgo}">
					<text class="iconfont iconsgg cf f36" :style="{color:tColor}"></text>
					<view class="f-1">
						<uni-notice-bar :scrollable="true" :single="true" :color="tColor" backgroundColor="transparent" :text="notice"
						 :speed='25' />
					</view>
				</view>
			</view>
			<view class="yd1">
				<scroll-view scroll-with-animation scroll-x="true" class='ws-n ydsv' :scroll-into-view="siv1">
					<view :id='`v1${i}`' class="dis-in svic" v-for="(v,i) in arr1" :key="i" @click='click1(i)'>
						<view class="svitem f-c-c" :class="{'wei':i==aIdx1}" :style="{color:i==aIdx1?tColor:'',background:i==aIdx1?tbgo:'',}">
							<view>{{v}}人</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-with-animation scroll-x="true" class='ws-n ydsv' :scroll-into-view="siv2">
					<view class="f-row">
						<view :id='`v2${i}`' class="svic" v-for="(v,i) in arr2" :key="i" @click='click2(i)'>
							<view class="svitem f-c-c" :class="{'wei':i==aIdx2}" :style="{color:i==aIdx2?tColor:'',background:i==aIdx2?tbgo:'',}">
								<view :style="{color:v.isAppointment==2?'#999':''}">{{v.day}}</view>
								<view :style="{color:v.isAppointment==2?'#999':''}" class="f20 nowei">{{v.isAppointment==2?'不可订':v.weekName}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-with-animation scroll-x="true" class='ws-n ydsv' :scroll-into-view="siv3">
					<view :id='`v3${i}`' class="dis-in svic" v-for="(v,i) in arr3" :key="i" @click='click3(i)'>
						<view class="svitem f-c-c" :class="{'wei':i==aIdx3}" :style="{color:i==aIdx3?tColor:'',background:i==aIdx3?tbgo:'',}">
							<view>{{v}}</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-with-animation scroll-x="true" class='ws-n ydsv' :scroll-into-view="siv4">
					<view class="f-row">
						<view :id='`v4${i}`' class="svic" v-for="(v,i) in arr4" :key="i" @click='click4(i)'>
							<view class="svitem f-c-c" :class="{'wei':i==aIdx4}" :style="{color:i==aIdx4?tColor:'',background:i==aIdx4?tbgo:'',}">
								<view :style="{color:v.minNum>peopleNum||v.maxNum<peopleNum?'#999':''}">{{v.name}}</view>
								<view :style="{color:v.minNum>peopleNum||v.maxNum<peopleNum?'#999':''}" class="f20 nowei">{{regionText(v)}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="xzyy" class="foot-btnc">
				<view v-if="aIdx4>-1&&arr4[aIdx4].money>0" class="p-a ydjc bf f24">
					<view class="f-y-c">每单需预付{{sl+arr4[aIdx4].money}} 订金<text class="iconfont iconwen f26 c3 ml10"></text></view>
					<view class="f20 c9">若不能及时到店，就餐前{{yyxx.set.cancelTime}}分钟可取消订单</view>
					<view class="p-a xxsj"></view>
				</view>
				<view class="yd2 f-row cf" :style="{background:`linear-gradient(90deg,rgba(${cTR(tColor)},0.65),${tColor})`}">
					<view class="f-1 o-x-s f-y-c yd2l">
						<text class="f-g-0 mr10">{{xzyy[0].name}}</text>
						<text class="f-g-0 mr10">{{xzyy[1].name}}</text>
						<text class="f-g-0">{{xzyy[2].name}}，</text>
						<text class="f-g-0">{{xzyy[3].name}}，</text>
						<text class="f-g-0">{{xzyy[4].name}}</text>
					</view>
					<view @click="ljdz" class="yd2r f34 f-y-c b-r-d">立即订座</view>
				</view>
			</view>
		</block>
		<view class="mt10 p2">
			<block v-if="tIdx==1">
				<dn-order @refresh='dnrefresh' v-model='laIdx' :labelarr='labelArr'
					:otype="tntabs[0].type" :datalist="dataList"></dn-order>
				<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' otext='您今天还没有预约订单'
						ttext='快去预约吧' />
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniNoticeBar from '@/components/third/uni-notice-bar.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import utils from '@/common/utils.js'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import dnOrder from '../../index/components/dn-order.vue'
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'reserve-index',
		components: {
			uniNoticeBar,
			navTab,
			dnOrder,
			jzz,
		},
		data() {
			return {
				yyxx: {},
				arr1: [],
				aIdx1: 0,
				arr2: [],
				aIdx2: 0,
				aIdx3: 0,
				arr4: [],
				aIdx4: 0,
				siv1: '',
				siv2: '',
				siv3: '',
				siv4: '',
				notice: '',
				tIdx:0,
				tabs:[
					{
						name:'餐桌预定'
					},
					{
						name:'我的预定'
					},
				],
				labelArr: [],
				tntabs: [{
					name: '预约',
					type: 3,
				}],
				dataList: [],
				laIdx: 0,
				isget: false,
				mygd: false,
				params: {
					size: 10,
					page: 1,
				},
			}
		},
		onLoad(options) {
			this.query = options
			this.storeId = utils.getOptions(options, {
				key: 'storeId',
				q1: this.storeInfo.id,
			})
			// console.log(this.storeId, options)
			this.getSystem({
				nosetNB: 1,
			})
			this.getData()
			this.util.setNT('餐桌预定')
			this.changeTab(this.tIdx)
			// this.util.request({
			// 	'url': this.api.StoreInfo,
			// 	data: {
			// 		storeId: this.storeId,
			// 	}
			// }).then(res => {
			// 	this.util.setNT(res.data.storeInfo.name)
			// })
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				storeInfo: state => state.config.storeInfo,
			}),
			tbgo() {
				return `rgba(${this.cTR(this.tColor)},0.13)`
			},
			peopleNum() {
				return this.arr1[this.aIdx1]
			},
			arr3() {
				return this.arr2.length ? this.arr2[this.aIdx2].timesArr : []
			},
			xzyy() {
				if (this.arr4.length) {
					return [{
							value: this.arr2[this.aIdx2].time,
							name: this.timeToDate(this.dateToTime(this.arr2[this.aIdx2].time), "MM月dd日")
						},
						{
							name: this.arr2[this.aIdx2].day.indexOf('-') > -1 ? this.arr2[this.aIdx2].weekName : this.arr2[this.aIdx2].day
						},
						{
							value: this.arr3[this.aIdx3],
							name: this.arr3[this.aIdx3]
						},
						{
							value: this.arr1[this.aIdx1],
							name: this.arr1[this.aIdx1] + '人'
						},
						{
							value: this.arr4[this.aIdx4],
							name: this.arr4[this.aIdx4] && this.arr4[this.aIdx4].name || ''
						}
					]
				}
			},
		},
		methods: {
			changeTab(e) {
				this.laIdx = 0
				this.isget = this.mygd = false
				this.params.page = 1
				if (this.tIdx == 1) {
					this.labelArr = []
					this.params.api = 'wdyy'
					this.iparams = {}
					this.dataList = []
					this.getList()
				}
			},
			refresh() {
				this.changeTab(this.tIdx)
			},
			dnrefresh(e) {
				if (e.hasOwnProperty('state')) {
					this.iparams.state = e.state
					this.isget = this.mygd = false
					this.params.page = 1
					this.dataList = []
					this.getList()
				} else {
					this.refresh();
				}
			},
			onReachBottom: utils.debounce(function(e) {
				if (!this.mygd && this.isget) {
					this.isget = false
					this.getList();
				}
			}, 300),
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api[this.params.api],
					method: 'POST',
					data: {
						...this.params,
						...this.iparams
					},
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			async getData() {
				let {
					data
				} = await this.util.request({
					'url': this.api.yyxx,
					method: 'POST',
					data: {
						storeId: this.storeId,
					},
				})
				this.yyxx = data
				uni.setStorageSync('fwb', data)
				this.notice = data.set.notice
				for (let i = 1; i <= data.set.maxNum; i++) {
					if (i >= data.set.minNum) {
						this.arr1.push(i)
					}
				}
				this.arr2 = data.daysArr
				this.aIdx2 = this.arr2.findIndex(v => v.isAppointment == 1)
				this.arr4 = data.region
				this.getaIdx4()
			},
			getaIdx4() {
				this.aIdx4 = this.arr4.findIndex(v => this.peopleNum >= v.minNum && this.peopleNum <= v.maxNum)
				this.siv4 = `v4${this.aIdx4-2<0?0:this.aIdx4-2}`
				// console.log(this.peopleNum, this.aIdx4)
			},
			regionText(v) {
				return v.minNum > this.peopleNum ? `${v.minNum}人起订` : v.maxNum < this.peopleNum ? `最多${v.maxNum}人` : ''
			},
			click1(e) {
				this.aIdx1 = e
				this.siv1 = `v1${e-2}`
				this.getaIdx4()
				// console.log(e)
			},
			click2(e) {
				if (this.arr2[e].isAppointment != 1) return
				this.aIdx2 = e
				this.siv2 = `v2${e-2}`
				this.aIdx3 = 0
				this.siv3 = `v3${0}`
				// console.log(e)
			},
			click3(e) {
				this.aIdx3 = e
				this.siv3 = `v3${e-2}`
				// console.log(e)
			},
			click4(e) {
				// 人数限制不可选
				if (this.arr4[e].minNum > this.peopleNum || this.arr4[e].maxNum < this.peopleNum) return
				this.aIdx4 = e
				this.siv4 = `v4${e-2}`
				// console.log(e)
			},
			ljdz() {
				if (this.aIdx2 == -1 || this.aIdx4 == -1) return this.util.message('请选择预定区域', 3)
				// let lastPage = this.util.getPage()
				// // console.log(this.xzyy, lastPage)
				// lastPage.$vm.params.ydxx = this.xzyy.map(v => v.name).join()
				// lastPage.$vm.params.xzyy = this.xzyy
				uni.setStorageSync('bdhc', this.xzyy)
				if (this.query.change == 1) {
					this.go({
						t: 4
					})
				} else {
					this.go({
						t: 2,
						url: 'ljyy?storeId=' + this.storeId
					})
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.yd1 {
		padding-top: 35rpx;
		padding-bottom: 200rpx;
	}

	.ydsv {
		padding: 35rpx 0 35rpx 50rpx;
		// height: 87rpx;
	}

	.svic {
		height: 90rpx;
	}

	.svitem {
		padding: 0 20rpx;
		height: 100%;
		min-width: 135rpx;
		border-radius: 60rpx;

		.acitve {}
	}

	.yd2 {
		height: 87rpx;
		border-radius: 87rpx;

		.b-r-d::after {
			background: #fff;
			left: 0;
		}

		.b-r-d:last-child::after {
			display: block;
		}
	}

	.yd2l {
		padding-left: 30rpx;
		margin-right: 20rpx;
	}

	.yd2r {
		padding: 0 50rpx 0 40rpx;
	}

	.ydjc {
		top: 0;
		transform: translateY(-100%);
		padding: 20rpx 40rpx;
		border-radius: 100rpx;
	}

	.xxsj {
		bottom: -20rpx;
		left: 100rpx;
		width: 0;
		height: 0;
		border-width: 30rpx 30rpx 0;
		border-style: solid;
		border-color: #fff transparent transparent;
	}
</style>
