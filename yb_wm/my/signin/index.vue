<template>
	<view class="pb130">
		<view class="qdh">
			<view class="wh">
				<mg-img :src="config.icon"></mg-img>
			</view>
		</view>
		<view class="qdc p-r">
			<!-- <view class="f-bt f24 cf p3 pb0">
					<view @click='mysignin'>我的：325></view>
					<view>签到提醒<switch @change='switchChange' slot='ft' :color="tColor" :checked="value==1" style="transform:scale(0.70);"></switch>
					</view>
				</view> -->
			<!-- <view class="f-x-c pb30">
					<view class="yhei bsf f42 cf2 f-c">签到</view>
				</view> -->
			<view class="m03 mt10">
				<view class="bf mb30 bs20 p3">
					<view class="f-row p24 posi-r w630">
						<view class="qddays f-col f-bt p-r" v-for="(v,i) in jsqd.weeklist" :key='i' :class="v.sign==1?'bf2':'be6'">
							<view class="c6 f26 f-x-c f-g-0 dhe p050" :class="v.sign==1?'cf':'c6'">{{v.name}}天</view>
							<view class="f-g-1 f-x-c">
								<view class="icw">
									<mg-img :src="v.icon"></mg-img>
								</view>
							</view>
							<view v-if="v.hasjl&&(v.type==3||v.type==4)" class="qddayw be6 posi-a r0">
								<mg-img :src="'/static/wd/signin/hb.png'"></mg-img>
							</view>
						</view>
					</view>
					<view class="f-col f-y-c m20">
						<button v-if="goSignin=='1'" class="clearbtn sbtn f-c cf f30" @click="ljqd" :disabled="disabled">立即签到</button>
						<view v-else class="sbtn ysbtn f-c f30">今日已签到</view>
						<view v-if="config.continuity.length&&jsqd.totalDay>0" class="f22 c9 f-g-1 mt10">已经签到 <text class="cfc m01">{{jsqd.totalSignDay}}</text>
							天，再签 <text class="cfc m01">{{jsqd.totalDay}}</text>
							天必得好礼</view>
					</view>
				</view>
				<view class="bf mb30 bs20 p30">
					<view class="f-c c0 f32 wei">我的签到</view>
					<view class="f-row f-bt c6 p30">
						<view class="f-1 f-y-c f-col" @click='mysignin({type:1})'>
							<view class="f26"><text class="f46 wei cfc mr10">{{mySignData.integral}}</text>{{jfName}}</view>
							<view class='f24'>累计已获{{jfName}}</view>
						</view>
						<view class="f-1 f-y-c f-col" @click="mycoupon()">
							<view class="f26"><text class="f46 wei cfc mr10">{{mySignData.couponNum}}</text>张</view>
							<view class='f24'>累计已获优惠券</view>
						</view>
						<view class="f-1 f-y-c f-col" @click='mysignin({type:2})'>
							<view class="f26"><text class="f46 wei cfc mr10">{{mySignData.signNum}}</text>次</view>
							<view class='f24'>累计签到</view>
						</view>
					</view>
				</view>
				<view class="bf mb30 bs20 p3">
					<view class="f-c c0 f32 wei">签到说明</view>
					<view class="p3 c6">{{config.introduce}}</view>
				</view>
				<view class="bf mb30 bs20 p3">
					<view class="f-bt f-y-c">
						<view class="f-g-1 c3">
							<view class="f32 wei">下单获取额外{{jfName}}奖励</view>
							<view class="c9 f22 mt10">据您最近的门店<text class="f26 c3 ml10">{{storeInfo.name}}</text></view>
						</view>
						<view class="f-g-0">
							<view class="goxd f-c ml30 cf2" @click="qxd">
								<text class="iconfont f28 iconshangjia cf2 mr10"></text>
								<text class="f24">去下单</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bf mb30 bs20 p3">
					<mg-cell @tab="go({t:1,url:`/yb_wm/my/integral/shop-index`})" cname="p0" last='1' btt="兑换商品" bttc='f32' ft="查看全部"
					 ftc='f24 c9' arrow="1" hc='1'></mg-cell>
					<view class='bf f-raw f-bt pt30' v-if="dataList.length">
						<view @click="go({t:1,url:'/yb_wm/my/integral/details?id=' + v.id})" class="bf goodsc mb20 bs15 b-s-1" v-for="(v,i) in dataList"
						 :key='i' v-if="i<4">
							<view class="goodsimg be6">
								<mg-img :src="v.icon"></mg-img>
							</view>
							<view class='p-10-20'>
								<view class="f-bt">
									<text v-if="v.type=='2'" class="bf2 cf f24 mr10 boxs f-g-0">红</text>
									<text class="t-o-e f-g-1">{{v.name}}</text>
								</view>
								<view class="cfa">
									<view class="t-o-e f30" :style="{color:tColor}">
										<text v-if="v.score>0">{{v.score}}</text>
										<text v-if="v.score>0" class="f22 c9 nowei">{{jfName}}</text>
										<text v-if="v.score>0 && v.money>0" class="nowei c9">+</text>
										<text v-if="v.money>0">{{v.money}}<text class="f22 c9">{{dw}}</text></text>
									</view>
									<view class="t-o-e t-d-l c9 f22 wei4">{{sl+v.price}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar></tab-bar>
		<load v-if="showLoading"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import load from '@/components/common/load.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import {
		getDw
	} from "@/common/wechat-util"
	import utils from '@/common/utils'
	export default {
		name: 'index',
		components: {
			load,
		},
		data() {
			return {
				goSignin: '',
				dataRecord: '',
				totalSignDay: 0, //已连续签到多少天
				totalDay: 0,
				mySignData: '',
				config: {},
				dataList: [],
				showLoading: true,
				storeInfo: {},
				disabled: false,
			}
		},
		async onLoad() {
			await this.getpageconfig().then(() => {
				this.util.setNT(this.config.name || '签到')
			})
			this.getSystem()
			// this.util.setNT('签到')
			var nowtime = utils.formatTime(new Date()),
				nowstmp = new Date().getTime();
			// console.log(nowtime, this.timeToDate(this.dateToTime()), nowstmp, this.dateToTime())
			// this.getDates(nowstmp)
			await this.getLoginInfo()
			this.weekSignRecord()
			this.mySign()
			this.getList()
			this.getDw()
		},
		mixins: [utilMixins],
		computed: {
			jfName() {
				return this.system.custom.integral
			},
			jsqd() {
				if (this.dataRecord && this.config.oneDay) {
					let arr = this.dataRecord,
						totalSignDay = 0,
						nowtime = this.timeToDate(this.dateToTime()).substring(0, 10),
						index = arr.findIndex(item => item.time == nowtime)
					// console.log('本周签到记录', this.dataRecord,nowtime,)
					// console.log('今天', index)
					for (let i = 0; i < arr.length; i++) {
						if (i < index) {
							// console.log("已签到", i, arr[i])
							if (arr[i].sign == 1) {
								arr[i].type = 1
								arr[i].btnName = "已签到"
								arr[i].icon = '/static/wd/signin/gou.png'
							} else {
								arr[i].type = 2
								// arr[i].btnName = "补签"
								// console.log("补签", i, arr[i])
							}
						} else if (i == index) {
							if (arr[i].sign == 1) {
								arr[i].type = 1
								arr[i].btnName = "已签到"
								arr[i].icon = '/static/wd/signin/gou.png'
							} else {
								arr[i].type = 3
								arr[i].btnName = "签到"
								arr[i].icon = '/static/wd/signin/jb.png'
								// console.log("签到", i, arr[i])
							}
						} else {
							arr[i].type = 4
							// arr[i].btnName = "待签到"
							arr[i].icon = '/static/wd/signin/jb.png'
							// console.log("待签到", i, arr[i])
						}
						arr[i].name = i + 1
						//签到天数
						if (arr[i].sign == 1) {
							totalSignDay++
						}
					}
					totalSignDay = +totalSignDay
					//显示奖励
					for (let c in this.config.continuity) {
						let jlitem = arr.find((v, i) => i + 1 == this.config.continuity[c].days)
						if (jlitem) {
							jlitem.hasjl = 1
						}
					}
					let jlsz = this.config.continuity.sort(function(a, b) {
							return a.days - b.days
						}),
						zqitem = jlsz.find(v => v.days > totalSignDay)
					// console.log(jlsz, zqitem)
					let totalDay = zqitem ? zqitem.days - totalSignDay : 0,
						weeklist = arr
					// console.log('连续天数', totalSignDay)
					// console.log('签到记录2', arr)
					// console.log('返回数据', totalSignDay, totalDay, weeklist)
					return {
						totalSignDay,
						totalDay,
						weeklist
					}
				}
			}
		},
		methods: {
			...mapActions(["getConfig"]),
			async getpageconfig() {
				let {
					data
				} = await this.util.request({
					'url': this.api.config,
					data: {
						ident: 'signin'
					}
				})
				this.config = data
				if (data.open != 1) {
					uni.showModal({
						title: '提示',
						content: '签到功能已关闭',
						showCancel: false,
						success: (res) => {
							this.go({
								t: 6,
								url: '/yb_wm/index/my-index'
							})
						}
					});
				}
			},
			//本周签到记录
			async weekSignRecord() {
				let {
					data
				} = await this.util.request({
					'url': this.api.bzqd,
					method: 'POST',
				})
				this.dataRecord = data.record
				this.showBtn()
				this.showLoading = false
			},
			//我的签到 
			async mySign() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wdqdsj,
					method: 'POST',
				})
				this.mySignData = data
				// console.log('我的签到', data)
			},
			async showBtn() {
				let dataType = this.jsqd.weeklist.map(v => ({
					type: v.type
				}))
				// console.log(dataType[this.jsqd.totalSignDay].type)
				if (dataType[this.jsqd.totalSignDay].type == 3) {
					// console.log('今天未签到')
					this.goSignin = '1'
				} else {
					// console.log('今天已签到')
					this.goSignin = '2'
				}
			},
			async ljqd() {
				if (!await this.checkLogin()) return
				this.disabled = true
				// await this.requestSM('sign')
				let day = this.jsqd.totalSignDay + 1
				// console.log(day)
				// return
				if (this.goSignin == '1') {
					let res = await this.util.request({
						'url': this.api.qd,
						method: 'POST',
						data: {
							day: day,
						},
					})
					this.weekSignRecord();
					this.mySign();
					if (res) {
						this.util.message('签到成功', 1)
					} else {
						this.disabled = false
					}
					// console.log(res.message)
				} else {
					this.disabled = false
				}
			},
			//请求定位获取最近商家
			async getDw() {
				let lc = await getDw({
					t: 0
				})
				let {
					data
				} = await this.util.request({
					'url': this.api.zjdp,
					data: {
						lat: lc.latitude,
						lng: lc.longitude
					}
				})
				this.storeInfo = data
			},
			//请求商品列表
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.jfsplb,
					method: 'POST',
					data: {
						typeId: '',
						page: 1,
						size: 10,
					},
				})
				this.dataList = this.dataList.concat(data)
			},
			qxd() {
				// this.$store.state.config.storeInfo.id = this.storeInfo.id
				this.getConfig({
					key: 'storeInfo',
					data: {
						id: this.storeInfo.id,
						name: this.storeInfo.name,
						distance: this.storeInfo.distance
					}
				})
				this.go({
					t: 6,
					url: '/yb_wm/index/goods'
				})
			},
			mysignin(type) {
				this.go({
					t: 1,
					url: '/yb_wm/my/signin/my-signin?type=' + type.type
				})
			},
			mycoupon() {
				this.go({
					t: 1,
					url: '/yb_wm/my/signin/my-coupon'
				})
			},
			// switchChange(e) {
			// 	this.$emit("input", e.detail.value ? '1' : '2')
			// 	console.log(e.detail.value)
			// },
			getDates(currentTime) { //JS获取当前周从星期一到星期天的日期
				var currentDate = new Date(currentTime)
				var timesStamp = currentDate.getTime();
				var currenDay = currentDate.getDay();
				var dates = [];
				for (var i = 0; i < 7; i++) {
					dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(
						/\//g, '-'));
				}
				for (let i in dates) {
					dates[i] = dates[i].split('-').map(utils.formatNumber).join('-')
				}
				console.log(dates)
				return dates
			}
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.qdh {
		width: 100%;
		height: 387rpx;
		// border-radius: 100% 100% 100% 100% / 0% 0% 35% 35%;
	}

	.qdc {
		margin-top: -120rpx;
		;
	}

	.bf2 {
		background: #FF5012;
	}

	.cf2 {
		color: #FF5012;
	}

	.goxd {
		width: 160rpx;
		height: 58rpx;
		border: 1rpx solid #FF5012;
		border-radius: 28px;
	}

	.qddays,
	.qddayw {
		width: 67rpx;
		height: 84rpx;
		border-radius: 8rpx;
		margin-left: 30rpx;
	}

	.qddays:first-child {
		margin-left: 0;
	}

	.icw {
		width: 34rpx;
		height: 24rpx;
	}

	.dhe {
		height: 40rpx;
	}

	.w630 {
		width: 630rpx;
	}

	.p24 {
		padding: 30rpx 0 40rpx 0;
	}

	.goodsc {
		width: 305rpx;
	}

	.goodsimg {
		width: 305rpx;
		height: 305rpx;
	}

	.boxs {
		border-radius: 8rpx;
		padding: 0 7rpx;
	}

	.sbtn {
		width: 540rpx;
		height: 94rpx;
		background: linear-gradient(-90deg, rgba(255, 82, 23, 1) 0%, rgba(255, 119, 45, 1) 100%);
		border-radius: 47px;
	}

	.ysbtn {
		background: linear-gradient(-90deg, rgba(255, 82, 23, 1) 0%, rgba(255, 119, 45, 1) 100%);
		opacity: 0.5;
		color: #FFDBCC;
	}

	.cfc {
		color: #FF481C;
	}

	.p050 {
		padding: 5rpx 0;
	}
</style>
