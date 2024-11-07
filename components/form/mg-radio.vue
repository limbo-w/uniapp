<template>
	<radio-group @change="radioChange" v-model="radioVal">
		<view v-if="rtype==1" class="f-raw">
			<label class="weui-cell mr-r1i noafter" v-for="(item, index) in arr" :key="index" :style="[rsname]">
				<view class="mr10">
					<radio :value="item.value" :checked="item.value == radioVal" class="weui-check" />
					<text class="iconfont f40" :class="item.value == radioVal?'icongx':'iconwgx'" :style="{color:item.value == radioVal?color||tColor:''}"></text>
				</view>
				<view>{{item.name}}</view>
			</label>
		</view>
		<view v-else-if="rtype==2">
			<label v-for="(item, index) in arr" :key="index">
				<mg-cell isr='1' :btt="item.name" :bttc='`c3 ${bttc}`' cname="p253" :last="last||index==arr.length-1">
					<block v-if="ranktype==1">
						<view slot='ft' class="f-y-c">
							<radio :value="item.value" :checked="item.value == radioVal" class="weui-check" />
							<text class="iconfont f40" :class="item.value == radioVal?'icongx':'iconwgx'" :style="{color:item.value == radioVal?color||tColor:''}"></text>
						</view>
					</block>
					<block v-else>
						<view slot='hd' class="f-y-c mr30">
							<radio :value="item.value" :checked="item.value == radioVal" class="weui-check" />
							<text class="iconfont f40" :class="item.value == radioVal?'icongx':'iconwgx'" :style="{color:item.value == radioVal?color||tColor:''}"></text>
						</view>
					</block>
				</mg-cell>
			</label>
		</view>
	</radio-group>
</template>
<script>
	import MgCell from '@/components/common/mg-cell.vue'
	export default {
		components: {
			MgCell,
		},
		props: {
			arr: '',
			value: '',
			color: '',
			rtype: {
				type: String,
				default: '1',
			},
			rsname: Object,
			ranktype: {
				type: String,
				default: '1',
			},
			bttc: {
				type: String,
				default: '',
			},
			last: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				items: [],
				current: ''
			}
		},
		computed: {
			radioVal: {
				get() {
					return this.value
				},
				set(newVal) {
					this.$emit("input", newVal)
					//console.log(newVal)
				}
			}
		},
		methods: {
			radioChange(e) {
				this.radioVal = e.detail.value
				this.$emit('change', e.detail.value)
				//console.log(e.detail.value,this.radioVal)
			}
		}
	}
</script>

<style scoped>
	.mr-r1i {
		padding: 30rpx 40rpx 30rpx 0;
	}
</style>
