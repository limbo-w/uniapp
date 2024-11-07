<template>
	<view class="bf mh100 pt110 pb130">
		<nav-tab cname="fixedtop" v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<view class="p03">
			<mg-cell cname='p30' v-for="(v,i) in dataList" :key='i' isl='1' :img='v.portrait' w='72' h='72' brs='50%'>
				<template slot='bd'>
					<view class="f26">{{v.userName}}<text class="f22 c9 ml5">（UID：{{v.bindId}}）</text></view>
					<view class="f22 c9 mt10">推荐时间：{{v.createdAt.substring(0,16)}}</view>
				</template>
				<template slot='ft'>
					<view v-if="v.state=='1'" class="cgreen">已完成</view>
					<view v-if="v.state=='2'" class="cf5">未完成</view>
				</template>
			</mg-cell>
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
	import navTab from '../../../components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'wdfs',
		components: {
			navTab,
			jzz
		},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '已完成',
				}, {
					name: '未完成',
				}],
				params: {
					userId: '',
					size: 10,
					page: 1,
				},
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('邀请列表')
			await this.getLoginInfo()
			this.params.userId = this.uId
			// this.getList()
			this.changeTab(0)
		},
		mixins: [sljz, utilMixins],
		computed: {
			...mapState('dndc', ['fxsInfo']),
		},
		methods: {
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.ownilist,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				let type = ''
				switch (e) {
					case 0:
						type = '1';
						break;
					case 1:
						type = '2';
						break;
				}
				this.params.state = type
				this.dataList = []
				this.getList()
			},
		},
	}
</script>
<style scoped lang="scss">
	.pt110 {
		padding-top: 110rpx;
	}
	.cgreen{
		color: #5FD047;
	}
</style>
