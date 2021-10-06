<template>
    <div class="w-full bg-white mt-14">

        <div class="py-10 w-9/12 mx-auto">

          <div class="flex flex-col mt-10">
              <div class="flex flex-row">
                  <div class="px-2">
                      <div class="text-4xl font-bold">Hi {{user.firstname}} 👋🏻</div>
                      <div class="text-gray-600 text-lg mt-1">Here are all the projects that you have access to. For which project do you want to update?</div>
                  </div>
              </div>




            <div class="flex flex-row flex-wrap mt-10">



              <router-link to="/projects/new" class="w-64 h-48 lg:w-3/12 lg:h-64 p-2">
                <div class="w-full h-full bg-white text-2xl cursor-pointer rounded border hover:border-branding flex flex-row items-center justify-center text-center">
                  Add project 🚀
                </div>
              </router-link>


              <div @click="select(project)" v-for="project in user.projects" v-bind:key="project._id" class="w-64 h-48 lg:w-3/12 lg:h-64 p-2">
                <div :class="project._id == user.project._id ? 'border-brand' : ''" class="w-full h-full bg-white text-2xl cursor-pointer rounded border hover:border-branding flex flex-row items-center justify-center text-center">
                  {{project.name}}
                </div>
              </div>


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
      greeting: '',
    }
  },
  methods: {
    select: async function(project){
      await API.put('/users/me', { project: project._id });
      this.$parent.project = project;
      this.$router.push({path: '/'});
      //document.location.reload()
    },
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
