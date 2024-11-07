<template>
	<view class="mh100">
		<view v-if="aIdx!=-1" class="xqyfixedtop">
			<nav-tab cname="hlb" v-model="aIdx" @changeTab='changeTab' :tabs='tabs' color='#FF3535'></nav-tab>
		</view>
		<view class="p3" :class="{mt90:aIdx!=-1}">
			<view class="p3 bf bs10 mb30" v-for="(v,i) in dataList" :key='i'>
				<mg-cell cname='p0' @tab="go({t:1,url:``})" last='1' :img='v.portrait' w='80' h='80' brs='50%'>
					<template slot='bd'>
						<view class="f26 f-row">
							<view class="f-1 f30 wei">{{v.userName}}<text class="f22 c9 nowei ml5">（UID：{{v.userId}}）</text></view>
							<view :style="{color:v.type==1?'#74B9FF':'#14A118'}">{{v.type==1?'待入账':'已入账'}}</view>
						</view>
						<view class="f22 c9 mt10 f-x-bt">
							<view class="fsc bs5 p-3-10 f18 f-g-0">{{v.level}}级</view>
							<view class="f24 c9">预计收益:<text class="crb wei">{{sl+v.money}}</text></view>
						</view>
					</template>
					<!-- <template slot='ft'></template> -->
				</mg-cell>
				<view class="mt30 f24 c6">订单编号：{{v.outTradeNo}}</view>
				<view class="mt10 f24 c6">订单时间：{{v.createdAt.substring(0,16)}}</view>
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
	import {
		sljz,
		utilMixins,
	} from "@/common/util-mixins.js"
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'wdfs',
		components: {
			navTab,
			jzz
		},
		data() {
			return {
				aIdx: -1,
				tabs: [{
					name: '已入账',
				}, {
					name: '在路上',
				}],
				params: {
					size: 10,
					page: 1,
					type: '',
				},
			}
		},
		async onLoad(options) {
			console.log(options)
			this.getSystem()
			let t = ''
			switch (+options.t) {
				case 1:
					t = '今日收益'
					this.aIdx = 0
					// this.params.day = new Date().format("yyyy-MM-dd")
					break;
				case 2:
					t = '已完成订单'
					this.params.state = 2
					break;
				case 3:
					t = '在途中订单'
					this.params.state = 1
					break;
				case 4:
					t = '我的伙伴-收益详情'
					this.params.partnerId = options.uid
					break;
				default:
					t = '收益详情'
					this.aIdx = 0
					// this.params.day = options.day
					break;
			}
			this.util.setNT(t)
			await this.getLoginInfo()
			this.params.userId = this.uId
			if (options.t > 1) {
				this.getList()
			} else {
				this.changeTab(this.aIdx)
			}
		},
		mixins: [sljz, utilMixins],
		computed: {},
		methods: {
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				this.params.type = e == 0 ? 2 : 1
				this.dataList = []
				this.getList()
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.distributionDO,
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
		},
	}
</script>
<style scoped lang="scss">
	.fsc {
		background: #404040;
		color: #EEC520;
	}
</style>
