<template>
	<view class="" :style="{marginTop:`${co.marginTop}${u}`,
		marginBottom:`${co.marginBottom}${u}`,
		marginLeft:`${co.marginLR}${u}`,
		marginRight:`${co.marginLR}${u}`}">
		<video class="w100" id="myVideo" :src="co.upLoad1.img" @error="videoErrorCallback" controls ></video>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'searchBox',
		props: {
			co: {
				type: Object,
				default: function() {
					return {
						icon: [{
							url: "",
						}],
						topMargin: 0,
						videocon: {
							links: "",
							title: "视频名"
						},
					}
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
		methods: {
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		},
		async created() {},
	}
</script>

<style scoped lang="scss">
</style>
