import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from '@/helpers/cookies';
import env from '@/../env.js';

const axios = require('axios');

Vue.use(Vuex);

const getSource = async function (sourceId) {
  const data = await axios.get(`${env.apiURL}/sources/${sourceId}`);
  return data.data;
};

export default new Vuex.Store({
  state: {
    user: {},
    project: {},
    pageLoaded: false,
    events: [],
    showDownloadOptions: false,
    breadcrumbs: [],
    citations: [],
    citationIds: [],
  },
  methods: { },
  mutations: {
    /* Set entire user object */
    setUser(state, user) {
      state.user = user;
    },
    setProject(state, data) {
      console.log('Store updated:', data)
      state.project = data;
      Cookies.set('project', data._id, 14);
    },
    logout() {
      // Trigger to remove the session
      console.log('[EVENT] Logout');
      Cookies.remove('session');
      document.location.reload();
    },
    pageLoad(state, status) {
      state.pageLoaded = status;
    },
    setBreadcrumbs(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    },
    downloadable(state, status) {
      state.showDownloadOptions = status;
    },
    resetCitations(state) {
      state.citations = [];
      state.citationIds = [];
    },
    async addCitation(state, citation) {
      if (state.citationIds.indexOf(citation.id) == -1) {
        state.citationIds.push(citation.id);
        citation.rank = state.citationIds.indexOf(citation.id);

        const data = await getSource(citation.id);
        state.citations.push(data);
      } else {
        citation.rank = state.citationIds.indexOf(citation.id);
      }
    },
    reload(state) {
      state.pageLoaded = false;
      document.location.href = '/';
    },
    // This is an Async function because we always
    // want to make sure that the cookie is set before
    // continueing :)
    async setSession(state, session) {
      return new Promise(async (resolve) => {
        if (session) {
          Cookies.set('session', session, 14);
          resolve();
        } else {
          Cookies.remove('session');
          resolve();
        }
      });
    },

    /* Events & history */
    setEvents(state, events) {
      state.events = events;
    },
    addEvent(state, ev) {
      state.events.unshift(ev); // push it as first element.
    },

  },
});
