<template>
	<view class="bf mh100">
		<view class="sfbg" :style="{background:tColor}"></view>
		<view class="sfimg bsf ma">
			<mg-img :src="user.portrait||'/static/wd/mrtx.png'"></mg-img>
		</view>
		<view class="t-c mt15 mb50">{{user.userName}}</view>
		<view class="sfbd">
			<view @click="syye" class="p3 f-c b-be">
				<text class="iconfont iconwgx mr15" :class="{'icongx c0':isgx}"></text>
				<view>使用{{system.custom.balance}}支付<text class="ml10 f24 c9">(可用余额{{sl+user.balance}})</text></view>
			</view>
			<view class="t-c p30">
				<view class="mt10 mb30">此二维码可累计积分并付款</view>
				<view class="sfmc f-c">
					<view class="sfm">
						<mg-img v-if="code" local='1' :src="code"></mg-img>
					</view>
				</view>
				<view class="f24 wei4" style="color: #A3A8AE;">会员码每30秒自动刷新—次</view>
			</view>
		</view>
		<uni-qrcode cid="zfewm" ref='zfewm' :text="ewmlink" :margin="0" />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniQrcode from '@/components/uQrcode/uni-qrcode.vue'
	export default {
		name: 'smzf',
		components: {
			uniQrcode,
		},
		data() {
			return {
				isgx: false,
				ewmlink: '',
				code: '',
			}
		},
		onLoad(options) {
			// this.util.setNB('#424141')
			this.getSystem({
				setNB: 1
			})
			this.getLoginInfo()
			this.$nextTick(() => {
				this.makeMemberCode()
			})
			this.dsq = setInterval(() => {
				this.makeMemberCode()
			}, 30000)
			// console.log(new Promise(function (resolve, reject) {
			//     throw new Error('出错了');
			//   }).then(e => console.log(e),e => console.log(e)))
		},
		onUnload() {
			this.dsq && clearInterval(this.dsq)
		},
		computed: {},
		methods: {
			syye() {
				this.isgx = !this.isgx
				this.makeMemberCode()
			},
			async makeMemberCode() {
				this.util.showLoading()
				// this.ewmlink = this.user.userTel || this.RandomRange(18, 18)
				this.ewmlink = this.uId + this.RandomRange(6, 6)
				this.$nextTick(async () => {
					this.code = await this.$refs.zfewm.make()
					uni.hideLoading()
				})
				// console.log('makeMemberCode', this.ewmlink, this.code)
			},
			RandomRange(min, max) {
				var returnStr = "",
					range = (max ? Math.round(Math.random() * (max - min)) + min : min),
					arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
						'j', 'k',
						'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E',
						'F', 'G',
						'H',
						'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
					];
				for (var i = 0; i < range; i++) {
					var index = Math.round(Math.random() * (arr.length - 1));
					returnStr += arr[index];
				}
				return returnStr;
			},
		},
	}
</script>
<style scoped lang="scss">
	.sfbg {
		background-color: #424141;
		height: 15vh;
	}

	.sfimg {
		width: 140rpx;
		height: 140rpx;
		margin-top: -70rpx;
	}

	.sfbd {
		padding: 0 60rpx;
	}

	.sfmc {
		margin: 0 0 30rpx;
	}

	.sfm {
		width: 312rpx;
		height: 312rpx;
	}
</style>
