<template>
	<view>
		<view class="snav f-row posi-r bf" :class="[cname,{'bf1':show}]" style="z-index: 2001;" :style="[sname]">
			<block v-if="type==1">
				<view v-if="!v.hide" v-for="(v,i) in snavs" :key='i' class="f-1 f-c p20" @click="clickNav(i)">
					<view class="f26" :class="{'wei':i==aIdx||v.active}" :style="{color:i==aIdx||v.active?'':''}">{{v.name}}</view>
					<text class="ml10 c6 iconfont f18" :class="[icon,{'r90':i==aIdx}]" :style="{color:i==aIdx||v.active?iconnxzc:iconnxzc}"></text>
				</view>
				<view v-else class="f-1 f-c p20"></view>
			</block>
			<block v-if="type==2">
				<view class="f-1 f-row">
					<view class="f-c p23" @click="clickNav(0)">
						<view class="f26" :class="{'wei':0==aIdx||snavs[0].active}" :style="{color:0==aIdx||snavs[0].active?'':''}">{{snavs[0].name}}</view>
						<text class="ml10 c6 iconfont f18" :class="[icon,{'r90':0==aIdx}]" :style="{color:0==aIdx||snavs[0].active?iconnxzc:iconnxzc}"></text>
					</view>
					<view class="f-1 f-row">
						<view class="f-c p23" @click="clickNav(1)">
							<view class="f26" :class="{'wei':1==aIdx||snavs[1].active}" :style="{color:1==aIdx||snavs[1].active?'':''}">{{snavs[1].name}}</view>
							<!-- <text class="ml10 c6 iconfont f18" :class="[icon,{'r90':0==aIdx}]" :style="{color:0==aIdx||snavs[0].active?iconnxzc:iconnxzc}"></text> -->
						</view>
						<view class="f-c p23" @click="clickNav(2)">
							<view class="f26" :class="{'wei':2==aIdx||snavs[2].active}" :style="{color:2==aIdx||snavs[2].active?'':''}">{{snavs[2].name}}</view>
							<!-- <text class="ml10 c6 iconfont f18" :class="[icon,{'r90':0==aIdx}]" :style="{color:0==aIdx||snavs[0].active?iconnxzc:iconnxzc}"></text> -->
						</view>
					</view>
				</view>
				<view class="f-c p23" @click="clickNav(3)">
					<view class="f26" :class="{'wei':3==aIdx||snavs[3].active}" :style="{color:3==aIdx||snavs[3].active?'':''}">{{snavs[3].name}}</view>
					<text class="ml10 c6 iconfont f18" :class="[icon,{'r90':3==aIdx}]" :style="{color:3==aIdx||snavs[3].active?iconnxzc:iconnxzc}"></text>
				</view>
			</block>
		</view>
		<scroll-view v-if="sarr.length" class='ws-n p03 sarr bf' scroll-x='true'>
			<block v-for="(v,i) in sarr" :key='i'>
				<view @click="clickSarr(i)" class='f-g-0 mr15 bs10 c6 dis-in sarri f24 t-c' :class="{wei:v.active}" :style="{background:v.active?`rgba(${cTR(color)},0.13)`:'',color:v.active?tColor:''}">{{v.name}}</view>
			</block>
		</scroll-view>
		<mg-popup v-model="show" position="top" z-index="2000">
			<view :style="[{marginTop:snbdmt+'px'}]">
				<view @touchmove.stop="" v-if="snavs[navIdx].type==1" class="navbd f-row bf">
					<scroll-view scroll-y class="f-g-1">
						<view class="p30" v-for="(v,i) in snavs[navIdx].arr" :key='i' :style="{color:i==paIdx?color:''}" @click="paIdxClick(i)">
							<text>{{v.name}}</text>
							<text v-if="v.num" class="ml20 f24" :style="{color:i==paIdx?color:'#999'}">({{v.num}})</text>
						</view>
					</scroll-view>
					<scroll-view scroll-y v-if="paIdx>-1&&snavs[navIdx].arr[paIdx].son&&snavs[navIdx].arr[paIdx].son.length>0" class="f-g-0 navbdr">
						<view class="p30" v-for="(v,i) in snavs[navIdx].arr[paIdx].son" :key='i' :style="{color:i==saIdx?color:''}"
						 @click="saIdxClick(i)">{{v.name}}</view>
					</scroll-view>
				</view>
				<view @touchmove.stop="" v-if="snavs[navIdx].type==2" class="navbd2 bf f-col">
					<scroll-view scroll-y class="p03 sxtop f24">
						<view v-for="(pv,pi) in snavs[navIdx].arr" :key='pi'>
							<view class="p20 c9 f26">{{pv.name}}</view>
							<view class="sxicon f-raw">
								<view @click="sxitemClick(pi,i)" :style="{color:v.active?color:'',background:v.active?`rgba(${cTR(color)},0.13)`:''}"
								 class="sxitem f-c" v-for="(v,i) in pv.son" :key='i'>{{v.name}}</view>
							</view>
						</view>
					</scroll-view>
					<view class="f-g-0 f-row sxbtm hlt">
						<view hover-class='be' class="f-1 bf f30 f-c" @click="reset">重置</view>
						<view :style="{color:color}" hover-class='be' class="f-1 bf f30 wei f-c hll" @click="wcsx">完成</view>
					</view>
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
		utilMixins
	} from "@/common/util-mixins.js"
	import mgPopup from '@/components/common/popup.vue'
	export default {
		name: 'searchBox',
		components: {
			mgPopup,
		},
		props: {
			cname: '',
			sname: '',
			type: {
				type: [String, Number],
				default: '1'
			},
			co: {
				type: Array,
				default: function() {
					return []
				}
			},
			sarr: {
				type: Array,
				default: function() {
					return []
				}
			},
			value: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: 'iconxxjt'
			},
			iconxzc: {
				type: String,
				default: ''
			},
			iconnxzc: {
				type: String,
				default: ''
			},
			snbdmt: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				snavs: [],
				aIdx: -1,
				navIdx: 0,
				paIdx: 0,
				saIdx: 0,
			}
		},
		mixins: [utilMixins],
		computed: {
			show: {
				get() {
					return this.value;
				},
				set(newVal) {
					this.$emit("input", newVal)
					// console.log('show set', newVal)
				}
			},
		},
		watch: {
			show(newVal) {
				if (!newVal) { //监测show值为false时
					if (this.snavs[this.aIdx].arr.length) {
						this.aIdx = -1
					}
				}
				// console.log('watch show', newVal)
			},
			co: {
				async handler(newVal) {
					this.snavs = newVal
					// console.log('watch co', newVal)
				},
				immediate: true
			},
		},
		methods: {
			clickNav(i) {
				if (i == this.aIdx) {
					this.$emit("click-nav", false)
					return
				}
				this.aIdx = this.navIdx = i
				if (this.snavs[i].arr.length) {
					if (!this.show) {
						this.$emit("click-nav", true)
					}
					//获取选中每一项索引
					let paIdx = -1,
						saIdx = -1,
						treesItem = this.snavs[i]
					paIdx = treesItem.arr.findIndex(item => item.name == treesItem.name);
					if (paIdx == -1) {
						for (let i = 0; i < treesItem.arr.length; i++) {
							if (treesItem.arr[i].son) {
								let findcindex = treesItem.arr[i].son.findIndex(item => item.name == treesItem.name)
								if (findcindex > -1) {
									paIdx = i, saIdx = findcindex
									break
								}
							}
						}
					}
					this.paIdx = paIdx
					this.saIdx = saIdx
					// console.log(paIdx, saIdx, treesItem)
				} else {
					if (!this.show) {
						this.$emit("click-nav", false)
					}
					this.$emit("click-con", {
						aIdx: this.aIdx,
					})
				}
			},
			paIdxClick(i) {
				let pitem = this.snavs[this.aIdx].arr[i]
				this.paIdx = i
				this.saIdx = -1
				if (!pitem.son || !pitem.son.length) {
					this.snavs[this.aIdx].name = pitem.name
					this.snavs[this.aIdx].active = 1
					this.$emit("click-con", {
						aIdx: this.aIdx,
						item: {
							paIdx: i,
							...pitem
						}
					})
				}
				// console.log(pitem)
			},
			saIdxClick(i) {
				let sitem = this.snavs[this.aIdx].arr[this.paIdx].son[i]
				this.saIdx = i
				this.snavs[this.aIdx].name = sitem.name
				this.snavs[this.aIdx].active = 1
				this.$emit("click-con", {
					aIdx: this.aIdx,
					item: {
						saIdx: i,
						...sitem
					}
				})
				// console.log(sitem)
			},
			sxitemClick(pi, i) {
				if (this.snavs[this.aIdx].arr[pi].xztype == 2) {
					for (let k in this.snavs[this.aIdx].arr[pi].son) {
						if (i == k) {
							this.snavs[this.aIdx].arr[pi].son[i].active = this.snavs[this.aIdx].arr[pi].son[i].active == 1 ? 0 : 1
						} else {
							this.snavs[this.aIdx].arr[pi].son[k].active = 0
						}
					}
				} else {
					this.$set(this.snavs[this.aIdx].arr[pi].son[i], 'active', this.snavs[this.aIdx].arr[pi].son[i].active == 1 ? 0 :
						1)
					// this.$set() 这里触发不了更新,因为数据是父级的，并没在组件里拷贝一份来操作
				}
				console.log(pi, i)
			},
			wcsx() {
				let arr = this.snavs[this.aIdx].arr.map(v => v.son.filter(v => v.active == 1)),
					n = 0
				arr.forEach(v => {
					n += v.length
				})
				n > 0 ? this.snavs[this.aIdx].active = 1 : this.snavs[this.aIdx].active = 0
				this.$emit("click-con", {
					aIdx: this.aIdx,
					type: 2,
					arr: arr
				})
			},
			reset() {
				for (let i in this.snavs[this.aIdx].arr) {
					for (let j in this.snavs[this.aIdx].arr[i].son) {
						this.snavs[this.aIdx].arr[i].son[j].active = 0
					}
				}
			},
			clickSarr(i) {
				this.$emit("click-con", {
					sarrIdx: i,
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.snav {
		height: 85rpx;
		padding: 0 0rpx;
	}

	.f18 {
		font-size: 18rpx;
	}

	.r90 {
		transform: rotateX(180deg);
	}

	.navbd {
		padding: 85rpx 40rpx 0;
		max-height: 800rpx;
	}

	.navbdr {
		width: 60%;
	}

	.navbd2 {
		padding: 85rpx 0rpx 0rpx;
		max-height: 885rpx;
	}

	.sxicon {}

	.sxitem {
		width: calc(25% - 18rpx);
		margin: 0 22rpx 22rpx 0;
		height: 60rpx;
		border-radius: 60rpx;
		background: #F6F6F6;

		&:nth-child(4n) {
			margin-right: 0rpx;
		}
	}

	.sxtop {
		max-height: 700rpx;
	}

	.sxbtm {
		height: 100rpx;
	}

	.sarr {
		height: 84rpx;

		.sarri {
			background: #F8F8F6;
			line-height: 64rpx;
			width: 158rpx;
			height: 64rpx;
		}
	}
</style>
