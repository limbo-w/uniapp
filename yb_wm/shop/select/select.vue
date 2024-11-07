<template>
	<view class="bf f-col h100">
		<view class="sttab f-row o-x-s">
			<view @click="changeTab(i)" v-for="(v,i) in tabs" :key="i" class="p02 f-g-0">
				<view class="h100 f-c f30" :class="{'wei c0 xzc':aIdx==i}">{{v.name}}</view>
			</view>
		</view>
		<view class="f-1">
			<swiper :class="zfbH" :current="aIdx" @change="swiperTab">
				<swiper-item v-for="(v,i) in arr" :key="i" @touchmove.stop='stopTouchMove'>
					<scroll-view class="h100" scroll-y="true">
						<view @click="xzitem(i,ci)" v-for="(cv,ci) in arr[i]" :key="ci" class="p23 f-x-bt">
							<view>{{cv.name}}</view>
							<view v-if="ci==xzarr[i]" class="iconfont icongou c0 ml20 f24 wei"></view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	export default {
		name: 'select-select',
		components: {},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '中国',
				}, {
					name: '城市',
				}, {
					name: '',
				}],
				arr: [
					[{
						name: '中国'
					}],
					[],
					[{
						name: '全部地区',
						id: '',
					}]
				],
				xzarr: [0, 0, 0],
				// #ifdef  MP-WEIXIN || H5
				zfbH:'h100',
				// #endif
				// #ifdef  MP-ALIPAY || MP-TOUTIAO
				zfbH:'mvh100',
				// #endif
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('选择地区')
			let info = JSON.parse(decodeURIComponent(options.info))
			//
			this.tabs[1].name = info.cityName
			this.tabs[2].name = info.zoneName || '全部地区'
			// console.log(info)
			//
			let {
				data
			} = await this.util.request({
				'url': this.api.cssj,
				method: 'POST',
			})
			this.citys = data
			//
			this.arr[0] = data.map(v => ({
				name: v.name
			}))
			this.arr[1] = data[0].children.map(v => ({
				name: v.name,
				id: v.id
			}))
			this.arr[2] = this.arr[2].concat(data[0].children.find(v => v.id == info.cityId).children)
			//
			this.xzarr[1] = this.arr[1].findIndex(v => v.id == info.cityId)
			this.xzarr[2] = this.arr[2].findIndex(v => v.id == info.zoneId)
			setTimeout(() => {
				this.aIdx = 2
			}, 100)
			// console.log(this.arr)
		},
		computed: {},
		methods: {
			stopTouchMove() {
				return false
			},
			changeTab(i) {
				this.aIdx = i
			},
			swiperTab(e) {
				this.aIdx = e.detail.current;
			},
			xzitem(i, ci) {
				// console.log(i, ci)
				if (i == 0) return
				if (i == 1) {
					this.tabs[i].name = this.arr[i][ci].name
					this.tabs[i + 1].name = '全部地区'
					this.xzarr[i] = ci
					this.xzarr[i + 1] = -1
					this.arr[2] = [{
						name: '全部地区',
						id: ''
					}].concat(this.citys[0].children[ci].children)
					this.aIdx = i + 1
				}
				if (i == 2) {
					// this.tabs[i].name = this.arr[i][ci].name
					this.$set(this.xzarr, i, ci)
					// console.log(this.arr[1][this.xzarr[1]], this.arr[2][this.xzarr[2]])
					// return
					utils.stfn(() => {
						uni.$emit('changeCity', {
							dwcsInfo: {
								cityId: this.arr[1][this.xzarr[1]].id,
								cityName: this.arr[1][this.xzarr[1]].name,
								zoneId: this.arr[2][this.xzarr[2]].id,
								zoneName: this.arr[2][this.xzarr[2]].name,
							}
						});
						this.go({
							t: 4
						})
					}, 200)
				}
				// console.log(this.arr)
			}
		},
	}
</script>
<style scoped lang="scss">
	.sttab {
		border-bottom: 1px solid #EAEAEA;
		height: 90rpx;

		.xzc {
			border-bottom: 4rpx solid #000;
		}
	}

	.c5d {
		color: #555;
	}
</style>
