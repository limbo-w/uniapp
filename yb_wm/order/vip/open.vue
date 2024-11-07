<template>
	<view class="container pb115">
		<view class="main">
			<view class="bf bs10 mainc">
				<view class="p03">
					<view class="p30 f32 wei t-c">{{isbj?'修改':'填写'}}个人资料</view>
					<view class="mb30 f24 c6">*请提供正确的个人资料与联系方式，以便获得最新会员优惠信息</view>
				</view>
				<mg-input v-if="vipset.register.includes('USER_FORM_INFO_FLAG_NAME')" isr='1' v-model="params.realName" hw='130' ht='姓名'
				 pr='请输入姓名'></mg-input>
				<mg-input v-if="vipset.register.includes('USER_FORM_INFO_FLAG_MOBILE')" isr='1' v-model="params.userTel" :max='11'
				 t='number' hw='130' ht='电话' pr='请输入手机号'>
					<!-- #ifdef MP-WEIXIN -->
					<sq-btn slot='ft' @refresh='setTel' type="2" cname="text-btnf f24 ml20 p0 b00" w='120' h='50' t='自动填写'></sq-btn>
					<!-- #endif -->
				</mg-input>
				<mg-cell v-if="vipset.register.includes('USER_FORM_INFO_FLAG_SEX')" isr='1' cname='p03' hw='130' ht='性别'>
					<view slot='bd'>
						<mg-radio v-model="params.sex" :arr='sexArr' color="#07C160"></mg-radio>
					</view>
				</mg-cell>
				<block v-if="vipset.register.includes('USER_FORM_INFO_FLAG_BIRTHDAY')">
					<mg-cell v-if='!isbj' last="1" isr='1' hw='130' ht='生日'>
						<picker slot='bd' mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="c6">{{date}}</view>
						</picker>
					</mg-cell>
					<mg-cell v-else last="1" isr='1' hw='130' ht='生日' :btt="date" bttc="c9"></mg-cell>
				</block>
				<view class="p13 f24 c9">*温馨提示：生日时间一旦保存后，将不能再次修改哦！</view>
			</view>
		</view>
		<view class="foot-btnc posi-r mt30">
			<button @click="save" :loading="loading" :disabled="loading" class="foot-btn b00 bs15" hover-class="btnhc">提交</button>
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
					userTel: '',
					birthday: '',
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
			if (options.userId) {
				this.isbj = true
			}
			this.getSystem().then(res => {
				this.util.setNT(
					`${this.vipset.title}-${this.isbj ? '修改资料':'提交资料'}`)
			})
			this.date = this.endDate = this.timeToDate(this.dateToTime(), 'yyyy-MM-dd')
			this.getLoginInfo().then(() => {
				this.params.userTel = this.user.userTel || ''
				if (this.isbj) {
					this.params.realName = this.user.realName
					this.params.sex = this.user.sex
					this.date = this.timeToDate(this.user.birthday, 'yyyy-MM-dd')
				}
			})
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				vipset: state => state.config.vipset,
			}),
			startDate() {
			   return this.getDate('start')
			},
		},
		methods: {
			setTel(e) {
				this.params.userTel = e
			},
			bindDateChange(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 70;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			async save() {
				this.params.birthday = this.dateToTime(this.date)
				let filterArr = []
				if (!this.vipset.register.includes('USER_FORM_INFO_FLAG_NAME')) {
					filterArr.push('realName')
				}
				if (!this.vipset.register.includes('USER_FORM_INFO_FLAG_SEX')) {
					filterArr.push('sex')
				}
				if (!this.vipset.register.includes('USER_FORM_INFO_FLAG_BIRTHDAY')) {
					filterArr.push('birthday')
				}
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						realName: '请输入姓名',
						userTel: '请输入手机号',
						birthday: '请选择生日',
					}
				})
				if (!judgeData) {
					return
				} else {
					if (!utils.isTelCode(this.params.userTel)) return this.util.message('请输入正确的手机号', 3)
					this.loading = true
					// await this.requestSM('vip')
					let res = await this.util.request({
						'url': this.api[this.isbj ? 'SaveUser' : 'hykk'],
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('提交成功', 1, 1000)
						this.refreshUser({
							nomask: 1,
							get: 1,
							now: 1,
						})
						utils.swnb(1000)
					}
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.main {
		padding: 90rpx 40rpx 30rpx;
	}

	.mainc {
		padding: 20rpx 0 30rpx;
		box-shadow: 0rpx 10rpx 15rpx 5rpx rgba(221, 221, 221, 0.8)
	}
</style>
