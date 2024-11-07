<template>
	<view class="pb130 mh100" style="background: #f0f0f0;" :style="{paddingBottom:hasTabbar?'275rpx':'160rpx'}">
		<view class="mb20" style="padding: 30rpx 18rpx 0;"
			:style="{background: `linear-gradient(180deg, #181818 70%, #f0f0f0)`}">
			<view class="f-y-c tggc mb20" :style="{background:'linear-gradient(135deg, #F4D9B1, #F2D5A9)'}">
				<text class="iconfont icongg c0"></text>
				<view class="f-1">
					<uni-notice-bar fs='24' :scrollable="true" :single="true" color="#000" backgroundColor="transparent"
						:text="payVipset.notice" :speed='36' />
				</view>
			</view>
			<view v-if="ffhysj.state==1" class="pvt1c p-r bs20">
				<view class="p-a t0 wh bgimg">
					<mg-img :src='payVipset.vipBg||`${onImgurl}img/payvipbg.png`'></mg-img>
				</view>
				<view class="p-r pvt1 t-c">
					<text class="iconfont iconhg f56" style="color: #B9884A;"></text>
					<view class="f38 wei jbc mt5">{{payVipset.title}}</view>
					<view class="f24 m10" style="color: #6E481C;">开通会员，最高可省<text
							style="color: #C13215;">{{ffhysj.economizeMoney+dw}}</text>
					</view>
					<view v-if="xztcinfo" @click="dktc" class='sgyk f-c p-r o-h' style="width: 550rpx;">
						购{{xztcinfo.day}}天卡{{xztcinfo.first==1 && ffhysj.state==1?xztcinfo.firstMoney:xztcinfo.money}}{{dw}}
						<view class="p-a xsth f-c">限时特惠</view>
					</view>
				</view>
			</view>
			<view v-else-if="ffhysj.state==2">
				<view class="pvt1c p-r bs20 mt30">
					<view class="p-a t0 wh bgimg">
						<mg-img :src='payVipset.vipBg||`${onImgurl}img/payvipbg.png`'></mg-img>
					</view>
					<view class="p-r pvt3">
						<view class="f-row mb30">
							<view class="imgc mr30">
								<mg-img cname='bsf' :src="user.portrait||'/static/wd/mrtx.png'"></mg-img>
							</view>
							<view class="f-1">
								<view class="f-y-c">
									<view class="f-1">
										<view class="f30 wei" style="color: #5D360A;">{{user.userName}}</view>
										<view class="mt10 f24" style="color: #B28E5D;">
											将于{{timeToDate(ffhysj.vipEndTime)}}到期</view>
									</view>
									<view class="rbtn" @click="xfhyk">续费</view>
								</view>
								<view class="mt10 f24" style="color: #7B562A;">
									会员券累计节省{{sl+ffhysj.cumulative}},{{ffhysj.waitNum}}张会员券可用</view>
							</view>
						</view>
					</view>
				</view>
				<view class="hyxfc p-r">
					<view class="p-a xfyj"></view>
					<view class="p-a xfyj2"></view>
					<view class="p-a zsj"></view>
					<view class="p-a ysj"></view>
					<view class="p23 top f-row" style="color: #FFE8C7;">
						<view class="f-1 t-c b-r-d">
							<view>待使用<text class="f42">{{ffhysj.waitNum}}</text>张</view>
							<view class="f24" style="color: #897E73;">可优惠{{sl+ffhysj.waitMoney}}</view>
						</view>
						<view class="f-1 t-c b-r-d">
							<view>已使用<text class="f42">{{ffhysj.alreadyNum}}</text>张</view>
							<view class="f24" style="color: #897E73;">已优惠{{sl+ffhysj.alreadyMoney}}</view>
						</view>
					</view>
					<!-- <view class="btm f-y-c">
						<text class="iconfont iconlb f30 mr20" style="color: #A99988;"></text>
						<view class="f24 t-o-e" style="color: #7D7469;">无门槛券下月发放时间&满减券总额刷新时间:8月20日</view>
					</view> -->
				</view>
			</view>
			<view v-else-if="ffhysj.state==3" class="pvt1c p-r bs20 mt30">
				<view class="p-a t0 wh bgimg">
					<mg-img :src='payVipset.vipBg||`${onImgurl}img/payvipbg.png`'></mg-img>
				</view>
				<view class="p-r pvt3">
					<view class="f-row">
						<view class="imgc mr30">
							<mg-img cname='bsf' :src="user.portrait||'/static/wd/mrtx.png'"></mg-img>
						</view>
						<view class="f-1">
							<view class="f-y-c">
								<view class="f-1">
									<view class="f30 wei" style="color: #5D360A;">{{user.userName}}</view>
									<view class="mt10 f24" style="color: #75664E;">已于{{timeToDate(ffhysj.vipEndTime)}}到期
									</view>
								</view>
								<view @click="dktc" class="rbtn">开通</view>
							</view>
							<view class="mt10 f24" style="color: #7B562A;">会员期间累计节省{{sl+ffhysj.cumulative}}</view>
						</view>
					</view>
					<view class="p-a ygqc f-c">已过期</view>
				</view>
			</view>
		</view>
		<view class="p03" style="padding: 0 18rpx;">
			<view class="p03 bs20 mb20 pb10 bf">
				<view class="f-c p13 f30 hytq">
					<view class="tjdx"></view>
					<view class="m02 wei f34">会员特权</view>
					<view class="tjdx"></view>
				</view>
				<view class="t-c f24" style="color: #666;margin-top: -6rpx;">共{{qyarr.total}}项特权，全平台使用</view>
				<btn-group :co="qyarr"></btn-group>
			</view>
			<view v-if='ffhysj.payVipRebate&&ffhysj.payVipRebate.couponInfo' class="pvt2c p3 bs20 mb20">
				<mg-cell @tab="go({url:'/yb_wm/my/coupon/my'})" last='1' cname='p0' bgc='transparent' arrow='1'
					acolor='#666' asize='22' ft='去使用' ftc='f24' color='#666'>
					<view slot='bd' class="f-y-c">
						<view class="qxc f22 f-c bs5 mr10">权益1</view>
						<view class="f34 wei" style="color: #000;">{{ffhysj.payVipRebate.rebateTitle}}</view>
					</view>
				</mg-cell>
				<view class="mt5 f24" style="color: #666;">{{ffhysj.payVipRebate.rebateSubtitle}}</view>
				<view class="f-bt f-w mt10">
					<view class="yhqc p-r o-h" v-for="(v,i) in ffhysj.payVipRebate.couponInfo">
						<view class="p-a wh">
							<mg-img src="/static/yhq/pvyhq.png"></mg-img>
						</view>
						<view class="p-r yhq wh f-c-c">
							<view class="yhqt l-h1 wei f-y-c" style="color: #FF5F00;">
								{{Number(v.money)}}
								<text class="f28 mt15 ml5">{{dw}}</text>
								<text class="f28 m01 nowei" style="color: #FC9751;">x</text>
								1
								<text class="f28 mt15 ml5">张</text>
							</view>
							<view class="yhqb f24 mt5" style="color: #AC8447;">
								{{v.isFull==1?'无门槛':`满${Number(v.fullMoney)}可用`}}
							</view>
						</view>
						<view class="yhqbg3 p-a f20">{{v.storeType==2?'通用':'指定门店'}}</view>
						<!-- <view class="yhqbg2 p-a">
							<mg-img src="/static/yhq/pvyhq1.png"></mg-img>
						</view>
						<view class="yhqbg2 ty p-a f20 f-c">通用</view> -->
					</view>
				</view>
			</view>
			<view v-if='ffhysj.payVipCycleRebate&&ffhysj.payVipCycleRebate.open==1' class="pvt2c p3 bs20 mb20">
				<mg-cell @tab="go({url:'/yb_wm/my/coupon/my'})" last='1' cname='p0' bgc='transparent' arrow='1'
					acolor='#666' asize='22' ft='去使用' ftc='f24' color='#666'>
					<view slot='bd' class="f-y-c">
						<view class="qxc f22 f-c bs5 mr10">权益2</view>
						<view class="f34 wei" style="color: #000;">{{ffhysj.payVipCycleRebate.cycleTitle}}</view>
					</view>
				</mg-cell>
				<view class="mt5 f24" style="color: #666;">{{ffhysj.payVipCycleRebate.cycleSubtitle}}</view>
				<view class="pt10">
					<view class="bf bs10 mt20 yhq2c f-row" v-for="(v,i) in ffhysj.payVipCycleRebate.couponInfo">
						<view class="f-1 left f-row">
							<view class="leftl f-c wei f52" style="color: #75481C;">{{Number(v.money)}}
								<text class="f28 mt20 ml5">{{dw}}</text>
							</view>
							<view class="f-1 f-col f-c-xc">
								<view class="f30" style="color: #8A6A47;">
									{{v.isFull==1?'无门槛':`满${Number(v.fullMoney)}可用`}}
								</view>
								<view class="f-y-c mt10">
									<view class="f22 t-o-e" style="color: #9A6649;">{{v.explain}}</view>
								</view>
							</view>
						</view>
						<view class="right f-c-c p-r">
							<view class="lq f-c f26 wei">代金券</view>
							<view class="p-a yd syd"></view>
							<view class="p-a yd xyd"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="ffhysj.state==1||ffhysj.state==3" class="foot-btnc" :style="{bottom:hasTabbar?'115rpx':''}">
			<view @click="dktc" class="kttcc f-row p-r">
				<view class="left f-y-c">
					<view style="color: #75572B;">{{xztcinfo.day}}天：</view>
					<view class="c3 wei">{{sl}}</view>
					<view class="f50 c3 mb20 wei">{{xztcinfo.first==1 && ffhysj.state==1?xztcinfo.firstMoney:xztcinfo.money}}</view>
					<view class="ml30 t-d-l" v-if="xztcinfo.first==1 && ffhysj.state==1" style="color: #A2865C;">原价{{sl+xztcinfo.money}}
					</view>
				</view>
				<view class="o-h right p-a">
					<view class="p-a cfx f34 wei f-c">立即购买</view>
					<view class="p-a xsj"></view>
				</view>
			</view>
		</view>
		<mg-popup v-model="show">
			<view class="tctcc bf5 o-h" :style="{paddingBottom:hasTabbar?'115rpx':''}">
				<view class="p3 bf">
					<view class="f-bt f-w tctcc1">
						<view @click="xztc(i)" v-for="(v,i) in tcarr" :key='i' class="tcc f-c-c bs10 o-v p-r mb20"
							:class="{'xz':i==xzidx}">
							<view class="ysjc p-a f22 cf" :class="{ysjcyh:i!=0}">{{i==0?'推荐':'特惠'}}</view>
							<view>{{v.title}}</view>
							<view class="f24 mt5 wbba">
								<text class="wei">{{sl}}</text>
								<text class="f48 wei">{{v.first==1 && ffhysj.state==1?v.firstMoney:v.money}}</text>
								<text v-if="v.first==1 && ffhysj.state==1" class="c9 t-d-l ml5">{{v.money}}</text>
							</view>
							<view class="f22 mt10" :class="{'c6':i!=xzidx}">{{v.subtitle}}</view>
						</view>
					</view>
					<view @click="gmxz=!gmxz" class="mt10 f-y-c">
						<view class="dgc bsf f-c mr20" :style="{background:gmxz?'':'#ededed'}"><text
								class="iconfont icongou f22" :style="{color: gmxz?'#F7C780':'#999'}"></text>
						</view>
						<view class="f-1 f26">阅读并同意《购买须知》</view>
						<text @click.stop="ckxy" class="iconfont iconwen"></text>
					</view>
				</view>
				<view class="p3 bf mt20">
					<view class="pb20">
						<view class="kttcc f-row p-r">
							<view class="left f-y-c">
								<view style="color: #75572B;">{{xztcinfo.day}}天：</view>
								<view class="c3 wei">{{sl}}</view>
								<view class="f50 c3 mb20 wei">{{xztcinfo.first==1 && ffhysj.state==1?xztcinfo.firstMoney:xztcinfo.money}}
								</view>
								<view class="ml30 t-d-l" v-if="xztcinfo.first==1 && ffhysj.state==1" style="color: #A2865C;">
									原价{{sl+xztcinfo.money}}
								</view>
							</view>
							<view @click="ljkt" class="o-h right p-a">
								<view class="p-a cfx f34 wei f-c">立即开通</view>
								<view class="p-a xsj"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mg-popup>
		<tab-bar @refresh='tbrh'></tab-bar>
		<load v-if="showloading"></load>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils';
	import LsSwiper from '@/components/third/ls-swiper/index.vue'
	import MgSwiper from '@/components/common/functionCmp/swiper.vue'
	import mgPopup from '@/components/common/popup.vue'
	import btnGroup from '@/components/drag/btn.vue';
	import load from '@/components/common/load.vue'
	import uniNoticeBar from '@/components/third/uni-notice-bar.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'wkk',
		components: {
			LsSwiper,
			MgSwiper,
			btnGroup,
			load,
			mgPopup,
			uniNoticeBar,
		},
		data() {
			return {
				showloading: true,
				type: 1,
				loading: false,
				qyarr: {
					btnList: [],
					circle: 10,
					circleBtn: "10",
					colorBg: "",
					colorWord: "#000",
					tsname: {
						fontSize: '26rpx',
						fontWeight: 'bold'
					},
					line: "2",
					marginBottom: 0,
					marginLR: 0,
					marginTop: 0,
					num: "3",
					total: 0,
				},
				xztcinfo: '',
				query: {},
				hddb: false,
				show: false,
				tcarr: [],
				xzidx: 0,
				hasTabbar: false,
				gmxz: true,
				ffhysj: {},
			}
		},
		async onLoad(options) {
			this.util.setNB('#181818')
			this.query = options
			await Promise.all([this.getSystem(),
				this.getLoginInfo()
			])
			this.refreshUser({
				nomask: 1,
				get: 1,
				now: 1,
			})
			await this.getConfig({
				key: 'payVipset',
				api: 'config',
				params: {
					ident: 'payVip'
				}
			})
			this.util.setNT(this.payVipset.name)
			this.getDjlb()
			// this.util.setNT('敬请期待')
		},
		onShow() {
			if (this.isload) {
				this.getHysj()
			} else {
				this.isload = true
			}
		},
		onHide() {
			this.show = false
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				payVipset: state => state.config.payVipset,
			}),
			lbswiper() {
				return {
					class: '',
					swiper: [{
						url: 'https://images.ddycms.cn/yb_wm/39/2021/01/13/202101131541554298.jpg'
					}],
					duration: '',
					mode: '',
					height: '360',
					radius: '30',
					auto: true,
					interval: 5,
				}
			},
			darr() {
				return [{
					url: '/yb_wm/other/recharge/yesy',
					num: this.user.balance,
					name: this.system.custom.balance,
				}, {
					url: '/yb_wm/my/integral/my-integral',
					num: this.user.integral,
					name: this.system.custom.integral,
				}, {
					url: 'czz',
					num: this.user.growth,
					name: '成长值',
				}]
			},
		},
		methods: {
			...mapActions(['getConfig']),
			ckxy() {
				this.go({
					url: `/yb_wm/my/other/gywm?t=购买须知&p=12`
				})
			},
			ljkt: utils.throttle(async function(e) {
				if (!this.gmxz) {
					return this.util.message('请阅读并同意购买须知', 3)
				}
				if (this.loading) return
				this.loading = true
				let orderRes = await this.util.request({
					'url': this.api['ffhyxd'],
					method: 'POST',
					mask: '下单中',
					data: {
						day: this.xztcinfo.day
					},
				})
				if (orderRes) {
					this.go({
						t: 1,
						url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
							orderId: orderRes.data,
							orderType: 8,
							info: {
								money: this.xztcinfo.first == 1 && this.ffhysj.state == 1 ? this.xztcinfo
									.firstMoney : this.xztcinfo.money,
								type: "付费会员卡支付",
								cancel: 1,
								go: {
									t: 4,
								},
							}
						}))
					})
					this.loading = false
				} else {
					this.loading = false
				}
			}, 1000),
			async getDjlb() {
				let res = await Promise.all([this.util.request({
					'url': this.api.ffhykqy,
				}), this.getHysj()])
				console.log(res)
				this.qyarr.btnList = res[0].data.map(v => ({
					img: v.icon,
					word: v.name,
				}))
				this.qyarr.total = res[0].data.length
				this.tcarr = this.payVipset.dayArr
				this.xztcinfo = this.payVipset.dayArr[0] || ''
				this.$nextTick(function() {
					this.showloading = false
				})
			},
			async getHysj() {
				let res = await this.util.request({
					'url': this.api.ffhysj,
				})
				this.ffhysj = res.data
			},
			myDataClick(v) {
				let url = ''
				if (v.url) {
					url = v.url
					if (v.name == '会员说明') {
						uni.setStorageSync('fwb', this.vipset.content)
					}
				}
				this.go({
					t: 1,
					url,
				})
			},
			async ljkk() {
				if (!await this.checkLogin()) return
				this.go({
					url: 'open'
				})
			},
			dktc() {
				this.show = true
			},
			xfhyk() {
				this.show = true
			},
			xztc(i) {
				this.xzidx = i
				this.xztcinfo = this.tcarr[i]
			},
			tbrh(e) {
				this.hasTabbar = true
			},
		},
		onShareAppMessage() {
			// let p = 'yb_wm/order/vip/wkk'
			return this.util.mpShare({
				t: this.payVipset.name,
				// p,
			})
		},
		// onPageScroll(e) {
		// 	if (this.hddb && e.scrollTop < 500) {
		// 		this.hddb = false
		// 	} else if (!this.hddb && e.scrollTop > 500) {
		// 		this.hddb = true
		// 	}
		// },
		onShareTimeline(e) {
			return {
				title: this.payVipset.name,
			}
		},
	}
</script>
<style scoped lang="scss">
	.tggc {
		border-radius: 40rpx;
		padding: 6rpx 30rpx;
	}

	.sgyk {
		color: #EBE5DD;
		margin: 30rpx auto 0;
		height: 82rpx;
		border-radius: 82rpx;
		background: linear-gradient(90deg, #7F500C 60%, #583602);
	}

	.xsth {
		top: 26rpx;
		left: -38rpx;
		width: 168rpx;
		height: 45rpx;
		font-size: 22rpx;
		transform: rotate(-45deg);
		transform-origin: 50% 0%;
		color: #6E481C;
		background: linear-gradient(0deg, #FFE3B5 0%, #FEEDD5 100%);
	}

	.foot-btnc {
		background: #fff;

		.sgyk {
			color: #7F500C;
			height: 92rpx;
			background: linear-gradient(90deg, #FADFC1 0%, #E9BB7D 100%);
		}

		.xsth {
			color: #F8CC91;
			background: linear-gradient(90deg, #623D09 60%, #926016);
		}
	}

	.pvt1c {
		.pvt1 {
			padding: 25rpx 35rpx 35rpx;
		}

		.pvt3 {
			padding: 48rpx 35rpx;

			.imgc {
				width: 100rpx;
				height: 100rpx;
			}

			.rbtn {
				color: #fff;
				width: 148rpx;
				height: 68rpx;
				border-radius: 68rpx;
				background: linear-gradient(90deg, #AA632C, #7E4913);
			}
		}

		.ygqc {
			top: 6rpx;
			right: -42rpx;
			width: 190rpx;
			height: 48rpx;
			padding-left: 30rpx;
			font-size: 22rpx;
			transform: rotate(32deg);
			transform-origin: 50% 0%;
			color: #676767;
			background: linear-gradient(90deg, #D7D7D8, #C1C1C1);
		}
	}

	.hyxfc {
		margin: -30rpx -16rpx 0;

		.xfyj {
			width: 16rpx;
			height: 66rpx;
			border-top-left-radius: 30rpx;
			border: 1px solid #CC9C73;
			border-right: none;
			border-bottom: none;
			background: #1C1E23;
			left: 0;
			transform: translateY(-100%);
		}

		.xfyj2 {
			width: 16rpx;
			height: 66rpx;
			border-top-right-radius: 30rpx;
			border: 1px solid #CC9C73;
			border-left: none;
			border-bottom: none;
			background: #1C1E23;
			right: 0;
			transform: translateY(-100%);
		}

		.zsj {
			top: -10rpx;
			left: 0;
			background: #313235;
			width: 51%;
			height: 22rpx;
			transform: skew(0, 3deg);
		}

		.ysj {
			top: -10rpx;
			right: 0;
			background: #313235;
			width: 51%;
			height: 22rpx;
			transform: skew(0, -3deg);
		}

		.b-r-d:after {
			background: #5F5F5D;
		}

		.top {
			background: #313235;
			border-radius: 0 0 30rpx 30rpx;
		}

		.btm {
			padding: 22rpx 60rpx;
			background: #2C2D30;
			border-radius: 0 0 30rpx 30rpx;
		}
	}

	.jbc {
		background: linear-gradient(to bottom, #EDC894 10%, #B3804D 30%, #875627 60%, #4E2907 80%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
	}

	.hytq {
		color: #000;
	}

	.tjdx {
		width: 48rpx;
		height: 2rpx;
		background: #000;
	}

	.pvt2c {
		.qxc {
			padding: 0 10rpx;
			height: 38rpx;
			color: #FFE5B8;
			background: linear-gradient(45deg, #AC7248, #B58359, #8B5C38);
			transform: skew(-10deg)
		}

		background: linear-gradient(135deg, #FFF0DC, #FBE6C4);
		background: #fff;

		.yhqc {
			margin-top: 20rpx;
			width: 307rpx;
			height: 160rpx;

			.yhqt {
				font-size: 52rpx;
			}

			.yhqb {
				// height: 62rpx;
			}
		}

		.yhqbg2 {
			width: 70rpx;
			height: 70rpx;
			top: -12rpx;
			left: -8rpx;
		}

		.yhqbg3 {
			top: 0;
			border-radius: 8px 0 8px 0;
			padding: 1px 10px;
			background: #FFEBCA;
			color: #AE884B;
		}

		.ty {
			transform: rotate(-45deg);
			color: #EADED8;
		}

		.yhq2c {
			background: linear-gradient(90deg, #FFF7E4 40%, #FCDBB2 100%);
			height: 170rpx;

			.leftl {
				font-size: 52rpx;
				width: 180rpx;
			}

			.right {
				width: 200rpx;
				border-left: 4rpx dashed #FFEBD2;
				stroke-dasharray: 4;
				stroke-dashoffset: 22;

				.lq {
					color: #6F3E07;
					width: 140rpx;
					height: 60rpx;
					border-radius: 60rpx;
					background: linear-gradient(90deg, #FBDC9D, #FEB94A);
				}
			}

			.yd {
				left: -16rpx;
				width: 28rpx;
				height: 28rpx;
				background: #fff;
				border-radius: 50%;
			}

			.syd {
				top: -16rpx;
			}

			.xyd {
				bottom: -16rpx;
			}
		}
	}

	.tctcc {
		border-radius: 30rpx 30rpx 0 0;

		.tctcc1::after {
			content: "";
			height: 0;
			width: 222rpx;
		}

		.tcc {
			width: 222rpx;
			height: 214rpx;
			background: #F7F7F7;
			color: #9C714C;

			&.xz {
				border: 1px solid #DABE94;
				background: #F3EADC;
			}

			.ysjc {
				right: 0;
				top: -10rpx;
				padding: 2rpx 12rpx;
				border-radius: 15rpx 0 15rpx 0;
				background: linear-gradient(135deg, #FE2623, #FF5C4A);
			}

			.ysjcyh {
				background: linear-gradient(135deg, #FF5D01, #FF8015);
			}
		}

		.dgc {
			width: 34rpx;
			height: 34rpx;
			background: #040403;
		}
	}

	.kttcc {
		height: 96rpx;
		border-radius: 96rpx;
		background: #F7D9AC;

		.left {
			width: 70%;
			padding: 0 30rpx 0 40rpx;
		}

		.right {
			top: 0;
			right: 0;
			width: 34%;
			height: 104rpx;
			margin-top: -6rpx;

			.cfx {
				width: 82%;
				right: 0;
				height: 100%;
				background: #30343D;
				border-radius: 0 103rpx 103rpx 0;
				color: #E6B977;
				padding-right: 10rpx;
			}

			.xsj {
				top: 0;
				width: 45rpx;
				background: #30343D;
				height: 100%;
				left: 0;
				transform: translateX(44%) skew(-20deg);
			}
		}
	}
</style>
