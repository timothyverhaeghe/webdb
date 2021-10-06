<template>
    <div class="w-full flex flex-col h-screen mt-11 p-20">

      <div class="w-9/12 mx-auto">

        <div v-if="false" class="cursor-pointer rounded border flex flex-row h-16 py-6 items-center p-4 font-medium">
          <div class="mr-4 text-green-600">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path></svg>
          </div>
          <div class="font-bold">
            Introducing Marketing Plan Generator.
          </div>
          <div class="ml-auto flex flex-row w-2/12">
            <div class="bg-gray-200 mx-3 px-2 py-1 w-32 text-center cursor-pointer rounded">
              Read more
            </div>
            <div class="ml-auto flex flex-row items-center justify-center">
              <svg class="w-4 h-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
          </div>
        </div>


        <div class="text-3xl font-bold">Hello {{user.firstname}} ✌🏼</div>
        <div class="mt-8 text-xl font-bold">Get started</div>
        <p class="mt-6 text-gray-500">Thanks for being a part of our beta! The WebFaster Automation suite has been built to flexibly solve a number of automation tasks with a unified trigger-in, action-out interface. Here are a few ways to get started.</p>

        <div class="my-8 w-full flex flex-row">

          <router-link to="/workflows" class="w-4/12 pt-2 pr-2">
            <div class="flex flex-col border border-gray-200 rounded-lg p-4 h-48 transform translate-y-0 hover:-translate-y-1 hover:-translate-x-1 transition duration-200 cursor-pointer">
              <div class="mt-auto h-16 w-16 bg-purple-600 rounded flex flex-row items-center justify-center text-white">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>
              </div>
              <div class="mt-4 font-bold text-brand">Manage workflows</div>
              <div class="text-sm mb-2 text-gray-600">Create, edit or run a workflow.</div>
            </div>
          </router-link>

          <router-link to="/activity" class="w-4/12 pt-2 pr-2">
            <div class="flex flex-col border border-gray-200 rounded-lg p-4 h-48 transform translate-y-0 hover:-translate-y-1 hover:-translate-x-1 transition duration-200 cursor-pointer">
              <div class="mt-auto h-16 w-16 bg-yellow-400 rounded flex flex-row items-center justify-center text-white">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <div class="mt-4 font-bold text-brand">Activity</div>
              <div class="text-sm mb-2 text-gray-600">See which workflows are been running.</div>
            </div>
          </router-link>

          <router-link to="/checklists" class="w-4/12 pt-2 pr-2">
            <div class="flex flex-col border border-gray-200 rounded-lg p-4 h-48 transform translate-y-0 hover:-translate-y-1 hover:-translate-x-1 transition duration-200 cursor-pointer">
              <div class="mt-auto h-16 w-16 bg-red-400 rounded flex flex-row items-center justify-center text-white">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </div>
              <div class="mt-4 font-bold text-brand">Marketplace</div>
              <div class="text-sm mb-2 text-gray-600">Get inspiration from other pilots</div>
            </div>
          </router-link>

        </div>



        <div class="mt-10 text-xl font-bold">Resources</div>
        <p class="mt-4 text-gray-500">
          Learn more about how to use the WebFaster automation suite.
        </p>

        <div class="flex flex-col mt-4">

          <div class="flex cursor-pointer items-center h-10 mt-2 flex-row py-2">
            <div class="flex flex-row items-center justify-center">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            <div class="ml-4">
              <div class="text-sm font-semibold text-brand">Help center</div>
              <div class="text-xs text-gray-600">Find answers to frequently asked questions.</div>
            </div>
          </div>

          <div class="flex cursor-pointer items-center h-10 mt-2 flex-row py-2">
            <div class="flex flex-row items-center justify-center">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            <div class="ml-4">
              <div class="text-sm font-semibold text-brand">Video tutorials</div>
              <div class="text-xs text-gray-600">Learn how the Marketing suite works from a series of videos.</div>
            </div>
          </div>

        </div>





      </div>


    </div>
</template>


<script>
import auth from '@/helpers/auth';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {},
      pageloaded: false,
    }
  },
  methods: {

  },
  async mounted() {
    //const _self = this;

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });

    this.pageloaded = true;

  }
}
</script>

<style>

</style>
