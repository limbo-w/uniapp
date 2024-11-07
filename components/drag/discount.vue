<template>
	<view class="discount" :style="{
        marginTop:styles.marginTop+'px',
       marginBottom:styles.marginBottom+'px',
        marginLeft:styles.marginLR+'px',
         marginRight:styles.marginLR+'px'
        }">
		<view class="discount-list">
			<view class="discount-list-detail">
				<view>
					<view>
						<text>￥</text>
						<text>5</text>
					</view>
					<view>
						<p>满105可用</p>
						<p>全品类可用(特殊商品除外)</p>
					</view>
				</view>
				<view>
					<view>
						<text></text>
					</view>
					<view>今日限量1万张</view>
					<view class="receive">立即领取</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		name: "discount",
		data() {
			return {};
		},
		props: ["styles"],
	};
</script>
<style lang='scss' scoped>
	.discount {
		background-color: #F7C54C;
		padding: 20upx;

		.discount-list {
			.discount-list-detail:last-child {
				margin-bottom: 0;
			}

			.discount-list-detail {
				display: flex;
				background-color: #fff;
				border: 1px solid #eee;
				border-radius: 20upx;
				margin-bottom: 20upx;

				>div {
					padding: 10px 0;
				}

				&>view:nth-of-type(1) {
					width: 60%;
					display: flex;
					justify-content: space-around;
					align-items: center;

					&>view:nth-of-type(1) {
						display: flex;
						justify-content: center;
						width: 20%;

						>span {
							color: #C99F22;
						}

						&>text:nth-of-type(1) {
							font-size: 36upx;
						}

						&>text:nth-of-type(2) {
							font-size: 42upx;
						}
					}

					&>view:nth-of-type(2) {
						width: 80%;
						padding: 0 20upx;

						&>text:nth-of-type(1) {
							display: inline;
							font-size: 24upx;
							color: #C99F22;
							background-color: #FCF1F9;
							padding: 0 20upx;
						}

						&>p:nth-of-type(2) {
							margin-top: 4px;
							font-size: 12px;
						}
					}
				}

				&>view:nth-of-type(2) {
					width: 40%;
					padding-left: 20upx;
					text-align: center;

					&>view:nth-of-type(1) {
						width: 80%;
						height: 20upx;
						background-color: #D8AC2D;
						margin: 0 auto 10upx;
						border-radius: 20upx;
						position: relative;

						&>text {
							position: absolute;
							left: 0;
							top: 0;
							display: inline-block;
							width: 40%;
							height: 20upx;
							background-color: #fff;
							border-radius: 20upx;
						}
					}

					&>view:nth-of-type(1) {
						font-size: 24upx;
						color: #9B780C;
					}

					.receive {
						padding: 10upx 20upx;
						background-color: #2B3142;
						width: 60%;
						margin: 30upx auto 0;
						font-size: 20upx;
						color: #fff;
						border-radius: 60upx;
					}
				}
			}
		}
	}
</style>
