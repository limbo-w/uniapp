<template>
	<view class="" :class="[cname]">
		<view class="f-raw">
			<view v-for="(v,i) in filePaths" :key='i' class="mpimgc posi-r">
				<view class="mpimg o-h" :style="{width:w,height:w}">
					<mg-img :local='v.tmp' :src="v.url"></mg-img>
				</view>
				<icon @click="deletePic(i)" class="posi-a mpclose" type="clear" size="20"></icon>
			</view>
			<view v-if="filePaths.length<max" class="mpimgc">
				<view @click="add" class="mpimg mpaddc f-c-c" :style="{width:w,height:w}">
					<text class="iconfont f40 c9" :class="icon"></text>
					<view v-if="pt" class="c9 f22 t-c mt10 p02">{{pt}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import MgCell from '@/components/common/mg-cell.vue'
	import {
		choosePhoto,
		uploadImage
	} from '@/common/wechat-util.js'
	export default {
		components: {
			MgCell,
		},
		props: {
			cname: '',
			max: {
				type: String,
				default: '9',
			},
			fileList: {
				type: Array,
				default () {
					return [];
				}
			},
			pt: {
				type: String,
				default: '',
			},
			mark: {
				type: [String, Number],
				default: '',
			},
			pkey: {
				type: String,
				default: '',
			},
			icon: {
				type: String,
				default: 'iconjia'
			},
			title: '',
			ftitle: '',
			w: '',
		},
		data() {
			return {
				filePaths: [],
				files: [],
			}
		},
		computed: {},
		watch: {
			fileList: {
				handler(newval) {
					this.filePaths = Object.assign([], newval.map(v => ({
						url: v
					})));
					if (newval.length) {
						this.$emit('change-img', {
							p: this.filePaths,
							mark: this.mark,
							pkey: this.pkey,
						})
						if (this.api.platform == 'weChat') {
							this.files = this.filePaths
						}
					}
				},
				immediate: true,
			}
		},
		methods: {
			async add() {
				let arr = await choosePhoto({
					num: this.max - this.filePaths.length
				})
				if (this.api.platform != 'weChat') {
					this.filePaths = this.filePaths.concat(arr.map(v => ({
						tmp: 1,
						url: v,
					})))
					this.$emit('change-img', {
						p: this.filePaths,
						mark: this.mark,
						pkey: this.pkey,
					})
				} else {
					let serverIdArr = [];
					for (let item of arr) {
						const {
							serverId
						} = await uploadImage(item);
						serverIdArr.push(serverId)
					}
					this.filePaths = this.filePaths.concat(arr.map(v => ({
						tmp: 1,
						url: v,
					})))
					this.files = this.files.concat(serverIdArr.map(v => ({
						tmp: 1,
						url: v,
					})))
					// console.log(serverIdArr)
					this.$emit('change-img', {
						p: this.files,
						mark: this.mark,
						pkey: this.pkey,
					})
				}
				console.log(this.api.platform, arr)
			},
			deletePic(i) {
				this.filePaths.splice(i, 1);
				if (this.api.platform != 'weChat') {
					this.$emit('change-img', {
						p: this.filePaths,
						mark: this.mark,
						pkey: this.pkey,
					})
				} else {
					this.files.splice(i, 1)
					this.$emit('change-img', {
						p: this.files,
						mark: this.mark,
						pkey: this.pkey,
					})
				}
				// console.log(i, this.filePaths)
			},
		}
	}
</script>

<style scoped>
	.mpimgc {
		padding: 20rpx 20rpx 0 0;
		margin: 0 10rpx 20rpx 0;
	}

	.mpimg {
		width: 136rpx;
		height: 136rpx;
		border-radius: 10rpx;
	}

	.mpclose {
		top: 0rpx;
		right: 0rpx;
	}

	.mpaddc {
		border: 1px dashed #d5d5d5;
	}
</style>
