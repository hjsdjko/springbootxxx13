	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import ketangjilu from '@/views/ketangjilu/list'
	import honglingjindaka from '@/views/honglingjindaka/list'
	import ketangbaoming from '@/views/ketangbaoming/list'
	import dakarenwu from '@/views/dakarenwu/list'
	import tuoguanjilu from '@/views/tuoguanjilu/list'
	import xuesheng from '@/views/xuesheng/list'
	import dierketang from '@/views/dierketang/list'
	import jiaqituoguan from '@/views/jiaqituoguan/list'
	import jiaoshi from '@/views/jiaoshi/list'
	import zuoyetijiao from '@/views/zuoyetijiao/list'
	import xueshengchengji from '@/views/xueshengchengji/list'
	import storeup from '@/views/storeup/list'
	import users from '@/views/users/list'
	import zuoyexinxi from '@/views/zuoyexinxi/list'
	import kechengbiao from '@/views/kechengbiao/list'
	import honglingjinrenwu from '@/views/honglingjinrenwu/list'
	import discussdierketang from '@/views/discussdierketang/list'
	import tuoguanbaoming from '@/views/tuoguanbaoming/list'
	import anquanjiaoyu from '@/views/anquanjiaoyu/list'
	import config from '@/views/config/list'
	import jiaoshiCenter from '@/views/jiaoshi/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/jiaoshiCenter',
			name: '教师个人中心',
			component: jiaoshiCenter
		}
		,{
			path: '/news',
			name: '公告信息',
			component: news
		}
		,{
			path: '/ketangjilu',
			name: '课堂记录',
			component: ketangjilu
		}
		,{
			path: '/honglingjindaka',
			name: '红领巾打卡',
			component: honglingjindaka
		}
		,{
			path: '/ketangbaoming',
			name: '课堂报名',
			component: ketangbaoming
		}
		,{
			path: '/dakarenwu',
			name: '打卡任务',
			component: dakarenwu
		}
		,{
			path: '/tuoguanjilu',
			name: '托管记录',
			component: tuoguanjilu
		}
		,{
			path: '/xuesheng',
			name: '学生',
			component: xuesheng
		}
		,{
			path: '/dierketang',
			name: '第二课堂',
			component: dierketang
		}
		,{
			path: '/jiaqituoguan',
			name: '假期托管',
			component: jiaqituoguan
		}
		,{
			path: '/jiaoshi',
			name: '教师',
			component: jiaoshi
		}
		,{
			path: '/zuoyetijiao',
			name: '作业提交',
			component: zuoyetijiao
		}
		,{
			path: '/xueshengchengji',
			name: '学生成绩',
			component: xueshengchengji
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/users',
			name: '管理员',
			component: users
		}
		,{
			path: '/zuoyexinxi',
			name: '作业信息',
			component: zuoyexinxi
		}
		,{
			path: '/kechengbiao',
			name: '课程表',
			component: kechengbiao
		}
		,{
			path: '/honglingjinrenwu',
			name: '红领巾任务',
			component: honglingjinrenwu
		}
		,{
			path: '/discussdierketang',
			name: '第二课堂评论',
			component: discussdierketang
		}
		,{
			path: '/tuoguanbaoming',
			name: '托管报名',
			component: tuoguanbaoming
		}
		,{
			path: '/anquanjiaoyu',
			name: '安全教育',
			component: anquanjiaoyu
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
