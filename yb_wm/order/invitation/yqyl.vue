<template>
	<view class="pb130 mh100 invite">
		<uni-nav-bar id='uninavbar' :isleft="true" :uropcity="opcity" :border="opcity>=1" :uriconopcity='iconOpcity'
			:fixed='true' :ispr='false' :statusBar="true" :title="hdInfo.name">
		</uni-nav-bar>
		<view class="hbg posi-a">
			<mg-img :src='`${onImgurl}/yxbg.png`'></mg-img>
		</view>
		<view class="main posi-r f-col f-y-c">
			<block v-if="hdInfo.name">
				<view class="iet1 mb20 f24 jbc cjb f-c">
					<view class="ydl"></view>
					<view class="m01">多邀多得 赏金无上限</view>
					<view class="ydr"></view>
				</view>
				<view class="iet2 jbc2 cjb wei">{{hdInfo.name}}</view>
				<view class="mt10 mb30 f24 jbc cjb f-c">
					活动时间:<text>{{timeToDate(hdInfo.startTime,'yyyy-MM-dd')}}至{{timeToDate(hdInfo.endTime,'yyyy-MM-dd')}}</text>
				</view>
				<!-- 			<view class="iet3 mb30 posi-r">
				<swiper class="lb" vertical="true" autoplay="true" interval='3000'>
					<swiper-item class="f-y-c" v-for="(v,i) in lbarr" :key='i'>
						<view class="f-g-0 imgl bf bsf">
							<mg-img :src='v.portrait'></mg-img>
						</view>
						<view class="f-g-1 t-c t-o-e cf f24">当当 已赚<text class="cf2">{{v.commission}}</text>元</view>
					</swiper-item>
				</swiper>
			</view> -->
				<view class="iet4 posi-r mb30">
					<view class="posi-a t0 wh">
						<mg-img :src='`${onImgurl}/yxhbbg.png`'></mg-img>
					</view>
					<view class="posi-r wh f-col f-y-c">
						<view class="top">
							<view class="yxt1 p3 f30 t-c">邀请新用户你最多能赚</view>
							<view class="posi-r">
								<view class="yxt2 cjb wei f30 t-c">{{nzmoney}}</view>
								<view class="posi-a dw bsf f-c">元</view>
							</view>
						</view>
						<view class="btm">
							<view @click="ljyq(1)" class="ljyq posi-r">
								<view class="wh">
									<mg-img :src='`${onImgurl}/ljyq.png`'></mg-img>
								</view>
								<view class="posi-a t0 wh f-c">
									<view class="tl cjb wei">立即邀请</view>
									<view class="iconfont iconright tr wei"></view>
								</view>
							</view>
							<view @click="ljyq(2)" class="mdmyq f-c mt30 f40">面对面邀请</view>
						</view>
					</view>
				</view>
			</block>
			<view class="w100">
				<view class="iet5 posi-r bf7 mt60">
					<view class="sy bf77 f-row">
						<view @click="go({t:1,url:v.url})" hover-class="bec" v-for="(v,i) in syarr" :key='i'
							class="f-1 t-c f26 b-r-d7">
							<view class="wei cf8 wbba f70">{{v.num}}<text class="f26">{{i!=2?'元':'人'}}</text></view>
							<view class="c6">{{v.name}}</view>
						</view>
					</view>
					<view class="p43 syb">
						<view v-if="ldxConfig.open==1" class="ljtx mla b-l-faf0 cf f-c mb30" @click="tx">提现</view>
						<view v-if="ldxConfig.open==1" class="txjl mla f-c c6 f24" @click="txjl">提现记录<text class="iconfont iconright c6"></text></view>
					</view>
					<view class="posi-a yxbt">
						<mg-img :src='`${onImgurl}/yxbt.png`'></mg-img>
						<view class="posi-a t0 wh f-c f34 wei cf">邀请收益</view>
					</view>
				</view>
				<view class="iet6 posi-r bf7 mt60">
					<view class="jtc f-row bbd">
						<view hover-class="bec" v-for="(v,i) in jtarr" :key='i' class="f-1 f-c-c f26">
							<view class="jtitem b-l-faf0 posi-r" :class="{'last':i==jtarr.length-1}">
								<view class='posi-a udlr img'>
									<mg-img m='widthFix' :src='`${onImgurl}/${v.img}.png`'></mg-img>
								</view>
							</view>
							<view class="c6 mt20">{{v.name}}</view>
						</view>
					</view>
					<view class="posi-a yxbt">
						<mg-img :src='`${onImgurl}/yxbt.png`'></mg-img>
						<view class="posi-a t0 wh f-c f34 wei cf">赚提成</view>
					</view>
					<view class="p3 bbd">
						<view class="f-c">
							<view class="btjbl"></view>
							<view class="m01 yxtt f32 wei f-row">
								第<view class="xh m01 posi-r f26 cf f-c-c nowei">1</view>重：邀新赏金</view>
							<view class="btjbr"></view>
						</view>
						<view class="p23 t-c c6 mb20">已邀请 {{LDXInfo.num||0}} 人，邀请好友越多，赏金越多</view>
						<view class="f-raw">
							<view v-for="(v,i) in hbarr" :key='i' class="hbc f-col f-x-e f-y-c">
								<view v-if="v.state==1" class="ykhb posi-r">
									<image class="posi-a t0 wh" :src='`${onImgurl}/ykhb.png`'></image>
									<view class="posi-r wh f-col f-y-c">
										<view class="ykt1 posi-r">
											<text class="num wei">{{v.money}}</text>
											<view class="posi-a dw bsf f-c">元</view>
										</view>
										<view class="mt20 cfc3 f24">{{v.money}}元/{{v.integral}}积分</view>
										<view class="ykt2 f-c mt15">邀请{{v.people}}人</view>
									</view>
									<block v-if="v.state==1">
										<view class="posi-a dqjd cf f-c">当前进度</view>
										<view class="posi-a xsj"></view>
									</block>
								</view>
								<view v-else class="wkhb posi-r">
									<image class="wh" :src='`${onImgurl}/wkhb.png`'></image>
									<view class="posi-a t0 wh f-col f-y-c">
										<view class="wkt1 posi-r">
											<text class="num wei cfbf">{{v.money}}</text>
											<view class="posi-a dw bsf f-c">元</view>
										</view>
										<view class="wkt2 cfc3 f20">{{v.money}}元/{{v.integral}}积分</view>
										<view class="wkt3 f-c">邀请{{v.people}}人</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 						<view class="f-c mt30">
							<view class="btjbl"></view>
							<view class="m01 yxtt f32 wei f-row">
								第<view class="xh m01 posi-r f26 cf f-c-c nowei">2</view>重：荣耀赏金</view>
							<view class="btjbr"></view>
						</view>
						<view class="t-c c6 mt10">每周财富榜前三名用户奖励加码！</view>
						<view class="t-c c6 mb20">额外再赚200元、100元、50元</view>
						<view class="posi-r f-c-c pt90">
							<view class="flex">
								<view class="top2 f50 wei posi-a">￥100元</view>
								<view class="top1 f60 wei posi-a">￥200元</view>
								<view class="top3 f50 wei posi-a">￥50元</view>
							</view>
							<view class="phb">
								<mg-img :src='`${onImgurl}/ph.png`'></mg-img>
							</view>
						</view> -->
					</view>
					<!-- 				<view class="p3">
						<view class="f-c">
							<view class="btl1"></view>
							<view class="btl1"></view>
							<view class="btl1"></view>
							<view class="m01 yxtt f32 wei f-row">赏金计算方式举例</view>
							<view class="btr1"></view>
							<view class="btr1"></view>
							<view class="btr1"></view>
						</view>
						<view class="t-c c6 mt10 f24">
							小明7月份共邀请50个好友，且在财富榜四周的周榜均排名第一，则小明7月份所得赏金如下：
						</view>
						<view class="jtc f-row bbs">
							<view hover-class="bec" v-for="(v,i) in jsarr" :key='i' class="f-1 f-c-c f26">
								<view class="jtitem2 bf posi-r f-c-c"
									:class="{'last':i==jsarr.length-1,'lastj':i==0,'lastd':i==1}">
									<view class='posi-a udlr img2' :class="{'dw1':i==0}">
										<mg-img m='widthFix' :src='`${onImgurl}/${v.img}.png`'></mg-img>
									</view>
								</view>
								<view class="c6 mt10 cf8 f30 wei">{{v.money}}</view>
								<view class="c6 mt10">{{v.name}}</view>
							</view>
						</view>
						<view class="t-c c6 mt10 f24">相当于邀请一位获得29元赏金</view>
					</view> -->
				</view>
				<view class="iet7 posi-r bf7 mt60">
					<view class="p3 bs10">
						<view class="f-c c6 f24 mt10">共<text class="c83 m01 wei">{{LDXInfo.people||0}}</text>人参加</view>
					</view>
					<view class="p02">
						<view class='posi-r'>
							<view class="navTab o-h">
								<view v-for="(item,index) in tabs" :key="index" class='navTabItem f22 w100'
									:class="{'isAc':index==tabClick}" @click='navClick(index)'>
									<view class="f-c f26">{{item.name}}</view>
									<view class="f-c">{{item.data}}</view>
									<view class="f-c">{{item.text}}</view>
								</view>
							</view>
							<view class="sjx" :style="[{left:tabClick==1?'69%':'24%'}]"></view>
						</view>
						<view class="t-c c6 mt30 f24" v-if="monarr2.length && tabClick==0">有人赚到了{{monarr2[0].money}}元
							相信你也可以！立即邀请吧~</view>
						<view class="mt60 f-row">
							<!-- <view hover-class="bec" v-for="(v,i) in monarr.slice(0 , 3)" :key='i' class="f-1 f-c-c t-c f26 b-r-d7">
								<view class="iconitem posi-r wbba">
									<view class="iconbg posi-a udlr">
										<mg-img m='widthFix' :src='v.portrait' v-if="v.portrait"></mg-img>
										<mg-img m='widthFix' :src='`${onImgurl}/yxtopicon.png`' v-else></mg-img>
									</view>
									<view class='posi-a udlr img3'>
										<mg-img m='widthFix' :src='`${onImgurl}/yxt${i+1}.png`'></mg-img>
									</view>
								</view>
								<view class="c6 mt20 f24">{{v.userTel}}</view>
								<view class="c6" :style="{color:v.color}">已赚{{v.money}}元</view>
							</view> -->
							<view hover-class="bec" class="f-1 f-c-c t-c f26 b-r-d7" v-if="mData3.userName">
								<view class="iconitem posi-r wbba">
									<view class="iconbg posi-a udlr">
										<mg-img m='widthFix' :src='mData3.portrait' v-if="mData3.portrait"></mg-img>
										<mg-img m='widthFix' :src='`${onImgurl}/yxtopicon.png`' v-else></mg-img>
									</view>
									<view class='posi-a udlr img3'>
										<mg-img m='widthFix' :src='`${onImgurl}/yxt3.png`'></mg-img>
									</view>
								</view>
								<view class="c6 mt20 f24">{{mData3.userTel}}</view>
								<view class="c6" :style="{color:'#9C6A59'}">已赚{{mData3.money}}元</view>
							</view>
							<view hover-class="bec" class="f-1 f-c-c t-c f26 b-r-d7" v-if="mData1.userName">
								<view class="iconitem posi-r wbba">
									<view class="iconbg posi-a udlr">
										<mg-img m='widthFix' :src='mData1.portrait' v-if="mData1.portrait"></mg-img>
										<mg-img m='widthFix' :src='`${onImgurl}/yxtopicon.png`' v-else></mg-img>
									</view>
									<view class='posi-a udlr img3'>
										<mg-img m='widthFix' :src='`${onImgurl}/yxt1.png`'></mg-img>
									</view>
								</view>
								<view class="c6 mt20 f24">{{mData1.userTel}}</view>
								<view class="c6" :style="{color:'#DD8F14'}">已赚{{mData1.money}}元</view>
							</view>
							<view hover-class="bec" class="f-1 f-c-c t-c f26 b-r-d7" v-if="mData2.userName">
								<view class="iconitem posi-r wbba">
									<view class="iconbg posi-a udlr">
										<mg-img m='widthFix' :src='mData2.portrait' v-if="mData2.portrait"></mg-img>
										<mg-img m='widthFix' :src='`${onImgurl}/yxtopicon.png`' v-else></mg-img>
									</view>
									<view class='posi-a udlr img3'>
										<mg-img m='widthFix' :src='`${onImgurl}/yxt2.png`'></mg-img>
									</view>
								</view>
								<view class="c6 mt20 f24">{{mData2.userTel}}</view>
								<view class="c6" :style="{color:'#8E9D93'}">已赚{{mData2.money}}元</view>
							</view>
						</view>
						<view class="mt20 pb20" v-if="monarr2 && monarr2.length>3">
							<view class="f-x-bt phitem p03" v-for="(v,i) in monarr2.slice(3)" :key='i'
								v-show="v.portrait">
								<view class="flex">
									<view class="c6 f26 xuhao">{{i+3}}</view>
									<view class="iconitem2 posi-r wbba">
										<view class='iconbg2 posi-a udlr'>
											<mg-img m='widthFix' :src='v.portrait' v-if="v.portrait"></mg-img>
											<mg-img m='widthFix' :src='`${onImgurl}/yxuser.png`' v-else></mg-img>
										</view>
									</view>
									<view class="c6 mt20 f24">{{v.userTel}}</view>
								</view>
								<view class="cff38 f30 wei">{{v.money}}<text class="c6 f26 nowei ml10">元</text></view>
							</view>
						</view>
					</view>
					<view class="posi-a yxbt">
						<mg-img :src='`${onImgurl}/yxbt.png`'></mg-img>
						<view class="posi-a t0 wh f-c f34 wei cf">财富榜</view>
					</view>
				</view>
				<!-- <view class="iet8 posi-r bf7 mt60">
					<view class="p3 bs10">
						<view class="c6 f24 mt10"><text class="c83 m01 wei">万能花：</text>兑换现金券</view>
						<view class="c6 f24 mt10">在小程序上使用银行卡支付任意订单时直接抵扣</view>
					</view>
					<view class="posi-a yxbt">
						<mg-img :src='`${onImgurl}/yxbt.png`'></mg-img>
						<view class="posi-a t0 wh f-c f34 wei cf">赏金如何花</view>
					</view>
				</view> -->
			</view>
			<view class="foot-btnc cf f30 f-c bf">
				<button @click="ljyq(1)" class="foot-btn f36 b-l-faf0 yqhy" hover-class="btnhc">邀请好友赚赏金</button>
			</view>
		</view>
		<view v-if="hdInfo.name" @click="hdgz" class="fixr">规则</view>
		<view v-if="hdInfo.name" @click="shareshow=true" class="fixr" style="top: 265rpx;">分享</view>
		<mg-modal :ismr="true" v-model="mdmshow" width="55%" :z-index="2002">
			<view class="bf p3 bs10 f-c-c">
				<image @click="util.preImg({idx: 0,urls: [mdmimg]})" class="mdmimg" :src="mdmimg"></image>
				<view class="mt20">邀请好友扫码</view>
			</view>
			<view @click="mdmshow=false" class="mt30 f-c"><text class="iconfont iconcuo cf"
					style="font-size: 80rpx;"></text></view>
		</mg-modal>
		<mg-share wxs='1' v-model="shareshow"></mg-share>
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
	import load from '@/components/common/load.vue'
	export default {
		name: 'order-index',
		components: {
			uniNavBar,
			MgImg,
			MgCell,
			mgModal,
			mgShare,
			load,
		},
		data() {
			return {
				showLoading: true,
				opcity: 0,
				iconOpcity: 0.5,
				hdInfo: {},
				params: {
					userId: '',
					name: '',
					tel: '',
				},
				LDXInfo: {},
				loading: false,
				lbarr: [1, 2, 3],
				// title: '邀好友 得现金',
				syarr: [{
					num: 0,
					url: '',
					name: '在路上收益',
				}, {
					num: 0,
					url: '',
					name: '累计收益',
				}, {
					num: 0,
					url: 'yx-wdfs',
					name: '成功邀请',
				}, ],
				jtarr: [{
					img: 'yq',
					name: '邀请新人好友',
				}, {
					img: 'hb',
					name: '好友领红包',
				}, {
					img: 'gwc',
					name: '好友7日内消费',
				}, ],
				hbarr: [],
				mData3: {},
				mData2: {},
				mData1: {},
				jsarr: [{
					img: 'yxsj',
					name: '邀新赏金',
					money: '650元',
				}, {
					img: 'yxhg',
					name: '荣耀赏金',
					money: '800元',
				}, {
					img: 'yxjb',
					name: '总计',
					money: '1450元',
				}, ],
				tabs: [{
						name: '本周榜单',
						data: '',
						text: '本周一至今日排名',
					},
					{
						name: '上周榜单',
						data: '',
						text: '查看上周邀新先锋',
					}
				],
				monarr: [],
				monarr2: [],
				tabClick: '0',
				fxshow: false,
				shareshow: false,
				mdmshow: false,
				mdmimg: '',
			}
		},
		async onLoad(options) {
			this.getLoginInfo().then(async () => {
				this.params.userId = this.uId
				this.showLoading = false
				this.getSy()
			})
			this.getLdxConfig('oldWithNewWithdrawalSet')
			this.getOwnrank()
		},
		mixins: [utilMixins],
		computed: {
			...mapState('dndc', ['ldxConfig', 'mySwitch']),
			nzmoney() {
				let h = this.LDXInfo.rewardArr
				if (h && h.length) {
					const sum = h.reduce(
					  (a, c) => a + Number(c.money),
					  0
					)
					 return h.length > 1 ? sum : `${h[0].money}`
					// return h.length > 1 ? `${h[0].money}-${h[h.length-1].money}` : `${h[0].money}`
				}
			},
		},
		methods: {
			...mapActions('dndc', ['getLdxConfig', 'getSwitchConfig']),
			navClick(index) {
				this.tabClick = index
				this.getOwnrank(index)
			},
			async tx(){
				if (!await this.checkLogin()) return
				this.go({t:1,url:'tx?t=1'})
			},
			async txjl(){
				if (!await this.checkLogin()) return
				this.go({t:1,url:'txmx?t=1'})
			},
			hdgz() {
				uni.setStorageSync('fwb', this.hdInfo.shareRule)
				this.go({
					t: 1,
					url: `/yb_wm/my/other/gywm?t=${this.hdInfo.name}&p=6`
				})
			},
			async ljyq(type) {
				if (!await this.checkLogin()) return
				if (type == 1) {
					this.shareshow = true
				} else {
					this.mdmshow = true
				}
			},
			async getSy() {
				let {
					data
				} = await this.util.request({
					'url': this.api.owni,
				})
				if (data) {
					this.LDXInfo = data
					this.hdInfo = data.actinfo || {}
					this.hbarr = data.rewardArr || []
					this.syarr[0].num = +data.waitMoney
					this.syarr[1].num = +data.money
					this.syarr[2].num = +data.num
					this.util.request({
						'url': this.api.xcxm,
						data: {
							page: 'yb_wm/index/index',
							ident: 'oldWithNew',
							scene: this.uId + ',1',
						},
					}).then(res => {
						this.mdmimg = res.data
					})
				}
			},
			async getOwnrank(type) {
				let {
					data
				} = await this.util.request({
					'url': this.api.ownrank,
					data: {
						type: type ? +type + 1 : '1'
					},
				})
				if (data) {
					this.tabs[0].data = data.weekStart + '-' + data.weekEnd
					this.tabs[1].data = data.lastWeekStart + '-' + data.lastWeekEnd
					this.mData1 = data.rank.length && data.rank[0]
					this.mData2 = data.rank.length > 1 && data.rank[1]
					this.mData3 = data.rank.length > 2 && data.rank[2]
					this.monarr2 = data.rank
				}
			},
		},
		onPageScroll(e) {
			if (this.opcity >= 1 && e.scrollTop / 64 >= 1) {
				return;
			}
			let o = e.scrollTop / 64
			this.opcity = o;
		},
		onShareAppMessage() {
			this.shareshow = false
			let p = `yb_wm/index/index?scene=${this.uId}`+',1'
			return this.util.mpShare({
				t: this.hdInfo.shareTitle,
				i: this.hdInfo.shareIcon && this.getSingleImg(this.hdInfo.shareIcon),
				p,
			})
		},
	}
</script>
<style scoped lang="scss">
	.invite {
		background: #FFBE63;
	}

	.main {
		padding: 70rpx 40rpx;
	}

	.hbg {
		width: 100%;
		height: 780rpx;
	}

	.jbc {
		background: linear-gradient(to bottom, #feeeeb, #fed783);
	}

	.jbc2 {
		background: linear-gradient(to bottom, #FEFFEF, #FFEB73);
	}

	.cjb {
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
	}

	.iet1 {
		margin-top: 50rpx;
		letter-spacing: 10rpx;

		.ydl {
			width: 30rpx;
			height: 5rpx;
			background: linear-gradient(to left, #FCB689, #F97754);
		}

		.ydr {
			width: 30rpx;
			height: 5rpx;
			background: linear-gradient(to left, #F97754, #FCB689);
		}
	}

	.iet2 {
		font-size: 60rpx;
	}

	.iet3 {
		width: 435rpx;
		height: 60rpx;
		background: #F83C3A;
		border-radius: 25rpx;
		// padding: 0 50rpx;

		.imgl {
			top: -2rpx;
			left: -10rpx;
			width: 54rpx;
			height: 54rpx;
		}

		.lb {
			height: 100%;
		}
	}

	.cf2 {
		color: #FEDA02;
	}

	.iet4 {
		width: 624rpx;
		height: 859rpx;

		.top {
			height: 493rpx;
		}

		.yxt1 {
			color: #E75A2D;
		}

		.yxt2 {
			height: 150rpx;
			line-height: 150rpx;
			font-size: 140rpx;
			background: linear-gradient(to bottom, #fd684a, #f50100);
		}

		.dw {
			width: 55rpx;
			height: 55rpx;
			border: 1px solid #FEE0BD;
			color: #FEE0BD;
			background: linear-gradient(to bottom, #f68c54, #f34d26);
			bottom: 10rpx;
			right: -35rpx;
		}

		.btm {}

		.ljyq {
			width: 454rpx;
			height: 111rpx;
		}

		.tl {
			background: linear-gradient(to bottom, #e51b07, #b10000);
			font-size: 50rpx;
			margin-right: 10rpx;
		}

		.tr {
			font-size: 50rpx;
			color: #DE1514;
		}

		.cjb {
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			color: transparent;
		}

		.mdmyq {
			width: 454rpx;
			height: 96rpx;
			color: #FFD88A;
			border: 2px solid #FDB571;
			border-radius: 96rpx;
		}
	}

	.yxbt {
		width: 371rpx;
		height: 60rpx;
		top: -38rpx;
		left: 50%;
		transform: translateX(-50%);

	}

	.mt60 {
		margin-top: 80rpx;
	}

	.bf77 {
		background: #F7EEE7;
	}

	.bf7 {
		background: #F7EEE7;
		border-radius: 10rpx;
	}

	.cf8 {
		color: #F90337;
		font-family: Arial;
	}

	.f70 {
		font-size: 70rpx;
	}

	.p43 {
		padding: 40rpx 30rpx;
	}

	.iet5 {
		.sy {
			padding: 60rpx 0 20rpx;
			border-radius: 10rpx 10rpx 0 0;
		}

		.syb {
			border-radius: 0 0 10rpx 10rpx;
			background: #FFFFF7;
		}

		.b-r-d7 {
			border-right: 1rpx solid #F0DDD7;
		}

		// .b-r-d :after {
		// 	background: #F0DDD7;
		// }

		.ljtx {
			width: 280rpx;
			height: 62rpx;
			border-radius: 62rpx;
		}

		.txjl {
			width: 200rpx;
			height: 46rpx;
			border-radius: 46rpx;
			border: 1px solid #8E8C87;
		}
	}

	.b-l-faf0 {
		background: linear-gradient(to bottom, #ff6a6a, #f51e30);
	}

	.iet6 {
		background: #FFFFF7;

		.jtc {
			padding: 60rpx 0 20rpx;
		}

		.bbd {
			border-bottom: 1rpx dashed #D0D7E1;
		}

		.bbs {
			border-bottom: 1rpx solid #AEAEA7;
		}

		.jtitem {
			width: 98rpx;
			height: 98rpx;
			border-radius: 50%;

			&:after {
				content: '';
				position: absolute;
				z-index: 1;
				width: 128rpx;
				height: 6rpx;
				background: #FF696B;
				top: 50%;
				left: 98rpx;
				transform: translateY(-50%);
			}

			&:before {
				content: '';
				position: absolute;
				z-index: 2;
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background: #FF3C3A;
				top: 50%;
				left: 160rpx;
				transform: translateY(-50%);
			}
		}

		.jtitem2 {
			width: 98rpx;
			height: 98rpx;

		}

		.lastj {
			&:after {
				content: '+';
				position: absolute;
				z-index: 1;
				top: 50%;
				left: 135rpx;
				transform: translateY(-50%);
				font-size: 44rpx;
				color: #F90337;
				font-weight: bold;
				font-family: Arial;
			}
		}

		.lastd {
			&:after {
				content: '=';
				position: absolute;
				z-index: 1;
				top: 50%;
				left: 135rpx;
				transform: translateY(-50%);
				font-size: 44rpx;
				color: #F90337;
				font-weight: bold;
				font-family: Arial;
			}
		}

		.last:after {
			display: none;
		}

		.last:before {
			display: none;
		}

		.img {
			width: 50rpx;
			height: 45rpx;
		}

		.img2 {
			width: 100rpx;
			height: 55rpx;
		}

		.img3 {
			width: 180rpx;
			height: 180rpx;
		}

		.dw1 {
			top: -40rpx;
		}


		.yxtt {
			color: #FF302A;

			.xh {
				width: 38rpx;
				height: 38rpx;
				border-radius: 50%;
				background: #FB312A;
				top: 8rpx;
			}
		}

		.btjbl {
			width: 85rpx;
			height: 5rpx;
			background: linear-gradient(to right, #fff, #FC5249);
		}

		.btjbr {
			width: 85rpx;
			height: 5rpx;
			background: linear-gradient(to left, #fff, #FC5249);
		}

		.btl1 {
			width: 15rpx;
			height: 5rpx;
			transform: rotate(-60deg);
			background: linear-gradient(to right, #fff, #FC5249);
		}

		.btr1 {
			width: 15rpx;
			height: 5rpx;
			transform: rotate(120deg);
			background: linear-gradient(to right, #fff, #FC5249);
		}

		.hbc {
			width: 33.33%;
			height: 257rpx;
		}

		.wkhb {
			width: 140rpx;
			height: 187rpx;

			.wkt1 {
				margin-top: 0rpx;

				.num {
					font-size: 54rpx;
				}

				.dw {
					width: 22rpx;
					height: 22rpx;
					font-size: 11rpx;
					border: 1px solid #E27331;
					color: #FF4932;
					background: #FFDCC6;
					top: 20rpx;
					right: -10rpx;
				}
			}

			.wkt2 {
				margin-top: 28rpx;
			}

			.wkt3 {
				margin-top: 10rpx;
				width: 107rpx;
				height: 26rpx;
				border-radius: 26rpx;
				background: #FEEBDD;
				color: #F33E2F;
				font-size: 17rpx;
				letter-spacing: 3rpx;
			}
		}

		.ykhb {
			width: 159rpx;
			height: 222rpx;

			.dqjd {
				top: -23rpx;
				left: 50%;
				transform: translateX(-50%);
				background: #F73422;
				font-size: 20rpx;
				border-radius: 10rpx;
				width: 108rpx;
				height: 37rpx;
			}

			.xsj {
				top: 12rpx;
				left: 35%;
				transform: translateX(-40%);
				width: 0;
				height: 0;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-top: 10rpx solid #F73422;
			}

			.ykt1 {
				margin-top: 10rpx;

				.num {
					font-size: 64rpx;
					background: linear-gradient(to bottom, #ff5a31, #f23d2f);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					color: transparent;
				}

				.dw {
					width: 22rpx;
					height: 22rpx;
					font-size: 11rpx;
					border: 1px solid #FFB44B;
					color: #FEE0BD;
					background: linear-gradient(to bottom, #f68c54, #f34d26);
					top: 30rpx;
					right: -10rpx;
				}
			}

			.ykt2 {
				width: 124rpx;
				height: 26rpx;
				border-radius: 26rpx;
				background: #FEEBDD;
				color: #F33E2F;
				font-size: 19rpx;
				letter-spacing: 4rpx;
			}
		}

		.top1,
		.top2,
		.top3 {
			font-family: Arial;
			letter-spacing: -2rpx;
		}

		.top1 {
			color: #FF3417;
			top: 21rpx;
			left: 192rpx;
		}

		.top2 {
			color: #FF7A45;
			top: 100rpx;
			left: 40rpx;
		}

		.top3 {
			color: #FF9631;
			top: 123rpx;
			left: 397rpx;
		}
	}

	.iet7 {
		background: #FFFFF7;

		.c83 {
			color: #C81633;
		}

		.navTab {
			display: flex;
			width: 100%;
			height: 106rpx;
			position: relative;
			border: 1rpx solid #802E18;
			border-radius: 56rpx;

			.navTabItem {
				color: #B2150B;
				line-height: 34rpx;
			}

			.isAc {
				color: #fff;
				background: linear-gradient(to bottom, #ff6a6a, #f51e30);
			}
		}

		.sjx {
			content: '';
			position: absolute;
			z-index: 10;
			top: 101%;
			left: 24%;
			width: 0;
			height: 0;
			border-left: 20rpx solid transparent;
			border-right: 20rpx solid transparent;
			border-top: 20rpx solid #FF1126;
		}

		.iconitem {
			width: 180rpx;
			height: 180rpx;

			.iconbg {
				width: 130rpx;
				height: 130rpx;
				background: #E7F3FF;
				border-radius: 50%;
				top: -16rpx;
			}
		}

		.iconitem2 {
			width: 80rpx;
			height: 80rpx;

			.iconbg2 {
				width: 50rpx;
				height: 50rpx;
				background: #E7F3FF;
				border-radius: 50%;
			}
		}

		.phitem {
			border-top: 1rpx solid #B4B4AC;
			height: 90rpx;
			line-height: 90rpx;
		}

		.xuhao {
			width: 50rpx;
		}
	}

	.iet8 {
		background: #FFFFF7;
	}

	.yqhy {
		width: 500rpx;
		height: 100rpx;
		line-height: 100rpx;
	}

	.cfbf {
		color: #FFD7BF;
	}

	.cfc3 {
		color: #FFEBC3;
	}

	.cf35 {
		color: #F50735;
	}

	.cff38 {
		color: #FF0038;
	}

	.fixr {
		position: fixed;
		z-index: 99;
		right: 0;
		top: 200rpx;
		color: #FF4651;
		font-size: 22rpx;
		padding: 5rpx 25rpx;
		border-radius: 30rpx 0 0 30rpx;
		background: rgba($color: #fff, $alpha: 0.65)();
	}

	.mdmimg {
		width: 360rpx;
		height: 360rpx;
	}

	.phb {
		width: 524rpx;
		height: 240rpx;
	}
</style>
