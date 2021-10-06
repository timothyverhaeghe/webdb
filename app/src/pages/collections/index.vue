<template>
    <div v-if="pageloaded" class="w-full flex flex-col mt-16 bg-gray-50" style="min-height: 94vh;" @click="clickListener($event)">

      <div v-if="collection" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div @click="collection = false" class="cursor-pointer fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>

              <div class="flex flex-row">
                <div class="ml-auto">
                  <svg @click="collection = false" class="h-4 w-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
              </div>

              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                <!-- Heroicon name: outline/check -->
                <svg class="h-14 w-14" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-linecap="round" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><rect width="16" height="3" x="4" y="18" rx=".285197" ry="0"></rect><path d="M12.7992 10.1635l4.63341-3.7734 -4.4015e-08 3.58544e-08c.431348-.351374.49618-.985896.144806-1.41724 -.0490293-.0601885-.104852-.114508-.166356-.161876l1.92539e-07 1.45223e-07c-3.96584-2.99125-9.60568-2.20118-12.5969 1.76466 -2.59059 3.43465-2.38625 8.22288.487529 11.4243"></path><path d="M19 18v-1.26541l9.59233e-14-6.25183e-07c0-.995302-.731862-1.83914-1.71716-1.9799l-5.28284-.75469"></path><path d="M18.3117 15.2314l1.65348e-07-3.74472e-07c1.25597-2.84447.748263-6.15918-1.30152-8.49731"></path></g><path fill="none" d="M0 0h24v24h-24Z"></path></svg>

              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Create new collection
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    All amazing things have started by naming it. I call this collection a new revolution. What about you?
                  </p>
                </div>
              </div>

              <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="collection.name" placeholder="" type="text" name="collection-name" class="mt-1 border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
              </div>


              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows="3" v-model="collection.desc" placeholder="" class="mt-1 border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>


            </div>
            <div class="mt-5 sm:mt-6">
              <button @click="create" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>


      <div class="w-9/12 mx-auto mt-3 bg-gray-50">

        <div class="flex flex-row">
          <div>
            <div class="mt-8 text-3xl font-bold">Your collections</div>
            <p class="mt-2 text-gray-500">
              This page lists all the collections that you've configured.
            </p>
          </div>

          <div class="ml-auto flex flex-row items-center justify-center">
            <input v-model="q" type="text" placeholder="Search collection" class="mr-2 text-sm mt-1 block w-full pl-3 pr-10 py-2 border rounded text-base border-gray-300 focus:outline-none focus:border-brand rounded-md" />

          <div @click="collection = {}" class="cursor-pointer w-40 mt-1 px-4 text-white text-xs flex flex-row items-center justify-center cursor-pointer text-center bg-brand h-10 rounded">
            Add collection
          </div>
        </div>

        </div>


        <div v-if="data && data.length > 0" class="flex flex-row flex-wrap mt-6 mb-10">

          <div :data-url="'/collections/'+collection._id" v-for="collection in data" v-bind:key="collection._id" class="link w-4/12 lg:w-3/12 pr-2 mt-2">

            <div class="bg-white hover:border-brand cursor-pointer rounded border flex flex-col w-full h-40 p-2">
              <div class="ml-auto flex flex-row items-center justify-center">

                <div @clic="openSidebar(collection, $event)" :id="collection._id" class="open-sidemenu text-xs cursor-pointer">
                  <svg class="h-4 w-4 mt-2 pointer-events-none	" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>

                <div v-if="sidemenu == collection._id" class="absolute ml-40 mt-8 w-32 bg-white rounded border">
                  <div @click="edit(collection, $event)" class="clone text-xs h-8 flex flex-col px-2 hover:bg-gray-50 justify-center border-b">Edit collection</div>
                  <div @click="remove(collection, $event)" class="remove text-xs h-8 flex flex-col px-2 hover:bg-gray-50 justify-center border-b">Remove collection</div>

                </div>

              </div>
              <div class="my-auto px-4">
                <div class="capitalize">{{collection.name}}</div>
                <div class="mt-1 text-gray-600 text-xs">{{collection.desc}}</div>
              </div>
            </div>

          </div>

        </div>

        <div v-else-if="q.length > 0" class="mt-6 w-full h-64 border rounded flex flex-row items-center justify-center">
          <div @click="collection = {}" class="text-gray-600 text-center cursor-pointer">No collections found for "{{q}}".</div>
        </div>
        <div v-else class="mt-6 w-full h-64 border rounded flex flex-row items-center justify-center">
          <div @click="collection = {}" class="text-gray-600 text-center cursor-pointer">You don't have any collections yet. <br/> Start by adding one.</div>
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
      sidemenu: false,
      user: {},
      pageloaded: false,
      data: [],
      collection: false,
      q: '',
    }
  },
  methods: {

    openSidebar: function(collection, e){
      this.sidemenu = collection._id;
      e.preventDefault();
    },


    findCollections: async function(){
      var actions = await API.get('/collections?q='+this.q);
      this.data = actions.data;
    },

    clickListener: function(e){
      if(e.target.classList.contains('open-sidemenu')){
        this.sidemenu = e.target.id;
        e.preventDefault();
      } else if(
        e.target.classList.contains('remove') ||
        e.target.classList.contains('clone')
      ){
        return false;
      } else {
        this.sidemenu = false;
        var link = e.target.closest('.link')
        if(link){
          console.log('Has getAttribute to:', link.dataset);
          this.$router.push({ path: link.dataset.url })
        }
      }
    },


    edit: async function(collection, e){
      e.preventDefault();
      this.$router.push({ path: '/collections/'+collection._id })
    },

    remove: async function(collection, e){
      e.preventDefault();
      if(confirm('Are you sure you want to remove this collection and its data?')){
        await API.delete('/collections/'+collection._id);
        this.data.splice(this.data.indexOf(collection), 1)
        return false;
      } else {
        this.sidemenu = false;
      }
    },

    create: async function(){
      if(!this.collection.name || this.collection.name.length < 3){
        alert('Your collection name should have at least 3 characters.');
        return false;
      }

      var res = await API.post('/collections', this.collection);
      this.$router.push({path: '/collections/'+res._id})
    }

  },
  watch: {
    q: async function(){
      await this.findCollections()
    },
  },

  async mounted() {
    //const _self = this;

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });


    var data = await API.get('/collections');
    this.data = data.data;

    this.pageloaded = true;

  }
}
</script>

<style>

</style>
