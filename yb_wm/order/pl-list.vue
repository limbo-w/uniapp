<template>
	<view class="bf">
		<view class="fixedtop">
			<nav-tab v-if="tabs.length" id='vnode' cname='hlb' icname='' :color='tColor' v-model="aIdx" @changeTab='changeTab'
			 :tabs='tabs'></nav-tab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;" :current="aIdx" @change="swiperTab">
			<swiper-item v-for="(tv,ti) in tabs" :key="ti">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower">
					<view :id="'top'+ti" class="tabht">边距盒子</view>
					<view v-if="ti==0" class="f-raw bf p-30-30-0">
						<block v-for="(v,i) in bqarr" :key='i'>
							<bk-b v-if="v.evaluateNum>0" @tab='tabBq(i)' block='1' type='2' :color="bqIdx==i?tColor:''" :c-name="`f22 ${bqIdx==i?'bf':'be6'} c6 mr20 mb20 p-10-20 bs30`"
							 :t='`${v.name} ${v.evaluateNum}`'></bk-b>
						</block>
					</view>
					<gf-evaluate num='9' v-for="(v,i) in dataList[aIdx].list" :key='i' :co='v' />
					<jzz :nodata="dataList[aIdx].list.length==0&&dataList[aIdx].isget" :mygd='dataList[aIdx].mygd' />
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import bkB from '@/components/common/block-b.vue'
	import gfEvaluate from '@/components/goods/gf-evaluate.vue'
	import jzz from '@/components/common/jzz.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'pl-list',
		components: {
			navTab,
			bkB,
			gfEvaluate,
			jzz,
		},
		data() {
			return {
				aIdx: 0,
				tabs: [],
				bqIdx: -1,
				bqarr: [],
				toView: '',
				dataList: [{
					list: [],
					isget: false,
					mygd: false,
					params: {
						page: 1,
						state: '',
						label: '',
					}
				}, {
					list: [],
					isget: false,
					mygd: false,
					params: {
						page: 1,
						state: '2',
					}
				}, {
					list: [],
					isget: false,
					mygd: false,
					params: {
						page: 1,
						state: '1',
					}
				}, {
					list: [],
					isget: false,
					mygd: false,
					params: {
						page: 1,
						state: '3',
					}
				}],
				params: {
					storeId: '',
					size: 10,
				}
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT(options.t)
			this.util.request({
				'url': this.api.EvaluateList,
				data: {
					storeId: options.id,
				}
			}).then(res => {
				// console.log(123,res.data)
				this.tabs = [{
					name: `全部(${res.data.count})`,
				}, {
					name: `晒图(${res.data.img})`,
				}, {
					name: `好评(${res.data.good})`,
				}, {
					name: `低分(${res.data.difference})`,
				}]
			})
			this.util.request({
				'url': this.api.Lable,
				data: {
					storeId: options.id,
					statistics:1,
				}
			}).then(res => {
				this.bqarr = res.data
			})
						// return
			// this.util.request({
			// 	'url': this.api.SelectNum,
			// 	data: {
			// 		storeId: options.id,
			// 	}
			// }).then(res => {
			// 	this.tabs = [{
			// 		name: `全部(${res.data.all})`,
			// 	}, {
			// 		name: `晒图(${res.data.photo})`,
			// 	}, {
			// 		name: `低分(${res.data.down})`,
			// 	}, {
			// 		name: '最新',
			// 	}]
			// })
			// this.util.request({
			// 	'url': this.api.LabelNum,
			// 	data: {
			// 		storeId: options.id,
			// 	}
			// }).then(res => {
			// 	this.bqarr = res.data
			// })
			this.params.storeId = options.id
			this.swiperTab({
				detail: {
					current: 0
				}
			})
		},
		computed: {},
		methods: {
			tabBq(i) {
				this.bqIdx = i == this.bqIdx ? -1 : i
				this.$set(this.dataList, 0, {
					list: [],
					isget: false,
					mygd: false,
					params: {
						page: 1,
						orderBy: '',
						label: this.bqIdx == -1 ? '' : this.bqarr[this.bqIdx].name
					}
				})
				this.getList()
			},
			toTop() {
				this.toView = ''
				setTimeout(() => {
					this.toView = 'top' + this.aIdx
				}, 10)
			},
			changeTab(index) {
				// console.log(index, this.aIdx, this.dataList)
			},
			swiperTab(e) {
				this.aIdx = e.detail.current;
				if (!this.dataList[e.detail.current].list.length) {
					this.getList()
				}
				// console.log(e)
			},
			lower: utils.throttle(function(e) {
				if (!this.dataList[this.aIdx].mygd && this.dataList[this.aIdx].isget) {
					this.dataList[this.aIdx].isget = false
					this.getList();
				}
				// console.log('lower', e)
			}, 300),
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.EvaluateList,
					method: 'POST',
					data: { ...this.params,
						...this.dataList[this.aIdx].params
					},
				})
				this.dataList[this.aIdx].list = this.dataList[this.aIdx].list.concat(data.list)
				this.dataList[this.aIdx].isget = true
				this.dataList[this.aIdx].mygd = this.params.size > data.list.length
				this.dataList[this.aIdx].params.page++
			},
			// 加载更多 util.throttle为防抖函数
			// lower: util.throttle(function(e) {
			// 	console.log(`加载${this.currentTab}`) //currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			// 	uni.showLoading({
			// 		title: '加载中',
			// 		mask: true
			// 	})
			// 	this.isRequest().then((res) => {
			// 		let tempList = this.list
			// 		tempList[this.currentTab] = tempList[this.currentTab].concat(res)
			// 		console.log(tempList)
			// 		this.list = tempList
			// 		this.$forceUpdate() //二维数组，开启强制渲染
			// 	})
			// }, 300),
		},
	}
</script>
<style scoped lang="scss">
</style>
