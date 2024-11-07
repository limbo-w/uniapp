<template>
	<view v-if="!hasKp&&co.status==1" class="open">
		<block v-if="co.type==1">
			<view class="posi-f wh t0" style="z-index:9998">
				<picLunbo-by :co='swiper' u='vh' :color='tColor'></picLunbo-by>
				<view v-if="co.pageCategory!=0" @click="tg" class='posi-a f-c countC cf'>{{second}} 跳过</view>
			</view>
		</block>
		<block v-else>
			<mg-popup v-model="show" :close='false' :mask="true" :msname='{background:`rgba(${cTR(co.colorBg)},${co.percent/100})`}'
			 dhsj='0.8s'>
				<view class="tcggc h100v f-c-c">
					<view class="tcgg">
						<picLunbo-by :co='swiper2' u='rpx' :color='tColor'></picLunbo-by>
						<view @click="gbtc" class="tcbtm f-c"><text class="iconfont iconx2 cf"></text></view>
					</view>
				</view>
			</mg-popup>
		</block>
	</view>
</template>
<script>
	import {
		mapActions,
		mapState
	} from 'vuex';
	import mgPopup from '@/components/common/popup.vue'
	import picLunboBy from '@/components/drag/picLunbo.vue';
	import {
		utilMixins
	} from "@/common/util-mixins.js"
	export default {
		name: 'open',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		components: {
			mgPopup,
			picLunboBy,
		},
		data() {
			return {
				swiper: {
					imgUrl: [],
					height: '100',
				},
				second: '',
				show: false,
				swiper2: {
					imgUrl: [],
					height: '700',
					circle: '30'
				},
			};
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				hasKp: state => state.config.hasKp,
			})
		},
		methods: {
			...mapActions(["getConfig"]),
			gbtc() {
				this.show = false
				setTimeout(() => {
					this.tg()
				}, 800)
			},
			tg() {
				this.getConfig({
					key: 'hasKp',
					data: true,
				})
				// if (this.system.decorationModel == 1) {
				// 	this.go({
				// 		t: 3,
				// 		url: '/yb_cy/shop/goods'
				// 	})
				// } else if (this.system.decorationModel == 3 && !this.query.notg) {
				// 	this.go({
				// 		t: 3,
				// 		url: '/yb_cy/shop/select'
				// 	})
				// }
				clearInterval(this.dsq)
			},
		},
		created() {
			// console.log('open', this.co)
			if (this.co.status == 1 && !this.hasKp) {
				if (this.co.type == 1) {
					this.swiper.imgUrl = this.co.imgUrl
					this.second = +this.co.times || 5
					this.dsq = setInterval(() => {
						this.second--
						if (this.second <= 0) {
							this.tg()
						}
					}, 1000)
				} else {
					this.swiper2.imgUrl = this.co.imgUrl
					setTimeout(() => {
						this.show = true
					}, 800)
				}
			} else {
				this.tg()
			}
		}
	};
</script>
<style lang="scss" scoped>
	.countC {
		width: 140rpx;
		height: 55rpx;
		top: 80rpx;
		left: 30rpx;
		border-radius: 55rpx;
		background-color: rgba(147, 147, 147, 0.6);
	}

	.tcgg {
		width: 70%;
	}

	.tcbtm {
		margin-top: 50rpx;
	}

	.iconx2 {
		font-size: 68rpx;
	}
</style>
