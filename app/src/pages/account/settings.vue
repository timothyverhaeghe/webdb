<template>
    <div class="w-full min-h-screen flex items-start justify-center bg-gray-100">

       <main class="flex-1 overflow-y-auto focus:outline-none mt-10" tabindex="0">
          <div class="relative max-w-4xl mx-auto md:px-8 xl:px-0">
            <div class="pt-10 pb-16">
              <div class="px-4 sm:px-6 md:px-0">
                <div class="py-6">
                  <!-- Tabs -->

                  <div>
                    <div class="space-y-1 flex items-start justify-between">
                      <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                          My Profile
                        </h3>
                        <p class="max-w-2xl text-sm text-gray-500">
                          Edit your own profile information.
                        </p>
                      </div>
                    </div>


                    <div class="flex flex-row flex-wrap">
                    <div class="w-6/12">

                    <div class="mt-6">
                      <dl class="divide-y divide-gray-200">
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt class="text-sm font-medium text-gray-500">
                            First Name
                          </dt>
                          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input type="text" v-model="user.firstname" class="flex-grow focus:outline-none bg-white px-3 py-2 rounded-lg">
                          </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt class="text-sm font-medium text-gray-500">
                            Last Name
                          </dt>
                          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input  v-model="user.lastname" type="text" class="flex-grow focus:outline-none bg-white px-3 py-2 rounded-lg">
                          </dd>
                        </div>


                        <!--
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt class="text-sm font-medium text-gray-500">
                            Photo
                          </dt>
                          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input v-model="user.avatar" type="text" class="flex-grow focus:outline-none bg-white px-3 py-2 rounded-lg">
                          </dd>
                        </div>

                      -->

                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                          <dt class="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input v-model="user.email" type="email" class="flex-grow focus:outline-none bg-white px-3 py-2 rounded-lg">
                          </dd>
                        </div>

                      </dl>


                      <button @click="save()" type="button" class="rounded font-medium bg-brand text-white px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        Save profile
                      </button>


                    </div>

                  </div>

                  <div class="w-6/12">

                    <div class="flex flex-row p-5">
                      <div @click="$refs.file.click()" ref="avatarPreview" class="ml-auto mr-auto flex flex-col items-center">
                        <div class="w-40 h-40 cursor-pointer bg-white rounded-full">
                          <img class="w-full h-full rounded-full object-cover" :src="user.avatar" alt="">
                        </div>
                        <div class="text-sm mt-2 text-blue-500 cursor-pointer">Change profile photo</div>
                        <input @change="setProfilePicture" type="file" ref="file" style="display: none">

                      </div>
                    </div>


                  </div>

                </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
</template>

<script>
import env from '@/../env.js';
import auth from '@/helpers/auth';

const axios = require('axios');

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        avatar: '',
      },
      spiderchartVersion: 1, // this is a bug in chartJS/Vue-chartJS (reactivity)
      aikey: '',
    }
  },
  methods: {
    logout: function(){
      auth.cookies.remove('session');
      document.location.href = '/';
    },
    save: function(){
      // TODO: we should replace this with the auth module.
      axios.put(env.apiURL + '/users/me', this.user, {
        headers: {
          'Authorization': 'Bearer '+auth.cookies.get('session')
        }
      }).then(async function (response) {
        console.log(response);
        alert('Profile saved')
      });
    },

    setProfilePicture: function (e) {

      let droppedFiles = e.target.files;
      if (!droppedFiles) return;
      if (droppedFiles.length !== 1) return;
      let formData = new FormData();
      formData.append('file', droppedFiles[0]);
      fetch(env.apiURL + '/users/me/profile-picture', {
          method: 'PUT',
          body: formData,
          headers: {
            'authorization': 'Bearer ' + auth.cookies.get('session'),
          }
        })
        .then(res => res.json())
        .then(res => {
          this.$refs.avatarPreview.style.backgroundImage = 'url(' + res.picture + ')'
          document.location.reload();
        })
        .catch(e => {
          console.error(JSON.stringify(e.message));
      });
    },
  },
  async mounted() {
    this.user = await auth.me().catch(() => {});
  }
}
</script>

<style>


  .slide-fade-enter-active {
    transition: all .4s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
