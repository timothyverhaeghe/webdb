import Vue from 'vue'
import App from '@/App.vue'
//import store from '@/helpers/store'

import router from '@/router/index'

import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

Vue.config.productionTip = false // Hide the propduction tip

//import moment from 'moment'
import moment from 'moment-timezone'

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  'seconds',
    ss: '%ss',
    m:  'a minute',
    mm: '%dm',
    h:  'an hour',
    hh: '%dh',
    d:  'a day',
    dd: '%dd',
    M:  'a month',
    MM: '%dM',
    y:  'a year',
    yy: '%dY'
  }
});

Vue.prototype.moment = moment

import './assets/styles/style.css';

window.app = new Vue({
  render: h => h(App),
  router,
  //store
}).$mount('#app')
