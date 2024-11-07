<template>
	<view class="container pb115">
		<mg-input v-model="params.userName" hw='130' ht='联系人' pr='请输入联系人'></mg-input>
		<mg-cell cname='p03' hw='130' ht='性别'>
			<view slot='bd'>
				<mg-radio v-model="params.sex" :arr='sexArr'></mg-radio>
			</view>
		</mg-cell>
		<mg-input v-model="params.userTel" :max='11' t='number' hw='130' ht='手机号' pr='请输入手机号'></mg-input>
		<!-- #ifndef MP-TOUTIAO -->
		<mg-input @tab='chooseLocation' :value="params.address" hw='130' ht='地址' pr='请选择地址' dis='1' arrow="1"></mg-input>
		<!-- #endif -->
		<!-- #ifdef MP-TOUTIAO -->
		<mg-input v-model="params.address" hw='130' ht='地址' pr='请输入市区,街道/小区等信息'></mg-input>
		<!-- #endif -->
		<mg-input v-model="params.details" hw='130' ht='门牌号' pr='如：5号楼208室'></mg-input>
		<mg-cell last='1' hw='130' ht='标签'>
			<view slot='bd' class="f-raw">
				<block v-for="(v,i) in labels" :key="i">
					<bk-b @tab='label(v)' :c-name="`be6 mr30 ${params.label!=v&&'c3'}`" :color="params.label==v?tColor:''" :sname="i==1?{padding:'7rpx 30rpx'}:''"
					 :t='v'></bk-b>
				</block>
			</view>
		</mg-cell>
		<mg-cell last='1' v-if="isEdit" :sname="{background:'transparent'}">
			<view @click="deleteAdd" slot='ft' class="f-y-c">
				<text class="iconfont iconshanchu f40"></text>
				<text class="ml10">删除</text>
			</view>
		</mg-cell>
		<!-- <mg-input formt='2' v-model="params.default" hw='130' ht='设为默认'></mg-input> -->
		<view class="foot-btnc">
			<button @click="save" :loading="loading" :disabled="loading" class="foot-btn" :style="{background:tColor}">保存</button>
		</view>
		<mg-map ref='mgmap' @get-cl='setCLP' />
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
	import mgMap from '@/components/form/mg-map.vue'
	import bkB from '@/components/common/block-b.vue'
	import utils from '@/common/utils.js'
	export default {
		components: {
			mgInput,
			mgRadio,
			mgMap,
			MgCell,
			bkB,
		},
		data() {
			return {
				t: 'digit',
				params: {
					userName: '',
					sex: '先生',
					userTel: '',
					address: '',
					details: '',
					label: '公司',
					lat: '',
					lng: '',
					id: '',
				},
				sexArr: [{
						value: '先生',
						name: '先生'
					},
					{
						value: '女士',
						name: '女士',
						checked: 'true'
					}
				],
				labels: ['公司', '家', '学校'],
				loading: false,
				isEdit: false,
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('编辑地址')
			if (options.id) {
				this.isEdit = true
				let res = await this.util.request({
					'url': this.api.bcshdz,
					data: {
						id: options.id,
					}
				})
				for (let k in this.params) {
					this.params[k] = res.data[k]
				}
				console.log(options, this.params)
			}
		},
		methods: {
			...mapActions(['']),
			label(e) {
				this.params.label = e
			},
			chooseLocation() {
				this.$refs.mgmap.choose()
				// console.log('chooseLocation', this.$refs.mgmap)
			},
			setCLP(res) {
				this.params.address = res.address
				this.params.details = res.name
				this.params.lat = res.latitude
				this.params.lng = res.longitude
			},
			async save() {
				console.log(this.params)
				let filterArr = ['lat', 'lng']
				if (!this.params.id) {
					filterArr.push('id')
				}
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						userId: '缺少用户id',
						userName: '请输入联系人',
						userTel: '输入手机号',
						// #ifndef MP-TOUTIAO
						address: '请选择地址',
						// #endif
						// #ifdef MP-TOUTIAO
						address: '请输入市区,街道/小区等信息',
						// #endif
						details: '请输入门牌号等详细地址',
						// lat: '请选择地址',
						label: '请选择标签',
						id: '缺少地址id',
					}
				})
				if (!judgeData) {
					return
				} else {
					// if (!utils.isTelCode(this.params.userTel)) return this.util.message('请输入正确的手机号', 3)
					this.loading = true
					let res = await this.util.request({
						'url': this.api.bcshdz,
						method: 'POST',
						mask: 1,
						data: this.params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('保存成功', 1, 1000)
						let lastPage = this.util.getPage()
						lastPage.$vm.getData()
						utils.swnb(1000)
					}
				}
			},
			async deleteAdd() {
				try {
					await this.util.modal('确认删除此地址吗？')
					let res = await this.util.request({
						'url': this.api.scshdz,
						method: 'POST',
						mask: 1,
						data: {
							id: this.params.id
						},
					})
					if (res) {
						this.util.message('删除成功', 1, 1000)
						let lastPage = this.util.getPage()
						lastPage.$vm.getData()
						utils.swnb(1000)
					}
				} catch (e) {}
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
