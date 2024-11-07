<template>
	<view class="container pb115">
		<view class="p23">
			<block v-for='(v,i) in dataList' :key='i'>
				<view @click="chooseAdd(v)" class="bf bs20 p23 mb20 f-row" :class="{'bggray ce5':v.isClick==2}">
					<view class="f-g-1">
						<view class="f-row">
							<view style="max-width: 80%;" class="f32 mr10 t-o-e">{{v.address}}</view>
							<bk-b type='2' c-name='f-g-0 f22 c6 mr20 p-5-10' :t='v.label' :color="labelColor(v.label)"></bk-b>
						</view>
						<view class="f24 mr10 t-o-e">{{v.details}}</view>
						<view class="f-row f24 c6 mt15" :class="{'ce5':v.isClick==2}">
							<text class="mr20">{{v.userName}}({{v.sex=='女生'?'女士':v.sex}}）</text><text>{{v.userTel}}</text>
						</view>
						<view v-if="v.isClick==2" class="f24 mt10" style="color: #f00;">超出配送范围</view>
					</view>
					<view @click.stop="go({t:1,url:'address?id='+v.id})" class="f-g-0 f-c ml20">
						<text class="iconfont iconbianji f40"></text>
					</view>
				</view>
			</block>
		</view>
		<view class="foot-btnc">
			<button @click="xzdz" class="foot-btn" :style="{background:tColor}">+新增地址</button>
		</view>
		<jzz bgcolor="transparent" otext="暂无地址信息" ttext="请点击底部按钮添加地址" imgn='zwdz' :nodata="dataList.length==0&&isget" :mygd='mygd' />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import mgInput from '@/components/form/mg-input.vue'
	import mgRadio from '@/components/form/mg-radio.vue'
	import bkB from '@/components/common/block-b.vue'
	import jzz from '@/components/common/jzz.vue'
	import utils from '@/common/utils.js'
	let app = getApp().globalData
	export default {
		components: {
			mgInput,
			mgRadio,
			bkB,
			jzz
		},
		data() {
			return {
				dataList: [],
				isget: false,
				mygd: false,
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('我的地址')
			this.query = options
			await this.getLoginInfo()
			//1提交订单页2点单页有自取和外卖，自取在前选择外卖3点单页只有外卖或者外卖在前，点购物车去选择地址4.拖拽式点进来选地址
			if (this.query.from && this.query.from <= 4) {
				if (options.storeId) {
					this.params = {
						storeId: options.storeId,
					}
				} else {
					this.params = {}
				}
			} else {
				this.params = {}
			}
			this.getData()
			console.log(options)
			// uni.setStorageSync('bdhc', {
			// 	name: 123
			// })
		},
		onShow() {},
		// onUnload() {
		// 	setTimeout(() => {
		// 		uni.setStorageSync('bdhc', '')
		// 		console.log('onUnload执行')
		// 	}, 1000)
		// },
		computed: {
			...mapState('dndc', ['latLng']),
		},
		methods: {
			...mapActions(['']),
			async getData() {
				let res = await this.util.request({
					'url': this.api.wdshdz,
					data: this.params
				})
				this.dataList = res.data || []
				if (app.xzdzInfo) {
					let t = this.dataList.findIndex(v => v.id == app.xzdzInfo.id) == -1
					if (t) {
						app.xzdzInfo = null
					}
				}
				this.isget = this.mygd = true
			},
			async chooseAdd(e) {
				if (e.isClick == 2) return
				// console.log(e, this.query)
				if (this.query.from && this.query.from <= 4) {
					this.util.showLoading('设置地址...')
					let res = await this.util.request({
						'url': this.api.xzshdz,
						method: 'POST',
						data: {
							storeId: this.query.storeId || '',
							addressId: e.id,
							lat: this.latLng.lat || '',
							lng: this.latLng.lng || '',
						}
					})
					if (res) {
						app.xzdzInfo = res.data
						if (this.query.from != 4) {
							if (this.query.from == 3) {
								// app.wmxzdz = 1
								uni.$emit('qjjtsj', {
									wmtz: 1
								})
								return
							}
							utils.swnb()
						} else {
							this.go({
								t: 6,
								url: '/yb_wm/index/goods'
							})
							setTimeout(() => {
								uni.$emit('qjjtsj', 1)
							}, 200)
						}
						// let lastPage = this.util.getPage()
						// utils.swnb()
						// setTimeout(() => {
						// 	lastPage.$vm.refreshAddress(res.data)
						// }, 100)
					}
				} else if (this.query.from == 5) {
					uni.$emit('changeChoose', {
						addInfo: e
					});
					utils.swnb()
				}
			},
			xzdz() {
				this.go({
					t: 1,
					url: 'address'
				})
			},
			chooseAddress() {
				uni.authorize({
					scope: 'scope.address',
					success(e) {
						uni.chooseAddress({
							success(res) {
								console.log(res)
							}
						})
					},
					fail(e) {
						uni.showModal({
							title: '温馨提示',
							content: '获收货地址授权失败',
							confirmText: '去设置',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success(res) {
											console.log(res.authSetting)
										}
									});
								} else if (res.cancel) {}
							}
						});
						console.log(e)
					}
				})
			},
			labelColor(v) {
				return v == '公司' ? '#94B2D8' : v == '家' ? '#DF8884' : '#A0B888'
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
