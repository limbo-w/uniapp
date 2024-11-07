<template>
	<view class="bf m3 bs20">
		<block v-for="(v,i) in arr" :key="i">
			<view class="bf">
				<mg-cell @tab="goDl(v)" :last="i==arr.length-1" isr='1' :btt='v.title' bttc="c3" arrow="1" cname="p23" />
			</view>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'order-index',
		components: {
			jzz,
		},
		data() {
			return {
				arr: [],
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('帮助中心')
			let {
				data
			} = await this.util.request({
				'url': this.api.bzzx,
			})
			this.arr = data
		},
		computed: {},
		methods: {
			goDl(v) {
				this.go({
					t: 1,
					url: `/yb_wm/my/other/gywm?t=${v.title}&p=2&id=${v.id}`
				})
			}
		},
	}
</script>
<style scoped lang="scss">
</style>
