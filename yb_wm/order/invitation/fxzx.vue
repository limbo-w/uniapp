<template>
	<view class="pb130 mh100 distribution" v-if="fxsSq.name">
		<uni-nav-bar id='uninavbar' :isleft="true" :uropcity="opcity" :border="opcity>=1" :uriconopcity='iconOpcity'
			:fixed='true' :ispr='false' :statusBar="true" :title="name">
		</uni-nav-bar>
		<view class="hbg posi-a" :style="{background:tColor}"></view>
		<view class="bs20 fx1c f-row posi-r">
			<view class="img bsf mr30">
				<mg-img :src='user.portrait'></mg-img>
			</view>
			<view class="f-1">
				<view class="f-x-bt">
					<view class="f38 wei f-1 cf">{{fxsSq.name}}</view>
					<view @click="ljyq" class="yqhb f-c f24 cf">邀请伙伴</view>
				</view>
				<view class="mt10 cf f24">申请时间：{{fxsSq.examineAt}}</view>
			</view>
		</view>
		<view class="fx2c posi-r">
			<mg-cell cname='p3' isr='1' bgc='none' last='1'>
				<view slot='bd' class="f-y-c">
					<view @click="go({t:1,url:v.url})" v-for="(v,i) in syarr" :key='i' class="f-1 f-c-c b-r-d">
						<view class="f32 wei cf">{{v.n}}</view>
						<view class="f26 cf m20">{{v.t}}</view>
					</view>
				</view>
			</mg-cell>
		</view>
		<view class="fx2c m02 bs20 bf b-s-3 pb20 posi-r">
			<mg-cell cname='p23' isr='1' last='1'>
				<view slot='bd' class="f-y-c">
					<view v-for="(v,i) in tjarr" :key='i' class="f-1 f-c-c b-r-d">
						<view class="f32 wei">{{v.n}}</view>
						<view class="f24 c9 mt20">{{v.t}}</view>
					</view>
				</view>
			</mg-cell>
			<view class="f-c-c p23" v-if="ldxConfig.open==1">
				<button class="clearbtn sbtn f-c cf f30" @click="go({t:1,url:'tx?t=2'})" :style="{background:tColor}">提现</button>
			</view>
		</view>
		<view class="p34 mt10">
			<!-- 	<mg-cell v-if="v.ftunit" @tab="go({t:1,url:v.url})" v-for="(v,i) in arr" :key='i' cname="p30" last="1"
				:iconn='`${v.icn} icname`' :btt="v.name" bttc="f30" arrow="1" ac='iconright1' ftc="f24 cd"
				:ft='`${v.ftnumber} ${v.ftunit}`'></mg-cell> -->
			<!-- 			<mg-cell @tab="go({t:1,url:v.url})" v-for="(v,i) in arr" :key='i' cname="p30" last="1"
				:iconn='`${v.icn} icname`' :btt="v.name" bttc="f30" arrow="1" ac='iconright1' ftc="f24 cd"></mg-cell> -->
			<mg-cell @tab="go({t:1,url:'syxq'})" cname="p30" last="1" iconn='iconcz f44 icname' btt="分销订单" bttc="f30"
				arrow="1" ac='iconright1' ftc="f24 cd"></mg-cell>
			<mg-cell @tab="go({t:1,url:'wdfs'})" cname="p30" last="1" iconn='icondhjl f44 icname' btt="我的团队" bttc="f30"
				arrow="1" ac='iconright1' ftc="f24 cd"></mg-cell>
			<mg-cell  v-if="ldxConfig.open==1" @tab="go({t:1,url:'txmx?t=2'})" cname="p30" last="1" iconn='iconjfgz f40 icname' btt="提现明细"
				bttc="f30" arrow="1" ac='iconright1' ftc="f24 cd"></mg-cell>
		</view>
		<mg-share wxs='1' :hbs='shareCo.isget' v-model="shareshow" ptype='2' :co='shareCo'></mg-share>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import MgImg from '@/components/common/mg-img.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import mgModal from '@/components/common/modal.vue'
	import mgShare from '@/components/template/share.vue'
	export default {
		name: 'fxzx',
		components: {
			uniNavBar,
			MgImg,
			MgCell,
			mgModal,
			mgShare,
		},
		data() {
			return {
				shareshow: false,
				shareCo: {
					isget: true,
				},
				name: '分销中心',
				iData: {},
				arr: [{
						icn: 'iconcz f44',
						url: 'syxq',
						name: '分销订单',
						ftnumber: '0',
						ftunit: '笔',
					},
					{
						icn: 'icondhjl f44',
						url: 'wdfs',
						name: '我的团队',
						ftnumber: '0',
						ftunit: '人',
					},
					{
						icn: 'iconjfgz f40',
						url: 'txmx?t=2',
						name: '提现明细',
					},
				],
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('分销中心')
			this.getLoginInfo().then(async () => {
				await this.getFxzx()
				await this.getFxSq()
				this.getIndex()
				this.getSy()
				this.getLdxConfig('distributionWithdrawalSet')
			})
		},
		mixins: [utilMixins],
		computed: {
			...mapState('dndc', ['fxsInfo', 'fxsSq','ldxConfig']),
			syarr() {
				return [{
					t: '累计佣金',
					url: 'syxq?t=1',
					n: this.iData.allMoney,
				}, {
					t: '下线',
					url: 'wdfs',
					n: this.iData.people,
				}]
			},
			tjarr() {
				return [{
					t: '在路上',
					url: 'syxq?t=1',
					n: this.iData.frozen,
				}, {
					t: '可提现',
					url: 'syxq?t=2',
					n: this.iData.userMoney,
				}, {
					t: '提现中',
					url: 'syxq?t=3',
					n: this.iData.wait,
				}, {
					t: '已提现',
					url: 'syxq?t=3',
					n: this.iData.alreadyMoney,
				}]
			},
		},
		methods: {
			...mapActions('dndc', ['getFxzx','getLdxConfig']),
			async getIndex() {
				let {
					data
				} = await this.util.request({
					'url': this.api.distributionIndex,
					mask: 1,
				})
				this.iData = data
			},
			async getSy() {
				this.util.request({
					'url': this.api.xcxm,
					data: {
						page: 'yb_wm/index/index',
						ident: 'distribution',
						scene: this.uId + ',2',
					},
				}).then(async Resdata => {
					console.log(22, Resdata)
					let bres, bgimg = this.fxsInfo.shareAd
					try {
						let [e, res] = await uni.downloadFile({
							url: bgimg
						})
						bres = res
						if (!res) {
							let [e1, res1] = await uni.getImageInfo({
								src: bgimg
							})
							bres = res1
							console.log('res1 getImageInfo', e1, res1)
						}
						let [e2, res2] = await uni.getImageInfo({
							src: Resdata.data,
						})
						this.shareCo = {
							isget: true,
							bgimg: bres.path || bres.tempFilePath,
							code: res2.path
						}
						console.log('res downloadFile', e, res, 'res2', e2, res2)

					} catch (e) {
						console.log('图片error', e)
					}
				})
			},
			ljyq() {
				this.shareshow = true
			},
			ljtx() {
				this.go({
					t: 1,
					url: `/yb_wm/order/distribution/tx?p=6`
				})
			},
		},
		onShareAppMessage() {
			this.shareshow = false
			let p = `yb_wm/index/index?scene=${this.uId}` + ',2'
			return this.util.mpShare({
				t: this.fxsInfo.shareTitle,
				i: this.fxsInfo.shareIcon && this.getSingleImg(this.fxsInfo.shareIcon),
				p,
			})
		},
	}
</script>
<style scoped lang="scss">
	.distribution {
		background: #fff;
	}

	.main {
		padding: 70rpx 40rpx;
	}

	.hbg {
		width: 100%;
		height: 600rpx;
		background: linear-gradient(to bottom, #05A0FD, #0387FD);
	}

	.fx1c {
		padding: 200rpx 30rpx 10rpx 30rpx;

		.img {
			width: 120rpx;
			height: 120rpx;
			// border: 6rpx solid #fff;
		}

		.yqhb {
			background: linear-gradient(to right, #FE8B0C, #FEBD3C);
			height: 54rpx;
			padding: 0 25rpx;
			border-radius: 54rpx;
		}
	}

	.fx2c {
		.b-r-d::after {
			background: #eee;
		}

		.lb {
			height: 80rpx;
		}
	}

	.sbtn {
		width: 560rpx;
		height: 74rpx;
		background: #0594FE;
		border-radius: 47px;
	}

	.p34 {
		padding: 30rpx 40rpx;
	}
</style>
