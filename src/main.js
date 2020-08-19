import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/css/theme-green/index.css'; // 浅绿色主题
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(axios)
Vue.prototype.$axios = axios;
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
