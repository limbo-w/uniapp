<template>
	<view class="">
		<block v-if="navbar&&navbar.navs&&navbar.navs.length>0">
			<view class="navbar f-row" :style="{backgroun:navbar.colorBg,borderTop:'1rpx solid '+navbar.border_color,bottom:isIpx?'40rpx':'' }">
				<block v-for="(item,idx) in navbar.navs" :key="idx">
					<view v-if="!item.item" class="navbargator f-g-1 f-y-c" @click="goPage(item,idx)">
						<view class='navbar-view f-c-c'>
							<image mode="aspectFit" v-if="item.icon" class="navbar-icon" :src="item.active?item.icon.active:item.icon.normal"></image>
							<text v-else-if="item.icon2" :class="[item.icon2,'iconfont f42']" :style="{color:item.active?navbar.color:navbar.colorOff,}"></text>
							<view class="navbar-text" :style="{color:item.active?navbar.color:navbar.colorOff,}">{{item.text}}
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="isIpx" class='bgf'></view>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import utils from '@/common/utils.js'
	export default {
		name: 'tabbar',
		props: {
			type: {
				type: Object,
				default: function() {
					return {
						message: 'hello'
					}
				}
			},
			ptype: {
				type: String,
				default: 'index'
			},
			color: { // small.normal
				type: String,
				default: ''
			}
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				layout: state => state.layout.index.body && state.layout.index.body.menu,
				cmlayout: state => state.layout.custom.body && state.layout.custom.body.menu,
				isshopdl: state => state.config.isshopdl,
			}),
			navbar() {
				if (this.ptype == 'index' && !this.isshopdl) {
					if (getApp().globalData.tabbar) {
						// let nav = utils.deepCopy(getApp().globalData.tabbar),
						// 	a = !1
						// for (let i in nav.navs) nav.navs[i].link == '/' + this.pageroute ? (nav.navs[i].active = !0, a = !0) : nav.navs[i]
						// 	.active = !1;
						// if (a) {
						// 	this.$emit('refresh', true)
						// } else {
						// 	nav = null
						// }
						let nav = utils.deepCopy(getApp().globalData.tabbar),
							index = nav.navs.findIndex(item => item.link == '/' + this.util.getRoute());
						if (index > -1) {
							nav.navs[index].active = true
							this.$emit('refresh', true)
						} else {
							nav = null
						}
						// console.log('navbarnavbarnavbar222', nav)
						return nav
					} else {
						// console.log(this.layout)
						if (this.layout) {
							let nav = {
								colorBg: '#fff',
								border_color: "rgba(0,0,0,0.05)",
								color: '#333',
								colorOff: '#888',
								navs: []
							}
							if (this.layout[0] && this.layout[0].styles.imgUrl.length) {
								let laynav = this.layout[0].styles
								nav.colorBg = laynav.colorBg
								nav.border_color = laynav.colorLine
								nav.color = laynav.colorSelect
								nav.colorOff = laynav.colorUnselect
								let arr = JSON.parse(JSON.stringify(laynav.imgUrl))
								// console.log(arr)
								for (let i in arr) {
									arr[i].icon = {
										active: arr[i].front[0].img,
										normal: arr[i].back[0].img
									}
									arr[i].link = this.changeUrl(arr[i].url)
									delete arr[i].front
									delete arr[i].back
									delete arr[i].url
								}
								nav.navs = arr
							} else {
								nav.navs = [{
										icon2: 'iconjiayuan',
										text: '首页',
										link: "/yb_wm/index/index"
									},
									{
										icon2: 'iconjiayuan',
										text: '点单',
										link: "/yb_wm/index/goods"
									},
									{
										icon2: 'iconjiayuan',
										text: '订单',
										link: "/yb_wm/index/order-index"
									},
									{
										icon2: 'iconjiayuan',
										text: '我的',
										link: "/yb_wm/index/my-index"
									},
									// {
									// 	icon2: 'iconjiayuan',
									// 	text: '客服',
									// 	link: "/yb_wm/my/other/kf"
									// },
								]
							}
							nav.navs.forEach(v => {
								v.t = v.link.indexOf('/index/') != -1 ? 6 : 1
							})
							getApp().globalData.tabbar = utils.deepCopy(nav)
							let index = nav.navs.findIndex(item => item.link == '/' + this.util.getRoute());
							if (index > -1) {
								nav.navs[index].active = true
								this.$emit('refresh', true)
							} else {
								nav = null
							}
							// console.log(nav, index)
							return nav
						}
					}
					// } else if (this.isshopdl || this.ptype == 'shopdl') {
				} else if (this.ptype == 'custom') {
					if (this.cmlayout) {
						let nav = {
							colorBg: '#fff',
							border_color: "rgba(0,0,0,0.05)",
							color: '#333',
							colorOff: '#888',
							navs: []
						}
						if (this.cmlayout[0] && this.cmlayout[0].styles.imgUrl.length) {
							let laynav = this.cmlayout[0].styles
							nav.colorBg = laynav.colorBg
							nav.border_color = laynav.colorLine
							nav.color = laynav.colorSelect
							nav.colorOff = laynav.colorUnselect
							let arr = utils.deepCopy(laynav.imgUrl)
							// console.log(arr)
							for (let i in arr) {
								arr[i].icon = {
									active: arr[i].front[0].img,
									normal: arr[i].back[0].img
								}
								arr[i].link = this.changeUrl(arr[i].url)
								delete arr[i].front
								delete arr[i].back
								delete arr[i].url
							}
							nav.navs = arr
						} else {
							nav.navs = [{
									icon2: 'iconjiayuan',
									text: '首页',
									link: "/yb_wm/index/index"
								},
								{
									icon2: 'iconjiayuan',
									text: '订单',
									link: "/yb_wm/index/order-index"
								},
								{
									icon2: 'iconjiayuan',
									text: '我的',
									link: "/yb_wm/index/my-index"
								},
							]
						}
						nav.navs.forEach(v => {
							v.t = v.link.indexOf('/index/') != -1 ? 6 : 1
						})
						let index = nav.navs.findIndex(item => item.link == '/' + this.util.getRoute());
						if (index > -1) {
							nav.navs[index].active = true
							this.$emit('refresh', true)
						}
						return nav
					}
				}
			},
		},
		methods: {
			goPage: utils.throttle(function(e) {
				// console.log(this.pageroute)
				if (e[0].active) return
				let t = e[0].t == 6 ? 6 : this.pageroute.indexOf('/index/') > -1 ? 1 : 2
				this.go({
					t,
					url: e[0].link
				})
				// return
				// if (this.ptype == 'index') {
				// 	this.go({
				// 		t: 2,
				// 		url: v.link
				// 	})
				// } else {
				// 	if (this.system.pattern == 1) { //平台
				// 		this.go({
				// 			t: i == 0 && getCurrentPages().length > 1 ? 4 : 2,
				// 			url: v.link
				// 		})
				// 	} else {
				// 		this.go({
				// 			t: 2,
				// 			url: v.link
				// 		})
				// 	}

				// }
			}, 500),
		},
		// mounted() {
		// 	// #ifdef MP-TOUTIAO
		// 	tt.hideTabBar()
		// 	// #endif
		// },
		created() {
			this.pageroute = this.util.getRoute()
			// console.log('111')
			uni.hideTabBar()
		}
	}
</script>

<style>

</style>
