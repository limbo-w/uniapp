<template>
	<view class="p3">
		<!-- <nav-tab cname="fixedtop" v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab> -->
		<!-- <view class="mt90 p3"> -->
		<mg-coupon ptype="4" @change='radioChange' :color='tColor' cname='mb30' v-for="(v,i) in dataList" :key='i' :co='v'></mg-coupon>
		<jzz v-if="dataList.length==0" imgn='zwhb' bgcolor="transparent" :nodata="true" :mygd='true' />
		<!-- </view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import mgCoupon from '@/components/common/mg-coupon.vue'
	import jzz from '@/components/common/jzz.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'myCoupon',
		components: {
			navTab,
			mgCoupon,
			jzz,
		},
		data() {
			return {
				dataList: []
			}
		},
		onLoad(options) {
			this.util.setNT('选择' + options.name)
			let arr = uni.getStorageSync('kyhb').data
			if (options.couponId) {
				for (let i in arr) {
					if (options.couponId == arr[i].id) {
						arr[i].checked = !arr[i].checked
					} else {
						arr[i].checked = false
					}
				}
			}
			this.dataList = arr
			this.query = options
			console.log(this.query, uni.getStorageSync('kyhb'))
		},
		computed: {},
		methods: {
			radioChange(e) {
				this.util.showLoading()
				let arr = this.dataList
				for (let i in arr) {
					if (e == arr[i].id) {
						// this.$set(arr[i], 'checked', !arr[i].checked)
						arr[i].checked = !arr[i].checked
					} else {
						// this.$set(arr[i], 'checked', e == arr[i].id)
						arr[i].checked = e == arr[i].id
					}
				}
				// this.dataList=arr.concat([])
				// this.dataList = Object.assign([], arr)
				// let a=Object.assign({},arr[0])
				// arr[0].a=1
				// console.log(this.dataList,arr,a,arr[0])
				let i = arr.find(v => v.checked == true)
				uni.$emit('payorder', {
					hbInfo: i,
					type: this.query.t,
				});
				utils.swnb(200)
				// console.log(e, this.dataList, i)
			},
		},
	}
</script>

<style scoped lang="scss">
</style>
