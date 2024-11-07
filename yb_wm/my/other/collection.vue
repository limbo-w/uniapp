<template>
	<view class="">
		<!-- <nav-tab cname="fixedtop" v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab> -->
		<view class="mt9 p3">
			<!-- <mg-coupon @btntap='btntap(v.id)' ttype='2' :color='tColor' cname='mb30' @operation='operation' v-for="(v,i) in dataList"
			 :key='i' :co='v'></mg-coupon> -->
			<view v-for="(v,i) in dataList" :key='i' class="bf bs30 mb30">
				<mg-cell @tab="goDl(v.storeId)" cname="p23" last='1' w='130' h='130' brs="15rpx" :img='v.icon'>
					<view slot='bd' class="f24 c9">
						<view class="f-bt">
							<view class="f-g-1 f32 wei f-y-c">
								<text class='t-o-e c0'>{{v.name}}</text>
								<!-- <text class="iconfont iconright c0 f24"></text> -->
							</view>
						</view>
						<view class="mt10 f-y-c">
							<uni-rate disabled size='25' icon='iconxing' active-color='#FF5B0A' :value="v.foodScore||5" :margin="4" />
							<!-- <text class="ml20 c6">￥22/人</text> -->
						</view>
						<view class="mt10 f-x-bt">
							<text v-if="typeName(v)">{{typeName(v)}}</text>
							<!-- <text>订单超时未支付</text> -->
						</view>
					</view>
					<view slot='ft' class="f-g-0 text-btnf bs30 p-5-20 bec c9">进入</view>
				</mg-cell>
			</view>
			<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	import uniRate from '@/components/third/uni-rate.vue'
	export default {
		name: 'myCoupon',
		components: {
			navTab,
			jzz,
			uniRate,
		},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '未使用',
					type: 1,
				}, {
					name: '已使用',
					type: 2,
				}, {
					name: '已失效',
					type: 3,
				}],
				dataList: [],
				isget: false,
				mygd: false,
				params: {
					userId: '',
					size: 10,
					page: 1,
					type: 1,
				},
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('我的收藏')
			await this.getLoginInfo()
			this.params.userId = this.uId
			this.aIdx = +options.idx || 0
			this.changeTab(this.aIdx)
		},
		onReachBottom() {
			if (!this.mygd && this.isget) {
				this.isget = false
				this.getList();
			}
			// console.log('onReachBottom')
		},
		computed: {},
		methods: {
			refresh() {
				this.changeTab(this.aIdx)
			},
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.size = 10
				this.params.type = this.tabs[e].type
				this.dataList = []
				this.getList()
				// console.log(e, this.aIdx)
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.MyCollection,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			typeName(co) {
				return co.typeName ? co.typePname + '/' + co.typeName : co.typePname
			},
			goDl(id) {
				this.go({
					t: 1,
					url: '/yb_o2o/gfood/shop-dl?storeId=' + id
				})
			}
		},
	}
</script>

<style scoped lang="scss">
</style>
