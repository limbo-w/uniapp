<template>
	<view class="f-col h100">
		<view class="bt-e">
			<nav-tab cname='' ncolor="#666" ifsize='32' height='76' :isname="{fontWeight:'900'}" :color='tColor'
				v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		</view>
		<view class="f-1">
			<swiper :class="zfbH" :current="aIdx" @change="swiperTab">
				<swiper-item @touchmove.stop='stopTouchMove'>
					<view class="h100 f-col">
						<view class="bf">
							<view v-if="system.storeSet.showType==1" class="p23 f-y-c f30">
								<view @click="xzcs" class="f-y-c f-1">
									<view class="mr10">{{dwcsInfo.cityName||'定位中'}}</view>
									<view class="" style="min-width: 100rpx;">{{dwcsInfo.zoneName||'...'}}</view>
									<text class="iconfont iconright c3 ml5"></text>
								</view>
								<view @click="djss" class="bf6 stssk f-c p03 f28 c9 ml20">
									<text class="iconfont iconsearch"></text>
									<text class="ml5">搜索</text>
								</view>
							</view>
							<!-- <view v-show="dtshow"></view> -->
							<map v-show="dtshow" class="map" @callouttap='markertap' :latitude="latitude"
								:longitude="longitude" :markers="covers" scale='12'>
							</map>
							<view @click="dtshow=!dtshow" class="f-c p23 f26 bt-e l-h1">
								<view>{{dtshow?'收起':'展开'}}地图</view>
								<text class="iconfont icontop c3 ml5" :class="{'xzdw':!dtshow}"></text>
							</view>
						</view>
						<scroll-view class="f-1 o-a p330" scroll-y="true" @scrolltolower="lower">
							<view @click="selectStore(v,i)" v-for="(v,i) in dataList[aIdx].list" :key='i'
								class="dpic bs15 b-f5 bf mb30 f-row p-r"
								:style="{borderColor:i==xzdpidx?tColor:'#fff'}">
								<view class="p03 f-1 dpiclt b-re">
									<!-- <view v-if="isDev" class="mb10">店铺ID:{{v.id}}</view> -->
									<view class="mb10">{{v.name}}</view>
									<view v-if='v.distributionSupport' class="f-raw">
										<view v-if='v.distributionSupport.find(v=>v==1)'
											class="mb10 f20 p-3-10 bs5 mr10"
											style="background: #EAF3E8;color: #5AA540;">可外送</view>
										<view v-if='v.distributionSupport.find(v=>v==2)' class="mb10 f20 p-3-10 bs5"
											style="background: #EAF3E8;color: #5AA540;">可自取</view>
									</view>
									<view class="f-row f24 c6 mt5">
										<text class="iconfont iconlocation f26 mr10 c3 mt10"></text>
										<text>{{v.address}}</text>
									</view>
									<view class="f-row f24 c6 mt5">
										<text class="iconfont iconsj f26 mr10 c3 mt10"></text>
										<text>{{yysj(v)}}</text>
									</view>
									<view class="f-raw mt15">
										<view class="text-btn f20 p-3-10 bs5 mr10 c9"
											:style="{borderColor:v.storeOpen==1?tColor:'',color:v.storeOpen==1?tColor:''}">
											{{v.storeOpen==1?'营业中':'休息中'}}
										</view>
										<view v-if="v.typeName" class="text-btn f20 p-3-10 bs5"
											:style="{borderColor:tColor,color:tColor}">{{v.typeName}}</view>
									</view>
								</view>
								<view class="dpicrt f-c-c p-3-10 f26">
									<view>去下单</view>
									<view class="f20 c6 mt10">距离{{Number((v.distance/1000).toFixed(1))}}km</view>
									<view class="f-y-c mt30 pt10">
										<view @click.stop="bddh(v)" class="f-c bf5 dtanc mr20">
											<text class="iconfont icondh f26"></text>
										</view>
										<view @click.stop="ckwz(v)" class="f-c bf5 dtanc">
											<text class="iconfont icondtdh f26"></text>
										</view>
									</view>
								</view>
								<view class="yddsj p-a" :style="{borderBottom:i==xzdpidx?'56rpx solid '+tColor:''}">
								</view>
								<text v-if="v.value==params.isOut" class="gou p-a iconfont icongou cf f20"></text>
							</view>
							<jzz bgcolor="transparent" :nodata="dataList[aIdx].list.length==0&&dataList[aIdx].isget"
								:mygd='dataList[aIdx].mygd' />
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item @touchmove.stop='stopTouchMove'>
					<scroll-view class="h100 p330" scroll-y="true" @scrolltolower="lower">
						<view @click="selectStore(v,i)" v-for="(v,i) in dataList[aIdx].list" :key='i'
							class="dpic bs15 b-f5 bf mb30 f-row p-r">
							<view class="p03 f-1 dpiclt b-re">
								<view class="mb10 f-y-c"><text class="iconfont mt0 c3 iconxx mr15 f26"
										:style="{color:tColor}"></text>{{v.name}}</view>
								<view v-if='v.distributionSupport' class="f-raw">
									<view v-if='v.distributionSupport.find(v=>v==1)' class="mb10 f20 p-3-10 bs5 mr10"
										style="background: #EAF3E8;color: #5AA540;">可外送</view>
									<view v-if='v.distributionSupport.find(v=>v==2)' class="mb10 f20 p-3-10 bs5"
										style="background: #EAF3E8;color: #5AA540;">可自取</view>
								</view>
								<view class="f-row f24 c6 mt5">
									<text class="iconfont iconlocation f26 mr10 c3 mt10"></text>
									<text>{{v.address}}</text>
								</view>
								<view class="f-row f24 c6 mt5">
									<text class="iconfont iconsj f26 mr10 c3 mt10"></text>
									<text>{{yysj(v)}}</text>
								</view>
								<view class="f-raw mt15">
									<view class="text-btn f20 p-3-10 bs5 mr10 c9"
										:style="{borderColor:v.storeOpen==1?tColor:'',color:v.storeOpen==1?tColor:''}">
										{{v.storeOpen==1?'营业中':'休息中'}}
									</view>
									<view v-if="v.typeName" class="text-btn f20 p-3-10 bs5"
										:style="{borderColor:tColor,color:tColor}">{{v.typeName}}</view>
								</view>
							</view>
							<view class="dpicrt f-c-c p-3-10 f26">
								<view>去下单</view>
								<!-- <view class="f20 c6 mt10">距离{{Number((v.distance/1000).toFixed(1))}}km</view> -->
							</view>
						</view>
						<jzz bgcolor="transparent" imgn="zwyyd"
							:nodata="dataList[aIdx].list.length==0&&dataList[aIdx].isget" :mygd='dataList[aIdx].mygd' />
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view v-show="showSearch" class="wh p-a t0 bf f-col">
			<view class="searchc p3 f-y-c">
				<view class="f-1 scl bf6 f-y-c p03">
					<text class="iconfont iconsearch c6"></text>
					<input class="f-1 p02" :focus="false" v-model.trim="ssobj.params.keyword" confirm-type='search'
						placeholder-class="cb2" placeholder="请输入关键字搜索" @confirm='confirm' />
					<text @tap="cleanKey" v-if="ssobj.params.keyword" class="iconfont iconyx"
						style="color: #ADACAB;"></text>
				</view>
				<view @click="qxss" class="c8 ml30">取消</view>
			</view>
			<scroll-view class="f-1 o-a p03" scroll-y="true">
				<view @click="xzssdp(v)" v-for="(v,i) in ssobj.list" :key='i' class="p30 b-be">
					<view class="f30 t-o-e">{{v.name}}·{{v.cityName}}</view>
					<view class="f24 c9 t-o-e">{{v.address}}</view>
				</view>
				<jzz v-show="issearch" otext='暂时搜索不到相关门店' imgn="zwmd" bgcolor="transparent"
					:nodata="ssobj.list.length==0&&ssobj.isget" :mygd='ssobj.isget' />
			</scroll-view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	import utils from '@/common/utils.js'
	import {
		getDw
	} from "@/common/wechat-util.js"
	export default {
		name: 'select-index',
		components: {
			navTab,
			jzz,
		},
		data() {
			return {
				aIdx: 0,
				// #ifdef H5
				params:{
					isOut:undefined,
				},
				// #endif
				tabs: [{
					name: '选择门店'
				}, {
					name: '常用/收藏'
				}],
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				dwcsInfo: {},
				dtshow: true,
				dataList: [{
					list: [],
					isget: false,
					mygd: false,
					api: 'dplb',
					params: {
						page: 1,
						size: 10,
						lat: '',
						lng: '',
						cityId: '',
						zoneId: '',
						storeId: '',
					}
				}, {
					list: [],
					isget: false,
					mygd: false,
					api: 'dplbsc',
					params: {
						page: 1,
						size: 10,
					}
				}],
				xzdpidx: 0,
				ssobj: {
					list: [],
					isget: false,
					params: {
						keyword: '',
					}
				},
				issearch: false,
				showSearch: false,
				// #ifdef  MP-WEIXIN
				zfbH:'h100',
				// #endif
				// #ifdef  MP-ALIPAY || MP-TOUTIAO || H5
				zfbH:'mvh100',
				// #endif
			}
		},
		async onLoad(options) {
			await this.getSystem()
			this.util.setNT('选择门店')
			this.query = options
			this.swiperTab({
				detail: {
					current: +options.idx || 0
				}
			})
			uni.$on('changeCity', (e) => {
				if (e.hasOwnProperty('dwcsInfo')) {
					this.dwcsInfo = e.dwcsInfo
					this.dataList[0] = {
						list: [],
						isget: false,
						mygd: false,
						api: 'dplb',
						params: {
							page: 1,
							size: 10,
							lat: this.dataList[0].params.lat,
							lng: this.dataList[0].params.lng,
							cityId: this.dwcsInfo.cityId,
							zoneId: this.dwcsInfo.zoneId,
						}
					}
					this.xzdpidx = 0
					this.getList()
				}
				// console.log('changeCity', e)
			})
			console.log(options)
		},
		onUnload() {
			uni.$off('changeCity');
		},
		computed: {},
		methods: {
			...mapActions(["getConfig"]),
			async getDwcs(o) {
				if (this.system.storeSet.showType == 1) { //区域显示
					let {
						data
					} = await this.util.request({
						'url': this.api.dwcs,
						method: 'POST',
						data: {
							lat: o.latitude,
							lng: o.longitude,
							storeId: this.query.storeId || '',
						}
					})
					data.zoneName = '全部地区'
					data.zoneId = ''
					this.dwcsInfo = data
					this.latitude = this.dataList[0].params.lat = o.latitude
					this.longitude = this.dataList[0].params.lng = o.longitude
					this.dataList[0].params.cityId = this.dwcsInfo.cityId
					this.dataList[0].params.zoneId = ''
					this.dataList[0].params.storeId = this.query.storeId || ''
				} else {
					this.latitude = this.dataList[0].params.lat = o.latitude
					this.longitude = this.dataList[0].params.lng = o.longitude
					this.dataList[0].params.storeId = this.query.storeId || ''
				}
			},
			stopTouchMove() {
				return false
			},
			changeTab(index) {
				// console.log(index, this.aIdx, this.dataList)
				// #ifdef  MP-ALIPAY
				this.swiperTab({
					detail: {
						current: +index || 0
					}
				})
				// #endif
			},
			async swiperTab(e) {
				this.aIdx = e.detail.current;
				// #ifndef  MP-ALIPAY
				if (this.aIdx != 0 && !e.detail.hasOwnProperty('source')) { //防止调用this.swiperTab多次触发getList
					return
				}
				// #endif
				if (!this.dataList[e.detail.current].isget) {
					if (this.aIdx == 0 && !this.dwcsInfo.hasOwnProperty('cityId')) {
						// if (this.query.latLng) {
						// 	await this.getDwcs({
						// 		latitude: this.query.lat,
						// 		longitude: this.query.lng
						// 	})
						// } else {
						let lc = await getDw({
							t: 0
						})
						await this.getDwcs(lc)
						// }
					}
					this.getList()
				}
				// console.log(e)
			},
			lower: utils.throttle(function(e) {
				if (!this.dataList[this.aIdx].mygd && this.dataList[this.aIdx].isget) {
					this.dataList[this.aIdx].isget = false
					this.getList();
				}
			}, 300),
			async getList() {
				let obj = this.dataList[this.aIdx]
				let {
					data
				} = await this.util.request({
					'url': this.api[this.dataList[this.aIdx].api],
					data: this.dataList[this.aIdx].params,
				})
				obj.list = obj.list.concat(data)
				obj.isget = true
				obj.mygd = obj.params.size > data.length
				obj.params.page++
				this.$set(this.dataList, this.aIdx, obj)
				if (this.aIdx == 0) {
					this.setCovers()
				}
				// console.log(obj)
			},
			setCovers() {
				if (this.dataList[0].list[0]) {
					utils.stfn(() => {
						this.latitude = +this.dataList[0].list[0].lat
						this.longitude = +this.dataList[0].list[0].lng
					}, 400)
					// console.log('setCovers',this.latitude,this.longitude)
				}
				this.covers = this.dataList[0].list.map(v => ({
					id: +v.id,
					latitude: v.lat,
					longitude: v.lng,
					iconPath: v.icon,
					width: '25',
					height: '25',
					callout: {
						content: v.name + '>',
						color: '#333',
						fontSize: 14,
						borderRadius: 3,
						bgColor: '#fff',
						padding: 7,
						display: 'ALWAYS',
						textAlign: 'center',
					},
				}))
			},
			async selectStore(v, i) {
				if (this.system.storeSet.storeModel != 2) return this.util.message('多门店功能已关闭', 3)
				this.xzdpidx = i
				this.latitude = v.lat
				this.longitude = v.lng
				if (this.query.storeId == v.id) { //上个页面当前的店铺
					return uni.showModal({
						title: '提示',
						content: '你选中的是当前所在店铺，是否返回上级页面继续点单',
						success: (res) => {
							if (res.confirm) {
								this.go({
									t: 4
								})
							}
						}
					});
				}
				let msg = ''
				if (v.storeOpen != 1) {
					msg = `[${v.name}] 休息中 确认切换到该门店吗？`
				} else {
					msg = i == 0 ? `确认切换到[${v.name}]门店吗？` : `您当前所在位置距离该门店较远 确认切换到 [${v.name}] 门店吗？`
				}
				try {
					await this.util.modal(msg)
					if (this.query.page == 'goods') { //从点单页进入
						this.qhdp(v)
						this.go({
							t: 4
						})
					} else if (this.query.page == 'index') {
						this.qhdp(v)
						this.go({
							t: 4
						})
					}
				} catch (e) {}
				// console.log('selectStore', v, i)
			},
			qhdp(v) {
				this.getConfig({
					key: 'storeInfo',
					data: {
						id: v.id,
						name: v.name,
						distance: v.distance,
					}
				})
			},
			markertap(e) {
				let v = this.dataList[0].list.find((v, i) => v.id == e.detail.markerId),
					i = this.dataList[0].list.findIndex((v, i) => v.id == e.detail.markerId)
				this.selectStore(v, i)
				// console.log('markertap', e, v, i)
			},
			xzcs() {
				if (this.dwcsInfo.cityId) {
					this.go({
						url: 'select?info=' + encodeURIComponent(JSON.stringify(this.dwcsInfo))
					})
				}
			},
			yysj(co) {
				let text = ''
				let info = co
				if (info.timeType == 1) {
					text = '24小时营业'
				} else {
					text = `${info.timeArr[0].startTime}-${info.timeArr[0].ciri?'次日':''}${info.timeArr[0].endTime}`
					if (info.timeArr[1]) {
						text += ' ' +
							`${info.timeArr[1].startTime}-${info.timeArr[1].ciri?'次日':''}${info.timeArr[1].endTime}`
					}
					if (info.timeArr[2]) {
						text += ' ' +
							`${info.timeArr[2].startTime}-${info.timeArr[2].ciri?'次日':''}${info.timeArr[2].endTime}`
					}
				}
				return text
			},
			//
			djss() {
				this.showSearch = true
			},
			qxss() {
				this.showSearch = this.issearch = false
				this.ssobj = {
					list: [],
					isget: false,
					params: {
						keyword: '',
					}
				}
			},
			cleanKey() {
				this.ssobj.params.keyword = ''
				this.issearch = false
				this.ssobj.list = []
				this.ssobj.isget = false
			},
			confirm(e) {
				if (!this.ssobj.params.keyword) return this.util.message('请输入搜索内容', 3)
				this.issearch = true
				this.ssobj.list = []
				this.ssobj.isget = false
				this.getssList()
			},
			async getssList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.dplbss,
					method: 'POST',
					data: this.ssobj.params,
				})
				this.ssobj.list = this.ssobj.list.concat(data)
				this.ssobj.isget = true
			},
			async xzssdp(v) {
				this.qxss()
				let {
					data
				} = await this.util.request({
					'url': this.api.dwcs,
					mask: 1,
					method: 'POST',
					data: {
						storeId: v.id,
					}
				})
				this.dwcsInfo = data
				this.dataList[0] = {
					list: [],
					isget: false,
					mygd: false,
					api: 'dplb',
					params: {
						page: 1,
						size: 10,
						lat: this.dataList[0].params.lat,
						lng: this.dataList[0].params.lng,
						cityId: this.dwcsInfo.cityId,
						zoneId: this.dwcsInfo.zoneId,
					}
				}
				this.xzdpidx = 0
				this.getList()
			},
			bddh(v) {
				this.util.makeTel(v.storeTel)
			},
			ckwz(v) {
				this.util.ckWz({
					lat: v.lat,
					lng: v.lng,
					name: v.name,
					address: v.address,
				})
			},
		},
	}
</script>
<style scoped lang="scss">
	.stssk {
		height: 68rpx;
		border-radius: 68rpx;
	}

	.bt-e {
		border-bottom: 1px solid #EAEAEA;
	}

	.map {
		width: 750rpx;
		height: 490rpx;
	}

	.dpic {
		padding: 40rpx 0;

		.dpicrt {
			width: 28%;

			.dtanc {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		}
	}

	.yddsj {
		right: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-bottom: 56rpx solid #fff;
		border-left: 56rpx solid transparent;
	}

	.gou {
		right: 8rpx;
		bottom: 6rpx;
	}

	.scl {
		height: 70rpx;
		border-radius: 70rpx;
	}
</style>
