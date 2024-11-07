<template>
	<view :style="{height:`${co.height}${u}`,background:co.colorBg}"></view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'blank',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			u: {
				type: String,
				default: 'px'
			},
		},
		data() {
			return {

			}
		},
		methods: {},
		async created() {},
	}
</script>

<style scoped lang="scss">
</style>
