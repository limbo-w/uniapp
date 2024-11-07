<template>
	<view class="p0 o-h" :style="{
			backgroundColor: co.colorBg,
			marginTop: co.marginTop + u,
			marginBottom: co.marginBottom + u,
			marginLeft: co.marginLR + u,
			marginRight: co.marginLR+ u,
			borderRadius: co.circle + u,
		}">
		<mg-cell cname="p0" bgc="transparent" last="1">
			<view slot='bd'>
				<mg-cell bgc="transparent" last="1" cname="p23" :btt="co.title" bttc='wei f30'></mg-cell>
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
					<mg-cell @tab='gwglClick(v)' cname="p23" v-for="(v,i) in myGwgl" :key='i' :img="v.img" :w='ftw.w' :h='ftw.w' arrow="1"
					 last="1">
						<view slot='bd'>
							<view :style="{color:co.colorWord,fontSize:ftw.ft+'rpx'}" class="f30">{{v.word}}</view>
						</view>
						<!-- <view slot='ft' class="c9 f24"></view> -->
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
			color: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			}
		},
		computed: {
			myGwgl() {
				return this.co.btnList
			},
			ftw() {
				return {
					ft: this.co.fontSize * 2,
					w: this.co.width * 2
				}
			},
		},
		methods: {
			async gwglClick(v) {
				// console.log(v)
				this.goUrl(v.url, v)
			},
		},
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
