import Layout from '@/views/layout/Layout'

const productRoute = {
  path: '',
  redirect: '/product/spu',
  meta: { title: '商品', icon: 'product'},
  children: [
    {
      path: 'spu',
      component: () => import('@/views/product/spu'),
      name: 'product-spu',
      meta: { title: 'SPU列表' }
    }
  ]
}

export default productRoute
