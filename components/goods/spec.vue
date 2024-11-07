<template>
	<view>
		<mg-popup v-model="showGg" :z-index="3000">
			<view v-if="loading" class="bs15 bf ggjz">
				<view class="dhtmd">
					<view class="bf6 jzi1"></view>
					<view class="bf6 jzi2 p3"></view>
					<view class="bf6 jzi2 p3"></view>
				</view>
			</view>
			<view v-else class="ggc bs15 bf posi-r">
				<view @click="showGg=false" class="ggx posi-a r0">
					<text class="iconfont iconyx f56"></text>
				</view>
				<view class="ggtop f-row">
					<view class="ggh mr30 f-g-0 bs20">
						<mg-img :src='goodsInfo.icon'></mg-img>
					</view>
					<view>
						<view class="f36 wei">{{goodsInfo.name}}</view>
						<!-- <view class="mt10">
							<bk-b c-name='f22 bf7 cb mr10 p-3-10' t='含茶'></bk-b>
							<bk-b c-name='f22 bf7 cb mr10 p-3-10' t='含乳制品'></bk-b>
						</view> -->
						<view class="mt15 f24 c7">产品描述</view>
						<view class="mt15 f24 c9 t-o-e3 w100">{{goodsInfo.body}}</view>
					</view>
				</view>
				<scroll-view scroll-y class="ggb p23">
					<view class="m20">
						<block v-if="goodsInfo.isSpecs==1&&goodsInfo.specsData.length">
							<view class="p15 c6">规格</view>
							<view class="f-raw">
								<view @click="clickSpec(pi)" v-for="(pv,pi) in goodsInfo.specsData" :key='pi' class="specv t-o-e f26" :style="{background:pv.a?tColor:'',color:pv.a?'#fff':''}">{{pv.specsName}}</view>
							</view>
						</block>
						<block v-if="goodsInfo.isAttr==1&&goodsInfo.attrData.length">
							<!-- <view class="p15 c6" :style="{color:tColor}">属性</view> -->
							<view v-for="(pv,pi) in goodsInfo.attrData" :key='pi' class="">
								<view class="p15 c6 f28">{{pv.attrName}}</view>
								<view class="f-raw">
									<view v-if="cv.name" @click="clickAttribute(pi,ci)" v-for="(cv,ci) in pv.attrStr" :key='ci' class="specv t-o-e f26"
									 :style="{background:cv.a?tColor:'',color:cv.a?'#fff':''}">{{cv.name}}</view>
								</view>
							</view>
						</block>
						<block v-if="goodsInfo.isMaterial==1&&goodsInfo.meterialData.length">
							<view class="p15 c6">{{systemGood.custom.feedName || '加料'}}</view>
							<view class="f-raw">
								<view @click="clickMaterial(ci)" v-for="(cv,ci) in goodsInfo.meterialData" :key='ci' class="specv t-o-e f26"
								 :style="{background:cv.a?tColor:'',color:cv.a?'#fff':''}">{{cv.materialName}}<text class="ml10" :style="{color:cv.a?'#fff':tColor}">{{`${sl}${cv.SalesPrice}`}}</text></view>
							</view>
						</block>
					</view>
				</scroll-view>
				<view v-if="goodsInfo.id" class="posi-r ggf bf f-col f-x-ad">
					<view class="f-x-bt">
						<view class="f-g-1">
							<view class="f-raw" :style="{color:tColor}">
								<view v-if="Number(xzSpecInfo.vipPrice)<Number(xzSpecInfo.SalesPrice)" class="f-row mr10">
									<view class="vipr f-y-c" style="font-size: 24rpx;">
										<view class="vipimg">
											<mg-img :src='`${onImgurl}vipimg.png`'></mg-img>
										</view>
									</view>
									<view class="vipl f-y-c" style="font-size: 26rpx;">{{sl+xzSpecInfo.vipPrice}}</view>
								</view>
								<text v-if="goodsInfo.isSpecs==1&&goodsInfo.specsData.length" class="f34 wei mr20">{{sl}}{{Number(xzSpecInfo.SalesPrice)}}
									<text class="f24 nowei c9 ml10">(库存{{outin==1?xzSpecInfo.SalesStock:xzSpecInfo.SalesStock}})</text>
								</text>
								<text v-if="goodsInfo.isMaterial==1&&goodsInfo.meterialData.length" class="">{{systemGood.custom.feedName || '加料'}}+{{sl+xzJlInfo.money}}</text>
							</view>
							<view class="f22 c9 t-o-e3">{{xzSpecInfo.id?xzSpecInfo.specsName+',':''}}{{xzSxInfo.arr.length?xzSxInfo.arr.map(v => v.name).toString()+',':''}}{{xzJlInfo.arr.length?xzJlInfo.arr.map(v => v.materialName).toString():''}}</view>
						</view>
						<view class="f-g-0 f-bt ml30">
							<view v-if="goodsInfo.ggnum>0" class="reducecon active f-y-c">
								<view @click.stop="decSpec" class="cartc f-c">
									<text class="iconfont iconjs f54" :style="{color:tColor}"></text>
								</view>
								<text class="f34 ma c0">{{goodsInfo.ggnum}}</text>
							</view>
							<view @click.stop="addSpec" class="cartc f-c">
								<text class="iconfont iconzj f54" :style="{color:tColor}"></text>
								<!-- <button class="cartadd" :style="{background:tColor}"></button> -->
							</view>
						</view>
					</view>
					<button @click="jrgwc" :style='{background:tColor}' class="w100 cf ggbtn mt10 f34 f-c">加入购物车</button>
				</view>
			</view>
		</mg-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgPopup from '@/components/common/popup.vue'
	import bkB from '@/components/common/block-b.vue'
	import utils from '@/common/utils.js'
	export default {
		name: 'popup',
		components: {
			mgPopup,
			bkB,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {

					}
				}
			},
			cname: {
				type: String,
				default: ''
			},
			value: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '70%'
			},
			zindex: {
				type: Number,
				default: 999
			},
			outin: {
				type: String,
				default: '1'
			},
			storeid: {
				type: String,
				default: ''
			},
			systemGood: {
				type: Object,
				default: function() {
					return {
			
					}
				}
			},
		},
		data() {
			return {
				loading: true,
				goodsInfo: {},
			}
		},
		methods: {
			clickSpec(pi) {
				let r = this.goodsInfo.specsData
				for (let n in r) {
					n == pi ? r[n].a = 1 : r[n].a = 0
				}
				// console.log(pi, ci, r[pi])
			},
			clickAttribute(pi, ci) {
				let r = this.goodsInfo.attrData
				for (let n in r[pi].attrStr) {
					n == ci ? r[pi].attrStr[n].a = 1 : r[pi].attrStr[n].a = 0
				}
			},
			clickMaterial(ci) {
				let r = this.goodsInfo.meterialData
				this.$set(this.goodsInfo.meterialData[ci], 'a', this.goodsInfo.meterialData[ci].a == 1 ? 0 : 1)
				// r[ci].a = r[ci].a == 1 ? 0 : 1
				// console.log(ci, r)
			},
			addSpec() {
				// console.log(this.xzSpecInfo, )
				if (this.xzSpecInfo.SalesStock && this.goodsInfo.ggnum == this.xzSpecInfo.SalesStock) return
				this.goodsInfo.ggnum += 1
			},
			decSpec() {
				if (this.goodsInfo.ggnum == 1) return
				this.goodsInfo.ggnum -= 1
			},
			jrgwc: utils.throttle(function(e) {
				let specInfo = Object.assign({}, this.xzSpecInfo),
					jlInfo = {
						jlmoney: this.xzJlInfo.money,
						material: this.xzJlInfo.arr.map(v => ({
							materialId: v.id,
							num: 1
						})),
						jldata: '', //本地用来显示的
						jlids: '', //本地用来判断的
					},
					sxInfo = {
						attribute: '',
					}
				specInfo.groupId = specInfo.id || ''
				//specInfo有id属性
				delete specInfo.id
				//处理属性
				sxInfo.attribute = this.xzSxInfo.arr.map(v => v.name).toString()
				// sxInfo.sxids = this.xzSxInfo.arr.map(v => v.spec_val_idSx).toString()
				//处理加料
				jlInfo.jldata = this.xzJlInfo.arr.map(v => v.materialName).toString()
				jlInfo.jlids = this.xzJlInfo.arr.map(v => v.id).toString()
				//判断购物车是否存在此商品
				let i
				if (this.co.isSpecs != 1 && this.co.isMaterial != 1 && this.co.isAttr != 1) {
					i = this.carList.find(v => v.goodsId == this.co.id)
				} else {
					i = this.carList.find(v => v.goodsId == this.co.id && v.groupId == specInfo.groupId && v.materialIds ==
						jlInfo.jlids && v.attribute == sxInfo.attribute)
				}
				if (i) {
					// 限购判断
					if (this.co.maxNum > 0 && Number(i.num) + Number(this.goodsInfo.ggnum) > this.co.maxNum) {
						return this.util.message(`此商品限购${this.co.maxNum}份`, 3)
					}
				} else {
					// 起售判断
					if (this.co.minNum > 1 && this.co.minNum > this.goodsInfo.ggnum) {
						return this.util.message(`此商品${this.co.minNum}份起购`, 3)
					}
					// 限购判断 购物车没有，想第一次添加
					if (this.co.maxNum > 0 && this.goodsInfo.ggnum > this.co.maxNum) {
						return this.util.message(`此商品限购${this.co.maxNum}份`, 3)
					}
				}
				let goods = Object.assign({
					ggnum: this.goodsInfo.ggnum
				}, this.co, specInfo, sxInfo, jlInfo)
				//父级方法
				this.$emit('add', {
					g: goods,
					addwz: 1,
				})
				this.showGg = false
				// console.log('购物车项', i)
				// console.log(e, specInfo, jlInfo, goods)
			}, 300),
		},
		computed: {
			...mapState({
				carList: state => state.scarList.data || []
			}),
			showGg: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
				}
			},
			xzSpecInfo() {
				if (this.goodsInfo.isSpecs == 1 && this.goodsInfo.specsData.length) {
					// console.log('xzSpecInfo', this.goodsInfo.specsData.find(v => v.a))
					return this.goodsInfo.specsData.find(v => v.a)
				} else {
					return {}
				}

			},
			xzSxInfo() {
				let obj = {
					arr: []
				}
				if (this.goodsInfo.isAttr == 1 && this.goodsInfo.attrData.length) {
					let r = this.goodsInfo.attrData,
						c = [];
					//把选中的属性找出来
					for (let n in r) {
						for (let d in r[n].attrStr) {
							if (r[n].attrStr[d].a) {
								c.push(r[n].attrStr[d])
								break
							}
						}
					}
					obj.arr = c
				}
				return obj
			},
			xzJlInfo() {
				let obj = {
					money: 0,
					arr: []
				}
				if (this.goodsInfo.isMaterial == 1 && this.goodsInfo.meterialData.length) {
					let money = 0,
						arr = []
					//把选中的加料加起来
					this.goodsInfo.meterialData.forEach(v => {
						if (v.a) {
							obj.money += this.outin == 1 ? +v.SalesPrice : +v.SalesPrice
							arr.push(v)
						}
					})
					obj.money = +obj.money.toFixed(2)
					obj.arr = arr
				}
				return obj
			},
			xzspxx() {
				let arr = []
				if (this.xzSpecInfo.id) {
					arr.push(this.xzSpecInfo.specsName)
				}
				if (this.xzSxInfo.arr.length) {
					arr.push()
				}
			}
		},
		watch: {
			async value(newVal) {
				if (newVal) {
					this.loading = true
					this.goodsInfo = {}
					let {
						data
					} = await this.util.request({
						'url': this.api.ggxq,
						// mask: 1,
						data: {
							id: this.co.id,
							storeId: this.storeid,
						}
					})
					if (this.co.isSpecs == 1 && data.specsData) {
						data.specsData.forEach((v, i) => {
							v.a = i == 0 ? 1 : 0
						})
					}
					if (this.co.isAttr == 1 && data.attrData) {
						data.attrData.forEach(v => {
							v.attrStr.forEach((v, i) => {
								v.a = i == 0 ? 1 : 0
							})
						})
					}
					this.goodsInfo = Object.assign({}, this.co, data, {
						ggnum: 1
					})
					this.loading = false
					// console.log(this.goodsInfo)
				}
				// console.log('value', newVal)
			},
			// async co(newVal) {
			// 	// console.log('co', newVal, this.goodsInfo)
			// },
		},
	}
</script>

<style scoped lang="scss">
	.bs15 {
		border-radius: 30rpx 30rpx 0 0;
	}

	.f54 {
		font-size: 52rpx;
	}

	.ggjz {
		padding: 50rpx 50rpx 200rpx;
	}

	.jzi1 {
		height: 350rpx;
	}

	.jzi2 {
		margin-top: 50rpx;
	}

	.ggc {
		.ggx {
			padding: 20rpx 20rpx 40rpx 40rpx;
			opacity: 0.7;
		}

		.ggtop {
			padding: 40rpx 30rpx 0;
		}

		.ggh {
			width: 240rpx;
			height: 240rpx;
		}

		.ggb {
			max-height: calc(86vh - 233rpx - 280rpx);

			.specv {
				min-width: 185rpx;
				padding: 0 30rpx;
				height: 70rpx;
				border-radius: 8rpx;
				text-align: center;
				line-height: 70rpx;
				background: #F5F5F7;
				margin: 0 20rpx 20rpx 0;
			}
		}

		.ggf {
			box-shadow: 0 -2rpx 9rpx 2rpx rgba(221, 221, 221, 0.6);
			padding: 20rpx 36rpx;
			min-height: 153rpx;
		}

		.ggbtn {
			border-radius: 80rpx;
			height: 90rpx;
		}
	}

	@keyframes backOpacity {
		0% {
			opacity: 0.8
		}


		50% {
			opacity: 0.6
		}

		100% {
			opacity: 1
		}
	}

	.dhtmd {
		animation: backOpacity 0.7s ease-in-out infinite;
	}
</style>
