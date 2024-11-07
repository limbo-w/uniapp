<template>
	<view v-if="czInfo.other" class="pb130">
		<nav-tab  cname="" ifsize='32' v-model="tIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<block v-if="tIdx==0">
			<view class="bf mt20">
				<view class="f24 p03">
					<view class="hlb flex p20">
						<view class="f-4 wei4">餐桌类型</view>
						<view class="f-3 t-c wei4">等待桌数</view>
						<view class="f-3 t-r wei4">预计等待</view>
					</view>
					<view v-for='(v,i) in czInfo.list' :key='i' class="flex p20 c9">
						<view class="f-4"><text class="f30 c3">{{v.name}}</text>({{v.min}}-{{v.max}}人)</view>
						<view class="f-3 t-c"><text class="f30" :style="{color:tColor}">{{v.waitNum}}</text>桌</view>
						<view class="f-3 t-r" v-if="v.waitMinute>0"><text class="f30 c3">{{v.waitMinute}}</text>分钟</view>
						<view class="f-3 t-r" v-else>无需等候</view>
					</view>
				</view>
			</view>
			<view class="mt20">
				<mg-input @tab="toggleTab('number')" :value="params.peopleText" isr='1' ht='就餐人数' htc='c3 f30' pr='请选择' icn='f30 c3 t-r'
				 dis='1' arrow="1" ftc='c3'></mg-input>
				<view v-show="params.people>0">
					<mg-cell cname="p32" isr='1'>
						<template slot='bd'>
							<view class="c3 f30 f-bt">
								<text>餐桌类型</text>
								<text v-if="!bqarr.length" class="cb">请根据餐桌类型选择人数</text>
							</view>
							<view v-if="bqarr.length" class="mt15">
								<view class="moudle mb20 p-r o-h" v-for="(v,i) in bqarr" :key='i' @click="clickMode(v,i)" :style="{borderColor:i==aIdx?tColor:''}">
									<text class="p-a" :class="i==aIdx?'sjx':''" :style="{borderTopColor:i==aIdx?tColor:''}"></text>
									<text class="p-a gou iconfont icongou cf f18"></text>
									{{v.name}}：预计等待{{v.waitNum}}桌，{{v.waitMinute}}分钟
								</view>
							</view>
						</template>
					</mg-cell>
				</view>
				<mg-input v-model="params.tel" isr='1' ht='手机号' htc='c3 f30' pr='请输入手机号' icn='f30 c3 t-r'></mg-input>
			</view>
			<view class="p253">
				<view class="be c6 f24 p2 tips">
					<div class="mb10 f-y-c"><text class="iconfont iconjfgz mr10" :style="{color:tColor}"></text>商家提醒：</div>
					<book-text type='2' :content="czInfo.other.notice" />
				</view>
			</view>
			<view class="foot-btnc bf">
				<button @click="save" :loading="loading" :disabled="loading" class="foot-btn" :style="{background:tColor}">确认取号</button>
			</view>
		</block>
		<view  class="mt10 p2">
			<block v-if="tIdx==1">
				<dn-order @refresh='dnrefresh' v-model='laIdx' :labelarr='labelArr'
					:otype="tntabs[0].type" :datalist="dataList"></dn-order>
				<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' otext='您今天还没有订单'
						ttext='快去排队取号吧' />
			</block>
		</view>
		<w-picker mode="selector" @confirm="onConfirm($event,'people')" ref="number" :selectList="pArr"></w-picker>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgInput from '@/components/form/mg-input.vue'
	import wPicker from "@/components/form/w-picker.vue"
	// import mgRtext from '@/components/swiper/rich-text.vue'
	import bookText from '@/components/common/functionCmp/rich-text.vue';
	import utils from '@/common/utils.js'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import dnOrder from '../../index/components/dn-order.vue'
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'pdqh',
		components: {
			mgInput,
			wPicker,
			bookText,
			navTab,
			dnOrder,
			jzz,
		},
		data() {
			return {
				czInfo: {},
				bqarr: [],
				aIdx: 0,
				params: {
					userId: '',
					people: '',
					tableId: '',
					peopleText: '',
					tel: '',
				},
				pArr: [],
				loading: false,
				tIdx:0,
				tabs:[
					{
						name:'排队取号'
					},
					{
						name:'我的排队'
					},
				],
				labelArr: [],
				tntabs: [{
					name: '排队',
					type: 5,
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
		async onLoad(options) {
			this.query = options
			this.storeId = utils.getOptions(options, {
				key: 'storeId',
				// q1: this.sjxxs.storeInfo && this.sjxxs.storeInfo.id,
				q1: this.storeInfo.id,
			})
			this.getSystem()
			this.util.setNT('排队取号')
			this.getLoginInfo().then(() => {
				this.params.userId = this.uId
				this.params.tel = this.user.userTel || ''
			})
			this.getData()
			this.changeTab(this.tIdx)
		},
		computed: {
			...mapState({
				sjxxs: state => state.sjxx,
				storeInfo: state => state.config.storeInfo,
			}),
		},
		methods: {
			changeTab(e) {
				this.laIdx = 0
				this.isget = this.mygd = false
				this.params.page = 1
				if (this.tIdx == 1) {
					this.labelArr = []
					this.params.api = 'pdlb'
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
					'url': this.api.pdcz,
					data: {
						storeId: this.storeId,
					},
				})
				this.czInfo = data
				for (let i = 1; i <= data.list[data.list.length - 1].max; i++) {
					this.pArr.push({
						label: i,
						value: i
					})
				}
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			onConfirm(e, key) {
				// console.log(e, key);
				switch (key) {
					case "people":
						this.params[key] = e.result
						this.params.peopleText = e.result + '人'
						let i = this.czInfo.list.find(v => e.result <= +v.max && e.result >= +v.min)
						this.bqarr = i ? [i] : []
						break;
				}
			},
			clickMode(v, i) {
				// this.index = i;
			},
			async save() {
				this.params.tableId = this.bqarr[0] ? this.bqarr[0].id : ''
				let filterArr = []
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						userId: '缺少用户id',
						tableId: '请根据餐桌类型选择有效的人数',
						people: '请选择人数',
						tel: '请填写手机号',
					}
				})
				if (!judgeData) {
					return
				} else {
					if (!utils.isTelCode(this.params.tel)) return this.util.message('请输入正确的手机号', 3)
					// console.log(this.params)
					// return
					this.loading = true
					await this.requestSM('queuingOrder')
					let orderRes = await this.util.request({
						'url': this.api.pdxd,
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!orderRes) {
						this.loading = false
						utils.swnb(1000)
					} else {
						this.util.message('提交成功', 1, 1000)
						this.loading = false
						utils.stfn(() => {
							this.go({
								t: 1,
								url: 'pdxq?id=' + orderRes.data,
							})
						})
					}
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.f-4 {
		flex: 1 1 50%;
	}

	.f-3 {
		flex: 1 1 25%;
	}

	.tips {
		line-height: 40rpx;
	}

	.moudle {
		text-align: left;
		padding: 20rpx 18rpx;
		border-radius: 12rpx;
		color: #333;
		border: 1rpx solid #eee;
		background: #fff;
		position: relative;
	}

	.sjx {
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		border-top: 45rpx solid red;
		border-left: 45rpx solid transparent;
	}

	.gou {
		right: 3rpx;
		top: 5rpx;
	}

	.foot-btn {
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
