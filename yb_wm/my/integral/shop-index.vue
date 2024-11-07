<template>
	<view class="bf">
		<view class="f-row pb20 c0" style="border-bottom: 24rpx solid #F6F6F6;">
			<view class="f-1">
				<view class="p13">
					<view class="f26">可用积分</view>
					<view class="f60 wei" style="padding-left: 0rpx;">{{user.integral}}</view>
				</view>
				<view class="p30 f30 f-row l-h1" style="margin-top: 100rpx;">
					<view @click='myIntegral' class="f-1 t-c b-re" style="border-color: #333;">{{jfName}}明细</view>
					<view @click="integralRecord" class="f-1 t-c">兑换记录</view>
				</view>
			</view>
			<view class="f-1 f-c">
				<view class="topimg">
					<mg-img :src="`${onImgurl}/jfsct.png`"></mg-img>
				</view>
			</view>
		</view>
		<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
		<notice-group v-if="ggList.length" ptype='2' :list='ggList' :co="ggConfig" :color='tColor' />
		<block v-if="hotList.length">
			<view class="p230">
				<view class="f32 wei">热门推荐</view>
			</view>
			<view class='bf f-row o-x-s p23'>
				<view @click="go({t:1,url:'/yb_wm/my/integral/details?id=' + v.id})" class="bf f-g-0 goodsc mr30 bs15 b-s-1" v-for="(v,i) in hotList"
				 :key='i'>
					<view class="goodsimg">
						<mg-img :src="v.icon"></mg-img>
					</view>
					<view class='jfgb'>
						<view class="f-bt">
							<text v-if="v.type=='2'" class="bf2 cf f24 mr10 boxs f-g-0">红</text>
							<text class="t-o-e f-g-1">{{v.name}}</text>
						</view>
						<view class="cfa" :style="{color:tColor}">
							<view class="t-o-e f30">
								<text v-if="v.score>0">{{v.score}}</text>
								<text v-if="v.score>0" class="f22 nowei c9">{{jfName}}</text>
								<text v-if="v.score>0 && v.money>0" class="nowei c9">+</text>
								<text v-if="v.money>0">{{v.money}}<text class="f22 c9">{{dw}}</text></text>
							</view>
							<view class="t-o-e t-d-l c9 f22 wei4">{{sl+v.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- <entry-button-group :co="ebg" :color='tColor' @tabitem='tabitem' /> -->
		<view class="p03">
			<nav-tab :color='tColor' v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		</view>
		<!-- <view v-if="dataList.length" class="p230">
			<view class="f32 wei">精品推荐</view>
		</view> -->
		<goods-list :color='tColor' :list='dataList' />
		<jzz bgcolor="transparent" imgn="zwjf" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		<load v-if="showLoading"></load>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		sljz
	} from "@/common/util-mixins.js"
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import entryButtonGroup from '@/components/drag/btn.vue'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import noticeGroup from '@/components/common/functionCmp/notice-group.vue'
	import goodsList from './goods-list.vue'
	import jzz from '@/components/common/jzz.vue'
	import load from '@/components/common/load.vue'
	export default {
		name: 'jfsc',
		components: {
			MgSwiper,
			entryButtonGroup,
			goodsList,
			jzz,
			noticeGroup,
			load,
			navTab,
		},
		data() {
			return {
				swiper: {
					class: 'p230',
					padding: 0,
					swiper: [],
					duration: '',
					mode: '',
					height: '248',
					radius: '0',
					auto: true,
					interval: 5,
				},
				ebg: {
					active: 1,
					btnList: [],
					circle: "10",
					circleBtn: "50",
					colorBg: "#FFFFFF",
					colorWord: "#2c2c2c",
					line: "2",
					marginBottom: "0",
					marginLR: "10",
					marginTop: "0",
					num: "5",
				},
				hotList: [],
				params: {
					typeId: '',
					page: 1,
					size: 10,
					sort: '',
				},
				ggConfig: {
					txtOrImg: 2,
					notice: {
						title: '公告',
						fontSize: '32rpx',
					}
				},
				ggList: [],
				showLoading: true,
				aIdx: 0,
				tabs: [],
			}
		},
		async onLoad(options) {
			this.getLoginInfo()
			this.getSystem().then(() => {
				this.util.setNT(this.jfName + '商城')
			})
			this.getCategory()
			this.getList()
			this.getHotList()
		},
		onShow() {
			if (this.uId) {
				this.refreshUser({
					nomask: 1,
					get: 1,
					now: 1,
				})
			}
		},
		mixins: [sljz],
		computed: {
			jfName() {
				return this.system.custom.integral
			},
		},
		methods: {
			...mapActions('dndc', ['getSwitchConfig']),
			myIntegral() {
				this.go({
					t: 2,
					url: '/yb_wm/my/integral/my-integral'
				})
			},
			integralRecord() {
				this.go({
					t: 1,
					url: '/yb_wm/my/integral/integral-record'
				})
			},
			tabitem(e) {
				this.isget = this.mygd = false
				this.params.typeId = e.id || ''
				this.params.page = 1
				this.dataList = []
				this.getList()
			},
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.typeId = this.tabs[e].id
				this.params.page = 1
				this.dataList = []
				this.getList()
			},
			//请求商品列表
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.jfsplb,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			//请求热门商品
			async getHotList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.jfsplb,
					method: 'POST',
					data: {
						typeId: '',
						page: 1,
						size: 10,
						sort: '1',
					},
				})
				this.hotList = this.hotList.concat(data)
				this.showLoading = false
			},
			//请求分类数据
			async getCategory() {
				let res = await this.util.request({
					'url': this.api.jffl,
					method: 'POST',
					data: {},
				})
				this.swiper.swiper = res.data.ad.map(v => ({
					icon: v.icon,
				}))
				this.tabs = [{
					name: '全部',
					id: ''
				}].concat(res.data.typeList)
				this.ggList = res.data.payList.map((v) => ({
					title: `${v.userName}成功兑换了${v.goodsName}`,
				}))
			}
		},
	}
</script>

<style scoped lang="scss">
	.topimg {
		width: 350rpx;
		height: 350rpx;
	}

	.jfgb {
		padding: 12rpx 20rpx;
	}

	.bf2 {
		background: #FF5012;
	}

	.imgc {
		width: 320rpx;
		height: 320rpx;
		margin-top: 30rpx;
	}

	.goodsc {
		width: 325rpx;
	}

	.goodsimg {
		width: 325rpx;
		height: 325rpx;
	}

	.boxs {
		border-radius: 8rpx;
		padding: 0 7rpx;
	}
</style>
