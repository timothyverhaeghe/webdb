<template>
  <div id="app" class="relative antialiased bg-white">
    <div class="flex flex-col items-start justify-start min-h-screen" v-if="user && user._id">

      <div class="">
      <nav class="w-screen w-full bg-dark border-b border-dark text-white z-0 fixed">
        <div class="relative w-full flex flex-row justify-start items-center h-16 flex-shrink-0 bg-dark">
          <div class="container mx-auto h-16 flex flex-row justify-center px-3">
            <router-link to="/" class="text-xl cursor-pointer px-4 flex flex-row items-center justify-center font-semibold">
              <span class="text-brand">web</span><span class="text-white">database</span>
            </router-link>
            <div class="h-full flex flex-row items-center px-2 w-4/12">


              <router-link to="/collections" v-if="path.indexOf('/projects/new') == -1" class="h-full flex flex-col justify-center cursor-pointer px-4 flex ">
                Collections
              </router-link>

            </div>
            <div class="flex flex-row items-center justify-end ml-auto">

              <div class="h-full flex-row flex">


                <!-- Documentation -->
                <a href="https://docs.webfaster.com" target="_blank" to="/projects" v-if="path.indexOf('/projects/new') == -1" class=" w-10 flex flex-col justify-center cursor-pointer px-4 flex ">
                  <svg class="text-white h-4 w-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>
                </a>


              <!-- Project settings  -->
              <router-link to="/settings" v-if="path.indexOf('/projects/new') == -1" :class="$route.path == '/activity' ? 'border-white' : 'border-white'" class=" w-14 flex flex-col justify-center cursor-pointer px-4 flex ">
                <svg class="text-white h-4 w-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </router-link>

              <div class="border-r py-2 border-gray-600 text-white my-4">
              </div>

            </div>


              <button v-click-outside="clickOutsideProfileMenu" @click="openProfile = !openProfile" class="z-10 flex flex-row items-center justify-end px-3 pl-5 py-2 rounded-full gap-3 transition duration-200 relative focus:outline-none focus:shadow-outline">
                <div>
                  <p class="font-semi-bold text-sm  text-right leading-none">
                    {{user.firstname}}
                  </p>
                </div>
                <div class="relative w-8 h-8">
                  <div v-if="user.avatar == undefined" class="w-8 h-8 bg-white rounded-full"></div>
                  <img v-else class="h-8 w-8 rounded-full" :src="user.avatar" alt="">
                </div>
                <!--SUB-->
                <div v-if="openProfile == true" class="z-10 subnav absolute top-0 right-0 mt-12 flex flex-col items-start justify-start bg-white rounded-xl text-gray-500 text-sm divide-y divide-blue-100 font-medium shadow-lg overflow-hidden">

                  <router-link to="/projects" class="w-full text-left px-5 py-4 pr-16 flex flex-row items-center justify-start gap-3 transition duration-300 group">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path></svg>
                    <span class="">Projects</span>
                  </router-link>

                  <router-link to="/account" class="w-full text-left px-5 py-4 pr-16 flex flex-row items-center justify-start gap-3 transition duration-300 group">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span class="">Account</span>
                  </router-link>


                  <button @click="logout()" class="w-full text-left px-5 py-4 pr-16 hover:bg-red-500 text-red-500 flex flex-row items-center justify-start gap-3 transition duration-300 group">
                    <svg class="h-4 w-4 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span class="group-hover:text-gray-800">Logout</span>
                  </button>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>



      <router-view class="body w-screen"></router-view>
    </div>

    <router-view v-else class="body"></router-view>

  </div>
</template>

<script>
import auth from '@/helpers/auth';

export default {
  name: 'app',
  data: function () {
    return {
      loading: true,
      board: {},
      href: '',
      openProfile: false,
      user: {},
      path: '',
    }
  },
  components: {
    //headerNav
  },
  methods: {
    logout: function () {
      auth.cookies.remove('session');
      document.location.href = '/';
    },
    clickOutsideProfileMenu: function(){
      this.openProfile = false;
    },
  },
  watch: {
    '$route': function(){
      this.href = document.location.href;
      this.path = this.$route.path
    }
  },
  computed: {
  },
  async created() {
    this.path = this.$route.path
    this.href = document.location.href;

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });

    if (!this.user || !this.user._id) {
      // Is this user trying to reset his/her password? Else, redirect to login page.
      if (
        document.location.href.indexOf('/login') == -1 &&
        document.location.href.indexOf('/preview') == -1 &&
        document.location.href.indexOf('/share/') == -1 &&
        document.location.href.indexOf('/token') == -1
      ) {
        this.$router.replace({path: "/login"});
        this.loading = false;
      } else {
        this.loading = false;
      }
    } else {
      this.board = this.user.board;

      //this.$store.commit('setUser', this.user);
      this.loading = false;
    }

  },
}
</script>


<style>

.svg-bg{
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23eaeaea' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.taskani-item {
  transition: all 0.5s;
  display: inline-block;
}
.taskani-leave-active {
  position: absolute;
}
.taskani-enter, .taskani-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}
</style>
