<template>
	<view class="p0 o-h" :style="{
			backgroundColor: co.colorBg,
			margin:`${co.marginTop}${u} ${co.marginLR}${u} ${co.marginBottom}${u}`,
			borderRadius: co.circle + u,
		}">
		<mg-cell cname="p0" bgc="transparent" last="1">
			<view slot='bd'>
				<!-- <mg-cell bgc="transparent" last="1" cname="p23" :btt="co.title" bttc='wei f30'></mg-cell> -->
				<view v-if="co.arrange==1" class="gwglc f-raw f24">
					<block v-for="(v,i) in myGwgl" :key='i'>
						<view v-show="!v.hide" @click="gwglClick(v)" :style="{width: 10/co.num*10+'%'}" class="f-c-c gwgl">
							<view class="glimg mb15" :style="{width:`${ftw.w}rpx`,height:`${ftw.w}rpx`}">
								<mg-img :src='v.img'></mg-img>
							</view>
							<view :style="{color:co.colorWord,fontSize:ftw.ft+'rpx'}">{{v.word}}</view>
						</view>
					</block>
				</view>
				<block v-else>
					<mg-cell @tab='gwglClick(v)' cname="p253" v-for="(v,i) in myGwgl" :key='i' :img="v.img" :w='ftw.w' :h='ftw.w'
					 :last="i==myGwgl.length-1" isr='1'>
						<view slot='bd'>
							<view :style="{color:co.leftColor,fontSize:ftw.ft+'rpx'}" class="f30">{{v.leftWord}}</view>
						</view>
						<view slot='ft' class="f24 f-y-c" :style="{color:co.rightColor}">
							<view>{{v.rightWord}}</view>
							<view v-if="co.img" class="glimg ml20">
								<mg-img :src="co.img"></mg-img>
							</view>
							<text v-else class="iconfont iconright ml20 f28"></text>
						</view>
					</mg-cell>
				</block>
			</view>
		</mg-cell>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'tj-tools',
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			u: {
				type: String,
				default: 'px'
			},
		},
		data() {
			return {

			}
		},
		computed: {
			myGwgl() {
				return this.co.imgUrl
			},
			ftw() {
				return {
					ft: (this.co.fontSize || 14) * 2,
					w: (this.co.width || 23) * 2
				}
			},
		},
		methods: {
			async gwglClick(v) {
				// console.log(v)
				this.goUrl(v.url, v)
			},
		},
		// created() {
		// 	console.log(this.co)
		// }
	}
</script>

<style scoped lang="scss">
	.gwglc {
		padding: 0 0 20rpx;
	}

	.gwgl {
		margin: 18rpx 0;
	}

	.ddimg {
		width: 52rpx;
		height: 52rpx;
	}

	.glimg {
		width: 46rpx;
		height: 46rpx;
	}
</style>
