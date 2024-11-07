<template>
	<view class="lines" :style="{ margin: `${co.marginTB}${u} 0`}">
		<view class="one" v-if="co.type!=2" :style="{borderColor:co.colorBg, borderWidth: co.height + u,borderTopStyle:co.type==1?'solid':co.type==3?'dashed':'dotted' }"></view>
		<view class="two" v-else :style="{borderColor:co.colorBg, height: co.height + u }"></view>
	</view>
</template>
<script>
	export default {
		name: 'lines',
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
			return {};
		},
		methods: {
			goTo(v) {
				this.goUrl(v.url, v)
			}
		},
	};
</script>
<style lang="scss" scoped>
	.lines {
		.one {
			border-top: 1px solid #eee;
		}

		.two {
			border-width: 1px 0;
			border-style: solid;
		}
	}
</style>
