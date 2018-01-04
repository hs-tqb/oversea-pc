import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')

const store = () => new Vuex.Store({
  state: {
    isSidebarCollapsed: true,
    token       : '',
    production  : null,
    merchantInfo: null,
  },

  mutations: {
    setSidebarCollapseState (state, flag) {
      state.isSidebarCollapsed = flag;
    },
    saveToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    saveProduction (state, production) {
      state.production = production;
      localStorage.setItem('production', JSON.stringify(production));
    },
    saveMerchantInfo (state, info) {
      state.merchantInfo = { ...(state.merchantInfo||{}), ...info };
      localStorage.setItem('merchantInfo', JSON.stringify(state.merchantInfo));
    }
  },
  getters: {
    production (state) {
      return (state.production=getLocalStorage('production'))
    },
    token (state) {
      return (state.token=getLocalStorage('token', 'string'));
    },
    merchantInfo (state) {
      return (state.merchantInfo=getLocalStorage('merchantInfo'));
    }
  },
  actions: {
    // ...
  }
})

function getLocalStorage(name, type) {
  try {
    return type==='string'? localStorage.getItem(name): JSON.parse( localStorage.getItem(name)||'{}' );
  } catch(e) {
    return type==='string'? '': '{}';
  }
}

export default store