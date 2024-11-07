<template>
	<view
		class="card"
		:style="{
			marginTop: styles.marginTop + 'px',
			marginBottom: styles.marginBottom + 'px'
		}"
	>
		<view :style="{ background: styles.colorBg }">
			<v-tabs
				:color="styles.colorWord"
				:activeColor="styles.colorSelect"
				:lineColor="styles.colorSelect"
				:bold="false"
				lineHeight="5rpx"
				:style="{ marginRight: styles.marginRight + 'px' }"
				v-model="current"
				:tabs="styles.cardList"
				field="name"
				@change="changeTab"
				
			></v-tabs>
		</view>
	</view>
</template>
<script>
export default {
	name: 'card',
	data() {
		return {
			current: 2
		};
	},
	components: {},
	methods: {
		changeTab(index) {
			
		}
	},
	mounted() {
		
	},
	props: ['styles']
};
</script>
<style lang="scss" scoped>
.card {

	&>view{
		
	}
}
</style>
