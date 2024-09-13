<template>
	<div>
		<el-scrollbar wrap-class="scrollbar-wrapper" class="menu_scrollbar">
			<el-menu :default-openeds="[]" :unique-opened="true" default-active="0" class="menu_view"
				:collapse="collapse">
				<el-sub-menu :index="0" @click="menuHandler('')">
					<template #title>
						<i class="iconfont icon-zhuye2"></i>
						<span>首页</span>
					</template>
				</el-sub-menu>
				<el-sub-menu v-for=" (menu,index) in menuList.backMenu" :key="menu.menu" :index="index+2+''">
					<template #title>
						<i class="iconfont" :class="menu.fontClass"></i>
						<span>{{ menu.menu }}</span>
					</template>
					<el-menu-item class="menu_item_view" v-for=" (child,sort) in menu.child" :key="sort"
						:index="(index+2)+'-'+sort" @click="menuHandler(child.tableName,child.menuJump)">{{ child.menu }}
					</el-menu-item>
				</el-sub-menu>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import menu from '@/utils/menu'
	import {
		ref,
		toRefs,
		getCurrentInstance,
		nextTick
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//props
	const props = defineProps({
		collapse: Boolean
	})
	const {
		collapse
	} = toRefs(props)
	//data
	const menuList = ref([])
	const role = ref('')
	const styleChange = () => {
		nextTick(() => {
			document.querySelectorAll('.el-menu-vertical-demo .el-sub-menu .el-menu').forEach(el => {
				el.removeAttribute('style')
				const icon = {
					"border": "none",
					"padding": "0",
					"margin": "10px auto 0",
					"borderRadius": "0px",
					"background": "none",
					"display": "none",
					"width": "100%"
				}
				Object.keys(icon).forEach((key) => {
					el.style[key] = icon[key]
				})
			})
		})
	}
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	const init = () => {
		const menus = menu.list()
		if (menus) {
			menuList.value = menus
		}
		role.value = context?.$toolUtil.storageGet('role')

		for (let i = 0; i < menuList.value.length; i++) {
			if (menuList.value[i].roleName == role.value) {
				menuList.value = menuList.value[i];
				break;
			}
		}
		// styleChange()
	}
	const menuHandler = (name,menuJump) => {
		if(name == 'center'){
			name = `${role.value}Center`
		}
		if(name == 'storeup'){
			name = `storeup?type=${menuJump}`
		}
		if(name == 'exampaper' && menuJump == '12'){
			name = 'exampaperlist'
		}
		if(name == 'examrecord' && menuJump == '22'){
			name = 'examfailrecord'
		}
		let router = context?.$router
		name = '/' + name
		router.push(name)
	}
	init()
</script>

<style lang="scss" scoped>
	// 总盒子
	:deep(.menu_scrollbar) {

		// 菜单盒子
		.menu_view {
			padding: 0 0 0 6px;
			color: #fff;
			background: transparent;
			height: 100%;

			// 无二级菜单
			.el-menu-item {
				border-radius: 4px;
				padding: 0 10px;
				color: #9CC4E5;
				background: #fff;
				line-height: 50px;
				text-align: center;
				height: 50px;
				.iconfont {
					margin: 0 5px 0 0;
					color: inherit;
					width: 34px;
					vertical-align: middle;
					font-size: 20px;
					text-align: center;
				}
			}

			// 无二级悬浮
			.el-menu-item:hover {
				border-radius: 4px;
				padding: 0 10px;
				color: #fff;
				background: #62B8FF;
				line-height: 50px;
				text-align: center;
				height: 50px;
			}

			// 无二级选中
			.el-menu-item.is-active {
				border-radius: 4px;
				padding: 0 10px;
				color: #ccc;
				background: #123;
				line-height: 50px;
				text-align: center;
				height: 50px;
			}

			// 有二级盒子
			.el-sub-menu {
				cursor: pointer;
				border-radius: 4px;
				padding: 0 0;
				box-shadow: -4px -4px 0 #B9D4EF;
				margin: 6px 0;
				color: #333;
				white-space: nowrap;
				background: #fff;
				position: relative;

				// 有二级item
				.el-sub-menu__title {
					border-radius: 4px;
					padding: 0 10px;
					color: #9CC4E5;
					background: #fff;
					line-height: 50px;
					text-align: center;
					height: 50px;
					.iconfont {
						margin: 0 5px 0 0;
						color: inherit;
						width: 34px;
						vertical-align: middle;
						font-size: 20px;
						text-align: center;
					}
					.el-sub-menu__icon-arrow{
						margin: -3px 0 0 8px;
						color: inherit;
						vertical-align: middle;
						font-size: 12px;
						position: static;
					}
				}

				// 有二级item悬浮
				.el-sub-menu__title:hover {
					border-radius: 4px;
					padding: 0 10px;
					color: #fff;
					background: #62B8FF;
					line-height: 50px;
					text-align: center;
					height: 50px;
				}
			}
			//二级选中
			.is-active {
				.el-sub-menu__title {
					border-radius: 4px;
					padding: 0 10px;
					color: #ccc;
					background: #123;
					line-height: 50px;
					text-align: center;
					height: 50px;
				}
			}
			// 二级盒子
			.el-menu--inline {
				border: none;
				padding: 0;
				background: #DEF0FF;
				// 二级菜单
				.menu_item_view {
					padding: 0 40px;
					color: #9E9E9E;
					background: transparent;
					line-height: 50px;
					text-align: center;
					height: 50px;
				}
				// 二级悬浮
				.menu_item_view:hover {
					padding: 0 40px;
					color: #f00;
					background: #62B8FF;
					line-height: 50px;
					height: 50px;
				}
				// 二级选中
				.is-active.menu_item_view {
					padding: 0 40px;
					color: #000;
					background: #62B8FF;
					line-height: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
<style lang="scss">
	.el-popper{
		.el-menu--popup-container {
			.el-menu--popup{
				border: none;
				padding: 0;
				background: #DEF0FF;
				// 二级菜单
				.menu_item_view {
					padding: 0 40px;
					color: #9E9E9E;
					background: transparent;
					line-height: 50px;
					text-align: center;
					height: 50px;
				}
				// 二级悬浮
				.menu_item_view:hover {
					padding: 0 40px;
					color: #f00;
					background: #62B8FF;
					line-height: 50px;
					height: 50px;
				}
				// 二级选中
				.is-active.menu_item_view {
					padding: 0 40px;
					color: #000;
					background: #62B8FF;
					line-height: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
