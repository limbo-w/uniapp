<template>
	<view class="pictures o-h" :style="{
            marginTop: co.marginTop + u,
			marginBottom: co.marginBottom +u,
			marginLeft: co.marginLR + u,
			marginRight: co.marginLR + u,
		}">
		<view class="imgc o-h" :style="{borderRadius: co.circle + u,height:`${u=='px'?getSjgd(co.height):co.height}${u}`,marginTop:i>0?co.paddingTop+'px':''}"
		 v-for="(v,i) in co.imgUrl" :key="i" @click="goTo(v)">
			<mg-img :src="v.img"></mg-img>
		</view>

	</view>
</template>
<script>
	export default {
		name: 'pictures',
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
				img: ''
			};
		},
		methods: {
			goTo(v) {
				this.goUrl(v.url, v)
			}
		},
		// created() {
		// 	console.log(this.co)
		// }
	};
</script>
<style lang="scss" scoped>
	.pictures {
		.imgc {
			width: 100%;
		}
	}
</style>
