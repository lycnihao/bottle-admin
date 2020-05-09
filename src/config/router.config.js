// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/admin/disk',
    children: [
      {
        path: '/admin/disk',
        name: 'FileList',
        component: () => import('@/views/file/FileList'),
        meta: { title: '全部文件', keepAlive: true, icon: bxAnaalyse }
      },
			{
			  path: '/admin/share',
			  name: 'Share',
			  component: () => import('@/views/file/Share'),
			  meta: { title: '我的分享', keepAlive: true, icon: 'share-alt' }
			}
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/admin',
    component: UserLayout,
    redirect: '/admin/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import('@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
	{
	  path: '/install',
		name: 'Install',
	  component: () => import('@/views/system/Installation')
	},
	{
		  path: '/s/:key',
		  name: 'share_v',
		  component: () => import('@/views/file/ShareView')
		},
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }

]
