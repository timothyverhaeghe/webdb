<template>
    <div class="w-full z-0 mt-14">

        <div class="mt-20 w-full mx-auto">

          <div  class="flex flex-col mt-10 mx-auto w-1/2 mt-10">
              <div class="flex flex-row">
                  <div class="px-2">
                      <div class="text-4xl font-bold">Setup a new project</div>
                      <div class="text-gray-600 text-lg mt-1">We'll help you get started based on your responses.</div>
                  </div>
              </div>

            <div class="flex flex-col flex-wrap mt-10 w-full">

              <div class="">
                <label for="location" class="block font-medium text-gray-700">Project name</label>
                <input v-model="project.name" type="text" placeholder="Timothy's personal project" class="text-lg mt-1 block w-full pl-3 pr-10 py-4 border rounded text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md" />
              </div>

            </div>



            <div class="mt-6 flex flex-row">
              <button @click="create" class="ml-auto bg-brand py-3 px-3 w-48 text-center cursor-pointer font-bold rounded text-white">Add project</button>
            </div>

          </div>

        </div>
    </div>
</template>


<script>
import auth from '@/helpers/auth';
import API from '@/helpers/api'


export default {
  name: 'Dashboard',
  data() {
    return {
      user: {},
      project: {
        name: '',
      },
      features: [],
      step: 1,
    }
  },
  methods: {
    create: async function(){
      if(!this.project.name || this.project.name.length < 3){
        alert('Your project name should have at least 3 characters');
        return false;
      }

      await API.post('/projects', this.project);
      this.$router.push({path: '/projects'})
    }
  },


  computed: {
  },

  async mounted() {

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });



  }
}
</script>

<style>

</style>
