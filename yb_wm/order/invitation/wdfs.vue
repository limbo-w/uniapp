<template>
	<view class="bf mh100">
		<view class="xqyfixedtop">
			<nav-tab v-if="aIdx!=-1" cname="hlb" v-model="aIdx" @changeTab='changeTab' :tabs='tabs' color='#FF3535'></nav-tab>
		</view>
		<view class="p03" :class="{mt90:aIdx!=-1}">
			<mg-cell cname='p30' v-for="(v,i) in dataList" :key='i' hc='1' isl='1'
			 :img='v.portrait' w='72' h='72' brs='50%' ftc='f-s-1 wei' color='#F10D24'>
				<template slot='bd'>
					<view class="f26">{{v.userName}}<text class="f22 c9 ml5">（UID：{{v.bindId}}）</text></view>
					<view class="f22 c9 mt10">推荐时间：{{v.createdAt.substring(0,16)}}</view>
				</template>
				<!-- <template slot='ft'></template> -->
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
				aIdx: 0,
				params: {
					userId: '',
					size: 10,
					page: 1,
					type: '',
				},
				tabs: [{
						name: '直接伙伴',
					},
					{
						name: '间接伙伴',
					},
				],
			}
		},
		async onLoad(options) {
			console.log(options)
			this.getSystem()
			this.util.setNT('我的伙伴')
			await this.getLoginInfo()
			this.params.userId = this.uId
			// this.aIdx = options.idx != null ? +options.idx : -1
			this.changeTab(this.aIdx)
		},
		mixins: [sljz, utilMixins],
		computed: {
			...mapState('dndc', ['fxsInfo']),
			// tabs() {
			// 	let a = [{
			// 		name: `直接伙伴（${this.fxsInfo.fristNum}）`,
			// 	}, {
			// 		name: `间接伙伴（${this.fxsInfo.secondNum}）`,
			// 	}]
			// 	if (this.fxsInfo.grade != 1) {
			// 		a.splice(1, 1)
			// 	}
			// 	return a
			// },
		},
		methods: {
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				e != -1 && (this.params.type = e + 1)
				this.dataList = []
				this.getList()
			},
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.distributionGO,
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

</style>
