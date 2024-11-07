<template>
	<view v-if="content" class="bf p23">
		<mg-rtext type='2' :content="content" />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	export default {
		name: 'gywm',
		components: {
			mgRtext,
		},
		data() {
			return {
				loading: false,
				content: '',
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT(options.t)
			let c = ''
			switch (+options.p) {
				case 1:
					c = this.system.introduction;
					break;
				case 2:
					let {
						data
					} = await this.util.request({
						'url': this.api.bzxq,
						data: {
							id: options.id
						}
					})
					c = data.body;
					break;
				case 3:
					c = this.vipConfig.cardNotice;
					break;
				case 4:
					c = uni.getStorageSync('fwb');
					break;
				case 5:
					c = this.recharge.details
					break;
				case 6:
					c = uni.getStorageSync('fwb');
					break;
				case 7:
				case 9:
					c = uni.getStorageSync('fwb');
					break;
				case 8:
					let rest = await this.util.request({
						'url': this.api.config,
						data: {
							ident: 'integralShop '
						}
					})
					c = rest.data.details;
					break;
				case 10:
					c = this.enterset.agreement
					break;
				case 11:
					c = this.storageset.content
					break;
				case 12:
					c = this.payVipset.introduction
					break;
				case 13:
					c = this.fxsInfo.agreement
					break;
				case 14:
					let storageset = await this.util.request({
						'url': this.api.getStoreConfig,
						data: {
							ident: 'storageset',
							storeId: this.storeInfo.id
						}
					})
					c = storageset.data.details;
					break;
			}
			this.content = c
			console.log(options)
		},
		computed: {
			...mapState(['vipConfig']),
			...mapState({
				enterset: state => state.config.enterset,
				storageset: state => state.config.storageset,
				recharge: state => state.config.recharge,
				payVipset: state => state.config.payVipset,
				storeInfo: state => state.config.storeInfo,
			}),
			...mapState('dndc', ['fxsInfo']),
		},
		methods: {},
	}
</script>
<style scoped lang="scss">
</style>
