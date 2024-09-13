<template>
	<div style="height: 100%;">
		<index-aside :collapse="collapse" class="index-aside" style="max-width: 210px" :style="{'width':collapse?'64px':'100%'}"></index-aside>
		<el-main class="main_view index_transition" style="max-width:100%"
			:style="{'margin-left':collapse?'63px':'210px'}">
			<index-header class="index_header index_transition" :collapse="collapse"
				@collapseChange="collapseChange" :style="{'width':'100%','max-width':'100%'}">
			</index-header>
			<index-tags class="index_tags" :style="{'width':'100%','max-width':'100%'}">
			</index-tags>
			<router-view class="router-view index_transition"
				style="background: transparent;max-width:100%" v-slot="{Component}">
				<keep-alive>
					<transition :name="animation">
						<component :is="Component" />
					</transition>
				</keep-alive>
			</router-view>
		</el-main>
	</div>
</template>

<script setup>
	import IndexAside from '@/components/index/indexMenu'
	import IndexHeader from '@/components/index/indexTop'
	import IndexTags from '@/components/index/indexTags'
	import menu from "@/utils/menu";
	import router from '../../router'
	import {
		ref,
		getCurrentInstance
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	import {
		onBeforeRouteUpdate
	} from 'vue-router';
	const animation = ref('slide');
	const collapse = ref(false)
	onBeforeRouteUpdate((to, form) => {
		if (to.meta.index > form.meta.index) {
			animation.value = 'slide-right'
		} else {
			animation.value = 'slide-right'
		}
	})
	const collapseChange = () => {
		collapse.value = !collapse.value
	}
	const menuList = ref(null)
	const role = ref('')
	const init = () => {
		const menus = menu.list()
		if (menus) {
			menuList.value = menus
		}
		role.value = context?.$toolUtil.storageGet('role')
		for (let i = 0; i < menuList.value.length; i++) {
			if (menuList.value[i].roleName == role.value) {
				menuList.value = menuList.value[i].backMenu;
				break;
			}
		}
		let arr = makeMenu(menuList.value)

		router.addRoute(arr)
	}
	const makeMenu = (menu) => {
		let brr = {
			path: '/1',
			component: () => import('../../views/index'),
			children: []
		}
		for (let x in menu) {
			for (let i in menu[x].child) {
				brr.children.push({
					path: '/' + menu[x].child[i].tableName,
					name: menu[x].child[i].menu,
					component: () => import(`../../views/${menu[x].child[i].tableName}/list.vue`)
				})
			}
		}
		return brr
	}
	// init()
</script>
<style lang="scss" scoped>
	.slide-right-enter {
		opacity: 1;
		transform: translateX(0);
	}

	.slide-right-enter-active {
		transition: all 0.3s;
	}

	.slide-right-enter-to {
		transform: scale(1);
	}

	.slide-right-leave {
		transform: (0);
	}

	.slide-right-leave-active {
		transition: all 0.3s;
	}

	.slide-right-leave-to {
		transform: scale(0.5) skew(20deg,20deg);
		opacity: 0;
	}

	a:hover {
		background: #00c292;
	}

	.el-main {
		padding: 30px 0 0 !important;
		margin: 64px 0 0 210px;
	}

	.main_view {
		position: relative;
		padding:0;
	}

	.index-aside {
		z-index: 999;
		overflow: hidden;
		top: 64px;
		left: 0;
		background: #EBEBEB;
		width: 210px;
		position: fixed;
		height: calc(100% - 64px);
	}

	.index_header {
		width: 100%;
		z-index: 999;
	}

	.index_tags {
		width: 100%;
		z-index: 999;
	}

	.router-view {
		padding: 30px;
	}
	.index_transition{
		transition:all .35s;
	}
</style>
