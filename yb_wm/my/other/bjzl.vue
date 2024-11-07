<template>
	<view class="container pb115">
		<view class="bf mb20 f-c maint">
			<view class="timg bsf">
				<mg-img :src="user.portrait"></mg-img>
			</view>
		</view>
		<view class="bf">
			<mg-input isr='1' v-model="user.userName" ht='昵称' dis="1"></mg-input>
			<mg-input isr='1' v-model="user.id" ht='用户ID' dis="1"></mg-input>
			<mg-input isr='1' v-model="params.realName" ht='真实姓名' pr='请输入姓名'></mg-input>
			<mg-input isr='1' v-model="params.userTel" :max='11' t='number' ht='电话' pr='请输入手机号'>
				<!-- #ifdef MP-WEIXIN -->
				<sq-btn slot='ft' @refresh='setTel' type="2" cname="text-btnf f24 ml20 p0" :sname="{background:tColor}" w='120' h='50'
				 t='自动填写'></sq-btn>
				<!-- #endif -->
			</mg-input>
			<mg-cell isr='1' cname='p03' ht='性别' htc="f30">
				<view slot='bd'>
					<mg-radio v-model="params.sex" :arr='sexArr' :color="tColor"></mg-radio>
				</view>
			</mg-cell>
			<!-- <mg-cell v-if='!isbj' last="1" isr='1' ht='生日' htc="f30">
				<picker slot='bd' mode="date" :value="date" :end="endDate" @change="bindDateChange">
					<view class="f30" :class="params.birthday?'':'c9'">{{params.birthday||'生日当天有优惠'}}</view>
				</picker>
			</mg-cell>
			<mg-cell v-else last="1" isr='1' ht='生日' htc="f30" :btt="params.birthday" bttc="c9"></mg-cell> -->
		</view>
		<view class="foot-btnc posi-r">
			<button @click="save" :loading="loading" :disabled="loading" class="foot-btn bs5 f32 f-c" :style="{background:tColor}"
			 hover-class="btnhc">保存</button>
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
		},
		data() {
			return {
				t: 'digit',
				params: {
					userId: '',
					userTel: '',
					// birthday: '',
					sex: '男',
					realName: '',
				},
				sexArr: [{
						value: '男',
						name: '男'
					},
					{
						value: '女',
						name: '女',
						checked: 'true'
					}
				],
				loading: false,
				isEdit: false,
				date: '',
				endDate: '',
				isbj: false,
			}
		},
		async onLoad(options) {
			this.util.setNT('编辑资料')
			this.getSystem()
			this.date = this.endDate = this.timeToDate(this.dateToTime(), 'yyyy-MM-dd')
			this.getLoginInfo().then(() => {
				this.params.userId = this.uId
				this.params.userTel = this.user.userTel || ''
				if (this.user.sex != null) {
					this.isbj = true //生日只保存一次
					this.params.realName = this.user.realName
					this.params.sex = this.user.sex
					// this.params.birthday = this.user.birthday
				}
			})
		},
		mixins: [utilMixins],
		computed: {},
		methods: {
			setTel(e) {
				this.params.userTel = e
			},
			bindDateChange(e) {
				this.params.birthday = e.target.value
			},
			async save() {
				// this.params.birthday = this.dateToTime(this.date)
				let filterArr = ['realName']
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						userId: '缺少用户id',
						realName: '请输入姓名',
						userTel: '请输入手机号',
						birthday: '请选择生日',
					}
				})
				if (!judgeData) {
					return
				} else {
					if (!utils.isTelCode(this.params.userTel)) return this.util.message('请输入正确的手机号', 3)
					// console.log(this.params)
					// return
					this.loading = true
					// await this.requestSM('vip')
					let res = await this.util.request({
						'url': this.api.xgyh,
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('提交成功', 1, 1000)
						utils.swnb(1000)
					}
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.maint {
		padding: 50rpx 0;
	}

	.timg {
		width: 220rpx;
		height: 220rpx;
	}

	.foot-btnc {
		padding: 40rpx;
	}

	.foot-btn {
		height: 102rpx;
	}
</style>
