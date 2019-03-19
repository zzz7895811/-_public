import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import colSet from '@/view/colSetting'
import testEs6 from '@/view/testEs6'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'colSet',
      component: colSet
    },
    {
      path: '/Es6',
      name: 'testEs6',
      component: testEs6
    },
  ]
})
