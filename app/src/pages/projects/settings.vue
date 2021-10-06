<template>
    <div class="w-full bg-gray-50" style="min-height: 100vh;">

      <div v-if="newUser" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div @click="newUser = false" class="cursor-pointer fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Invite someone
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Working in project is better than working alone. Invite some awesome people to your project.
                  </p>
                </div>
              </div>

              <div class="mt-2">

                <div class="mt-6 w-full flex flex-row">
              <div class="w-6/12 pr-1">
                <label class="block text-sm font-medium text-gray-700">Firstname</label>
                <div class="mt-1">
                  <input v-model="newUser.firstname" type="text" class="border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Fred">
                </div>
              </div>


              <div class="w-6/12 pl-1">
                <label class="block text-sm font-medium text-gray-700">Lastname</label>
                <div class="mt-1">
                  <input v-model="newUser.lastname" type="text" class="border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Kroket">
                </div>
              </div>
                </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                  <input v-model="newUser.email" type="text" class="border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="fred@example.com">
                </div>
              </div>



              </div>


            </div>
            <div class="mt-10 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button @click="addUser" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-branding text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                Invite
              </button>
              <button @click="newUser = false" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>


        <div class="mt-24 w-9/12 mx-auto">

      <div class="text-3xl text-branding font-bold mb-2">{{project.name}} settings</div>



        <div class="mt-4">
          <div class="">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <div @click="page = 'general'" :class="page == 'general' ? 'font-bold text-branding border-branding': 'border-transparent text-gray-500'" class="cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  General
                </div>


                <div @click="page = 'team'" :class="page == 'team' ? 'font-bold text-branding border-branding': 'border-transparent text-gray-500'" class="cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                   Team
                </div>


                <div @click="page = 'integrations'" :class="page == 'integrations' ? 'font-bold text-branding border-branding': 'border-transparent text-gray-500'" class="cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                   Integrations
                </div>

              </nav>
            </div>
          </div>
        </div>





        <div v-if="page == 'team'" class="mt-10">
          <div class="flex flex-col mt-10">
              <div class="flex flex-row">
                  <div class="px-2">
                      <div class="text-xl">Your team</div>
                      <div class="text-gray-600">These are all the people that can access and edit your team.</div>
                  </div>
                  <div class="ml-auto flex flex-row items-center justify-center">
                      <div @click="newUser = {}" class="rounded bg-branding text-white px-3 py-1 cursor-pointer">Invite user</div>
                  </div>
              </div>

              <div v-if="team.users && team.users.length > 0" class="flex flex-col mt-6 shadow">
                  <div class="flex flex-row h-12 bg-white items-center border border-gray-100">
                      <div class="w-3/12 px-4">Name</div>
                      <div class="w-3/12 px-4">Email</div>
                      <div class="w-3/12 px-4">Role</div>
                      <div class="w-3/12 px-4"></div>
                  </div>

                  <div v-for="member in project.users" v-bind:key="member._id" class="flex flex-row h-12 bg-white border-gray-100 items-center border-r border-l border-b">
                      <div class="w-3/12 px-4">
                          <div class="text-xs">{{member.user.firstname}} {{member.user.lastname}}</div>
                      </div>
                      <div class="w-3/12 px-4">
                          <div class="text-xs">{{member.user.email}}</div>
                      </div>
                      <div class="w-3/12 px-4">
                          <div class="text-xs">{{member.role}}</div>
                      </div>
                      <div class="w-3/12 px-4 flex flex-row">
                        <div v-if="member.user._id == user._id" class="text-xs ml-auto">(you)</div>
                        <div v-else @click="removeUser(member)" class="cursor-pointer text-xs ml-auto">Remove</div>
                      </div>
                  </div>

              </div>

              <div v-else class="text-center mt-24">
                You currently don't have any project members
              </div>
          </div>
        </div>



        <div v-if="page == 'integrations'" class="mt-10">

          <div class="flex flex-row">
              <div class="px-2">
                  <div class="text-xl">Your integrations</div>
                  <div class="text-gray-600">Here you'll see all the plugins that you have access to.</div>
              </div>
          </div>


          <div class="flex flex-col my-6 rounded border">

            <div v-for="plugin in integrations" v-bind:key="plugin._id" class="flex flex-row bg-white border-b p-3 hover:bg-gray-100 cursor-pointer">

              <div class="w-1/12 flex flex-row justify-center items-center">
                <img class="h-14 w-14" :src="plugin.logo" />
              </div>

              <div class="w-10/12 flex flex-col justify-center">
                <div class="text-xl">{{plugin.name}}</div>
                <div class="text-xs text-gray-600">{{plugin.desc}}</div>
              </div>

              <div class="w-1/12 flex flex-row items-center justify-end px-4">
                <div v-if="false" class="bg-green-100 px-2 rounded-md text-green-600 text-sm">Active</div>
                <div class="text-sm text-gray-600">Configure</div>
                <svg class="text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>

            </div>


          </div>


          <div v-if="false" class="flex flex-row flex-wrap mb-10">

            <div v-for="plugin in integrations" v-bind:key="plugin._id" class="w-3/12 p-4">
              <div class="w-full cursor-pointer h-40 border rounded bg-white flex flex-col items-center justify-center">
                <div class="text-2xl">{{plugin.name}}</div>
                <div class="text-sm px-2 text-center mt-2 text-gray-600">{{plugin.desc}}</div>
              </div>
            </div>


          </div>




        </div>


        <div v-if="page == 'general'" class="mt-10">

          <div class="space-y-6">
            <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">General</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    This general information is used throughout your entire application and can be accessed by every plugin.
                  </p>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="space-y-6">


                    <div class="col-span-6 sm:col-span-4">
                      <label for="email_address" class="block text-sm font-medium text-gray-700">Project name</label>
                      <input v-model="project.name" type="text" placeholder="Project name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>


                    <!--
                    <div class="col-span-6 sm:col-span-4">
                      <label for="email_address" class="block text-sm font-medium text-gray-700">About (use hashtags etc. to describe your account/audience)</label>
                      <textarea v-model="account.about" rows="3" placeholder="#marketing #technology #startups" class="lowercase border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                    </div>
                  -->


                </div>
              </div>
            </div>
              </div>


            <div class="flex justify-end">
              <button @click="remove()" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 focus:outline-none">
                Delete project
              </button>

              <button @click="save()" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-branding focus:outline-none">
                Save
              </button>
            </div>
          </div>




        </div>




        </div>
    </div>
</template>


<script>
import auth from '@/helpers/auth';
import API from '@/helpers/api'
import env from '@/../env'


export default {
  name: 'settings',
  data() {
    return {
      user: {},
      env,
      project: {
        name: '',
        users: [],
      },

      plugins: [],
      integrations: [],
      page: 'general',
      newUser: false,
    }
  },
  methods: {
    save: async function(){
      await API.put('/projects/'+this.project._id, this.project);
      alert('Saved!');
    },

    remove: async function(){
      if(confirm('Are you sure you want to delete this project and all its content?')){
        await API.delete('/projects/'+this.user.project._id);
        this.$router.push({'path': '/projects'});
        document.location.reload()
      }
    },

    removeUser: async function(user){
      if(confirm('Are you sure you want to delete this user?')){
        await API.delete('/projects/'+this.user.project._id+"/team/"+user._id);
        this.project.users.splice(this.project.users.indexOf(user), 1);
      }
    },

    addUser: async function(){
      if(!this.newUser.email || this.newUser.email.indexOf('@') == -1 || this.newUser.email.length < 3){
        alert('It seems that this emailadres is incorrect.');
        return false;
      }

      const user = await API.post('/projects/'+this.user.project._id+"/team", this.newUser);
      if(user.error){
        alert(user.erorr);
        return false
      }
      this.newUser = false;
      this.project.users.push({
        role: 'ADMIN',
        user: user
      });

    },

  },
  watch: {
  },
  async mounted() {

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });

    console.log(this.user)

    var project = await API.get('/projects/'+this.user.project._id);
    this.project = project;


    var integrations = await API.get('/integrations');
    this.integrations = integrations.data;


  }
}
</script>

<style>

</style>
