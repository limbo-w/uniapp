<template>
	<view class="pb130 o-h" :style="{ background: layout.pageSetting?layout.pageSetting[0].styles.moduleTitle == 1 ? layout.pageSetting[0].styles.colorIcon : 'url('+layout.pageSetting[0].styles.img+')':'' }">
		<!-- #ifndef H5 -->
		<uni-nav-bar v-if="layout.pageSetting[0].styles.modulePage==1" id='uninavbar' uropcity="1" :isleft="false" :fixed='true'
		 :ispr='true' :statusBar="true" :border='false' :bg='layout.pageSetting[0].styles.colorBg' :color="layout.pageSetting[0].styles.colorWord"
		 :title="layout.pageSetting[0].styles.navTitle">
			<!-- <view class="header-t" :style="{color:opcity>=1?'#000':'#fff'}" slot='left'>个人中心</view> -->
		</uni-nav-bar>
		<uni-nav-bar v-else id='uninavbar' :isleft="false" :uropcity="opcity" :fixed='true' :ispr='false' :statusBar="true"
		 :border="opcity>=1" :title="layout.pageSetting[0].styles.navTitle">
		</uni-nav-bar>
		<!-- #endif -->
		<!-- 关注条 -->
		<block v-for="(v, i) in layout.attention" :key="i">
			<atten-tion :co="v.styles" v-if="v.name == 'attention' && v.styles.status==1"></atten-tion>
		</block>

		<!-- 搜索框 -->
		<block v-for="(v, i) in layout.list" :key="i">
			<!-- vip -->
			<members-vip :styles="v.styles" :showpr='layout.pageSetting[0].styles.modulePage' v-if="v.name == 'vip'"></members-vip>
			<!-- 推荐功能 -->
			<tj-tools v-else-if="v.name=='btn2'" :co="v.styles"></tj-tools>
			<!-- 搜索框 -->
			<search-box :co="v.styles" v-else-if="v.name == 'search'"></search-box>
			<!-- 公告 -->
			<notice-sue :co="v.styles" v-else-if="v.name == 'notice'"></notice-sue>
			<!-- 图片轮播 -->
			<picLunbo-by :co="v.styles" v-else-if="v.name == 'picLunbo'"></picLunbo-by>
			<!-- 按钮组 -->
			<btn-group :co="v.styles" :oheight='20' v-else-if="v.name == 'btn'"></btn-group>
			<pictures :co="v.styles" v-else-if="v.name == 'pictures'"></pictures>
			<!-- 标题栏 -->
			<titles-bar :co="v.styles" v-else-if="v.name == 'titles'"></titles-bar>
			<blank :co="v.styles" v-else-if="v.name == 'blank'"></blank>
			<!-- 辅组线 -->
			<lines-wire :co="v.styles" v-else-if="v.name == 'lines'"></lines-wire>
			<!-- 富文本 -->
			<book-text :co="v.styles" v-else-if="v.name == 'book'"></book-text>
			<!-- 选项卡 -->
			<!-- <card-tab :styles="v.styles" v-else-if="v.name == 'card'"></card-tab> -->
			<!-- 热区 -->
			<hot-spots :co="v.styles" v-else-if="v.name == 'hot'"></hot-spots>
			<!-- 魔方 -->
			<margic-cube :co="v.styles" v-else-if="v.name == 'margic'"></margic-cube>
			<!-- 列表导航 -->
			<list-Nav :co="v.styles" v-else-if="v.name == 'listNav'"></list-Nav>
		</block>
		<!-- 悬浮设置 -->
		<block v-if="layout.susBtn&&layout.susBtn[0]">
			<sus-btn :co="layout.susBtn[0].styles"></sus-btn>
		</block>


		<!-- 下单提示 -->
		<block v-if="layout.remind&&layout.remind[0]">
			<order-prompt :co="layout.remind[0].styles"></order-prompt>
		</block>
		<footc></footc>
		<tab-bar></tab-bar>
		<load v-if="showloading"></load>
	</view>
</template>

<script>
	import uniNavBar from "@/components/third/uni-nav-bar.vue"
	import searchBox from '@/components/drag/search.vue';
	import noticeSue from '@/components/drag/notice.vue';
	import picLunboBy from '@/components/drag/picLunbo.vue';
	import btnGroup from '@/components/drag/btn.vue';
	import pictures from '@/components/drag/pictures.vue';
	import titlesBar from '@/components/drag/titles.vue';
	import blank from '@/components/drag/blank.vue';
	import linesWire from '@/components/drag/lines.vue';
	import bookText from '@/components/common/functionCmp/rich-text.vue';
	import cardTab from '@/components/drag/card.vue';
	import hotSpots from '@/components/drag/hot.vue';
	import margicCube from '@/components/drag/margic.vue';
	import susBtn from '@/components/drag/susBtn.vue';
	import attenTion from '@/components/drag/attenTion.vue';
	import orderPrompt from '@/components/drag/remind.vue';
	import openList from '@/components/drag/open.vue';
	import membersVip from '@/components/drag/vip.vue';
	import listNav from '@/components/drag/listNav.vue';
	import tjTools from '@/components/drag/tj-tools.vue'
	import load from '@/components/common/load.vue'
	import footc from '@/components/common/footc.vue'
	import {
		mapActions,
		mapState
	} from 'vuex';
	export default {
		name: 'mine',
		components: {
			uniNavBar,
			searchBox,
			noticeSue,
			picLunboBy,
			btnGroup,
			pictures,
			titlesBar,
			blank,
			linesWire,
			bookText,
			cardTab,
			hotSpots,
			margicCube,
			susBtn,
			attenTion,
			orderPrompt,
			openList,
			membersVip,
			listNav,
			tjTools,
			load,
			footc,
		},
		data() {
			return {
				showloading: true,
				opcity: 0,
			};
		},

		onLoad(options) {
			this.getSystem();
			this.getLoginInfo({
				inviteId: options.userId
			});
			this.getLayout({
				page: 'personalcenter',
				id: '2'
			}).then(() => {
				this.showloading = false
				// #ifdef H5
				this.util.setNT(this.layout.pageSetting[0].styles.navTitle || '个人中心')
				// #endif
			});
			this.getConfig({
				key: 'vipset',
				api: 'config',
				params: {
					ident: 'vipSet'
				}
			})
			this.getLayout()
		},
		onShow() {
			if (this.uId) {
				this.refreshUser({
					nomask: 1,
					get: 1,
					now: 1,
				})
			}
		},
		computed: {
			...mapState({
				layout: state => state.layout.personalcenter.body || {},
			})
		},

		methods: {
			...mapActions(['getConfig']),
			onClick() {
				this.$emit('click');
			}
		},
		onPageScroll(e) {
			if (this.opcity >= 1 && e.scrollTop / 64 >= 1) {
				return;
			}
			let o = e.scrollTop / 64
			this.opcity = o;
		},
	};
</script>
<style scoped lang="scss">
</style>
