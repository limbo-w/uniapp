<template>
	<mg-modal :ismr="true" v-model="show" width="550rpx" :z-index="3000">
		<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
		<view @click="show=false" class="tcbtm f-c"><text class="iconfont iconcuo cf f60"></text></view>
	</mg-modal>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgModal from '@/components/common/modal.vue'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	export default {
		name: 'searchBox',
		components: {
			mgModal,
			MgSwiper,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			value: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: function() {
	return []
}
			},
			color: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				swiper: {
					class: 'bs20',
					swiper: {
						children: []
					},
					duration: '',
					mode: '',
					height: '733',
					radius: 20,
					auto: true,
					interval: 5,
				},
			}
		},
		computed: {
			show: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
		},
		watch: {
			list: {
				async handler(newVal) {
					if (newVal.length) {
						this.swiper.swiper.children = newVal
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		methods: {},
	}
</script>

<style scoped lang="scss">
	.tcbtm {
		margin-top: 50rpx;
	}
</style>
