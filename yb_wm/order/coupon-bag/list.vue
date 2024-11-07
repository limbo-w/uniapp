<template>
	<view class="h100v p-f w100 f-col">
		<view class="qb1c p-f wh" :style="{background: `linear-gradient(90deg, #FF876F, #FF654D)`}"></view>
		<view class="qb2c">
			<uni-nav-bar id='uninavbar' :uropcity="0" :uriconopcity='0.1' :border='false' :statusBar="true">
				<view class="cf">{{title}}</view>
			</uni-nav-bar>
			<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
			<nav-tab :sname="{background:'transparent'}" v-if="tabs.length" color='#fff' cname='bt' height='80' icname='f26'
			 v-model="aIdx" @changeTab='changeTab' :tabs='tabs' uw='60' :isname="{fontWeight:'bold',fontSize:'30rpx',color:'#fff'}"
			 :isnname="{color:'#F9E5DD'}"></nav-tab>
		</view>
		<view class="qb3c f-1">
			<swiper class="h100" :style="{paddingBottom:hasTabbar?'130rpx':''}" :current="aIdx" @change="swiperTab">
				<swiper-item v-for="(tv,ti) in tabs" :key="ti">
					<scroll-view v-if="ti==aIdx" class="h100 p3" scroll-y="true" @scrolltolower="lower">
						<mg-coupon ptype='9' @btntap='btntap(v.id)' :color='tColor' cname='mb30' v-for="(v,i) in dataList" :key='i' :co='v'></mg-coupon>
						<jzz bgcolor="transparent" tcolor='#fff' :nodata="dataList.length==0&&isget" :mygd='mygd' />
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<tab-bar @refresh='tbrh'></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		sljz,
	} from "@/common/util-mixins.js"
	import utils from '@/common/utils.js'
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import jzz from '@/components/common/jzz.vue'
	import {
		wxShare,
	} from "@/common/wechat-util"
	export default {
		name: 'qb-list',
		components: {
			uniNavBar,
			MgSwiper,
			navTab,
			mgCoupon,
			jzz,
		},
		data() {
			return {
				title: '',
				swiper: {
					class: 'p230 bt',
					swiper: [],
					duration: '',
					mode: '',
					height: '210',
					radius: '0',
					auto: true,
					interval: 5,
				},
				aIdx: 0,
				tabs: [],
				hasTabbar: false,
				params: {
					page: 1,
					size: 10,
					typeId: '',
					storeId: ''
				},
			}
		},
		async onLoad(options) {
			this.query = options
			// this.getConfig({
			// 	key: 'jbset',
			// 	api: 'config',
			// 	params: {
			// 		ident: 'rollbag'
			// 	}
			// }).then(res => {
			// 	this.title = options.name || res.title
			// 	wxShare({
			// 		title: this.title,
			// 	})
			// })
			this.getAd()
			this.getSystem()
			await this.util.request({
				'url': this.api.jffl,
			}).then(res => {
				this.tabs = res.data.typeList.map(v => ({
					name: v.name,
					id: v.id
				}))
				this.params.typeId = this.tabs[0].id
			})
			options.storeId && (this.params.storeId = options.storeId)
			this.getList();
			this.getLayout()
		},
		mixins: [sljz],
		computed: {
			...mapState({
				jbset: state => state.config.jbset,
			}),
			hasdata() {
				return this.dataList.length == 0
			},
		},
		methods: {
			...mapActions(["getConfig"]),
			getAd() {
				this.util.request({
					'url': this.api.jffl,
					data: {
						location: 8,
						type: 1,
					}
				}).then(res => {
					this.swiper.swiper = res.data.ad.map(v => ({
						icon: v.icon,
					}))
				})
			},
			tbrh(e) {
				this.hasTabbar = true
			},
			changeTab(index) {
				this.refreshList()
			},
			swiperTab(e) {
				this.aIdx = e.detail.current;
				if (e.detail.source) {
					this.refreshList()
				}
			},
			refreshList() {
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.typeId = this.tabs[this.aIdx].id
				this.dataList = []
				this.getList()
			},
			lower: utils.throttle(function(e) {
				if (!this.mygd && this.isget) {
					this.isget = false
					this.getList();
				}
			}, 300),
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wdyhq,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
		},
		onShareAppMessage() {
			return {
				title: '快来看看吧！',
			}
		},
	}
</script>
<style scoped lang="scss">
	.qb1c {}

	.qb2c {}
</style>
