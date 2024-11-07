<template>
	<view class="p30">
		<mg-cell @tab="go({url:'txxq?id='+v.id})" hc='1' class="" v-for="(v,i) in dataList" :key='i' isr='1' :btt='txType(v.type)'
		 bttc='f30' :bbt='`申请时间：${v.createdAt}`' ftc='f-s-1 t-r'>
			<template slot='ft'>
				<view class="f30 c3">-{{v.money}}</view>
				<view class="mt10 f26" :class="v.state==2?'c00':v.state==3?'crb':'cf3'">{{v.state==2?'已通过':v.state==3?'已拒绝':'待审核'}}</view>
			</template>
		</mg-cell>
		<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		sljz,
		utilMixins,
	} from "@/common/util-mixins.js"
	import jzz from '@/components/common/jzz.vue'
	export default {
		name: 'invite',
		components: {
			jzz
		},
		data() {
			return {
				params: {
					size: 10,
					page: 1,
					item: '',
				},
				query: {}
			}
		},
		async onLoad(op) {
			this.query = op
			this.getSystem()
			this.util.setNT(op.t == 1 ? '老带新提现记录' : '分销提现记录')
			await this.getLoginInfo()
			this.params.item = op.t
			// this.params.state = op.t == 1 ? '2' : op.t == 2 ? '1' : ''
			this.getList()
		},
		mixins: [sljz, utilMixins],
		computed: {},
		methods: {
			async getList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.memberWL,
					method: 'POST',
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			txType(v) {
				let n = ''
				switch (+v) {
					case 1:
						n = "微信";
						break;
					case 3:
						n = "银行卡";
						break;
					case 2:
						n = "支付宝";
						break;
					case 4:
						n = "余额";
						break;
				}
				return n
			},
		},
	}
</script>
<style scoped lang="scss">

</style>
