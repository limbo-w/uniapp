<template>
	<view v-show="show">
		<!-- #ifdef H5 -->
		<mg-popup v-model="show" :z-index="998">
			<view class="iframe bf">
				<iframe id="mapPage" ref="mapIframe" :src="getMapSrc" width="100%" height="88%" frameborder=0>
				</iframe>
				<view class="map-fb f-x-bt">
					<view class="f-c" @click="show=false">取消</view>
					<view class="f-c" :style="{background: tColor}" @click="qd">确定</view>
				</view>
			</view>
		</mg-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import mgPopup from '@/components/common/popup.vue'
	export default {
		name: 'mg-map',
		components: {
			mgPopup,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			value: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				show: false,
				getMapSrc: '',
				chooselocation: '',
			}
		},
		computed: {
			...mapState('dndc', ['latLng']),
			// show: {
			// 	get() {
			// 		return this.value;
			// 	},
			// 	set(newVal) {
			// 		this.$emit("input", newVal)
			// 	}
			// },
		},
		watch: {},
		methods: {
			choose() {
				// #ifndef H5
				uni.chooseLocation({
					success: (res) => {
						this.$emit("get-cl", res)
						console.log(res)
					}
				})
				// #endif
				// #ifdef H5
				this.show = true
				// #endif
			},
			qd() {
				const loc = this.chooselocation;
				if (!loc) return this.util.message('请选择位置', 3)
				this.show = false;
				this.$emit('get-cl', {
					address: loc.poiaddress,
					name: loc.poiname,
					latitude: loc.latlng.lat,
					longitude: loc.latlng.lng,
				})
				// console.log(loc)
			},
		},
		created() {
			// #ifdef H5
			let coord = this.latLng.lat ? this.latLng.lat + ',' + this.latLng.lng : '39.906930,116.397570'
			console.log(coord)
			this.getMapSrc = "https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=" + this.system.txKey +
				"&referer=ybwmapp&coord=" + coord
			const that = this;
			(function() {
				// var iframe = document.getElementById('mapPage').contentWindow;
				// document.getElementById('mapPage').onload = function(){
				//   iframe.postMessage('hello','https://apis.map.qq.com/tools/locpicker');
				// };
				// document.getElementById('mapPage').src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=EOJBZ-HSBW6-G2VSM-EE3KV-4OAAK-RXFWT&referer=myapp"
				window.addEventListener('message', function(event) {

					// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
					var loc = event.data;
					if (loc && loc.module == 'locationPicker') { //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'

						that.chooselocation = loc;
						// showDialog(JSON.stringify(loc),'位置信息')
					}
				}, false);
			}())
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	.iframe {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		padding-top: 0px;

		.map-fb {
			border-top: 1.1px solid #e5e5e5;
			height: 12%;
			padding: 0 8%;

			view {
				width: 45%;
				height: 50%;
				border-radius: 20rpx;
				border: 1.1px solid #d5d5d5;
				color: #666;
			}

			view:nth-child(2) {
				color: #fff;
				border-color: #fff;
			}
		}
	}
</style>
