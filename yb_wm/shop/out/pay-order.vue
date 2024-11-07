<template>
	<view class="pb130" v-show="carInfo.sjxx">
		<view class="header" :style="{background: '#fff'}">
			<!-- <view class="f-x-bt p-30-30-0">
				<view class="f26">订单配送至</view>
				<view v-if="ModeArr.length" class="psmsc f-x-bt bf6">
					<view @click="clickMode(v)" v-for="(v,i) in ModeArr" :key='i' class="psms f-c f24 c9" :class="{f28:v.value==params.deliveryMode}"
					 :style="{color:v.value==params.deliveryMode?'#fff':'',background:v.value==params.deliveryMode?'#333':''}">{{v.name}}</view>
				</view>
			</view> -->
			<view v-if="carInfo.sjxx&&carInfo.sjxx.moreSet.orderNotice" class="w100 t0 f-y-c p23"
				:style="{background:`rgba(${cTR(tColor)},0.1)`}">
				<text class="iconfont icontishi" :style="{color:tColor}"></text>
				<view class="f-1" :style="{color:tColor}">
					<uni-notice-bar :scrollable="true" :single="true" :color="tColor" backgroundColor="transparent"
						:text="carInfo.sjxx.moreSet.orderNotice" :speed='25' />
				</view>
			</view>
			<view class="p-r">
				<get-address ref="getaddress" v-if="params.deliveryMode==2" :address='wmAddress'></get-address>
				<get-ztd v-if="params.deliveryMode==1" :sjxx='carInfo.sjxx'></get-ztd>
				<view v-if="ModeArr.length" class="p-a psmsc f-x-bt bf6">
					<view @click="clickMode(v)" v-for="(v,i) in ModeArr" :key='i' class="psms f-c f24 c9"
						:class="{f28:v.value==params.deliveryMode}"
						:style="{color:v.value==params.deliveryMode?'#fff':'',background:v.value==params.deliveryMode?'#333':''}">
						{{v.name}}
					</view>
				</view>
			</view>
			<view v-show="params.deliveryMode==1">
				<mg-cell cname='p23' isr='1'>
					<view slot='bd' class="f-y-c">
						<view class="f-g-0 f30">预留手机</view>
						<input v-model="params.userTel" type='number' maxlength='11' class="f-g-1 weui-input t-r"
							placeholder="请输入手机号" />
						<!-- <bk-b @tab='util.fz(info.outTradeNo)' type="2" c-name='f24 p-10-20 ml20' :color='tColor' t='自动填写'></bk-b> -->
						<!-- #ifdef MP-WEIXIN -->
						<sq-btn @refresh='setTel' type="2" cname="text-btn f24 ml20 p0" w='120' h='50'
							:sname="{color:tColor,borderColor:tColor}" t='自动填写'></sq-btn>
						<!-- #endif -->
					</view>
				</mg-cell>
				<mg-agree v-if="ModeArr.length" :title='`${carInfo.sjxx.moreSet.selfName}服务协议`' p='7' :color="tColor"
					v-model="agree"></mg-agree>
			</view>
		</view>
		<view class="mainc" v-show="showLoading">
			<!-- 切换 -->
			<view class="mt20 bs20">
				<view v-show="params.deliveryMode==2">
					<mg-cell last='1' :color='tColor' :acolor="tColor" :arrow='timearrow'>
						<view slot='bd' class="f-y-c">
							<view class="f-g-0 f30">预计送达时间</view>
							<view v-if="yjTime.length" @click="showTime=true" class="f-g-1">
								<view class="t-r" :style="{color:tColor}">
									<text class="mr15"></text>
									<text>{{yjTime[yjIndex].dayTitle}}{{yjrV.timeTitle}}</text>
								</view>
							</view>
							<view v-if="!yjTime.length&&wmTime.length" class="f-g-1">
								<view class="t-r" :style="{color:tColor}">{{wmTime[wmIndex].timeTitle}}</view>
							</view>
						</view>
					</mg-cell>
				</view>
				<view v-show="params.deliveryMode==1">
					<mg-cell isr="1" v-if="ztTypeArr.length">
						<!-- <mg-radio rtype='2' v-model="params.isOut" :arr='ztTypeArr'></mg-radio> -->
						<view slot='bd' class="f-x-bt">
							<view @click="clickztMode(v)" v-for="(v,i) in ztTypeArr" :key='i' class="pstypec bs10 f-c"
								:style="{color:v.value==params.isOut?tColor:'',borderColor:v.value==params.isOut?tColor:''}">
								<text class="iconfont c3 mr20" :class="[v.icon]"
									:style="{color:v.value==params.isOut?tColor:''}"></text>
								<text class="f32">{{v.name}}</text>
								<view class="yddsj posi-a"
									:style="{borderBottom:v.value==params.isOut?'41rpx solid '+tColor:''}"></view>
								<text v-if="v.value==params.isOut" class="gou posi-a iconfont icongou cf f20"></text>
							</view>
						</view>
					</mg-cell>
					<mg-cell last='1' :color='tColor' :acolor="tColor" :arrow='timearrow'>
						<view slot='bd' class="f-y-c">
							<view class="f-g-0 f30">自取时间</view>
							<view v-if="yjTime.length" @click="showTime=true" class="f-g-1">
								<view class="t-r" :style="{color:tColor}">
									<text class="mr15"></text>
									<text>{{yjTime[yjIndex].dayTitle}}{{yjrV.timeTitle}}</text>
								</view>
							</view>
							<view v-if="!yjTime.length&&wmTime.length" class="f-g-1">
								<view class="t-r" :style="{color:tColor}">{{wmTime[wmIndex].zttimeTitle}}</view>
							</view>
						</view>
					</mg-cell>
				</view>
				<mg-cell v-if="zzsj.open==1" cname="p033 f30">
					<view slot='bd'>
						<view>前面
							<text :style="{color:tColor}">
								<text class="wei">{{zzsj.num}}</text><text>{{zzsj.unit}}</text>
							</text>
							制作中
							<!-- ，预计<text :style="{color:tColor}">14.03</text>送达 -->
						</view>
						<view class="mt20 bf5 jdt bs30 p-r mb10 t-c">
							<view class="p-a h100 bs30"
								:style="{background:tColor,width:(zzsj.proportion>0?zzsj.proportion:2)+'%'}"></view>
						</view>
					</view>
				</mg-cell>
			</view>
			<!-- 商品 -->
			<view class="mt20 p03 bf bs20">
				<mg-cell isl='1' cname='p2 pl0' btt='商品明细' bttc='f30'></mg-cell>
				<mg-cell :isl='i==pcarList.length-1&&1' last="1" v-for="(v,i) in pcarList" :key="i" w='104' h='104'
					brs='12rpx' :img='v.icon' cname='p2 pl0 pr0 la124'>
					<template slot='bd'>
						<view class="f-bt">
							<view class="f-row">
								<view v-if="v.ishd&&v.discountType!=4" class="f-g-0 yhic f18 cf bf5f f-c hdspan">
									{{v.discountType==1?'特':v.discountType==2?'折':v.discountType==5?'赠':'减'}}
								</view>
								<view class="l-h1">{{v.name}}</view>
							</view>
							<view class="f-g-0 f32">
								{{sl+(v.ishd?itemTotal(v.discountPrice,v.spnum):itemTotal(v.money,v.spnum))}}
							</view>
						</view>
						<view v-if="v.ishd&&v.discountType==4" class="f-row cf5f">
							<view class="f20 bs5 b-d p-3-10" :style="{borderColor:'#FF5F2F'}">
								{{v.discountType==4?'第二件打折':'买一送一'}}
							</view>
						</view>
						<view class="f-bt mt10 f24 c9">
							<view class="f-g-1 f-raw">
								<text class="ml10" v-if="v.groupName">{{v.groupName}}</text>
								<text v-if="v.attribute">({{v.attribute}})</text>
								<text class="ml10" v-if="v.materialName">+{{v.materialName}}</text>
							</view>
							<view class="ml10">x{{v.spnum}}</view>
						</view>
					</template>
				</mg-cell>
				<mg-cell v-if="carInfo.getTotal.hyzk>0" last='1' bdmw="180rpx" cname='p15'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f22 cf f-c f-g-0" style="background: #EDA555;">V</view>
						<view>会员折扣</view>
					</view>
					<view slot='ft' class="f32 cf7">{{sl+carInfo.getTotal.hyzk}}</view>
				</mg-cell>
				<mg-cell last="1" cname='p15' btt='商品小计' :ft='`${sl+carInfo.getTotal.spzj}`' ftc='f32 c3'>
				</mg-cell>
				<mg-cell v-if="carInfo.getTotal.bzf>=0" last="1" cname='p15' btt='包装费'>
					<view slot='ft' class="f32 c3">
						<text v-if='params.deliveryMode==1&&params.isOut==1'
							class="mr30 t-d-l f24 c9">{{sl+carInfo.getTotal.bzf}}</text>
						<text>{{sl+xjMoney.bzf}}</text>
					</view>
				</mg-cell>
				<mg-cell v-if="params.deliveryMode==2" last="1" cname='p15'>
					<view slot='bd'>
						<text>配送费</text>
						<text class="c9 f24">（{{carInfo.sjxx&&carInfo.sjxx.shopData.deliveryMode}}）</text>
						<text v-if="orderMuster.isDelivery==1" class="f24" style="color:#8395B1">(会员免配送费)</text>
						<text v-else-if="wmAddress&&wmAddress.fullMoney>0"
							class="c9 f24">(满{{wmAddress.fullMoney}}免配送费)</text>
					</view>
					<view slot='ft' class="f32 c3">
						<text v-if='deliveryPreferential>0&&wmAddress'
							class="mr30 t-d-l f24 c9">{{sl+wmAddress.oldMoney}}</text>
						<text>{{wmAddress?`${sl+xjMoney.psf}`:''}}</text>
					</view>
				</mg-cell>
				<!-- 满减 -->
				<mg-cell v-if="carInfo.mjInfo.mjMoney>0" last="1" cname='p15' :ft='`-${sl+carInfo.mjInfo.mjMoney}`'
					ftc='f32 cf5f'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c">减</view>
						<view>商品满减</view>
					</view>
				</mg-cell>
				<!-- 新客 -->
				<mg-cell v-if="orderMuster.newReduction>0" last='1' cname='p15' :ft='`-${sl+orderMuster.newReduction}`'
					ftc='f32 cf5f'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf b00 f-c">新</view>
						<view>门店新客立减</view>
					</view>
				</mg-cell>
				<!-- 满赠 -->
				<mg-cell v-if="jsInfo.mzInfo.title" last='1' bdmw="180rpx" cname='p15'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c f-g-0">赠</view>
						<view>{{jsInfo.mzInfo.name}}</view>
					</view>
					<view slot='ft' class="cf5f">{{jsInfo.mzInfo.title}}</view>
				</mg-cell>
				<!-- 满返 -->
				<mg-cell v-if="jsInfo.mfInfo.title" last='1' bdmw="180rpx" cname='p15'>
					<view slot='bd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c f-g-0">返</view>
						<view>{{jsInfo.mfInfo.name}}</view>
					</view>
					<view slot='ft' class="cf5f">{{jsInfo.mfInfo.title}}</view>
				</mg-cell>
				<!-- 店铺优惠券  -->
				<mg-cell v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1" @tab="tzxqyhq(1)" last='1'
					cname='p15' :color="kyhb.dpyhq.n>0?tColor:''" arrow='1'>
					<view slot='hd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c">券</view>
						<view>门店代金券</view>
					</view>
					<view slot='ft'>
						<text v-if='couponInfo.store' class="f32 cf5f"
							>-{{sl+yhqPreferential.store}}</text>
						<view v-else-if='kyhb.dpyhq.n>0' class="hongbao bs5 f20 f-y-c"><text
								class="iconfont iconhb cf mr10 f26"></text>{{kyhb.dpyhq.n}}个可用</view>
						<view v-else-if='kyhb.dpyhq.n==0' class="f24 f-y-c">暂无可用</view>
					</view>
				</mg-cell>
				<!-- 平台优惠券 -->
				<mg-cell v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1" @tab="tzxqyhq(2)" last='1'
					cname='p15' :color="kyhb.ptyhq.n>0?tColor:''" arrow='1'>
					<view slot='hd' class="f-y-c">
						<view class="yhic f18 cf bf5f f-c">券</view>
						<view>{{system.custom.systemRedbag}}</view>
					</view>
					<view slot='ft'>
						<text v-if='couponInfo.platform' class="f32 cf5f"
							>-{{sl+yhqPreferential.platform}}</text>
						<view v-else-if='kyhb.ptyhq.n>0' class="hongbao bs5 f20 f-y-c"><text
								class="iconfont iconhb cf mr10 f26"></text>{{kyhb.ptyhq.n}}个可用</view>
						<view v-else-if='kyhb.ptyhq.n==0' class="f24 f-y-c">暂无可用</view>
					</view>
				</mg-cell>
				<mg-cell isl='1' cname='p15'>
					<view @click="showyhgz=true" slot='bd' class="f-y-c c9 f24">优惠说明<text
							class="iconfont iconwen f20 c9 ml10"></text></view>
					<view slot='ft' class="ml10 c3"><text class="f24">共{{carInfo.getTotal.num}}件商品</text><text
							class="m02">小计</text><text class="f34">{{sl}}{{xjMoney.total||0}}</text></view>
				</mg-cell>
				<mg-cell v-if="system.taxRatio>0" isl='1' cname='p15'>
					<view slot='bd' class="f-y-c">税率<text class="ml10 c6 f24">({{system.taxRatio}}%)</text></view>
					<view slot='ft' class="f32 c3">+{{sl+(xjMoney.slje||0)}}</view>
				</mg-cell>
			</view>
			<!-- 超值换购 -->
			<view v-if="orderMuster.changePay&&orderMuster.changePay.goodsArr&&orderMuster.changePay.goodsArr.length"
				class="mt20 p30 bf bs20">
				<view class="p03 mb10 f-y-c">
					<view class="yhic f18 cf bf5f f-c">换</view>
					<view class="">超值换购</view>
					<view v-show="hgInfo.id&&hgInfo.price>hgInfo.money" class="ml20 f22 c9">
						商品最多可为您节省{{sl+blxs(hgInfo.price-hgInfo.money)}}</view>
				</view>
				<view class='bf f-row o-x-s p13'>
					<view @click="xzhg(v)" class="bf f-g-0 hgic mr30 bs15 b-s-4 f-row p-r"
						v-for="(v,i) in orderMuster.changePay.goodsArr" :key='i'>
						<view class="hgimg">
							<mg-img :src="v.icon"></mg-img>
							<view class="p-a spzk t0 f18 cf bf5f l-n ">{{Number((v.money/v.price*10).toFixed(2))}}折
							</view>
						</view>
						<view class='f-1 f-y-bt p-10-15 f24'>
							<view class="t-o-e">{{v.name}}</view>
							<view class="f-y-c">
								<view class="f-1 t-o-e f22">{{sl}}<text class="f28">{{v.money}}</text><text
										class="t-d-l ml10">{{sl+v.price}}</text></view>
								<text class="iconfont icongx f38 ce mt0 ml10" :class="{'cf5f':hgInfo.id==v.id}"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- -->
			<view class="mt20 p03 bf bs20">
				<mg-cell @tab="go({t:1,url:'/yb_wm/shop/out/bz?note='+params.userNote})" isl='1' cname='p30' btt='备注'
					bttc="f30" bdmw='100rpx' :ft="params.userNote||'请填写你的其他要求'" arrow='1'></mg-cell>
			</view>
		</view>
		<view class="dbbtnc" :style="{bottom: isIpx?'40rpx':0}">
			<view class="dbbtn">
				<view class="f-g-1 lt f-c-xc">
					<view class=""><text class="mr10">合计</text><text class="f36">{{sl}}{{jsInfo.hjMoney||0}}</text>
					</view>
					<view class="f-y-c f22 c9">
						<view>为您节省</view>
						<view>{{sl}}{{jsInfo.yhzj||0}}</view>
					</view>
				</view>
				<button :disabled="loading" :loading="loading" @click="ljzf" class="rt f-c"
					:style="{background:tColor}">立即支付</button>
			</view>
		</view>
		<view v-if="isIpx" class='bgf'></view>
		<mg-popup v-model="showTime">
			<view v-if="yjTime.length" class="bf">
				<view class="f-c p253 f30 b-b-e">选择{{params.deliveryMode=='1'?'自取':'预计送达'}}时间</view>
				<view class="f-row" style="height: 450rpx;">
					<scroll-view scroll-y="true" class="f-g-0" style="width: 250rpx;background: #F2F2F2;">
						<view @click="yjlClick(i)" v-for="(v,i) in yjTime" :key='i' class="p253 f-c"
							:class="{'bf':yjIndex==i,'c6':yjIndex!=i}">{{v.dayTitle}}</view>
					</scroll-view>
					<scroll-view :scroll-into-view="rsiv" scroll-y="true" class="f-g-1">
						<view @click="yjrClick(v)" :id="'r'+i" v-for="(v,i) in yjTime[yjIndex].time" :key='i'
							class="p253 f-x-bt" :style="{color:yjrV.time==v.time?tColor:''}">
							<view>{{v.timeTitle}}</view>
							<icon v-if="yjrV.time==v.time" type="success" :color='tColor' size="22" />
						</view>
					</scroll-view>
				</view>
				<view @click="showTime=false" class="f-c p253 f30 b-t-e">取消</view>
			</view>
		</mg-popup>
		<!-- 优惠规则 -->
		<mg-modal :ismr="true" v-model="showyhgz" width="630rpx" :z-index="3000">
			<view class="bf bs10">
				<view class="p3 c9">
					<view class="t-c f32 c0 mb20">优惠规则详情</view>
					<view v-if="carInfo.mjInfo.mjMoney>0" class="p10 f-y-c">
						<view class="f-1">满减</view>
						<view>-{{sl+carInfo.mjInfo.mjMoney}}</view>
					</view>
					<view v-if="orderMuster.newReduction>0" class="p10 f-y-c">
						<view class="f-1">新客立减</view>
						<view>-{{`${sl+orderMuster.newReduction}`}}</view>
					</view>
					<view class="p10 f-y-c">
						<view class="f-1">门店代金券抵扣</view>
						<view>-{{`${sl+yhqPreferential.store}`}}</view>
					</view>
					<view class="p10 f-y-c">
						<view class="f-1">{{system.custom.systemRedbag}}抵扣</view>
						<view>-{{`${sl+yhqPreferential.platform}`}}</view>
					</view>
					<view v-if="carInfo.getTotal.hyzk>0" class="p10 f-y-c">
						<view class="f-1">会员折扣</view>
						<view>-{{`${sl+carInfo.getTotal.hyzk}`}}</view>
					</view>
					<view v-if="params.deliveryMode==1&&params.isOut==1" class="p10 f-y-c">
						<view class="f-1">包装费优惠</view>
						<view>-{{`${sl+carInfo.getTotal.bzf}`}}</view>
					</view>
					<view v-if="params.deliveryMode==2&&deliveryPreferential>0" class="p10 f-y-c">
						<view class="f-1">配送费优惠</view>
						<view>-{{`${sl+deliveryPreferential}`}}</view>
					</view>
					<view class="p10 f-y-c c0">
						<view class="f-1">总计</view>
						<view>-{{`${sl+jsInfo.yhzj}`}}</view>
					</view>
				</view>
				<view class="hlt" style="height: 100rpx;">
					<button hover-class='be' class="tcbtn f-1 bf h100 f28 f-c cf70"
						@click.stop="showyhgz=false">我知道了</button>
				</view>
			</view>
		</mg-modal>
		<mg-modal :ismr="true" v-model="showqrtc" width="600rpx" :z-index="1000">
			<view class="qrtcc">
			<!-- 	<view class="img ma p-r">
					<mg-img :src='`${onImgurl}qrdd.png`'></mg-img>
				</view> -->
				<view class="bf qrtc">
					<view class="f-c-c">
						<view class="f32 wei c0">请确认{{params.deliveryMode==1?'自取门店':'下单信息'}}</view>
						<view class="f22 mt10 cgt hlb c9">支付成功后，下单门店将无法进行修改!</view>
					</view>
					<view class="p3040">
						<block v-if="params.deliveryMode==1">
							<view class="flex">
								<view class="f-0">
									<text class="iconfont iconlocation mr10 f28 wei"></text>
								</view>
								<view class="f-1">
									<view class="">
										<view class="f28 wei c0">{{carInfo.sjxx.shopData.name}}</view>
										<view class="f28 c9 mt10">
											{{carInfo.sjxx.moreSet.address}}<text class="jubj f22 ml0">距您</text><text class="jubj f22">{{storeInfo.distance}}</text>
										</view>
									</view>
								</view>
							</view>
						</block>
						<block v-if="params.deliveryMode==2">
							<view class="f-1">
								<view class="c9 f24 mt10">配送地址</view>
								<view class="f28 wei mt10">{{wmAddress.address+wmAddress.details}}</view>
								<view class="f24 c9 mt10">
									{{`${wmAddress.userName}(${wmAddress.sex}) ${wmAddress.userTel}`}}
								</view>
								<view class="c9 f24 mt30">配送门店</view>
								<view class="f28 wei c0 mt10">{{carInfo.sjxx.shopData.name}}</view>
								<view class="f24 c9 mt10"><text class="iconfont iconlocation mr10 f24"></text>{{carInfo.sjxx.shopData.address}}</view>
							</view>
						<!-- 	<view class="hll" style="padding-left: 30rpx;">
								<view class="iconfont iconddys f46" style="color: #8C94A5;"></view>
							</view> -->
						</block>
					</view>
					<!-- <view @click="showqrtc=false" class="t-c mb50" style="color: #183162;">[返回修改]</view> -->
					<view class="flex dbbutton mt20">
						<view class="f-1 btnri">
							<button @click="showqrtc=false"  class="f30 btn p20 c0">返回修改</button>
						</view>
						<view class="f-1">
							<button @click="ljzf" :disabled="loading" :loading="loading" class="f30 btn p20" :style="{color:tColor}">就是这家</button>
						</view>
					</view>
				</view>
			</view>
		</mg-modal>
		<subscribe-msg />
		<!-- <load v-if="showLoading"></load> -->
	</view>
</template>

<script>
	import getAddress from '@/components/address/get-address.vue'
	import getZtd from '@/components/address/get-ztd.vue'
	import uniNoticeBar from '@/components/third/uni-notice-bar.vue'
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	import mgPopup from '@/components/common/popup.vue'
	import bkB from '@/components/common/block-b.vue'
	import sqBtn from '@/components/common/sq-btn.vue'
	import mgRadio from '@/components/form/mg-radio.vue'
	import mgAgree from '@/components/form/mg-agree.vue'
	import mgModal from '@/components/common/modal.vue'
	import load from '@/components/common/load.vue'
	let app = getApp().globalData
	export default {
		name: 'pay-order',
		components: {
			getAddress,
			getZtd,
			uniNoticeBar,
			mgPopup,
			bkB,
			sqBtn,
			mgRadio,
			mgAgree,
			mgModal,
			load,
		},
		data() {
			return {
				showLoading: false,
				closePay: false,
				showPay: false,
				carInfo: {},
				pcarList: [],
				ModeArr: [],
				wmAddress: '',
				params: {
					// goodsArr: [],
					storeId: '',
					userAddId: '',
					deliveryMode: '2', //自提传1 其他不传
					serviceAt: '', //送达时间
					appointment: '', //1预约
					serviceTime: '', //预约时间
					userTel: '', //自取手机号
					couponId: {
						store: '',
						platform: '',
					}, //优惠券ID
					userNote: '',
					isOut: '',
					changeId: '',
					changeGoodsId: '',
				},
				loading: false,
				payObj: {},
				showTime: false,
				wmIndex: 0,
				wmTime: [],
				yjIndex: 0,
				yjTime: [],
				rsiv: '',
				yjrV: {},
				deliveryPreferential: 0, //配送费优惠
				yhqPreferential: {
					store: 0,
					platform: 0,
				}, //优惠券优惠
				kyhb: {
					dpyhq: {
						n: 0,
						data: []
					},
					ptyhq: {
						n: 0,
						data: []
					}
				},
				couponInfo: {
					store: '',
					platform: '',
				},
				orderMuster: {}, //下单必查
				ztTypeArr: [],
				agree: true,
				showyhgz: false,
				hgInfo: {},
				zzsj: {},
				showqrtc: false,
			}
		},
		async onLoad() {
			// return
			this.getSystem()
			this.util.setNT('提交订单')
			this.carInfo = uni.getStorageSync('carInfo')
			let arr = []
			for (let i in this.carInfo.carList) {
				if (this.carInfo.carList[i].originalNum > 0) {
					arr.push(Object.assign({
						ishd: 0,
						spnum: this.carInfo.carList[i].originalNum
					}, this.carInfo.carList[i]))
				}
				if (this.carInfo.carList[i].discountNum > 0) {
					arr.push(Object.assign({
						ishd: 1,
						spnum: this.carInfo.carList[i].discountNum
					}, this.carInfo.carList[i]))
				}
			}
			this.pcarList = arr
			// console.log(arr)
			this.params.storeId = this.carInfo.sjxx.shopData.id
			this.params.userTel = this.user.userTel
			// console.log('carInfo', this.carInfo)
			//点单页是否选择地址
			this.wmAddress = app.xzdzInfo || ''
			console.log('this.wmAddress', this.wmAddress)
			//订单设置
			this.getOrderset()
			//获取waim地址
			this.getWmAddress()
			//下单集合接口
			this.getOrderMuster()
			//获取可用红包
			this.getyhqArr()
			//监听事件
			uni.$on('payorder', (e) => {
				if (e.hasOwnProperty('hbInfo')) {
					if (e.type == 1) {
						this.couponInfo.store = e.hbInfo || ''
						this.params.couponId.store = this.couponInfo.store ? this.couponInfo.store.id : ''
					} else if (e.type == 2) {
						this.couponInfo.platform = e.hbInfo || ''
						this.params.couponId.platform = this.couponInfo.platform ? this.couponInfo.platform
							.id : ''
					}
				}
				console.log('payorderEl', e)
			})
			setTimeout(() => {
				this.isOnLoad = true
			})
		},
		onUnload() {
			// console.log('onUnload')
			// 移除监听事件  
			uni.$off('payorder');
		},
		onShow() {
			if (this.isOnLoad) {
				this.util.showLoading()
				this.refreshAddress(app.xzdzInfo)
				if (app.xzdzInfo) {
					console.log('选择了地址')
				} else {
					console.log('没地址')
				}
			}
			// console.log('pay-order onShow', 'addresInfo', app.xzdzInfo, uni.getStorageSync('bdhc'))
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				orderset: state => state.config.orderset,
				storeInfo: state => state.config.storeInfo,
			}),
			...mapState('dndc', ['latLng']),
			xjMoney() {
				if (this.carInfo.carPrice) {
					let spjmj = +(this.carInfo.getTotal.spzj - this.carInfo.mjInfo.mjMoney).toFixed(2), //商品总金额先减掉满减
						newReduction = this.orderMuster.newReduction || 0 //新客金额
					let yhqMoney = 0, //优惠券
						ptqMoney = 0
					if (this.couponInfo.store && (this.orderMuster.newReduction <= 0 || this.orderMuster.newandcoupon ==
							1)) { //新客=0或者新客立减和优惠券可以一起用
						if (this.couponInfo.store.type == 1 || this.couponInfo.store.type == 3) {
							yhqMoney = +this.couponInfo.store.money || 0
						} else if (this.couponInfo.store.type == 2) {
							// yhqMoney = +(spjmj - utils.nsswr(spjmj * this.couponInfo.store.discount / 10)).toFixed(2) //后台是截取保留2位
							yhqMoney = +this.couponInfo.store.money
						}
						yhqMoney < 0 && (yhqMoney = 0)
						// console.log(yhqMoney)
					}
					if (this.couponInfo.platform && (this.orderMuster.newReduction <= 0 || this.orderMuster.newandcoupon ==
							1)) { //新客=0或者新客立减和优惠券可以一起用
						if (this.couponInfo.platform.type == 1) {
							ptqMoney = +this.couponInfo.platform.money || 0
						} else if (this.couponInfo.platform.type == 2) {
							ptqMoney = +this.couponInfo.platform.money
						}
						ptqMoney < 0 && (ptqMoney = 0)
					}
					let psf = +(this.wmAddress && this.wmAddress.deliveryMoney || 0), //配送费金额
						bzf = this.carInfo.getTotal.bzf, //包装费金额
						total = 0,
						slje = 0,
						jpsfqMoney = +(spjmj - yhqMoney - ptqMoney - newReduction).toFixed(2) //计算满减配送费前，所有优惠算完了的金额
					this.deliveryPreferential = 0 //因为可以选优惠券，所以这里重新赋值
					if (this.params.deliveryMode == 1) {
						psf = 0
						if (this.params.isOut == 1) {
							bzf = 0
						}
					} else {
						if (this.wmAddress) {
							this.deliveryPreferential = this.wmAddress.discount
						}
					}
					jpsfqMoney <= 0 && (jpsfqMoney = 0.01)
					//配送费是最后加，不参与任何优惠,+包装费
					total = +(jpsfqMoney + psf + bzf).toFixed(2)
					total <= 0 && (total = 0.01)
					this.yhqPreferential.store = yhqMoney
					this.yhqPreferential.platform = ptqMoney
					//税率
					if (this.system.taxRatio > 0) {
						slje = +(total * (this.system.taxRatio / 100)).toFixed(2)
					}
					// console.log(total, psf, slje)
					return {
						total,
						psf,
						slje,
						bzf,
					}
				}
			},
			jsInfo() {
				if (this.carInfo.carPrice) {
					//优惠价格=购物车原价+应付配送费的钱-实付的钱
					let yhzj = this.carInfo.getTotal.total + (this.params.deliveryMode == 2 && this.wmAddress ? Number(this
							.deliveryPreferential >
							0 ? this.wmAddress.oldMoney : this.wmAddress.deliveryMoney) : 0) - this.xjMoney.total,
						hjMoney = this.xjMoney.total + this.xjMoney.slje,
						mzInfo = {}, //满赠
						mfInfo = {} //满返
					yhzj += this.carInfo.getTotal.hyzk
					let mzitem = this.carInfo.sjxx.discount.give.moneyArr && this.carInfo.sjxx.discount.give.moneyArr.find(
						v =>
						this.xjMoney.total >= v.fullMoney)
					mzitem && (mzInfo = {
						name: '满赠优惠',
						title: `${mzitem.give}`
					})
					if (this.xjMoney.total >= this.carInfo.sjxx.discount.grantCoupon.orderMoney) {
						mfInfo = {
							name: `满返门店代金券`,
							title: this.carInfo.sjxx.discount.grantCoupon.name
						}
					}
					if (this.hgInfo.id) {
						hjMoney = +this.hgInfo.money + hjMoney
					}
					// console.log(this.carInfo.sjxx.discount.give, mzitem, mzInfo, hjMoney)
					return {
						yhzj: +yhzj.toFixed(2),
						hjMoney: +(hjMoney).toFixed(2),
						mzInfo,
						mfInfo,
					}
				}
			},
			timearrow() {
				return this.yjTime.length
			},
			appointment() {
				return this.yjrV.timeTitle && this.yjrV.timeTitle.indexOf('现在下单') == -1
			},
			ljsctext() {
				if (this.params.deliveryMode == 1) {
					return this.yjrV.timeTitle ? '立即自取' || `${this.yjrV.timeTitle.substring(4,9)}` : ''
				} else {
					return this.yjrV.timeTitle ? `约${this.yjrV.timeTitle.substring(4,9)}送达` : ''
				}
			},
		},
		methods: {
			...mapActions(["getConfig"]),
			...mapMutations(["setScarList"]),
			clickMode(v) {
				if (v.value == this.params.deliveryMode) return
				this.util.showLoading('设置中...')
				this.params.deliveryMode = v.value
				this.getWmAddress()
				// console.log(v, this.params)
			},
			clickztMode(v) {
				this.params.isOut = v.value
			},
			setTel(e) {
				this.params.userTel = e
			},
			async getOrderset() {
				let data = this.carInfo.sjxx.moreSet,
					support = this.carInfo.sjxx.outSet
				//设置配送选项数组
				if (support.includes('2')) {
					this.ModeArr.push({
						icon: 'iconmd',
						name: data.selfName,
						value: '1',
					})
				}
				if (support.includes('1')) {
					this.ModeArr.push({
						icon: 'iconps',
						name: data.outName,
						value: '2',
					})
				}
				if (support.length == 2 && this.carInfo.sjxx.moreSet.auto == 2) { //2外卖优先
					this.ModeArr.reverse()
				}
				this.params.deliveryMode = this.carInfo.buyType == 1 ? 2 : 1
				//设置自提类型
				if (data.diningType.includes('1')) {
					this.ztTypeArr.push({
						value: '1',
						name: this.system.custom.dnjc || '店内就餐',
						icon: 'icondianneitubiao f36',
					})
				}
				if (data.diningType.includes('2')) {
					this.ztTypeArr.push({
						value: '2',
						name: this.system.custom.dbdz || '打包带走',
						icon: 'icondabao f42',
					})
				}
				this.ztTypeArr[0] && (this.params.isOut = this.ztTypeArr[0].value)
				this.getConfig({
					key: 'orderset',
					api: 'ddsz',
				}).then(() => {
					uni.setStorageSync('fwb', this.orderset.selfAgreement)
				})
				// console.log('getOrdersetgetOrderset')
			},
			tzxqyhq(t) {
				// console.log(this.kyhb)
				// return
				if (t == 1) {
					uni.setStorageSync('kyhb', this.kyhb.dpyhq)
					this.go({
						t: 1,
						url: '/yb_wm/my/coupon/use-coupon?t=1&name=门店代金券&couponId=' + this.params.couponId.store
					})
				} else if (t == 2) {
					uni.setStorageSync('kyhb', this.kyhb.ptyhq)
					this.go({
						t: 1,
						url: '/yb_wm/my/coupon/use-coupon?t=2&name=' + this.system.custom.systemRedbag +
							'&couponId=' + this.params.couponId
							.platform
					})
				}
			},
			async getyhqArr() {
				uni.setStorageSync('kyhb', {
					n: 0,
					data: []
				})
				let arr = await Promise.all([this.util.request({
					'url': this.api.kyyhq,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
						type: 1,
						storeType: 1,
					}
				}), this.util.request({
					'url': this.api.kyyhq,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
						type: 1,
						storeType: 2,
					}
				})])
				this.kyhb = {
					dpyhq: {
						n: arr[0].data.length,
						data: arr[0].data,
					},
					ptyhq: {
						n: arr[1].data.length,
						data: arr[1].data,
					},
				}
				// console.log(arr)
				uni.hideLoading()
			},
			async getOrderMuster() {
				let {
					data
				} = await this.util.request({
					'url': this.api.wmxdbd,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
						userId: this.uId,
					}
				})
				this.orderMuster = data || {
					newReduction: 0
				}
				this.getZzsj()
			},
			async getZzsj() {
				let {
					data
				} = await this.util.request({
					'url': this.api.zzsj,
					method: 'POST',
					data: {
						storeId: this.params.storeId,
					}
				})
				this.util.message(`请确认下单门店是否为[${this.storeInfo.name}]`,3,3000)
				this.zzsj = data
			},
			//判断收货地址起送价
			checkQsj() {
				if (this.wmAddress && +this.wmAddress.startMoney > this.carInfo.getTotal.total) {
					uni.showModal({
						title: '提示',
						content: `您的商品总计金额${this.sl+this.carInfo.getTotal.total}，未达到此收货地址的起送价${this.sl+this.wmAddress.startMoney}`,
						showCancel: false,
						success: (res) => {
							let lastPage = this.util.getPage()
							lastPage.$vm.startMoney = this.wmAddress.startMoney
							this.go({
								t: 4
							})
						}
					});
				}
				// console.log('checkQsj', this.wmAddress, this.carInfo.getTotal.total)
			},
			//选择地址后触发
			refreshAddress(e) {
				this.wmAddress = e || ''
				this.getZzsj()
				this.getWmAddress()
			},
			async getWmAddress() {
				// console.log('getWmAddressgetWmAddress')
				if (this.params.deliveryMode == 2) {
					let res
					if (!this.wmAddress.id) {
						res = await this.util.request({
							'url': this.api.xzshdz,
							// mask: 1,
							method: 'POST',
							data: {
								storeId: this.carInfo.sjxx.shopData.id,
								lat: this.latLng.lat,
								lng: this.latLng.lng,
							}
						})
					} else {
						res = await this.util.request({
							'url': this.api.xzshdz,
							method: 'POST',
							data: {
								storeId: this.carInfo.sjxx.shopData.id,
								addressId: this.wmAddress.id,
								lat: this.latLng.lat,
								lng: this.latLng.lng,
							}
						})
					}
					this.wmAddress = res && res.data || ''
					if (!res) {
						this.$refs.getaddress.goChoose();
					}
				}
				if (this.wmAddress) { //查到外卖地址
					this.params.userAddId = this.wmAddress.id
					// console.log(this.params.deliveryMode)
					if (this.params.deliveryMode == 2) {
						this.checkQsj()
						//获取预计时间
						this.getyjTime(this.params.userAddId)
					} else {
						this.getyjTime()
					}
				} else {
					this.params.userAddId = ''
					this.getyjTime()
				}
				this.getZzsj()
				this.showLoading = true
				// console.log(res)
			},
			async getyjTime(userAddId = '') {
				this.yjIndex = 0
				let {
					data
				} = await this.util.request({
					'url': this.api.wmxzsj,
					data: {
						userAddId,
						storeId: this.params.storeId,
						orderType: this.params.deliveryMode == 1 ? 2 : 1,
					}
				})
				if (data[0]) {
					this.yjrV = data[0].time[0]
				} else {
					uni.showModal({
						title: '提示',
						content: '此商家营业时间或预约单设置不合理，无有效的供用户选择的时间，无法下单',
						showCancel: false,
						success: (res) => {
							this.go({
								t: 4
							})
						}
					})
				}
				uni.hideLoading()
				// console.log('yjTime', data)
				this.yjTime = data
			},
			yjlClick(i) {
				this.yjIndex = i
				this.rsiv = `r`
				setTimeout(() => {
					this.rsiv = `r${Object.keys(this.yjTime[i].time)[0]}`
				}, 10)
			},
			yjrClick(v) {
				this.yjrV = v
				console.log(v)
				setTimeout(() => {
					this.showTime = false
				}, 200)
			},
			itemTotal(m, n) {
				return (m * n).toFixed(2)
			},
			xzhg(v) {
				this.hgInfo = v.id == this.hgInfo.id ? {} : v
			},
			//
			async ljzf() {
				// console.log(this.wmAddress)
				if (!this.yjrV.time) return this.util.message('请选择时间', 3)
				if (this.params.deliveryMode == 2) {
					if (!this.params.userAddId) {
						return this.$refs.getaddress.goChoose();
					}
				} else {
					if (!utils.isTelCode(this.params.userTel)) {
						return this.util.message('请输入合理的预留手机号', 3)
					} else if (!this.agree) {
						return this.util.message('请阅读并同意服务协议', 3)
					}
				}
				if (this.orderset.confirmSwitch == 1 && !this.showqrtc) {
					return this.showqrtc = true
				}
				this.loading = true
				if (!this.jjmbxx) {
					try {
						await this.requestSM('saveOrder')
					} catch (e) {
						this.jjmbxx = true
						this.loading = false
						return
					}
				}
				//换购
				if (this.hgInfo.id) {
					this.params.changeId = this.orderMuster.changePay.id
					this.params.changeGoodsId = this.hgInfo.id
				}
				this.params.serviceAt = this.yjrV.timeTitle.indexOf('现在下单') == -1 ? this.yjTime[this.yjIndex]
					.dayTitle + ' ' +
					this.yjrV.timeTitle : this.yjrV.timeTitle
				this.params.serviceTime = this.yjrV.time
				this.params.appointment = this.appointment ? 1 : ''
				this.params.appointment != 1 && (this.params.serviceAt = this.params.serviceAt.substr(4))
				// console.log(this.params)
				// return
				let orderRes = await this.util.request({
					'url': this.api['wmxd'],
					method: 'POST',
					ct: 1,
					mask: '下单中',
					data: this.params,
				})
				// console.log('ljzf orderRes', orderRes)
				if (orderRes) {
					// this.util.message('下单成功', 1)
					let lastPage = this.util.getPage()
					lastPage.$vm.refreshInfo() //刷新点单页数据
					this.go({
						t: 2,
						url: '/yb_wm/other/mg-pay?payObj=' + encodeURIComponent(JSON.stringify({
							orderId: orderRes.data,
							orderType: 1,
							info: {
								money: this.jsInfo.hjMoney,
								storeName: this.carInfo.sjxx.shopData.name,
								type: "下单支付",
								go: {
									t: 6,
									url: "/yb_wm/index/order-index"
								},
							}
						}))
					})
					uni.setStorageSync('note', this.params.userNote)
				} else {
					this.loading = false
				}
			},
		},
		async created() {},
	}
</script>
<style>
	.p15 {
		padding: 12rpx 0;
	}
</style>
<style scoped lang="scss">
	.cf7 {
		color: #EDA555;
	}

	.header {
		// padding-bottom: 55rpx;

		.psmsc {
			right: 30rpx;
			top: 26rpx;
			height: 66rpx;
			padding: 0 6rpx;
			border-radius: 60rpx;

			.psms {
				border-radius: 66rpx;
				height: 56rpx;
				padding: 0 10rpx;
				min-width: 90rpx;
			}
		}
	}

	.pstypec {
		width: 330rpx;
		height: 95rpx;
		border: 1rpx solid #333;
		position: relative;
	}

	.yddsj {
		right: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-bottom: 41rpx solid #fff;
		border-left: 46rpx solid transparent;
	}

	.gou {
		right: 4rpx;
		bottom: 3rpx;
	}

	.mainc {
		padding: 0 0rpx;
		// margin-top: -55rpx;
	}

	.bs20 {
		border-radius: 0;
	}

	.hdwith {
		width: 100rpx;
	}

	.dbbtnc {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 0rpx;
		// background: rgba(255, 255, 255, 0.2);

		.dbbtn {
			height: 104rpx;
			border-radius: 0rpx;
			overflow: hidden;
			display: flex;
			box-shadow: 0rpx 8rpx 18rpx 5rpx rgba(221, 221, 221, 0.9);

			.lt {
				color: #333;
				padding: 0 30rpx 0 30rpx;
				background: #fff;
			}

			.rt {
				color: #fff;
				width: 179rpx;
				height: 100%;
				border-radius: 0;
				font-size: 28rpx;
				padding: 0;
			}
		}
	}

	.mt20 {
		margin-top: 18rpx;
	}

	.hgic {
		width: 382rpx;
		height: 140rpx;

		.hgimg {
			width: 140rpx;
			height: 140rpx;
		}

		.spzk {
			border-bottom-right-radius: 15rpx;
			padding: 5rpx 14rpx;
		}
	}

	.jdt {
		height: 28rpx;
	}

	.qrtcc {
		.img {
			margin-bottom: -70rpx;
			width: 220rpx;
			height: 140rpx;
		}

		.qrtc {
			padding: 20rpx 0rpx 0rpx;
			border-radius: 25rpx;

			.btn {
				width: 100%;
				background: #fff;
			}

			.cgt {
				padding-bottom: 36rpx;
			}
			.p3040{
				padding: 20rpx 40rpx;
			}
		}
		.dbbutton{
			border-top: 2rpx solid #E3E3E3;
			.btnri{
				border-right: 2rpx solid #E3E3E3;
			}
		}
	}

	.hdspan {
		margin-top: 8rpx;
	}
	.jubj{
		color: #67c23a;
		background: #f0f9eb;
		padding: 6rpx;
	}
</style>
