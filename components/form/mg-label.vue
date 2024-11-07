<template>
	<view class="f-raw">
		<block v-for="(v,i) in labelArr" :key="i">
			<bk-b @tab='click(i)' :c-name="`bf5 mr20 mt20 bs60 ${!v.active&&'c3'}`" :color="v.active?color:''" :sname="{padding:'12rpx 30rpx'}"
			 :t='v.name' block='1'></bk-b>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	import bkB from '@/components/common/block-b.vue'
	export default {
		name: 'searchBox',
		components: {
			bkB
		},
		props: {
			labels: {
				type: Array,
				default () {
					return [];
				}
			},
			dval: {
				type: Array,
				default () {
					return [];
				}
			},
			max: {
				type: [String, Number],
				default: '',
			},
			color: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				labelArr: []
			}
		},
		computed: {
			getDval() {
				if (this.dval.length && this.labelArr.length) {
					for (let i in this.labelArr) {
						if (this.dval.indexOf(this.labelArr[i].name) > -1) {
							this.click(i)
						}
					}
				}
			},
		},
		watch: {
			labels: {
				handler(newval) {
					this.labelArr = utils.deepCopy(newval)
				},
				immediate: true,
			},
			// getDval: {
			// 	handler(newval) {
			// 	},
			// 	immediate: true,
			// }
		},
		methods: {
			click(e) {
				let labelArr = this.labelArr,
					arr = []
				this.$set(this.labelArr[e], 'active', !this.labelArr[e].active)
				for (let i in labelArr) {
					if (labelArr[i].active) {
						arr.push(labelArr[i])
					}
				}
				this.$emit('change', arr);
			},
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
</style>
