<template>
	<view class="pt110 pb130">
		<nav-tab cname="fixedtop" v-model="aIdx" @changeTab='changeTab' :tabs='tabs'></nav-tab>
		<view class='bf bs20 f24 p3 m23' v-for="(v,i) in dataList" :key="i"
			@click="go({t:1,url:'order-dl?id=' + v.id})">
			<view class="f-x-bt pb20 b-b-e c3">
				<view class="f24 wei4">订单号：{{v.outTradeNo}}</view>
				<view class="f24 wei4" v-if="v.state=='1'">未付款</view>
				<view class="f24 wei4 cf7" v-if="v.deliveryMode =='1' && v.state=='2'">待发货</view>
				<view class="f24 wei4 cf7" v-if="v.deliveryMode =='2' && v.state=='2'">待核销</view>
				<view class="f24 wei4 c1f" v-if="v.state=='3'">已发货</view>
				<view class="f24 wei4 c3f" v-if="v.state=='4'">已完成</view>
			</view>
			<view class="bf f-row p20">
				<view class="f-g-0 mr30">
					<view class="imgw bs10 bf7">
						<mg-img :src="v.goodsIcon" />
					</view>
				</view>
				<view class="f-g-1 f-y-bt">
					<view class="wei4 f30 t-o-e2 c6">{{v.goodsName}}</view>
					<view class="f-x-bt">
						<view class="cfa t-o-e wei4">
							<text v-if="v.score>0">{{v.score}}</text>
							<text v-if="v.score>0" class="f26 ml10 nowei">{{jfName}}</text>
							<text v-if="v.score>0 && v.money>0" class="nowei">+</text>
							<text v-if="v.money>0"><text class="f22">{{sl}}</text>{{v.money}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="p20 t-r mr20">
				<view class="f28 wei4 cfa">
					<text class="f24 c9 mr20">共计{{v.convertNum}}件</text>
					<text class="c3">实付：</text>
					<text v-if="v.score>0">{{v.score}}</text>
					<text v-if="v.score>0" class="f26 ml10 nowei">{{jfName}}</text>
					<text v-if="v.score>0 && v.money>0" class="nowei">+</text>
					<text v-if="v.money>0"><text class="f22">{{sl}}</text>{{v.money}}</text>
				</view>
			</view>
			<view class="pt20 mr20 b-t-e" v-if="v.state=='3' && v.deliveryMode=='1'">
				<view class="f28 c3 wei4 f-x-e">
					<view class="obtn b-d bwid bs30" :style="{color:tColor,borderColor:tColor}"
						@click.stop="qrsh(v.id)">确认收货</view>
				</view>
			</view>
			<view v-if="v.deliveryMode=='2'">
				<view class="pt20 mr20 b-t-e f-x-bt f28">
					<view class="c3 wei4" :style="{color:tColor}">自提订单</view>
					<view v-if="v.selfCode">核销码：<text :style="{color:tColor}">{{v.selfCode}}</text></view>
				</view>
				<view class="f28 c3 wei4 f-x-e mt20" v-if="v.state!='4'">
					<view class="obtn b-d bwid bs30" :style="{color:tColor,borderColor:tColor}"
						@click.stop="wyqh(v.id)">我已取货</view>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" :nodata="dataList.length==0&&isget" :mygd='mygd' />
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import navTab from '@/components/common/functionCmp/nav-tab.vue'
	import jzz from '@/components/common/jzz.vue'
	import {
		sljz
	} from "@/common/util-mixins.js"
	export default {
		name: 'integralRecord',
		components: {
			navTab,
			jzz,
		},
		data() {
			return {
				aIdx: 0,
				tabs: [{
					name: '未完成',
				}, {
					name: '已完成',
				}],
				params: {
					page: 1,
					size: 10,
				},
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('兑换记录')
			this.aIdx = +options.idx || 0
			this.changeTab(this.aIdx)
		},
		mixins: [sljz],
		computed: {
			jfName() {
				return this.system.custom.integral
			},
		},
		methods: {
			async getList() {
				//获取订单列表
				let {
					data
				} = await this.util.request({
					'url': this.api.jfdd,
					data: this.params,
				})
				this.dataList = this.dataList.concat(data)
				this.isget = true
				this.mygd = this.params.size > data.length
				this.params.page++
			},
			changeTab(e) {
				this.isget = this.mygd = false
				this.params.page = 1
				let type = ''
				switch (e) {
					case 0:
						type = '1';
						break;
					case 1:
						type = '2';
						break;
				}
				this.params.type = type
				this.dataList = []
				this.getList()
				// console.log(e, this.aIdx)
			},
			async qrsh(id) {
				try {
					await this.util.modal('您确认收货吗？')
					let res = await this.util.request({
						'url': this.api.jfqrsh,
						mask: 1,
						method: 'POST',
						data: {
							id: id
						},
					})
					if (res) {
						this.util.message('收货成功', 1, 1000)
						//utils.swnb(1000)
						this.changeTab(this.aIdx)
					}
				} catch (e) {}
			},
			async wyqh(id) {
				try {
					await this.util.modal('是否已收到商品？')
					let res = await this.util.request({
						'url': this.api.jfqrsh,
						mask: 1,
						method: 'POST',
						data: {
							id: id
						},
					})
					if (res) {
						this.util.message('收货成功', 1, 1000)
						//utils.swnb(1000)
						this.changeTab(this.aIdx)
					}
				} catch (e) {}
			},
		},
	}
</script>

<style scoped lang="scss">
	.imgw {
		width: 100rpx;
		height: 100rpx;
	}

	.bor-b {
		border-bottom: 1px solid #EFF3F6;
	}

	.pt110 {
		padding-top: 110rpx;
	}

	.bwid {
		width: 175rpx;
	}

	.c1f {
		color: #1FBF5F;
	}

	.c3f {
		color: #999;
	}
</style>
