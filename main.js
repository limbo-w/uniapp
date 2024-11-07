import Vue from 'vue'
import App from './App'
import store from './store'
import util from './common/we7/util';
import api from './common/api';
// import _ from 'lodash'
import common from './common/common'

import TabBar from '@/components/common/tabbar.vue'
import MgImg from '@/components/common/mg-img.vue'
import MgCell from '@/components/common/mg-cell.vue'

// Vue.prototype.$store = store
Vue.prototype.util = util
Vue.prototype.api = api
// Vue.prototype._ = _
Vue.config.productionTip = false

Vue.use(common);
Vue.component('tab-bar', TabBar)
Vue.component('mg-img', MgImg)
Vue.component('mg-cell', MgCell)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
