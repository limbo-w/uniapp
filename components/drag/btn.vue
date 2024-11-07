<template>
	<view :style="{
			backgroundColor: co.colorBg,
			margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`,
			borderRadius: co.circle + u,
		}" :class='[bgc]' v-if="ebg.btnList.length>0">
		<swiper :style="{height:`${ebg.height}rpx`}" :circular='ebg.circular' :indicator-dots='showdot'
			indicator-color='#f5f5f5' indicator-active-color='#ccc' :autoplay='ebg.autoplay' :interval='ebg.interval'>
			<swiper-item v-for='(pv,pi) in ebg.btnList' :key='pi'>
				<view class='f-row swiper-v'>
					<block v-for='(v,i) in pv' :key='i'>
						<view @click='goTo(v)' :style="{width:`${ebg.width}%`,height:iheight+'rpx'}" class='f-c-c p-r'>
							<view class='swiper-imgv o-h'
								:style="{width: `${imgw}rpx`,height: `${imgw}rpx`,borderRadius: co.circleBtn + '%'}">
								<mg-img :src='v.img' />
							</view>
							<view :style="[{color:ebg.active&&activeIndex==v.id?color:ebg.colorWord,},ebg.tsname]"
								class='swiper-tv mt10 t-o-e'>{{v.word}}</view>
							<view v-if="v.subheading" class="p-a swiper-fbt br bs30 cf f-c">{{v.subheading}}</view>
						</view>
						<!-- <navigator wx:if="{{item.entry.value!='miniTarget'||!item.entry.param.appId}}" target='miniProgram' app-id='{{item.entry.param.appId}}' path='{{item.entry.param.path}}'
						 hover-class="none" style='width:{{ebg.width}}%;height:175rpx;' class='flex-col flex-y-center flex-x-center'>
							<view class='swiper-imgv'>
								<image class='swiper-imgvimg imgshape{{ebg.shape}}' src='{{item.url}}'></image>
							</view>
							<view style='color:{{ebg.color}}' class='swiper-tv gobyndsingle color_6'>{{item.label}}</view>
						</navigator> -->
					</block>
				</view>
			</swiper-item>
		</swiper>
		<mg-modal :ismr="true" v-model="show" width="80%" :z-index="2002">
			<view v-if="sjxx.storeInfo" class="bf bs30">
				<view class="t-c p330 f30">温馨提示：本店无线网络已覆盖</view>
				<view class="p2">
					<mg-cell last='1' ht='Wifi名称:' hw="80" :btt='sjxx.storeInfo.wifiName'></mg-cell>
					<mg-cell last='1' ht='Wifi密码:' hw="80">
						<view slot='bd' class="f-y-c c6">
							<text class="f-g-1">{{sjxx.storeInfo.wifiPassworwd}}</text>
							<view class="f-g-0">
								<bk-b @tab='util.fz(sjxx.storeInfo.wifiPassworwd)' :color="tColor" type="2"
									c-name='f24 ml20' t='复制'></bk-b>
							</view>
						</view>
					</mg-cell>
				</view>
				<view class="f-row hlt dbbtnc">
					<button hover-class='be' class="f-1 bf f30 h100 f-c" @click="show=false">确定</button>
				</view>
			</view>
		</mg-modal>
		<mg-modal :ismr="true" v-model="showsm" width="76%" :z-index="2002">
			<view class="bf bs20 smc f-col f-y-c">
				<view class="smimg mb30">
					<mg-img src="/static/dndc/sm.png"></mg-img>
				</view>
				<view class="f40 wei m30">请扫描桌号二维码下单</view>
				<view class="f26 c6 mb50">扫描二维码手机下单</view>
				<view class="foot-btnc posi-r mt30 p0">
					<button @click="smdc" class="foot-btn b-l-f0f0">扫桌号二维码</button>
				</view>
				<view class="foot-btnc posi-r mt20 p0">
					<button @click="showsm=false" class="foot-btn bf cf1">稍后下单</button>
				</view>
			</view>
		</mg-modal>
		<mg-share v-model="shareshow"></mg-share>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		scanCode
	} from "@/common/wechat-util.js"
	import mgModal from '@/components/common/modal.vue'
	import bkB from '@/components/common/block-b.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import MgImg from '@/components/common/mg-img.vue'
	import mgShare from '@/components/template/share.vue'
	export default {
		name: 'searchBox',
		components: {
			mgModal,
			bkB,
			MgCell,
			MgImg,
			mgShare,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			iheight: { //一行的高度
				type: String,
				default: '170'
			},
			oheight: { //额外加的高度
				type: Number,
				default: 0
			},
			u: {
				type: String,
				default: 'px'
			},
			color: {
				type: String,
				default: ''
			},
			imgw: {
				type: String,
				default: ''
			},
			bgc: '',
		},
		data() {
			return {
				ebg: {
					class: '',
					padding: 0,
					topMargin: 0,
					buttonNumberOfCol: 5,
					buttonNumberOfRow: 1,
					color: "#666",
					btnList: [],
					shape: 1,
					autoplay: true,
					circular: true,
					interval: '5000'
				},
				show: false,
				showsm: false,
				shareshow: false,
				activeIndex: -1,
			}
		},
		computed: {
			...mapState(['sjxx']),
			showdot() {
				return this.ebg.btnList.length > 1
			},
		},
		watch: {
			co: {
				handler(newVal) {
					let typeObj = Object.assign({}, newVal),
						colnum = newVal.num,
						rownum = newVal.line,
						height;
					var navs = [];
					if (typeObj.btnList.length > 0) {
						for (var i = 0, len = typeObj.btnList.length; i < len; i += colnum * rownum) {
							navs.push(typeObj.btnList.slice(i, i + colnum * rownum));
						}
						// console.log(navs)
						// return
						if (rownum == 2 && navs[0].length > colnum) {
							height = navs.length > 1 ? this.iheight * 2 + 20 : this.iheight * 2;
						} else {
							height = navs.length > 1 ? +this.iheight + 20 : this.iheight;
						}
					}
					typeObj.width = 100 / colnum
					typeObj.btnList = navs
					typeObj.height = +height + this.oheight
					this.ebg = Object.assign({}, this.ebg, typeObj)
					// console.log('newVal', newVal, this.ebg)
				},
				immediate: true
			},
			// co(newValue, oldValue) {
			// 	console.log(newValue);
			// 	//this.styles = Object.assign({}, this.styles, newValue);
			// }
		},
		methods: {
			goTo(v) {
				if (v.url) {
					if (v.url.param == 'wifi') {
						this.show = true
					} else if (v.url.param == 'inStore') {
						this.showsm = true
					} else if (v.url.param == 'share') {
						this.shareshow = true
					} else if (v.url.param == 'reserve' || v.url.param == 'queuing') {
						if (this.sjxx.storeInfo.isOpen == 1) {
							this.goUrl(v.url, v)
						} else {
							this.util.message('商家休息中，无法使用此功能', 3)
						}
					} else {
						this.goUrl(v.url, v)
					}
				} else {
					this.activeIndex = v.id == this.activeIndex ? -1 : v.id
					this.$emit('tabitem', v.id == this.activeIndex ? v : {})
				}
			},
			smdc() {
				this.showsm = false
				scanCode(this)
			},
		},
		// created() {
		// 	console.log(this.co)
		// }
	}
</script>

<style scoped lang="scss">
	.swiper-v {
		width: 100%;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.swiper-imgv {
		margin-top: 15rpx;
		width: 88rpx;
		height: 88rpx;
	}

	.swiper-tv {
		font-size: 24rpx;
		width: 100%;
		text-align: center;
	}

	.swiper-fbt {
		top: 5rpx;
		right: -5rpx;
		padding: 0rpx 10rpx;
		font-size: 18rpx;
	}

	.dbbtnc {
		height: 100rpx;
	}

	.smc {
		padding: 100rpx 40rpx 30rpx;
	}

	.smimg {
		width: 190rpx;
		height: 190rpx;
	}

	.foot-btn {
		height: 84rpx;
		line-height: 84rpx;
	}
</style>
