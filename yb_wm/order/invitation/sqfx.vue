<template>
	<view class="container pb115">
		<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
		<view class="main">
			<view class="bf mainc">
				<view class="p03">
					<view class="p30 f32 wei t-c">{{isbj?'修改':'填写'}}资料</view>
				</view>
				<mg-input isr='1' v-model="params.name" hw='130' ht='姓名' pr='请输入姓名'></mg-input>
				<mg-input isr='1' v-model="params.tel" :max='11' t='number' hw='130' ht='手机号' pr='请输入手机号'>
				</mg-input>
			</view>
			<mg-agree :title='`${fxsInfo.agreementTitle}`' p='13' :color="tColor" v-model="agree"></mg-agree>
		</view>
		<view class="foot-btnc posi-r mt30">
			<button @click="save" :loading="loading" :disabled="loading" class="foot-btn bs15" hover-class="btnhc"
				style="background: #FF4E3A;">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import mgInput from '@/components/form/mg-input.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import mgRadio from '@/components/form/mg-radio.vue'
	import bkB from '@/components/common/block-b.vue'
	import sqBtn from '@/components/common/sq-btn.vue'
	import utils from '@/common/utils.js'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import mgAgree from '@/components/form/mg-agree.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		components: {
			mgInput,
			mgRadio,
			MgCell,
			bkB,
			sqBtn,
			MgSwiper,
			mgAgree,
		},
		data() {
			return {
				t: 'digit',
				params: {
					name: '',
					tel: '',
				},
				loading: false,
				isbj: false,
				agree: true,
			}
		},
		async onLoad(options) {
			if (options.userId) {
				this.isbj = true
			}
			this.util.setNT('申请')
			this.getLoginInfo().then(() => {
				this.getFxzx()
				this.params.tel = this.user.userTel || ''
				// if (this.isbj) {
				// 	this.params.realName = this.user.realName
				// }
			})
			console.log(11, this.fxsInfo.adImg)
		},
		mixins: [utilMixins],
		computed: {
			...mapState('dndc', ['fxsInfo']),
			swiper() {
				return {
					topMargin: 0,
					leftRightPadding: 0,
					upDownPadding: 0,
					swiper: [{
						icon: this.fxsInfo.adImg
					}],
					duration: '',
					height: '250',
					radius: '0',
					auto: true,
					interval: 5,
				}
			},
		},
		methods: {
			...mapActions('dndc', ['getFxzx']),
			async save() {
				if (!await this.checkLogin()) return
				let filterArr = []
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						name: '请输入姓名',
						tel: '请输入手机号',
					}
				})
				if (!judgeData) {
					return
				} else {
					if (!this.agree) {
						return this.util.message('请阅读并同意服务协议', 3)
					}
					if (!utils.isTelCode(this.params.tel)) return this.util.message('请输入正确的手机号', 3)
					this.loading = true
					let res = await this.util.request({
						'url': this.api.distributionAD,
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('提交成功', 1, 1000)
						this.loading = false
						utils.stfn(() => {
							this.go({
								t: 3,
								url: '/yb_wm/index/my-index'
							})
						})
					}
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.main {
		padding: 0;
	}

	.mainc {
		padding: 0;
	}
</style>
