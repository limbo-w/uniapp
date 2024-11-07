<template>
	<view class="mh100 bf pb130">
		<nav-tab cname="" ifsize='32' v-model="tIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<view class="f-raw f-x-bt p03">
			<view class="imgc bs10" v-for="(v,i) in list" :key='i' @click="yl(i)">
				<mg-img :src="v"></mg-img>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import MgImg from '@/components/common/mg-img.vue'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	export default {
		name: 'bzf',
		components: {
			MgImg,
			navTab,
		},
		data() {
			return {
				info: {},
				list: [],
				tIdx: 0,
				tabs: [{
						name: '商品安全档案'
					},
					{
						name: '营业执照'
					},
				],
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.info = JSON.parse(decodeURIComponent(options.info))
			this.changeTab(this.tIdx)
		},
		computed: {},
		methods: {
			changeTab(e) {
				if (this.tIdx == 0) {
					this.util.setNT('商品安全档案')
					this.list = this.info.foodRecords.map(v => this.getImgS(v))
				} else if (this.tIdx == 1) {
					this.util.setNT('营业执照')
					this.list = this.info.license.map(v => this.getImgS(v))
				}
			},
			yl(i) {
				this.util.preImg({
					idx: i,
					urls: this.list,
				})
			}
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
	.imgc {
		width: 320rpx;
		height: 320rpx;
		margin-top: 30rpx;
	}
</style>
