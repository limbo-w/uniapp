<template>
	<view class="bf bgfix">
		<canvas style="width: 330px;height: 490px;position:fixed;top:9999px" canvas-id="hbctx"></canvas>
		<view v-if="show" class="wh f-col f-y-c">
			<image mode="scaleToFill" class="img bs15" :style="{height:'980rpx'}" :src='img'></image>
		</view>
		<view class="foot-btnc">
			<button @click="bc" class="bcan foot-btn" :style="{background:tColor||'#07c160'}">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	export default {
		name: 'order-hb',
		components: {},
		data() {
			return {
				hbh: '',
				img: '',
				show: false,
			}
		},
		onLoad(options) {
			if (getApp().globalData.sphb && getApp().globalData.sphb.id == uni.getStorageSync('bdhc').co.id) {
				this.show = true
				this.img = getApp().globalData.sphb.img
				console.log('有缓存')
			}
			this.util.showLoading('海报生成中')
			this.getSystem({
				setNB: 1
			})
			this.util.setNT('海报')
			this.query = {
				...options,
				co: uni.getStorageSync('bdhc')
			}
			console.log(this.query, 600 / this.util.getSb().rate)
		},
		onReady() {
			setTimeout(() => {
				this.getCanvas()
			}, 100)
		},
		computed: {
			...mapState('dndc', ['fxsInfo']),
		},
		methods: {
			async getCanvas() {
				switch (+this.query.type) {
					case 1:
						try {
							const ctx = uni.createCanvasContext('hbctx'),
								img1 = this.query.co.bgimg,
								img2 = this.query.co.code,
								logo = this.query.co.logo,
								x = 20,
								y = 0,
								w = 290,
								h = 290
							//绘制
							ctx.setFillStyle("#fff")
							ctx.fillRect(0, 0, 330, 490)
							ctx.drawImage(img1, x, y, w, h)
							ctx.drawImage(img2, 330 - x - 100, h + 20, 100, 100)
							//给码加logo
							ctx.save()
							ctx.beginPath()
							ctx.arc(330 - x - 100 + 50, h + 20 + 50, 22.5, 0, 2 * Math.PI) //圆心坐标210+50
							ctx.clip()
							ctx.drawImage(logo, 330 - x - 100 + (50 - 22.5), h + 20 + (50 - 22.5), 45,
								45) //logo左上角坐标 210+(50-21),310+(50-21)
							ctx.restore()
							//
							ctx.setFillStyle('#000');
							ctx.setFontSize(16);
							ctx.setTextAlign('left')
							ctx.fillText(utils.jqzf({
								str: this.query.co.co.name,
								n: 9
							}), x, h + 30);
							//
							ctx.setFillStyle(this.tColor);
							ctx.setFontSize(12);
							ctx.setTextAlign('left')
							ctx.fillText(this.sl, x, h + 20 + 120);
							//
							ctx.setFillStyle(this.tColor);
							ctx.setFontSize(23);
							ctx.setTextAlign('left')
							ctx.fillText(this.query.co.co.price, x + 10, h + 20 + 120);
							//
							ctx.setFillStyle('#666');
							ctx.setFontSize(12);
							ctx.setTextAlign('center');
							ctx.fillText("长按小程序码去购买", 260, 430);
							//
							ctx.draw();
							setTimeout(() => {
								uni.canvasToTempFilePath({
									canvasId: 'hbctx',
									success: res => {
										this.show = true
										this.img = res.tempFilePath
										getApp().globalData.sphb = {
											id: this.query.co.co.id,
											img: res.tempFilePath
										}
									},
									complete: res => {
										uni.hideLoading()
										console.log(res);
									}
								});
							}, 200);
						} catch (e) {
							console.log(e)
							this.util.message('生成失败', 2)
						}
						break;
					case 2:
						try {
							const ctx = uni.createCanvasContext('hbctx'),
								img1 = this.query.co.bgimg,
								img2 = this.query.co.code
							// ctx.setFillStyle("#07c160")
							ctx.fillRect(0, 0, 325, 450)
							ctx.drawImage(img1, 0, 0, 325, 450)
							ctx.save()
							ctx.beginPath()
							ctx.arc(160, 360, 60, 0, 2 * Math.PI)
							ctx.clip()
							ctx.drawImage(img2, 100, 300, 120, 120)
							ctx.restore()
							ctx.draw();
							setTimeout(() => {
								uni.canvasToTempFilePath({
									canvasId: 'hbctx',
									success: res => {
										this.show = true
										this.img = res.tempFilePath
									},
									complete: res => {
										uni.hideLoading()
										console.log(res);
									}
								});
							}, 200);
						} catch (e) {
							this.util.message('生成失败', 2)
						}
						break;
					default:
						break;
				}
			},
			bc() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.img,
					success: res => {
						uni.showModal({
							content: '图片已保存到相册，赶紧晒一下吧~',
							showCancel: false,
							confirmText: '好的',
							success: () => {
								this.go({
									t: 4
								})
							}
						})
					},
					complete: res => {
						if (res.errMsg.indexOf('deny') > -1) {
							uni.showModal({
								title: '温馨提示',
								content: '授权失败,请打开小程序设置开启授权',
								showCancel: false
							});
						}
						console.log(res);
					}
				})
				// #endif
				// #ifdef H5
				this.util.message('预览图片保存', 3)
				utils.stfn(() => {
					this.util.preImg({
						idx: 0,
						urls: [this.img]
					})
				})
				// #endif
			}
		},
	}
</script>
<style scoped lang="scss">
	.img {
		width: 660rpx;
		margin-top: 100rpx;
		box-shadow: 0 0 12rpx 3rpx rgba(221, 221, 221, 0.6);
	}

	.bcan {
		width: 650rpx;
	}
</style>
