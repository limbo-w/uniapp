<template>
	<view v-if="info.id" class="p03 padtt p-r">
		<view class="hbtb">
			<mg-cell bgc='transparent' cname="p30" last='1'>
				<view slot='bd' class="f-x-e">
					<view @click="showhb()" class="hbimg mr20" v-if="hbId!=0">
						<mg-img src="/static/gfhb/fhb.png" />
					</view>
				</view>
			</mg-cell>
		</view>
		<!-- 配送地图 -->
		<view v-if="info.state==4&&info.deliveryInfo&&info.deliveryInfo.riderName" class="mb30 bs20 bf">
			<!-- #ifndef MP-TOUTIAO -->
			<!-- <map class='map' scale='16' :latitude="latitude" :longitude="longitude" :markers="covers" :polyline='line'>
			</map> -->
			<!-- #endif -->
			<view v-if="info.deliveryInfo" class="p20">
				<mg-cell last='1' cname='p13' btt='配送状态' :ft="info.deliveryInfo.stateMsg" ftc='c3'></mg-cell>
				<mg-cell v-if="info.deliveryInfo.riderName" last='1' cname='p13' btt='配送骑手' ftc='c6'>
					<view @click="util.makeTel(info.deliveryInfo.riderTel)" slot='ft' class="f-y-c">
						<text :style="{color: tColor}" class="iconfont icondh1 c0 mr10"></text>
						<text :style="{color: tColor}" class='f24 b-r-d' style="padding-right: 20rpx;">联系骑手</text>
						<text class='ml20'>{{info.deliveryInfo.riderName||'张三'}}</text>
					</view>
				</mg-cell>
			</view>
		</view>
		<!-- 待支付 -->
<!-- 		<mg-cell v-if="info.state==1&&stime" cname="mb30 bs20" img='/static/lb.png' w='60' h='60' brs='50%'>
			<view slot='bd' class="f26">
				<view>超过{{orderset.closeTime}}分钟未支付，订单将自动取消哦！</view>
				<view class="mt10">剩余:<text class="ml20" :style="{color: tColor}">{{stime[2]}}:{{stime[3]}}</text>
				</view>
			</view>
		</mg-cell> -->
		<!-- 已接单 -->
		<mg-cell v-if="info.state==3&&info.deliveryMode!=10 && info.appointment==1" cname="mb30 bs20" img='/static/lb.png' w='60' h='60'
			brs='50%'>
			<view slot='bd' class="f26">
				<view v-if="info.appointment==1">预计<text class="m01"
						:style="{color: tColor}">{{info.serviceAt}}</text>送达</view>
				<!-- <view v-else :style="{color: tColor}"><text class="c3">预计送达时间：</text>{{info.serviceAt}}</view> -->
				<!-- <view class="mt10">剩余:<text class="ml20" :style="{color: tColor}">{{stime[2]}}:{{stime[3]}}</text></view> -->
			</view>
		</mg-cell>
<!-- 		<mg-cell v-if="info.state==4&&info.deliveryMode==10" cname="mb30 bs20" img='/static/lb.png' w='60' h='60'
			brs='50%'>
			<view slot='bd' class="f26">
				<view>自取时间<text class="m01" :style="{color: tColor}">{{info.serviceAt}}</text></view>
			</view>
		</mg-cell> -->
		<view class="bf mb30 bs20">
			<view class="p3">
				<view v-if="orderState.str2">
					<view class="f36 f-c-c">
						<view class="ddztimg mb15" v-if="orderState.strimg">
							<mg-img :src='`${onImgurl}order/${orderState.strimg}.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>{{orderState.str1}}</view>
					</view>
					<view class="f24 t-c mt10 c9">{{orderState.str2}}
						<!-- <text class="ml20 f24" v-if="info.takeNo">({{system.custom.orderNumber}}：#{{info.takeNo}})</text> -->
					</view>
					<!-- <view v-if="(info.state==3||info.state==4)&&info.deliveryMode==10" class="mt30">
						<view class="f-c">
							<view class="zqmc f-c" :class="{'mr30':i<zqmArr.length-1}" v-for="(v,i) in zqmArr" :key='i'>
								{{v}}
							</view>
						</view>
						<view class="zqmimg">
							<mg-img :src="qcmsrc"></mg-img>
						</view>
						<view class="c6 f26 t-c">{{orderset.tips}}</view>
					</view> -->
					<view v-if="orderState.str3" :style="{color: tColor}" class="f24 mt10 t-c">{{orderState.str3}}
					</view>
				</view>
				<!-- <view v-if="!(info.state==4&&info.deliveryMode>2)" class="f-row pb10 mt30">
					<view v-if="info.state==1||info.state==2" @click="go({t:4})" class="obtn b-d">取消订单</view>
					<view v-if="info.state==1" @click="go({t:4})" class="obtn cf" :style="{background: tColor}">立即支付</view>
					<view v-if="(info.state==2||info.state==3||info.state==4)&&info.deliveryMode>1" @click="go({t:4})" class="obtn cf"
					 :style="{background: tColor}">催单</view>
					<view v-if="info.state==4&&info.deliveryMode==2" @click='util.makeTel(info.storeTel)' class="obtn b-d">联系商家</view>
					<view v-if="info.state>=5" @click="go({t:4})" class="obtn b-d">再来一单</view>
					<view v-if="info.state==5" @click="go({t:4})" class="obtn cf" :style="{background: tColor}">立即评价</view>
				</view> -->
			</view>
<!-- 			<mg-cell @tab='util.makeTel(info.storeTel)' bgc='#FAFBFC' last='1' cname="b-t-e">
				<view slot='bd' class="">
					<view class="f30 f-c">
						<text class="iconfont f42 icondh c0 mr20"></text>
						<text class='t-o-e'>联系商家</text>
					</view>
				</view>
			</mg-cell> -->
		</view>
		<view class="bf mb30 bs20">
			<view class="p3">
				<view class="flex">
					<view class="f24 f-c-c f-1" @click="operation('sqtk',info)" v-if="info.state>=2 && info.state<5">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/qxdd.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>取消订单</view>
					</view>
					<view class="f24 f-c-c f-1" @click="operation('ljzf',info)" v-if="info.state==1">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/ljzf.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>立即支付</view>
					</view>
					<view class="f24 f-c-c f-1" @click="operation('cd',info)" v-if="info.state>=2 && info.state<=4 && info.deliveryMode!=10">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/cuidan.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>催单</view>
					</view>
					<!-- <view class="f24 f-c-c f-1" @click="caozuo(info)" v-if="info.state>=5 && info.deliveryMode!=10">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/cuidan.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>再来一单</view>
					</view> -->
					<view class="f24 f-c-c f-1" @click="operation('qrsh',info)" v-if="(info.state==3||info.state==4)&&info.deliveryMode==10">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/qrsh.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>确认收货</view>
					</view>
					<view class="f24 f-c-c f-1" @click="operation('qrsh',info)" v-if="(info.state==4)&&info.deliveryMode!=10">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/qrsh.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>确认收货</view>
					</view>
					<view class="f24 f-c-c f-1" @click="ckwz(info)" v-if="(info.state==3||info.state==4)&&info.deliveryMode==10">
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/qwmd.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>前往门店</view>
					</view>
					<view class="f24 f-c-c f-1" @click='util.makeTel(info.storeTel)'>
						<view class="anniuimg mb10">
							<mg-img :src='`${onImgurl}order/lxsj.png`'></mg-img>
						</view>
						<view class='t-o-e wei'>联系商家</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bf mb30 bs20" v-if="(info.state==3||info.state==4)&&info.deliveryMode==10 && orderset.writeOff=='1' || orderset.writeOff==undefined">
			<mg-cell isr='1' cname='p2' btt='订单核销' bttc='f30'></mg-cell>
			<view class="p3">
				<view class="mt30">
					<view class="f-c">
						<!-- <view class="zqmc f-c" :class="{'mr30':i<zqmArr.length-1}" v-for="(v,i) in zqmArr" :key='i'>
							{{v}}
						</view> -->
						<view class="zqmyz c6 bs15">
							取货码<text class="ml30" v-for="(v,i) in zqmArr" :key='i'>{{v}}</text>
						</view>
					</view>
					<view class="zqmimg">
						<mg-img :src="qcmsrc"></mg-img>
					</view>
					<view class="c6 f26 t-c">{{orderset.tips}}</view>
				</view>
			</view>
		</view>
		<view class="mb30 bs20">
			<mg-cell isr='1' cname='p2'>
				<view slot='bd' class="" @click.stop="go({t:3,url:`/yb_wm/index/goods?storeId=${info.storeId}`})">
					<view class="f30 f-y-c">
						<text class='t-o-e'>{{info.storeName}}</text>
						<!-- <text class="iconfont iconright c3 f26 ml10"></text> -->
					</view>
				</view>
			</mg-cell>
			<mg-cell isr='1' cname='p2' last="1" v-for="(v,i) in info.goodsArr" :key="i" w='104' h='104' brs='12rpx' :img='v.icon'
				:cname="i!=info.goodsArr.length-1?'la154 p2':'p2'">
				<template slot='bd'>
					<view v-if="v.isChange==1" class="p-a hgc f18 cf bf5f l-n">换购</view>
					<view class="f-bt">
						<view class="f-row">
							<view v-if="v.isActivity>0&&v.isActivity!=4" class="f-g-0 yhic f18 cf bf5f f-c hdspan">
								{{v.isActivity==1?'特':v.isActivity==2?'折':v.isActivity==5?'赠':'减'}}
							</view>
							<view class="l-h1">{{v.name}}</view>
						</view>
						<view class="f-g-0 f32">{{sl+itemTotal(v)}}</view>
					</view>
					<view v-if="v.isActivity==4" class="f-row cf5f">
						<view class="f20 bs5 b-d p-3-10" :style="{borderColor:'#FF5F2F'}">
							{{v.isActivity==4?'第二件打折':'买一送一'}}
						</view>
					</view>
					<view class="f-bt mt10 f24 c9">
						<view class="f-g-1 f-raw">
							<text class="ml10" v-if="v.data">{{v.data}}</text>
							<text v-if="v.attribute">({{v.attribute}})</text>
							<text class="ml10" v-if="v.material">+{{v.material}}</text>
						</view>
						<view class="ml10">x{{v.num}}</view>
					</view>
				</template>
			</mg-cell>
			<!-- <mg-cell v-if='info.giveName' isr='1' cname='p2' btt='满赠' bdmw='120rpx' :ft='`${info.giveName}`' ftc='c3'></mg-cell> -->
			<mg-cell v-if="info.giveName" last='1' bdmw="120rpx" cname='p015'>
				<view slot='bd' class="f-y-c">
					<view class="yhic f18 cf bf5f f-c f-g-0">赠</view>
					<view>满赠</view>
				</view>
				<view slot='ft' class="cf5f">{{info.giveName}}</view>
			</mg-cell>
<!-- 			<mg-cell v-if='info.grantCouponName' isr='1' cname='p2' btt='满返' bdmw='120rpx' :ft='`${info.grantCouponName}`'
				ftc='c3'></mg-cell> -->
			<mg-cell v-if="info.grantCouponName" last='1' bdmw="120rpx" cname='p015'>
				<view slot='bd' class="f-y-c">
					<view class="yhic f18 cf bf5f f-c f-g-0">返</view>
					<view>门店满返</view>
				</view>
				<view slot='ft' class="cf5f">{{info.grantCouponName}}</view>
			</mg-cell>
			<mg-cell v-if="info.preferentialMoney>0" last='1' cname='p015' :ft='`-${sl+info.preferentialMoney}`'
				ftc='f32 cf5f'>
				<view slot='bd' class="f-y-c">
					<view class="yhic f18 cf bf5f f-c">减</view>
					<view>门店满减</view>
				</view>
			</mg-cell>
			<mg-cell last="1" v-if="info.newMoney>0" cname='p015' :ft='`-${sl+info.newMoney}`' ftc='f32 cf5f'>
				<view slot='bd' class="f-y-c">
					<view class="yhic f18 cf bf5f f-c">新</view>
					<view>新客立减</view>
				</view>
			</mg-cell>
			<!-- <mg-cell isl='1' cname='p30' btt='会员折扣' ft='0.9折' ftc='f32' :color='tColor'></mg-cell> -->
			<mg-cell v-if="info.couponPreferential>0" last='1' cname='p015' :ft='`-${sl+info.couponPreferential}`'
				ftc='f32 cf5f'>
				<view slot='hd' class="f-y-c">
					<view class="yhic f18 cf bf5f f-c">券</view>
					<view>门店代金券</view>
				</view>
				<!-- <view slot='hd' class="itemcon pomj mr20">优惠券</view> -->
			</mg-cell>
			<mg-cell v-if="info.platformCouponPreferential>0" last='1' cname='p015'
				:ft='`-${sl+info.platformCouponPreferential}`' ftc='f32 cf5f'>
				<view slot='hd' class="f-y-c">
					<view class="yhic f18 cf bf5f f-c">券</view>
					<view>{{system.custom.systemRedbag}}</view>
				</view>
			</mg-cell>
			<mg-cell isr='1' cname='p015' last="1" btt='包装费' :ft='`${sl+info.boxMoney}`' ftc='f32 c3'>
				<!-- <view slot='hd' class="itemcon popsf mr20">包装</view> -->
			</mg-cell>
			<mg-cell v-if="info.deliveryMode!=10" isr='1' cname='p015'
				:btt="info.deliveryPreferential>0?info.deliveryPreferentialType==1?'满免配送费':'满免配送费':''" ftc='f32 c3'>
				<view slot='hd' class="mr20">配送费</view>
				<view slot='ft'>
					<text v-if='info.deliveryPreferential>0'
						class="mr30 t-d-l f32 c9">{{sl+info.deliveryPreferential}}</text>
					<text class="f32">{{sl}}{{info.deliveryMoney}}</text>
				</view>
			</mg-cell>
			<mg-cell v-if="info.taxRatio>0" isl='1'>
				<view slot='bd' class="f-y-c">税率<text class="ml10 c6 f24">({{info.taxRatio}}%)</text></view>
				<view slot='ft' class="f32 c3">+{{sl+info.tax}}</view>
			</mg-cell>
			<mg-cell isr='1' last='1' cname='p2'>
				<view slot='bd' class="c9 f24 f-row">
					<view class="f-g-0 f-y-c">优惠规则<text class="iconfont iconwen f26 c9 ml10"></text></view>
				</view>
				<view slot='ft' class="ml10 c3"><text class="f24">共{{info.num}}件商品</text><text
						class="m02">小计</text><text class="f34">{{sl+info.money}}</text></view>
			</mg-cell>
			<!-- <mg-cell @tab='util.makeTel(info.storeTel)' bgc='#FAFBFC' last='1' cname="b-t-e">
				<view slot='bd' class="">
					<view class="f30 f-c">
						<text class="iconfont f42 icondh c0 mr20"></text>
						<text class='t-o-e'>联系商家</text>
					</view>
				</view>
			</mg-cell> -->
		</view>
		<view class="mb30 bf bs20" v-if="info.deliveryMode!=10">
			<mg-cell isr='1' cname='p2' btt='配送信息' bttc='f30'></mg-cell>
			<view class="p20">
				<mg-cell last='1' cname='p13' btt='配送方式' bttc='c9' :ft="info.deliveryName" ftc='c3'></mg-cell>
				<mg-cell v-if="info.appointment==1" last='1' cname='p13' btt='送达时间' bttc='c9'
					:ft="timeToDate(info.serviceTime)" ftc='c3'></mg-cell>
				<mg-cell v-else last='1' cname='p13' btt='送达时间' bttc='c9' :ft="info.serviceAt" ftc='c3'></mg-cell>
				<mg-cell last='1' noc='1' cname='p13' btt='收货地址' bttc='c9' ftc='c3'>
					<view slot='ft' class="f-c-e w500">
						<view class="t-r">{{info.receivedAddress}}</view>
						<view class="">{{info.receivedName}} ({{info.receivedTel}})</view>
					</view>
				</mg-cell>
			</view>
		</view>
		<view class="mb30 bf bs20" v-if="info.deliveryMode==10">
			<mg-cell isr='1' cname='p2' btt='自取信息' bttc='f30'></mg-cell>
			<view class="p20">
				<mg-cell v-if="info.appointment==1" last='1' cname='p13' btt='自取时间' bttc='c9'
					:ft="timeToDate(info.serviceTime)" ftc='c3'></mg-cell>
				<mg-cell v-else last='1' cname='p13' btt='自取时间' bttc='c9' :ft="info.serviceAt" ftc='c3'></mg-cell>
				<mg-cell v-if="info.isOut" last='1' cname='p13' btt='自取类型' bttc='c9' :ft="info.isOut==1?this.system.custom.dnjc || '店内就餐':this.system.custom.dbdz || '打包带走'"
					ftc='c3'></mg-cell>
				<mg-cell v-if='info.state>2&&info.state<7&&info.selfCode' last='1' cname='p13' btt='取货码' bttc='c9'
					:ft="info.selfCode" ftc='c3'></mg-cell>
				<mg-cell last='1' noc='1' cname='p13' btt='商家地址' bttc='c9' ftc='c3'>
					<view slot='ft' class="f-c-e w500">
						<view @click='' class="t-r">{{info.address}}</view>
						<view @click='util.makeTel(info.storeTel)' class="">{{info.storeName}} ({{info.storeTel}})
						</view>
					</view>
				</mg-cell>
				<mg-cell last='1' cname='p13' btt='预留电话' bttc='c9' :ft="info.receivedTel" ftc='c3'></mg-cell>
			</view>
		</view>
		<view class="mb30 bf bs20">
			<mg-cell isr='1' cname='p2' btt='订单信息' bttc='f30'></mg-cell>
			<view class="p20">
				<mg-cell v-if='info.takeNo' last='1' cname='p13' :btt='system.custom.orderNumber' bttc='c9' :ft='`#${info.takeNo}`'
					ftc='c3'></mg-cell>
				<mg-cell last='1' cname='p13' btt='订单号码' bttc='c9'>
					<view slot='ft' class="f-y-c">
						<text class="c3">{{info.outTradeNo}}</text>
						<bk-b @tab='util.fz(info.outTradeNo)' type="2" c-name='f24 ml20' t='复制'></bk-b>
					</view>
				</mg-cell>
				<mg-cell last='1' cname='p13' btt='下单时间' bttc='c9' :ft="timeToDate(info.createdAt)" ftc='c3'></mg-cell>
				<mg-cell v-if='info.payMode' last='1' cname='p13' btt='支付方式' bttc='c9' :ft="payName(info.payMode)"
					ftc='c3'></mg-cell>

				<mg-cell v-if='info.userNote' last='1' noc='1' cname='p13' btt='订单备注' bdmw='130rpx' bttc='c9'
					:ft="info.userNote" ftc='c3'></mg-cell>
			</view>
		</view>
		<mg-popup v-model="showRed" position="middle">
			<view class="bf t-c bs15" style="width: 540rpx;">
				<view class="f-c f-1 mt20">
					<view class="qhbimg pt30">
						<mg-img :src='`${onImgurl}gfhb/qhb.png`'></mg-img>
					</view>
				</view>
				<view class="m30">
					<p class='c0 wei f30'>【送您一个拼手气红包】</p>
					<p class="c6 f26 mt10">快分享给小伙伴看看谁会撞大运</p>
				</view>
				<view class="f-row hlt f-x-bt" style="height: 100rpx;">
					<button hover-class='be' class="bs0 p0 f-1 bf f30 h100 f-c c9" @click="showRed=false">取消</button>
					<sq-btn cname="f-1 bf f30 h100 f-c hll" w='270' h='100' :sname="{color:tColor}" t='发红包' type="3"
						@refresh='fhb'></sq-btn>
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
	import {
		wxShare,
		getSLink,
	} from "@/common/wechat-util.js"
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import utils from '@/common/utils.js'
	import bkB from '@/components/common/block-b.vue'
	import MgCell from '@/components/common/mg-cell.vue'
	import mgPopup from '@/components/common/popup.vue'
	import sqBtn from '@/components/common/sq-btn.vue'
	export default {
		name: 'order-dl',
		components: {
			bkB,
			MgCell,
			mgPopup,
			sqBtn,
		},
		data() {
			return {
				info: {},
				stime: '',
				latitude: '',
				longitude: '',
				covers: [],
				line: [],
				showRed: false,
				hbId: '',
				qcmsrc: '',
			}
		},
		onLoad(options) {
			this.getSystem()
			this.util.setNT('订单详情')
			this.orderId = options.id
			this.getInfo()
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				orderset: state => state.config.orderset,
			}),
			orderState() {
				let str1 = '',
					str2 = '',
					str3 = '',
					strimg = ''
				switch (+this.info.state) {
					case 1:
						str1 = '待支付'
						str2 = `剩余支付时间: ${this.stime[2]}:${this.stime[3]}（超过${this.orderset.closeTime}分钟未支付，订单将自动取消哦！)`
						break;
					case 2:
						// str1 = '等待商家接单'
						// str2 = '请耐心等待商家接单'
						str1 = '下单成功'
						str2 = '订单已提交，等待商家接单'
						strimg = 'xdcg'
						break;
					case 3:
						// str1 = '商家已接单'
						// str2 = this.info.deliveryMode != 10 ? '商家已接单，正在准备中，请耐心等待' : '请尽快到店自取'
						str1 = '商家已接单'
						str2 = this.info.deliveryMode != 10 ? '您的商品正在制作中，请您耐心等待' : '您的商品正在制作中，请您耐心等待'
						strimg = 'sjyjd'
						break;
					case 4:
						if (this.info.deliveryMode != 10) {
							// str1 = '订单配送中'
							// str2 = '配送平台'
							str1 = '商品派送中'
							str2 = `您的订单由${this.info.deliveryName}派送中,请您耐心等待`
							// str3 = `${this.info.deliveryName}`
							strimg = 'psz'
						} else {
							// str1 = '待取货'
							// str2 = '请您尽快到店取货'
							str1 = '待取货'
							str2 = `您的订单制作完成,请前往门店自取,(${this.system.custom.orderNumber}: #${this.info.takeNo})`
							// str3 = `取货码:${this.info.selfCode}`
							strimg = 'dqc'
						}
						break;
					case 5:
					case 6:
						str1 = '订单已完成'
						str2 = '感谢您对我们的信任，期待再次光临'
						strimg = 'ddywc'
						break;
					case 7:
						str1 = '订单已取消'
						str2 = '感谢您对我们的信任，期待再次光临'
						str3 = '取消原因：订单超时或未支付'
						break;
					case 8:
						str1 = '商家拒单'
						str2 = '非常抱歉！感谢您对我们的信任，期待再次光临'
						str3 = this.info.refuseReason && '拒单原因：' + this.info.refuseReason
						break;
					case 9:
						str1 = '申请退款中'
						str2 = '您正在申请订单退款，请耐心等待门店处理'
						str3 = this.info.cancelReason && '取消原因：' + this.info.cancelReason
						break;
					case 10:
						str1 = '订单已退款'
						str2 = '感谢您对我们的信任，期待再次光临'
						break;
					case 11:
						str1 = '订单退款拒绝'
						str2 = '感谢您对我们的信任，如有疑问请联系商家'
						str3 = this.info.refuseReason && '拒绝原因：' + this.info.refuseReason
						break;
				}
				return {
					str1,
					str2,
					str3,
					strimg,
				}
			},
			zqmArr() {
				console.log(this.info.selfCode && this.info.selfCode.split(''))
				return this.info.selfCode && this.info.selfCode.split('')
			},
			sl() {
				return this.info.symbol || this.system.symbol || '￥'
			},
			dsfps() {
				return this.info.deliveryMode != 1 && this.info.deliveryMode != 10
			},
		},
		methods: {
			async getInfo() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wmddxq,
					mask: '加载中',
					data: {
						orderId: this.orderId
					},
				})
				if (data) {
					this.getisPop()
					this.info = data
					if (data.state == 1) {
						this.djs(data.createdAt)
					}
					if ((data.state == 3 || data.state == 4) && data.deliveryMode == 10) {
						this.getqcm()
					}
					return
					// console.log('111',this.dsfps)
					if (data.state == 4 && this.dsfps) {
						return
						this.latitude = data.userLat
						this.longitude = data.userLng
						this.covers = [{
								latitude: +data.userLat,
								longitude: +data.userLng,
								iconPath: '',
								width: '25',
								height: '25',
								callout: {
									content: `${data.receivedName}(${data.sex})`,
									color: '#333',
									fontSize: 12,
									borderRadius: 10,
									bgColor: '#fff',
									padding: 5,
									display: 'ALWAYS',
									textAlign: 'center',
								},
							},
							{
								latitude: +data.storeLat,
								longitude: +data.storeLng,
								iconPath: this.getImgS(data.storeIcon),
								width: '25',
								height: '25',
								callout: {
									content: data.storeName,
									color: '#333',
									fontSize: 12,
									borderRadius: 10,
									bgColor: '#fff',
									padding: 5,
									display: 'ALWAYS',
									textAlign: 'center',
								},
							}
						]
						// this.line = [{
						// 	color: this.tColor,
						// 	width: 3,
						// 	points: [{
						// 		latitude: +data.userLat,
						// 		longitude: +data.userLng
						// 	}, {
						// 		latitude: +data.storeLat,
						// 		longitude: +data.storeLng
						// 	}, ]
						// }]
						//如果有骑手经纬度
						if (data.deliveryInfo && data.deliveryInfo.riderLat) {
							this.covers = this.covers.concat([{
								latitude: +data.deliveryInfo.riderLat,
								longitude: +data.deliveryInfo.riderLng,
								iconPath: '/static/qs.png',
								width: '25',
								height: '25',
								callout: {
									content: data.deliveryInfo.riderName,
									color: '#333',
									fontSize: 12,
									borderRadius: 10,
									bgColor: '#fff',
									padding: 5,
									display: 'ALWAYS',
									textAlign: 'center',
								},
							}])
							// this.line[0].points = this.line[0].points.concat([{
							// 	latitude: +data.deliveryInfo.riderLat,
							// 	longitude: +data.deliveryInfo.riderLng
							// }, {
							// 	latitude: +data.userLat,
							// 	longitude: +data.userLng
							// }])
						}
					}
				}
			},
			async getqcm() {
				let {
					data
				} = await this.util.request({
					'url': this.api.zqqcm,
					mask: '加载中',
					data: {
						id: this.orderId
					},
				})
				this.qcmsrc = data
			},
			itemTotal(v) {
				let itemTotal = +(v.vipMoney > 0 && +v.vipMoney < +v.money && v.vipMoney || v.money)
				// if (v.material && v.material.length) {
				// 	v.material.forEach(v => {
				// 		itemTotal += v.number * v.outPrice
				// 	})
				// }
				return +(itemTotal * v.num).toFixed(2)
			},
			djs(time) {
				//13:55
				if (this.info.state != 1 || this.orderset.autoClose != 1) return
				let now = this.dateToTime(),
					time2 = +time + this.orderset.closeTime * 60
				if (time2 > now) {
					this.stime = utils.countDownTime(time2 - now)
					this.dsq = setInterval(async () => {
						time2 -= 1
						if (time2 == now) {
							clearInterval(this.dsq)
							this.go({
								t: 4
							})
						}
						this.stime = utils.countDownTime(time2 - now)
					}, 1000)
				}
			},
			psxq() {},
			async operation(type,co){
				let obj = {}
				if(type=='sqtk'){
					if (co.state == 2) {
						return this.qxdd(1)
					}
					obj = {
						title: '您确认取消订单吗？',
						url: 'wmddtk',
						params: {
							orderId: co.id,
							note:'',
						}
					}
				}else if(type=='cd'){
					obj = {
						title: '您确认催单吗？',
						url: 'wmddcd',
						params: {
							// userId: this.user.userId,
							orderId: co.id
						}
					}
				}else if(type=='qrsh'){
					obj = {
						title: '您确认已收到货吗？',
						url: 'wmddsh',
						params: {
							orderId: co.id
						}
					}
				}else if(type=='ljzf'){
					this.go({
						t: 1,
						url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
							orderId: co.id,
							orderType: 1,
							info: {
								money: co.money,
								storeName: co.storeName,
								type: "下单支付",
								cancel: 1,
								go: ({
									t: 6,
									url: '/yb_wm/index/order-index'
								})
							}
						}))
					})
					return;
				}
				try {
					await this.util.modal(obj.title)
				} catch (e) {
					return
				}
				let data = await this.util.request({
					'url': this.api[obj.url],
					method: 'POST',
					mask: 1,
					data: obj.params,
				})
				if (data) {
					this.util.message('操作成功', 1)
					this.go({
						t: 6,
						url: '/yb_wm/index/order-index'
					})
				}
			},
			async caozuo(info){
				await this.util.modal('您确认再来一单吗？')
				this.go({
					t: 3,
					url: '/yb_wm/index/goods?storeId=' + info.storeId
				})
			},
			async qxdd(e) {
				if (e) {
					try {
						await this.util.modal('您确认取消订单吗？')
					} catch (e) {
						return
					}
				}
				let data = await this.util.request({
					'url': this.api.wmddqx,
					method: 'POST',
					mask: '取消订单中',
					data: {
						orderId: this.info.id,
						note:'',
					},
				})
				if (data) {
					this.util.message('操作成功', 1)
					this.go({
						t: 6,
						url: '/yb_wm/index/order-index'
					})
				}
			},
			ckwz(info) {
				this.util.ckWz({
					lat: info.storeLat,
					lng: info.storeLng,
					name: info.storeName,
					address: info.address,
				})
			},
			async getisPop() {
				let {
					data
				} = await this.util.request({
					'url': this.api.ispop,
					data: {
						orderId: this.orderId,
					}
				})
				this.hbId = data?data.id:''
				this.config = data
				// #ifdef  H5
				let link = getSLink(`yb_wm/shop/gfhb/gfhb?id=${this.hbId}&userId=${this.uId}`)
				wxShare({
					title: this.config.shareTitle,
					desc: '送你一个拼手气红包!',
					link,
					imgUrl: this.getImgS(this.config.shareImg),
				})
				// #endif
			},
			showhb() {
				this.showRed = true
			},
			fhb() {
				this.showRed = false
			},
		},
		onUnload() {
			this.dsq && clearInterval(this.dsq)
		},
		onShareAppMessage() {
			let p = `yb_wm/shop/gfhb/gfhb?id=${this.hbId}&userId=${this.uId}`
			return this.util.mpShare({
				t: this.config.shareTitle,
				i: this.getImgS(this.config.shareImg),
				p,
			})
		},
	}
</script>

<style scoped lang="scss">
	.padtt{
		padding-top: 30rpx;
	}
	.hbtb{
		position: fixed;
		right: 20rpx;
		z-index: 999;
	}
	.obtn {
		margin: 0 25rpx 0 0;
	}

	.map {
		width: 690rpx;
		height: 400rpx;
	}

	.zqmc {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		border: 1px dashed #ddd;
	}
	.zqmyz{
		padding: 20rpx 30rpx;
		background: #F5F5F5;
	}

	.zqmimg {
		width: 380rpx;
		height: 380rpx;
		margin: 20rpx auto;
	}

	.qhbimg {
		width: 357rpx;
		height: 266rpx;
	}

	.hbimg {
		width: 50rpx;
		height: 60rpx;
	}

	.hgc {
		top: 30rpx;
		left: 30rpx;
		padding: 3rpx 12rpx;
		border-radius: 0 0 15rpx 0;
	}

	.hdspan {
		margin-top: 8rpx;
	}
	
	.ddztimg{
		width: 100rpx;
		height: 100rpx;
	}
	.anniuimg{
		width: 40rpx;
		height: 40rpx;
	}
</style>
