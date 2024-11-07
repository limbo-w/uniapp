<template>
	<view class="bf p23 p-r" :class="[cname]">
		<checkbox-group @change="checkboxChange">
			<label class='f-y-c'>
				<block v-if='type==1'>
					<!-- <checkbox :checked="cbVal" :color="color" style="transform:scale(0.7)" /> -->
					<checkbox :checked="cbVal" class="weui-check" />
					<text class="iconfont mr10" :class="cbVal?'icongx':'iconwgx'" :style="{color:cbVal?color:''}"></text>
					<view>阅读并同意</view>
					<navigator :url='`/yb_wm/my/other/gywm?t=${title}&p=${p}`' class="weui-agree__link" :style="{color:color}">《{{title}}》</navigator>
				</block>
				<block v-else>
					<checkbox :checked="cbVal" class="weui-check" />
					<text class="iconfont mr10" :class="cbVal?'icongx':'icongx'" :style="{color:cbVal?color:''}"></text>
					<view class="c9 f24">{{title}}</view>
				</block>
			</label>
		</checkbox-group>
	</view>
</template>
<script>
	import MgCell from '@/components/common/mg-cell.vue'
	export default {
		components: {
			MgCell,
		},
		props: {
			title: '',
			value: '',
			color: '',
			p: '',
			cname: '',
			sname: '',
			type: {
				type: String,
				default: '1',
			},
		},
		data() {
			return {}
		},
		computed: {
			cbVal: {
				get() {
					return this.value
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			}
		},
		methods: {
			checkboxChange(e) {
				this.cbVal = !this.cbVal
			}
		}
	}
</script>

<style scoped>
	.weui-cell {
		padding: 30rpx 40rpx 30rpx 0;
	}
</style>
