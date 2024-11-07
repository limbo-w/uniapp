<template>
	<view class="pb130">
		<view class="posi-f w100 t0 f-y-c tgg cfc">
			<text class="iconfont icongg mr30 cfc"></text>
			<view class="f-1 f22">本页面会每5秒刷新一次页面，保证其他人所点的商品能够实时同步；订单支付后，大厨就开始制作啦!</view>
			<view class="f-c ml20">
				<text @click="go({url:'/yb_wm/shop/in/indd'})" class="iconfont icondd f48 c3"></text>
			</view>
		</view>
		<view class="carlistc p02" :style="{paddingTop:'80rpx'}">
			<mg-cell bgc='transparent' isl='1' :sname="{padding:'30rpx 10rpx'}">
				<view slot='bd' class="f-y-c">
					<text class="">已选以下商品</text>
				</view>
				<view class="f-y-c f24" slot='ft'>
					<text @click="sxsj" class='iconfont iconsx f50 c0' style="margin-right: 40rpx;"></text>
					<text @click="clearCar" class='iconfont iconshanchu f42 c0'></text>
				</view>
			</mg-cell>
			<view v-if="tableInfo.orderInfo&&orderGoods.goodsArr" class="p20">当前桌位订单商品</view>
			<view class="ucarlc o-h bf" style="opacity: 0.5;">
				<block v-for="(v,i) in orderGoods.goodsArr" :key='i'>
					<mg-cell w='160' h='160' :img='v.icon' brs='5rpx' cname='f-sh' hdc='f-s'>
						<view slot='bd' class="h100 f-y-bt">
							<view class="f-bt">
								<view class="t-o-e f32 c0">{{v.name}}</view>
							</view>
							<view class="f-bt mt10">
								<view class="f-g-1 f24 c9">
									<text class="" v-if="v.data">{{v.data}}</text>
									<text v-if="v.attribute">({{v.attribute}})</text>
									<text class="ml10" v-if="v.material">+{{v.material}}</text>
								</view>
							</view>
							<view class="f-x-bt mt10">
								<view class="f-g-0" :style="{color:tColor}">{{sl}}<text class="f36 wei">{{itemTotal(v)}}</text></view>
								<view class="c9">x{{v.num}}</view>
							</view>
						</view>
					</mg-cell>
				</block>
			</view>
			<view class="ucarlc o-h bf mt20 p-r pt30" style="opacity: 0.5;" v-for="(pv,pi) in orderGoods.addGoods" :key='pi'>
				<block v-for="(v,i) in pv" :key='i'>
					<mg-cell w='160' h='160' :img='v.icon' brs='5rpx' cname='f-sh' hdc='f-s'>
						<view slot='bd' class="h100 f-y-bt">
							<view class="f-bt">
								<view class="t-o-e f32 c0">{{v.name}}</view>
							</view>
							<view class="f-bt mt10">
								<view class="f-g-1 f24 c9">
									<text class="" v-if="v.data">{{v.data}}</text>
									<text v-if="v.attribute">({{v.attribute}})</text>
									<text class="ml10" v-if="v.material">+{{v.material}}</text>
								</view>
							</view>
							<view class="f-x-bt mt10">
								<view class="f-g-0" :style="{color:tColor}">{{sl}}<text class="f36 wei">{{itemTotal(v)}}</text></view>
								<view class="c9">x{{v.num}}</view>
							</view>
						</view>
					</mg-cell>
				</block>
				<view class="p-a sjx cf">加</view>
			</view>
			<view v-if="tableInfo.orderInfo&&orderGoods.goodsArr" class="p20">新增商品</view>
			<view class="p0">
				<view class="mb30 ucarlc o-h bf">
					<!-- <view class="posi-r p330 f-y-c">
						<view class="cimg bsf mr30">
							<mg-img :src="v.portrait"></mg-img>
						</view>
						<view class="f-1 t-o-e">{{v.userName}}</view>
					</view> -->
					<goods :d-list='carList' addtype='2' outin='2' type='6' @dec='dec' @add='add'></goods>
				</view>
			</view>
		</view>
		<jzz v-if="carList.length==0" bgcolor="transparent" :nodata="true" :mygd='true' otext='暂未添加商品' />
		<view v-if='tableInfo.userId' class="dbbtnc bf f-row" :style="{bottom: isIpx?'40rpx':0}">
			<view class="f-1 f-y-c">
				<view class="cf1 mr30"><text class="c3">合计：</text>{{sl}}<text class="f36 wei">{{scarList.ins.price}}</text></view>
			</view>
			<view c class="dbbtn o-h f-row">
				<button @click="jxdc" class="dbl f-c">继续点单</button>
				<button :disabled="loading" v-if="tableInfo.orderInfo&&tableInfo.orderInfo.state==2" @click="tjsp" class="dbr f-c">提交商品</button>
				<button v-if="!tableInfo.orderInfo" @click="ljxd" class="dbr f-c f-1">去下单</button>
			</view>
		</view>
		<view v-if="isIpx" class='bgf'></view>
		<!-- <button class='hddb' @click='sxsj'>
			<image class="hddbimg" src='/static/dndc/sx.png'></image>
		</button>
		<view v-if="scarList.table.manyType==2" class='sdbg'>
			<image class="sdimg" src='/static/dndc/suo.png'></image>
			<view>订单已锁定</view>
			<button v-if="otableInfo.userId==uId" class="sdbtn" @click='jsdd'>解锁并继续点单</button>
		</view> -->
		<load type="2" v-model="showjz"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import goods from '@/components/goods/index.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import MgImg from '@/components/common/mg-img.vue'
	import jzz from '@/components/common/jzz.vue'
	import load from '@/components/common/load.vue'
	import utils from '@/common/utils'
	let app = getApp().globalData
	export default {
		name: 'order-index',
		components: {
			goods,
			MgCell,
			MgImg,
			jzz,
			load,
		},
		data() {
			return {
				tableInfo: {},
				otableInfo: {},
				orderGoods: {},
				loading: false,
				showjz: false,
			}
		},
		async onLoad(options) {
			this.getSystem({
				nosetNB: 1
			})
			this.util.setNT('购物车')
			this.tableInfo = JSON.parse(decodeURIComponent(options.tableInfo))
			// console.log(this.tableInfo)
			await this.getLoginInfo()
			if (this.tableInfo.storeId && this.tableInfo.tableId) {
				this.supdCarbp = {
					storeId: this.tableInfo.storeId,
					tableId: this.tableInfo.tableId,
					item: 2,
					key: 'ins',
				}
			} else {
				return this.tips()
			}
			// this.getTableInfo()
			this.dsq = setInterval(() => {
				this.sxsj()
			}, 5000)
			this.sxsj()
		},
		onShow() {
			if (this.isload) {
				this.sxsj()
				this.dsq = setInterval(() => {
					this.sxsj()
				}, 5000)
			} else {
				this.isload = true
			}
		},
		computed: {
			...mapState(['scarList']),
			carList() {
				return this.scarList.ins.data || []
				// let arr = []
				// for (let i in this.scarList.ins.data) {
				// 	if (this.scarList.ins.data[i].originalNum > 0) {
				// 		arr.push(Object.assign({
				// 			ishd: 0,
				// 			spnum: this.scarList.ins.data[i].originalNum
				// 		}, this.scarList.ins.data[i]))
				// 		return arr
				// 	}
				// 	if (this.scarList.ins.data[i].discountNum > 0) {
				// 		arr.push(Object.assign({
				// 			ishd: 1,
				// 			spnum: this.scarList.ins.data[i].discountNum
				// 		}, this.scarList.ins.data[i]))
				// 		return arr
				// 	}
				// }
			},
		},
		methods: {
			...mapActions(["supdCar", "getMycar", "clearMycar"]),
			async getTableInfo() {
				//请求桌位信息
				let {
					data
				} = await this.util.request({
					'url': this.api.tsczxq,
					method: 'POST',
					data: {
						tableId: this.tableInfo.tableId,
					}
				})
				this.otableInfo = data
			},
			async clearCar() {
				try {
					await this.util.modal('确认清空购物车吗？')
					await this.clearMycar(this.supdCarbp)
					this.getMycar(this.supdCarbp)
				} catch (e) {}
			},
			tips() {
				uni.showModal({
					title: '提示',
					content: '未获取到桌位信息',
					showCancel: false,
					success: res => {
						this.go({
							t: 6,
							url: '/yb_wm/index/index'
						})
					},
				});
			},
			//修改数量公用方法
			async updList(p) {
				try {
					await this.supdCar({
						...this.supdCarbp,
						type: p.type,
						goodsId: p.e.g.goodsId,
						id: p.e.g.id,
					})
					this.showjz = false
					// this.sxsj()
				} catch (e) {
					this.showjz = false
				}
			},
			dec(e) {
				this.showjz = true
				this.updList({
					type: 2,
					e,
				})
			},
			add(e) {
				this.showjz = true
				this.updList({
					type: 1,
					e,
				})
				// console.log('listadd', e)
			},
			async sxsj() {
				this.util.showLoading('同步商品中')
				await Promise.all([this.getMycar(this.supdCarbp), this.getInfo()])
				//1正常2锁定
				// if (this.scarList.table.manyType == 2) {
				// 	clearInterval(this.dsq)
				// }
				uni.hideLoading()
			},
			async getInfo() {
				let res = await this.util.request({
					'url': this.api.tsczxq,
					method: 'POST',
					data: {
						tableId: this.tableInfo.tableId,
					}
				})
				if (res) {
					if (res.data.orderInfo) { //有餐后付款的订单
						// let {
						// 	data
						// } = await this.util.request({
						// 	'url': this.api.tsddxq,
						// 	data: {
						// 		id: res.data.orderInfo.id
						// 	},
						// })
						if (res.data.orderInfo.state < 3) {
							this.tableInfo.orderInfo = res.data.orderInfo
							this.orderGoods = res.data.orderInfo
						} else { //fromthistoinddthenpaypayfinishbtnbacknotfinishbtn
							this.tableInfo.orderInfo = false
							this.orderGoods = {}
						}
					} else {
						return
					}
				}
			},
			jxdc() {
				this.go({
					t: 4
				})
			},
			async tjsp() {
				if (!this.carList.length) return this.util.message('请添加商品后提交', 3)
				this.loading = true
				let res = await this.util.request({
					'url': this.api.tsjc,
					method: 'POST',
					mask: 1,
					data: {
						orderId: this.tableInfo.orderInfo.id,
					}
				})
				if (res) {
					this.go({
						t: 2,
						url: '/yb_wm/shop/in/order-dl?id=' + this.tableInfo.orderInfo.id,
					})
				} else {
					this.loading = false
				}
			},
			async jsdd() {
				let {
					data
				} = await this.util.request({
					'url': this.api.UpdCarState,
					method: 'POST',
					data: {
						manyType: 1,
						tableId: this.tableInfo.tableId,
					}
				})
				await this.sxsj()
				this.go({
					t: 4
				})
			},
			async ljxd() {
				if (!this.carList.length) return this.util.message('请添加商品后下单', 3)
				this.go({
					t: 1,
					url: 'pay-order?tableInfo=' + encodeURIComponent(JSON.stringify(this.tableInfo))
				})
				// if (this.scarList.table.manyType == 2) {
				// 	this.go({
				// 		t: 1,
				// 		url: 'pay-order?tableInfo=' + encodeURIComponent(JSON.stringify(this.tableInfo))
				// 	})
				// } else {
				// 	try {
				// 		await this.util.modal('提交订单后将锁定订单')
				// 		let {
				// 			data
				// 		} = await this.util.request({
				// 			'url': this.api.UpdCarState,
				// 			method: 'POST',
				// 			mask: 1,
				// 			data: {
				// 				manyType: 2,
				// 				tableId: this.tableInfo.tableId,
				// 			}
				// 		})
				// 		clearInterval(this.dsq)
				// 		await this.sxsj()
				// 		setTimeout(() => {
				// 			this.go({
				// 				t: 1,
				// 				url: 'pay-order?tableInfo=' + encodeURIComponent(JSON.stringify(this.tableInfo))
				// 			})
				// 			console.log('跳转')
				// 		}, 500)
				// 	} catch (e) {}
				// }
			},
			itemTotal(v) {
				let itemTotal = +(v.vipMoney > 0 && +v.vipMoney < +v.money && v.vipMoney || v.money)
				return +(itemTotal * v.num).toFixed(2)
			},
		},
		onUnload() {
			this.dsq && clearInterval(this.dsq)
		},
		onHide() {
			clearInterval(this.dsq)
		}
	}
</script>
<style scoped lang="scss">
	.tgg {
		padding: 10rpx 30rpx;
		height: 80rpx;
		line-height: 1.4;
		background: #FFF3EA;
		z-index: 99;
	}

	.cfc {
		color: #ff7c1c;
	}

	.dbbtnc {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 998;
		padding: 20rpx 30rpx;

		.dbbtn {
			border-radius: 80rpx;
			height: 80rpx;
		}

		.dbl,
		.dbr {
			width: 180rpx;
			color: #fff;
			font-size: 30rpx;
			border-radius: 80rpx;
		}

		.dbl {
			margin-right: 40rpx;
			// border-radius: 80rpx 0 0 80rpx;
			background: linear-gradient(to right, #f8c10d, #ff9503);
		}

		.dbr {
			// border-radius: 0 80rpx 80rpx 0;
			background: linear-gradient(to right, #ff7a01, #ff560a);
		}
	}

	.sdbg {
		position: fixed;
		background: #fff;
		opacity: 0.8;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: 997;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 35rpx;
		color: #000;

		.sdimg {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 30rpx;
		}

		.sdbtn {
			margin-top: 30rpx;
			background: linear-gradient(to right, #ff7a01, #ff560a);
			color: #fff;
			font-size: 30rpx;
		}
	}

	.hddb {
		bottom: 300rpx;

		.hddbimg {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.cimg {
		width: 70rpx;
		height: 70rpx;
		position: relative;
		z-index: 2;
	}

	.cun {
		height: 50rpx;
		border-radius: 50rpx;
		padding: 0 30rpx 0 40rpx;
		bottom: 2rpx;
		left: 40rpx;
		background: #F5F5F5;
	}

	.ucarlc {
		border-radius: 25rpx;
	}

	.sjx {
		top: 0;
		left: 0rpx;
		padding: 0 40rpx;
		height: 35rpx;
		font-size: 20rpx;
		line-height: 35rpx;
		border-radius: 0 0 20rpx 0;
		background: linear-gradient(#F75214, #F87D22);
	}
</style>
