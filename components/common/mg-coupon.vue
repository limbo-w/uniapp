<template>
	<view v-if="ptype==1" @click="goTo" class='posi-r cou1 o-h bf c6 f22' :class="[cname]"
		:style="{background:iswdq?'linear-gradient(90deg, #FFF7E4 40%, #FCDBB2 100%)':'',color:iswdq?'#75481C':''}">
		<view class="cout f-row">
			<view class="f-g-0 coutl f-c-c mr30">
				<view class="wei cf5" :style="{color:iswdq?'#75481C':''}">
					<block v-if="co.type==1">
						<text>{{sl}}</text><text class="f48 ml5">{{Number(co.money)}}</text>
					</block>
					<block v-else-if="co.type==2">
						<text class="f48">{{Number(co.discount)}}</text><text class="ml5">折</text>
					</block>
				</view>
				<view class="">{{fullName}}</view>
			</view>
			<view class="f-g-1 f-y-ad">
				<view class="wei f30 t-o-e c3" :style="{color:iswdq?'#75481C':''}">{{ttype==2?co.couponName:co.name}}
				</view>
				<!-- <view class="mt20 w70 t-o-e">{{useTypeName(co.activityType)}}</view> -->
				<view class="f-x-bt">
					<view class="t-o-e">{{co.useExplain}}</view>
				</view>
			</view>
		</view>
		<view class="p2 coub c9" @click.stop="active=!active"
			:style="{background:iswdq?'transparent':'',color:iswdq?'#AE884B':''}">
			<view class="f-y-c coubt" :class="{'active':active}">
				<view class="f-g-1 f-y-c mr10">
					<view class="t-o-e">{{co.explain}}</view>
					<text class="iconfont icondown ml10 coubjt f24" :class="{'jtactive':active}"
						:style="{color:iswdq?'#AE884B':''}"></text>
				</view>
				<button @click.stop="btnClick" :disabled="disabled" class="coubtn f-c f22 clearbtn"
					:style="{background:iswdq?'linear-gradient(90deg, #FBDC9D, #FEB94A)':typeName.c,color:iswdq?'#6F3E07':''}">{{typeName.t}}</button>
			</view>
			<view class="coubb o-h" :class="{'cactive':active}">
				<view class="coubbv pt20" :class="{'show':active}">
					<mg-rtext type='2' :content="co.details||co.couponDetails" />
				</view>
			</view>
		</view>
		<!-- <image v-if="co.ylq" class="p-a ylq" src="/static/yhq/lyq.png"></image> -->
		<!-- <view v-if="co.type==2" class="posi-a counew cf t-c">新</view> -->
		<view class="p-a couqlx cf t-c"
			:style="{background:iswdq?'linear-gradient(-45deg, #FBDC9D, #FEB94A)':'',color:iswdq?'#6F3E07':''}">
			{{qlx}}
		</view>
	</view>
	<view @click="goTo" v-else-if="ptype==2" class="posi-r cou1 o-h bf c6 f22 cou2" :class="[cname]">
		<view class="bf cout f-row">
			<view class="f-g-0 coutl f-c-c mr30">
				<view class="wei cf5">
					<block v-if="co.type==1">
						<text>{{sl}}</text><text class="f48 ml5">{{Number(co.money)}}</text>
					</block>
					<block v-else-if="co.type==2">
						<text class="f48">{{Number(co.discount)}}</text><text class="ml5">折</text>
					</block>
				</view>
				<view class="t-o-e">{{fullName}}</view>
			</view>
			<view class="f-g-1 f-y-ad">
				<view class="wei f30 t-o-e c3">{{co.name||co.couponName}}</view>
				<view class="f-x-bt">
					<view class="t-o-e">{{co.useExplain}}</view>
				</view>
			</view>
		</view>
	</view>
	<view @click="goTo" v-else-if="ptype==3" class="posi-r f-row cou3 b-d f20" style="background: #fff;"
		:class="[cname]">
		<view class="posi-r p20 f-g-0 cou2l f-c-c">
			<view class="wei cf5"><text>{{sl}}</text><text class="f48 ml5">{{Number(co.money)}}</text></view>
			<view class="mt10">{{fullName}}</view>
			<view class="dot1 b-d bf"></view>
			<view class="dot2 b-d bf"></view>
		</view>
		<view class="p23 f-g-1 f-row">
			<view class="f-g-1 f-y-bt">
				<view class="wei f30 t-o-e">{{co.name}}</view>
				<view class="mt20 t-o-e">{{useTypeName(co.activityType)}}</view>
			</view>
			<button @click.stop="btnClick" :disabled="disabled" class="f-g-0  bs10 cou3br f-c cf clearbtn"
				:style="{background: typeName.c}">
				{{typeName.t}}
			</button>
		</view>
	</view>
	<view v-else-if="ptype==4" @click="co.isUse!=1?$emit('change',co.id):goTo()" class='posi-r bf bs20 c6 f22'
		:class="[cname,{'ce5':co.isUse==2}]">
		<view class="bf cout f-row">
			<view class="f-g-0 coutl f-c-c mr30">
				<view class="wei cf5" :class="{'ce5':co.isUse==2}">
					<block v-if="co.type==1">
						<text>{{sl}}</text><text class="f48 ml5">{{Number(co.money)}}</text>
					</block>
					<block v-else-if="co.type==2">
						<text class="f48">{{Number(co.discount)}}</text><text class="ml5">折</text>
					</block>
				</view>
				<view class="">{{fullName}}</view>
			</view>
			<view class="f-g-1 f-y-ad">
				<view class="wei f30 t-o-e c3" :class="{'ce5':co.isUse==2}">{{co.couponName}}</view>
				<view class="f-x-bt">
					<view class="t-o-e">{{co.useExplain}}</view>
				</view>
			</view>
			<view class="f-c">
				<radio v-if="co.isUse!=1" color="#07C160" :checked="co.checked" />
			</view>
		</view>
		<view class="bfc p2 coub c9">
			<view class="f-y-c coubt">
				<view class="t-o-e">{{co.explain}}</view>
			</view>
		</view>
		<view class="p-a couqlx cf t-c">{{qlx}}</view>
	</view>
	<view v-else-if="ptype==5" class="cou5 p253 p-r bf bs20 f24 f-y-c mb20" :class="[cname]">
		<view class="cou5l mr20 p-r">
			<mg-img src='/static/yhq/sjyhq.png'></mg-img>
			<view class="p-a t0 wh f-c-c cf lh1">
				<view class="">
					<block v-if="co.type==1 || co.type==3">
						<text>{{sl}}</text><text class="f50 ml5">{{Number(co.money)}}</text>
					</block>
					<block v-else-if="co.type==2">
						<text class="f50">{{Number(co.discount)}}</text><text class="ml5">折</text>
					</block>
				</view>
			</view>
		</view>
		<view class="f-1 f-c-xc mr20">
			<view class="f30 c0 t-o-e">{{co.name}}</view>
			<view class="c6 mt10">{{fullName}}，{{co.useExplain}}</view>
		</view>
		<view class="f-c-c cou5r">
			<button @click="btnClick" v-if="!co.islq" class="cf cou5lq bs15 f-c clearbtn" :disabled="disabled">领
				取</button>
			<image v-else class="p-a cou5ylq" src="/static/yhq/lyq.png"></image>
		</view>
	</view>
	<view @click="goTo" v-else-if="ptype==6" class="posi-r f-row cou3 b-d f20" :class="[cname]">
		<view class="posi-r p20 f-g-0 cou2l f-c-c">
			<view class="wei cf5"><text>{{sl}}</text><text class="f48 ml5">{{Number(co.money)}}</text></view>
			<view class="mt10">{{fullName}}</view>
			<view class="dot1 b-d bf"></view>
			<view class="dot2 b-d bf"></view>
		</view>
		<view class="p23 f-g-1 f-row">
			<view class="f-g-1 f-y-bt">
				<view class="wei f30 t-o-e">{{co.name}}</view>
				<view class="mt20 t-o-e">{{useTypeName(co.activityType)}}</view>
			</view>
			<view class="f-y-c f-g-0 ml30 ">
				<button :disabled="disabled" class="bs10 f-c cf clearbtn cou6 f24" :style="{background: typeName.c}">
					{{typeName.t}}
				</button>
			</view>
		</view>
	</view>
	<view v-else-if="ptype==7" gttype='1' class='posi-r bf bs20 c6 f22' :class="[cname]">
		<view class="bf cout">
			<view class="f-bt f-y-c lh1">
				<view class="cef"><text class="f36 ml5">{{co.name}}</text></view>
				<view class="wei f66 cef"><text class="f34">￥</text>{{co.money}}</view>
			</view>
			<view class="f-bt f28 c6">
				<view>{{co.endAt}}后过期</view>
				<view>{{fullName}}</view>
			</view>
		</view>
		<view class="bfc p3 coub c9 gfbg" @click.stop="active=!active">
			<view class="f-y-c coubt" :class="{'active':active}">
				<view class="f-g-1 t-o-e cb">{{`${fullName},${useTypeName(co.activityType)},${sycjName}`}}</view>
				<text class="iconfont icondown ml10 coubjt" :class="{'jtactive':active}"></text>
				<!-- <view class="f-g-0">
					<button class="gfbtn f-c f26 clearbtn bef ml20">去使用</button>
				</view> -->
			</view>
			<view class="coubb o-h" :class="{'cactive':active}">
				<view class="coubbv pt20" :class="{'show':active}">
					<mg-rtext v-if="co.introduce" type='2' :content="co.introduce" />
				</view>
			</view>
		</view>
	</view>
	<view @click="goTo" v-else-if="ptype==8" class="cou5 cou8 p253 p-r bf bs20 f24 f-y-c mb20" :class="[cname]">
		<view class="cou5l mr20 p-r">
			<mg-img src='/static/yhq/qb.png'></mg-img>
			<view class="p-a t0 wh f-c-c cf lh1">
				<view class=""><text>{{sl}}</text><text class="f50 ml5 mr10">{{Number(co.money)}}</text></view>
				<view class="f22 mt5">代金券</view>
			</view>
		</view>
		<view class="cou8m f-1 f-c-xc">
			<view class="f-y-c">
				<view class="cou8zs bs10 f20 mr20">{{co.couponNum}}张</view>
				<view class="c0 f30 f-1 t-o-e">{{co.name}}</view>
			</view>
			<view class="c9 mt10 f22">
				<text class="cqb f24">{{sl}}</text>
				<text class="cqb f32">{{Number(co.money)}}</text>
				<text class="t-d-l">{{sl+Number(co.price)}}</text>
				<text class="qbzkc ml10">{{Number((co.money/co.price*10).toFixed(1))}}折</text>
			</view>
		</view>
		<view class="f-c-c cou5r">
			<button v-if="!co.islq" class="cf cou5lq bs15 f-c clearbtn" :disabled="disabled">去抢购</button>
			<image v-else class="p-a cou5ylq" src="/static/yhq/lyq.png"></image>
		</view>
	</view>
	<view v-else-if="ptype==9" @click="go({url: '/yb_o2o/order/coupon-bag/qbxq?id='+co.id})"
		class='p-r bs20 c6 f24 cou9' :class="[cname]">
		<view class="qbyhq p-a">
			<image class="wh" src="/static/yhq/qbyhq.png"></image>
		</view>
		<view class="p-r cou9bd">
			<view class="cout f-y-c">
				<view class="f-g-0 cou9tl mr30 bs10">
					<mg-img :src="co.icon" />
				</view>
				<view class="f-1 f-y-bt">
					<view class="wei f30 t-o-e2 c3">{{co.name}}</view>
					<view class="">
						<text class="t-o-e cff0">{{sl}}<text class="f36 wei">{{co.money}}</text></text>
						<text class="t-o-e ml10 t-d-l cb">{{`${sl}${co.originalPrice}`}}</text>
					</view>
				</view>
				<view class="ml30 f-c-c">
					<view class="qqg cf f26 f-c" :style="{background:qbbl<1?'':'#ddd'}">{{qbbl<1?'抢购':'已抢完'}}</view>
					<view class="f-y-c mt20">
						<view class="jdt p-r o-h">
							<view :style="{width:qbbl*100+'%',background:qbbl<1?'':'#ddd'}" class="h100 p-a t0 jd">
							</view>
						</view>
						<view class="cff0 ml10" :style="{color:qbbl<1?'':'#ddd'}">{{parseInt((1-qbbl)*100)}}%</view>
					</view>
				</view>
			</view>
			<view class="p3 bf cou9b" @click.stop="active=!active">
				<view class="f-y-c coubt" :class="{'active':active}">
					<view class="dpimg bsf mr15">
						<mg-img :src="co.logo" />
					</view>
					<view class="f-1 t-o-e">{{co.storeName}}</view>
					<text>使用规则</text>
					<text class="iconfont icondown ml10 coubjt" :class="{'jtactive':active}"></text>
				</view>
				<view class="coubb o-h" :class="{'cactive':active}">
					<view class="coubbv pt20" :class="{'show':active}">
						<mg-rtext v-if="co.notice" type='2' :content="co.notice" />
					</view>
				</view>
			</view>
		</view>
	</view>
	<view v-else-if="ptype==10" @click="goTo" class='p-r bf bs20 c6 f22 cou10' :class="[cname]">
		<view class="bf cout f-y-c">
			<view class="f-g-0 coutl f-c-c mr30">
				<view class="wei cf5"><text>{{sl}}</text><text class="f48 ml5">{{Number(co.money)}}</text></view>
				<view class="mt20">{{fullName}}</view>
			</view>
			<view class="f-g-1 f-y-bt">
				<view class="wei f30 t-o-e c3">{{co.name}}</view>
				<view class="mt20 w70 t-o-e">{{useTypeName(co.activityType)}}</view>
				<view class="t-o-e">{{dateText}}</view>
			</view>
			<text class="iconfont iconright ml10 c3"></text>
		</view>
		<view class="bfc p23 coub c9" @click.stop="active=!active">
			<view class="f-y-c coubt" :class="{'active':active}">
				<view class="f-g-1 t-o-e">{{`${fullName},${useTypeName(co.activityType)},${sycjName}`}}</view>
				<text class="iconfont icondown ml10 coubjt" :class="{'jtactive':active}"></text>
			</view>
			<view class="coubb o-h" :class="{'cactive':active}">
				<view class="coubbv pt20" :class="{'show':active}">
					<mg-rtext v-if="co.introduce" type='2' :content="co.introduce" />
				</view>
			</view>
		</view>
		<view class="p-a ybk"></view>
		<view class="p-a num cf t-c">x{{co.number}} 张</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import mgRtext from '@/components/common/functionCmp/rich-text.vue'
	export default {
		name: 'searchBox',
		components: {
			mgRtext,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			gttype: { //瓜分红包
				type: String,
				default: ''
			},
			ptype: { //样式类型 1领券中心,我的券2新人专享券发券宝券3优惠券组件4下单使用券5点单页券6vip券7瓜分红包8点单页券包9券包10券包详情
				type: String,
				default: '1'
			},
			ttype: { //文字类型 1领券中心2我的券
				type: String,
				default: '1'
			},
			cname: {
				type: String,
				default: ''
			},
			u: {
				type: String,
				default: 'px'
			},
			color: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				active: false,
				disabled: false,
			}
		},
		mixins: [utilMixins],
		computed: {
			typeName() {
				let t, c = ''
				switch (this.ptype) {
					case '1':
						if (this.ttype == 1) {
							t = '领 取'
							c = 'linear-gradient(90deg, #ff3a48, #ff3a48)'
						} else {
							t = this.co.useState == 1 ? '去使用' : this.co.useState == 2 ? '已使用' : '已失效'
							c = this.co.useState == 1 ? 'linear-gradient(90deg, #ff3a48, #ff3a48)' : '' //让btnClick方法判断不可点击
						}
						break;
					default:
						break;
				}
				return {
					t,
					c
				}
				// if (this.gttype != 1) {
				// 	let t, c = ''
				// 	if (this.ttype == 1) {
				// 		if (this.co.isReceive != 1) {
				// 			t = '立即领取'
				// 			if (this.ptype != 6) {
				// 				c = this.ptype == 3 ? '#ff3a48' : '#ff3a48'
				// 			} else {
				// 				c = '#EAC28F'
				// 			}
				// 		} else {
				// 			t = '已领取'
				// 			c = 'linear-gradient(90deg, #EF7227, #EA5362)'
				// 			if (this.ptype == 6) {
				// 				t = '立即查看'
				// 				c = '#ff3a48' || this.color
				// 			}
				// 		}
				// 	} else {
				// 		if (this.co.state == 1) {
				// 			t = '去使用'
				// 			c = 'linear-gradient(90deg, #EF7227, #EA5362)'
				// 		} else if (this.co.state == 2) {
				// 			t = '已使用'
				// 		} else if (this.co.state == 3) {
				// 			t = '已失效'
				// 		}
				// 	}
				// 	return {
				// 		t,
				// 		c
				// 	}
				// }
			},
			fullName() {
				return this.co.fullMoney > 0 ? `满${Number(this.co.fullMoney)+this.dw}可用` : '无门槛'
			},
			qbbl() {
				return this.co.saleNum / this.co.totalNum >= 1 ? 1 : this.co.saleNum / this.co.totalNum
			},
			qlx() {
				if(this.co.type == 1){
					return '代'
				}else if(this.co.type == 2){
					return '折'
				}else if(this.co.type == 3){
					return '兑'
				}
				// return this.co.type == 1 ? this.co.type == 2 ? '代' : '折' : '兑'
			},
			iswdq() {
				return this.ttype == 2 && this.co.receiveType == 13
			},
		},
		methods: {
			useTypeName(t) {
				let n
				switch (+t) {
					case 1:
						n = '全门店通用'
						break;
					case 2:
						n = '指定商户可用'
						break;
					case 6:
						n = '指定商户可用'
						break;
					case 7:
						n = '指定商品可用'
						break;
					case 8:
						n = '指定分类可用'
						break;
					default:
						break;
				}
				return n
			},
			goTo() {
				let url = '/yb_wm/my/coupon/coupon-dl?id=' + (this.co.couponId ? this.co.couponId : this.co.id)
				if (this.ptype == 1 && this.ttype == 2 || this.ptype == 4) {
					url = '/yb_wm/my/coupon/coupon-dl?islq=1&receiveId=' + this.co.id
				} else if (this.ptype == 8) {
					url = '/yb_wm/order/coupon-bag/qbxq?id=' + this.co.id
				}
				this.go({
					t: 1,
					url,
				})
			},
			btnClick() {
				if (this.typeName.c || this.ptype == 5) {
					if (this.ptype == 1 && this.ttype == 1 || this.ptype == 5) {
						// console.log(this.co)
						this.disabled = true
						setTimeout(() => {
							this.disabled = false
						}, 1000)
					}
					this.$emit('btntap')
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.bf8 {
		background: #ff3a48;
	}

	.cf5 {
		color: #ff3a48;
	}

	.cou1 {
		border-radius: 20rpx;
	}

	.cout {
		position: relative;
		padding: 30rpx 20rpx;
	}

	.coutl {
		min-width: 150rpx;
		// height: 150rpx;
	}

	.coub {
		position: relative;
		background: #fff;

		&::after {
			content: '';
			position: absolute;
			border-top: 1px dashed #EBEBED;
			top: 0;
			right: 25rpx;
			left: 25rpx;
		}
	}

	// .coub:before {
	// 	content: "";
	// 	position: absolute;
	// 	left: -20rpx;
	// 	top: -20rpx;
	// 	width: 40rpx;
	// 	height: 40rpx;
	// 	background: #F5F5F5;
	// 	border-radius: 50%;
	// 	z-index: 2;
	// }

	// .coub:after {
	// 	content: "";
	// 	position: absolute;
	// 	right: -20rpx;
	// 	top: -20rpx;
	// 	width: 40rpx;
	// 	height: 40rpx;
	// 	background: #F5F5F5;
	// 	border-radius: 50%;
	// 	z-index: 2;
	// }

	.coubtn {
		min-width: 100rpx;
		height: 48rpx;
		color: #fff;
		background: #DDD;
		border-radius: 15rpx;
	}

	.coubt,
	.coubjt {
		transition: all 0.3s ease-in-out;
	}

	.active {
		opacity: 0.4;
	}

	.jtactive {
		transform: rotate(-180deg);
	}

	.coubb {
		height: 0;
		transition: all 0.3s ease-in-out;

		// 如果不给固定高度值没有过渡效果
		&.cactive {
			height: auto;
		}
	}

	.coubbv {
		opacity: 0;
		transform: translateY(-50%);
		transition: 0.3s ease-in-out;

		&.show {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}

	.ylq {
		width: 125rpx;
		height: 125rpx;
		top: 90rpx;
		right: 10rpx;
	}

	.couqlx {
		// top: 0;
		// left: 0;
		// padding: 0 12rpx;
		// height: 40rpx;
		// font-size: 20rpx;
		// line-height: 40rpx;
		// border-bottom-right-radius: 20rpx;
		// background: linear-gradient(#F75214, #F87D22);
		top: 0;
		left: -50rpx;
		width: 100rpx;
		height: 45rpx;
		font-size: 18rpx;
		line-height: 52rpx;
		background: linear-gradient(#ff3a48, #ff3a48);
		transform: rotate(-45deg);
		transform-origin: 50% 0%;
	}

	.counew {
		top: 0;
		left: -50rpx;
		width: 100rpx;
		height: 45rpx;
		font-size: 18rpx;
		line-height: 52rpx;
		background: linear-gradient(#96E666, #08C37D);
		transform: rotate(-45deg);
		transform-origin: 50% 0%;
	}

	/*cou2*/
	.cou2 {
		// border-radius: 10rpx;
	}

	.dot1,
	.dot2 {
		position: absolute;
		right: -16rpx;
		width: 30rpx;
		height: 15rpx;
		background: #EFF3F6;
	}

	.dot1 {
		top: -1.5rpx;
		border-radius: 0 0 30px 30px;
		border-top: 0;
	}

	.dot2 {
		bottom: -1.5rpx;
		border-radius: 30px 30px 0 0;
		border-bottom: 0;
	}

	.cou2l {
		width: 180rpx;
		border-right: 1px dashed #ddd;
	}

	/*cou3*/
	.cou3 {
		background: #F6F7F9;
		border-radius: 15rpx;

		.cou2l {
			width: 160rpx;
		}
	}

	.cou3br {
		width: 42rpx;
		padding: 5rpx 12rpx;
		background: #DDD;
	}

	/*cou5*/
	.cou5 {

		.cou5l {
			width: 135rpx;
			height: 108rpx;
		}

		.cou5r {
			padding-left: 30rpx;
		}

		height: 174rpx;

		.cou5lq {
			background: linear-gradient(90deg, #FF876F, #FF654D);
			min-width: 116rpx;
			height: 56rpx;
		}

		.cou5ylq {
			width: 125rpx;
			height: 125rpx;
			bottom: -20rpx;
			right: 0;
		}
	}

	.be5 {
		background: #e5e5e5;
	}

	.cou6 {
		padding: 10rpx 15rpx;
	}

	.f66 {
		font-size: 66rpx;
	}

	.lh1 {
		line-height: 1;
	}

	.gfbg:after {
		background: #FFAFC0;
	}

	.gfbg:before {
		background: #FFAFC0;
	}

	.gfbtn {
		width: 112rpx;
		height: 48rpx;
		color: #fff;
		border-radius: 4rpx;
	}

	.gfbg {
		border-top: 1px dashed #eee;
	}

	.cef {
		color: #EF371F;
	}

	/*cou8*/
	.cou8 {
		.bgimg {
			width: 100%;
			height: 140rpx
		}

		.cqb {
			color: #7A4A1A;
		}

		.cou8m {
			border-right: 1px dashed #e2e2e2;
			padding-right: 20rpx;
		}

		.cou8zs {
			background: #F2D287;
			color: #7B4B1B;
			padding: 2rpx 10rpx;
		}

		.cou5lq {
			background: #F2D287;
			color: #7B4B1B;
		}

		.qbzkc {
			border: 0.5px solid #F7EAC6;
			color: #7B4B1B;
			padding: 2rpx 6rpx;
			border-radius: 4rpx;
		}
	}

	.cou9 {
		width: 690rpx;

		.cout {
			height: 190rpx;
			padding: 25rpx 30rpx 15rpx;
		}

		.cou9tl {
			width: 100rpx;
			height: 100rpx;
		}

		.qbyhq {
			width: 690rpx;
			height: 288rpx;
		}

		.dpimg {
			width: 30rpx;
			height: 30rpx;
		}

		.qqg {
			width: 123rpx;
			height: 54rpx;
			border-radius: 54rpx;
			background: linear-gradient(90deg, #FF315F, #FF4C21);
		}

		.jdt {
			width: 88rpx;
			height: 8rpx;
			border-radius: 10rpx;
			background: #FFB2B2;
		}

		.jd {
			border-radius: 10rpx;
			background: linear-gradient(90deg, #FF315F, #FF4C21);
		}

		.cou9b {
			border-radius: 60rpx 60rpx 0 0;
		}
	}

	.cou10 {
		.cout {
			padding: 15rpx 30rpx 15rpx;
		}

		.coub:before {
			background: transparent;
		}

		.ybk {
			top: 0;
			left: 0;
			height: 100%;
			width: 15rpx;
			background: linear-gradient(0deg, #F75214 20%, #F87D22 100%);
		}

		.cout::after {
			border-bottom: 1px dashed #FA5A16;
		}

		.num {
			top: 0;
			right: 0rpx;
			padding: 0 20rpx;
			height: 45rpx;
			font-size: 22rpx;
			line-height: 45rpx;
			border-bottom-left-radius: 20rpx;
			background: linear-gradient(#F75214, #F87D22);
		}
	}
</style>
