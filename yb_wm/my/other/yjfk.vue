<template>
	<view class="bf">
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'order-index',
		data() {
			return {

			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('联系客服')
		},
		computed: {},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style scoped lang="scss">

</style>
