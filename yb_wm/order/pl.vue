<template>
	<view class="pt30">
		<view class="bf m03 p3 bs30">
			<view class="p3 t-c f34 wei">您对商家/商品满意吗？</view>
			<view class="p3 f-x-bt bf9 bs10">
				<view class="t-o-e">{{storeName}}</view>
				<view class="f24 f-y-c" @click="nmtap">
					<icon class="mr20" :color="params.anonymous==1?tColor:'#ddd'" type="success" size="18" />
					<view>匿名评价</view>
				</view>
			</view>
			<view class="p3 f-c">
				<uni-rate @change='xchange' size='60' :value="params.star" :margin="50" />
			</view>
			<view class="f-raw bf p20">
				<block v-for="(v,i) in bqarr" :key='i'>
					<bk-b @tab='tabBq(i)' block='1' type='2' :color="v.a?tColor:''" :c-name="`f26 ${v.a?'bf':'be6'} c6 mr20 mb20 p-10-20 bs30`"
					 :t='v.name'></bk-b>
				</block>
			</view>
			<view class='b-d bs10 bf9 p2'>
				<textarea class="w100 mb20" v-model="params.body" maxlength="150" placeholder="请输入您的评价" style="height: 200rpx;"
				 placeholder-class="cd"></textarea>
				<mg-photo pt='增加照片' icon='iconxj' @change-img='changeImg' />
			</view>
		</view>
		<view class="foot-btnc posi-r mt30">
			<button @click="save" :loading="loading" :disabled="loading" class="foot-btn" :style="{background:tColor}"
			 hover-class="btnhc">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniRate from '@/components/third/uni-rate.vue'
	import bkB from '@/components/common/block-b.vue'
	import mgPhoto from '@/components/form/mg-photo.vue'
	import utils from '@/common/utils.js'
	import {
		uploadImg
	} from '@/common/wechat-util.js'
	export default {
		name: 'invite',
		components: {
			uniRate,
			bkB,
			mgPhoto,
		},
		data() {
			return {
				aIdx: '-1',
				loading: false,
				storeName: '',
				bqarr: [],
				params: {
					anonymous: 1,
					orderId: '',
					body: '',
					star: '4',
					media: '',
					label: '',
				}
			}
		},
		async onLoad(options) {
			this.getSystem()
			this.util.setNT('评价')
			this.storeName = options.storeName
			this.storeId = options.storeId
			this.params.orderId = options.orderId
			let {
				data
			} = await this.util.request({
				'url': this.api.Lable,
				data:{storeId:this.storeId}
			})
			this.bqarr = data
		},
		computed: {},
		methods: {
			tabBq(i) {
				this.$set(this.bqarr[i], 'a', !this.bqarr[i].a)
			},
			nmtap() {
				this.params.anonymous = this.params.anonymous == 1 ? 2 : 1
			},
			xchange(e) {
				this.params.star = e.value
			},
			changeImg(e) {
				this.params.media = e.p
			},
			async save() {
				let arr = this.bqarr.filter(v => v.a == 1)
				this.params.label = arr.map(v => v.name)
				console.log(this.params)
				let filterArr = ['anonymous', 'media', 'label']
				let judgeData = utils.isFailParams({
					field: this.params,
					filter: filterArr,
					tips: {
						orderId: '缺少订单id',
						body: '请输入评价内容',
						star: '请选择评分星级',
					}
				})
				if (!judgeData) {
					return
				} else {
					this.loading = true
					if (this.params.media.length > 0) {
						this.util.showLoading('图片上传')
						let parr = await uploadImg({
								files: this.params.media
							}),
						params = utils.deepCopy(this.params)
						params.media = parr.join()
						this.params.media = parr
					}
					let res = await this.util.request({
						'url': this.api.OrderEvaluate,
						method: 'POST',
						ct: 1,
						data: this.params,
					})
					if (!res) {
						this.loading = false
					} else {
						this.util.message('提交成功', 1, 1000)
						let lastPage = this.util.getPage()
						lastPage.$vm.refresh()
						this.go({
							t: 4
						})
						utils.swnb(1000)
					}
				}
			}
		},
	}
</script>
<style scoped lang="scss">
</style>
