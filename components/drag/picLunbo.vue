<template>
	<view class="" v-if="list.length" :class="co.class" :style="{
				margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`,
			}">
		<swiper class="swiper" :duration="co.duration" :style="{height:`${u=='px'?getSjgd(co.height):co.height}${u}`,borderRadius:`${co.circle}${u}`,}"
		 :indicator-dots="list.length>1" circular="true" indicator-color="#ccc" indicator-active-color="#fff" :autoplay="co.auto||true"
		 :interval="5000" duration="500">
			<block v-for="(v,i) in list" :key='i'>
				<swiper-item>
					<!-- #ifdef MP-WEIXIN
					<navigator wx:if="{{item.mini.type=='mini'}}" target='miniProgram' app-id='{{item.mini.url}}' class='wh'>
						<image mode="{{co.mode}}" src="{{item.url}}" class="wh" />
					</navigator>
					#endif  :style="{borderRadius:`${co.radius}${u}`,}" -->
					<view class='wh o-h' @click="goTo(i)">
						<mg-img :src='v.img||v.url' />
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'picLunbo',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			storeInfo: {
				type: Object,
				default: function() {
					return {}
				},
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
				StoreAd: []
			}
		},
		computed: {
			list() {
				if (this.co.reverseThree != 1) {
					return this.co.imgUrl || []
				} else {
					return this.StoreAd
				}
			},
		},
		watch: {
			storeInfo: {
				async handler(newVal) {
					if (this.storeInfo.id && this.co.reverseThree == 1) {
						let {
							data
						} = await this.util.request({
							'url': this.api.StoreAd,
							data: {
								type: 1,
								storeId: this.storeInfo.id,
							}
						})
						this.StoreAd = data
					}
					// console.log('newVal', newVal)
				},
				immediate: true
			},
		},
		methods: {
			goTo(i) {
				let d = this.list[i]
				if (d.url) {
					this.goUrl(d.url, d)
				} else if (d.link) {
					switch (d.link.type) {
						case 'webUrl':
							this.go({
								t: 1,
								url: '/yb_o2o/other/web-view?src=' + encodeURIComponent(JSON.stringify(d.link.url))
							})
							break;
						case 'miniUrl':
							uni.navigateTo({
								url: d.link.url,
							})
							break;
						case 'mini':
							uni.navigateToMiniProgram({
								appId: d.link.url,
								path: d.link.xcx_name,
							})
							break
					}
				}
			}
		},
		// created() {
		// 	console.log(this.co)
		// }
	}
</script>

<style scoped lang="scss">
	.swiper {
		width: 100%;
		height: 350rpx;
		overflow: hidden;
		transform: translateY(0)
	}
</style>
