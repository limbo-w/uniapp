<template>
	<view class="bf mh100">
		<nav-tab  cname="mb10" ifsize='32' v-model="tIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<block v-if="tIdx==0">
			<mg-swiper :co='swiper' u='rpx' :color='tColor'></mg-swiper>
			<view class="aybd p-r bf bs30">
				<view class="p330 f24 c9 t-c">{{storageset.slogan}}</view>
				<mg-input v-model="params.userName" isr='1' ht='姓名' htc='c3 f32' pr='请输入姓名' icn='f30 c3'></mg-input>
				<mg-input v-model="params.userTel" :max='11' t='number' isr='1' ht='手机号' htc='c3 f32' pr='请输入手机号' icn='f30 c3'></mg-input>
				<mg-input @tab="toggleTab('alcohol')" :value="params.name" isr='1' tr='1' ht='酒水品牌' htc='c3 f32' pr='请选择' icn='f30 c3'
				 dis='1' arrow="1" ftc='c3'></mg-input>
				<mg-input v-model="params.totalNum" isr='1' t='number' ht='数量' htc='c3 f32' pr='请输入数量' icn='f30 c3'></mg-input>
				<mg-input v-model="params.note" isr='1' ht='备注' htc='c3 f32' pr='请输入备注信息' icn='f30 c3'></mg-input>
				<mg-agree cname="p43" title='寄存协议' p='14' :color="tColor" v-model="agree"></mg-agree>
				<view class="foot-btnc p-r p03">
					<button @click="save" :disabled="!agree||loading" class="foot-btn" :style="{background:agree?tColor:'#f5f5f5'}">提交</button>
				</view>
			</view>
			<w-picker v-if='typeList.length' mode="selector" @confirm="onConfirm($event,'name')" ref="alcohol" :selectList="typeList"></w-picker>
		</block>
		<block v-if="tIdx==1"></block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import mgInput from '@/components/form/mg-input.vue'
	import wPicker from "@/components/form/w-picker.vue";
	import mgAgree from '@/components/form/mg-agree.vue'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	export default {
		name: 'my-apply',
		components: {
			MgSwiper,
			mgInput,
			mgAgree,
			wPicker,
			navTab,
		},
		data() {
			return {
				params: {
					userId: '',
					storeId: '',
					userName: '',
					userTel: '',
					name: '',
					totalNum: '',
					note: '',
				},
				storageset:{},
				typeList: [],
				agree: false,
				loading: false,
				tIdx:0,
				tabs:[
					{
						name:'酒水寄存'
					},
					{
						name:'我的寄存'
					},
				],
			}
		},
		async onLoad(options) {
			// this.params.storeId = utils.getOptions(options, {
			// 	key: 'storeId',
			// 	q1: this.sjxxs.storeInfo && this.sjxxs.storeInfo.id
			// })
			this.params.storeId = utils.getOptions(options, {
				key: 'storeId',
				q1: this.storeInfo.id,
			})
			this.util.setNT('我要寄存')
			let {
				data
			} = await this.util.request({
				'url': this.api.getStoreConfig,
				method: 'get',
				data: {
					storeId: this.params.storeId,
					ident: 'storageSet',
				},
			})
			this.storageset = data
			this.getSystem({
				nosetNB: 1,
			}).then(() => {
				this.agree = this.system.isCheck == 1
			})
			this.getTypeList()
			await this.getLoginInfo()
			this.params.userId = this.uId
			this.changeTab(this.tIdx)
		},
		onShow() {
			this.loading = false
		},
		computed: {
			...mapState({
				sjxxs: state => state.sjxx,
				storeInfo: state => state.config.storeInfo,
				// storageset: state => state.config.storageset,
			}),
			swiper() {
				return {
					topMargin: 0,
					leftRightPadding: 0,
					upDownPadding: 0,
					swiper: [{
						icon: this.storageset.icon
					}],
					duration: '',
					height: '300',
					radius: '0',
					auto: true,
					interval: 5,
				}
			},
		},
		onShow() {
			this.tIdx = 0
			this.changeTab(this.tIdx)
		},
		methods: {
			changeTab(e) {
				if (this.tIdx == 1) {
					this.go({
						t: 1,
						url: '/yb_wm/shop/storage/list'
					})
				}
			},
			async getTypeList() {
				let {
					data
				} = await this.util.request({
					'url': this.api.jcfl,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
					},
				})
				this.typeList = data.map(v => ({
					label: v.name,
					value: v.id,
				}))
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			onConfirm(e, key) {
				switch (key) {
					case "name":
						this.params.name = e.result
						break;
				}
			},
			async save() {
				// console.log(this.params)
				let filterArr = ['note']
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						userId: '缺少用户ID',
						storeId: '商店ID为空',
						userName: '请输入联系人',
						userTel: '输入手机号',
						name: '请选择酒水品牌',
						totalNum: '请输入数量',
					}
				})
				if (!judgeData) {
					return
				} else {
					if (!utils.isTelCode(this.params.userTel)) return this.util.message('请输入正确的手机号', 3)
					this.loading = true
					let res = await this.util.request({
						'url': this.api.bcjc,
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('保存成功', 1, 1000)
						utils.stfn(() => {
							this.go({
								t: 2,
								url: '/yb_wm/shop/storage/list'
							})
						})
					}
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	.aybd {
		top: -20rpx;
	}
</style>
