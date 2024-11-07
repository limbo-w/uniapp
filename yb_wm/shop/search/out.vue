<template>
	<view class="mh100 bf">
		<view class="searchc p3 f-y-c">
			<view class="f-g-1 scl bf2f f-y-c p03">
				<text class="iconfont iconsearch c0"></text>
				<input class="f-1 p02" :focus="true" auto-focus v-model.trim="params.keyword" confirm-type='search'
				 placeholder-class="cb2" placeholder="请输入关键字搜索" @confirm='confirm' />
				<text @tap="cleanKey" v-if="params.keyword" class="iconfont iconyx" style="color:#ADACAB;"></text>
			</view>
			<view @click="confirm" class="f-g-0 c8 ml30">搜索</view>
		</view>
		<view v-show="!issearch" class="p03">
			<view class="p30 f-x-bt">
				<view class="wei">搜索历史</view>
				<view @click="clear" class="f-y-c p2">
					<text class="iconfont iconshanchu c3"></text>
				</view>
			</view>
			<view class="f-raw">
				<block v-for="(v,i) in history" :key="i">
					<view @click="setKey(v)" class='f26 bf2f mr20 mb20 c3 lstag'>{{v}}</view>
				</block>
			</view>
		</view>
		<view v-if="query.page=='index'">
			<view hover-class="be" @click="goDl(v)" class="f-row p23 hlb" v-for="(v,i) in dataList" :key='i'>
				<view class="f-g-0 mr15">
					<text class="iconfont iconmd"></text>
				</view>
				<view class="f-g-1">
					<view class="f-y-c f30">
						<view class="t-o-e c0">{{v.name}}</view>
						<view class="f-g-0 f-y-c">
							<text v-if="isText(v,'1')" class="pai okzt f-c">堂</text>
							<text v-if="isText(v,'2')" class="mai okzt f-c">买</text>
							<text v-if="v.isOrder==1" class="wai okzt f-c">外</text>
						</view>
					</view>
					<view class="f-y-c f24 c9 mt15">
						<view class="f-g-1 t-o-e">
							<block v-if="v.typePname">
								<text>{{typeName(v)}}</text>
								<text class="m05">|</text>
							</block>
							<text>{{v.address}}</text>
						</view>
						<view class="f-g-0">{{v.distance}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class='bf f-raw'>
			<view class="w100" v-for="(v,i) in dataList" :key='i'>
				<mg-cell @tab="goDl(v)" isr="1" :img='v.icon' w='150' h='150' brs="10rpx" noc='1'>
					<view class='' slot='bd'>
						<view class="f-bt">
							<text class="t-o-e">{{v.name}}</text>
						</view>
						<view class="f-bt mt15">
							<text class="f24 c9 t-o-e">{{v.body}}</text>
						</view>
						<view v-if="v.outVipPrice>0" class="mt10 f-row">
							<view class="vipr f-y-c">
								<view class="vipimg">
									<mg-img :src='`${onImgurl}vipimg.png`'></mg-img>
								</view>
							</view>
							<view class="vipl f-y-c">
								<view>{{sl+v.outVipPrice}}</view>
							</view>
						</view>
						<view class="f-x-bt mt10">
							<text class="t-o-e" :style="{color:tColor}">{{sl+v.price}}</text>
							<button class="f-g-0 cartadd" :style="{background:tColor}"></button>
						</view>
					</view>
				</mg-cell>
			</view>
		</view>
		<view v-show="issearch">
			<jzz :nodata="dataList.length==0&&isget" :mygd='mygd' />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		getDw,
	} from "@/common/wechat-util.js"
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'order-index',
		components: {
			jzz,
		},
		data() {
			return {
				query: {},
				history: [],
				key: "",
				issearch: false,
				dataList: [],
				isget: false,
				mygd: false,
				params: {},
				tableId:'',
			}
		},
		async onLoad(options) {
			this.query = options
			this.getSystem({
				nosetNB: 1
			})
			this.util.setNT(options.page == 'shopGoods' || options.page == 'fastGoods' || options.page == 'inGoods' ? this.sjxx.shopData.name + '-搜索商品' : '搜索')
			if (options.page == 'shopdl' || options.page == 'shopGoods') {
				this.params = {
					storeId: this.storeInfo.id,
					page: 1,
					size: 10,
					keyword: '',
					item: '1', //1外卖2店内
				}
				this.query.api = 'spss'
			} else if (options.page == 'fastGoods') {
				this.params = {
					storeId: this.storeInfo.id,
					page: 1,
					size: 10,
					keyword: '',
					item: '2', 
				}
				this.query.api = 'spss'
			}else if (options.page == 'inGoods') {
				this.params = {
					storeId: this.sjxx.shopData.id,
					page: 1,
					size: 10,
					keyword: '',
					item: '2', 
				}
				this.query.api = 'spss'
			}else if (options.page == 'index') {
				let lc = await getDw({
					t: 0
				})
				this.params = {
					lat: lc.latitude,
					lng: lc.longitude,
					page: 1,
					size: 10,
					keyword: '',
					item: '', //1美食商家2外卖商家
				}
				this.query.api = 'StoreList'
			}
			if(options.tableId && options.page=='inGoods'){ 
				this.tableId = options.tableId
			}
			uni.getStorageSync('searchHistory') || uni.setStorageSync('searchHistory', [])
			this.history = uni.getStorageSync('searchHistory')
			// console.log(options)
		},
		onReachBottom() {
			if (!this.mygd && this.isget) {
				this.isget = false
				this.getList();
			}
		},
		computed: {
			...mapState(['sjxx']),
			...mapState({
				storeInfo: state => state.config.storeInfo,
			})
		},
		methods: {
			setKey(v) {
				this.params.keyword = v
				this.confirm()
			},
			cleanKey() {
				this.params.keyword = ''
				this.issearch = false
				this.isget = false
				this.mygd = false
				this.params.page = 1
				this.dataList = []
			},
			async clear() {
				try {
					await this.util.modal(`确认清空搜索历史吗？`)
					this.history = []
					uni.removeStorageSync('searchHistory')
				} catch (e) {
					//TODO handle the exception
				}
			},
			// cancel() {
			// 	this.issearch = false
			// 	this.key = ''
			// 	this.dataList = []
			// },
			confirm(e) {
				if (!this.params.keyword) return this.util.message('请输入搜索内容', 3)
				this.issearch = true
				this.isget = false
				this.mygd = false
				this.params.page = 1
				this.dataList = []
				this.getList()
				this.setHistory()
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api[this.query.api],
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			setHistory() {
				let h = uni.getStorageSync('searchHistory')
				if (h.findIndex(v => v == this.params.keyword) == -1) {
					h.push(this.params.keyword)
					uni.setStorageSync('searchHistory', h)
				}
				this.history = uni.getStorageSync('searchHistory')
			},
			goDl(v) {
				if (this.query.page == 'index') {
					if (v.inStorePower.length) {
						this.go({
							t: 1,
							url: '/yb_o2o/gfood/shop-dl?storeId=' + v.id
						})
					} else {
						this.go({
							t: 1,
							url: '/yb_o2o/shop/goods?storeId=' + v.id
						})
					}
				} else {
					if (this.params.item == 1) {
						if (this.query.page == 'shopdl') {
							this.go({
								t: 1,
								url: `/yb_wm/shop/out/goods-dl?gid=${v.id}&storeId=${this.params.storeId}`
							})
						} else {
							this.go({
								t: 2,
								url: `/yb_wm/shop/out/goods-dl?gid=${v.id}&storeId=${this.params.storeId}&page=shopGoods`
							})
						}
					}else if(this.params.item == 2){
						if (this.query.page == 'fastGoods') {
							this.go({
								t: 2,
								url: `/yb_wm/shop/in/goods-dl?gid=${v.id}&storeId=${this.params.storeId}&page=fastGoods`
							})
						}else if(this.query.page == 'inGoods'){
							this.go({
								t: 2,
								url: `/yb_wm/shop/in/goods-dl?gid=${v.id}&storeId=${this.params.storeId}&page=inGoods&tableId=${this.tableId}`
							})
						}
					}
				}
			},
			isText(co, t) {
				return co.inStorePower && co.inStorePower.indexOf(t) > -1
			},
			typeName(co) {
				return co.typeName ? co.typePname + '/' + co.typeName : co.typePname
			},
		},
	}
</script>

<style scoped lang="scss">
	.scl {
		height: 66rpx;
		border-radius: 35rpx;
	}

	.lstag {
		padding: 16rpx 26rpx;
		border-radius: 50rpx;
		line-height: 28rpx;
	}

	.okzt {
		width: 35rpx;
		height: 35rpx;
		font-size: 24rpx;
		margin-left: 10rpx;
		border-radius: 5rpx;
	}

	.wai {
		color: #EC9C1F;
		background: #FFF3E3;
	}

	.pai {
		color: #35B0A5;
		background: #DDFAFE;
	}

	.mai {
		color: #DC5338;
		background: #FFEDEA;
	}

	.m05 {
		margin: 0 8rpx;
	}
</style>
