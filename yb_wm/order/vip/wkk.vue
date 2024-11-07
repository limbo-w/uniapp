<template>
	<view class="pb130 mh100" :class="{bf:type==2}">
		<block v-if="type==1">
			<view class="o-h">
				<view class="wk1" :style="{background:tColor}"></view>
				<view class="wk1ic">
					<!-- <view style="padding: 0 84rpx;">
						<mg-swiper :co='lbswiper' u='rpx' :color='tColor'></mg-swiper>
					</view> -->
					<ls-swiper :list="lsarr" imgKey="imgUrl" :crown="true" :slots='true' :loop="true" :shadow='true' height='180'
					 :previousMargin="PM" :nextMargin='NM' imgRadius="15" @change='lschange' :swcurrent='swcurrent'>
					 <!-- #ifndef MP-TOUTIAO -->
						<template v-slot="{ data }">
							<view class="bs20 imgc p-r" :style="{background:data.bgType==1?data.color||tColor:''}">
								<view class="p-a wh">
									<mg-img :src="data.bgType==2?data.bgImg:'/static/wd/vip/vipbg.png'"></mg-img>
								</view>
								<view class="p-r wh cf">
									<view class="p34 f-y-c">
										<view class="f-1 f32 wei">{{data.name}}</view>
										<view class="rdj b-d f26 l-n">VIP{{data.level}}</view>
									</view>
									<view class="p3 mt30 f-y-e">
										<view class="f40 l-n">{{data.condition}}</view>
										<view class="ml20 f26">成长值</view>
									</view>
								</view>
							</view>
						</template>
						<!-- #endif -->
					</ls-swiper>
				</view>
			</view>
			<view class="p03">
				<view class="p03 bf bs20 mb30 pb10">
					<view class="f30 wei c0 mt30">会员权益</view>
					<btn-group :co="qyarr"></btn-group>
				</view>
				<view class="p03 bf bs20 mb30">
					<view class="f30 wei c0 p30">升级礼包</view>
					<block v-if="xzdjinfo.isCoupon==1">
						<mg-cell isl='1' v-for="(v,i) in xzdjinfo.couponList" :key='i'>
							<view slot='bd' class="f-row">
								<view class="mr30">
									<text class="iconfont iconzyhq f48 c3"></text>
								</view>
								<view class="f22 f-1">
									<view class="f-row">
										<view class="f24 wei">{{v.name}}<text class="ml10 nowei" :style="{color:tColor}">x1</text></view>
										<view @click="go({url:'/yb_wm/my/coupon/coupon-dl?nobtn=1&id='+v.id})" class="cf xqc f-c ml10 f-g-0 f20"
										 :style="{background:tColor}">详情</view>
									</view>
									<view class="c6 mt10">自动转入您的账户中</view>
									<!-- <view class="c9 mt10">仅外卖、堂食部分商品可用不与其它优惠共享</view> -->
								</view>
							</view>
						</mg-cell>
					</block>
					<mg-cell v-if="xzdjinfo.isBalance==1" isl='1'>
						<view slot='bd' class="f-row">
							<view class="mr30">
								<text class="iconfont iconye1 f48 c3"></text>
							</view>
							<view class="f22 f-1">
								<view class="f24 wei">赠送{{system.custom.balance}}<text class="m01" :style="{color:tColor}">{{xzdjinfo.balance}}</text>{{dw}}</view>
								<view class="c6 mt10">自动转入您的{{system.custom.balance}}中</view>
							</view>
						</view>
					</mg-cell>
					<mg-cell v-if="xzdjinfo.isIntegral==1" isl='1'>
						<view slot='bd' class="f-row">
							<view class="mr30">
								<text class="iconfont iconjf f48 c3"></text>
							</view>
							<view class="f22 f-1">
								<view class="f24 wei">赠送{{system.custom.integral}}<text class="m01" :style="{color:tColor}">{{xzdjinfo.integral}}</text>{{system.custom.integral}}</view>
								<view class="c6 mt10">自动转入您的{{system.custom.integral}}中</view>
							</view>
						</view>
					</mg-cell>
					<mg-cell v-if="xzdjinfo.isGrowth==1" isl='1'>
						<view slot='bd' class="f-row">
							<view class="mr30">
								<text class="iconfont iconwc f48 c3"></text>
							</view>
							<view class="f22 f-1">
								<view class="f24 wei">赠送成长值<text class="m01" :style="{color:tColor}">{{xzdjinfo.growth}}</text>成长值</view>
								<view class="c6 mt10">自动转入您的成长值中</view>
							</view>
						</view>
					</mg-cell>
				</view>
			</view>
			<view v-if="!isVip" class="foot-btnc p-r">
				<button :disabled="loading" :loading="loading" @click="ljkk" class="foot-btn" :style="{background:tColor}">立即开卡</button>
			</view>
		</block>
		<block v-else>
			<view class="p34">
				<view class="p-r">
					<view class="wk2img bs20 mb20" :style="{background:vipInfo.bgType==1?vipInfo.color||tColor:''}">
						<mg-img :src="vipInfo.bgType==2?vipInfo.bgImg:'/static/wd/vip/vipbg.png'"></mg-img>
					</view>
					<view class="p-a t0 wh cf f-col">
						<view class="f-1">
							<view class="wk2c1">
								<view class="f-y-c">
									<view class="himg bsf mr20">
										<mg-img :src="user.portrait||'/static/wd/mrtx.png'"></mg-img>
									</view>
									<view class="f-1">
										<view class="f32">{{vipset.title}}</view>
										<view class="f20 mt10">{{vipInfo.name}}</view>
									</view>
									<view class="rdj b-d f26 mb20 l-n">VIP{{vipInfo.level}}</view>
								</view>
								<view class="f-x-e mt15">
									<text @click="go({url:'/yb_wm/other/recharge/smzf'})" class="iconfont iconewm cf f56"></text>
								</view>
							</view>
						</view>
						<view class="p2 f26 mb10">NO.{{user.vipCode}}</view>
					</view>
				</view>
				<view class="p23 f-row">
					<view @click="myDataClick(v)" v-for="(v,i) in darr" :key='i' class="f-1 wei t-c">
						<view class="f38 wbba">{{v.num}}</view>
						<view>{{v.name}}</view>
					</view>
				</view>
				<view class="mt20">
					<mg-cell @tab="myDataClick(v)" v-for="(v,i) in arr" :key='i' cname="p30" last="1" :iconn='`${v.icn} icname`' :btt="v.name"
					 bttc="f30" arrow="1" ac='iconright1' ftc="f24 cd"></mg-cell>
				</view>
			</view>
			<view v-if='vipset.wechatCard==1' class="foot-btnc p-r p34">
				<navigator hover-class="none" v-if="adata&&user.WeChatCard == 2" target="miniProgram" app-id="wxeb490c6f9b154ef9"
				 :extra-data="adata">
					<!-- <button hover-class="btnhc" class="btn f-c f34">同步微信卡包</button> -->
					<button class="foot-btn f30 wei bf b-f5" :style="{borderColor:tColor,color:tColor}">同步微信卡包</button>
				</navigator>
				<navigator hover-class="none" v-if="user.WeChatCard == 1" target="miniProgram" app-id="wxeb490c6f9b154ef9"
				 :extra-data="adata">
					<button class="foot-btn f30 wei bf b-f5" :style="{borderColor:tColor,color:tColor}">查看微信卡包</button>
				</navigator>
			</view>
		</block>
		<tab-bar v-if="!query.type"></tab-bar>
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
	import btnGroup from '@/components/drag/btn.vue';
	import load from '@/components/common/load.vue'
	export default {
		name: 'wkk',
		components: {
			LsSwiper,
			MgSwiper,
			btnGroup,
			load,
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
					colorWord: "",
					line: "2",
					marginBottom: 0,
					marginLR: 0,
					marginTop: 0,
					num: "3",
				},
				arr: [{
					icn: 'iconcz f44',
					url: '/yb_wm/other/recharge/index',
					name: '在线储值'
				}, {
					icn: 'iconjfgz f44',
					url: 'czz',
					name: '成长值'
				}, {
					icn: 'iconqy f42',
					url: 'wkk?type=1',
					name: '会员权益'
					// }, {
					// 	icn: 'iconjfsc f40',
					// 	name: '适用店铺'
					// }, {
					// 	icn: 'iconjfgz f40',
					// 	url: '../my/other/bzzx',
					// 	name: '交易记录',
					// }, {
					// 	icn: 'iconsz f40',
					// 	name: '支付密码'
				}, {
					icn: 'icondhjl f40',
					url: `/yb_wm/my/other/gywm?t=会员说明&p=6`,
					name: '会员说明'
				}],
				lsarr: [],
				xzdjinfo: {},
				swcurrent: 0,
				vipInfo: {},
				adata: '',
				query: {},
				// #ifdef  MP-TOUTIAO
				PM:'84',
				NM:'84',
				// #endif
				// #ifdef  MP-WEIXIN || H5
				PM:'84',
				NM:'84',
				// #endif
				// #ifdef  MP-ALIPAY
				PM:'42',
				NM:'42',
				// #endif
			}
		},
		async onLoad(options) {
			this.query = options
			await Promise.all([this.getSystem(),
				this.getLoginInfo()
			])
			this.type = this.isVip ? 2 : 1
			if (this.query.type) {
				this.type = this.query.type
			}
			if (this.type == 1) {
				this.util.setNB(this.tColor)
			}
			await this.getConfig({
				key: 'vipset',
				api: 'config',
				params: {
					ident: 'vipSet'
				}
			})
			if (this.type == 1) {
				this.util.setNT(this.vipset.title)
			} else {
				this.util.setNT('会员中心')
			}
			this.getDjlb()
			// this.util.setNT('敬请期待')
		},
		onShow() {
			if (this.isload) {
				if (!this.query.type && this.isVip && this.type == 1) {
					this.vipInfo = this.lsarr.find(v => v.level == this.user.level)
					this.type = 2
					this.util.setNB()
					this.util.setNT('会员中心')
					this.getVipdata()
				}
			} else {
				this.isload = true
			}
		},
		computed: {
			...mapState({
				vipset: state => state.config.vipset,
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
			async getVipdata() {
				if (this.vipset.wechatCard != 1) return
				// #ifdef MP-WEIXIN
				let res = await this.util.request({
					'url': this.api.hykcs,
					method: 'POST',
				})
				if (res.data) {
					let url = decodeURIComponent(res.data),
						theRequest = utils.getUrlParams(decodeURIComponent(res.data))
					this.adata = {
						encrypt_card_id: theRequest.encrypt_card_id,
						outer_str: theRequest.outer_str,
						biz: theRequest.biz.split('#')[0],
					}
					// console.log(url, theRequest)
				}
				// #endif
			},
			lschange(e) {
				// console.log('lschange', e)
				this.xzdjinfo = e
				this.qyarr.btnList = e.rightsList.map(v => ({
					img: v.icon,
					word: v.name,
				}))
			},
			async getDjlb() {
				let {
					data
				} = await this.util.request({
					'url': this.api.hydj,
				})
				this.lsarr = data
				if (data.length) {
					this.lschange(data[0])
					if (this.isVip) {
						this.refreshUser({
							nomask: 1,
							get: 1,
							now: 1,
						})
						this.swcurrent = data.findIndex(v => v.level == this.user.level)
						this.vipInfo = data[this.swcurrent]
						this.getVipdata()
					}
				}
				this.$nextTick(function() {
					this.showloading = false
				})
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
		},
		onShareAppMessage() {
			let p = 'yb_wm/order/vip/wkk'
			return this.util.mpShare({
				t: this.vipset.title,
				p,
			})
		},
		onShareTimeline(e) {
			return {
				title: this.vipset.title,
				imageUrl: this.getImgS(this.vipset.logo),
			}
		},
	}
</script>
<style scoped lang="scss">
	.p34 {
		padding: 30rpx 40rpx;
	}

	.wk1 {
		width: 140%;
		margin-left: -20%;
		height: 345rpx;
		border-radius: 0 0 50% 50%;
		overflow: hidden;
	}

	.wk1ic {
		margin: -300rpx 0 42rpx;

		.imgc {
			height: 360rpx;
		}
	}

	.xqc {
		height: 30rpx;
		padding: 0 16rpx;
	}

	.wk2img {
		height: 390rpx;
	}

	.wk2c1 {
		padding: 40rpx;

		.himg {
			width: 90rpx;
			height: 90rpx;
		}
	}

	.rdj {
		padding: 6rpx 16rpx;
		border-radius: 30rpx;
		border-color: #fff;
	}

	/deep/ .icname {
		margin-right: 20rpx;
		color: #333;
	}
</style>
