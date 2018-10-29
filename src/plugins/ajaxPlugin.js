import ajax from '@/api/ajax'

let ajaxPlugin = {}
ajaxPlugin.install = Vue => {
  Vue.prototype.$ajax = ajax
}

export default ajaxPlugin
