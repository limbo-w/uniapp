<template>
	<view class="remind" v-if="co" :style="{
			marginTop: co.marginTop + 'px',
			marginBottom: co.marginBottom + 'px'
		}">
	</view>
</template>
<script>
	export default {
		name: 'remind',
		data() {
			return {
				img: '../../../static/tubiao/xuanfu.png',
				activeIndex: 0,
				intnum: undefined
			};
		},
		computed: {
			top() {
				return -this.activeIndex * 30 + 'px';
			}
		},
		props: ['co'],
		mounted() {
			// this.ScrollUp();
		},
		methods: {
			ScrollUp() {
				// eslint-disable-next-line no-unused-vars
				this.intnum = setInterval(_ => {
					if (this.activeIndex < this.co.numberList.length) {
						this.activeIndex += 1;
					} else {
						this.activeIndex = 0;
					}
				}, 1000);
			},

			Stop() {
				clearInterval(this.intnum);
			},
			Up() {
				this.ScrollUp();
			}
		}
	};
</script>
<style lang="scss" scoped>
	.remind {}
</style>
