<template>
		<tab-bar>
			<tab-bar-item path="/cms">
			<!-- html中要加别名需要添加~ -->
				<img src="~assets/img/tabbar/normal/cms.svg" slot="item-icon" />
				<img src="~assets/img/tabbar/active/cms-active.svg" slot="item-icon-active" />
				<div slot="item-text">CMS</div>
			</tab-bar-item>
			<tab-bar-item path="/tooling">
				<img src="~assets/img/tabbar/normal/tooling.svg" slot="item-icon" />
				<img src="~assets/img/tabbar/active/tooling-active.svg" slot="item-icon-active" />
				<div slot="item-text">Tooling</div>
			</tab-bar-item>
		</tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
	name: 'MainTabBar',
	data() {
		return {}
	},
	components: {
		TabBar,
		TabBarItem
	}
}
</script>

<style  scoped>
</style>